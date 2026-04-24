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

// Single browser-side client instance shared across the whole app.
// For server-side usage (Server Components, Route Handlers), swap to
// @supabase/ssr → createServerClient() with cookie handling.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
