import type { Product } from "@/types/product";

export const BRAND_NAME = "DRXP";

export const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const CATEGORIES = [
  { id: "tees", name: "Tees", slug: "tees" },
  { id: "hoodies", name: "Hoodies & Sweatshirts", slug: "hoodies" },
  { id: "pants", name: "Pants", slug: "pants" },
  { id: "outerwear", name: "Outerwear", slug: "outerwear" },
  { id: "accessories", name: "Accessories", slug: "accessories" },
] as const;

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export const COLORS = [
  { name: "Shadow Black", value: "#0A0A0A" },
  { name: "Void Gray", value: "#333333" },
  { name: "Ash", value: "#888888" },
  { name: "Bone", value: "#F5F0EB" },
  { name: "Obsidian", value: "#1A1A2E" },
  { name: "Rust", value: "#8B4513" },
  { name: "Olive Drab", value: "#4A5324" },
] as const;

export const PRODUCTS: Product[] = [
  {
    id: "prod_001",
    name: "OVERSIZED TEE \u2014 SHADOW",
    slug: "oversized-tee-shadow",
    description:
      "Premium heavyweight cotton oversized tee in our signature Shadow Black. Drop-shoulder silhouette with raw-edge hem detail.",
    price: 550000,
    compareAtPrice: null,
    categoryId: "tees",
    images: [
      { id: "img_001_1", url: "/images/products/product-1.jpg", alt: "Oversized Tee Shadow front", position: 0 },
      { id: "img_001_2", url: "/images/products/product-1-back.jpg", alt: "Oversized Tee Shadow back", position: 1 },
    ],
    variants: [
      { id: "var_001_s", size: "S", color: "Shadow Black", stock: 12 },
      { id: "var_001_m", size: "M", color: "Shadow Black", stock: 18 },
      { id: "var_001_l", size: "L", color: "Shadow Black", stock: 15 },
      { id: "var_001_xl", size: "XL", color: "Shadow Black", stock: 8 },
    ],
    featured: true,
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
  },
  {
    id: "prod_002",
    name: "CARGO PANTS \u2014 VOID",
    slug: "cargo-pants-void",
    description:
      "Technical cargo pants with 3D pockets and adjustable ankle cuffs. Water-resistant ripstop fabric in Void Gray.",
    price: 890000,
    compareAtPrice: null,
    categoryId: "pants",
    images: [
      { id: "img_002_1", url: "/images/products/product-2.jpg", alt: "Cargo Pants Void front", position: 0 },
    ],
    variants: [
      { id: "var_002_s", size: "S", color: "Void Gray", stock: 6 },
      { id: "var_002_m", size: "M", color: "Void Gray", stock: 14 },
      { id: "var_002_l", size: "L", color: "Void Gray", stock: 10 },
      { id: "var_002_xl", size: "XL", color: "Void Gray", stock: 5 },
    ],
    featured: true,
    createdAt: new Date("2025-02-01"),
    updatedAt: new Date("2025-02-01"),
  },
  {
    id: "prod_003",
    name: "HOODIE \u2014 ECLIPSE",
    slug: "hoodie-eclipse",
    description:
      "400 GSM French terry hoodie with kangaroo pocket and embossed DRXP logo on chest. Double-layered hood.",
    price: 750000,
    compareAtPrice: 850000,
    categoryId: "hoodies",
    images: [
      { id: "img_003_1", url: "/images/products/product-3.jpg", alt: "Hoodie Eclipse front", position: 0 },
    ],
    variants: [
      { id: "var_003_m", size: "M", color: "Shadow Black", stock: 20 },
      { id: "var_003_l", size: "L", color: "Shadow Black", stock: 16 },
      { id: "var_003_xl", size: "XL", color: "Shadow Black", stock: 9 },
    ],
    featured: true,
    createdAt: new Date("2025-02-10"),
    updatedAt: new Date("2025-02-10"),
  },
  {
    id: "prod_004",
    name: "BOMBER JACKET \u2014 PHANTOM",
    slug: "bomber-jacket-phantom",
    description:
      "Nylon bomber jacket with matte finish, ribbed cuffs, and tonal DRXP embroidery on back. YKK zippers throughout.",
    price: 1290000,
    compareAtPrice: null,
    categoryId: "outerwear",
    images: [
      { id: "img_004_1", url: "/images/products/product-4.jpg", alt: "Bomber Jacket Phantom front", position: 0 },
    ],
    variants: [
      { id: "var_004_m", size: "M", color: "Shadow Black", stock: 7 },
      { id: "var_004_l", size: "L", color: "Shadow Black", stock: 5 },
      { id: "var_004_xl", size: "XL", color: "Shadow Black", stock: 3 },
    ],
    featured: false,
    createdAt: new Date("2025-03-01"),
    updatedAt: new Date("2025-03-01"),
  },
  {
    id: "prod_005",
    name: "WIDE LEG PANTS \u2014 CONCRETE",
    slug: "wide-leg-pants-concrete",
    description:
      "Relaxed wide-leg trousers in heavy cotton twill. Pleated front with side seam pockets and raw hem.",
    price: 720000,
    compareAtPrice: null,
    categoryId: "pants",
    images: [
      { id: "img_005_1", url: "/images/products/product-5.jpg", alt: "Wide Leg Pants Concrete front", position: 0 },
    ],
    variants: [
      { id: "var_005_s", size: "S", color: "Ash", stock: 10 },
      { id: "var_005_m", size: "M", color: "Ash", stock: 12 },
      { id: "var_005_l", size: "L", color: "Ash", stock: 8 },
    ],
    featured: false,
    createdAt: new Date("2025-03-05"),
    updatedAt: new Date("2025-03-05"),
  },
  {
    id: "prod_006",
    name: "CROPPED TEE \u2014 BONE",
    slug: "cropped-tee-bone",
    description:
      "Boxy cropped tee in organic cotton. Garment-dyed Bone colorway with subtle DRXP wordmark at hem.",
    price: 480000,
    compareAtPrice: null,
    categoryId: "tees",
    images: [
      { id: "img_006_1", url: "/images/products/product-6.jpg", alt: "Cropped Tee Bone front", position: 0 },
    ],
    variants: [
      { id: "var_006_xs", size: "XS", color: "Bone", stock: 14 },
      { id: "var_006_s", size: "S", color: "Bone", stock: 18 },
      { id: "var_006_m", size: "M", color: "Bone", stock: 22 },
      { id: "var_006_l", size: "L", color: "Bone", stock: 11 },
    ],
    featured: true,
    createdAt: new Date("2025-03-12"),
    updatedAt: new Date("2025-03-12"),
  },
  {
    id: "prod_007",
    name: "UTILITY VEST \u2014 NIGHTFALL",
    slug: "utility-vest-nightfall",
    description:
      "Multi-pocket utility vest with mesh lining and adjustable drawcord waist. Reflective DRXP tab on chest.",
    price: 680000,
    compareAtPrice: null,
    categoryId: "outerwear",
    images: [
      { id: "img_007_1", url: "/images/products/product-7.jpg", alt: "Utility Vest Nightfall front", position: 0 },
    ],
    variants: [
      { id: "var_007_m", size: "M", color: "Obsidian", stock: 9 },
      { id: "var_007_l", size: "L", color: "Obsidian", stock: 7 },
      { id: "var_007_xl", size: "XL", color: "Obsidian", stock: 4 },
    ],
    featured: false,
    createdAt: new Date("2025-03-20"),
    updatedAt: new Date("2025-03-20"),
  },
  {
    id: "prod_008",
    name: "GRAPHIC TEE \u2014 DISTORTION",
    slug: "graphic-tee-distortion",
    description:
      "Screen-printed graphic tee with oversized back print. Heavyweight 280 GSM cotton, pre-shrunk.",
    price: 590000,
    compareAtPrice: null,
    categoryId: "tees",
    images: [
      { id: "img_008_1", url: "/images/products/product-8.jpg", alt: "Graphic Tee Distortion front", position: 0 },
    ],
    variants: [
      { id: "var_008_s", size: "S", color: "Shadow Black", stock: 16 },
      { id: "var_008_m", size: "M", color: "Shadow Black", stock: 20 },
      { id: "var_008_l", size: "L", color: "Shadow Black", stock: 14 },
      { id: "var_008_xl", size: "XL", color: "Shadow Black", stock: 10 },
    ],
    featured: false,
    createdAt: new Date("2025-04-01"),
    updatedAt: new Date("2025-04-01"),
  },
  {
    id: "prod_009",
    name: "SWEATPANTS \u2014 DUSK",
    slug: "sweatpants-dusk",
    description:
      "Tapered sweatpants in brushed fleece. Elastic waistband with internal drawcord, ribbed ankle cuffs.",
    price: 620000,
    compareAtPrice: null,
    categoryId: "pants",
    images: [
      { id: "img_009_1", url: "/images/products/product-9.jpg", alt: "Sweatpants Dusk front", position: 0 },
    ],
    variants: [
      { id: "var_009_s", size: "S", color: "Void Gray", stock: 11 },
      { id: "var_009_m", size: "M", color: "Void Gray", stock: 17 },
      { id: "var_009_l", size: "L", color: "Void Gray", stock: 13 },
      { id: "var_009_xl", size: "XL", color: "Void Gray", stock: 6 },
    ],
    featured: false,
    createdAt: new Date("2025-04-05"),
    updatedAt: new Date("2025-04-05"),
  },
  {
    id: "prod_010",
    name: "CAP \u2014 STEALTH",
    slug: "cap-stealth",
    description:
      "Unstructured 6-panel cap with curved brim. Tonal embroidered DRXP logo, brass adjustable clasp.",
    price: 320000,
    compareAtPrice: null,
    categoryId: "accessories",
    images: [
      { id: "img_010_1", url: "/images/products/product-10.jpg", alt: "Cap Stealth front", position: 0 },
    ],
    variants: [
      { id: "var_010_os", size: "M", color: "Shadow Black", stock: 30 },
    ],
    featured: false,
    createdAt: new Date("2025-04-10"),
    updatedAt: new Date("2025-04-10"),
  },
];
