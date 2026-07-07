"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sofa,
  Tags,
  Images,
  GalleryHorizontalEnd,
  MessageSquareQuote,
  Phone,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "@/app/admin/actions";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Sofa },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/banners", label: "Banners", icon: Images },
  { href: "/admin/gallery", label: "Gallery", icon: GalleryHorizontalEnd },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/contact", label: "Contact Info", icon: Phone },
];

export default function AdminSidebar({ email }: { email?: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col bg-charcoal text-cream/80 lg:w-64">
      <div className="border-b border-white/10 p-6">
        <p className="font-serif text-xl font-bold text-white">Matha Admin</p>
        <p className="mt-1 truncate text-xs text-cream/50">{email}</p>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {links.map((l) => {
          const active =
            l.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                active
                  ? "bg-wood-600 text-white"
                  : "text-cream/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <l.icon size={18} />
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-white/10 p-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-cream/70 transition hover:bg-white/10 hover:text-white"
        >
          <ExternalLink size={18} /> View Website
        </Link>
        <form action={signOut}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
