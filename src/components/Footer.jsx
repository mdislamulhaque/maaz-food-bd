import React from "react";
import Badge from "./shared/Badge";
import { DELIVERY } from "../data/delivery";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router";

export default function Footer() {
  const { t, currency } = useApp();
  const navigate = useNavigate();
  return (
    <>
      {/* Footer / Trust block */}
      <footer className="mt-10 border-t border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 grid md:grid-cols-4 gap-6">
          <div>
            <div className="font-bold text-lg">Maaz Foods BD</div>
            <p className="text-sm text-neutral-600 mt-1">
              {t(
                "খাঁটি দেশি স্বাদ—ঘরে তৈরি, তাজা ও নিরাপদ।",
                "Pure deshi taste—homemade, fresh & safe."
              )}
            </p>
            <div className="mt-3 flex gap-2">
              <Badge>বিকাশ</Badge>
              <Badge>নগদ</Badge>
              <Badge>রকেট</Badge>
              <Badge>SSLCommerz</Badge>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2">
              {t("নেভিগেশন", "Navigation")}
            </div>
            <ul className="space-y-1 text-sm">
              <li>
                <button
                  onClick={() => {
                    navigate("/");
                    window.scrollTo(0, 0);
                  }}
                  className="hover:underline"
                >
                  {t("হোম", "Home")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/shop");
                    window.scrollTo(0, 0);
                  }}
                  className="hover:underline"
                >
                  {t("শপ", "Shop")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/about");
                    window.scrollTo(0, 0);
                  }}
                  className="hover:underline"
                >
                  {t("আমাদের সম্পর্কে", "About")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/contact");
                    window.scrollTo(0, 0);
                  }}
                  className="hover:underline"
                >
                  {t("যোগাযোগ", "Contact")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/policies");
                    window.scrollTo(0, 0);
                  }}
                  className="hover:underline"
                >
                  {t("নীতি/পলিসি", "Policies")}
                </button>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">
              {t("ডেলিভারি", "Delivery")}
            </div>
            <ul className="space-y-1 text-sm text-neutral-700">
              <li>{DELIVERY.eta_inside}</li>
              <li>{DELIVERY.eta_outside}</li>
              <li>
                {t("চার্জ", "Charge")}: {currency(DELIVERY.inside)} /{" "}
                {currency(DELIVERY.outside)}
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">{t("যোগাযোগ", "Contact")}</div>
            <ul className="space-y-1 text-sm">
              <li>📞 01737‑590827</li>
              <li>WhatsApp: wa.me/8801737590827</li>
              <li>✉️ hello@Maazfoods.bd (demo)</li>
              <li>📍 {t("ঢাকা, বাংলাদেশ", "Dhaka, Bangladesh")}</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-neutral-500 py-4 border-t border-neutral-100">
          © {new Date().getFullYear()} Maaz Foods BD —{" "}
          {t("ডেমো সাইট", "Demo site")}
        </div>
      </footer>
    </>
  );
}
