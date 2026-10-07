import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../../types/database'

interface SupabaseConfiguration {
  publishableKey: string
  url: string
}

let client: SupabaseClient<Database> | undefined

function getSupabaseConfiguration(): SupabaseConfiguration {
  const url = import.meta.env.VITE_SUPABASE_URL
  const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
  const missingVariables = [
    !url && 'VITE_SUPABASE_URL',
    !publishableKey && 'VITE_SUPABASE_PUBLISHABLE_KEY',
  ].filter((variable): variable is string => Boolean(variable))

  if (missingVariables.length > 0) {
    throw new Error(
      `Supabase is not configured. Add ${missingVariables.join(' and ')} to .env.local.`,
    )
  }

  return { url: url!, publishableKey: publishableKey! }
}

export function getSupabaseClient(): SupabaseClient<Database> {
  if (!client) {
    const { url, publishableKey } = getSupabaseConfiguration()
    client = createClient<Database>(url, publishableKey)
  }

  return client
}
