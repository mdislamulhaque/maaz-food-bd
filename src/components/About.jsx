import React from "react";
import Section from "./shared/Section";
import { DELIVERY } from "../data/delivery";
import { useApp } from "../context/AppContext";
import { useParams } from "react-router";

export default function About() {
  const { pageType } = useParams(); // about, contact, policies
  const { t } = useApp();

  const titles = {
    about: t("আমাদের সম্পর্কে", "About us"),
    contact: t("যোগাযোগ", "Contact"),
    policies: t("নীতি/পলিসি", "Policies"),
  };

  const title = titles[pageType] || "";

  return (
    <main>
      <Section title={title}>
        {/* 🔹 About Page */}
        {pageType === "about" && (
          <div className="bg-white rounded-2xl ring-1 ring-neutral-200 p-6 space-y-3 max-w-3xl">
            <p className="text-neutral-700">
              {t(
                "Maaz Foods BD হচ্ছে একটি দেশি স্ন্যাকস ও মিষ্টান্ন ব্র্যান্ড—স্বাদ ও নিরাপত্তায় আমাদের অঙ্গীকার।",
                "Maaz Foods BD is a deshi snacks & sweets brand committed to taste and safety."
              )}
            </p>
          </div>
        )}

        {/* 🔹 Contact Page */}
        {pageType === "contact" && (
          <div className="bg-white rounded-2xl ring-1 ring-neutral-200 p-6 space-y-3 max-w-3xl">
            <div className="space-y-2 text-sm">
              <div>{t("ফোন", "Phone")}: 01737-590827</div>
              <div>
                WhatsApp:{" "}
                <a
                  className="underline"
                  href="https://wa.me/8801737590827"
                  target="_blank"
                  rel="noreferrer"
                >
                  wa.me/8801737590827
                </a>
              </div>
              <div>{t("ইমেল", "Email")}: hello@Maazfoods.bd (demo)</div>
              <div>
                {t("ঠিকানা", "Address")}:{" "}
                {t("ঢাকা, বাংলাদেশ", "Dhaka, Bangladesh")}
              </div>
            </div>
          </div>
        )}

        {/* 🔹 Policy Page */}
        {pageType === "policies" && (
          <div className="bg-white rounded-2xl ring-1 ring-neutral-200 p-6 space-y-3 max-w-3xl text-sm">
            <div className="font-semibold">
              {t("শিপিং নীতি", "Shipping policy")}
            </div>
            <p>
              {DELIVERY.eta_inside} · {DELIVERY.eta_outside}.{" "}
              {t(
                "শিপিং চার্জ অর্ডারের সময়ে ক্যালকুলেট করা হয়।",
                "Shipping charges are calculated at checkout."
              )}
            </p>
            <div className="font-semibold mt-3">
              {t("রিটার্ন/রিফান্ড নীতি", "Return/Refund policy")}
            </div>
            <p>
              {t(
                "প্যাকেট খোলা হয়নি এমন পণ্যের জন্য ৩ দিনের মধ্যে রিটার্ন।",
                "Returns within 3 days for unopened items."
              )}
            </p>
            <div className="font-semibold mt-3">
              {t("প্রাইভেসি নীতি", "Privacy policy")}
            </div>
            <p>
              {t(
                "আপনার তথ্য সুরক্ষিত রাখতে আমরা প্রতিশ্রুতিবদ্ধ।",
                "We are committed to protecting your data."
              )}
            </p>
            <div className="font-semibold mt-3">{t("টার্মস", "Terms")}</div>
            <p>
              {t(
                "ডেমো সাইট—অর্ডারগুলো পরীক্ষামূলক।",
                "Demo site—orders are for testing."
              )}
            </p>
          </div>
        )}
      </Section>
    </main>
  );
}
