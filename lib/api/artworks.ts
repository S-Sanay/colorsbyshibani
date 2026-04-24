// Supabase CRUD for the `artworks` table.
// The public-facing pages currently use lib/artworks.ts (mock data).
// When you're ready to go live: replace the functions in lib/artworks.ts
// with calls to getArtworks() / getArtworkById() from this file.

import { supabase } from "@/lib/supabase";

// Mirrors the `artworks` table schema (snake_case matches Supabase columns).
export interface DbArtwork {
  id: string;
  title: string;
  category: "painting" | "drawing" | "sketch";
  image_url: string;
  description: string;
  inspiration: string;
  price: number; // stored in whole dollars (e.g. 650) — ready for Stripe (multiply × 100)
  available: boolean;
  created_at: string;
}

export type ArtworkInput = Omit<DbArtwork, "id" | "created_at">;

/** Fetch all artworks ordered newest first. */
export async function getArtworks(): Promise<DbArtwork[]> {
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

/** Fetch a single artwork by id. */
export async function getArtworkById(id: string): Promise<DbArtwork | null> {
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

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

/** Delete an artwork row. Call deleteImage() first if you want to purge storage too. */
export async function deleteArtwork(id: string): Promise<void> {
  const { error } = await supabase.from("artworks").delete().eq("id", id);
  if (error) throw error;
}
