import { Plus, Save } from "lucide-react";
import { deleteBanner, saveBanner } from "@/app/admin/actions";
import DeleteButton from "@/components/admin/DeleteButton";
import ImageUploader from "@/components/admin/ImageUploader";
import { getBanners } from "@/lib/data";
import type { Banner } from "@/lib/types";

const label = "mb-1 block text-xs font-medium text-charcoal/70";
const field =
  "w-full rounded-lg border border-wood-200 bg-white px-3 py-2 text-sm outline-none focus:border-wood-400";

function BannerFields({ banner }: { banner?: Banner }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className={label}>Title</label>
        <input name="title" required defaultValue={banner?.title} className={field} />
      </div>
      <div className="sm:col-span-2">
        <label className={label}>Subtitle</label>
        <input name="subtitle" defaultValue={banner?.subtitle} className={field} />
      </div>
      <div>
        <label className={label}>CTA Label</label>
        <input
          name="cta_label"
          defaultValue={banner?.cta_label || "Explore Collection"}
          className={field}
        />
      </div>
      <div>
        <label className={label}>CTA Link</label>
        <input
          name="cta_href"
          defaultValue={banner?.cta_href || "/products"}
          className={field}
        />
      </div>
      <div>
        <label className={label}>Sort Order</label>
        <input
          name="sort_order"
          type="number"
          defaultValue={banner?.sort_order ?? 0}
          className={field}
        />
      </div>
      <div className="flex items-end">
        <label className="flex items-center gap-2 text-sm text-charcoal">
          <input
            type="checkbox"
            name="active"
            defaultChecked={banner?.active ?? true}
            className="h-4 w-4 rounded border-wood-300"
          />
          Active
        </label>
      </div>
      <div className="sm:col-span-2">
        <label className={label}>Banner Image</label>
        <ImageUploader
          name="image"
          defaultValue={banner?.image ? [banner.image] : []}
          multiple={false}
        />
      </div>
    </div>
  );
}

export default async function AdminBannersPage() {
  const banners = await getBanners();

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-charcoal">
        Homepage Banners
      </h1>
      <p className="mt-1 text-sm text-charcoal/60">
        Manage the hero slides shown on the homepage.
      </p>

      <div className="mt-6 space-y-4">
        {banners.map((b) => (
          <div key={b.id} className="rounded-2xl bg-white p-5 shadow-card">
            <form action={saveBanner} className="space-y-4">
              <input type="hidden" name="id" value={b.id} />
              <BannerFields banner={b} />
              <div className="flex items-center justify-between">
                <button type="submit" className="btn-primary">
                  <Save size={16} /> Save
                </button>
                <DeleteButton
                  action={deleteBanner}
                  id={b.id}
                  label={`Delete banner "${b.title}"?`}
                />
              </div>
            </form>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border-2 border-dashed border-wood-200 bg-white/60 p-5">
        <h2 className="mb-4 flex items-center gap-2 font-serif text-lg font-semibold text-charcoal">
          <Plus size={18} /> Add Banner
        </h2>
        <form action={saveBanner} className="space-y-4">
          <BannerFields />
          <button type="submit" className="btn-primary">
            <Plus size={16} /> Create Banner
          </button>
        </form>
      </div>
    </div>
  );
}
