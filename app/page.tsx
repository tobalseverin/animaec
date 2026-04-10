"use client"

import { useState, useRef } from "react"
import dynamic from "next/dynamic"
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
  List,
  MessageSquare,
} from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import Footer from "@/components/footer"
import Image from "next/image"

// Dynamic import for YouTube embed to avoid SSR script issues
const YouTubeBackground = dynamic(
  () => import("@/components/youtube-embed").then((mod) => ({ default: mod.YouTubeEmbed })),
  { ssr: false, loading: () => <div className="w-full h-full bg-black" /> }
)

// Lista de videos de YouTube para el fondo
const backgroundVideos = {
  default:
    "https://www.youtube.com/embed/a8S6_aTRMEU?autoplay=1&mute=1&loop=1&playlist=a8S6_aTRMEU&controls=0&showinfo=0&modestbranding=1&rel=0",
  crear:
    "https://www.youtube.com/embed/a8S6_aTRMEU?autoplay=1&mute=1&loop=1&playlist=a8S6_aTRMEU&controls=0&showinfo=0&modestbranding=1&rel=0",
  explorar:
    "https://www.youtube.com/embed/4S7xeGj3jNw?autoplay=1&mute=1&loop=1&playlist=4S7xeGj3jNw&controls=0&showinfo=0&modestbranding=1&rel=0",
  compartir:
    "https://www.youtube.com/embed/WMW87bXkxmc?autoplay=1&mute=1&loop=1&playlist=WMW87bXkxmc&controls=0&showinfo=0&modestbranding=1&rel=0",
}

// Lista de videos de YouTube para la galería
const youtubeVideos = [
  {
    id: "a8S6_aTRMEU",
    title: "Turismo Buenos Aires",
    embedUrl: "https://www.youtube.com/embed/a8S6_aTRMEU?autoplay=0&mute=0",
  },
  {
    id: "4S7xeGj3jNw",
    title: "Centro Cultural Inca Garcilaso",
    embedUrl: "https://www.youtube.com/embed/4S7xeGj3jNw?autoplay=0&mute=0",
  },
  {
    id: "WMW87bXkxmc",
    title: "Centro Cultural Clavijero",
    embedUrl: "https://www.youtube.com/embed/WMW87bXkxmc?autoplay=0&mute=0",
  },
]

export default function Home() {
  const { t, language, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [showFooter, setShowFooter] = useState(false)
  const [showVideos, setShowVideos] = useState(false)
  const [activeVideo, setActiveVideo] = useState("default")
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

  // Función para abrir WhatsApp Business
  const openWhatsApp = () => {
    window.open(
      "https://wa.me/59812345678?text=Hola,%20me%20gustaría%20obtener%20más%20información%20sobre%20ānima%20ec",
      "_blank",
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative overflow-hidden">
      {/* Video Background con cambio según hover */}
      <div className="background-iframe-container">
        <YouTubeBackground
          src={backgroundVideos[activeVideo as keyof typeof backgroundVideos]}
          title="Background Video"
          className="background-iframe"
        />
      </div>
      <div className="video-overlay"></div>

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
      <div className="flex flex-col items-center justify-center flex-1 w-full px-4 py-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-8"
        >
          {/* Usando el logo a color */}
          <Image
            src="/animaec_logo2022-05-COLOR.svg"
            alt="ānima ec"
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
            onMouseEnter={() => setActiveVideo("crear")}
            onMouseLeave={() => setActiveVideo("default")}
          >
            <Link href="/crear">{t("crear")}</Link>
          </motion.div>
          <motion.div
            custom={1}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            className="main-menu-item"
            onMouseEnter={() => setActiveVideo("explorar")}
            onMouseLeave={() => setActiveVideo("default")}
          >
            <Link href="/explorar">{t("explorar")}</Link>
          </motion.div>
          <motion.div
            custom={2}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            className="main-menu-item"
            onMouseEnter={() => setActiveVideo("compartir")}
            onMouseLeave={() => setActiveVideo("default")}
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
              <span className="mr-2">Más información</span>
              {showFooter ? (
                <ChevronUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform" />
              ) : (
                <ChevronDown className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
              )}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowVideos(!showVideos)}
              className="rounded-full thin-border"
              title={showVideos ? "Ocultar videos" : "Ver videos"}
            >
              <List className="h-5 w-5" />
              <span className="sr-only">{showVideos ? "Ocultar videos" : "Ver videos"}</span>
            </Button>
          </motion.div>
        </div>

        {/* Videos de YouTube */}
        {showVideos && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-16 w-full max-w-6xl"
          >
            <h2 className="text-2xl font-light mb-6 text-center">Videos destacados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {youtubeVideos.map((video) => (
                <div key={video.id} className="overflow-hidden rounded-lg border border-border/40">
                  <div className="aspect-video w-full">
                    <YouTubeBackground
                      src={video.embedUrl}
                      title={video.title}
                      className="w-full h-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
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
          className="w-full"
          ref={footerRef}
        >
          <Footer />
        </motion.div>
      )}
    </main>
  )
}
