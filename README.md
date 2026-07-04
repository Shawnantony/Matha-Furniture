# Matha Furniture

A premium, mobile-responsive furniture showroom website for **Matha Furniture**, Thiruvananthapuram, Kerala — built with Next.js, TypeScript, Tailwind CSS and Supabase, and ready to deploy on Vercel.

Clean white theme with warm wooden accents, smooth animations, product catalogue with search & filters, a gallery, contact pages with two showroom locations, and a secure admin dashboard.

---

## ✨ Features

**Public site**
- Home page: hero banner carousel, featured furniture, categories, why-choose-us, testimonials, showroom highlight, call-to-action, footer
- About Us page
- Products with search + category filters and detailed product pages
  (multiple images, description, material, dimensions, colours, **WhatsApp enquiry button**)
- Gallery with lightbox + category filter
- Contact page with **two showrooms** (Kesavadasapuram & Pattom), Google Maps embeds, and a WhatsApp contact form
- SEO-friendly: per-page metadata, Open Graph, `sitemap.xml`, `robots.txt`
- Optimized images (`next/image`, AVIF/WebP), fast loading, responsive design
- Floating WhatsApp button

**Admin dashboard** (`/admin`) — secure, Supabase-authenticated
- Add / edit / delete products
- Upload multiple product images (Supabase Storage) or paste image URLs
- Create / edit / delete categories
- Update homepage banners
- Manage gallery images
- Update contact information & showroom details

**Product categories:** Sofas, Beds, Dining Tables, Wardrobes, Office Furniture, TV Units, Chairs, Mattresses.

> 💡 The site ships with **sample data** and works immediately, even before you connect Supabase. Once you add your Supabase credentials and run the SQL, all content becomes editable from the admin dashboard.

---

## 🧱 Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router) + React 18
- TypeScript
- Tailwind CSS
- [Supabase](https://supabase.com/) — PostgreSQL database, Storage, Auth
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide](https://lucide.dev/) icons
- Deploy-ready for [Vercel](https://vercel.com/)

---

## 📁 Project Structure

```
matha-furniture/
├── public/                     # Static assets (placeholder image)
├── supabase/
│   ├── schema.sql              # Database tables, RLS policies, storage bucket
│   └── seed.sql                # Sample data (optional)
├── src/
│   ├── app/
│   │   ├── (site)/             # Public website (shared nav/footer layout)
│   │   │   ├── page.tsx        # Home
│   │   │   ├── about/
│   │   │   ├── products/
│   │   │   │   └── [slug]/     # Product detail
│   │   │   ├── gallery/
│   │   │   └── contact/
│   │   ├── admin/
│   │   │   ├── login/          # Admin login
│   │   │   ├── (dashboard)/    # Protected dashboard (sidebar layout)
│   │   │   │   ├── page.tsx        # Overview
│   │   │   │   ├── products/
│   │   │   │   ├── categories/
│   │   │   │   ├── banners/
│   │   │   │   ├── gallery/
│   │   │   │   └── contact/
│   │   │   └── actions.ts      # Server actions (CRUD)
│   │   ├── layout.tsx          # Root layout, fonts, global metadata
│   │   ├── sitemap.ts / robots.ts
│   │   └── globals.css
│   ├── components/             # UI + admin components
│   ├── lib/
│   │   ├── data.ts             # Data access (Supabase w/ sample fallback)
│   │   ├── sample-data.ts      # Bundled sample content
│   │   ├── site-config.ts      # Site config + WhatsApp helper
│   │   ├── types.ts
│   │   └── supabase/           # Supabase clients (browser/server/admin/middleware)
│   └── middleware.ts           # Protects /admin routes
├── .env.example
├── next.config.mjs
├── tailwind.config.ts
└── vercel.json
```

---

## 🚀 Getting Started (Local)

### 1. Install dependencies
```bash
npm install
```

### 2. Run the dev server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000). The site works right away using sample data.

---

## 🔌 Connect Supabase (enables the admin dashboard)

1. Create a free project at [supabase.com](https://supabase.com/).
2. In the Supabase dashboard, open **SQL Editor → New query**, paste the contents of
   [`supabase/schema.sql`](supabase/schema.sql) and run it. (Optionally also run
   [`supabase/seed.sql`](supabase/seed.sql) to load sample content into the database.)
   - This creates all tables, Row-Level-Security policies, and a public
     Storage bucket named `matha-media`.
3. Get your API keys from **Project Settings → API**.
4. Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=matha-media
NEXT_PUBLIC_WHATSAPP_NUMBER=91XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. Restart the dev server.

### Create an admin user
In the Supabase dashboard go to **Authentication → Users → Add user**, create a
user with an email + password (mark it as auto-confirmed). Use those credentials
to log in at [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

> By default any authenticated Supabase user can access the admin dashboard.
> Only create accounts for people who should be admins.

---

## 🖼️ Replacing sample content

- **Before Supabase:** edit `src/lib/sample-data.ts` to change products, categories,
  banners, gallery, testimonials and contact details.
- **After Supabase:** manage everything from the admin dashboard at `/admin`.

Placeholder images are loaded from Unsplash. Replace them with your own by uploading
via the admin dashboard (stored in Supabase Storage) or by pasting image URLs.

---

## ⚙️ Configuration notes

- **WhatsApp number:** set `NEXT_PUBLIC_WHATSAPP_NUMBER` (with country code, no `+`,
  e.g. `919999999999`). Used by the floating button, enquiry buttons and contact form.
- **Google Maps:** each showroom uses a Maps embed URL, editable in
  Admin → Contact Info (or `sample-data.ts`).
- **Site URL:** set `NEXT_PUBLIC_SITE_URL` to your production domain for correct
  SEO metadata and sitemap URLs.

---

## 📦 Available Scripts

| Command         | Description                          |
|-----------------|--------------------------------------|
| `npm run dev`   | Start the development server         |
| `npm run build` | Production build                     |
| `npm run start` | Run the production build             |
| `npm run lint`  | Run ESLint                           |

---

## ▲ Deploy to Vercel

1. Push this repository to GitHub (see below).
2. Go to [vercel.com](https://vercel.com/) → **Add New → Project** and import the repo.
3. Vercel auto-detects Next.js. Add the environment variables from your `.env.local`
   under **Project Settings → Environment Variables**.
4. Click **Deploy**.
5. After deploying, set `NEXT_PUBLIC_SITE_URL` to your Vercel domain and redeploy.

---

## 🐙 Push to GitHub

```bash
# from the matha-furniture folder
git init
git add .
git commit -m "Initial commit: Matha Furniture website"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

---

## 📄 License

Proprietary — © Matha Furniture. All rights reserved.
