import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import Section from "./shared/Section";
import CatalogControls from "./CatalogControls";
import ProductGrid from "./ProductGrid";
import ProductDetail from "./ProductDetail";
import { DELIVERY } from "../data/delivery";
import { CATEGORIES } from "../data/Categories";
import { PRODUCTS } from "../data/products";
import { useApp } from "../context/AppContext";

export default function AllProducts() {
  const { t, setActiveCat, activeCat, query, setQuery, addToCart, currency } =
    useApp();

  const [searchParams] = useSearchParams();
  const [detail, setDetail] = useState(null);

  // Load product detail if ?product=id exists
  useEffect(() => {
    const productId = searchParams.get("product");
    if (productId) {
      const product = PRODUCTS.find((p) => p.id.toString() === productId);
      if (product) setDetail(product);
      else setDetail(null);
    } else {
      setDetail(null);
    }
  }, [searchParams]);

  // Filtered products (Bangla + English search)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        (activeCat === "all" || p.categories.includes(activeCat)) &&
        (q === "" ||
          p.name_bn.toLowerCase().includes(q) ||
          p.description_bn.toLowerCase().includes(q) ||
          p.name_en.toLowerCase().includes(q) ||
          (p.description_en && p.description_en.toLowerCase().includes(q)))
    );
  }, [query, activeCat]);

  return (
    <main>
      {/* Catalog controls */}
      {!detail && (
        <Section
          title={t("সব পণ্য", "All products")}
          subtitle={`${t("শিপিং", "Shipping")}: ${DELIVERY.eta_inside} · ${
            DELIVERY.eta_outside
          }`}
        >
          <CatalogControls
            t={t}
            DELIVERY={DELIVERY}
            CATEGORIES={CATEGORIES}
            activeCat={activeCat}
            setActiveCat={setActiveCat}
            query={query}
            setQuery={setQuery}
          />

          {/* Show ProductGrid or No Products message */}
          {filtered.length > 0 ? (
            <ProductGrid
              filtered={filtered}
              addToCart={addToCart}
              currency={currency}
              t={t}
            />
          ) : (
            <div className="text-center text-neutral-500 mt-10 text-lg">
              {t("কোনো পণ্য পাওয়া যায়নি", "No products found")}
            </div>
          )}
        </Section>
      )}

      {/* Product detail */}
      {detail && (
        <Section
          title={detail.name_bn}
          subtitle={t("পণ্য বিবরণ ও ভ্যারিয়েন্ট", "Details & variants")}
        >
          <ProductDetail
            detail={detail}
            t={t}
            currency={currency}
            addToCart={addToCart}
            PRODUCTS={PRODUCTS}
          />
        </Section>
      )}
    </main>
  );
}
