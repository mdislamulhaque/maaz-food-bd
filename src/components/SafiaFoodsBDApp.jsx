import React, { useMemo, useState, useEffect } from "react";
import Header from "./Header";
import TopNavbar from "./TopNavbar";
import Home from "./Home";
import Footer from "./Footer";
import Cart from "./Cart";
import CheckOut from "./CheckOut";
import Track from "./Track";
import About from "./About";
import AllProducts from "./AllProducts";
import { PRODUCTS } from "../data/products";
import { DELIVERY } from "../data/delivery";
import { COUPONS } from "../data/coupons";

// Single-file React + Tailwind demo app that fits the user's spec.
// No external UI libs needed; emoji used as icons to avoid extra deps.
// You can drop this component into any React project (Vite/CRA/Next.js)
// and render <MaazFoodsBDApp />.

// Utility helpers
const currency = (n) =>
  new Intl.NumberFormat("bn-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(n);
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

// Simple localStorage hook for cart persistence
function useLocalState(key, initial) {
  const [state, set] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      ("");
    }
  }, [key, state]);
  return [state, set];
}

// App Component
export default function MaazFoodsBDApp() {
  const [lang, setLang] = useLocalState("sf_lang", "bn"); // "bn" | "en"
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [view, setView] = useLocalState("sf_view", "home"); // home | catalog | product | cart | checkout | track | about | contact | policies
  const [detail, setDetail] = useState(null); // product obj
  const [cart, setCart] = useLocalState("sf_cart", []);
  const [zone, setZone] = useLocalState("sf_zone", "inside"); // inside | outside
  const [coupon, setCoupon] = useLocalState("sf_coupon", "");
  const [orderId, setOrderId] = useState("");
  const [trackResult, setTrackResult] = useState(null);

  const t = (bn, en) => (lang === "bn" ? bn : en || bn);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        (activeCat === "all" || p.categories.includes(activeCat)) &&
        (q === "" ||
          p.name_bn.toLowerCase().includes(q) ||
          p.description_bn.toLowerCase().includes(q))
    );
  }, [query, activeCat]);

  const cartCount = useMemo(
    () => cart.reduce((s, it) => s + it.qty, 0),
    [cart]
  );
  const cartSubtotal = useMemo(
    () => cart.reduce((s, it) => s + it.price * it.qty, 0),
    [cart]
  );
  const shipping = zone === "inside" ? DELIVERY.inside : DELIVERY.outside;
  const couponValid = COUPONS[coupon] && cartSubtotal >= COUPONS[coupon].min;
  const discount = couponValid ? COUPONS[coupon].off : 0;
  const cartTotal = Math.max(
    0,
    cartSubtotal + (cart.length ? shipping : 0) - discount
  );

  function addToCart(product, variantIndex = 0) {
    const variant = product.variants[variantIndex];
    const key = `${product.id}-${variantIndex}`;
    setCart((prev) => {
      const idx = prev.findIndex((x) => x.key === key);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: clamp(copy[idx].qty + 1, 1, 99) };
        return copy;
      }
      return [
        ...prev,
        {
          key,
          pid: product.id,
          name: product.name_bn,
          variant: variant.label,
          price: variant.price_bdt,
          qty: 1,
          image: product.images[0],
        },
      ];
    });
  }

  function updateQty(key, qty) {
    setCart((prev) =>
      prev.map((it) =>
        it.key === key ? { ...it, qty: clamp(qty, 1, 99) } : it
      )
    );
  }

  function removeItem(key) {
    setCart((prev) => prev.filter((it) => it.key !== key));
  }

  function clearCart() {
    setCart([]);
    setCoupon("");
  }

  function handleCheckoutSubmit(e) {
    e.preventDefault();
    // Mock: generate order id and switch to track page
    const id = `SF-${Date.now().toString().slice(-8)}`;
    setOrderId(id);
    clearCart();
    setView("track");
    setTrackResult({
      id,
      status: "Processing",
      eta: zone === "inside" ? DELIVERY.eta_inside : DELIVERY.eta_outside,
    });
  }

  function handleTrack() {
    if (!orderId) return;
    // Mock status rotation by last digit
    const last = Number(orderId.slice(-1));
    const status = [
      "Processing",
      "Processing",
      "Dispatched",
      "Dispatched",
      "Delivered",
    ][last % 5];
    setTrackResult({
      id: orderId,
      status,
      eta:
        status === "Delivered"
          ? t("ডেলিভারি সম্পন্ন", "Delivered")
          : zone === "inside"
          ? DELIVERY.eta_inside
          : DELIVERY.eta_outside,
    });
  }

  return (
    <div className="min-h-screen bg-emerald-50 text-neutral-900">
      {/* Top bar */}
      <TopNavbar lang={lang} setLang={setLang} />
      {/* header */}
      <Header
        setView={setView}
        setDetail={setDetail}
        t={t}
        query={query}
        setQuery={setQuery}
        cartCount={cartCount}
      />

      {/* Views */}
      <Home view={view} t={t} setView={setView} setActiveCat={setActiveCat} />

      {/* category  */}

      <AllProducts
        view={view}
        t={t}
        setActiveCat={setActiveCat}
        activeCat={activeCat}
        query={query}
        setQuery={setQuery}
        filtered={filtered}
        setDetail={setDetail}
        setView={setView}
        addToCart={addToCart}
        currency={currency}
        detail={detail}
      />

      {/* cart  */}

      <Cart
        view={view}
        t={t}
        zone={zone}
        currency={currency}
        shipping={shipping}
        cart={cart}
        setView={setView}
        updateQty={updateQty}
        removeItem={removeItem}
        clearCart={clearCart}
        setCoupon={setCoupon}
        coupon={coupon}
        setZone={setZone}
        cartSubtotal={cartSubtotal}
        cartTotal={cartTotal}
        discount={discount}
        couponValid={couponValid}
      />

      {/* checkout  */}

      <CheckOut
        view={view}
        t={t}
        handleCheckoutSubmit={handleCheckoutSubmit}
        zone={zone}
        setZone={setZone}
        currency={currency}
        cartSubtotal={cartSubtotal}
        discount={discount}
        shipping={shipping}
      />

      {/* track  */}

      <Track
        view={view}
        t={t}
        orderId={orderId}
        setOrderId={setOrderId}
        handleTrack={handleTrack}
        trackResult={trackResult}
      />

      {/* about  */}

      <About view={view} t={t} />

      <Footer t={t} currency={currency} setView={setView} />
    </div>
  );
}
