import type { Product } from "@/types/product";

export const BRAND_NAME = "DRXP";

export const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Journal", href: "/journal" },
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
    name: "OVERSIZED TEE — SHADOW",
    slug: "oversized-tee-shadow",
    description:
      "Premium heavyweight cotton oversized tee in our signature Shadow Black. Drop-shoulder silhouette with raw-edge hem detail.",
    price: 550000,
    comparePrice: null,
    categoryId: "tees",
    images: [
      { id: "img_001_1", url: "/images/products/tee-01.jpg", alt: "Oversized Tee Shadow front", position: 0 },
    ],
    variants: [
      { id: "var_001_s", size: "S", color: "Shadow Black", colorHex: "#0A0A0A", sku: "oversized-tee-shadow-S-SB", stock: 12 },
      { id: "var_001_m", size: "M", color: "Shadow Black", colorHex: "#0A0A0A", sku: "oversized-tee-shadow-M-SB", stock: 18 },
      { id: "var_001_l", size: "L", color: "Shadow Black", colorHex: "#0A0A0A", sku: "oversized-tee-shadow-L-SB", stock: 15 },
      { id: "var_001_xl", size: "XL", color: "Shadow Black", colorHex: "#0A0A0A", sku: "oversized-tee-shadow-XL-SB", stock: 8 },
    ],
    tags: ["tee", "oversized", "cotton", "streetwear"],
    isPublished: true,
    isFeatured: true,
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
  },
  {
    id: "prod_002",
    name: "CARGO PANTS — VOID",
    slug: "cargo-pants-void",
    description:
      "Technical cargo pants with 3D pockets and adjustable ankle cuffs. Water-resistant ripstop fabric in Void Gray.",
    price: 890000,
    comparePrice: null,
    categoryId: "pants",
    images: [
      { id: "img_002_1", url: "/images/products/cargo-01.jpg", alt: "Cargo Pants Void front", position: 0 },
    ],
    variants: [
      { id: "var_002_s", size: "S", color: "Void Gray", colorHex: "#333333", sku: "cargo-pants-void-S-VG", stock: 6 },
      { id: "var_002_m", size: "M", color: "Void Gray", colorHex: "#333333", sku: "cargo-pants-void-M-VG", stock: 14 },
      { id: "var_002_l", size: "L", color: "Void Gray", colorHex: "#333333", sku: "cargo-pants-void-L-VG", stock: 10 },
      { id: "var_002_xl", size: "XL", color: "Void Gray", colorHex: "#333333", sku: "cargo-pants-void-XL-VG", stock: 5 },
    ],
    tags: ["cargo", "pants", "technical", "ripstop"],
    isPublished: true,
    isFeatured: true,
    createdAt: new Date("2025-02-01"),
    updatedAt: new Date("2025-02-01"),
  },
  {
    id: "prod_003",
    name: "HOODIE — ECLIPSE",
    slug: "hoodie-eclipse",
    description:
      "400 GSM French terry hoodie with kangaroo pocket and embossed DRXP logo on chest. Double-layered hood.",
    price: 750000,
    comparePrice: 850000,
    categoryId: "hoodies",
    images: [
      { id: "img_003_1", url: "/images/products/hoodie-01.jpg", alt: "Hoodie Eclipse front", position: 0 },
    ],
    variants: [
      { id: "var_003_m", size: "M", color: "Shadow Black", colorHex: "#0A0A0A", sku: "hoodie-eclipse-M-SB", stock: 20 },
      { id: "var_003_l", size: "L", color: "Shadow Black", colorHex: "#0A0A0A", sku: "hoodie-eclipse-L-SB", stock: 16 },
      { id: "var_003_xl", size: "XL", color: "Shadow Black", colorHex: "#0A0A0A", sku: "hoodie-eclipse-XL-SB", stock: 9 },
    ],
    tags: ["hoodie", "french terry", "oversized", "logo"],
    isPublished: true,
    isFeatured: true,
    createdAt: new Date("2025-02-10"),
    updatedAt: new Date("2025-02-10"),
  },
  {
    id: "prod_004",
    name: "BOMBER JACKET — PHANTOM",
    slug: "bomber-jacket-phantom",
    description:
      "Nylon bomber jacket with matte finish, ribbed cuffs, and tonal DRXP embroidery on back. YKK zippers throughout.",
    price: 1290000,
    comparePrice: null,
    categoryId: "outerwear",
    images: [
      { id: "img_004_1", url: "/images/products/jacket-01.jpg", alt: "Bomber Jacket Phantom front", position: 0 },
    ],
    variants: [
      { id: "var_004_m", size: "M", color: "Shadow Black", colorHex: "#0A0A0A", sku: "bomber-jacket-phantom-M-SB", stock: 7 },
      { id: "var_004_l", size: "L", color: "Shadow Black", colorHex: "#0A0A0A", sku: "bomber-jacket-phantom-L-SB", stock: 5 },
      { id: "var_004_xl", size: "XL", color: "Shadow Black", colorHex: "#0A0A0A", sku: "bomber-jacket-phantom-XL-SB", stock: 3 },
    ],
    tags: ["bomber", "jacket", "nylon", "outerwear"],
    isPublished: true,
    isFeatured: false,
    createdAt: new Date("2025-03-01"),
    updatedAt: new Date("2025-03-01"),
  },
  {
    id: "prod_005",
    name: "WIDE LEG PANTS — CONCRETE",
    slug: "wide-leg-pants-concrete",
    description:
      "Relaxed wide-leg trousers in heavy cotton twill. Pleated front with side seam pockets and raw hem.",
    price: 720000,
    comparePrice: null,
    categoryId: "pants",
    images: [
      { id: "img_005_1", url: "/images/products/cargo-01.jpg", alt: "Wide Leg Pants Concrete front", position: 0 },
    ],
    variants: [
      { id: "var_005_s", size: "S", color: "Ash", colorHex: "#888888", sku: "wide-leg-pants-concrete-S-A", stock: 10 },
      { id: "var_005_m", size: "M", color: "Ash", colorHex: "#888888", sku: "wide-leg-pants-concrete-M-A", stock: 12 },
      { id: "var_005_l", size: "L", color: "Ash", colorHex: "#888888", sku: "wide-leg-pants-concrete-L-A", stock: 8 },
    ],
    tags: ["pants", "wide-leg", "twill", "relaxed"],
    isPublished: true,
    isFeatured: false,
    createdAt: new Date("2025-03-05"),
    updatedAt: new Date("2025-03-05"),
  },
  {
    id: "prod_006",
    name: "CROPPED TEE — BONE",
    slug: "cropped-tee-bone",
    description:
      "Boxy cropped tee in organic cotton. Garment-dyed Bone colorway with subtle DRXP wordmark at hem.",
    price: 480000,
    comparePrice: null,
    categoryId: "tees",
    images: [
      { id: "img_006_1", url: "/images/products/tee-01.jpg", alt: "Cropped Tee Bone front", position: 0 },
    ],
    variants: [
      { id: "var_006_xs", size: "XS", color: "Bone", colorHex: "#F5F0EB", sku: "cropped-tee-bone-XS-B", stock: 14 },
      { id: "var_006_s", size: "S", color: "Bone", colorHex: "#F5F0EB", sku: "cropped-tee-bone-S-B", stock: 18 },
      { id: "var_006_m", size: "M", color: "Bone", colorHex: "#F5F0EB", sku: "cropped-tee-bone-M-B", stock: 22 },
      { id: "var_006_l", size: "L", color: "Bone", colorHex: "#F5F0EB", sku: "cropped-tee-bone-L-B", stock: 11 },
    ],
    tags: ["tee", "cropped", "organic", "garment-dyed"],
    isPublished: true,
    isFeatured: true,
    createdAt: new Date("2025-03-12"),
    updatedAt: new Date("2025-03-12"),
  },
  {
    id: "prod_007",
    name: "UTILITY VEST — NIGHTFALL",
    slug: "utility-vest-nightfall",
    description:
      "Multi-pocket utility vest with mesh lining and adjustable drawcord waist. Reflective DRXP tab on chest.",
    price: 680000,
    comparePrice: null,
    categoryId: "outerwear",
    images: [
      { id: "img_007_1", url: "/images/products/jacket-01.jpg", alt: "Utility Vest Nightfall front", position: 0 },
    ],
    variants: [
      { id: "var_007_m", size: "M", color: "Obsidian", colorHex: "#1A1A2E", sku: "utility-vest-nightfall-M-O", stock: 9 },
      { id: "var_007_l", size: "L", color: "Obsidian", colorHex: "#1A1A2E", sku: "utility-vest-nightfall-L-O", stock: 7 },
      { id: "var_007_xl", size: "XL", color: "Obsidian", colorHex: "#1A1A2E", sku: "utility-vest-nightfall-XL-O", stock: 4 },
    ],
    tags: ["vest", "utility", "outerwear", "reflective"],
    isPublished: true,
    isFeatured: false,
    createdAt: new Date("2025-03-20"),
    updatedAt: new Date("2025-03-20"),
  },
  {
    id: "prod_008",
    name: "GRAPHIC TEE — DISTORTION",
    slug: "graphic-tee-distortion",
    description:
      "Screen-printed graphic tee with oversized back print. Heavyweight 280 GSM cotton, pre-shrunk.",
    price: 590000,
    comparePrice: null,
    categoryId: "tees",
    images: [
      { id: "img_008_1", url: "/images/products/tee-01.jpg", alt: "Graphic Tee Distortion front", position: 0 },
    ],
    variants: [
      { id: "var_008_s", size: "S", color: "Shadow Black", colorHex: "#0A0A0A", sku: "graphic-tee-distortion-S-SB", stock: 16 },
      { id: "var_008_m", size: "M", color: "Shadow Black", colorHex: "#0A0A0A", sku: "graphic-tee-distortion-M-SB", stock: 20 },
      { id: "var_008_l", size: "L", color: "Shadow Black", colorHex: "#0A0A0A", sku: "graphic-tee-distortion-L-SB", stock: 14 },
      { id: "var_008_xl", size: "XL", color: "Shadow Black", colorHex: "#0A0A0A", sku: "graphic-tee-distortion-XL-SB", stock: 10 },
    ],
    tags: ["tee", "graphic", "screen-print", "heavyweight"],
    isPublished: true,
    isFeatured: false,
    createdAt: new Date("2025-04-01"),
    updatedAt: new Date("2025-04-01"),
  },
  {
    id: "prod_009",
    name: "SWEATPANTS — DUSK",
    slug: "sweatpants-dusk",
    description:
      "Tapered sweatpants in brushed fleece. Elastic waistband with internal drawcord, ribbed ankle cuffs.",
    price: 620000,
    comparePrice: null,
    categoryId: "pants",
    images: [
      { id: "img_009_1", url: "/images/products/cargo-01.jpg", alt: "Sweatpants Dusk front", position: 0 },
    ],
    variants: [
      { id: "var_009_s", size: "S", color: "Void Gray", colorHex: "#333333", sku: "sweatpants-dusk-S-VG", stock: 11 },
      { id: "var_009_m", size: "M", color: "Void Gray", colorHex: "#333333", sku: "sweatpants-dusk-M-VG", stock: 17 },
      { id: "var_009_l", size: "L", color: "Void Gray", colorHex: "#333333", sku: "sweatpants-dusk-L-VG", stock: 13 },
      { id: "var_009_xl", size: "XL", color: "Void Gray", colorHex: "#333333", sku: "sweatpants-dusk-XL-VG", stock: 6 },
    ],
    tags: ["sweatpants", "fleece", "tapered", "relaxed"],
    isPublished: true,
    isFeatured: false,
    createdAt: new Date("2025-04-05"),
    updatedAt: new Date("2025-04-05"),
  },
  {
    id: "prod_010",
    name: "CAP — STEALTH",
    slug: "cap-stealth",
    description:
      "Unstructured 6-panel cap with curved brim. Tonal embroidered DRXP logo, brass adjustable clasp.",
    price: 320000,
    comparePrice: null,
    categoryId: "accessories",
    images: [
      { id: "img_010_1", url: "/images/products/hoodie-01.jpg", alt: "Cap Stealth front", position: 0 },
    ],
    variants: [
      { id: "var_010_os", size: "M", color: "Shadow Black", colorHex: "#0A0A0A", sku: "cap-stealth-M-SB", stock: 30 },
    ],
    tags: ["cap", "hat", "accessories", "logo"],
    isPublished: true,
    isFeatured: false,
    createdAt: new Date("2025-04-10"),
    updatedAt: new Date("2025-04-10"),
  },
];
