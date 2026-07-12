"use client"

import React, { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, Calendar, List, Search, Loader2, AlertCircle } from "lucide-react"
import { useActivities, type Activity } from "@/hooks/useActivities"

// Colores extraídos del logo SVG
const logoColors = {
  salon1: "#D53F6E", // Magenta del logo
  salon2: "#1A4A92", // Azul del logo
  salon3: "#009476", // Verde del logo
  salon4: "#E19014", // Naranja del logo
  salon5: "#660099", // Púrpura del logo
  casa: "#CE838B", // Rosa del logo
}

interface Event {
  id: string
  title: string
  start: Date
  end: Date
  salon: string
  instructor: string
  description: string
  color: string
  image: string
}

type CalendarViewType = "month" | "week" | "day"

interface CalendarViewProps {
  selectedSalon?: string
  onSalonChange?: (salon: string) => void
  searchQuery?: string
  onSearchChange?: (query: string) => void
  currentView?: "calendar" | "list"
  onViewChange?: (view: "calendar" | "list") => void
}

export default function CalendarView({
  selectedSalon = "todos",
  onSalonChange,
  searchQuery: externalSearchQuery = "",
  onSearchChange,
  currentView = "calendar",
  onViewChange
}: CalendarViewProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [calendarDays, setCalendarDays] = useState<Array<Date | null>>([])
  const [viewType, setViewType] = useState<CalendarViewType>("week")
  const [hours, setHours] = useState<string[]>([])
  const [calendarHeight, setCalendarHeight] = useState(0)
  const [internalSearchQuery, setInternalSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Referencia para medir la altura del contenedor
  const containerRef = React.useRef<HTMLDivElement>(null)

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

    // Get color based on type
    const getTypeColor = (tipo: string): string => {
      const typeColors: { [key: string]: string } = {
        "Taller": "#D53F6E",
        "Clase": "#1A4A92",
        "Evento": "#009476",
        "Conferencia": "#E19014",
        "Reunión": "#660099",
      }
      return typeColors[tipo] || "#CE838B"
    }

    const color = getTypeColor(activity.tipo)

    return {
      id: String(activity.id),
      title: activity.titulo,
      start: startDate,
      end: endDate,
      salon: activity.sala,
      instructor: activity.colaboradores?.[0]?.nombre || activity.telefono || "Sin facilitador",
      description: activity.descripcion,
      color: color,
      image: activity.foto || "/placeholder.svg?height=200&width=200",
    }
  }

  // Map day names (English and Spanish) to JS day-of-week index (0=Sun, 1=Mon...)
  const dayNameToIndex: Record<string, number> = {
    "sunday": 0, "domingo": 0,
    "monday": 1, "lunes": 1,
    "tuesday": 2, "martes": 2,
    "wednesday": 3, "miércoles": 3, "miercoles": 3,
    "thursday": 4, "jueves": 4,
    "friday": 5, "viernes": 5,
    "saturday": 6, "sábado": 6, "sabado": 6,
  }

  // Expand recurring activities: one event per week occurrence in the current month/view
  const expandedEvents: Event[] = []

  activities.forEach((activity) => {
    const base = mapActivityToEvent(activity)

    if (!activity.dias) {
      expandedEvents.push(base)
      return
    }

    // Parse recurring days — handles: "Tuesday", "Sábado", '["Sábado","Martes"]'
    let diasRaw = activity.dias
    let diasArray: string[] = []
    try {
      const parsed = JSON.parse(diasRaw)
      diasArray = Array.isArray(parsed) ? parsed : [String(parsed)]
    } catch {
      diasArray = [diasRaw]
    }
    const diasStr = diasArray.join(" ").toLowerCase()
    const recurringDays: number[] = []
    Object.entries(dayNameToIndex).forEach(([name, idx]) => {
      if (diasStr.includes(name)) {
        if (!recurringDays.includes(idx)) recurringDays.push(idx)
      }
    })

    if (recurringDays.length === 0) {
      expandedEvents.push(base)
      return
    }

    // Generate one occurrence per matching weekday in the current month ± 1
    const viewStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    const viewEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0)

    const baseHour = base.start.getHours()
    const baseMin = base.start.getMinutes()

    const cursor = new Date(viewStart)
    while (cursor <= viewEnd) {
      if (recurringDays.includes(cursor.getDay())) {
        const occStart = new Date(cursor)
        occStart.setHours(baseHour, baseMin, 0, 0)
        const occEnd = new Date(occStart)
        occEnd.setHours(occStart.getHours() + 1)
        expandedEvents.push({
          ...base,
          id: `${base.id}-${cursor.toISOString().slice(0, 10)}`,
          start: occStart,
          end: occEnd,
        })
      }
      cursor.setDate(cursor.getDate() + 1)
    }
  })

  const filteredEvents = expandedEvents

  // Generar horas para la vista
  useEffect(() => {
    const hoursArray = []
    for (let i = 8; i <= 22; i++) {
      hoursArray.push(`${i}:00`)
    }
    setHours(hoursArray)
  }, [])

  // Calcular la altura del calendario
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setCalendarHeight(containerRef.current.clientHeight)
      }
    }

    updateHeight()
    window.addEventListener("resize", updateHeight)

    return () => {
      window.removeEventListener("resize", updateHeight)
    }
  }, [])

  // Generar los días del calendario según el tipo de vista
  useEffect(() => {
    try {
      const year = currentDate.getFullYear()
      const month = currentDate.getMonth()
      const date = currentDate.getDate()
      const days: Array<Date | null> = []

      if (viewType === "month") {
        // Primer día del mes
        const firstDay = new Date(year, month, 1)
        // Último día del mes
        const lastDay = new Date(year, month + 1, 0)

        // Día de la semana del primer día (0 = Domingo, 1 = Lunes, etc.)
        const firstDayOfWeek = firstDay.getDay()
        // Ajustar para que la semana comience en lunes (0 = Lunes, 6 = Domingo)
        const adjustedFirstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

        // Añadir días vacíos al principio
        for (let i = 0; i < adjustedFirstDayOfWeek; i++) {
          days.push(null)
        }

        // Añadir los días del mes
        for (let i = 1; i <= lastDay.getDate(); i++) {
          days.push(new Date(year, month, i))
        }

        // Completar la última semana con días vacíos si es necesario
        const remainingDays = 7 - (days.length % 7)
        if (remainingDays < 7) {
          for (let i = 0; i < remainingDays; i++) {
            days.push(null)
          }
        }
      } else if (viewType === "week") {
        // Obtener el día de la semana actual (0 = Domingo, 1 = Lunes, etc.)
        const dayOfWeek = currentDate.getDay()
        // Ajustar para que la semana comience en lunes (0 = Lunes, 6 = Domingo)
        const adjustedDayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1

        // Calcular el primer día de la semana (lunes)
        const firstDayOfWeek = new Date(year, month, date - adjustedDayOfWeek)

        // Añadir los 7 días de la semana
        for (let i = 0; i < 7; i++) {
          const day = new Date(firstDayOfWeek)
          day.setDate(firstDayOfWeek.getDate() + i)
          days.push(day)
        }
      } else if (viewType === "day") {
        // Solo añadir el día actual
        days.push(new Date(year, month, date))
      }

      setCalendarDays(days)
    } catch (error) {
      console.error("Error generating calendar days:", error)
      setCalendarDays([])
    }
  }, [currentDate, viewType])

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
    setIsDialogOpen(true)
  }

  const prevPeriod = () => {
    const newDate = new Date(currentDate)
    if (viewType === "month") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else if (viewType === "week") {
      newDate.setDate(newDate.getDate() - 7)
    } else if (viewType === "day") {
      newDate.setDate(newDate.getDate() - 1)
    }
    setCurrentDate(newDate)
  }

  const nextPeriod = () => {
    const newDate = new Date(currentDate)
    if (viewType === "month") {
      newDate.setMonth(newDate.getMonth() + 1)
    } else if (viewType === "week") {
      newDate.setDate(newDate.getDate() + 7)
    } else if (viewType === "day") {
      newDate.setDate(newDate.getDate() + 1)
    }
    setCurrentDate(newDate)
  }

  // Obtener eventos para un día y hora específicos
  const getEventsForDayAndHour = (day: Date | null, hour: string) => {
    if (!day) return []
    const hourNum = Number.parseInt(hour.split(":")[0])
    return filteredEvents.filter(
      (event) =>
        event.start.getDate() === day.getDate() &&
        event.start.getMonth() === day.getMonth() &&
        event.start.getFullYear() === day.getFullYear() &&
        event.start.getHours() <= hourNum &&
        event.end.getHours() > hourNum,
    )
  }

  // Calcular columnas para eventos superpuestos (basado en tiempo real, no solo hora)
  const getEventColumns = (events: Event[]) => {
    if (events.length <= 1) return events.map((_, i) => ({ event: events[i], col: 0, cols: 1 }))

    // Detectar colisiones de tiempo real
    const eventWithCol: Array<{ event: Event; col: number }> = []
    for (const event of events) {
      let assignedCol = 0
      for (const placed of eventWithCol) {
        // Verificar si se superponen: event.start < placed.event.end AND event.end > placed.event.start
        if (event.start < placed.event.end && event.end > placed.event.start) {
          assignedCol = Math.max(assignedCol, placed.col + 1)
        }
      }
      eventWithCol.push({ event, col: assignedCol })
    }

    const maxCol = Math.max(...eventWithCol.map((x) => x.col), 0)
    const totalCols = maxCol + 1

    return eventWithCol.map((x) => ({ event: x.event, col: x.col, cols: totalCols }))
  }

  // Calcular altura dinámica de celda basada en número de eventos superpuestos
  const getEventCellHeight = (overlapCount: number, isWeekView: boolean): number => {
    const baseHeight = isWeekView ? 60 : 80
    if (overlapCount <= 1) return baseHeight
    if (overlapCount <= 3) return Math.round(baseHeight * 1.5)
    if (overlapCount <= 5) return Math.round(baseHeight * 2)
    return Math.round(baseHeight * 2.5)
  }

  // Formatear el período actual según el tipo de vista
  const formatCurrentPeriod = () => {
    if (viewType === "month") {
      return currentDate.toLocaleDateString("es-ES", { month: "long", year: "numeric" })
    } else if (viewType === "week") {
      const firstDay = calendarDays[0]
      const lastDay = calendarDays[calendarDays.length - 1]
      if (firstDay && lastDay) {
        const firstMonth = firstDay.toLocaleDateString("es-ES", { month: "long" })
        const lastMonth = lastDay.toLocaleDateString("es-ES", { month: "long" })
        return `${firstDay.getDate()} ${firstMonth === lastMonth ? "al" : `${firstMonth} al`} ${lastDay.getDate()} de ${lastDay.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}`
      }
      return ""
    } else if (viewType === "day") {
      return currentDate.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    }
    return ""
  }

  // Nombres de los días de la semana
  const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

  // Renderizado de la vista de calendario
  const renderCalendarView = () => {
    if (viewType === "month") {
      // Calcular la altura de cada celda del día
      const numRows = Math.ceil(calendarDays.length / 7)
      const cellHeight = `${(calendarHeight - 60) / numRows}px`

      return (
        <div className="grid grid-cols-7 gap-1.5 h-full">
          {/* Días de la semana */}
          {weekDays.map((day, index) => (
            <div key={`header-${index}`} className="text-center font-medium text-base py-2 capitalize">
              {day}
            </div>
          ))}

          {/* Días del mes */}
          {calendarDays.map((day, index) => {
            const dayEvents = day
              ? filteredEvents.filter(
                  (event) =>
                    event.start.getDate() === day.getDate() &&
                    event.start.getMonth() === day.getMonth() &&
                    event.start.getFullYear() === day.getFullYear(),
                )
              : []

            const isToday =
              day &&
              day.getDate() === new Date().getDate() &&
              day.getMonth() === new Date().getMonth() &&
              day.getFullYear() === new Date().getFullYear()

            return (
              <div
                key={`day-${index}`}
                className={`rounded-lg p-2.5 overflow-auto ${
                  !day
                    ? "bg-slate-100 dark:bg-slate-950"
                    : isToday
                      ? "bg-purple-50 dark:bg-purple-950/20"
                      : "bg-slate-50 dark:bg-slate-900"
                }`}
                style={{ height: cellHeight }}
              >
                {day && (
                  <div className="h-full flex flex-col">
                    <div className="flex justify-end mb-1.5">
                      <span className={`text-base font-semibold ${isToday ? "text-primary" : "text-foreground"}`}>
                        {day.getDate().toString().padStart(2, "0")}
                      </span>
                    </div>
                    <div className="space-y-1.5 flex-1 overflow-auto">
                      {dayEvents.map((event) => (
                        <div
                          key={event.id}
                          onClick={() => handleEventClick(event)}
                          className="rounded-md p-2.5 pb-3.5 cursor-pointer hover:opacity-80 transition-colors bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                          style={{ borderLeft: `3px solid ${event.color}` }}
                        >
                          <div className="uppercase font-normal text-sm leading-snug break-words">{event.title}</div>
                          <div className="text-xs text-muted-foreground mt-2.5">
                            {event.start.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )
    } else if (viewType === "week") {
      return (
        <div className="flex flex-col h-full">
          {/* Cabecera de días */}
          <div className="grid grid-cols-[52px_repeat(7,1fr)] gap-0">
            <div className="py-3"></div>
            {calendarDays.map((day, index) => (
              <div
                key={`header-${index}`}
                className={`text-center font-medium text-base py-3 ${
                  index % 2 === 0
                    ? "bg-slate-50 dark:bg-slate-950"
                    : "bg-slate-100 dark:bg-slate-900"
                }`}
              >
                <span className="capitalize">{weekDays[index]}</span>
                {day && <span className="ml-1.5">{day.getDate().toString().padStart(2, "0")}</span>}
              </div>
            ))}
          </div>

          {/* Horas y eventos */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-[52px_repeat(7,1fr)] gap-0">
              {hours.map((hour, hourIndex) => (
                <React.Fragment key={`hour-${hourIndex}`}>
                  <div className="text-right pr-2 text-xs text-muted-foreground py-3">{hour}</div>
                  {calendarDays.map((day, dayIndex) => {
                    const hourEvents = getEventsForDayAndHour(day, hour).sort(
                      (a, b) => a.start.getTime() - b.start.getTime(),
                    )

                    return (
                      <div
                        key={`cell-${dayIndex}-${hourIndex}`}
                        className={`p-2 flex flex-col gap-2 min-h-[64px] ${
                          dayIndex % 2 === 0
                            ? "bg-slate-50 dark:bg-slate-950"
                            : "bg-slate-100 dark:bg-slate-900"
                        }`}
                      >
                        {hourEvents.map((event) => (
                          <div
                            key={`event-${event.id}-${hourIndex}`}
                            role="button"
                            tabIndex={0}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEventClick(event)
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault()
                                handleEventClick(event)
                              }
                            }}
                            className="cursor-pointer hover:opacity-80 transition-colors rounded-md p-3 pb-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                            style={{ borderLeft: `3px solid ${event.color}` }}
                            title={event.title}
                          >
                            <div className="uppercase font-normal text-base leading-snug break-words">
                              {event.title}
                            </div>
                            <div className="text-sm text-muted-foreground mt-3">
                              {event.start.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })} -{" "}
                              {event.end.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )
    } else if (viewType === "day") {
      return (
        <div className="flex flex-col h-full">
          {/* Horas y eventos */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 gap-1">
              {hours.map((hour, hourIndex) => {
                const hourEvents = (calendarDays[0] ? getEventsForDayAndHour(calendarDays[0], hour) : []).sort(
                  (a, b) => a.start.getTime() - b.start.getTime(),
                )

                return (
                  <div key={`hour-${hourIndex}`} className="grid grid-cols-[52px_1fr] gap-2">
                    <div className="text-right pr-2 text-xs text-muted-foreground py-3">{hour}</div>
                    <div
                      className="rounded-md p-2 flex flex-col gap-2 min-h-[64px] bg-slate-50 dark:bg-slate-950"
                    >
                      {hourEvents.map((event) => (
                        <div
                          key={`event-${event.id}-${hourIndex}`}
                          role="button"
                          tabIndex={0}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEventClick(event)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault()
                              handleEventClick(event)
                            }
                          }}
                          className="rounded-md cursor-pointer hover:opacity-80 transition-colors p-4 pb-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                          style={{ borderLeft: `4px solid ${event.color}` }}
                          title={event.title}
                        >
                          <div className="uppercase font-normal text-xl leading-snug break-words">{event.title}</div>
                          {event.instructor && event.instructor !== "Sin facilitador" && (
                            <div className="text-base text-muted-foreground mt-1">{event.instructor}</div>
                          )}
                          <div className="text-base text-muted-foreground mt-4">
                            {event.start.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })} -{" "}
                            {event.end.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div className="flex flex-col gap-4 p-4 h-[95vh]" ref={containerRef}>
      {/* Controles: Período + Vista + Búsqueda - Todo en una línea */}
      <div className="flex items-center gap-4">
        {/* Navegación de período */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={prevPeriod}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-medium capitalize min-w-[200px] text-center">{formatCurrentPeriod()}</h2>
          <Button variant="outline" size="sm" onClick={nextPeriod}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Separador visual */}
        <div className="flex-1"></div>

        {/* Selector de vista */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Vista:</span>
          <Select value={viewType} onValueChange={(value) => setViewType(value as CalendarViewType)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Semana" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Mes</SelectItem>
              <SelectItem value="week">Semana</SelectItem>
              <SelectItem value="day">Día</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Búsqueda */}
        <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="flex-shrink-0">
              <Search className="h-4 w-4" />
              <span className="sr-only">Buscar</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setIsSearchOpen(false)
              }}
              className="flex items-center p-2"
            >
              <Input
                type="text"
                placeholder="Buscar actividades..."
                value={internalSearchQuery}
                onChange={(e) => {
                  setInternalSearchQuery(e.target.value)
                  onSearchChange?.(e.target.value)
                }}
                className="flex-1"
              />
              <Button type="submit" size="sm" className="ml-2">
                Buscar
              </Button>
            </form>
          </PopoverContent>
        </Popover>

        {/* Botones de vista (Calendario/Lista) */}
        {onViewChange && (
          <div className="flex gap-0 bg-muted rounded-lg p-1 flex-shrink-0">
            <Button
              variant={currentView === "calendar" ? "default" : "ghost"}
              size="icon"
              onClick={() => onViewChange("calendar")}
              aria-label="Calendario"
              title="Calendario"
              className="rounded-md"
            >
              <Calendar className="h-4 w-4" />
            </Button>
            <Button
              variant={currentView === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => onViewChange("list")}
              aria-label="Lista"
              title="Lista"
              className="rounded-md"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Calendario */}
      <div className="flex-1 min-h-0">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Cargando calendario...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-2 text-center max-w-sm">
                <AlertCircle className="h-8 w-8 text-destructive" />
                <p className="text-sm font-medium">Error al cargar actividades</p>
                <p className="text-xs text-muted-foreground">{error}</p>
                <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="mt-2">
                  Reintentar
                </Button>
              </div>
            </div>
          ) : (
            renderCalendarView()
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
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
