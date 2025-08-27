import Badge from "./shared/Badge";
import Section from "./shared/Section";
import FadeImage from "./shared/FadeImage";
import { CATEGORIES } from "../data/Categories";
import { PRODUCTS } from "../data/products";
import { DELIVERY } from "../data/delivery";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import AllProducts from "./AllProducts";

export default function Home() {
  const { t, setActiveCat } = useApp();
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const leftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <main>
      {/* Hero */}
      <motion.section
        className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid md:grid-cols-2 gap-8 items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        {/* Left */}
        <motion.div variants={leftVariants}>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            {t("প্রতিদিনের খাঁটি দেশি স্বাদ", "Everyday Pure Deshi Taste")}
          </h1>
          <p className="mt-4 text-neutral-700">
            {t(
              "ঘরে তৈরি, প্রিজারভেটিভ ছাড়াই যত্নে তৈরি স্ন্যাকস ও মিষ্টান্ন। এখনই অর্ডার করুন!",
              "Homemade, preservative-free snacks & sweets, crafted with care. Order now!"
            )}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/shop")}
              className="rounded-2xl bg-emerald-600 text-white px-5 py-3 text-sm font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {t("এখনই অর্ডার করুন", "Shop now")}
            </button>
            <a
              href="#usp"
              className="rounded-2xl px-5 py-3 text-sm font-semibold ring-1 ring-neutral-300 bg-white hover:bg-neutral-50"
            >
              {t("কেন আমাদের?", "Why us?")}
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-2" aria-label="Top selling">
            {PRODUCTS.map((p) => (
              <Badge key={p.id}>{p.name_bn}</Badge>
            ))}
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          className="aspect-[4/3] md:aspect-auto"
          variants={rightVariants}
        >
          <FadeImage
            src="https://i.ibb.co/W4MkYNwc/brown-sugar-cubes-bowl-dark-wooden-table-flat-lay.jpg"
            alt={t("হিরো ইমেজ: দেশি স্ন্যাকস", "Hero image: snacks")}
            className="w-full h-full object-cover rounded-3xl shadow-lg"
          />
        </motion.div>
      </motion.section>

      {/* Categories */}
      {/* <Section
        id="categories"
        title={t("ক্যাটাগরি", "Categories")}
        subtitle={t("যেটা পছন্দ, সেটাই বেছে নিন", "Pick your favorite")}
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => {
                setActiveCat(c.key);
                navigate("/shop");
              }}
              className="group bg-white rounded-2xl shadow-sm ring-1 ring-neutral-200 p-4 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <div className="text-3xl">{c.icon}</div>
              <div className="mt-2 font-semibold">{c.name_bn}</div>
              <div className="text-xs text-neutral-500 group-hover:text-neutral-700">
                {t("দেখুন", "Browse")}
              </div>
            </button>
          ))}
        </div>
      </Section> */}
      <AllProducts />

      {/* USP */}
      <Section id="usp" title={t("বিশ্বাসের কারণ", "Why choose us")}>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: "🌿",
              title: "কোনো প্রিজারভেটিভ নয়",
              text: "প্রাকৃতিক উপাদানে তৈরি।",
            },
            {
              icon: "🏠",
              title: "ঘরে তৈরি",
              text: "হাইজিন মেনে প্রতিটি ব্যাচ।",
            },
            {
              icon: "⚡",
              title: "দ্রুত ডেলিভারি",
              text: `${DELIVERY.eta_inside} · ${DELIVERY.eta_outside}`,
            },
          ].map((u, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl ring-1 ring-neutral-200 p-5 shadow-sm"
            >
              <div className="text-3xl">{u.icon}</div>
              <div className="mt-2 font-semibold">{u.title}</div>
              <p className="text-sm text-neutral-600 mt-1">{u.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Featured story / video */}
      <Section
        title={t("আমাদের রান্নাঘর", "Our Kitchen")}
        subtitle={t(
          "হাইজিন, তাজা উপকরণ আর যত্ন—এই আমাদের প্রতিশ্রুতি।",
          "Hygiene, fresh ingredients and care—our promise."
        )}
      >
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {/* Kitchen Image */}
          <motion.div
            variants={leftVariants}
            className="bg-white rounded-3xl overflow-hidden ring-1 ring-neutral-200 shadow-sm"
          >
            <FadeImage
              src="https://i.ibb.co.com/kgPy4Mbg/cooking-meatballs-ready-mince-lies-by-roasting-kitchen-table.jpg"
              alt={t("কিচেন ফটো", "Kitchen photo")}
              className="w-full h-64 object-cover"
            />
            <div className="p-5">
              <h3 className="font-semibold text-lg">
                {t("কিচেন স্টোরি", "Kitchen Story")}
              </h3>
              <p className="text-sm text-neutral-600 mt-1">
                {t(
                  "প্রতিটি অর্ডার ছোট ব্যাচে তৈরি করা হয় যাতে তাজা স্বাদ অটুট থাকে।",
                  "Small-batch production keeps flavors fresh."
                )}
              </p>
            </div>
          </motion.div>

          {/* Video */}
          <motion.div
            variants={rightVariants}
            className="bg-white rounded-3xl overflow-hidden ring-1 ring-neutral-200 shadow-sm"
          >
            <div className="w-full h-64 flex items-center justify-center bg-neutral-100 overflow-hidden">
              <iframe
                width="600"
                height="256"
                src="https://www.youtube.com/embed/26xQevb5AWo?si=_iHSjkh2uYIdTzep"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-lg">
                {t("প্রসেস", "Process")}
              </h3>
              <p className="text-sm text-neutral-600 mt-1">
                {t(
                  "উপাদান বাছাই থেকে প্যাকেজিং—সবই হাইজিন মেনে।",
                  "From sourcing to packaging—hygiene first."
                )}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Section>

      {/* Reviews */}
      <Section title={t("গ্রাহক মতামত", "Customer Reviews")}>
        <div className="grid md:grid-cols-3 gap-4">
          {PRODUCTS.flatMap((p) => p.reviews || [])
            .slice(0, 3)
            .map((r, idx) => (
              <figure
                key={idx}
                className="bg-white rounded-2xl p-5 ring-1 ring-neutral-200 shadow-sm"
              >
                <div
                  className="flex items-center gap-2 text-amber-500"
                  aria-label="rating"
                >
                  {"★★★★★".slice(0, r.stars)}
                </div>
                <blockquote className="mt-2 text-sm text-neutral-700">
                  “{r.comment_bn}”
                </blockquote>
                <figcaption className="mt-2 text-xs text-neutral-500">
                  — {r.name}
                </figcaption>
              </figure>
            ))}
        </div>
      </Section>

      {/* Newsletter / WhatsApp CTA */}
      <Section>
        <motion.div
          className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-6 md:p-10 text-white"
          variants={ctaVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="text-2xl font-bold">
            {t("অফার পেতে সাবস্ক্রাইব করুন", "Subscribe for offers")}
          </h3>
          <p className="text-white/90 mt-1">
            {t(
              "হোয়াটসঅ্যাপে অর্ডারও করতে পারেন—এক ক্লিকে।",
              "Order on WhatsApp in one click."
            )}
          </p>
          <div className="mt-4 flex flex-col md:flex-row gap-3">
            <label className="flex-1">
              <span className="sr-only">Email</span>
              <input
                className="w-full rounded-2xl px-4 py-3 text-gray-100 border border-white placeholder:text-white focus:outline-0 focus:ring-2 focus:ring-amber-400"
                placeholder={t("আপনার ইমেল", "Your email")}
              />
            </label>
            <button className="rounded-2xl bg-neutral-900 px-5 py-3 font-semibold hover:bg-neutral-800">
              {t("সাবস্ক্রাইব", "Subscribe")}
            </button>
            <a
              href="https://wa.me/8801336-557503"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-emerald-500 px-5 py-3 font-semibold hover:bg-white/20 text-white"
            >
              WhatsApp: 01336-557503
            </a>
          </div>
        </motion.div>
      </Section>
    </main>
  );
}
