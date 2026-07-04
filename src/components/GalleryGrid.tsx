"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/lib/types";

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(images.map((i) => i.category)))],
    [images]
  );

  const filtered =
    active === "All" ? images : images.filter((i) => i.category === active);

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition",
              active === c
                ? "border-wood-700 bg-wood-700 text-white"
                : "border-wood-200 bg-white text-charcoal hover:border-wood-400"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {filtered.map((img) => (
          <button
            key={img.id}
            onClick={() => setLightbox(img)}
            className="group mb-4 block w-full overflow-hidden rounded-2xl"
          >
            <div className="relative">
              <Image
                src={img.image}
                alt={img.title}
                width={600}
                height={800}
                className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/70 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-sm font-medium text-white">
                  {img.title}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            aria-label="Close"
          >
            <X size={24} />
          </button>
          <div
            className="relative max-h-[85vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.image}
              alt={lightbox.title}
              width={1200}
              height={800}
              className="h-auto max-h-[85vh] w-full rounded-2xl object-contain"
            />
            <p className="mt-3 text-center text-sm text-white/80">
              {lightbox.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
