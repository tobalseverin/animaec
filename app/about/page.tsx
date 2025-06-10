import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h1 className="text-4xl font-light mb-6">Ánima Espacio Cultural</h1>
            <div className="prose prose-lg dark:prose-invert">
              <p className="text-xl mb-6">Creemos en el poder de la cultura para unir y transformar comunidades.</p>

              <p className="mb-4">
                Con base en Montevideo, Uruguay, Ánima es un espacio sociocultural y educativo sin fines de lucro que
                desde 2015 apoya a gestores y creadores nacionales e internacionales, promoviendo un entorno abierto
                para la creación, la exploración y el intercambio.
              </p>

              <p className="mb-4">
                Desde 2022 funciona en la histórica Casa Soca —Monumento Histórico Nacional—, desde donde impulsa
                talleres, eventos y actividades culturales accesibles para todas las edades.
              </p>

              <p className="mb-4">
                Ánima se ha consolidado como un referente de la escena cultural local y underground de Montevideo,
                atrayendo artistas de diversas partes del mundo. Ofrece residencias artísticas, programas de
                colaboración para la restauración del patrimonio, y desarrolla una programación cultural en diálogo con
                la comunidad local e instituciones como la Universidad de la República, la Embajada de Francia y la
                Intendencia de Montevideo.
              </p>
            </div>

            <div className="mt-8">
              <Button asChild>
                <Link href="/contact">Contactar</Link>
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Card className="w-full overflow-hidden">
              <CardContent className="p-0">
                <img
                  src="/placeholder.svg?height=600&width=800"
                  alt="Ánima Espacio Cultural"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
