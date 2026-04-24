// CRUD for the `site_content` table.
// Schema: { key: text (PK), value: text }
// Example rows: { key: 'bio', value: '...' }

import { supabase } from "@/lib/supabase";

/** Read a single content value by key. Returns empty string if not found. */
export async function getSiteContent(key: string): Promise<string> {
  const { data, error } = await supabase
    .from("site_content")
    .select("value")
    .eq("key", key)
    .single();

  if (error) return "";
  return data?.value ?? "";
}

/** Upsert a content value. Creates the row if it doesn't exist. */
export async function updateSiteContent(key: string, value: string): Promise<void> {
  const { error } = await supabase
    .from("site_content")
    .upsert({ key, value }, { onConflict: "key" });

  if (error) throw error;
}
