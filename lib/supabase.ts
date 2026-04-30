import { createClient } from "@supabase/supabase-js";

// Environment variables — set these in .env.local (never commit real values).
// Grab them from: Supabase Dashboard → Project Settings → API
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase env vars. Add NEXT_PUBLIC_SUPABASE_URL and " +
      "NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local"
  );
}

// PKCE flow: stores a code_verifier in localStorage so magic links can only
// be completed by the browser that requested them. This prevents iCloud Mail
// Privacy Protection (and similar link-scanners) from consuming the one-time
// token before the user clicks it.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: "pkce",
  },
});
