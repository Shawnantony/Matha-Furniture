import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/types";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="group relative flex aspect-[3/4] items-end overflow-hidden rounded-2xl"
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
      <div className="relative z-10 p-5">
        <h3 className="font-serif text-xl font-semibold text-white">
          {category.name}
        </h3>
        <p className="mt-1 text-sm text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {category.description}
        </p>
      </div>
    </Link>
  );
}
