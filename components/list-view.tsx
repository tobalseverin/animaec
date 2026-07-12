"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, AlertCircle, ExternalLink } from "lucide-react"
import { useActivities, type Activity } from "@/hooks/useActivities"

interface Event {
  id: string
  title: string
  start: Date
  end: Date
  type: string
  instructor: string
  description: string
  image: string
  phone: string
}

const getTypeColor = (tipo: string): string => {
  const typeColors: { [key: string]: string } = {
    Taller: "#D53F6E",
    Clase: "#1A4A92",
    Evento: "#009476",
    Conferencia: "#E19014",
    Reunión: "#660099",
  }
  return typeColors[tipo] || "#CE838B"
}

interface ListViewProps {
  selectedSalon?: string
  onSalonChange?: (salon: string) => void
}

export default function ListView({ selectedSalon = "todos", onSalonChange }: ListViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Fetch activities from Directus
  const { activities, loading, error } = useActivities()

  // Convert Activity to Event format
  const mapActivityToEvent = (activity: Activity): Event => {
    let startDate = new Date()
    let endDate = new Date()
    endDate.setHours(endDate.getHours() + 1)

    if (activity.horario) {
      try {
        startDate = new Date(activity.horario)
        endDate = new Date(activity.horario)
        endDate.setHours(endDate.getHours() + 1)
      } catch (e) {
        console.error("Error parsing horario:", activity.horario, e)
      }
    }

    return {
      id: String(activity.id),
      title: activity.titulo,
      start: startDate,
      end: endDate,
      type: activity.tipo,
      instructor: activity.colaboradores?.[0]?.nombre || activity.telefono || "Sin facilitador",
      description: activity.descripcion,
      image: activity.foto || "/placeholder.svg?height=200&width=200",
      phone: activity.telefono,
    }
  }

  // Convert activities to events
  const events: Event[] = activities.map(mapActivityToEvent)

  // Get unique event types (without "todos")
  const eventTypes = [...new Set(activities.map((a) => a.tipo).filter(Boolean))].sort()

  // Filter and sort events by date and type
  const filteredEvents = events
    .filter(
      (event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      // Sort by type first, then by date
      if (a.type !== b.type) {
        return a.type.localeCompare(b.type)
      }
      return a.start.getTime() - b.start.getTime()
    })

  // Group events by type
  const groupedEvents = useMemo(() => {
    const groups: { [key: string]: Event[] } = {}
    filteredEvents.forEach((event) => {
      if (!groups[event.type]) {
        groups[event.type] = []
      }
      groups[event.type].push(event)
    })
    return groups
  }, [filteredEvents])

  const formatDate = (date: Date) => {
    try {
      return date.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    } catch (error) {
      console.error("Error formatting date:", error)
      return "Fecha no disponible"
    }
  }

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
    setIsDialogOpen(true)
  }

  const openWhatsApp = (phone: string, eventTitle: string) => {
    // Remove spaces and special characters from phone number
    let cleanPhone = phone.replace(/[\s\-\(\)]/g, "")

    // Add Uruguay country code if not present
    if (!cleanPhone.startsWith("+")) {
      // If starts with 0, remove it (Uruguayan convention)
      if (cleanPhone.startsWith("0")) {
        cleanPhone = cleanPhone.substring(1)
      }
      // Add +598 country code
      cleanPhone = "+598" + cleanPhone
    }

    const message = encodeURIComponent(`Hola, me interesa participar en "${eventTitle}"`)
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank")
  }

  return (
    <div className="space-y-4 p-4">
      {/* Categorías scrollables y Selector de salón */}
      <div className="flex items-center gap-4 overflow-x-auto pb-2 px-2">
        {/* Categorías scrollables */}
        <div className="flex gap-2">
          {eventTypes.map((type) => (
            <Button
              key={type}
              variant="outline"
              size="sm"
              onClick={() => {
                const element = document.getElementById(`section-${type}`)
                if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              }}
              className="whitespace-nowrap"
            >
              {type}
            </Button>
          ))}
        </div>

        {/* Selector de salón */}
        {onSalonChange && (
          <Select value={selectedSalon} onValueChange={onSalonChange}>
            <SelectTrigger className="w-[200px] flex-shrink-0">
              <SelectValue placeholder="Todos los salones" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los salones</SelectItem>
              <SelectItem value="Salón 1">Salón 1</SelectItem>
              <SelectItem value="Salón 2">Salón 2</SelectItem>
              <SelectItem value="Salón 3">Salón 3</SelectItem>
              <SelectItem value="Salón 4">Salón 4</SelectItem>
              <SelectItem value="Salón 5">Salón 5</SelectItem>
              <SelectItem value="Casa">Casa</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Lista de actividades agrupadas por categoría */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Cargando actividades...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-2 text-center max-w-sm">
              <AlertCircle className="h-8 w-8 text-destructive" />
              <p className="text-sm font-medium">Error al cargar actividades</p>
              <p className="text-xs text-muted-foreground">{error}</p>
              <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="mt-2">
                Reintentar
              </Button>
            </div>
          </div>
        ) : Object.keys(groupedEvents).length > 0 ? (
          Object.keys(groupedEvents)
            .sort()
            .map((type) => (
              <div key={type} id={`section-${type}`}>
                {/* Título de la sección */}
                <h2 className="text-lg font-bold uppercase tracking-widest text-muted-foreground mb-4 px-2">
                  {type}
                </h2>
                {/* Actividades de esta categoría */}
                <div className="space-y-3">
                  {groupedEvents[type].map((event) => (
                    <div
                      key={event.id}
                      className="rounded-lg cursor-pointer hover:opacity-80 transition-colors bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-row items-stretch overflow-hidden"
                      style={{ borderLeft: `4px solid ${getTypeColor(event.type)}` }}
                      onClick={() => handleEventClick(event)}
                    >
                      {/* Imagen - Toma todo el alto */}
                      <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      {/* Contenido - Título + Datos centrados verticalmente */}
                      <div className="flex-1 flex items-center justify-between px-5 py-4 gap-4">
                        {/* Título + Instructor (centro-izquierda) */}
                        <div className="flex-1">
                          <h3 className="activity-title font-normal uppercase leading-tight text-2xl tracking-widest">
                            {event.title}
                          </h3>
                          {event.instructor && event.instructor !== "Sin facilitador" && (
                            <p className="text-sm text-muted-foreground mt-1">con {event.instructor}</p>
                          )}
                        </div>

                        {/* Tipo y Fecha (derecha) */}
                        <div className="flex flex-col items-end gap-2 text-right flex-shrink-0">
                          <p className="text-sm font-bold uppercase tracking-widest">{event.type}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground whitespace-nowrap">
                            <span className="capitalize hidden sm:inline">{formatDate(event.start)}</span>
                            <span className="hidden sm:inline">·</span>
                            <span>
                              {event.start.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No se encontraron actividades.</p>
          </div>
        )}
      </div>

      {/* Event Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedEvent && (
          <DialogContent className="p-0 max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header con imagen */}
            <div className="relative h-48 overflow-hidden flex-shrink-0">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-3xl font-bold text-white">{selectedEvent.title}</h2>
                <p className="text-sm text-white/90 mt-2 uppercase tracking-wide">{selectedEvent.type}</p>
              </div>
            </div>

            {/* Contenido - Ficha */}
            <div className="p-6 space-y-6">
              {/* Sección: Cuándo */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-2">📅 Cuándo</h3>
                <p className="text-sm font-semibold">
                  {selectedEvent.start.toLocaleDateString("es-ES", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedEvent.start.toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {/* Sección: Facilitador */}
              {selectedEvent.instructor && selectedEvent.instructor !== "Sin facilitador" && (
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-2">👤 Facilitador</h3>
                  <p className="text-sm font-semibold">{selectedEvent.instructor}</p>
                </div>
              )}

              {/* Sección: Descripción */}
              {selectedEvent.description && (
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-3">📝 Descripción</h3>
                  <div className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                    {selectedEvent.description}
                  </div>
                </div>
              )}

              {/* Sección: Contacto */}
              {selectedEvent.phone && selectedEvent.phone.trim() && (
                <div className="border-l-4 border-green-600 pl-4 pt-2">
                  <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-3">💬 Contactar</h3>
                  <Button
                    onClick={() => openWhatsApp(selectedEvent.phone, selectedEvent.title)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Escribir por WhatsApp
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
