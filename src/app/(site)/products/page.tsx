import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProductsBrowser from "@/components/ProductsBrowser";
import { getCategories, getProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse premium sofas, beds, dining tables, wardrobes, office furniture, TV units, chairs and mattresses at Matha Furniture, Thiruvananthapuram.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const initialCategory = searchParams.category || "all";

  return (
    <>
      <PageHeader
        eyebrow="Our Collection"
        title="Furniture for Every Room"
        description="Explore our curated range of premium furniture, crafted for modern Kerala homes."
      />
      <div className="container-wide py-12">
        <ProductsBrowser
          products={products}
          categories={categories}
          initialCategory={initialCategory}
        />
      </div>
    </>
  );
}
