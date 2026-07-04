import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-wood-50">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-wood-700 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            Featured
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg font-semibold text-charcoal group-hover:text-wood-700">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 flex-1 text-sm text-charcoal/60">
          {product.short_description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-medium text-wood-700">
            {product.price_label}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-charcoal transition-colors group-hover:text-wood-700">
            View <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
