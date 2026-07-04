import Image from "next/image";
import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/types";
import Reveal from "./Reveal";

export default function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((t, i) => (
        <Reveal key={t.id} delay={i * 0.1}>
          <figure className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-card">
            <div className="mb-3 flex gap-0.5 text-wood-500">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star
                  key={s}
                  size={16}
                  className={s < t.rating ? "fill-wood-500" : "opacity-30"}
                />
              ))}
            </div>
            <blockquote className="flex-1 text-sm leading-relaxed text-charcoal/80">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <div className="relative h-11 w-11 overflow-hidden rounded-full bg-wood-100">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-charcoal">{t.name}</p>
                <p className="text-xs text-charcoal/60">{t.location}</p>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
