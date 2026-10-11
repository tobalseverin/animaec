import { useState, useEffect } from 'react'

// Use DIRECTUS_URL as-is from environment
const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'
const DIRECTUS_USER = process.env.NEXT_PUBLIC_DIRECTUS_USER || 'admin@animaespacio.org'
const DIRECTUS_PASS = process.env.NEXT_PUBLIC_DIRECTUS_PASS || 'AnimaEspacio2026'

export interface Colaborador {
  id: number
  nombre: string
  bio?: string
  imagen?: string
}

export interface Activity {
  id: number
  titulo: string
  tipo: string
  sala: string
  horario: string | null
  dias: string
  descripcion: string
  foto: string | null
  telefono: string
  instagram: string
  colaboradores?: Colaborador[]
}

interface ActivityRelation {
  id: number
  aec_actividades_id: number
  colaboradores_id: number
}

export const useActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchActivities = async () => {
      console.log('[useActivities] Starting fetch...', {
        url: DIRECTUS_URL,
        user: DIRECTUS_USER
      })

      try {
        setLoading(true)

        // 1. Autenticarse en Directus
        console.log('[DEBUG] Starting auth to', DIRECTUS_URL)
        const authResponse = await fetch(`${DIRECTUS_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: DIRECTUS_USER,
            password: DIRECTUS_PASS
          })
        })
        console.log('[DEBUG] Auth response:', authResponse.status, authResponse.statusText)

        if (!authResponse.ok) {
          throw new Error(`Error de autenticación: ${authResponse.status}`)
        }

        const authData = await authResponse.json()
        const token = authData.data.access_token

        // 2. Obtener actividades
        const activitiesResponse = await fetch(
          `${DIRECTUS_URL}/items/aec_actividades?fields=*&limit=100`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        )

        if (!activitiesResponse.ok) {
          throw new Error(`Error: ${activitiesResponse.status}`)
        }

        const activitiesData = await activitiesResponse.json()

        // 3. Obtener relaciones colaboradores
        const relationsResponse = await fetch(
          `${DIRECTUS_URL}/items/aec_actividades_colaboradores?limit=1000`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        )

        const relationsData = relationsResponse.ok ? await relationsResponse.json() : { data: [] }

        // 4. Obtener colaboradores
        const colaboradoresResponse = await fetch(
          `${DIRECTUS_URL}/items/colaboradores?limit=1000`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        )

        const colaboradoresData = colaboradoresResponse.ok ? await colaboradoresResponse.json() : { data: [] }

        // 5. Crear mapas de acceso rápido
        const colaboradoresMap = new Map<number, Colaborador>()
        colaboradoresData.data.forEach((c: any) => {
          colaboradoresMap.set(c.id, {
            id: c.id,
            nombre: c.nombre,
            bio: c.bio,
            imagen: c.imagen
          })
        })

        const relationsByActivity = new Map<number, number[]>()
        ;(relationsData.data as ActivityRelation[]).forEach((rel) => {
          if (!relationsByActivity.has(rel.aec_actividades_id)) {
            relationsByActivity.set(rel.aec_actividades_id, [])
          }
          relationsByActivity.get(rel.aec_actividades_id)?.push(rel.colaboradores_id)
        })

        // 6. Enriquecer actividades con colaboradores
        const enrichedActivities = (activitiesData.data as Activity[]).map((activity) => ({
          ...activity,
          colaboradores: (relationsByActivity.get(activity.id) || [])
            .map(colabId => colaboradoresMap.get(colabId))
            .filter(Boolean) as Colaborador[]
        }))

        setActivities(enrichedActivities)
        setError(null)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
        console.error('Error fetching activities:', err)

        // Log to server
        try {
          fetch('/api/log-error', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              error: errorMessage,
              stack: err instanceof Error ? err.stack : null,
              timestamp: new Date().toISOString(),
              context: 'useActivities hook'
            })
          }).catch(() => {})
        } catch (logErr) {
          console.error('Could not log error:', logErr)
        }

        setError(errorMessage)
        setActivities([])
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()

    // Refresco cada 5 minutos
    const interval = setInterval(fetchActivities, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return { activities, loading, error }
}
