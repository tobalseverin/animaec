"use client"
import { MapPin, Bus, Train, Car } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SiteHeader from "@/components/site-header"
import ActionButtons from "@/components/action-buttons"

export default function ComoLlegarPage() {
  return (
    <main className="min-h-screen">
      <div className="px-4 py-4">
        <SiteHeader showLogo={true} backUrl="/explorar" />
      </div>

      <div className="px-16">
        <div className="max-w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-light mb-2">Cómo Llegar</h1>
            <p className="text-xl text-muted-foreground">
              Encuentra la mejor manera de llegar a Ánima Espacio Cultural
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader className="p-4">
                  <CardTitle>Ubicación</CardTitle>
                  <CardDescription>Casa Soca, Montevideo, Uruguay</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="aspect-[16/9] w-full bg-muted rounded-md overflow-hidden">
                    {/* Aquí iría un mapa interactivo */}
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <MapPin className="h-12 w-12 text-muted-foreground" />
                      <span className="sr-only">Mapa de ubicación</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <div className="space-y-4">
                <Card>
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-2">
                      <Bus className="h-5 w-5" />
                      <CardTitle className="text-lg">Transporte Público</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>Líneas de bus:</strong> 121, 130, 142, 150
                      </li>
                      <li>
                        <strong>Parada más cercana:</strong> Av. Principal y Calle Secundaria (200m)
                      </li>
                      <li>
                        <strong>Frecuencia:</strong> Cada 10-15 minutos en hora pico
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-2">
                      <Car className="h-5 w-5" />
                      <CardTitle className="text-lg">En Automóvil</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>Desde el Centro:</strong> 15 minutos por Av. Principal
                      </li>
                      <li>
                        <strong>Estacionamiento:</strong> Disponible en la calle y estacionamiento privado a 100m
                      </li>
                      <li>
                        <strong>Referencia:</strong> A 3 cuadras del Parque Municipal
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-2">
                      <Train className="h-5 w-5" />
                      <CardTitle className="text-lg">Otras Opciones</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>Bicicleta:</strong> Bicicletero disponible en la entrada
                      </li>
                      <li>
                        <strong>Taxi/Aplicaciones:</strong> Punto de referencia "Casa Soca"
                      </li>
                      <li>
                        <strong>A pie:</strong> 20 minutos desde la Plaza Principal
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="mt-4 mb-16">
            <Card>
              <CardHeader className="p-4">
                <CardTitle>Información Adicional</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Horarios de Atención</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>Lunes a Viernes:</strong> 9:00 - 21:00
                      </li>
                      <li>
                        <strong>Sábados:</strong> 10:00 - 20:00
                      </li>
                      <li>
                        <strong>Domingos:</strong> 11:00 - 18:00
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Contacto</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>Teléfono:</strong> +598 2123 4567
                      </li>
                      <li>
                        <strong>Email:</strong> info@animaespacio.org
                      </li>
                      <li>
                        <strong>WhatsApp:</strong> +598 91 234 567
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <ActionButtons />
    </main>
  )
}
