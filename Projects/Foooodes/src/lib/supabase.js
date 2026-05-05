import { createClient } from "@supabase/supabase-js";

/** Trim pasted env values — stray newlines here break JWT validation. */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim?.();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim?.();

export const hasSupabaseCredentials = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = hasSupabaseCredentials
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
