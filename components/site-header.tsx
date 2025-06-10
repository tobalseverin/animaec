"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Moon, Sun, Menu } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import FullScreenMenu from "@/components/full-screen-menu"

interface SiteHeaderProps {
  showBackButton?: boolean
  backUrl?: string
  showLogo?: boolean
}

export default function SiteHeader({ showBackButton = true, backUrl = "/", showLogo = true }: SiteHeaderProps) {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="w-full flex justify-between items-center mb-8 relative">
        {/* Botón de menú (izquierda) */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(true)}
            className="mr-2 hover:bg-white/10 transition-colors"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menú</span>
          </Button>

          {showBackButton && (
            <Button variant="ghost" asChild className="hover:bg-white/10 transition-colors">
              <Link href={backUrl}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver
              </Link>
            </Button>
          )}
        </div>

        {/* Logo (centro) - Usando el logo en blanco */}
        {showLogo && (
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Link href="/" className="flex items-center justify-center">
              <Image src="/animaec_logo2022-06-WHITE.png" alt="ānima ec" width={120} height={60} />
            </Link>
          </div>
        )}

        {/* Controles de tema e idioma (derecha) */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === "es" ? "en" : "es")}
            className="text-sm font-light"
          >
            {language === "es" ? "EN" : "ES"}
          </Button>
        </div>
      </header>

      {/* Menú a pantalla completa */}
      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
