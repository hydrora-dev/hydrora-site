import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client.
 *
 * Required env vars (Vercel / local):
 * - SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY
 *
 * IMPORTANT: never expose the service role key to the browser.
 */
export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    auth: { persistSession: false },
    global: {
      headers: {
        "X-Client-Info": "hydrora-site/server"
      }
    }
  });
}
