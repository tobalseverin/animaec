"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "es" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  es: {
    crear: "Crear",
    explorar: "Explorar",
    compartir: "Compartir",
    about: "Acerca de",
    contact: "Contacto",
    login: "Acceso",
    location: "Ubicación",
    call: "Llamar",
    "footer.title": "ānima ec",
    "footer.description": "Creemos en el poder de la cultura para unir y transformar comunidades.",
    "footer.address": "San José 822, Montevideo, Uruguay",
  },
  en: {
    crear: "Create",
    explorar: "Explore",
    compartir: "Share",
    about: "About",
    contact: "Contact",
    login: "Login",
    location: "Location",
    call: "Call",
    "footer.title": "ānima ec",
    "footer.description": "We believe in the power of culture to unite and transform communities.",
    "footer.address": "San José 822, Montevideo, Uruguay",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.es] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
