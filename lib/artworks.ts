// Public-facing data layer — re-exports Supabase-backed functions.
// Gallery pages import from here so they never talk to Supabase directly.
// Only available=true artworks are returned; the admin uses lib/api/artworks.ts
// directly to see everything including drafts and sold works.

export type { DbArtwork as Artwork, Category } from "@/lib/api/artworks";

import {
  getArtworks as _getArtworks,
  getFeaturedArtworks,
  getArtworkById,
  type DbArtwork,
} from "@/lib/api/artworks";

/** Gallery pages: available artworks only, newest first. */
export async function getArtworks(category?: string): Promise<DbArtwork[]> {
  return _getArtworks(category, { availableOnly: true });
}

export { getFeaturedArtworks, getArtworkById };
