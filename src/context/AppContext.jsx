// src/context/AppContext.jsx
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { PRODUCTS } from "../data/products";
import { DELIVERY } from "../data/delivery";
import { COUPONS } from "../data/coupons";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

// ---------- Utils ----------
export const currency = (n) =>
  new Intl.NumberFormat("bn-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(n);

export const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

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
    } catch {}
  }, [key, state]);

  return [state, set];
}

// ---------- Context ----------
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const navigate = useNavigate();
  const [lang, setLang] = useLocalState("sf_lang", "bn");
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [detail, setDetail] = useState(null);
  const [cart, setCart] = useLocalState("sf_cart", []);
  const [zone, setZone] = useLocalState("sf_zone", "inside");
  const [coupon, setCoupon] = useLocalState("sf_coupon", "");
  const [orderId, setOrderId] = useState("");
  const [trackResult, setTrackResult] = useState(null);

  const t = (bn, en) => (lang === "bn" ? bn : en || bn);

  
  // ---------- Derived values ----------
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        (activeCat === "all" || p.categories.includes(activeCat)) &&
        (q === "" ||
          p.name_bn.toLowerCase().includes(q) ||
          p.description_bn.toLowerCase().includes(q) ||
          p.name_en.toLowerCase().includes(q) || // ← English name
          (p.description_en && p.description_en.toLowerCase().includes(q))) // ← English description
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

  // ---------- Cart functions ----------
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
          name_bn: product.name_bn,
          name_en: product.name_en,
          variant: variant.label,
          price: variant.price_bdt,
          qty: 1,
          image: product.images[0],
        },
      ];
    });

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: t(
        `${product.name_bn} কার্টে যোগ হয়েছে 🛒`,
        `${product.name_en} added to cart 🛒`
      ),
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      didOpen: (toast) => {
        const progressBar = toast.querySelector(".swal2-timer-progress-bar");
        if (progressBar) progressBar.style.background = "#4ade80"; // green
      },
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
    const item = cart.find((it) => it.key === key);

    setCart((prev) => prev.filter((it) => it.key !== key));

    if (item) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: t(
          `${item.name_bn} কার্ট থেকে সরানো হয়েছে 🗑️`,
          `${item.name_en} removed from cart 🗑️`
        ),
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          const progressBar = toast.querySelector(".swal2-timer-progress-bar");
          if (progressBar) progressBar.style.background = "#f87171"; // red
        },
      });
    }
  }

  function clearCart() {
    Swal.fire({
      title: t("আপনি কি নিশ্চিত?", "Are you sure?"),
      text: t(
        "কার্ট খালি করলে সব প্রোডাক্ট চলে যাবে!",
        "Clearing the cart will remove all products!"
      ),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("হ্যাঁ, খালি করো", "Yes, clear it"),
      cancelButtonText: t("বাতিল", "Cancel"),
    }).then((result) => {
      if (result.isConfirmed) {
        setCart([]);
        setCoupon("");

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: t("কার্ট খালি করা হয়েছে 🛒", "Cart has been cleared 🛒"),
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            const progressBar = toast.querySelector(
              ".swal2-timer-progress-bar"
            );
            if (progressBar) progressBar.style.background = "#f87171"; // red
          },
        });
      }
    });
  }

  function handleTrack() {
    if (!orderId) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: t("কোনো অর্ডার পাওয়া যায়নি", "No order found"),
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          const progressBar = toast.querySelector(".swal2-timer-progress-bar");
          if (progressBar) progressBar.style.background = "#f87171"; // red
        },
      });
      return;
    }

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
    <AppContext.Provider
      value={{
        lang,
        setLang,
        query,
        setQuery,
        activeCat,
        setActiveCat,
        detail,
        setDetail,
        cart,
        setCart,
        zone,
        setZone,
        coupon,
        setCoupon,
        orderId,
        setOrderId,
        trackResult,
        setTrackResult,
        t,
        currency,
        filtered,
        cartCount,
        cartSubtotal,
        shipping,
        couponValid,
        discount,
        cartTotal,
        addToCart,
        updateQty,
        removeItem,
        clearCart,
        handleTrack,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
