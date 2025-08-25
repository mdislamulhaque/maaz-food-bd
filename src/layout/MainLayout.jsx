import React from "react";
import { Outlet, useLocation, useOutlet } from "react-router";
import Header from "../components/Header";
import TopNavbar from "../components/TopNavbar";
import Footer from "../components/Footer";
import { AnimatePresence } from "framer-motion";

export default function MainLayout() {
  const location = useLocation();
  const outlet = useOutlet();
  return (
    <div className="flex min-h-screen flex-col bg-emerald-50 text-neutral-900 overflow-hidden">
      <TopNavbar />
      <Header />
      <div className="flex-1">
        <AnimatePresence mode="wait">
          {outlet && (
            <div
              key={location.pathname}
            >
              {outlet}
            </div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}
