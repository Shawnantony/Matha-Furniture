"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";
import type { Category, Product } from "@/lib/types";

export default function ProductsBrowser({
  products,
  categories,
  initialCategory = "all",
}: {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(initialCategory);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = active === "all" || p.category_slug === active;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.short_description.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [products, query, active]);

  const chips = [{ slug: "all", name: "All" }, ...categories];

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sofas, beds, materials..."
            className="w-full rounded-full border border-wood-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-wood-400 focus:ring-2 focus:ring-wood-100"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-charcoal/60">
          <SlidersHorizontal size={16} />
          <span>
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </span>
        </div>
      </div>

      <div className="mb-8 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {chips.map((c) => (
          <button
            key={c.slug}
            onClick={() => setActive(c.slug)}
            className={cn(
              "whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition",
              active === c.slug
                ? "border-wood-700 bg-wood-700 text-white"
                : "border-wood-200 bg-white text-charcoal hover:border-wood-400"
            )}
          >
            {c.name}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-wood-200 py-20 text-center">
          <p className="font-serif text-xl text-charcoal">No products found</p>
          <p className="mt-2 text-sm text-charcoal/60">
            Try a different search or category.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
