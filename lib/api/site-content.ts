import { supabase } from "@/lib/supabase";

// Default values used when a key hasn't been saved to the DB yet.
// This means the site works out-of-the-box without any DB seeding.
export const CONTENT_DEFAULTS: Record<string, string> = {
  hero_subtitle:       "Original artwork · Available to collect",
  bio_heading:         "Made with intention, offered with care.",
  bio_paragraph_1:     "Shibani is a self-taught artist whose work explores the intersection of color, emotion, and everyday moments. Each piece begins with observation—a quality of light, a gesture, a feeling—and ends as something that can live in a home and be looked at for years.",
  bio_paragraph_2:     "Working across oil painting, detailed drawings, and expressive sketches, she finds different truths in each medium. Her studio practice is slow and deliberate: she would rather finish one honest piece than ten impressive ones.",
  bio_image_url:       "https://picsum.photos/seed/shibani-bio/600/800",
  gallery_heading:     "A space for work that lasts.",
  gallery_paragraph_1: "Every work here is one-of-a-kind, signed by the artist, and shipped with care. This gallery exists because art deserves to be lived with, not just admired from a distance. Whether you are drawn to a painting for its color, a drawing for its precision, or a sketch for its spontaneity—there is something here for you.",
  gallery_paragraph_2: "All pieces are available for purchase. For commissions, custom work, or questions about a specific piece, please reach out directly.",
  inquiry_heading:     "Interested in a piece?",
  inquiry_paragraph:   "For purchase inquiries, commissions, or just to say hello—reach out via email or Instagram. Every message is read and responded to personally.",
  contact_email:       "art@colorsbyshibani.com",
  contact_instagram:   "colorsbyshibani",
  contact_heading:     "Let's talk about art.",
  contact_paragraph:   "Interested in purchasing a piece, commissioning something new, or just want to say hello? I'd love to hear from you. I read every message and reply within a few days.",
  paintings_description: "Original oil and mixed-media paintings. Each canvas is one-of-a-kind, signed, and ready to hang.",
  drawings_description:  "Charcoal portraits, graphite studies, and detailed observational drawings. Each work is rendered on archival-quality paper.",
  sketches_description:  "Loose ink and pencil sketches — capturing gesture, light, and moment. Works on paper, often done in a single sitting.",
};

/** Read a single content value. Falls back to CONTENT_DEFAULTS if the key isn't in the DB. */
export async function getSiteContent(key: string): Promise<string> {
  const { data, error } = await supabase
    .from("site_content")
    .select("value")
    .eq("key", key)
    .single();

  if (error) return CONTENT_DEFAULTS[key] ?? "";
  return data?.value ?? CONTENT_DEFAULTS[key] ?? "";
}

/**
 * Bulk-fetch multiple content keys in one query.
 * Returns a map of key → value, pre-filled with CONTENT_DEFAULTS for any
 * keys that haven't been saved to the DB yet.
 */
export async function getSiteContents(
  keys: string[]
): Promise<Record<string, string>> {
  const result: Record<string, string> = {};
  for (const key of keys) result[key] = CONTENT_DEFAULTS[key] ?? "";

  const { data, error } = await supabase
    .from("site_content")
    .select("key, value")
    .in("key", keys);

  if (!error && data) {
    for (const row of data) result[row.key] = row.value;
  }
  return result;
}

/** Upsert a single content value. */
export async function updateSiteContent(key: string, value: string): Promise<void> {
  const { error } = await supabase
    .from("site_content")
    .upsert({ key, value }, { onConflict: "key" });

  if (error) throw error;
}

/** Upsert multiple content values in one call. */
export async function updateSiteContents(
  entries: Record<string, string>
): Promise<void> {
  const rows = Object.entries(entries).map(([key, value]) => ({ key, value }));
  const { error } = await supabase
    .from("site_content")
    .upsert(rows, { onConflict: "key" });

  if (error) throw error;
}
