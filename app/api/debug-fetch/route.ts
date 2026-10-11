export async function GET() {
  const DIRECTUS_URL = process.env.DIRECTUS_URL || ''
  const DIRECTUS_USER = process.env.DIRECTUS_USER || ''
  const DIRECTUS_PASS = process.env.DIRECTUS_PASS || ''

  const logs: string[] = []

  try {
    logs.push(`Starting test - URL will be: http://${DIRECTUS_URL}`)

    // 1. Auth
    logs.push('Attempting auth...')
    const authUrl = `http://${DIRECTUS_URL}/auth/login`
    logs.push(`Auth URL: ${authUrl}`)

    const authResponse = await fetch(authUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: DIRECTUS_USER,
        password: DIRECTUS_PASS
      })
    })

    logs.push(`Auth status: ${authResponse.status} ${authResponse.statusText}`)

    if (!authResponse.ok) {
      const errText = await authResponse.text()
      logs.push(`Auth error: ${errText.substring(0, 200)}`)
      return Response.json({
        success: false,
        error: `Auth failed with status ${authResponse.status}`,
        logs
      }, { status: 400 })
    }

    const authData = await authResponse.json()
    logs.push('✓ Auth successful')

    // 2. Get activities
    const token = authData.data.access_token
    const activitiesUrl = `http://${DIRECTUS_URL}/items/aec_actividades?fields=*&limit=3`
    logs.push(`Activities URL: ${activitiesUrl}`)

    const activitiesResponse = await fetch(activitiesUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    logs.push(`Activities status: ${activitiesResponse.status}`)

    if (!activitiesResponse.ok) {
      const errText = await activitiesResponse.text()
      logs.push(`Activities error: ${errText.substring(0, 200)}`)
      return Response.json({
        success: false,
        error: `Activities fetch failed with status ${activitiesResponse.status}`,
        logs
      }, { status: 400 })
    }

    const activitiesData = await activitiesResponse.json()
    logs.push(`✓ Got ${activitiesData.data.length} activities`)

    return Response.json({
      success: true,
      count: activitiesData.data.length,
      logs
    })
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err)
    logs.push(`✗ Exception: ${errMsg}`)

    return Response.json({
      success: false,
      error: errMsg,
      logs
    }, { status: 500 })
  }
}
