import { Plus, Save } from "lucide-react";
import { deleteCategory, saveCategory } from "@/app/admin/actions";
import DeleteButton from "@/components/admin/DeleteButton";
import ImageUploader from "@/components/admin/ImageUploader";
import { getCategories } from "@/lib/data";
import type { Category } from "@/lib/types";

const label = "mb-1 block text-xs font-medium text-charcoal/70";
const field =
  "w-full rounded-lg border border-wood-200 bg-white px-3 py-2 text-sm outline-none focus:border-wood-400";

function CategoryFields({ category }: { category?: Category }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div>
        <label className={label}>Name</label>
        <input name="name" required defaultValue={category?.name} className={field} />
      </div>
      <div>
        <label className={label}>Slug (optional)</label>
        <input name="slug" defaultValue={category?.slug} className={field} />
      </div>
      <div className="sm:col-span-2">
        <label className={label}>Description</label>
        <input
          name="description"
          defaultValue={category?.description}
          className={field}
        />
      </div>
      <div>
        <label className={label}>Sort Order</label>
        <input
          name="sort_order"
          type="number"
          defaultValue={category?.sort_order ?? 0}
          className={field}
        />
      </div>
      <div className="sm:col-span-2">
        <label className={label}>Image</label>
        <ImageUploader
          name="image"
          defaultValue={category?.image ? [category.image] : []}
          multiple={false}
        />
      </div>
    </div>
  );
}

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-charcoal">Categories</h1>
      <p className="mt-1 text-sm text-charcoal/60">
        Manage the product categories shown across the site.
      </p>

      <div className="mt-6 space-y-4">
        {categories.map((c) => (
          <div key={c.id} className="rounded-2xl bg-white p-5 shadow-card">
            <form action={saveCategory} className="space-y-4">
              <input type="hidden" name="id" value={c.id} />
              <CategoryFields category={c} />
              <div className="flex items-center justify-between">
                <button type="submit" className="btn-primary">
                  <Save size={16} /> Save
                </button>
                <DeleteButton
                  action={deleteCategory}
                  id={c.id}
                  label={`Delete category "${c.name}"?`}
                />
              </div>
            </form>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border-2 border-dashed border-wood-200 bg-white/60 p-5">
        <h2 className="mb-4 flex items-center gap-2 font-serif text-lg font-semibold text-charcoal">
          <Plus size={18} /> Add Category
        </h2>
        <form action={saveCategory} className="space-y-4">
          <CategoryFields />
          <button type="submit" className="btn-primary">
            <Plus size={16} /> Create Category
          </button>
        </form>
      </div>
    </div>
  );
}
