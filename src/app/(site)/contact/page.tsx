import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { getContactInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Visit Matha Furniture at our Kesavadasapuram and Pattom showrooms in Thiruvananthapuram, or reach us by phone, email or WhatsApp.",
};

export default async function ContactPage() {
  const contact = await getContactInfo();

  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact Us"
        description="We'd love to help you find the perfect furniture. Visit a showroom or send us a message."
      />

      <section className="container-wide grid gap-12 py-16 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-charcoal">
            Send us a message
          </h2>
          <p className="mt-2 text-sm text-charcoal/65">
            Fill in your details and we&apos;ll get back to you on WhatsApp.
          </p>
          <div className="mt-6">
            <ContactForm whatsapp={contact.whatsapp} />
          </div>

          <div className="mt-10 space-y-4">
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-3 text-sm text-charcoal"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-wood-100 text-wood-700">
                <Phone size={18} />
              </span>
              {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-3 text-sm text-charcoal"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-wood-100 text-wood-700">
                <Mail size={18} />
              </span>
              {contact.email}
            </a>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="font-serif text-2xl font-semibold text-charcoal">
            Our Showrooms
          </h2>
          {contact.locations.map((loc) => (
            <div
              key={loc.name}
              className="overflow-hidden rounded-2xl border border-wood-100 bg-white shadow-card"
            >
              <div className="aspect-video w-full bg-wood-50">
                <iframe
                  src={loc.map_embed}
                  title={`Map of ${loc.name}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="space-y-3 p-6">
                <h3 className="font-serif text-lg font-semibold text-charcoal">
                  {loc.name}
                </h3>
                <p className="flex items-start gap-2 text-sm text-charcoal/70">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-wood-600" />
                  {loc.address}
                </p>
                <p className="flex items-center gap-2 text-sm text-charcoal/70">
                  <Phone size={16} className="shrink-0 text-wood-600" />
                  {loc.phone}
                </p>
                <p className="flex items-start gap-2 text-sm text-charcoal/70">
                  <Clock size={16} className="mt-0.5 shrink-0 text-wood-600" />
                  {loc.hours}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
