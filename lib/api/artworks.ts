// ─── Supabase data layer for artworks ───────────────────────────────────────
//
// HOW DATA FLOWS:
//   /admin uploads artwork → stored in Supabase (DB row + Storage file)
//   Public gallery pages call getArtworks() → Supabase returns live rows
//   Next.js 16 does NOT cache DB queries by default, so every page request
//   fetches fresh data — new uploads appear immediately with no rebuild needed.
//
// ADMIN vs PUBLIC:
//   Admin calls getArtworks() with no options → sees ALL artworks (drafts, sold, etc.)
//   Public pages call getArtworks(category, { availableOnly: true }) → only available=true rows

import { supabase } from "@/lib/supabase";

export type Category = "painting" | "drawing" | "sketch";

// Mirrors the `artworks` table schema exactly.
// price is stored in whole dollars (e.g. 650 = $650).
export interface DbArtwork {
  id: string;
  title: string;
  category: Category;
  image_url: string;
  description: string;
  inspiration: string;
  price: number;
  available: boolean;
  created_at: string;
}

export type ArtworkInput = Omit<DbArtwork, "id" | "created_at">;

// ─── Public read functions ────────────────────────────────────────────────────

/**
 * Fetch artworks, optionally filtered by category.
 * Pass `{ availableOnly: true }` for public gallery pages so only artworks
 * marked available=true are returned. Admin omits this to see everything.
 */
export async function getArtworks(
  category?: string,
  { availableOnly = false }: { availableOnly?: boolean } = {}
): Promise<DbArtwork[]> {
  let query = supabase
    .from("artworks")
    .select("*")
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  if (availableOnly) {
    query = query.eq("available", true);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

/** Fetch the N newest available artworks across all categories (for the home page). */
export async function getFeaturedArtworks(limit = 6): Promise<DbArtwork[]> {
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .eq("available", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

/** Fetch a single artwork by id. Returns null if not found. */
export async function getArtworkById(id: string): Promise<DbArtwork | null> {
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

// ─── Admin write functions ────────────────────────────────────────────────────

/** Insert a new artwork row and return the created record. */
export async function createArtwork(input: ArtworkInput): Promise<DbArtwork> {
  const { data, error } = await supabase
    .from("artworks")
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/** Update an existing artwork and return the updated record. */
export async function updateArtwork(
  id: string,
  input: Partial<ArtworkInput>
): Promise<DbArtwork> {
  const { data, error } = await supabase
    .from("artworks")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/** Delete an artwork row by id. */
export async function deleteArtwork(id: string): Promise<void> {
  const { error } = await supabase.from("artworks").delete().eq("id", id);
  if (error) throw error;
}
