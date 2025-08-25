import React from "react";
import Section from "./shared/Section";
import { DELIVERY } from "../data/delivery";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router";

export default function Cart() {
  const navigate = useNavigate();

  const {
    t,
    zone,
    currency,
    shipping,
    cart,
    updateQty,
    removeItem,
    clearCart,
    setCoupon,
    coupon,
    setZone,
    cartSubtotal,
    cartTotal,
    discount,
    couponValid,
  } = useApp();

  console.log(cart);

  return (
    <main>
      <Section
        title={t("আপনার কার্ট", "Your cart")}
        subtitle={`${t("শিপিং জোন", "Shipping zone")}: ${
          zone === "inside"
            ? t("ঢাকার ভিতরে", "Inside Dhaka")
            : t("ঢাকার বাইরে", "Outside Dhaka")
        } · ${t("চার্জ", "Charge")}: ${currency(shipping)}`}
      >
        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl ring-1 ring-neutral-200 p-6 text-center">
            <p className="text-neutral-700">
              {t(
                "কার্ট খালি। শুরু করুন শপিং!",
                "Cart is empty. Start shopping!"
              )}
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="mt-3 rounded-xl bg-emerald-600 text-white px-5 py-3 hover:bg-emerald-700"
            >
              {t("শপে যান", "Go to shop")}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-3">
              {cart.map((it) => (
                <div
                  key={it.key}
                  className="bg-white rounded-2xl ring-1 ring-neutral-200 p-4 flex flex-col md:flex-row items-start md:items-center w-full justify-between gap-4"
                >
                  <div className="flex items-center gap-2">
                    {/* Product Image */}
                    <img
                      src={it.image}
                      alt={it.name}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                    {/* Product Name */}
                    <div className="font-semibold text-sm leading-tight">
                      {it.name_bn}
                    </div>
                    <div className="font-semibold text-sm leading-tight">
                      {it.variant}
                    </div>
                  </div>

                  <div className="flex  justify-between w-full md:w-2/3">
                    {/* Name + Controls */}
                    <div className="flex-1 flex  gap-2">
                      {/* Qty Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(it.key, it.qty - 1)}
                          className="w-8 h-8 rounded-lg ring-1 ring-neutral-300 flex items-center justify-center"
                        >
                          −
                        </button>
                        <input
                          type="text"
                          className="w-14 rounded-lg ring-1 ring-neutral-300 text-center"
                          value={it.qty}
                          min={1}
                          max={99}
                          onChange={(e) =>
                            updateQty(it.key, Number(e.target.value))
                          }
                          aria-label="Quantity"
                        />
                        <button
                          onClick={() => updateQty(it.key, it.qty + 1)}
                          className="w-8 h-8 rounded-lg ring-1 ring-neutral-300 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      {/* Price */}
                      <div className="w-16 text-right font-semibold text-sm">
                        {currency(it.qty * it.price)}
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(it.key)}
                        aria-label="Remove"
                        className="w-8 h-8 rounded-lg ring-1 ring-red-200 text-red-600 flex items-center justify-center"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue shopping / Clear Cart */}
              <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4">
                <button
                  onClick={() => navigate("/shop")}
                  className="rounded-xl px-4 py-2 ring-1 ring-neutral-300 bg-white hover:bg-neutral-50 text-sm w-full sm:w-auto"
                >
                  {t("আরও কেনাকাটা", "Continue shopping")}
                </button>
                <button
                  onClick={clearCart}
                  className="rounded-xl px-4 py-2 ring-1 ring-red-200 text-red-600 bg-white hover:bg-red-50 text-sm w-full sm:w-auto"
                >
                  {t("কার্ট পরিষ্কার", "Clear cart")}
                </button>
              </div>
            </div>

            {/* Summary */}
            <aside className="bg-white rounded-2xl ring-1 ring-neutral-200 p-5 h-fit">
              <div className="flex flex-col gap-3">
                {/* Shipping */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <label className="text-sm">
                    {t("শিপিং জোন", "Shipping zone")}
                  </label>
                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="rounded-xl ring-1 ring-neutral-300 px-3 py-2 text-sm w-full sm:w-auto"
                  >
                    <option value="inside">
                      {t("ঢাকার ভিতরে", "Inside Dhaka")} (
                      {currency(DELIVERY.inside)})
                    </option>
                    <option value="outside">
                      {t("ঢাকার বাইরে", "Outside Dhaka")} (
                      {currency(DELIVERY.outside)})
                    </option>
                  </select>
                </div>

                {/* Coupon */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm">
                    {t("কুপন কোড", "Coupon code")} ({t("উদাহরণ", "example")}:
                    DESHI50)
                  </label>
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value.trim())}
                    className="mt-1 w-full rounded-xl ring-1 ring-neutral-300 px-3 py-2 text-sm"
                    placeholder="DESHI50"
                  />
                  {!couponValid && coupon && (
                    <p className="text-xs text-red-600 mt-1">
                      {t(
                        "কুপন প্রযোজ্য নয় (মিনিমাম ৫০০ টাকা)",
                        "Coupon not applicable (min BDT 500)"
                      )}
                    </p>
                  )}
                </div>

                {/* Totals */}
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{t("সাবটোটাল", "Subtotal")}</span>
                    <span>{currency(cartSubtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("শিপিং", "Shipping")}</span>
                    <span>
                      {cart.length ? currency(shipping) : currency(0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("ডিসকাউন্ট", "Discount")}</span>
                    <span>-{currency(discount)}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>{t("মোট", "Total")}</span>
                    <span>{currency(cartTotal)}</span>
                  </div>
                </div>

                {/* Checkout */}
                <button
                  onClick={() => navigate("/checkout")}
                  className="mt-4 w-full rounded-xl bg-emerald-600 text-white px-5 py-3 font-semibold hover:bg-emerald-700"
                >
                  {t("চেকআউট", "Checkout")}
                </button>
              </div>
            </aside>
          </div>
        )}
      </Section>
    </main>
  );
}
