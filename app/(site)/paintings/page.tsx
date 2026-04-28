import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { GalleryGrid } from "@/components/GalleryGrid";
import { FadeIn } from "@/components/FadeIn";
import { getArtworks } from "@/lib/artworks";
import { getSiteContent } from "@/lib/api/site-content";

export const metadata: Metadata = {
  title: "Paintings",
  description: "Original oil and acrylic paintings by Shibani — available to collect.",
};

export default async function PaintingsPage() {
  const [paintings, description] = await Promise.all([
    getArtworks("painting"),
    getSiteContent("paintings_description"),
  ]);

  return (
    <Section className="pt-32">
      <FadeIn>
        <div className="mb-14">
          <span className="text-xs tracking-widest uppercase text-accent font-sans block mb-3">
            Collection
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl text-charcoal">Paintings</h1>
          <p className="mt-4 text-warm-gray max-w-lg leading-relaxed">{description}</p>
        </div>
      </FadeIn>

      <GalleryGrid artworks={paintings} />
    </Section>
  );
}
