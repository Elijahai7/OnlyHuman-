import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CategoryRail } from "@/components/sections/CategoryRail";
import { ValueProps } from "@/components/sections/ValueProps";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { HomeFaq } from "@/components/sections/HomeFaq";
import { CATEGORY_LIST } from "@/content/categories";
import { SITE_DESCRIPTION } from "@/lib/site-config";

export const metadata: Metadata = {
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <div id="treatments">
        {CATEGORY_LIST.map((category) => (
          <CategoryRail key={category.slug} category={category} />
        ))}
      </div>
      <ValueProps />
      <HowItWorks />
      <HomeFaq />
    </>
  );
}
