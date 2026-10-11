export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('[CLIENT ERROR LOG]:', JSON.stringify(body, null, 2))
    return Response.json({ success: true })
  } catch (err) {
    console.error('[CLIENT ERROR LOG] Parse error:', err)
    return Response.json({ success: false }, { status: 400 })
  }
}
