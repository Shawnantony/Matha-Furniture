"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { slugify } from "@/lib/utils";

async function getClient() {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase is not configured. Add your environment variables to enable admin editing."
    );
  }
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return supabase;
}

function toList(value: FormDataEntryValue | null): string[] {
  if (!value) return [];
  return String(value)
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function revalidateAll() {
  revalidatePath("/", "layout");
}

/* ------------------------------ Products ------------------------------ */

export async function saveProduct(formData: FormData) {
  const supabase = await getClient();
  const id = formData.get("id") as string | null;
  const name = String(formData.get("name") || "").trim();

  const payload = {
    name,
    slug: (formData.get("slug") as string)?.trim() || slugify(name),
    category_slug: String(formData.get("category_slug") || ""),
    short_description: String(formData.get("short_description") || ""),
    description: String(formData.get("description") || ""),
    material: String(formData.get("material") || ""),
    dimensions: String(formData.get("dimensions") || ""),
    price_label: String(formData.get("price_label") || "On request"),
    colours: toList(formData.get("colours")),
    images: toList(formData.get("images")),
    featured: formData.get("featured") === "on",
    in_stock: formData.get("in_stock") === "on",
  };

  if (id) {
    const { error } = await supabase.from("products").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("products").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidateAll();
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  const supabase = await getClient();
  const id = String(formData.get("id"));
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  revalidatePath("/admin/products");
}

/* ------------------------------ Categories ------------------------------ */

export async function saveCategory(formData: FormData) {
  const supabase = await getClient();
  const id = formData.get("id") as string | null;
  const name = String(formData.get("name") || "").trim();

  const payload = {
    name,
    slug: (formData.get("slug") as string)?.trim() || slugify(name),
    description: String(formData.get("description") || ""),
    image: String(formData.get("image") || ""),
    sort_order: Number(formData.get("sort_order") || 0),
  };

  if (id) {
    const { error } = await supabase.from("categories").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("categories").insert(payload);
    if (error) throw new Error(error.message);
  }
  revalidateAll();
  redirect("/admin/categories");
}

export async function deleteCategory(formData: FormData) {
  const supabase = await getClient();
  const id = String(formData.get("id"));
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  revalidatePath("/admin/categories");
}

/* ------------------------------ Testimonials ------------------------------ */

export async function saveTestimonial(formData: FormData) {
  const supabase = await getClient();
  const id = formData.get("id") as string | null;
  const payload = {
    name: String(formData.get("name") || "").trim(),
    location: String(formData.get("location") || "").trim(),
    rating: Number(formData.get("rating") || 5),
    quote: String(formData.get("quote") || "").trim(),
    avatar: String(formData.get("avatar") || "").trim(),
    approved: formData.get("approved") === "on",
  };

  if (id) {
    const { error } = await supabase
      .from("testimonials")
      .update(payload)
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("testimonials").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidateAll();
  revalidatePath("/admin/testimonials");
}

export async function deleteTestimonial(formData: FormData) {
  const supabase = await getClient();
  const id = String(formData.get("id"));
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  revalidatePath("/admin/testimonials");
}

/* ------------------------------ Banners ------------------------------ */

export async function saveBanner(formData: FormData) {
  const supabase = await getClient();
  const id = formData.get("id") as string | null;

  const payload = {
    title: String(formData.get("title") || ""),
    subtitle: String(formData.get("subtitle") || ""),
    image: String(formData.get("image") || ""),
    cta_label: String(formData.get("cta_label") || "Explore"),
    cta_href: String(formData.get("cta_href") || "/products"),
    active: formData.get("active") === "on",
    sort_order: Number(formData.get("sort_order") || 0),
  };

  if (id) {
    const { error } = await supabase.from("banners").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("banners").insert(payload);
    if (error) throw new Error(error.message);
  }
  revalidateAll();
  redirect("/admin/banners");
}

export async function deleteBanner(formData: FormData) {
  const supabase = await getClient();
  const id = String(formData.get("id"));
  const { error } = await supabase.from("banners").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  revalidatePath("/admin/banners");
}

/* ------------------------------ Gallery ------------------------------ */

export async function saveGalleryImage(formData: FormData) {
  const supabase = await getClient();
  const id = formData.get("id") as string | null;

  const payload = {
    title: String(formData.get("title") || ""),
    image: String(formData.get("image") || ""),
    category: String(formData.get("category") || "General"),
    sort_order: Number(formData.get("sort_order") || 0),
  };

  if (id) {
    const { error } = await supabase.from("gallery").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("gallery").insert(payload);
    if (error) throw new Error(error.message);
  }
  revalidateAll();
  redirect("/admin/gallery");
}

export async function deleteGalleryImage(formData: FormData) {
  const supabase = await getClient();
  const id = String(formData.get("id"));
  const { error } = await supabase.from("gallery").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  revalidatePath("/admin/gallery");
}

/* ------------------------------ Contact ------------------------------ */

export async function saveContactInfo(formData: FormData) {
  const supabase = await getClient();
  const id = formData.get("id") as string | null;

  const locations = [0, 1].map((i) => ({
    name: String(formData.get(`loc_${i}_name`) || ""),
    address: String(formData.get(`loc_${i}_address`) || ""),
    phone: String(formData.get(`loc_${i}_phone`) || ""),
    hours: String(formData.get(`loc_${i}_hours`) || ""),
    map_embed: String(formData.get(`loc_${i}_map`) || ""),
  }));

  const payload = {
    business_name: String(formData.get("business_name") || ""),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("phone") || ""),
    whatsapp: String(formData.get("whatsapp") || ""),
    instagram: String(formData.get("instagram") || ""),
    facebook: String(formData.get("facebook") || ""),
    locations,
  };

  if (id) {
    const { error } = await supabase
      .from("contact_info")
      .update(payload)
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("contact_info").insert(payload);
    if (error) throw new Error(error.message);
  }
  revalidateAll();
  redirect("/admin/contact");
}

/* ------------------------------ Auth ------------------------------ */

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
