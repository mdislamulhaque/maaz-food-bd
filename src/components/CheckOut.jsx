import React, { useState } from "react";
import Section from "./shared/Section";
import { DELIVERY } from "../data/delivery";
import { useApp } from "../context/AppContext";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router";

export default function CheckOut() {
  const {
    t,
    zone,
    setZone,
    currency,
    cart,
    cartSubtotal,
    discount,
    shipping,
    setCart,
    setCoupon,
    setOrderId,
    setTrackResult,
  } = useApp();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
    shippingZone: zone,
    paymentMethod: "SSLCommerz (demo)",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: t("আপনি কি নিশ্চিত?", "Are you sure?"),
      text: t(
        "আপনি অর্ডার সম্পন্ন করতে যাচ্ছেন।",
        "You are about to complete the order."
      ),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("হ্যাঁ, অর্ডার করো", "Yes, place order"),
      cancelButtonText: t("বাতিল", "Cancel"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        const id = `SF-${Date.now().toString().slice(-8)}`;
        setOrderId(id);

        // Prepare payload for backend
        const payload = {
          orderId: id,
          customer: formData,
          cartItems: cart.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity,
          })),
          summary: {
            subtotal: cartSubtotal,
            shipping,
            discount,
            total: cartSubtotal + shipping - discount,
            currency: "BDT",
          },
          shippingZone: formData.shippingZone,
          paymentMethod: formData.paymentMethod,
        };

        // Console log for debugging
        console.log("Customer Info:", formData);
        console.log("Cart Items:", cart);
        console.log("Total Items:", cart.length);
        console.log("Subtotal:", currency(cartSubtotal));
        console.log("Shipping:", currency(shipping));
        console.log("Discount:", currency(discount));
        console.log("Total:", currency(cartSubtotal + shipping - discount));

        try {
          // Send to backend
          // const response = await axios.post("/api/orders", payload);
          // console.log("Backend Response:", response.data);

          // Clear cart & coupon
          setCart([]);
          setCoupon("");

          // Set tracking result
          setTrackResult({
            id,
            status: "Processing",
            eta: zone === "inside" ? DELIVERY.eta_inside : DELIVERY.eta_outside,
          });

          // Success toast
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: t("অর্ডার প্রক্রিয়াধীন", "Order is now processing"),
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              const progressBar = toast.querySelector(
                ".swal2-timer-progress-bar"
              );
              if (progressBar) progressBar.style.background = "#4ade80";
            },
          });

          navigate("/track");
        } catch (error) {
          console.error("Order submission failed:", error);
          Swal.fire({
            icon: "error",
            title: t("ত্রুটি", "Error"),
            text: t(
              "অর্ডার জমা দিতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
              "Failed to place order. Try again."
            ),
          });
        }
      }
    });
  };

  return (
    <main>
      <Section
        title={t("চেকআউট", "Checkout")}
        subtitle={`${t(
          "পেমেন্ট",
          "Payment"
        )}: SSLCommerz / বিকাশ / নগদ / রকেট (ডেমো)`}
      >
        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-6">
          {/* Left form inputs */}
          <div className="md:col-span-2 bg-white rounded-2xl ring-1 ring-neutral-200 p-5 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <label className="text-sm">
                {t("পুরো নাম", "Full name")}
                <input
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl ring-1 ring-neutral-300 px-3 py-2"
                />
              </label>

              <label className="text-sm">
                {t("মোবাইল নম্বর", "Phone")}
                <input
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="01XXXXXXXXX"
                  className="mt-1 w-full rounded-xl ring-1 ring-neutral-300 px-3 py-2"
                />
              </label>

              <label className="text-sm md:col-span-2">
                {t("ডেলিভারি ঠিকানা", "Delivery address")}
                <textarea
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 w-full rounded-xl ring-1 ring-neutral-300 px-3 py-2"
                />
              </label>

              <label className="text-sm">
                {t("শহর", "City")}
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl ring-1 ring-neutral-300 px-3 py-2"
                />
              </label>

              <label className="text-sm">
                {t("পোস্ট কোড", "Postcode")}
                <input
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl ring-1 ring-neutral-300 px-3 py-2"
                />
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <label className="text-sm">
                {t("শিপিং জোন", "Shipping zone")}
                <select
                  name="shippingZone"
                  value={formData.shippingZone}
                  onChange={(e) => {
                    handleChange(e);
                    setZone(e.target.value);
                  }}
                  className="mt-1 w-full rounded-xl ring-1 ring-neutral-300 px-3 py-2"
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
              </label>

              <label className="text-sm">
                {t("পেমেন্ট পদ্ধতি", "Payment method")}
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl ring-1 ring-neutral-300 px-3 py-2"
                >
                  <option>SSLCommerz (demo)</option>
                  <option>বিকাশ (manual)</option>
                  <option>নগদ (manual)</option>
                  <option>রকেট (manual)</option>
                </select>
              </label>
            </div>
          </div>

          {/* Right order summary */}
          <aside className="bg-white rounded-2xl ring-1 ring-neutral-200 p-5 h-fit">
            <h4 className="font-semibold mb-3">
              {t("অর্ডার সামারি", "Order summary")}
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>{t("সাবটোটাল", "Subtotal")}</span>
                <span>{currency(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("শিপিং", "Shipping")}</span>
                <span>{currency(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("ডিসকাউন্ট", "Discount")}</span>
                <span>-{currency(discount)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>{t("মোট", "Total")}</span>
                <span>{currency(cartSubtotal + shipping - discount)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-emerald-600 text-white px-5 py-3 font-semibold hover:bg-emerald-700"
            >
              {t("অর্ডার কনফার্ম করুন", "Confirm order")}
            </button>

            <p className="text-xs text-neutral-500 mt-2">
              {t(
                "কনফার্ম করলে একটি ডেমো অর্ডার আইডি জেনারেট হবে এবং ট্র্যাক পেজে নিয়ে যাবে।",
                "On confirm, a demo order ID is generated and you'll be taken to tracking."
              )}
            </p>
          </aside>
        </form>
      </Section>
    </main>
  );
}
