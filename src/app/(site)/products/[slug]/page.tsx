import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Ruler, Layers, Palette, CheckCircle2 } from "lucide-react";
import ProductGallery from "@/components/ProductGallery";
import ProductCard from "@/components/ProductCard";
import { whatsappLink } from "@/lib/site-config";
import {
  getCategoryBySlug,
  getProductBySlug,
  getProducts,
  getProductsByCategory,
} from "@/lib/data";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.short_description,
    openGraph: {
      title: product.name,
      description: product.short_description,
      images: product.images.slice(0, 1),
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const category = await getCategoryBySlug(product.category_slug);
  const related = (await getProductsByCategory(product.category_slug))
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const enquiry = whatsappLink(
    `Hi Matha Furniture, I'm interested in the "${product.name}". Could you share the price and availability?`
  );

  const specs = [
    { icon: Layers, label: "Material", value: product.material },
    { icon: Ruler, label: "Dimensions", value: product.dimensions },
  ];

  return (
    <>
      <div className="container-wide py-8">
        <nav className="flex items-center gap-1 text-sm text-charcoal/60">
          <Link href="/" className="hover:text-wood-700">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/products" className="hover:text-wood-700">
            Products
          </Link>
          <ChevronRight size={14} />
          {category && (
            <>
              <Link
                href={`/products?category=${category.slug}`}
                className="hover:text-wood-700"
              >
                {category.name}
              </Link>
              <ChevronRight size={14} />
            </>
          )}
          <span className="text-charcoal">{product.name}</span>
        </nav>
      </div>

      <section className="container-wide grid gap-10 pb-16 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          {category && (
            <span className="eyebrow">{category.name}</span>
          )}
          <h1 className="mt-2 font-serif text-3xl font-bold text-charcoal sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-lg font-medium text-wood-700">
            {product.price_label}
          </p>

          {product.in_stock && (
            <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
              <CheckCircle2 size={14} /> In stock
            </span>
          )}

          <p className="mt-6 leading-relaxed text-charcoal/75">
            {product.description}
          </p>

          <div className="mt-8 space-y-4 rounded-2xl bg-wood-50 p-6">
            {specs.map((s) => (
              <div key={s.label} className="flex gap-3">
                <s.icon size={20} className="mt-0.5 shrink-0 text-wood-600" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/50">
                    {s.label}
                  </p>
                  <p className="text-sm text-charcoal">{s.value}</p>
                </div>
              </div>
            ))}
            {product.colours.length > 0 && (
              <div className="flex gap-3">
                <Palette size={20} className="mt-0.5 shrink-0 text-wood-600" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/50">
                    Available Colours
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {product.colours.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-wood-200 bg-white px-3 py-1 text-xs text-charcoal"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={enquiry}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp flex-1 sm:flex-none"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893C23.945 5.335 18.61.001 12.05 0zm0 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z" />
              </svg>
              Enquire on WhatsApp
            </a>
            <Link href="/contact" className="btn-outline">
              Visit Showroom
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-wood-50 py-16">
          <div className="container-wide">
            <h2 className="section-title mb-8">You may also like</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
