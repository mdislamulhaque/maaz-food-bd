import React from "react";
import Badge from "./shared/Badge";
import { useNavigate } from "react-router";

export default function ProductDetail({
  detail,
  t,
  currency,
  addToCart,
  PRODUCTS,
}) {
  const navigate = useNavigate();

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Images */}
      <div className="grid gap-3">
        <img
          src={detail.images[0]}
          alt={`${detail.name_bn} ইমেজ`}
          className="w-full h-72 object-cover rounded-2xl ring-1 ring-neutral-200"
        />
        {detail.images.slice(1).map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${detail.name_bn} ইমেজ ${i + 2}`}
            className="w-full h-48 object-cover rounded-2xl ring-1 ring-neutral-200"
          />
        ))}
      </div>

      {/* Details */}
      <div>
        <p className="text-neutral-700">{detail.description_bn}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {(detail.badges || []).map((b, i) => (
            <Badge key={i}>{b}</Badge>
          ))}
        </div>

        <div className="mt-5 space-y-2">
          {detail.variants.map((v, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl ring-1 ring-neutral-200 p-3 bg-white"
            >
              <div className="text-sm">
                {v.label} · {v.weight_g}g
              </div>
              <div className="flex items-center gap-3">
                <div className="font-semibold">{currency(v.price_bdt)}</div>
                <button
                  onClick={() => addToCart(detail, i)}
                  className="rounded-xl bg-emerald-600 text-white px-4 py-2 text-sm hover:bg-emerald-700"
                >
                  {t("কার্টে যোগ করুন", "Add to cart")}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Related items */}
        <div className="mt-6">
          <h4 className="font-semibold mb-2">
            {t("রিলেটেড আইটেম", "Related items")}
          </h4>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {PRODUCTS.filter(
              (p) =>
                p.id !== detail.id &&
                p.categories.some((c) => detail.categories.includes(c))
            ).map((p) => (
              <button
                key={p.id}
                onClick={() => navigate(`/shop?product=${p.id}`)}
                className="min-w-[180px] bg-white rounded-xl ring-1 ring-neutral-200 p-3 text-left hover:shadow-sm"
              >
                <img
                  src={p.images[0]}
                  alt={p.name_bn}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <div className="mt-2 text-sm font-semibold leading-tight line-clamp-2">
                  {p.name_bn}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
