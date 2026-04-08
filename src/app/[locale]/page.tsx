import { getTranslations, getLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { EditorialStrip } from "@/components/home/EditorialStrip";
import { MarqueeSection } from "@/components/home/MarqueeSection";
import { ParallaxShowcase } from "@/components/home/ParallaxShowcase";
import { CollectionTeaser } from "@/components/home/CollectionTeaser";
import { getHomePage } from "@/sanity/lib/queries";

interface HomePageData {
  hero?: { image?: string | null; tagline?: string | null; ctaLabel?: string | null };
  editorial?: {
    image?: string | null;
    quote?: string | null;
    label?: string | null;
    ctaLabel?: string | null;
    ctaHref?: string | null;
  }[];
  parallax?: (string | null)[];
  teaserCards?: {
    title?: string | null;
    subtitle?: string | null;
    image?: string | null;
    href?: string | null;
  }[];
}

export default async function HomePage() {
  const t = await getTranslations("home");
  const locale = await getLocale();
  const home: HomePageData | null = await getHomePage(locale);

  return (
    <>
      <HeroSection
        bgImage={home?.hero?.image ?? null}
        taglineOverride={home?.hero?.tagline ?? null}
        ctaOverride={home?.hero?.ctaLabel ?? null}
      />
      <MarqueeSection text={t("marquee1")} />
      <FeaturedCollection />
      <EditorialStrip blocks={home?.editorial ?? []} />
      <MarqueeSection text={t("marquee2")} />
      <ParallaxShowcase images={home?.parallax ?? []} />
      <CollectionTeaser cards={home?.teaserCards ?? []} />
    </>
  );
}
