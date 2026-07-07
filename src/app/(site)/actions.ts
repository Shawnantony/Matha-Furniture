"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

export type SubmitTestimonialState = {
  success?: string;
  error?: string;
};

const initialState: SubmitTestimonialState = {};

export async function submitTestimonial(
  _prevState: SubmitTestimonialState = initialState,
  formData: FormData
): Promise<SubmitTestimonialState> {
  const name = String(formData.get("name") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const rating = Number(formData.get("rating") || 5);
  const quote = String(formData.get("quote") || "").trim();
  const avatar = String(formData.get("avatar") || "").trim();

  if (!name || !quote) {
    return { error: "Name and review are required." };
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("testimonials").insert({
    name,
    location,
    rating: Math.min(5, Math.max(1, rating || 5)),
    quote,
    avatar,
    approved: false,
  });

  if (error) {
    return { error: "Something went wrong. Please try again." };
  }

  revalidatePath("/");
  return { success: "Thanks! We'll publish your review after a quick check." };
}
