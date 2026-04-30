import type { DbArtwork } from "@/lib/api/artworks";
import { ArtworkCard } from "@/components/ArtworkCard";
import { FadeIn } from "@/components/FadeIn";

interface GalleryGridProps {
  artworks: DbArtwork[];
}

export function GalleryGrid({ artworks }: GalleryGridProps) {
  if (artworks.length === 0) {
    return (
      <p className="text-center text-muted py-20 font-sans text-sm tracking-[0.05em]">
        No works in this collection yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
      {artworks.map((artwork, i) => (
        <FadeIn key={artwork.id} delay={i * 60}>
          <ArtworkCard artwork={artwork} />
        </FadeIn>
      ))}
    </div>
  );
}
