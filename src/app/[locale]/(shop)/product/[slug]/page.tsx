import { getTranslations } from "next-intl/server";
import { getProductBySlug, getAllProducts } from "@/sanity/lib/queries";
import { adaptSanityProduct, adaptSanityProducts } from "@/lib/sanity-adapters";
import { ProductPageClient } from "./ProductPageClient";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  const locales = ["ru", "en"];
  return locales.flatMap((locale) =>
    products.map((p: { slug: string }) => ({ locale, slug: p.slug }))
  );
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const t = await getTranslations("product");
  const raw = await getProductBySlug(slug);

  if (!raw) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center pt-32">
        <p className="text-sm tracking-widest uppercase text-white/40">
          {t("notFound")}
        </p>
      </main>
    );
  }

  const product = adaptSanityProduct(raw);

  // Fetch related products from same category
  const allRaw = await getAllProducts();
  const related = adaptSanityProducts(
    allRaw.filter((p: { _id: string; categorySlug?: string }) =>
      p._id !== raw._id && p.categorySlug === raw.categorySlug
    ).slice(0, 4)
  );

  return <ProductPageClient product={product} relatedProducts={related} />;
}
