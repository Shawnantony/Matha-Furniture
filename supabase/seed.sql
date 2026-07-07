-- ============================================================
-- Matha Furniture - sample seed data
-- Run AFTER schema.sql. Safe to re-run (uses upserts on slug).
-- ============================================================

-- Categories
insert into categories (slug, name, description, image, sort_order) values
('sofas','Sofas','Handcrafted sofas and sectionals for elegant living rooms.','https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',1),
('beds','Beds','Solid wood and upholstered beds for restful nights.','https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',2),
('dining-tables','Dining Tables','Statement dining tables that bring family together.','https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',3),
('wardrobes','Wardrobes','Spacious wardrobes with smart storage solutions.','https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',4),
('office-furniture','Office Furniture','Ergonomic desks and chairs for productive workspaces.','https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',5),
('tv-units','TV Units','Modern entertainment units and media consoles.','https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',6),
('chairs','Chairs','Accent, lounge and dining chairs in timeless designs.','https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1200&q=80',7),
('mattresses','Mattresses','Orthopedic and memory-foam mattresses for deep sleep.','https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',8)
on conflict (slug) do update set
  name = excluded.name, description = excluded.description,
  image = excluded.image, sort_order = excluded.sort_order;

-- Products (a representative subset; add the rest from the admin panel)
insert into products (slug, name, category_slug, short_description, description, material, dimensions, colours, images, price_label, featured, in_stock) values
('aurelia-3-seater-sofa','Aurelia 3-Seater Sofa','sofas','Plush 3-seater with premium fabric upholstery.','The Aurelia is a statement 3-seater sofa featuring deep, plush cushioning and a solid teak wood frame.','Solid teak frame, high-density foam, premium linen fabric','W 210cm x D 92cm x H 85cm','{"Ivory","Charcoal Grey","Teal"}','{"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1550226891-ef816aed4a98?auto=format&fit=crop&w=1200&q=80"}','On request',true,true),
('kyoto-king-bed','Kyoto King Platform Bed','beds','Low-profile king bed in solid walnut.','Inspired by Japanese minimalism, the Kyoto platform bed pairs a low-profile silhouette with a warm walnut finish.','Solid walnut, upholstered headboard','W 193cm x L 214cm x H 100cm (King)','{"Walnut","Natural Oak"}','{"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"}','On request',true,true),
('olive-6-seater-dining-table','Olive 6-Seater Dining Table','dining-tables','Solid wood 6-seater dining table.','A robust 6-seater dining table crafted from solid acacia with a natural live edge.','Solid acacia wood, powder-coated steel legs','L 180cm x W 90cm x H 76cm','{"Natural Oak","Walnut"}','{"https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80"}','On request',true,true),
('aspen-4-door-wardrobe','Aspen 4-Door Wardrobe','wardrobes','Spacious 4-door wardrobe with mirror.','The Aspen offers four doors of organised storage, including a full-length mirror and soft-close hinges.','Engineered wood, laminate finish, soft-close hardware','W 200cm x D 60cm x H 210cm','{"Walnut","Ivory","Grey"}','{"https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80"}','On request',true,true),
('executive-office-desk','Regent Executive Office Desk','office-furniture','Premium executive desk with storage.','The Regent executive desk offers a spacious work surface, built-in cable management and lockable drawers.','Engineered wood, veneer finish, metal accents','W 160cm x D 80cm x H 75cm','{"Walnut","Black Oak"}','{"https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"}','On request',true,true),
('horizon-tv-unit','Horizon Floating TV Unit','tv-units','Wall-mounted TV unit with LED lighting.','The Horizon floating TV unit combines a minimalist wall-mounted design with ambient LED lighting.','Engineered wood, matte laminate, LED strip','W 200cm x D 40cm x H 45cm','{"Walnut","Ivory","Charcoal Grey"}','{"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80"}','On request',true,true),
('lisbon-accent-chair','Lisbon Accent Chair','chairs','Curved velvet accent chair.','The Lisbon accent chair features a sculptural curved back and plush velvet upholstery.','Solid wood legs, velvet upholstery, foam padding','W 72cm x D 74cm x H 80cm','{"Emerald","Mustard","Grey"}','{"https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1200&q=80"}','On request',true,true),
('dreamcloud-orthopedic-mattress','DreamCloud Orthopedic Mattress','mattresses','Multi-layer orthopedic mattress.','Engineered for spinal support, the DreamCloud mattress layers high-resilience foam over a pocketed spring core.','Pocketed springs, HR foam, quilted knit cover','Available in Single, Queen & King','{"White"}','{"https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80"}','On request',true,true)
on conflict (slug) do nothing;

-- Banners
insert into banners (title, subtitle, image, cta_label, cta_href, active, sort_order) values
('Timeless Furniture, Crafted in Kerala','Discover premium sofas, beds and dining collections at Matha Furniture, Thiruvananthapuram.','https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=2000&q=80','Explore Collection','/products',true,1),
('Elevate Every Room','From cozy living rooms to elegant dining spaces — designed for modern homes.','https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=2000&q=80','Visit Our Showrooms','/contact',true,2)
on conflict do nothing;

insert into testimonials (name, location, rating, quote, avatar, approved) values
('Anjali Menon','Kesavadasapuram',5,'The quality of our new sofa is exceptional. Highly recommended!','https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', true),
('Rahul Nair','Pattom',5,'Bought a complete bedroom set from Matha Furniture. Beautiful craftsmanship and honest pricing.','https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', true),
('Fathima Rasheed','Thiruvananthapuram',5,'Their dining table is the centrepiece of our home now. Excellent service.','https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80', true)
on conflict do nothing;

-- Gallery
insert into gallery (title, image, category, sort_order) values
('Modern Living Room Setup','https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1200&q=80','Living Room',1),
('Elegant Master Bedroom','https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80','Bedroom',2),
('Family Dining Space','https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80','Dining',3),
('Home Office Corner','https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80','Office',4)
on conflict do nothing;

-- Contact info (single row)
insert into contact_info (business_name, email, phone, whatsapp, instagram, facebook, locations)
select 'Matha Furniture','hello@mathafurniture.com','+91 99999 99999','919999999999',
  'https://instagram.com/mathafurniture','https://facebook.com/mathafurniture',
  '[
    {"name":"Matha Furniture - Kesavadasapuram","address":"Kesavadasapuram, Pattom P.O, Thiruvananthapuram, Kerala 695004","phone":"+91 99999 99999","hours":"Mon - Sat: 9:30 AM - 8:30 PM | Sun: 10:00 AM - 6:00 PM","map_embed":"https://www.google.com/maps?q=Kesavadasapuram,Thiruvananthapuram&output=embed"},
    {"name":"Matha Furniture - Pattom","address":"Pattom, Thiruvananthapuram, Kerala 695004","phone":"+91 88888 88888","hours":"Mon - Sat: 9:30 AM - 8:30 PM | Sun: 10:00 AM - 6:00 PM","map_embed":"https://www.google.com/maps?q=Pattom,Thiruvananthapuram&output=embed"}
  ]'::jsonb
where not exists (select 1 from contact_info);
