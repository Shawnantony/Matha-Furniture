export const siteConfig = {
  name: "Matha Furniture",
  tagline: "Crafted for the way you live",
  description:
    "Matha Furniture is a premium furniture showroom in Thiruvananthapuram, Kerala, offering sofas, beds, dining tables, wardrobes, office furniture and more. Two showrooms at Kesavadasapuram and Pattom.",
  city: "Thiruvananthapuram, Kerala",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999",
  email: "hello@mathafurniture.com",
  phone: "+91 99999 99999",
  instagram: "https://instagram.com/mathafurniture",
  facebook: "https://facebook.com/mathafurniture",
  nav: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

export function whatsappLink(message: string, number?: string) {
  const num = (number || siteConfig.whatsappNumber).replace(/[^0-9]/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}
