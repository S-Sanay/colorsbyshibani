// Data access layer — abstracts where artworks come from.
// Currently uses local mock data. When Supabase is connected:
//   1. Install `@supabase/supabase-js`
//   2. Create a client in `lib/supabase.ts`
//   3. Replace the mock imports below with Supabase queries

import { artworks, Artwork, Category } from "@/data/artworks";

/** Return all artworks, optionally filtered by category. */
export async function getArtworks(category?: Category): Promise<Artwork[]> {
  // TODO (Supabase): const { data } = await supabase.from('artworks').select('*').eq('category', category)
  if (category) {
    return artworks.filter((a) => a.category === category);
  }
  return artworks;
}

/** Return a single artwork by id, or null if not found. */
export async function getArtworkById(id: string): Promise<Artwork | null> {
  // TODO (Supabase): const { data } = await supabase.from('artworks').select('*').eq('id', id).single()
  return artworks.find((a) => a.id === id) ?? null;
}

/** Return the N most recent artworks across all categories. */
export async function getFeaturedArtworks(limit = 6): Promise<Artwork[]> {
  // TODO (Supabase): add .order('created_at', { ascending: false }).limit(limit)
  return artworks.slice(0, limit);
}
