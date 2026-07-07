import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, Leaf, Users, Sofa } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Matha Furniture - a trusted premium furniture showroom in Thiruvananthapuram, Kerala, with showrooms at Kesavadasapuram and Plamoodu.",
};

const stats = [
  { icon: Sofa, value: "500+", label: "Furniture Designs" },
  { icon: Users, value: "10,000+", label: "Happy Customers" },
  { icon: Award, value: "50+", label: "Years of Trust" },
  { icon: Leaf, value: "2", label: "Showrooms" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="Crafting Beautiful Homes Since Day One"
        description="Matha Furniture is a family-run furniture destination in Thiruvananthapuram, dedicated to quality craftsmanship and honest service."
      />

      <section className="container-wide grid items-center gap-12 py-16 lg:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80"
              alt="Matha Furniture craftsmanship"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <span className="eyebrow">Who we are</span>
          <h2 className="section-title mt-2">
            Furniture that feels like home
          </h2>
          <div className="mt-5 space-y-4 text-charcoal/75">
            <p>
              At Matha Furniture, we believe your home should tell your story.
              For over a decade, we have helped families across Kerala furnish
              their homes with pieces that blend timeless design, comfort and
              durability.
            </p>
            <p>
              From handcrafted solid-wood beds to plush contemporary sofas,
              every piece in our collection is chosen for its quality and
              value. Our two showrooms in Kesavadasapuram and Pattom bring our
              collections to life so you can see and feel the difference.
            </p>
            <p>
              We&apos;re more than a furniture shop &mdash; we&apos;re your
              partner in creating spaces you&apos;ll love for years to come.
            </p>
          </div>
          <Link href="/contact" className="btn-primary mt-8">
            Visit Our Showrooms
          </Link>
        </Reveal>
      </section>

      <section className="bg-wood-50 py-16">
        <div className="container-wide grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-wood-700 shadow-card">
                  <s.icon size={26} />
                </div>
                <p className="mt-4 font-serif text-3xl font-bold text-charcoal">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-charcoal/60">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-wide py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Our Mission",
              text: "To make premium, well-crafted furniture accessible to every home in Kerala, backed by honest pricing and dependable service.",
            },
            {
              title: "Our Craft",
              text: "We partner with skilled artisans and trusted manufacturers to ensure every piece meets our exacting standards of quality.",
            },
            {
              title: "Our Promise",
              text: "From selection to delivery and after-sales support, we're committed to making your furniture journey effortless.",
            },
          ].map((card, i) => (
            <Reveal key={card.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-wood-100 bg-white p-7 shadow-card">
                <h3 className="font-serif text-xl font-semibold text-charcoal">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                  {card.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
