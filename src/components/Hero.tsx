"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Banner } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function Hero({ banners }: { banners: Banner[] }) {
  const [index, setIndex] = useState(0);
  const slides = banners.length ? banners : [];

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      6000
    );
    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return null;
  const current = slides[index];

  return (
    <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={current.image}
            alt={current.title}
            fill
            priority
            sizes="100vw"
            className="animate-slow-zoom object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="container-wide relative z-10 flex h-full flex-col justify-center">
        <motion.div
          key={`text-${current.id}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <span className="eyebrow text-wood-200">
            Matha Furniture &middot; Thiruvananthapuram
          </span>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {current.title}
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">
            {current.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={current.cta_href} className="btn-primary">
              {current.cta_label} <ArrowRight size={18} />
            </Link>
            <Link
              href="/gallery"
              className="btn-outline border-white/40 text-white hover:bg-white/10"
            >
              View Gallery
            </Link>
          </div>
        </motion.div>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === index ? "w-8 bg-white" : "w-2 bg-white/50"
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}
