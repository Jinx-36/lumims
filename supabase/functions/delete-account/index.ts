import { withSupabase } from 'npm:@supabase/server@1'

const corsHeaders = {
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Origin': '*',
}

const handler = withSupabase({ auth: 'user' }, async (request, context) => {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed.' }, { status: 405 })
  }

  const userId = context.userClaims?.id
  if (!userId) {
    return Response.json({ error: 'Authentication required.' }, { status: 401 })
  }

  const { error } = await context.supabaseAdmin.auth.admin.deleteUser(userId, false)
  if (error) {
    console.error('Account deletion failed for the authenticated caller.')
    return Response.json({ error: 'Account deletion failed.' }, { status: 500 })
  }

  return Response.json({ deleted: true })
})

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const response = await handler(request)
  const headers = new Headers(response.headers)
  Object.entries(corsHeaders).forEach(([name, value]) => headers.set(name, value))

  return new Response(response.body, {
    headers,
    status: response.status,
  })
})
