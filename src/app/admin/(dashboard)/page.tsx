import Link from "next/link";
import { Sofa, Tags, Images, GalleryHorizontalEnd, ArrowRight } from "lucide-react";
import {
  getBanners,
  getCategories,
  getGallery,
  getProducts,
} from "@/lib/data";

export default async function AdminDashboard() {
  const [products, categories, banners, gallery] = await Promise.all([
    getProducts(),
    getCategories(),
    getBanners(),
    getGallery(),
  ]);

  const stats = [
    { label: "Products", value: products.length, icon: Sofa, href: "/admin/products" },
    { label: "Categories", value: categories.length, icon: Tags, href: "/admin/categories" },
    { label: "Banners", value: banners.length, icon: Images, href: "/admin/banners" },
    { label: "Gallery Images", value: gallery.length, icon: GalleryHorizontalEnd, href: "/admin/gallery" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-charcoal">Dashboard</h1>
      <p className="mt-1 text-sm text-charcoal/60">
        Welcome back. Here&apos;s an overview of your store.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl bg-white p-6 shadow-card transition hover:shadow-soft"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-wood-100 text-wood-700">
                <s.icon size={22} />
              </span>
              <ArrowRight size={18} className="text-charcoal/30" />
            </div>
            <p className="mt-4 font-serif text-3xl font-bold text-charcoal">
              {s.value}
            </p>
            <p className="text-sm text-charcoal/60">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-card">
        <h2 className="font-serif text-lg font-semibold text-charcoal">
          Quick actions
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/admin/products/new" className="btn-primary">
            Add Product
          </Link>
          <Link href="/admin/categories" className="btn-outline">
            Manage Categories
          </Link>
          <Link href="/admin/banners" className="btn-outline">
            Update Banners
          </Link>
          <Link href="/admin/contact" className="btn-outline">
            Edit Contact Info
          </Link>
        </div>
      </div>
    </div>
  );
}
