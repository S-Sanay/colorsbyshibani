// Dynamic route — no generateStaticParams.
// Every request fetches fresh data from Supabase so newly uploaded artworks
// are immediately accessible without a rebuild.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArtworkById } from "@/lib/artworks";
import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const artwork = await getArtworkById(id);
  if (!artwork) return {};
  return {
    title: artwork.title,
    description: artwork.description?.slice(0, 155) ?? "",
  };
}

export default async function ArtworkDetailPage({ params }: Props) {
  const { id } = await params;
  const artwork = await getArtworkById(id);

  if (!artwork) notFound();

  const categoryLabel =
    artwork.category.charAt(0).toUpperCase() + artwork.category.slice(1);
  const categoryHref = `/${artwork.category}s`;
  const price = `$${Number(artwork.price).toLocaleString()}`;

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">

        {/* Breadcrumb */}
        <nav className="mb-10 flex items-center gap-2 text-xs tracking-widest uppercase text-muted font-sans">
          <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
          <span>/</span>
          <Link href={categoryHref} className="hover:text-charcoal transition-colors">
            {categoryLabel}s
          </Link>
          <span>/</span>
          <span className="text-warm-gray">{artwork.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Image — sourced directly from Supabase Storage */}
          <FadeIn>
            <div className="relative aspect-[4/3] bg-parchment overflow-hidden sticky top-24">
              <Image
                src={artwork.image_url}
                alt={artwork.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {!artwork.available && (
                <div className="absolute top-4 left-4 bg-charcoal text-cream text-xs px-3 py-1 tracking-widest uppercase font-sans">
                  Sold
                </div>
              )}
            </div>
          </FadeIn>

          {/* Details */}
          <FadeIn delay={100}>
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-xs tracking-widest uppercase text-accent font-sans">
                  {categoryLabel}
                </span>
                <h1 className="mt-2 font-serif text-3xl lg:text-4xl text-charcoal leading-snug">
                  {artwork.title}
                </h1>
              </div>

              {/* Category + availability */}
              <dl className="grid grid-cols-2 gap-y-3 gap-x-6 border-y border-border py-5 text-sm">
                <div>
                  <dt className="text-xs tracking-widest uppercase text-muted mb-1">Category</dt>
                  <dd className="text-charcoal capitalize">{artwork.category}</dd>
                </div>
                <div>
                  <dt className="text-xs tracking-widest uppercase text-muted mb-1">Availability</dt>
                  <dd className={artwork.available ? "text-accent" : "text-muted"}>
                    {artwork.available ? "Available" : "Sold"}
                  </dd>
                </div>
              </dl>

              {/* Price + buy */}
              <div className="flex items-center justify-between">
                <span className="font-serif text-3xl text-charcoal">{price}</span>
                {artwork.available ? (
                  // Stripe checkout will replace this — for now, direct to contact
                  <Button href="/contact" variant="primary">Inquire to Buy</Button>
                ) : (
                  <span className="text-sm text-muted tracking-widest uppercase">Sold</span>
                )}
              </div>

              {/* Description */}
              {artwork.description && (
                <div className="flex flex-col gap-3">
                  <h2 className="text-xs tracking-widest uppercase text-warm-gray font-sans">
                    About this Work
                  </h2>
                  <p className="text-charcoal leading-relaxed">{artwork.description}</p>
                </div>
              )}

              {/* Artist's note */}
              {artwork.inspiration && (
                <div className="flex flex-col gap-3 bg-parchment p-6">
                  <h2 className="text-xs tracking-widest uppercase text-warm-gray font-sans">
                    Artist&apos;s Note
                  </h2>
                  <blockquote className="text-warm-gray leading-relaxed italic font-serif">
                    &ldquo;{artwork.inspiration}&rdquo;
                  </blockquote>
                </div>
              )}

              <Link
                href={categoryHref}
                className="text-xs tracking-widest uppercase text-warm-gray hover:text-charcoal transition-colors duration-200 underline-offset-4 hover:underline"
              >
                ← Back to {categoryLabel}s
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
