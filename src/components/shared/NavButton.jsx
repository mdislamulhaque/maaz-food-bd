import React from "react";

export default function NavButton({ label, onClick, active }) {
  return (
    <>
      <button
        onClick={onClick}
        className={`px-3 py-2 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          active
            ? "bg-neutral-900 text-white"
            : "bg-white text-neutral-800 ring-1 ring-neutral-200 hover:bg-neutral-50"
        }`}
      >
        {label}
      </button>
    </>
  );
}
