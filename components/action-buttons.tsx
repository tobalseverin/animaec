"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Phone, MessageSquare, Instagram, Facebook } from "lucide-react"
import Link from "next/link"

export default function ActionButtons() {
  // Función para abrir WhatsApp Business
  const openWhatsApp = () => {
    window.open(
      "https://wa.me/59812345678?text=Hola,%20me%20gustaría%20obtener%20más%20información%20sobre%20ānima%20ec",
      "_blank",
    )
  }

  return (
    <>
      {/* Quick Actions */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-20">
        <Button variant="outline" size="icon" className="rounded-full thin-border" asChild>
          <Link href="/explorar/como-llegar">
            <MapPin className="h-6 w-6" />
            <span className="sr-only">Ubicación</span>
          </Link>
        </Button>
        <Button variant="outline" size="icon" className="rounded-full thin-border" asChild>
          <a href="tel:+59812345678">
            <Phone className="h-6 w-6" />
            <span className="sr-only">Llamar</span>
          </a>
        </Button>
        <Button variant="outline" size="icon" className="rounded-full thin-border" onClick={openWhatsApp}>
          <MessageSquare className="h-6 w-6" />
          <span className="sr-only">Chat</span>
        </Button>
      </div>

      {/* Social Media */}
      <div className="fixed bottom-4 left-4 flex flex-col gap-2 z-20">
        <Button variant="outline" size="icon" className="rounded-full thin-border" asChild>
          <a href="https://instagram.com/animaespaciocultural" target="_blank" rel="noopener noreferrer">
            <Instagram className="h-6 w-6" />
            <span className="sr-only">Instagram</span>
          </a>
        </Button>
        <Button variant="outline" size="icon" className="rounded-full thin-border" asChild>
          <a href="https://facebook.com/animaespaciocultural" target="_blank" rel="noopener noreferrer">
            <Facebook className="h-6 w-6" />
            <span className="sr-only">Facebook</span>
          </a>
        </Button>
      </div>
    </>
  )
}
