-- ─── Categories ───────────────────────────────────────────────────────────
INSERT INTO "Category" (id, name, slug) VALUES
  ('cat_hoodies',     'Hoodies & Sweatshirts', 'hoodies'),
  ('cat_tees',        'Tees',                  'tees'),
  ('cat_pants',       'Pants',                 'pants'),
  ('cat_outerwear',   'Outerwear',             'outerwear'),
  ('cat_accessories', 'Accessories',           'accessories')
ON CONFLICT (slug) DO NOTHING;

-- ─── Products ─────────────────────────────────────────────────────────────
INSERT INTO "Product" (id, name, slug, description, price, "comparePrice", "categoryId", tags, "isPublished", "isFeatured", "createdAt", "updatedAt") VALUES
  ('prod_hoodie',  'HOODIE — ECLIPSE',          'hoodie-eclipse',          '400 GSM French terry hoodie with kangaroo pocket and embossed DRXP logo on chest. Double-layered hood.',                         750000, 850000, 'cat_hoodies',   ARRAY['hoodie','french terry','oversized','logo'],       true, true, NOW(), NOW()),
  ('prod_tee',     'OVERSIZED TEE — SHADOW',    'oversized-tee-shadow',    'Premium heavyweight cotton oversized tee in our signature Shadow Black. Drop-shoulder silhouette with raw-edge hem detail.',   550000, NULL,   'cat_tees',      ARRAY['tee','oversized','cotton','streetwear'],           true, true, NOW(), NOW()),
  ('prod_cargo',   'CARGO PANTS — VOID',        'cargo-pants-void',        'Technical cargo pants with 3D pockets and adjustable ankle cuffs. Water-resistant ripstop fabric in Void Gray.',              890000, NULL,   'cat_pants',     ARRAY['cargo','pants','technical','ripstop'],             true, true, NOW(), NOW()),
  ('prod_jacket',  'TACTICAL JACKET — PHANTOM', 'tactical-jacket-phantom', 'Nylon tactical jacket with matte finish, ribbed cuffs, and tonal DRXP embroidery on back. YKK zippers throughout.',          1290000, NULL,  'cat_outerwear', ARRAY['jacket','tactical','nylon','outerwear'],           true, true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- ─── Product Images ────────────────────────────────────────────────────────
INSERT INTO "ProductImage" (id, "productId", url, alt, position) VALUES
  ('img_hoodie',  'prod_hoodie',  '/images/products/hoodie-01.jpg', 'Hoodie Eclipse front',          0),
  ('img_tee',     'prod_tee',     '/images/products/tee-01.jpg',    'Oversized Tee Shadow front',    0),
  ('img_cargo',   'prod_cargo',   '/images/products/cargo-01.jpg',  'Cargo Pants Void front',        0),
  ('img_jacket',  'prod_jacket',  '/images/products/jacket-01.jpg', 'Tactical Jacket Phantom front', 0)
ON CONFLICT (id) DO NOTHING;

-- ─── Product Variants ──────────────────────────────────────────────────────
INSERT INTO "ProductVariant" (id, "productId", size, color, "colorHex", sku, stock) VALUES
  -- Hoodie
  ('var_hoodie_M',  'prod_hoodie',  'M',  'Shadow Black', '#0A0A0A', 'hoodie-eclipse-M-SB',  20),
  ('var_hoodie_L',  'prod_hoodie',  'L',  'Shadow Black', '#0A0A0A', 'hoodie-eclipse-L-SB',  16),
  ('var_hoodie_XL', 'prod_hoodie',  'XL', 'Shadow Black', '#0A0A0A', 'hoodie-eclipse-XL-SB',  9),
  -- Tee
  ('var_tee_S',  'prod_tee', 'S',  'Shadow Black', '#0A0A0A', 'oversized-tee-shadow-S-SB',  12),
  ('var_tee_M',  'prod_tee', 'M',  'Shadow Black', '#0A0A0A', 'oversized-tee-shadow-M-SB',  18),
  ('var_tee_L',  'prod_tee', 'L',  'Shadow Black', '#0A0A0A', 'oversized-tee-shadow-L-SB',  15),
  ('var_tee_XL', 'prod_tee', 'XL', 'Shadow Black', '#0A0A0A', 'oversized-tee-shadow-XL-SB',  8),
  -- Cargo
  ('var_cargo_S',  'prod_cargo', 'S',  'Void Gray', '#333333', 'cargo-pants-void-S-VG',   6),
  ('var_cargo_M',  'prod_cargo', 'M',  'Void Gray', '#333333', 'cargo-pants-void-M-VG',  14),
  ('var_cargo_L',  'prod_cargo', 'L',  'Void Gray', '#333333', 'cargo-pants-void-L-VG',  10),
  ('var_cargo_XL', 'prod_cargo', 'XL', 'Void Gray', '#333333', 'cargo-pants-void-XL-VG',  5),
  -- Jacket
  ('var_jacket_M',  'prod_jacket', 'M',  'Shadow Black', '#0A0A0A', 'tactical-jacket-phantom-M-SB', 7),
  ('var_jacket_L',  'prod_jacket', 'L',  'Shadow Black', '#0A0A0A', 'tactical-jacket-phantom-L-SB', 5),
  ('var_jacket_XL', 'prod_jacket', 'XL', 'Shadow Black', '#0A0A0A', 'tactical-jacket-phantom-XL-SB', 3)
ON CONFLICT (sku) DO NOTHING;

-- ─── Promo Codes ──────────────────────────────────────────────────────────
INSERT INTO "PromoCode" (id, code, "discountType", "discountValue", "minOrderTotal", "maxUses", "usedCount", "isActive") VALUES
  ('promo_drxp10', 'DRXP10', 'PERCENTAGE', 10, 50000,  NULL, 0, true),
  ('promo_drxp20', 'DRXP20', 'PERCENTAGE', 20, 100000, 100,  0, true)
ON CONFLICT (code) DO NOTHING;
