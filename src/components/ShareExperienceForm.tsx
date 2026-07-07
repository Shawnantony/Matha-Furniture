"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitTestimonial } from "@/app/(site)/actions";

const initialState = { success: "", error: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary w-full sm:w-auto" disabled={pending}>
      {pending ? "Sending..." : "Send Review"}
    </button>
  );
}

export default function ShareExperienceForm() {
  const [state, formAction] = useFormState(submitTestimonial, initialState);

  return (
    <form action={formAction} className="space-y-4 rounded-3xl bg-white p-6 shadow-card">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-charcoal">Name *</label>
          <input
            type="text"
            name="name"
            required
            className="w-full rounded-xl border border-wood-200 px-4 py-3 text-sm outline-none focus:border-wood-400"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-charcoal">Location</label>
          <input
            type="text"
            name="location"
            className="w-full rounded-xl border border-wood-200 px-4 py-3 text-sm outline-none focus:border-wood-400"
            placeholder="City / Area"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-charcoal">Rating</label>
          <select
            name="rating"
            defaultValue="5"
            className="w-full rounded-xl border border-wood-200 px-4 py-3 text-sm outline-none focus:border-wood-400"
          >
            {[5, 4, 3, 2, 1].map((value) => (
              <option key={value} value={value}>
                {value} Stars
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-charcoal">
            Avatar URL (optional)
          </label>
          <input
            type="url"
            name="avatar"
            className="w-full rounded-xl border border-wood-200 px-4 py-3 text-sm outline-none focus:border-wood-400"
            placeholder="https://..."
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-charcoal">Your experience *</label>
        <textarea
          name="quote"
          required
          className="w-full rounded-xl border border-wood-200 px-4 py-3 text-sm outline-none focus:border-wood-400"
          rows={4}
          placeholder="Tell us what you loved about Matha Furniture"
        />
      </div>
      {state.error && (
        <p className="text-sm text-red-600" role="status">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="text-sm text-green-600" role="status">
          {state.success}
        </p>
      )}
      <SubmitButton />
      <p className="text-xs text-charcoal/60">
        We review every submission before publishing to keep the testimonials authentic.
      </p>
    </form>
  );
}
