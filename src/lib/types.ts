export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  sort_order: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category_slug: string;
  short_description: string;
  description: string;
  material: string;
  dimensions: string;
  colours: string[];
  images: string[];
  price_label: string;
  featured: boolean;
  in_stock: boolean;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  image: string;
  category: string;
  sort_order: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta_label: string;
  cta_href: string;
  active: boolean;
  sort_order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
  avatar: string;
  approved: boolean;
  created_at: string;
}

export interface ShowroomLocation {
  name: string;
  address: string;
  phone: string;
  hours: string;
  map_embed: string;
}

export interface ContactInfo {
  id: string;
  business_name: string;
  email: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  locations: ShowroomLocation[];
}
