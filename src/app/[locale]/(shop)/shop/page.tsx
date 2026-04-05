import { getAllProducts } from "@/sanity/lib/queries";
import { adaptSanityProducts } from "@/lib/sanity-adapters";
import { ShopClient } from "./ShopClient";

export default async function ShopPage() {
  const raw = await getAllProducts();
  const products = adaptSanityProducts(raw);

  return <ShopClient products={products} />;
}
