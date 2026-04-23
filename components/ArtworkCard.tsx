import Image from "next/image";
import Link from "next/link";
import { Artwork } from "@/data/artworks";

interface ArtworkCardProps {
  artwork: Artwork;
}

export function ArtworkCard({ artwork }: ArtworkCardProps) {
  return (
    <Link
      href={`/artwork/${artwork.id}`}
      className="group block"
      aria-label={`View ${artwork.title}`}
    >
      {/* Image container */}
      <div className="relative overflow-hidden bg-parchment aspect-[4/3]">
        <Image
          src={artwork.thumbnailUrl}
          alt={artwork.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Sold overlay */}
        {!artwork.available && (
          <div className="absolute inset-0 bg-charcoal/40 flex items-center justify-center">
            <span className="text-cream text-xs tracking-widest uppercase font-sans font-medium">
              Sold
            </span>
          </div>
        )}

        {/* Hover overlay with subtle tint */}
        {artwork.available && (
          <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-300" />
        )}
      </div>

      {/* Meta */}
      <div className="pt-4 pb-2">
        <h3 className="font-serif text-base text-charcoal group-hover:text-accent transition-colors duration-200">
          {artwork.title}
        </h3>
        <p className="mt-1 text-sm text-warm-gray">
          {artwork.medium} · {artwork.year}
        </p>
        <p className="mt-1 text-sm font-medium text-charcoal">
          {artwork.available ? artwork.displayPrice : "Sold"}
        </p>
      </div>
    </Link>
  );
}
