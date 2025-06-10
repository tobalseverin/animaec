"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import SiteHeader from "@/components/site-header"
import ActionButtons from "@/components/action-buttons"

export default function CompartirPage() {
  const [activeTab, setActiveTab] = useState("residencias")
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
          <SiteHeader showLogo={true} />
        </div>

        <div className="px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-light mb-4">Compartir</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Descubre nuestras residencias artísticas, comunidad y proyectos colaborativos que hacen de Ánima un
              espacio cultural vivo y en constante evolución.
            </p>
          </motion.div>

          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-xl grid-cols-2">
                <TabsTrigger value="residencias" className="text-lg py-3">
                  Residencias de Arte
                </TabsTrigger>
                <TabsTrigger value="comunidad" className="text-lg py-3">
                  Comunidad
                </TabsTrigger>
              </TabsList>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="pb-24"
              >
                <TabsContent value="residencias" className="mt-6">
                  <ResidenciasContent />
                </TabsContent>

                <TabsContent value="comunidad" className="mt-6">
                  <ComunidadContent />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </div>
      </div>

      {/* Botones de acción */}
      <ActionButtons />
    </main>
  )
}

// Componentes de contenido implementados correctamente
function ResidenciasContent() {
  // Contenido existente...
  // (Mantengo el código existente para esta función)
  // Modificar los arrays de proyectos y testimonios para usar imágenes temporales generadas con placeholder.svg

  // En la función ResidenciasContent, actualizar los proyectos:
  const proyectos = [
    {
      id: 1,
      titulo: "Cartografías Sonoras",
      artista: "Miguel Sánchez",
      descripcion:
        "Exploración sonora del paisaje urbano de Montevideo a través de grabaciones de campo y composiciones.",
      imagen: "/placeholder.svg?height=400&width=600&query=arte+sonoro+urbano",
      fecha: "Enero - Marzo 2023",
    },
    {
      id: 2,
      titulo: "Memorias Textiles",
      artista: "Ana Gómez",
      descripcion:
        "Instalación que recupera técnicas tradicionales de tejido para narrar historias de migración y pertenencia.",
      imagen: "/placeholder.svg?height=400&width=600&query=arte+textil+tejido",
      fecha: "Abril - Junio 2023",
    },
    {
      id: 3,
      titulo: "Cuerpos en Tránsito",
      artista: "Carlos Mendoza",
      descripcion:
        "Serie fotográfica que documenta el movimiento y la presencia humana en espacios públicos y privados.",
      imagen: "/placeholder.svg?height=400&width=600&query=fotografia+cuerpos+movimiento",
      fecha: "Julio - Septiembre 2023",
    },
    {
      id: 4,
      titulo: "Arquitecturas Imaginadas",
      artista: "Laura Pérez",
      descripcion: "Proyecto que reimagina los espacios urbanos a través de intervenciones digitales y maquetas.",
      imagen: "/placeholder.svg?height=400&width=600&query=arquitectura+maquetas+arte",
      fecha: "Octubre - Diciembre 2023",
    },
  ]

  // Y los testimonios:
  const testimonios = [
    {
      id: 1,
      nombre: "Elena Martínez",
      origen: "Barcelona, España",
      texto:
        "Mi experiencia en Ánima fue transformadora. El espacio, la comunidad y el apoyo recibido me permitieron desarrollar mi proyecto de una manera que no hubiera sido posible en otro lugar.",
      imagen: "/placeholder.svg?height=200&width=200&query=artista+mujer+retrato",
      proyecto: "Instalación multimedia 'Ecos del Río'",
      año: "2022",
    },
    {
      id: 2,
      nombre: "Jean-Paul Dubois",
      origen: "París, Francia",
      texto:
        "La residencia en Ánima me permitió sumergirme en la cultura uruguaya y conectar con artistas locales. El intercambio cultural enriqueció enormemente mi trabajo fotográfico.",
      imagen: "/placeholder.svg?height=200&width=200&query=artista+hombre+retrato",
      proyecto: "Serie fotográfica 'Montevideo Íntimo'",
      año: "2023",
    },
    {
      id: 3,
      nombre: "Lucía Fernández",
      origen: "Buenos Aires, Argentina",
      texto:
        "El ambiente colaborativo y la libertad creativa que encontré en Ánima fueron fundamentales para el desarrollo de mi proyecto. La comunidad me acogió como parte de ella desde el primer día.",
      imagen: "/placeholder.svg?height=200&width=200&query=artista+mujer+latinoamericana",
      proyecto: "Performance 'Fronteras Invisibles'",
      año: "2021",
    },
  ]

  return (
    <div className="space-y-16 w-full">
      {/* Hero section */}
      <div className="relative h-[70vh] rounded-xl overflow-hidden">
        <img
          src="/placeholder.svg?height=800&width=1200&query=residencia+artistica+cultural"
          alt="Residencias Ánima"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <Badge className="mb-4 bg-white/90 text-black hover:bg-white/80 text-sm">Programa de Residencias</Badge>
          <h2 className="text-4xl md:text-6xl font-light text-white mb-4">Residencias Artísticas</h2>
          <p className="text-xl text-white/90 max-w-3xl mb-6">
            Un espacio para la creación, la experimentación y el intercambio entre artistas nacionales e
            internacionales.
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-white/90">
            Postular a una residencia
          </Button>
        </div>
      </div>

      {/* Proyectos destacados */}
      <div>
        <h2 className="text-3xl font-light mb-8 text-center">Proyectos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {proyectos.map((proyecto) => (
            <Card
              key={proyecto.id}
              className="overflow-hidden bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={proyecto.imagen || "/placeholder.svg"}
                  alt={proyecto.titulo}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-xl">{proyecto.titulo}</CardTitle>
                <CardDescription>{proyecto.artista}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground mb-2">{proyecto.descripcion}</p>
                <Badge variant="outline" className="bg-white/10">
                  {proyecto.fecha}
                </Badge>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="ghost" size="sm" className="w-full" asChild>
                  <Link href="#">
                    Ver proyecto <ExternalLink className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Testimonios */}
      <div>
        <h2 className="text-3xl font-light mb-8 text-center">Testimonios de Residentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonios.map((testimonio) => (
            <Card key={testimonio.id} className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonio.imagen || "/placeholder.svg"}
                    alt={testimonio.nombre}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                  />
                  <div>
                    <CardTitle className="text-lg">{testimonio.nombre}</CardTitle>
                    <CardDescription>{testimonio.origen}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 italic">"{testimonio.texto}"</p>
                <div className="text-xs text-muted-foreground">
                  <p>
                    <strong>Proyecto:</strong> {testimonio.proyecto}
                  </p>
                  <p>
                    <strong>Año:</strong> {testimonio.año}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function ComunidadContent() {
  // En la función ComunidadContent, actualizar los proyectos:
  const proyectos = [
    {
      id: 1,
      titulo: "Restauración Colectiva",
      descripcion:
        "Proyecto de restauración participativa de espacios de la Casa Soca, involucrando a vecinos y voluntarios en la preservación del patrimonio.",
      imagen: "/placeholder.svg?height=400&width=600&query=restauracion+patrimonio+colectiva",
      participantes: "Comunidad local, estudiantes de arquitectura, residentes",
    },
    {
      id: 2,
      titulo: "Huerta Comunitaria",
      descripcion:
        "Espacio de cultivo colectivo que promueve la soberanía alimentaria y el intercambio de saberes entre generaciones.",
      imagen: "/placeholder.svg?height=400&width=600&query=huerta+urbana+comunitaria",
      participantes: "Vecinos, escuelas locales, colectivos ambientales",
    },
    {
      id: 3,
      titulo: "Biblioteca Compartida",
      descripcion:
        "Sistema de intercambio de libros y documentación sobre arte, cultura y patrimonio, abierto a toda la comunidad.",
      imagen: "/placeholder.svg?height=400&width=600&query=biblioteca+comunitaria+libros",
      participantes: "Lectores, escritores, investigadores, estudiantes",
    },
    {
      id: 4,
      titulo: "Talleres Abiertos",
      descripcion:
        "Programa de talleres gratuitos impartidos por artistas residentes y colaboradores para compartir conocimientos y técnicas.",
      imagen: "/placeholder.svg?height=400&width=600&query=taller+arte+comunitario",
      participantes: "Artistas, educadores, público general",
    },
  ]

  // Y los eventos:
  const eventos = [
    {
      id: 1,
      titulo: "Festival de Arte Urbano",
      fecha: "15-17 de junio, 2024",
      descripcion:
        "Tres días de intervenciones artísticas, música y talleres en los espacios públicos cercanos a Ánima.",
      imagen: "/placeholder.svg?height=400&width=600&query=festival+arte+urbano",
    },
    {
      id: 2,
      titulo: "Ciclo de Cine Independiente",
      fecha: "Todos los jueves de julio",
      descripcion: "Proyecciones de cine independiente latinoamericano con presencia de directores y conversatorios.",
      imagen: "/placeholder.svg?height=400&width=600&query=cine+independiente+proyeccion",
    },
    {
      id: 3,
      titulo: "Encuentro de Editoriales Independientes",
      fecha: "5-6 de agosto, 2024",
      descripcion:
        "Feria de publicaciones independientes con presentaciones de libros, lecturas y talleres de edición.",
      imagen: "/placeholder.svg?height=400&width=600&query=feria+libro+editorial+independiente",
    },
  ]

  return (
    <div className="space-y-16 w-full">
      {/* Hero section */}
      <div className="relative h-[70vh] rounded-xl overflow-hidden">
        <img
          src="/placeholder.svg?height=800&width=1200&query=comunidad+cultural+artistica"
          alt="Comunidad Ánima"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <Badge className="mb-4 bg-white/90 text-black hover:bg-white/80 text-sm">Comunidad</Badge>
          <h2 className="text-4xl md:text-6xl font-light text-white mb-4">Nuestra Comunidad</h2>
          <p className="text-xl text-white/90 max-w-3xl mb-6">
            Un ecosistema vivo de artistas, vecinos, colaboradores y participantes que comparten el interés por la
            cultura, el arte y el patrimonio.
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-white/90">
            Unirse a la comunidad
          </Button>
        </div>
      </div>

      {/* Proyectos colaborativos */}
      <div>
        <h2 className="text-3xl font-light mb-8 text-center">Proyectos Colaborativos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {proyectos.map((proyecto) => (
            <Card
              key={proyecto.id}
              className="overflow-hidden bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={proyecto.imagen || "/placeholder.svg"}
                  alt={proyecto.titulo}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-xl">{proyecto.titulo}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground mb-4">{proyecto.descripcion}</p>
                <p className="text-xs text-muted-foreground">
                  <strong>Participantes:</strong> {proyecto.participantes}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="ghost" size="sm" className="w-full" asChild>
                  <Link href="#">
                    Participar <ExternalLink className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Próximos eventos */}
      <div>
        <h2 className="text-3xl font-light mb-8 text-center">Próximos Eventos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {eventos.map((evento) => (
            <Card
              key={evento.id}
              className="overflow-hidden bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={evento.imagen || "/placeholder.svg"}
                  alt={evento.titulo}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              <CardHeader className="p-4">
                <Badge variant="outline" className="mb-2 bg-white/10 w-fit">
                  {evento.fecha}
                </Badge>
                <CardTitle className="text-xl">{evento.titulo}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground">{evento.descripcion}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="outline" size="sm" className="w-full">
                  Más información
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
