"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import SiteHeader from "@/components/site-header"
import ActionButtons from "@/components/action-buttons"

interface Llamado {
  id: string
  tipo: string
  titulo: string
  descripcion: string
  fechaApertura: string
  fechaCierre: string
  estado: "abierto" | "proximamente" | "cerrado"
  imagen: string
  icono: React.ReactNode
}

export default function LlamadosPage() {
  const [scrollY, setScrollY] = useState(0)

  // Efecto para controlar el scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const llamados: Llamado[] = [
    {
      id: "colaboracion-1",
      tipo: "colaboracion",
      titulo: "COLABORACIÓN PARA FESTIVAL DE ARTE URBANO",
      descripcion:
        "Buscamos artistas, gestores y voluntarios para colaborar en la organización y desarrollo del Festival de Arte Urbano que se realizará en junio de 2024.",
      fechaApertura: "15 de marzo, 2024",
      fechaCierre: "30 de abril, 2024",
      estado: "abierto",
      imagen: "/placeholder.svg?height=600&width=600&query=festival+arte+urbano+colaboracion",
      icono: <Users className="h-5 w-5 text-white" />,
    },
    // Otros llamados (omitidos por brevedad)
  ]

  const [filteredLlamados, setFilteredLlamados] = useState<Llamado[]>(llamados)
  const [activeFilter, setActiveFilter] = useState<string>("todos")

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    if (filter === "todos") {
      setFilteredLlamados(llamados)
    } else if (filter === "abiertos") {
      setFilteredLlamados(llamados.filter((llamado) => llamado.estado === "abierto"))
    } else {
      setFilteredLlamados(llamados.filter((llamado) => llamado.tipo === filter))
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Fondo animado */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/30 via-blue-900/20 to-transparent animate-pulse-slow"></div>
        <div
          className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/10 to-blue-500/20"
          style={{
            transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.01}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        ></div>
        <div className="absolute inset-0 backdrop-blur-[100px]"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 w-full">
        <div className="px-4 py-4">
          <SiteHeader backUrl="/crear" />
        </div>

        <div className="px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-light mb-4">LLAMADOS</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Consulta las convocatorias abiertas actualmente para colaborar, trabajar o participar en Ánima Espacio
              Cultural
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              variant={activeFilter === "todos" ? "default" : "outline"}
              onClick={() => handleFilterChange("todos")}
              className="min-w-[100px]"
            >
              Todos
            </Button>
            <Button
              variant={activeFilter === "abiertos" ? "default" : "outline"}
              onClick={() => handleFilterChange("abiertos")}
              className="min-w-[100px]"
            >
              Abiertos
            </Button>
            <Button
              variant={activeFilter === "colaboracion" ? "default" : "outline"}
              onClick={() => handleFilterChange("colaboracion")}
              className="min-w-[100px]"
            >
              Colaboración
            </Button>
            <Button
              variant={activeFilter === "pasantia" ? "default" : "outline"}
              onClick={() => handleFilterChange("pasantia")}
              className="min-w-[100px]"
            >
              Pasantía
            </Button>
            <Button
              variant={activeFilter === "trabajo" ? "default" : "outline"}
              onClick={() => handleFilterChange("trabajo")}
              className="min-w-[100px]"
            >
              Trabajo
            </Button>
            <Button
              variant={activeFilter === "asamblea" ? "default" : "outline"}
              onClick={() => handleFilterChange("asamblea")}
              className="min-w-[100px]"
            >
              Asamblea
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
            {filteredLlamados.map((llamado) => (
              <Card
                key={llamado.id}
                className="overflow-hidden bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-colors relative"
              >
                <div className="absolute inset-0 z-0">
                  <img
                    src={llamado.imagen || "/placeholder.svg"}
                    alt={llamado.titulo}
                    className="w-full h-full object-cover opacity-30"
                  />
                  <div className="absolute inset-0 bg-black/60"></div>
                </div>
                <CardHeader className="p-8 relative z-10">
                  <div className="flex justify-between items-start">
                    <Badge
                      className={`
                        ${
                          llamado.estado === "abierto"
                            ? "bg-green-500/80 hover:bg-green-500/70"
                            : llamado.estado === "proximamente"
                              ? "bg-yellow-500/80 hover:bg-yellow-500/70"
                              : "bg-gray-500/80 hover:bg-gray-500/70"
                        }
                      `}
                    >
                      {llamado.estado === "abierto"
                        ? "Abierto"
                        : llamado.estado === "proximamente"
                          ? "Próximamente"
                          : "Cerrado"}
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 flex items-center gap-1">
                      {llamado.icono}
                      {llamado.tipo.charAt(0).toUpperCase() + llamado.tipo.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    {llamado.icono}
                    <CardTitle className="text-xl font-light">{llamado.titulo}</CardTitle>
                  </div>
                  <CardDescription className="line-clamp-2 mt-2">{llamado.descripcion}</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0 relative z-10">
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>
                      <strong>Apertura:</strong> {llamado.fechaApertura}
                    </p>
                    <p>
                      <strong>Cierre:</strong> {llamado.fechaCierre}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="p-8 pt-0 relative z-10">
                  <Button className="w-full" disabled={llamado.estado === "cerrado"}>
                    {llamado.estado === "abierto"
                      ? "Postular ahora"
                      : llamado.estado === "proximamente"
                        ? "Más información"
                        : "Convocatoria cerrada"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <ActionButtons />
    </main>
  )
}
