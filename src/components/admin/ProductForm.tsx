"use client";

import { useState } from "react";
import { saveProduct } from "@/app/admin/actions";
import ImageUploader from "./ImageUploader";
import type { Category, Product } from "@/lib/types";

const label = "mb-1 block text-sm font-medium text-charcoal";
const field =
  "w-full rounded-xl border border-wood-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-wood-400 focus:ring-2 focus:ring-wood-100";

export default function ProductForm({
  product,
  categories,
}: {
  product?: Product;
  categories: Category[];
}) {
  const [saving, setSaving] = useState(false);

  return (
    <form
      action={saveProduct}
      onSubmit={() => setSaving(true)}
      className="space-y-6"
    >
      {product && <input type="hidden" name="id" value={product.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label}>Product Name</label>
          <input
            name="name"
            required
            defaultValue={product?.name}
            className={field}
          />
        </div>
        <div>
          <label className={label}>Slug (optional)</label>
          <input
            name="slug"
            defaultValue={product?.slug}
            placeholder="auto-generated from name"
            className={field}
          />
        </div>
        <div>
          <label className={label}>Category</label>
          <select
            name="category_slug"
            required
            defaultValue={product?.category_slug || categories[0]?.slug}
            className={field}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>Price Label</label>
          <input
            name="price_label"
            defaultValue={product?.price_label || "On request"}
            className={field}
          />
        </div>
      </div>

      <div>
        <label className={label}>Short Description</label>
        <input
          name="short_description"
          defaultValue={product?.short_description}
          className={field}
        />
      </div>

      <div>
        <label className={label}>Full Description</label>
        <textarea
          name="description"
          rows={4}
          defaultValue={product?.description}
          className={field}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label}>Material</label>
          <input
            name="material"
            defaultValue={product?.material}
            className={field}
          />
        </div>
        <div>
          <label className={label}>Dimensions</label>
          <input
            name="dimensions"
            defaultValue={product?.dimensions}
            className={field}
          />
        </div>
      </div>

      <div>
        <label className={label}>
          Available Colours (comma or newline separated)
        </label>
        <textarea
          name="colours"
          rows={2}
          defaultValue={product?.colours.join(", ")}
          placeholder="Walnut, Ivory, Charcoal Grey"
          className={field}
        />
      </div>

      <div>
        <label className={label}>Product Images</label>
        <ImageUploader name="images" defaultValue={product?.images ?? []} />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-charcoal">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={product?.featured}
            className="h-4 w-4 rounded border-wood-300"
          />
          Featured on homepage
        </label>
        <label className="flex items-center gap-2 text-sm text-charcoal">
          <input
            type="checkbox"
            name="in_stock"
            defaultChecked={product?.in_stock ?? true}
            className="h-4 w-4 rounded border-wood-300"
          />
          In stock
        </label>
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? "Saving..." : product ? "Update Product" : "Create Product"}
        </button>
        <a href="/admin/products" className="btn-outline">
          Cancel
        </a>
      </div>
    </form>
  );
}
