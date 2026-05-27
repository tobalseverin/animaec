"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import {
  Instagram,
  Facebook,
  MapPin,
  Phone,
  ChevronDown,
  ChevronUp,
  Moon,
  Sun,
  MessageSquare,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import Link from "next/link"
import Footer from "@/components/footer"
import Image from "next/image"

export default function Home() {
  const { t, language, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [showFooter, setShowFooter] = useState(false)
  const [activeSection, setActiveSection] = useState("default")
  const footerRef = useRef<HTMLDivElement>(null)

  const toggleFooter = () => {
    setShowFooter(!showFooter)
    if (!showFooter) {
      setTimeout(() => {
        footerRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }

  const menuVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  }

  // Colores de fondo según la sección
  const backgroundColors: Record<string, string> = {
    default: "from-slate-900 via-purple-900/20 to-slate-900",
    crear: "from-slate-900 via-blue-900/30 to-slate-900",
    explorar: "from-slate-900 via-green-900/30 to-slate-900",
    compartir: "from-slate-900 via-orange-900/30 to-slate-900",
  }

  // Funcion para abrir WhatsApp Business
  const openWhatsApp = () => {
    window.open(
      "https://wa.me/59812345678?text=Hola,%20me%20gustaria%20obtener%20mas%20informacion%20sobre%20anima%20ec",
      "_blank",
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b ${backgroundColors[activeSection]} transition-all duration-700`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/50" />

      {/* Header - Sin logo, solo controles */}
      <header className="w-full p-4 flex justify-end items-center z-10">
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

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 w-full px-4 py-6 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-8"
        >
          {/* Usando el logo a color */}
          <Image
            src="/animaec_logo2022-05-COLOR.svg"
            alt="anima ec"
            width={240}
            height={120}
            className="mx-auto mb-4"
          />
        </motion.div>

        <nav className="flex flex-col items-center justify-center gap-6 md:gap-10">
          <motion.div
            custom={0}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            className="main-menu-item"
            onMouseEnter={() => setActiveSection("crear")}
            onMouseLeave={() => setActiveSection("default")}
          >
            <Link href="/crear">{t("crear")}</Link>
          </motion.div>
          <motion.div
            custom={1}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            className="main-menu-item"
            onMouseEnter={() => setActiveSection("explorar")}
            onMouseLeave={() => setActiveSection("default")}
          >
            <Link href="/explorar">{t("explorar")}</Link>
          </motion.div>
          <motion.div
            custom={2}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            className="main-menu-item"
            onMouseEnter={() => setActiveSection("compartir")}
            onMouseLeave={() => setActiveSection("default")}
          >
            <Link href="/compartir">{t("compartir")}</Link>
          </motion.div>
        </nav>

        <div className="flex items-center gap-4 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Button variant="outline" size="lg" onClick={toggleFooter} className="rounded-full thin-border group">
              <span className="mr-2">Mas informacion</span>
              {showFooter ? (
                <ChevronUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform" />
              ) : (
                <ChevronDown className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
              )}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-20">
        <Button variant="outline" size="icon" className="rounded-full thin-border" asChild>
          <Link href="/explorar/como-llegar">
            <MapPin className="h-6 w-6" />
            <span className="sr-only">{t("location")}</span>
          </Link>
        </Button>
        <Button variant="outline" size="icon" className="rounded-full thin-border" asChild>
          <a href="tel:+59812345678">
            <Phone className="h-6 w-6" />
            <span className="sr-only">{t("call")}</span>
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

      {/* Footer */}
      {showFooter && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full z-10"
          ref={footerRef}
        >
          <Footer />
        </motion.div>
      )}
    </main>
  )
}
