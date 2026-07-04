import { createClient } from "./supabase/server";
import { isSupabaseConfigured } from "./supabase/config";
import {
  sampleBanners,
  sampleCategories,
  sampleContact,
  sampleGallery,
  sampleProducts,
  sampleTestimonials,
} from "./sample-data";
import type {
  Banner,
  Category,
  ContactInfo,
  GalleryImage,
  Product,
  Testimonial,
} from "./types";

/**
 * Data access layer. When Supabase env vars are present, data is read from
 * the database. Otherwise the bundled sample data is returned so the site
 * works out-of-the-box. Any Supabase error also falls back to sample data.
 */

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured) return sampleCategories;
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error || !data?.length) return sampleCategories;
    return data as Category[];
  } catch {
    return sampleCategories;
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured) return sampleProducts;
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error || !data?.length) return sampleProducts;
    return data as Product[];
  } catch {
    return sampleProducts;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.featured).slice(0, 6);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.id === id) ?? null;
}

export async function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.category_slug === categorySlug);
}

export async function getBanners(): Promise<Banner[]> {
  if (!isSupabaseConfigured) return sampleBanners;
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("banners")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });
    if (error || !data?.length) return sampleBanners;
    return data as Banner[];
  } catch {
    return sampleBanners;
  }
}

export async function getGallery(): Promise<GalleryImage[]> {
  if (!isSupabaseConfigured) return sampleGallery;
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error || !data?.length) return sampleGallery;
    return data as GalleryImage[];
  } catch {
    return sampleGallery;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured) return sampleTestimonials;
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("testimonials").select("*");
    if (error || !data?.length) return sampleTestimonials;
    return data as Testimonial[];
  } catch {
    return sampleTestimonials;
  }
}

export async function getContactInfo(): Promise<ContactInfo> {
  if (!isSupabaseConfigured) return sampleContact;
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("contact_info")
      .select("*")
      .limit(1)
      .single();
    if (error || !data) return sampleContact;
    return data as ContactInfo;
  } catch {
    return sampleContact;
  }
}
