import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { getCategories, getContactInfo } from "@/lib/data";

export default async function Footer() {
  const [categories, contact] = await Promise.all([
    getCategories(),
    getContactInfo(),
  ]);

  return (
    <footer className="bg-charcoal text-cream/80">
      <div className="container-wide grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex flex-col items-center leading-tight text-center">
            <span className="font-bahamas text-4xl uppercase text-white sm:text-5xl">
              Matha Furniture
            </span>
            <span className="mt-1 text-[0.75rem] font-semibold uppercase tracking-[0.35em] text-wood-100 sm:text-sm sm:tracking-[0.45em]">
              Since 1966
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Premium furniture crafted for modern Kerala homes. Visit our
            showrooms in Kesavadasapuram &amp; Plamoodu, Thiruvananthapuram.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/10 p-2 transition hover:bg-wood-600"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href={contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/10 p-2 transition hover:bg-wood-600"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-serif text-lg text-white">Explore</h4>
          <ul className="space-y-2 text-sm">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-serif text-lg text-white">Categories</h4>
          <ul className="space-y-2 text-sm">
            {categories.slice(0, 6).map((c) => (
              <li key={c.id}>
                <Link
                  href={`/products?category=${c.slug}`}
                  className="transition hover:text-white"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-serif text-lg text-white">Get in touch</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-wood-300" />
              <span>{contact.locations[0]?.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-wood-300" />
              <a href={`tel:${contact.phone}`} className="hover:text-white">
                {contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-wood-300" />
              <a href={`mailto:${contact.email}`} className="hover:text-white">
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col items-center justify-between gap-2 py-5 text-xs sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <p>Thiruvananthapuram, Kerala, India</p>
        </div>
      </div>
    </footer>
  );
}
