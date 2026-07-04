"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { whatsappLink } from "@/lib/site-config";

export default function ContactForm({ whatsapp }: { whatsapp: string }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi Matha Furniture!%0A%0AName: ${form.name}%0APhone: ${form.phone}%0A%0A${form.message}`;
    const url = whatsappLink(
      decodeURIComponent(text.replace(/%0A/g, "\n")),
      whatsapp
    );
    window.open(url, "_blank");
  };

  const field =
    "w-full rounded-xl border border-wood-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-wood-400 focus:ring-2 focus:ring-wood-100";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-charcoal">
          Name
        </label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your name"
          className={field}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-charcoal">
          Phone
        </label>
        <input
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="Your phone number"
          className={field}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-charcoal">
          Message
        </label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell us what you're looking for..."
          className={field}
        />
      </div>
      <button type="submit" className="btn-whatsapp w-full">
        <Send size={18} /> Send via WhatsApp
      </button>
    </form>
  );
}
