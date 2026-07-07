import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, ShieldCheck, Hammer, HeartHandshake } from "lucide-react";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import Testimonials from "@/components/Testimonials";
import ShareExperienceForm from "@/components/ShareExperienceForm";
import Reveal from "@/components/Reveal";
import { whatsappLink } from "@/lib/site-config";
import {
  getBanners,
  getCategories,
  getFeaturedProducts,
  getTestimonials,
} from "@/lib/data";

const perks = [
  {
    icon: Hammer,
    title: "Master Craftsmanship",
    text: "Solid-wood construction and premium materials built to last generations.",
  },
  {
    icon: Truck,
    title: "Free Local Delivery",
    text: "Complimentary delivery and installation across Thiruvananthapuram.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Warranty",
    text: "Every piece is backed by our warranty and after-sales support.",
  },
  {
    icon: HeartHandshake,
    title: "Personalised Service",
    text: "Expert guidance in-store to help you choose the perfect furniture.",
  },
];

export default async function HomePage() {
  const [banners, featured, categories, testimonials] = await Promise.all([
    getBanners(),
    getFeaturedProducts(),
    getCategories(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero banners={banners} />

      {/* Featured products */}
      <section className="container-wide py-20">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Handpicked for you</span>
            <h2 className="section-title mt-2">Featured Collection</h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-sm font-medium text-wood-700 hover:text-wood-800"
          >
            View all products <ArrowRight size={16} />
          </Link>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-wood-50 py-20">
        <div className="container-wide">
          <Reveal className="mb-10 text-center">
            <span className="eyebrow">Explore the range</span>
            <h2 className="section-title mt-2">Shop by Category</h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {categories.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.05}>
                <CategoryCard category={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="container-wide py-20">
        <Reveal className="mb-12 text-center">
          <span className="eyebrow">The Matha difference</span>
          <h2 className="section-title mt-2">Why Choose Us</h2>
        </Reveal>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((perk, i) => (
            <Reveal key={perk.title} delay={i * 0.08}>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-wood-100 text-wood-700">
                  <perk.icon size={26} />
                </div>
                <h3 className="mt-4 font-serif text-lg font-semibold">
                  {perk.title}
                </h3>
                <p className="mt-2 text-sm text-charcoal/65">{perk.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Showroom highlight */}
      <section className="bg-charcoal py-20 text-cream">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow text-wood-300">Visit us</span>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-white sm:text-4xl">
              Two showrooms in the heart of Thiruvananthapuram
            </h2>
            <p className="mt-4 max-w-lg text-cream/75">
              Experience our collections in person at Kesavadasapuram and Plamoodu.
              Our team is ready to help you design a home you&apos;ll love.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">
                Get Directions <ArrowRight size={18} />
              </Link>
              <a
                href={whatsappLink(
                  "Hi Matha Furniture, I'd like to plan a showroom visit."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                Enquire on WhatsApp
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80"
                alt="Matha Furniture showroom interior"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="container-wide py-20">
          <Reveal className="mb-12 text-center">
            <span className="eyebrow">Loved by families</span>
            <h2 className="section-title mt-2">What Our Customers Say</h2>
          </Reveal>
          <Testimonials items={testimonials} />
        </section>
      )}

      {/* Share experience */}
      <section className="container-wide py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <span className="eyebrow">Share your story</span>
              <h2 className="section-title mt-2">Tell others about Matha Furniture</h2>
              <p className="mt-4 text-charcoal/70">
                Recently purchased from us? We’d love to hear how your home feels now.
                Send us a short review and, once approved, it will appear on this page.
              </p>
            </div>
          </Reveal>
          <ShareExperienceForm />
        </div>
      </section>

      {/* CTA */}
      <section className="container-wide pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-wood-700 px-8 py-16 text-center text-white">
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
                Ready to transform your space?
              </h2>
              <p className="mt-3 text-white/85">
                Browse our full collection or message us on WhatsApp for a
                personalised recommendation.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/products"
                  className="btn-outline border-white/50 text-white hover:bg-white/10"
                >
                  Browse Products
                </Link>
                <a
                  href={whatsappLink(
                    "Hi Matha Furniture, I'd like a recommendation."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  Chat with Us
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
