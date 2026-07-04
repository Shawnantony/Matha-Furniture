import { Save } from "lucide-react";
import { saveContactInfo } from "@/app/admin/actions";
import { getContactInfo } from "@/lib/data";

const label = "mb-1 block text-xs font-medium text-charcoal/70";
const field =
  "w-full rounded-lg border border-wood-200 bg-white px-3 py-2 text-sm outline-none focus:border-wood-400";

export default async function AdminContactPage() {
  const contact = await getContactInfo();

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-charcoal">
        Contact Information
      </h1>
      <p className="mt-1 text-sm text-charcoal/60">
        Update your business contact details and showroom locations.
      </p>

      <form action={saveContactInfo} className="mt-6 space-y-6">
        <input type="hidden" name="id" value={contact.id} />

        <div className="rounded-2xl bg-white p-6 shadow-card">
          <h2 className="mb-4 font-serif text-lg font-semibold text-charcoal">
            Business Details
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>Business Name</label>
              <input
                name="business_name"
                defaultValue={contact.business_name}
                className={field}
              />
            </div>
            <div>
              <label className={label}>Email</label>
              <input name="email" defaultValue={contact.email} className={field} />
            </div>
            <div>
              <label className={label}>Phone</label>
              <input name="phone" defaultValue={contact.phone} className={field} />
            </div>
            <div>
              <label className={label}>WhatsApp Number (with country code)</label>
              <input
                name="whatsapp"
                defaultValue={contact.whatsapp}
                placeholder="919999999999"
                className={field}
              />
            </div>
            <div>
              <label className={label}>Instagram URL</label>
              <input
                name="instagram"
                defaultValue={contact.instagram}
                className={field}
              />
            </div>
            <div>
              <label className={label}>Facebook URL</label>
              <input
                name="facebook"
                defaultValue={contact.facebook}
                className={field}
              />
            </div>
          </div>
        </div>

        {[0, 1].map((i) => {
          const loc = contact.locations[i];
          return (
            <div key={i} className="rounded-2xl bg-white p-6 shadow-card">
              <h2 className="mb-4 font-serif text-lg font-semibold text-charcoal">
                Showroom {i + 1}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={label}>Name</label>
                  <input
                    name={`loc_${i}_name`}
                    defaultValue={loc?.name}
                    className={field}
                  />
                </div>
                <div>
                  <label className={label}>Phone</label>
                  <input
                    name={`loc_${i}_phone`}
                    defaultValue={loc?.phone}
                    className={field}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={label}>Address</label>
                  <input
                    name={`loc_${i}_address`}
                    defaultValue={loc?.address}
                    className={field}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={label}>Opening Hours</label>
                  <input
                    name={`loc_${i}_hours`}
                    defaultValue={loc?.hours}
                    className={field}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={label}>Google Maps Embed URL</label>
                  <input
                    name={`loc_${i}_map`}
                    defaultValue={loc?.map_embed}
                    className={field}
                  />
                </div>
              </div>
            </div>
          );
        })}

        <button type="submit" className="btn-primary">
          <Save size={16} /> Save Contact Info
        </button>
      </form>
    </div>
  );
}
