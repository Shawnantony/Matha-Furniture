import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { deleteProduct } from "@/app/admin/actions";
import DeleteButton from "@/components/admin/DeleteButton";
import { getCategories, getProducts } from "@/lib/data";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);
  const catName = (slug: string) =>
    categories.find((c) => c.slug === slug)?.name || slug;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcoal">
            Products
          </h1>
          <p className="mt-1 text-sm text-charcoal/60">
            {products.length} products
          </p>
        </div>
        <Link href="/admin/products/new" className="btn-primary">
          <Plus size={18} /> Add Product
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-wood-100 bg-wood-50 text-xs uppercase tracking-wide text-charcoal/60">
            <tr>
              <th className="p-4">Product</th>
              <th className="hidden p-4 sm:table-cell">Category</th>
              <th className="hidden p-4 md:table-cell">Featured</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-wood-50 last:border-0">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-wood-50">
                      {p.images[0] && (
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <span className="font-medium text-charcoal">{p.name}</span>
                  </div>
                </td>
                <td className="hidden p-4 text-charcoal/70 sm:table-cell">
                  {catName(p.category_slug)}
                </td>
                <td className="hidden p-4 md:table-cell">
                  {p.featured ? (
                    <span className="rounded-full bg-wood-100 px-2 py-0.5 text-xs text-wood-700">
                      Featured
                    </span>
                  ) : (
                    <span className="text-charcoal/40">—</span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className="rounded-lg p-2 text-charcoal/60 transition hover:bg-wood-50 hover:text-wood-700"
                      aria-label="Edit"
                    >
                      <Pencil size={16} />
                    </Link>
                    <DeleteButton
                      action={deleteProduct}
                      id={p.id}
                      label={`Delete "${p.name}"?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
