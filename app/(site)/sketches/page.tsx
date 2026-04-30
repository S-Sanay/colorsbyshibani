import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { GalleryGrid } from "@/components/GalleryGrid";
import { FadeIn } from "@/components/FadeIn";
import { getArtworks } from "@/lib/artworks";
import { getSiteContent } from "@/lib/api/site-content";

export const metadata: Metadata = {
  title: "Sketches",
  description: "Ink and pencil sketches by Shibani — loose, gestural, immediate.",
};

export default async function SketchesPage() {
  const [sketches, description] = await Promise.all([
    getArtworks("sketch"),
    getSiteContent("sketches_description"),
  ]);

  return (
    <Section className="pt-36">
      <FadeIn>
        <div className="mb-20 border-b border-border pb-10">
          <span className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-accent block mb-4">
            Collection
          </span>
          <h1 className="font-serif font-normal text-[48px] leading-[1.1] tracking-[-0.02em] text-charcoal">
            Sketches
          </h1>
          <p className="mt-5 font-sans text-[16px] leading-[1.6] text-warm-gray max-w-lg">{description}</p>
        </div>
      </FadeIn>

      <GalleryGrid artworks={sketches} />
    </Section>
  );
}
