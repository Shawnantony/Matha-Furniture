import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ProductForm from "@/components/admin/ProductForm";
import { getCategories, getProductById } from "@/lib/data";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const [product, categories] = await Promise.all([
    getProductById(params.id),
    getCategories(),
  ]);

  if (!product) notFound();

  return (
    <div>
      <Link
        href="/admin/products"
        className="mb-4 inline-flex items-center gap-1 text-sm text-charcoal/60 hover:text-wood-700"
      >
        <ArrowLeft size={16} /> Back to products
      </Link>
      <h1 className="mb-6 font-serif text-3xl font-bold text-charcoal">
        Edit Product
      </h1>
      <div className="rounded-2xl bg-white p-6 shadow-card">
        <ProductForm product={product} categories={categories} />
      </div>
    </div>
  );
}
