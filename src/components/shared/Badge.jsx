import React from "react";

export default function Badge({ children }) {
  return (
    <>
      <span className="inline-flex items-center gap-1 rounded-2xl bg-amber-50 ring-1 ring-amber-200 px-3 py-1 text-xs text-amber-800">
        {children}
      </span>
    </>
  );
}
