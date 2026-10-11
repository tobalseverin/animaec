"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import SiteHeader from "@/components/site-header"
import ActionButtons from "@/components/action-buttons"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface Espacio {
  id: string
  nombre: string
  descripcion: string
  capacidad: string
  equipamiento: string[]
  color: string
  imagen: string
  galeria: string[]
}

export default function EspaciosPage() {
  const [selectedEspacio, setSelectedEspacio] = useState<Espacio | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const espacios: Espacio[] = [
    {
      id: "salon1",
      nombre: "Salón 1",
      descripcion: "Espacio amplio ideal para talleres prácticos y actividades que requieren movimiento.",
      capacidad: "25 personas",
      equipamiento: ["Mesas de trabajo", "Sillas", "Pizarra", "Proyector"],
      color: "hsl(340, 82%, 52%)",
      imagen: "/placeholder.svg?height=400&width=600&query=salon+cultural+amplio",
      galeria: [
        "/placeholder.svg?height=400&width=600&query=salon+cultural+mesas+trabajo",
        "/placeholder.svg?height=400&width=600&query=salon+cultural+personas+creando",
        "/placeholder.svg?height=400&width=600&query=salon+cultural+exposicion",
      ],
    },
    {
      id: "salon2",
      nombre: "Salón 2",
      descripcion: "Sala con buena iluminación natural, perfecta para clases teóricas y presentaciones.",
      capacidad: "20 personas",
      equipamiento: ["Mesas", "Sillas", "Pizarra", "Sistema de sonido"],
      color: "hsl(210, 100%, 56%)",
      imagen: "/placeholder.svg?height=400&width=600&query=salon+cultural+iluminado",
      galeria: [
        "/placeholder.svg?height=400&width=600&query=salon+cultural+luminoso",
        "/placeholder.svg?height=400&width=600&query=salon+cultural+reunion",
        "/placeholder.svg?height=400&width=600&query=salon+cultural+presentacion",
      ],
    },
    {
      id: "salon3",
      nombre: "Salón 3",
      descripcion: "Espacio versátil para actividades corporales, danza y expresión corporal.",
      capacidad: "15 personas",
      equipamiento: ["Suelo de madera", "Espejos", "Equipo de sonido", "Colchonetas"],
      color: "hsl(130, 61%, 54%)",
      imagen: "/placeholder.svg?height=400&width=600&query=salon+danza+espejos",
      galeria: [
        "/placeholder.svg?height=400&width=600&query=estudio+danza+espejos",
        "/placeholder.svg?height=400&width=600&query=salon+madera+cultural",
        "/placeholder.svg?height=400&width=600&query=salon+movimiento+danza",
      ],
    },
    {
      id: "salon4",
      nombre: "Salón 4",
      descripcion: "Sala equipada para actividades audiovisuales, proyecciones y charlas.",
      capacidad: "30 personas",
      equipamiento: ["Sillas", "Proyector HD", "Sistema de sonido", "Pantalla"],
      color: "hsl(43, 96%, 58%)",
      imagen: "/placeholder.svg?height=400&width=600&query=salon+audiovisual+proyector",
      galeria: [
        "/placeholder.svg?height=400&width=600&query=salon+proyeccion+cultural",
        "/placeholder.svg?height=400&width=600&query=salon+charla+debate",
        "/placeholder.svg?height=400&width=600&query=salon+conferencia+cultural",
      ],
    },
    {
      id: "salon5",
      nombre: "Salón 5",
      descripcion: "Espacio íntimo para reuniones, grupos pequeños y actividades que requieren concentración.",
      capacidad: "12 personas",
      equipamiento: ["Mesa de reuniones", "Sillas", "Pizarra", "Conexión a internet"],
      color: "hsl(280, 100%, 70%)",
      imagen: "/placeholder.svg?height=400&width=600&query=salon+intimo+reunion",
      galeria: [
        "/placeholder.svg?height=400&width=600&query=salon+acogedor+reunion",
        "/placeholder.svg?height=400&width=600&query=salon+intimo+cultural",
        "/placeholder.svg?height=400&width=600&query=espacio+trabajo+concentracion",
      ],
    },
    {
      id: "casa",
      nombre: "Casa",
      descripcion: "Espacio común que incluye cocina, comedor y áreas de descanso para residentes y visitantes.",
      capacidad: "Uso común",
      equipamiento: ["Cocina equipada", "Comedor", "Sala de estar", "Biblioteca"],
      color: "hsl(24, 100%, 62%)",
      imagen: "/placeholder.svg?height=400&width=600&query=casa+cultural+comunitaria",
      galeria: [
        "/placeholder.svg?height=400&width=600&query=cocina+comunitaria+cultural",
        "/placeholder.svg?height=400&width=600&query=comedor+casa+cultural",
        "/placeholder.svg?height=400&width=600&query=biblioteca+casa+cultural",
      ],
    },
  ]

  const handleEspacioClick = (espacio: Espacio) => {
    setSelectedEspacio(espacio)
    setCurrentImageIndex(0)
    setIsModalOpen(true)
  }

  const nextImage = () => {
    if (!selectedEspacio) return
    setCurrentImageIndex((prev) => (prev + 1) % selectedEspacio.galeria.length)
  }

  const prevImage = () => {
    if (!selectedEspacio) return
    setCurrentImageIndex((prev) => (prev - 1 + selectedEspacio.galeria.length) % selectedEspacio.galeria.length)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div className="px-4 py-4">
        <SiteHeader showLogo={true} backUrl="/explorar" />
      </div>

      <div className="px-16 flex-1 flex flex-col">
        {/* Barra de "Explora" */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="text-3xl font-light mb-2">Nuestros Espacios</h1>
            <p className="text-xl text-muted-foreground">
              Conoce los diferentes salones y áreas disponibles en Ánima Espacio Cultural
            </p>
          </div>
          {/* Toggle Actividades | Espacios */}
          <div className="flex gap-0 bg-muted rounded-lg p-1">
            <Button
              variant="ghost"
              asChild
              className="rounded-md px-6 py-2 text-base font-medium"
            >
              <Link href="/explorar">Actividades</Link>
            </Button>
            <Button
              variant="default"
              className="rounded-md px-6 py-2 text-base font-medium"
            >
              Espacios
            </Button>
          </div>
        </div>

        {/* Botón 3D */}
        <div className="flex justify-center mb-6">
          <Button asChild>
            <Link href="/3d-viewer">Modelo 3D</Link>
          </Button>
        </div>

        <div className="flex-1 grid grid-cols-3 gap-6 mb-8">
          {espacios.map((espacio) => (
            <Card
              key={espacio.id}
              className="overflow-hidden cursor-pointer transition-all hover:shadow-md hover:border-primary/50 flex flex-col"
              onClick={() => handleEspacioClick(espacio)}
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={espacio.imagen || "/placeholder.svg"}
                  alt={espacio.nombre}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center p-4">
                <CardHeader className="p-0 mb-3 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CardTitle>{espacio.nombre}</CardTitle>
                    <Badge style={{ backgroundColor: espacio.color }}>{espacio.nombre}</Badge>
                  </div>
                  <CardDescription className="text-center">Capacidad: {espacio.capacidad}</CardDescription>
                </CardHeader>
                <CardContent className="p-0 text-center">
                  <p className="mb-3 text-sm">{espacio.descripcion}</p>
                  <div className="flex justify-center">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Equipamiento:</h4>
                      <ul className="list-disc list-inside text-xs text-muted-foreground">
                        {espacio.equipamiento.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal con galería de imágenes */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-3xl p-0">
          {selectedEspacio && (
            <div className="relative">
              <div className="absolute top-2 right-2 z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="relative aspect-video">
                <img
                  src={selectedEspacio.galeria[currentImageIndex] || "/placeholder.svg"}
                  alt={`${selectedEspacio.nombre} - Imagen ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-background/50 backdrop-blur-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-background/50 backdrop-blur-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-light flex items-center gap-2 mb-2">
                  <Badge style={{ backgroundColor: selectedEspacio.color }}>{selectedEspacio.nombre}</Badge>
                  {selectedEspacio.nombre}
                </h2>
                <p className="text-muted-foreground mb-4">Capacidad: {selectedEspacio.capacidad}</p>
                <p className="mb-4">{selectedEspacio.descripcion}</p>

                <div>
                  <h3 className="text-lg font-medium mb-2">Equipamiento:</h3>
                  <ul className="list-disc list-inside text-muted-foreground grid grid-cols-2 gap-x-4">
                    {selectedEspacio.equipamiento.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex justify-center gap-2">
                  {selectedEspacio.galeria.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentImageIndex(index)
                      }}
                      className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-primary" : "bg-muted"}`}
                      aria-label={`Ver imagen ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Botones de acción */}
      <ActionButtons />
    </main>
  )
}
