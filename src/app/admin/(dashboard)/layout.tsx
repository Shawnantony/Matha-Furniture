import Link from "next/link";
import { redirect } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata = { title: "Admin Dashboard" };

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-wood-50 px-4">
        <div className="max-w-lg rounded-3xl bg-white p-8 text-center shadow-soft">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
            <AlertTriangle size={24} />
          </div>
          <h1 className="mt-4 font-serif text-2xl font-bold text-charcoal">
            Supabase not configured
          </h1>
          <p className="mt-3 text-sm text-charcoal/70">
            The admin dashboard needs a Supabase connection. Add your
            <code className="mx-1 rounded bg-wood-50 px-1">
              NEXT_PUBLIC_SUPABASE_URL
            </code>
            and
            <code className="mx-1 rounded bg-wood-50 px-1">
              NEXT_PUBLIC_SUPABASE_ANON_KEY
            </code>
            to <code className="rounded bg-wood-50 px-1">.env.local</code>, then
            run the SQL in <code className="rounded bg-wood-50 px-1">supabase/schema.sql</code>.
            See the README for full setup instructions.
          </p>
          <Link href="/" className="btn-primary mt-6">
            Back to Website
          </Link>
        </div>
      </div>
    );
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen flex-col bg-wood-50 lg:flex-row">
      <div className="lg:fixed lg:inset-y-0 lg:w-64">
        <AdminSidebar email={user.email} />
      </div>
      <div className="flex-1 lg:pl-64">
        <main className="mx-auto max-w-5xl p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
