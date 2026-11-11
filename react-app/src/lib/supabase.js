import { createClient } from '@supabase/supabase-js'

const viteEnv = import.meta.env ?? {}
let client

export function getSupabaseClient(environment = viteEnv) {
  const url = environment.VITE_SUPABASE_URL?.trim()
  const publishableKey = environment.VITE_SUPABASE_PUBLISHABLE_KEY?.trim()

  if (!url || !publishableKey) {
    throw new Error(
      'Supabase is not configured. Copy react-app/.env.example to react-app/.env.local and set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.',
    )
  }

  if (!client) client = createClient(url, publishableKey)
  return client
}
