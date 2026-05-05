import { createClient } from '@supabase/supabase-js'

// 🔧 Replace these with your Supabase project credentials
// Go to: https://supabase.com → Your Project → Settings → API
const SUPABASE_URL = 'YOUR_SUPABASE_URL'
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
