"use client"

import { useLanguage } from "@/components/language-provider"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="w-full bg-background/80 backdrop-blur-md border-t thin-border py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-start">
            <div className="flex items-center mb-3">
              <Image src="/animaec_logo2022-06.png" alt="ānima ec" width={120} height={60} className="mr-2" />
            </div>
            <p className="text-muted-foreground mb-2">
              Creemos en el poder de{" "}
              <em className="italic">
                la cultura
                <br />
                para unir y transformar comunidades.
              </em>
            </p>
            <p className="text-sm text-muted-foreground">San José 822, Montevideo, Uruguay</p>
          </div>

          <div>
            <h4 className="text-lg font-light mb-3">Navegación</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/crear" className="text-muted-foreground hover:text-foreground transition-colors">
                {t("crear")}
              </Link>
              <Link href="/explorar" className="text-muted-foreground hover:text-foreground transition-colors">
                {t("explorar")}
              </Link>
              <Link href="/compartir" className="text-muted-foreground hover:text-foreground transition-colors">
                {t("compartir")}
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                {t("about")}
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                {t("contact")}
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="text-lg font-light mb-3">Enlaces</h4>
            <nav className="flex flex-col gap-2">
              <a
                href="https://comunidad.animaespacio.org/sobre-la-comunidad/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Sobre la comunidad
              </a>
              <a
                href="https://comunidad.animaespacio.org/espacio-y-funcionamiento/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Espacio y funcionamiento
              </a>
              <a
                href="https://comunidad.animaespacio.org/servicios-tarifas-tasas/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Servicios y tarifas
              </a>
              <a
                href="https://comunidad.animaespacio.org/convocatoria/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Convocatorias
              </a>
            </nav>
          </div>
        </div>

        <div className="thin-divider my-4"></div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ānima ec. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 mt-3 md:mt-0">
            <a
              href="https://instagram.com/animaespaciocultural"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com/animaespaciocultural"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
