"use client"

import React, { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"

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

export default function CalendarView() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedSalon, setSelectedSalon] = useState<string>("todos")
  const [calendarDays, setCalendarDays] = useState<Array<Date | null>>([])
  const [viewType, setViewType] = useState<CalendarViewType>("week")
  const [hours, setHours] = useState<string[]>([])
  const [calendarHeight, setCalendarHeight] = useState(0)

  // Referencia para medir la altura del contenedor
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Datos de ejemplo - Usando el mes actual para evitar problemas con fechas pasadas
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  const events: Event[] = [
    {
      id: "1",
      title: "Taller de Cerámica",
      start: new Date(currentYear, currentMonth, 5, 10, 0),
      end: new Date(currentYear, currentMonth, 5, 12, 0),
      salon: "Salón 1",
      instructor: "María González",
      description: "Aprende técnicas básicas de cerámica y crea tus propias piezas.",
      color: "hsl(340, 82%, 52%)",
      image: "https://images.unsplash.com/photo-1565373677928-80b631bc3760?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: "2",
      title: "Clase de Pintura",
      start: new Date(currentYear, currentMonth, 8, 14, 0),
      end: new Date(currentYear, currentMonth, 8, 16, 0),
      salon: "Salón 2",
      instructor: "Carlos Rodríguez",
      description: "Explora diferentes técnicas de pintura y desarrolla tu estilo propio.",
      color: "hsl(210, 100%, 56%)",
      image: "https://images.unsplash.com/photo-1579762593175-20226054cad0?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: "3",
      title: "Yoga",
      start: new Date(currentYear, currentMonth, 12, 9, 0),
      end: new Date(currentYear, currentMonth, 12, 10, 30),
      salon: "Salón 3",
      instructor: "Laura Martínez",
      description: "Sesión de yoga para todos los niveles.",
      color: "hsl(130, 61%, 54%)",
      image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: "4",
      title: "Taller de Fotografía",
      start: new Date(currentYear, currentMonth, 15, 16, 0),
      end: new Date(currentYear, currentMonth, 15, 18, 0),
      salon: "Salón 4",
      instructor: "Juan Pérez",
      description: "Aprende los fundamentos de la fotografía y mejora tus habilidades.",
      color: "hsl(43, 96%, 58%)",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: "5",
      title: "Concierto Acústico",
      start: new Date(currentYear, currentMonth, 18, 19, 0),
      end: new Date(currentYear, currentMonth, 18, 21, 0),
      salon: "Salón 5",
      instructor: "Banda Local",
      description: "Disfruta de un concierto acústico con artistas locales.",
      color: "hsl(280, 100%, 70%)",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: "6",
      title: "Exposición de Arte",
      start: new Date(currentYear, currentMonth, 22, 11, 0),
      end: new Date(currentYear, currentMonth, 22, 20, 0),
      salon: "Casa",
      instructor: "Varios Artistas",
      description: "Exposición de obras de artistas residentes y locales.",
      color: "hsl(24, 100%, 62%)",
      image: "https://images.unsplash.com/photo-1531913764164-f85c52d7e6a9?q=80&w=300&auto=format&fit=crop",
    },
  ]

  // Filtrar eventos según el salón seleccionado
  const filteredEvents = selectedSalon === "todos" ? events : events.filter((event) => event.salon === selectedSalon)

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
        <div className="grid grid-cols-7 gap-1">
          {/* Días de la semana */}
          {weekDays.map((day, index) => (
            <div key={`header-${index}`} className="text-center font-medium text-sm py-2">
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
                className={`border rounded-md p-1 overflow-auto ${
                  !day ? "bg-muted/20" : isToday ? "border-primary/50 bg-primary/5" : "hover:border-primary/30"
                }`}
                style={{ height: cellHeight }}
              >
                {day && (
                  <div className="h-full flex flex-col">
                    <div className="flex justify-end mb-1">
                      <Badge variant="outline" className="bg-white dark:bg-background text-foreground">
                        {day.getDate()}
                      </Badge>
                    </div>
                    <div className="space-y-1 flex-1 overflow-auto">
                      {dayEvents.map((event) => (
                        <div
                          key={event.id}
                          onClick={() => handleEventClick(event)}
                          className="text-xs p-1 rounded cursor-pointer truncate relative"
                          style={{
                            backgroundImage: `url(${event.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundColor: `${event.color}20`,
                            borderLeft: `3px solid ${event.color}`,
                          }}
                        >
                          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
                          <div className="relative z-10">
                            <div className="font-medium truncate">{event.title}</div>
                            <div className="text-[10px] truncate">
                              {event.start.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
                              <div
                                className="inline-block ml-1 w-2 h-2 rounded-full"
                                style={{ backgroundColor: event.color }}
                              ></div>
                            </div>
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
          <div className="grid grid-cols-8 gap-1 mb-2">
            <div className="text-center font-medium text-sm py-2"></div>
            {calendarDays.map((day, index) => (
              <div key={`header-${index}`} className="text-center font-medium text-sm py-2">
                <div>{weekDays[index]}</div>
                {day && (
                  <Badge variant="outline" className="bg-white dark:bg-background text-foreground mt-1">
                    {day.getDate()}
                  </Badge>
                )}
              </div>
            ))}
          </div>

          {/* Horas y eventos */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-8 gap-1">
              {hours.map((hour, hourIndex) => (
                <React.Fragment key={`hour-${hourIndex}`}>
                  <div className="text-right pr-2 text-sm text-muted-foreground py-2">{hour}</div>
                  {calendarDays.map((day, dayIndex) => {
                    const hourEvents = getEventsForDayAndHour(day, hour)
                    const totalEvents = hourEvents.length

                    return (
                      <div key={`cell-${dayIndex}-${hourIndex}`} className="border rounded-md min-h-[60px] relative">
                        {hourEvents.map((event, eventIndex) => (
                          <div
                            key={`event-${event.id}-${hourIndex}`}
                            onClick={() => handleEventClick(event)}
                            className="absolute inset-0 p-1 rounded cursor-pointer overflow-hidden"
                            style={{
                              backgroundImage: `url(${event.image})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              height: totalEvents > 1 ? `${100 / totalEvents}%` : "100%",
                              top: totalEvents > 1 ? `${(eventIndex * 100) / totalEvents}%` : "0",
                            }}
                          >
                            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
                            <div
                              className="absolute left-0 top-0 bottom-0 w-1"
                              style={{ backgroundColor: event.color }}
                            ></div>
                            <div className="relative z-10 text-xs p-1">
                              <div className="font-medium truncate">{event.title}</div>
                              {hourIndex === Number.parseInt(hour.split(":")[0]) - 8 && (
                                <div className="text-[10px]">
                                  {event.start.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
                                </div>
                              )}
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
          {/* Cabecera del día */}
          <div className="text-center font-medium py-2 mb-2">
            {calendarDays[0] && (
              <Badge variant="outline" className="bg-white dark:bg-background text-foreground px-4 py-1 text-lg">
                {calendarDays[0].getDate()}
              </Badge>
            )}
          </div>

          {/* Horas y eventos */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 gap-1">
              {hours.map((hour, hourIndex) => {
                const hourEvents = calendarDays[0] ? getEventsForDayAndHour(calendarDays[0], hour) : []

                return (
                  <div key={`hour-${hourIndex}`} className="grid grid-cols-[80px_1fr] gap-2">
                    <div className="text-right pr-2 text-sm text-muted-foreground py-2">{hour}</div>
                    <div className="border rounded-md min-h-[80px] relative">
                      {hourEvents.map((event) => (
                        <div
                          key={`event-${event.id}-${hourIndex}`}
                          onClick={() => handleEventClick(event)}
                          className="absolute inset-0 p-2 rounded cursor-pointer"
                          style={{
                            backgroundImage: `url(${event.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
                          <div
                            className="absolute left-0 top-0 bottom-0 w-1"
                            style={{ backgroundColor: event.color }}
                          ></div>
                          <div className="relative z-10 p-2">
                            <div className="font-medium">{event.title}</div>
                            <div className="text-sm">
                              {event.start.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })} -
                              {event.end.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
                            </div>
                            <div className="text-sm mt-1">{event.instructor}</div>
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
    <div className="space-y-4 p-4 h-[90vh]" ref={containerRef}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={prevPeriod}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-medium capitalize">{formatCurrentPeriod()}</h2>
          <Button variant="outline" size="sm" onClick={nextPeriod}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Vista:</span>
            <Select value={viewType} onValueChange={(value) => setViewType(value as CalendarViewType)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Semana" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Mes</SelectItem>
                <SelectItem value="week">Semana</SelectItem>
                <SelectItem value="day">Día</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Calendario */}
      <Card className="h-[calc(90vh-100px)]">
        <CardContent className="p-4 h-full overflow-auto">{renderCalendarView()}</CardContent>
      </Card>

      {/* Event Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedEvent && (
          <DialogContent className="p-0 max-w-3xl overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              <img
                src={selectedEvent.image || "/placeholder.svg"}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <Badge style={{ backgroundColor: selectedEvent.color }} className="mb-2">
                  {selectedEvent.salon}
                </Badge>
                <h2 className="text-2xl font-light text-white">{selectedEvent.title}</h2>
                <p className="text-sm text-white/80">{selectedEvent.instructor}</p>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Fecha y hora:</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedEvent.start.toLocaleDateString("es-ES", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedEvent.start.toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {selectedEvent.end.toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-1">Descripción:</h3>
                  <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
