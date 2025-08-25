import { MapPin, Phone } from "lucide-react";
import React from "react";
import { useApp } from "../context/AppContext";

export default function TopNavbar() {
  const { lang, setLang } = useApp();
  return (
    <>
      <div className="bg-emerald-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>০১৭৩৭-৫৯০৮২৭</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>ঢাকায় ২৪ ঘণ্টায় ডেলিভারি</span>
            </div>
          </div>
          {/* <LanguageSwitch /> */}
          {/* Lang toggle */}
          <button
            onClick={() => setLang(lang === "bn" ? "en" : "bn")}
            className="rounded-xl px-3 py-1 text-sm ring-1 ring-green-200 bg-emerald-500 hover:bg-emerald-600"
            aria-label="Language toggle"
          >
            {lang === "bn" ? "BN/EN" : "EN/BN"}
          </button>
        </div>
      </div>
    </>
  );
}
