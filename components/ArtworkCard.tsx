import Image from "next/image";
import Link from "next/link";
import type { DbArtwork } from "@/lib/api/artworks";

interface ArtworkCardProps {
  artwork: DbArtwork;
}

export function ArtworkCard({ artwork }: ArtworkCardProps) {
  const price = `$${Number(artwork.price).toLocaleString()}`;

  return (
    <Link
      href={`/artwork/${artwork.id}`}
      className="group block"
      aria-label={`View ${artwork.title}`}
    >
      {/* Gallery frame — 24px matting + 1px hairline border */}
      <div className="relative bg-white border border-border p-6">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={artwork.image_url}
            alt={artwork.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-opacity duration-300 ease-out group-hover:opacity-70"
            loading="lazy"
          />

          {!artwork.available && (
            <div className="absolute top-0 left-0 bg-charcoal text-white text-[11px] px-3 py-1 tracking-[0.1em] uppercase font-sans font-semibold">
              Sold
            </div>
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="pt-4 pb-2">
        <h3 className="font-serif text-[20px] leading-[1.4] text-charcoal transition-opacity duration-300 group-hover:opacity-70">
          {artwork.title}
        </h3>
        <p className="mt-1.5 font-sans text-[15px] font-medium tracking-[0.05em] text-charcoal">
          {artwork.available ? price : "Sold"}
        </p>
      </div>
    </Link>
  );
}
