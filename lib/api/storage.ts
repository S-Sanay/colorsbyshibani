// Image upload / delete helpers for the `artworks` Supabase Storage bucket.
// Bucket must be public (RLS: "Public read, authenticated insert/delete").

import { supabase } from "@/lib/supabase";

const BUCKET = "artworks";

/**
 * Upload a File to the artworks bucket and return its public URL.
 * The URL is what gets stored in artworks.image_url.
 */
export async function uploadImage(file: File): Promise<string> {
  // Build a unique path so re-uploads of the same filename don't collide.
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(data.path);

  return publicUrl;
}

/**
 * Upload a site asset (bio portrait, etc.) to the artworks bucket under a
 * site/ prefix and return its public URL. Stored in site_content.bio_image_url.
 */
export async function uploadSiteImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `site/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(data.path);

  return publicUrl;
}

/**
 * Delete an image from storage given its full public URL.
 * Optional — call this from deleteArtwork() if you want to clean up orphaned files.
 */
export async function deleteImage(publicUrl: string): Promise<void> {
  // Extract the path segment after the bucket name in the public URL.
  const marker = `/object/public/${BUCKET}/`;
  const path = publicUrl.split(marker)[1];
  if (!path) return;

  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) throw error;
}
