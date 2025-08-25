import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, query, setQuery, cartCount, filtered } = useApp();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/", labelBn: "হোম", labelEn: "Home" },
    { path: "/shop", labelBn: "শপ", labelEn: "Shop" },
    { path: "/about", labelBn: "আমাদের সম্পর্কে", labelEn: "About" },
    { path: "/contact", labelBn: "যোগাযোগ", labelEn: "Contact" },
    { path: "/policies", labelBn: "নীতি/পলিসি", labelEn: "Policies" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (filtered.length > 0) {
      navigate("/shop");
    } else {
      alert(t("কোনো পণ্য পাওয়া যায়নি", "No product found"));
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-3">
        {/* Logo */}
        <button
          onClick={() => {
            navigate("/");
            window.scrollTo(0, 0);
          }}
          className="flex items-center gap-2 group"
          aria-label="Maaz Foods BD Home"
        >
          <div className="size-9 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-lg">
            MF
          </div>
          <div className="hidden md:block">
            <div className="font-bold leading-4">Maaz Foods BD</div>
            <div className="text-[11px] text-neutral-600">
              {t("খাঁটি দেশি স্বাদ", "Pure Deshi Taste")}
            </div>
          </div>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex text-sm gap-5">
          {menuItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => {
                  navigate(item.path);
                  window.scrollTo(0, 0);
                }}
                className="hover:underline"
              >
                {t(item.labelBn, item.labelEn)}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop Search */}
        <form onSubmit={handleSearch} className="relative hidden md:block w-96">
          <input
            type="search"
            className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder={t("পণ্য খুঁজুন…", "Search products…")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={t("পণ্য খুঁজুন", "Search products")}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-lg"
          >
            🔎
          </button>
        </form>

        {/* Cart */}
        <button
          onClick={() => navigate("/cart")}
          className="relative rounded-xl px-3 py-2 text-sm bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          aria-label="Open cart"
        >
          🛒 {t("কার্ট", "Cart")} ({cartCount})
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg border border-neutral-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 py-3 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 hover:underline"
            >
              {t(item.labelBn, item.labelEn)}
            </button>
          ))}

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="relative block mt-3">
            <input
              type="search"
              className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder={t("পণ্য খুঁজুন…", "Search products…")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={t("পণ্য খুঁজুন", "Search products")}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-lg"
            >
              🔎
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
