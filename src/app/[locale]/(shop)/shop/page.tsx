import { getLocale } from "next-intl/server";
import { getAllProducts } from "@/sanity/lib/queries";
import { adaptSanityProducts } from "@/lib/sanity-adapters";
import { ShopClient } from "./ShopClient";

export default async function ShopPage() {
  const locale = await getLocale();
  const raw = await getAllProducts(locale);
  const products = adaptSanityProducts(raw);

  return <ShopClient products={products} />;
}
