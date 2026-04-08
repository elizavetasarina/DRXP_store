import { getAllProducts, getFeaturedProducts } from "@/sanity/lib/queries";
import { client } from "@/sanity/client";

export const dynamic = "force-dynamic";

export default async function DebugSanityPage() {
  const env = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  };

  let all: unknown = null;
  let featured: unknown = null;
  let raw: unknown = null;
  let error: string | null = null;

  try {
    all = await getAllProducts();
    featured = await getFeaturedProducts();
    raw = await client.fetch(
      `*[_type == "product"][0]{ _id, name, images, "imagesResolved": images[]{ asset, "url": asset->url } }`
    );
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }

  return (
    <main style={{ padding: 24, background: "#000", color: "#fff", minHeight: "100vh", fontFamily: "monospace", fontSize: 12 }}>
      <h1>Sanity Debug</h1>
      <h2>ENV</h2>
      <pre>{JSON.stringify(env, null, 2)}</pre>
      {error && (
        <>
          <h2 style={{ color: "red" }}>ERROR</h2>
          <pre>{error}</pre>
        </>
      )}
      <h2>Raw first product (with imagesResolved)</h2>
      <pre>{JSON.stringify(raw, null, 2)}</pre>
      <h2>getFeaturedProducts()</h2>
      <pre>{JSON.stringify(featured, null, 2)}</pre>
      <h2>getAllProducts() — first 2</h2>
      <pre>{JSON.stringify(Array.isArray(all) ? all.slice(0, 2) : all, null, 2)}</pre>
    </main>
  );
}
