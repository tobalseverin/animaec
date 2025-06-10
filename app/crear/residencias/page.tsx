"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, Phone, Instagram, Facebook, MessageSquare } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ResidenciasPage() {
  const [activeTab, setActiveTab] = useState("info")

  // Función para abrir WhatsApp Business
  const openWhatsApp = () => {
    window.open(
      "https://wa.me/59812345678?text=Hola,%20me%20gustaría%20obtener%20más%20información%20sobre%20las%20residencias%20artísticas%20en%20ānima%20ec",
      "_blank",
    )
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/crear">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-light mb-2">Residencias Artísticas</h1>
              <p className="text-xl text-muted-foreground mb-6">
                Desarrolla tu proyecto artístico en un espacio colaborativo y enriquecedor
              </p>

              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-8">
                <img
                  src="/placeholder.svg?height=800&width=1000&query=residencia+artistica+cultural"
                  alt="Residencia artística en Ánima"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <Badge className="mb-2 bg-white/90 text-black hover:bg-white/80">Convocatoria abierta</Badge>
                  <h2 className="text-3xl font-light text-white">Residencia "Territorios Compartidos"</h2>
                  <p className="text-white/90">Abril - Junio 2023</p>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">Información</TabsTrigger>
                  <TabsTrigger value="residente">Residente Actual</TabsTrigger>
                  <TabsTrigger value="postular">Cómo Postular</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sobre la Residencia</CardTitle>
                      <CardDescription>
                        Programa de residencias artísticas para creadores nacionales e internacionales
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>
                        El programa de residencias artísticas de Ánima ofrece a creadores nacionales e internacionales
                        un espacio para desarrollar sus proyectos en un entorno colaborativo y enriquecedor.
                      </p>
                      <p>
                        Las residencias tienen una duración de 1 a 3 meses y proporcionan alojamiento en la Casa Soca,
                        espacio de trabajo, acceso a talleres y equipamiento, conexión con la comunidad artística local
                        y posibilidad de presentación pública del trabajo.
                      </p>
                      <p>
                        Buscamos proyectos que dialoguen con el contexto local, promuevan el intercambio cultural y
                        contribuyan a la escena artística de Montevideo.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div>
                          <h3 className="text-lg font-medium mb-2">Beneficios</h3>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>Alojamiento en la Casa Soca</li>
                            <li>Espacio de trabajo dedicado</li>
                            <li>Acceso a talleres y equipamiento</li>
                            <li>Conexión con la comunidad artística local</li>
                            <li>Presentación pública del trabajo</li>
                            <li>Apoyo curatorial y técnico</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-2">Áreas</h3>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>Artes visuales</li>
                            <li>Artes escénicas</li>
                            <li>Música y sonido</li>
                            <li>Literatura</li>
                            <li>Investigación artística</li>
                            <li>Proyectos interdisciplinarios</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="residente" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Residente Actual</CardTitle>
                      <CardDescription>
                        Conoce al artista que actualmente desarrolla su proyecto en Ánima
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                          <img
                            src="/placeholder.svg?height=300&width=300&query=artista+mujer+retrato"
                            alt="Lucía Fernández"
                            className="w-full h-auto rounded-lg object-cover aspect-square"
                          />
                        </div>
                        <div className="md:col-span-2 space-y-4">
                          <div>
                            <h3 className="text-2xl font-light">Lucía Fernández</h3>
                            <p className="text-muted-foreground">Buenos Aires, Argentina</p>
                          </div>
                          <div>
                            <h4 className="text-lg font-medium mb-2">Proyecto: "Memorias Compartidas"</h4>
                            <p className="text-muted-foreground mb-4">
                              Instalación multimedia que explora la memoria colectiva a través de testimonios, archivos
                              históricos y objetos cotidianos. El proyecto busca crear un diálogo entre las historias
                              personales y la memoria social de Montevideo y Buenos Aires.
                            </p>
                            <p className="text-muted-foreground">
                              Durante su residencia, Lucía está recopilando testimonios de habitantes locales,
                              investigando en archivos históricos y creando una instalación que combina elementos
                              audiovisuales, objetos encontrados y participación del público.
                            </p>
                          </div>
                          <div className="pt-4">
                            <h4 className="text-lg font-medium mb-2">Actividades Públicas</h4>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>Taller abierto: 15 de mayo, 18:00h</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>Presentación final: 28 de mayo, 19:30h</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8">
                        <h4 className="text-lg font-medium mb-4">Proceso de trabajo</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <img
                            src="/placeholder.svg?height=300&width=400&query=proceso+creativo+arte"
                            alt="Proceso de trabajo 1"
                            className="w-full h-auto rounded-lg object-cover aspect-video"
                          />
                          <img
                            src="/placeholder.svg?height=300&width=400&query=artista+trabajando+estudio"
                            alt="Proceso de trabajo 2"
                            className="w-full h-auto rounded-lg object-cover aspect-video"
                          />
                          <img
                            src="/placeholder.svg?height=300&width=400&query=obra+arte+proceso"
                            alt="Proceso de trabajo 3"
                            className="w-full h-auto rounded-lg object-cover aspect-video"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="postular" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Cómo Postular</CardTitle>
                      <CardDescription>Proceso de postulación para las residencias artísticas</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>
                        Las convocatorias para residencias artísticas se abren dos veces al año. La selección se realiza
                        a través de un comité curatorial que evalúa las propuestas según su calidad, viabilidad y
                        pertinencia con los objetivos del programa.
                      </p>

                      <div className="space-y-6 mt-4">
                        <div>
                          <h3 className="text-lg font-medium mb-2">Requisitos</h3>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>Ser mayor de 18 años</li>
                            <li>Tener experiencia previa en el campo artístico</li>
                            <li>Presentar una propuesta de proyecto a desarrollar durante la residencia</li>
                            <li>Disponibilidad para residir en Montevideo durante el período de la residencia</li>
                            <li>Compromiso de participar en las actividades propuestas por Ánima</li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-2">Documentación</h3>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>Formulario de inscripción completo</li>
                            <li>CV o biografía artística (máximo 2 páginas)</li>
                            <li>Portfolio o muestra de trabajos anteriores</li>
                            <li>Propuesta de proyecto a desarrollar (máximo 3 páginas)</li>
                            <li>Carta de motivación (máximo 1 página)</li>
                            <li>Cronograma tentativo de trabajo</li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-2">Fechas Importantes</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center border-b pb-2">
                              <span>Apertura de convocatoria</span>
                              <span className="text-muted-foreground">1 de marzo, 2023</span>
                            </div>
                            <div className="flex justify-between items-center border-b pb-2">
                              <span>Cierre de convocatoria</span>
                              <span className="text-muted-foreground">30 de abril, 2023</span>
                            </div>
                            <div className="flex justify-between items-center border-b pb-2">
                              <span>Anuncio de seleccionados</span>
                              <span className="text-muted-foreground">15 de mayo, 2023</span>
                            </div>
                            <div className="flex justify-between items-center border-b pb-2">
                              <span>Período de residencia</span>
                              <span className="text-muted-foreground">Julio - Septiembre, 2023</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button size="lg" className="w-full">
                        Postular a la residencia
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Residencias Anteriores</CardTitle>
                  <CardDescription>Artistas que han participado en nuestro programa</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <img
                        src="/placeholder.svg?height=100&width=100&query=artista+hombre+retrato"
                        alt="Juan Pérez"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium">Juan Pérez</h3>
                        <p className="text-sm text-muted-foreground">México</p>
                        <p className="text-sm">Proyecto: "Cartografías Sonoras"</p>
                        <p className="text-xs text-muted-foreground">Enero - Marzo 2023</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <img
                        src="/placeholder.svg?height=100&width=100&query=artista+mujer+retrato"
                        alt="Ana Silva"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium">Ana Silva</h3>
                        <p className="text-sm text-muted-foreground">Brasil</p>
                        <p className="text-sm">Proyecto: "Cuerpos en Tránsito"</p>
                        <p className="text-xs text-muted-foreground">Octubre - Diciembre 2022</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <img
                        src="/placeholder.svg?height=100&width=100&query=artista+hombre+retrato+2"
                        alt="Carlos Martínez"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium">Carlos Martínez</h3>
                        <p className="text-sm text-muted-foreground">España</p>
                        <p className="text-sm">Proyecto: "Memorias Urbanas"</p>
                        <p className="text-xs text-muted-foreground">Julio - Septiembre 2022</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <img
                        src="/placeholder.svg?height=100&width=100&query=artista+mujer+retrato+2"
                        alt="Elena Gómez"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium">Elena Gómez</h3>
                        <p className="text-sm text-muted-foreground">Colombia</p>
                        <p className="text-sm">Proyecto: "Tejidos Colectivos"</p>
                        <p className="text-xs text-muted-foreground">Abril - Junio 2022</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button variant="outline" className="w-full">
                      Ver todos los residentes
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Contacto</CardTitle>
                  <CardDescription>¿Tienes dudas sobre las residencias?</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>Casa Soca, Montevideo, Uruguay</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>+598 2123 4567</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Instagram className="h-4 w-4 text-muted-foreground" />
                      <a href="https://instagram.com/animaespaciocultural" className="hover:underline">
                        @animaespaciocultural
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Facebook className="h-4 w-4 text-muted-foreground" />
                      <a href="https://facebook.com/animaespaciocultural" className="hover:underline">
                        /animaespaciocultural
                      </a>
                    </div>
                  </div>

                  <Button onClick={openWhatsApp} className="w-full mt-6">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Consultar por WhatsApp
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
