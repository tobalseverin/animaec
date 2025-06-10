"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Instagram, Facebook, MapPin, Phone, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import Footer from "@/components/footer"

interface FullScreenMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function FullScreenMenu({ isOpen, onClose }: FullScreenMenuProps) {
  const [showFooter, setShowFooter] = useState(true)

  // Función para abrir WhatsApp Business
  const openWhatsApp = () => {
    window.open(
      "https://wa.me/59812345678?text=Hola,%20me%20gustaría%20obtener%20más%20información%20sobre%20ānima%20ec",
      "_blank",
    )
  }

  // Cerrar el menú al presionar Escape
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [onClose])

  // Prevenir scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto"
        >
          <div className="container mx-auto px-8 md:px-16 lg:px-24 py-8 min-h-screen flex flex-col max-w-7xl">
            {/* Header del menú */}
            <div className="flex justify-between items-center mb-12 md:mb-16">
              <Link href="/" onClick={onClose}>
                <Image
                  src="/animaec_logo2022-05-COLOR.svg"
                  alt="ānima ec"
                  width={180}
                  height={90}
                  className="transition-transform hover:scale-105"
                />
              </Link>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                <X className="h-6 w-6" />
                <span className="sr-only">Cerrar menú</span>
              </Button>
            </div>

            {/* Contenido del menú */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
              {/* Navegación principal */}
              <div>
                <h2 className="text-2xl font-light mb-6">Navegación</h2>
                <nav className="space-y-4">
                  <Link
                    href="/crear"
                    onClick={onClose}
                    className="block text-3xl font-light hover:text-logo-magenta transition-colors"
                  >
                    Crear
                  </Link>
                  <Link
                    href="/explorar"
                    onClick={onClose}
                    className="block text-3xl font-light hover:text-logo-blue transition-colors"
                  >
                    Explorar
                  </Link>
                  <Link
                    href="/compartir"
                    onClick={onClose}
                    className="block text-3xl font-light hover:text-logo-green transition-colors"
                  >
                    Compartir
                  </Link>
                  <Link
                    href="/about"
                    onClick={onClose}
                    className="block text-3xl font-light hover:text-logo-orange transition-colors"
                  >
                    Acerca de
                  </Link>
                  <Link
                    href="/contact"
                    onClick={onClose}
                    className="block text-3xl font-light hover:text-logo-purple transition-colors"
                  >
                    Contacto
                  </Link>
                </nav>
              </div>

              {/* Información de contacto */}
              <div>
                <h2 className="text-2xl font-light mb-6">Contacto</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-logo-magenta" />
                    <span>Casa Soca, Montevideo, Uruguay</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-logo-blue" />
                    <a href="tel:+59812345678" className="hover:underline">
                      +598 1234 5678
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-logo-green" />
                    <button onClick={openWhatsApp} className="hover:underline">
                      Contactar por WhatsApp
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <Instagram className="h-5 w-5 text-logo-orange" />
                    <a
                      href="https://instagram.com/animaespaciocultural"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      @animaespaciocultural
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Facebook className="h-5 w-5 text-logo-purple" />
                    <a
                      href="https://facebook.com/animaespaciocultural"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      /animaespaciocultural
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12">
              <Button variant="outline" onClick={() => setShowFooter(!showFooter)} className="w-full mb-4">
                {showFooter ? "Ocultar información adicional" : "Mostrar información adicional"}
              </Button>

              {showFooter && <Footer />}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
