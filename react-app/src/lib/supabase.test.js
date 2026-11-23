import test from 'node:test'
import assert from 'node:assert/strict'
import { getSupabaseClient, isSupabaseConfigured } from './supabase.js'

test('reports missing Supabase environment variables clearly', () => {
  assert.equal(isSupabaseConfigured({}), false)
  assert.throws(
    () => getSupabaseClient({}),
    /VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY/,
  )
})

test('initializes and reuses a Supabase client from configured environment values', () => {
  const environment = {
    VITE_SUPABASE_URL: 'https://example.supabase.co',
    VITE_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_example',
  }

  assert.equal(isSupabaseConfigured(environment), true)
  const client = getSupabaseClient(environment)
  assert.equal(typeof client.from, 'function')
  assert.equal(getSupabaseClient(environment), client)
})
