/**
 * This simulates what the browser's useActivities hook would do
 * It uses the exact same code logic to verify browser compatibility
 */

export async function GET() {
  const logs: string[] = []

  try {
    // This simulates the browser's environment
    // Process.env values would be what's baked in at build time
    const DIRECTUS_URL = process.env.DIRECTUS_URL || ''  // This is what the hook gets after the replacement
    const DIRECTUS_USER = process.env.DIRECTUS_USER || ''
    const DIRECTUS_PASS = process.env.DIRECTUS_PASS || ''

    logs.push(`[Browser simulation] Using URL: ${DIRECTUS_URL}`)

    // 1. Authenticate (same as hook)
    const authResponse = await fetch(`${DIRECTUS_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: DIRECTUS_USER,
        password: DIRECTUS_PASS
      })
    })

    logs.push(`[Browser] Auth response status: ${authResponse.status}`)

    if (!authResponse.ok) {
      logs.push(`[Browser] Auth failed!`)
      return Response.json({ success: false, logs, error: `Auth failed with status ${authResponse.status}` }, { status: 400 })
    }

    const authData = await authResponse.json()
    const token = authData.data.access_token
    logs.push(`[Browser] Auth successful, got token`)

    // 2. Get activities (same as hook)
    const activitiesResponse = await fetch(
      `${DIRECTUS_URL}/items/aec_actividades?fields=*&limit=100`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )

    logs.push(`[Browser] Activities response status: ${activitiesResponse.status}`)

    if (!activitiesResponse.ok) {
      logs.push(`[Browser] Activities fetch failed!`)
      return Response.json({
        success: false,
        logs,
        error: `Activities fetch failed with status ${activitiesResponse.status}`
      }, { status: 400 })
    }

    const activitiesData = await activitiesResponse.json()
    logs.push(`[Browser] Got ${activitiesData.data.length} activities`)

    // 3. Get relations
    const relationsResponse = await fetch(
      `${DIRECTUS_URL}/items/aec_actividades_colaboradores?limit=1000`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )

    const relationsData = relationsResponse.ok ? await relationsResponse.json() : { data: [] }
    logs.push(`[Browser] Got ${relationsData.data.length} relations`)

    // 4. Get colaboradores
    const colaboradoresResponse = await fetch(
      `${DIRECTUS_URL}/items/colaboradores?limit=1000`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )

    const colaboradoresData = colaboradoresResponse.ok ? await colaboradoresResponse.json() : { data: [] }
    logs.push(`[Browser] Got ${colaboradoresData.data.length} colaboradores`)

    logs.push(`[Browser simulation] SUCCESS - would render ${activitiesData.data.length} activities`)

    return Response.json({
      success: true,
      logs,
      stats: {
        activities: activitiesData.data.length,
        relations: relationsData.data.length,
        colaboradores: colaboradoresData.data.length
      }
    })
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err)
    logs.push(`[Browser] Exception: ${errMsg}`)
    return Response.json({ success: false, logs, error: errMsg }, { status: 500 })
  }
}
