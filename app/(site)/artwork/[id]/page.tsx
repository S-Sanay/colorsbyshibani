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
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-[90rem] px-8 lg:px-16">

        {/* Breadcrumb */}
        <nav className="mb-12 flex items-center gap-2 font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-muted">
          <Link href="/" className="transition-all duration-300 hover:text-charcoal">Home</Link>
          <span className="text-border">—</span>
          <Link href={categoryHref} className="transition-all duration-300 hover:text-charcoal">
            {categoryLabel}s
          </Link>
          <span className="text-border">—</span>
          <span className="text-charcoal">{artwork.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Image — gallery frame with 24px matting */}
          <FadeIn>
            <div className="sticky top-24 bg-white border border-border p-6">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={artwork.image_url}
                  alt={artwork.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {!artwork.available && (
                  <div className="absolute top-0 left-0 bg-charcoal text-white font-sans text-[11px] font-semibold px-3 py-1 tracking-[0.1em] uppercase">
                    Sold
                  </div>
                )}
              </div>
            </div>
          </FadeIn>

          {/* Details */}
          <FadeIn delay={100}>
            <div className="flex flex-col gap-8">

              <div>
                <span className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-accent">
                  {categoryLabel}
                </span>
                <h1 className="mt-3 font-serif font-normal text-[32px] leading-[1.2] text-charcoal">
                  {artwork.title}
                </h1>
              </div>

              {/* Metadata grid */}
              <dl className="grid grid-cols-2 gap-y-5 gap-x-8 border-y border-border py-6">
                <div>
                  <dt className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-muted mb-1.5">Category</dt>
                  <dd className="font-sans text-[16px] text-charcoal capitalize">{artwork.category}</dd>
                </div>
                <div>
                  <dt className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-muted mb-1.5">Availability</dt>
                  <dd className={`font-sans text-[16px] ${artwork.available ? "text-charcoal" : "text-muted"}`}>
                    {artwork.available ? "Available" : "Sold"}
                  </dd>
                </div>
              </dl>

              {/* Price + buy */}
              <div className="flex items-center justify-between">
                <span className="font-sans text-[15px] font-medium tracking-[0.05em] text-charcoal">
                  {price}
                </span>
                {artwork.available ? (
                  <Button href="/contact" variant="primary">Inquire to Buy</Button>
                ) : (
                  <span className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-muted">Sold</span>
                )}
              </div>

              {/* Description */}
              {artwork.description && (
                <div className="flex flex-col gap-3">
                  <h2 className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-muted">
                    About this Work
                  </h2>
                  <p className="font-sans text-[16px] leading-[1.6] text-charcoal">{artwork.description}</p>
                </div>
              )}

              {/* Artist's note — recessed container */}
              {artwork.inspiration && (
                <div className="flex flex-col gap-3 bg-cream border border-border p-6">
                  <h2 className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-muted">
                    Artist&apos;s Note
                  </h2>
                  <blockquote className="font-serif font-normal text-[18px] leading-[1.6] text-warm-gray italic">
                    &ldquo;{artwork.inspiration}&rdquo;
                  </blockquote>
                </div>
              )}

              <Link
                href={categoryHref}
                className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-muted transition-all duration-300 hover:text-charcoal self-start"
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
