import Image from "next/image";
import { Plus, Save } from "lucide-react";
import { deleteGalleryImage, saveGalleryImage } from "@/app/admin/actions";
import DeleteButton from "@/components/admin/DeleteButton";
import ImageUploader from "@/components/admin/ImageUploader";
import { getGallery } from "@/lib/data";

const label = "mb-1 block text-xs font-medium text-charcoal/70";
const field =
  "w-full rounded-lg border border-wood-200 bg-white px-3 py-2 text-sm outline-none focus:border-wood-400";

export default async function AdminGalleryPage() {
  const images = await getGallery();

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-charcoal">Gallery</h1>
      <p className="mt-1 text-sm text-charcoal/60">
        Manage the images shown on the gallery page.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {images.map((g) => (
          <div key={g.id} className="rounded-2xl bg-white p-4 shadow-card">
            <div className="relative mb-3 aspect-video overflow-hidden rounded-xl bg-wood-50">
              <Image
                src={g.image}
                alt={g.title}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <form action={saveGalleryImage} className="space-y-3">
              <input type="hidden" name="id" value={g.id} />
              <input type="hidden" name="image" value={g.image} />
              <div>
                <label className={label}>Title</label>
                <input name="title" defaultValue={g.title} className={field} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={label}>Category</label>
                  <input
                    name="category"
                    defaultValue={g.category}
                    className={field}
                  />
                </div>
                <div>
                  <label className={label}>Sort</label>
                  <input
                    name="sort_order"
                    type="number"
                    defaultValue={g.sort_order}
                    className={field}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button type="submit" className="btn-primary">
                  <Save size={16} /> Save
                </button>
                <DeleteButton
                  action={deleteGalleryImage}
                  id={g.id}
                  label={`Delete "${g.title}"?`}
                />
              </div>
            </form>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border-2 border-dashed border-wood-200 bg-white/60 p-5">
        <h2 className="mb-4 flex items-center gap-2 font-serif text-lg font-semibold text-charcoal">
          <Plus size={18} /> Add Gallery Image
        </h2>
        <form action={saveGalleryImage} className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className={label}>Title</label>
              <input name="title" className={field} />
            </div>
            <div>
              <label className={label}>Category</label>
              <input name="category" defaultValue="General" className={field} />
            </div>
          </div>
          <div>
            <label className={label}>Image</label>
            <ImageUploader name="image" multiple={false} />
          </div>
          <button type="submit" className="btn-primary">
            <Plus size={16} /> Add Image
          </button>
        </form>
      </div>
    </div>
  );
}
