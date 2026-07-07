import { Plus, Save } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import DeleteButton from "@/components/admin/DeleteButton";
import { getAllTestimonials } from "@/lib/data";
import { deleteTestimonial, saveTestimonial } from "@/app/admin/actions";
import type { Testimonial } from "@/lib/types";

const label = "mb-1 block text-xs font-medium text-charcoal/70";
const field =
  "w-full rounded-lg border border-wood-200 bg-white px-3 py-2 text-sm outline-none focus:border-wood-400";

function TestimonialFields({ testimonial }: { testimonial?: Partial<Testimonial> }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div>
        <label className={label}>Name</label>
        <input name="name" required defaultValue={testimonial?.name} className={field} />
      </div>
      <div>
        <label className={label}>Location</label>
        <input name="location" defaultValue={testimonial?.location} className={field} />
      </div>
      <div>
        <label className={label}>Rating (1-5)</label>
        <input
          name="rating"
          type="number"
          min={1}
          max={5}
          defaultValue={testimonial?.rating ?? 5}
          className={field}
        />
      </div>
      <div className="sm:col-span-2">
        <label className={label}>Quote</label>
        <textarea
          name="quote"
          required
          defaultValue={testimonial?.quote}
          className={`${field} min-h-[100px]`}
        />
      </div>
      <div className="sm:col-span-2">
        <label className={label}>Avatar</label>
        <ImageUploader
          name="avatar"
          defaultValue={testimonial?.avatar ? [testimonial.avatar] : []}
          multiple={false}
        />
      </div>
      <div>
        <label className={label}>Approved</label>
        <label className="flex items-center gap-2 text-sm text-charcoal/70">
          <input type="checkbox" name="approved" defaultChecked={testimonial?.approved} />
          Visible on website
        </label>
      </div>
    </div>
  );
}

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonials();

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-charcoal">Testimonials</h1>
      <p className="mt-1 text-sm text-charcoal/60">
        Approve genuine reviews and collect new submissions.
      </p>

      <div className="mt-6 space-y-4">
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-2xl bg-white p-5 shadow-card">
            <form action={saveTestimonial} className="space-y-4">
              <input type="hidden" name="id" value={t.id} />
              <TestimonialFields testimonial={t} />
              <div className="flex items-center justify-between">
                <button type="submit" className="btn-primary">
                  <Save size={16} /> Save
                </button>
                <DeleteButton
                  action={deleteTestimonial}
                  id={t.id}
                  label={`Delete testimonial from "${t.name}"?`}
                />
              </div>
            </form>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border-2 border-dashed border-wood-200 bg-white/60 p-5">
        <h2 className="mb-4 flex items-center gap-2 font-serif text-lg font-semibold text-charcoal">
          <Plus size={18} /> Add Testimonial
        </h2>
        <form action={saveTestimonial} className="space-y-4">
          <TestimonialFields />
          <button type="submit" className="btn-primary">
            <Plus size={16} /> Create Testimonial
          </button>
        </form>
      </div>
    </div>
  );
}
