export async function GET() {
  const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'
  const DIRECTUS_USER = process.env.NEXT_PUBLIC_DIRECTUS_USER || 'admin@animaespacio.org'
  const DIRECTUS_PASS = process.env.NEXT_PUBLIC_DIRECTUS_PASS || 'AnimaEspacio2026'

  try {
    // 1. Authenticate
    const authResponse = await fetch(`${DIRECTUS_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: DIRECTUS_USER,
        password: DIRECTUS_PASS
      })
    })

    if (!authResponse.ok) {
      return Response.json({
        success: false,
        error: `Auth failed: ${authResponse.status}`,
        step: 'authentication'
      }, { status: 400 })
    }

    const authData = await authResponse.json()
    const token = authData.data.access_token

    // 2. Get activities
    const activitiesResponse = await fetch(
      `${DIRECTUS_URL}/items/aec_actividades?fields=*&limit=5`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )

    if (!activitiesResponse.ok) {
      return Response.json({
        success: false,
        error: `Activities fetch failed: ${activitiesResponse.status}`,
        step: 'fetching activities'
      }, { status: 400 })
    }

    const activitiesData = await activitiesResponse.json()

    return Response.json({
      success: true,
      activities_count: activitiesData.data.length,
      directus_url: DIRECTUS_URL,
      user: DIRECTUS_USER
    })
  } catch (err) {
    return Response.json({
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
      type: err instanceof Error ? err.constructor.name : typeof err
    }, { status: 500 })
  }
}
