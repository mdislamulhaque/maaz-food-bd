import NavButton from "./shared/NavButton";

export default function CatalogControls({
  t,
  CATEGORIES,
  activeCat,
  setActiveCat,
  query,
  setQuery,
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <NavButton
        label={t("সব", "All")}
        onClick={() => setActiveCat("all")}
        active={activeCat === "all"}
      />
      {CATEGORIES.map((c) => (
        <NavButton
          key={c.key}
          label={`${c.icon} ${c.name_bn}`}
          onClick={() => setActiveCat(c.key)}
          active={activeCat === c.key}
        />
      ))}
      <div className="flex-1" />
      <label className="relative w-full md:w-80">
        <input
          type="search"
          className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder={t("পণ্য খুঁজুন…", "Search products…")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2">🔎</span>
      </label>
    </div>
  );
}
