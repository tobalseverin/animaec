"use client"

import type React from "react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, ChevronUp, CreditCard } from "lucide-react"

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
  secondaryColor?: string
  image: string
  prices: {
    singleClass: number
    monthly: number
    halfYear: number
  }
}

export default function ListView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSalon, setSelectedSalon] = useState<string>("todos")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<"singleClass" | "monthly" | "halfYear">("singleClass")

  // Crear fechas de manera segura
  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)
  const dayAfterTomorrow = new Date()
  dayAfterTomorrow.setDate(today.getDate() + 2)

  // Crear horas específicas para cada evento
  const createEventTime = (baseDate: Date, hours: number, minutes = 0) => {
    const date = new Date(baseDate)
    date.setHours(hours, minutes, 0, 0)
    return date
  }

  // Datos simplificados con imágenes más relevantes y colores del logo
  const events: Event[] = [
    // Evento 1 (Taller de Cerámica)
    {
      id: "1",
      title: "Taller de Cerámica",
      start: createEventTime(today, 10),
      end: createEventTime(today, 12),
      salon: "Salón 1",
      instructor: "María González",
      description:
        "Aprende técnicas básicas de cerámica y crea tus propias piezas. Ideal para principiantes y personas con experiencia que deseen perfeccionar su técnica.",
      color: logoColors.salon1,
      secondaryColor: "#B85446", // Versión más oscura del terracota
      image: "/pottery-studio-in-progress.png",
      prices: {
        singleClass: 800,
        monthly: 2800,
        halfYear: 15000,
      },
    },
    // Evento 2 (Clase de Pintura)
    {
      id: "2",
      title: "Clase de Pintura",
      start: createEventTime(today, 14),
      end: createEventTime(today, 16),
      salon: "Salón 2",
      instructor: "Carlos Rodríguez",
      description:
        "Explora diferentes técnicas de pintura y desarrolla tu estilo propio. Trabajaremos con acrílicos y acuarelas en diversos soportes.",
      color: logoColors.salon2,
      secondaryColor: "#4A6273", // Versión más oscura del azul grisáceo
      image: "/abstract-acrylic-flow.png",
      prices: {
        singleClass: 750,
        monthly: 2600,
        halfYear: 14000,
      },
    },
    // Evento 3 (Yoga)
    {
      id: "3",
      title: "Yoga",
      start: createEventTime(tomorrow, 9),
      end: createEventTime(tomorrow, 10, 30),
      salon: "Salón 3",
      instructor: "Laura Martínez",
      description:
        "Sesión de yoga para todos los niveles. Enfocada en la respiración, flexibilidad y fortalecimiento del cuerpo y la mente.",
      color: logoColors.salon3,
      secondaryColor: "#64723B", // Versión más oscura del verde oliva
      image: "/serene-yoga-meditation.png",
      prices: {
        singleClass: 600,
        monthly: 2200,
        halfYear: 12000,
      },
    },
    // Evento 4 (Taller de Fotografía)
    {
      id: "4",
      title: "Taller de Fotografía",
      start: createEventTime(tomorrow, 16),
      end: createEventTime(tomorrow, 18),
      salon: "Salón 4",
      instructor: "Juan Pérez",
      description:
        "Aprende los fundamentos de la fotografía y mejora tus habilidades. Traer cámara propia (DSLR o mirrorless) o smartphone con buena cámara.",
      color: logoColors.salon4,
      secondaryColor: "#A3813A", // Versión más oscura del mostaza oscuro
      image: "/camera-lens-close-up.png",
      prices: {
        singleClass: 900,
        monthly: 3200,
        halfYear: 17000,
      },
    },
    // Evento 5 (Concierto Acústico)
    {
      id: "5",
      title: "Concierto Acústico",
      start: createEventTime(dayAfterTomorrow, 19),
      end: createEventTime(dayAfterTomorrow, 21),
      salon: "Salón 5",
      instructor: "Banda Local",
      description:
        "Disfruta de un concierto acústico con artistas locales. Música original y versiones de clásicos en un ambiente íntimo y acogedor.",
      color: logoColors.salon5,
      secondaryColor: "#5F3D4D", // Versión más oscura del berenjena
      image: "/intimate-acoustic-night.png",
      prices: {
        singleClass: 500,
        monthly: 0,
        halfYear: 0,
      },
    },
    // Evento 6 (Exposición de Arte)
    {
      id: "6",
      title: "Exposición de Arte",
      start: createEventTime(dayAfterTomorrow, 11),
      end: createEventTime(dayAfterTomorrow, 20),
      salon: "Casa",
      instructor: "Varios Artistas",
      description:
        "Exposición de obras de artistas residentes y locales. Pinturas, esculturas y fotografías que exploran temas contemporáneos.",
      color: logoColors.casa,
      secondaryColor: "#915430", // Versión más oscura del arcilla
      image: "/art-gallery-opening.png",
      prices: {
        singleClass: 300,
        monthly: 0,
        halfYear: 0,
      },
    },
  ]

  // Filtrar eventos según la búsqueda y el salón seleccionado
  const filteredEvents = events.filter(
    (event) =>
      (selectedSalon === "todos" || event.salon === selectedSalon) &&
      (event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearchOpen(false)
  }

  // Formatear fecha para mostrar
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
    setShowRegistrationForm(false)
  }

  const formatPrice = (price: number) => {
    try {
      return new Intl.NumberFormat("es-UY", { style: "currency", currency: "UYU" }).format(price)
    } catch (error) {
      console.error("Error formatting price:", error)
      return `${price}`
    }
  }

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para procesar el pago
    alert(`Inscripción procesada para ${selectedEvent?.title}. Plan: ${selectedPlan}`)
    setIsDialogOpen(false)
    setShowRegistrationForm(false)
  }

  return (
    <div className="space-y-0 p-4">
      <div className="space-y-0">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <div key={event.id}>
              <div
                className="border-0 rounded-lg p-4 hover:bg-white/5 transition-colors bg-card cursor-pointer"
                onClick={() => handleEventClick(event)}
              >
                <div className="flex flex-row gap-6">
                  {/* Columna izquierda - Avatar sin efecto dual tone */}
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full overflow-hidden relative">
                      {/* Imagen sin efectos */}
                      <img
                        src={event.image || "/placeholder.svg?height=200&width=200"}
                        alt={event.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Columna central - Título y persona */}
                  <div className="flex-1">
                    <h3 className="activity-title">{event.title}</h3>
                    <p className="instructor-name text-sm font-medium uppercase tracking-wide">{event.instructor}</p>
                    <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
                    <div className="mt-2">
                      <span className="text-sm font-medium">{formatPrice(event.prices.singleClass)} por clase</span>
                      {event.prices.monthly > 0 && (
                        <span className="text-sm font-medium ml-4">{formatPrice(event.prices.monthly)} mensual</span>
                      )}
                    </div>
                  </div>

                  {/* Columna derecha - Fecha y hora */}
                  <div className="flex flex-col min-w-[150px] items-end justify-center">
                    <Badge variant="outline" className="bg-white dark:bg-background text-foreground px-3 py-1 mb-2">
                      {formatDate(event.start)}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {event.start.toLocaleTimeString("es-ES", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {" ~ "}
                        {event.end.toLocaleTimeString("es-ES", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: event.color }}
                        title={event.salon}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Línea separadora sutil entre eventos (excepto el último) */}
              {index < filteredEvents.length - 1 && <div className="h-px w-full bg-white/10 my-2"></div>}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No se encontraron actividades con los filtros seleccionados.</p>
          </div>
        )}
      </div>

      {/* Event Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedEvent && (
          <DialogContent className="p-0 max-w-3xl overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              {/* Imagen sin efectos en el diálogo */}
              <img
                src={selectedEvent.image || "/placeholder.svg?height=400&width=600"}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />

              {/* Gradiente para texto */}
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

                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-2">Precios:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-3 text-center">
                      <p className="text-lg font-bold">{formatPrice(selectedEvent.prices.singleClass)}</p>
                      <p className="text-xs text-muted-foreground">Por clase</p>
                    </div>
                    {selectedEvent.prices.monthly > 0 && (
                      <div className="border rounded-md p-3 text-center">
                        <p className="text-lg font-bold">{formatPrice(selectedEvent.prices.monthly)}</p>
                        <p className="text-xs text-muted-foreground">Mensual</p>
                      </div>
                    )}
                    {selectedEvent.prices.halfYear > 0 && (
                      <div className="border rounded-md p-3 text-center">
                        <p className="text-lg font-bold">{formatPrice(selectedEvent.prices.halfYear)}</p>
                        <p className="text-xs text-muted-foreground">Semestral</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="w-full" onClick={() => setShowRegistrationForm(!showRegistrationForm)}>
                    {showRegistrationForm ? (
                      <>
                        <ChevronUp className="mr-2 h-4 w-4" />
                        Ocultar formulario de inscripción
                      </>
                    ) : (
                      <>
                        <ChevronDown className="mr-2 h-4 w-4" />
                        Inscribirme en este taller
                      </>
                    )}
                  </Button>
                </div>

                {showRegistrationForm && (
                  <div className="pt-4 border-t mt-4">
                    <h3 className="text-lg font-medium mb-4">Formulario de inscripción</h3>
                    <form onSubmit={handleRegistration} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Nombre completo</Label>
                        <Input id="fullName" placeholder="Tu nombre completo" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input id="email" type="email" placeholder="tu@email.com" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input id="phone" placeholder="+598 XX XXX XXX" required />
                      </div>

                      <div className="space-y-2">
                        <Label>Plan de inscripción</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="singleClass"
                              checked={selectedPlan === "singleClass"}
                              onCheckedChange={() => setSelectedPlan("singleClass")}
                            />
                            <Label htmlFor="singleClass" className="text-sm">
                              Por clase ({formatPrice(selectedEvent.prices.singleClass)})
                            </Label>
                          </div>

                          {selectedEvent.prices.monthly > 0 && (
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="monthly"
                                checked={selectedPlan === "monthly"}
                                onCheckedChange={() => setSelectedPlan("monthly")}
                              />
                              <Label htmlFor="monthly" className="text-sm">
                                Mensual ({formatPrice(selectedEvent.prices.monthly)})
                              </Label>
                            </div>
                          )}

                          {selectedEvent.prices.halfYear > 0 && (
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="halfYear"
                                checked={selectedPlan === "halfYear"}
                                onCheckedChange={() => setSelectedPlan("halfYear")}
                              />
                              <Label htmlFor="halfYear" className="text-sm">
                                Semestral ({formatPrice(selectedEvent.prices.halfYear)})
                              </Label>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="comments">Comentarios adicionales</Label>
                        <Input id="comments" placeholder="Información adicional que debamos saber" />
                      </div>

                      <Button type="submit" className="w-full">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Abonar{" "}
                        {selectedPlan === "singleClass"
                          ? formatPrice(selectedEvent.prices.singleClass)
                          : selectedPlan === "monthly"
                            ? formatPrice(selectedEvent.prices.monthly)
                            : formatPrice(selectedEvent.prices.halfYear)}
                      </Button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
