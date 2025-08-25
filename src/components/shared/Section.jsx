import React from "react";

export default function Section({ title, subtitle, children, id }) {
  return (
    <>
      <section id={id} className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {title && (
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-neutral-600 mt-1">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </section>
    </>
  );
}
