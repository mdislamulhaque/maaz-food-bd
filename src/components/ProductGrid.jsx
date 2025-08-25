import React from "react";
import Badge from "./shared/Badge";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import FadeImage from "./shared/FadeImage";

export default function ProductGrid({ filtered, addToCart, currency, t }) {
  const navigate = useNavigate();

  // Motion variants for each product card
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: { scale: 1.03, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {filtered.map((p) => (
        <motion.article
          key={p.id}
          className="bg-white rounded-2xl ring-1 ring-neutral-200 shadow-sm overflow-hidden flex flex-col cursor-pointer"
          variants={cardVariants}
          whileHover="hover"
        >
          {/* Image click → navigate to detail page */}
          <button
            onClick={() => navigate(`/shop?product=${p.id}`)}
            className="block w-full"
          >
            <FadeImage
              src={p.images[0]}
              alt={`${p.name_bn} ছবি`}
              className="w-full h-44 object-cover"
            />
          </button>

          <div className="p-3 flex-1 flex flex-col">
            <h3 className="font-semibold text-lg leading-tight">{p.name_bn}</h3>
            <p className="text-sm text-neutral-600 line-clamp-2 mt-1">
              {p.description_bn}
            </p>

            <div className="mt-2 flex flex-wrap gap-1">
              {(p.badges || []).map((b, i) => (
                <Badge key={i}>{b}</Badge>
              ))}
            </div>

            <div className="mt-3 text-sm text-neutral-700">⭐ {p.rating}</div>

            <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
              {p.variants.map((v, i) => (
                <button
                  key={i}
                  onClick={() => addToCart(p, i)}
                  className="rounded-xl px-3 py-2 bg-emerald-50 ring-1 ring-emerald-200 text-emerald-800 hover:bg-emerald-100 text-sm"
                >
                  {v.label} · {currency(v.price_bdt)}
                </button>
              ))}
            </div>

            <button
              onClick={() => navigate(`/shop?product=${p.id}`)}
              className="mt-3 rounded-xl px-3 py-2 bg-neutral-900 text-white hover:bg-neutral-800 text-sm"
            >
              {t("ডিটেইল দেখুন", "View details")}
            </button>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}
