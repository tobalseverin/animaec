"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  ChevronRight,
  X,
  FileText,
  Home,
  Calendar,
  Megaphone,
  HelpCircle,
  Send,
  MessageSquare,
  Phone,
} from "lucide-react"
import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SiteHeader from "@/components/site-header"
import ActionButtons from "@/components/action-buttons"
import { toast } from "@/hooks/use-toast"
import { sendEmail } from "@/lib/email-service"

interface CrearOption {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  href: string
  action?: "modal" | "page"
  bgImage: string
}

export default function CrearPage() {
  const [options] = useState<CrearOption[]>([
    {
      id: "proyectos",
      title: "PROPUESTA DE PROYECTOS",
      description: "Presenta tu idea o proyecto para desarrollarlo en Ánima",
      icon: <FileText className="h-6 w-6 text-white" />,
      href: "/crear/proyectos",
      action: "modal",
      bgImage: "/placeholder.svg?height=600&width=600",
    },
    {
      id: "residencias",
      title: "RESIDENCIAS DE ARTE",
      description: "Postula para una residencia artística en nuestro espacio",
      icon: <Home className="h-6 w-6 text-white" />,
      href: "/crear/residencias",
      bgImage: "/placeholder.svg?height=600&width=600",
    },
    {
      id: "actividades",
      title: "COMUNICACIÓN DE ACTIVIDADES",
      description: "Comparte información sobre tus actividades en Ánima",
      icon: <Calendar className="h-6 w-6 text-white" />,
      href: "/crear/actividades",
      action: "modal",
      bgImage: "/placeholder.svg?height=600&width=600",
    },
    {
      id: "llamados",
      title: "LLAMADOS",
      description: "Consulta las convocatorias abiertas actualmente",
      icon: <Megaphone className="h-6 w-6 text-white" />,
      href: "/crear/llamados",
      bgImage: "/placeholder.svg?height=600&width=600",
    },
  ])

  const [scrollY, setScrollY] = useState(0)
  const [isProyectoModalOpen, setIsProyectoModalOpen] = useState(false)
  const [isActividadesModalOpen, setIsActividadesModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Estados para formulario de proyectos
  const [proyectoFormData, setProyectoFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    nacionalidad: "",
    titulo: "",
    area: "artes-visuales",
    duracion: "",
    participantes: "",
    descripcion: "",
    objetivos: "",
    espacios: "salon1",
    recursos: "",
  })

  // Estados para formulario de actividades
  const [actividadFormData, setActividadFormData] = useState({
    titulo: "",
    responsable: "",
    email: "",
    telefono: "",
    fecha: "",
    horaInicio: "",
    horaFin: "",
    espacio: "salon1",
    publico: "",
    aforo: "",
    precio: "",
    descripcion: "",
    redes: "",
    observaciones: "",
  })

  const [proyectoErrors, setProyectoErrors] = useState<Record<string, string>>({})
  const [actividadErrors, setActividadErrors] = useState<Record<string, string>>({})

  // Efecto para controlar el scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleOptionClick = (option: CrearOption) => {
    if (option.action === "modal") {
      if (option.id === "proyectos") {
        setIsProyectoModalOpen(true)
        setCurrentStep(0)
      } else if (option.id === "actividades") {
        setIsActividadesModalOpen(true)
        setCurrentStep(0)
      }
    }
  }

  const validateProyectoForm = (step: number) => {
    const errors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!proyectoFormData.nombre.trim()) errors.nombre = "El nombre es requerido"
        if (!proyectoFormData.email.trim()) errors.email = "El email es requerido"
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(proyectoFormData.email)) {
          errors.email = "Email inválido"
        }
        if (!proyectoFormData.telefono.trim()) errors.telefono = "El teléfono es requerido"
        if (!proyectoFormData.nacionalidad.trim()) errors.nacionalidad = "La nacionalidad es requerida"
        break
      case 2:
        if (!proyectoFormData.titulo.trim()) errors.titulo = "El título es requerido"
        if (!proyectoFormData.descripcion.trim()) errors.descripcion = "La descripción es requerida"
        if (!proyectoFormData.objetivos.trim()) errors.objetivos = "Los objetivos son requeridos"
        if (!proyectoFormData.duracion.trim()) errors.duracion = "La duración es requerida"
        if (!proyectoFormData.participantes.trim()) errors.participantes = "El número de participantes es requerido"
        break
      case 3:
        if (!proyectoFormData.recursos.trim()) errors.recursos = "Los recursos son requeridos"
        break
    }

    setProyectoErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateActividadForm = (step: number) => {
    const errors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!actividadFormData.titulo.trim()) errors.titulo = "El título es requerido"
        if (!actividadFormData.responsable.trim()) errors.responsable = "El responsable es requerido"
        if (!actividadFormData.email.trim()) errors.email = "El email es requerido"
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(actividadFormData.email)) {
          errors.email = "Email inválido"
        }
        if (!actividadFormData.telefono.trim()) errors.telefono = "El teléfono es requerido"
        break
      case 2:
        if (!actividadFormData.fecha.trim()) errors.fecha = "La fecha es requerida"
        if (!actividadFormData.horaInicio.trim()) errors.horaInicio = "La hora de inicio es requerida"
        if (!actividadFormData.horaFin.trim()) errors.horaFin = "La hora de fin es requerida"
        if (!actividadFormData.descripcion.trim()) errors.descripcion = "La descripción es requerida"
        if (!actividadFormData.publico.trim()) errors.publico = "El público objetivo es requerido"
        if (!actividadFormData.aforo.trim()) errors.aforo = "El aforo es requerido"
        if (!actividadFormData.precio.trim()) errors.precio = "El precio es requerido"
        break
    }

    setActividadErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleProyectoNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1)
    } else if (validateProyectoForm(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handleActividadNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1)
    } else if (validateActividadForm(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handleProyectoSubmit = async () => {
    if (!validateProyectoForm(3)) return

    setIsSubmitting(true)

    // Mostrar notificación de envío inmediatamente
    toast({
      title: "Enviando propuesta",
      description: "Por favor espera mientras procesamos tu propuesta de proyecto...",
    })

    try {
      const result = await sendEmail("project", proyectoFormData)

      if (result.success) {
        toast({
          title: "✅ Propuesta enviada exitosamente",
          description: "Hemos recibido tu propuesta de proyecto. Te contactaremos en un plazo máximo de 15 días.",
          duration: 8000,
        })

        // Mostrar mensaje de éxito visual
        const successMessage = document.createElement("div")
        successMessage.className =
          "fixed top-4 right-4 z-50 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-2"
        successMessage.innerHTML = `
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
          </svg>
          <span>Email enviado correctamente</span>
        `
        document.body.appendChild(successMessage)
        setTimeout(() => successMessage.remove(), 5000)

        // Reset form
        setProyectoFormData({
          nombre: "",
          email: "",
          telefono: "",
          nacionalidad: "",
          titulo: "",
          area: "artes-visuales",
          duracion: "",
          participantes: "",
          descripcion: "",
          objetivos: "",
          espacios: "salon1",
          recursos: "",
        })
        setIsProyectoModalOpen(false)
        setCurrentStep(0)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "❌ Error al enviar",
        description:
          "Hubo un problema al enviar la información. Por favor intenta nuevamente o contacta a hola@animaespacio.org",
        variant: "destructive",
        duration: 10000,
      })

      // Mostrar mensaje de error visual
      const errorMessage = document.createElement("div")
      errorMessage.className =
        "fixed top-4 right-4 z-50 bg-red-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-2"
      errorMessage.innerHTML = `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
        </svg>
        <span>Error al enviar el email</span>
      `
      document.body.appendChild(errorMessage)
      setTimeout(() => errorMessage.remove(), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleActividadSubmit = async () => {
    if (!validateActividadForm(2)) return

    setIsSubmitting(true)

    // Mostrar notificación de envío inmediatamente
    toast({
      title: "Enviando información",
      description: "Por favor espera mientras procesamos la información de tu actividad...",
    })

    try {
      const result = await sendEmail("activity", actividadFormData)

      if (result.success) {
        toast({
          title: "✅ Información enviada exitosamente",
          description: "Hemos recibido la información de tu actividad. La difundiremos a través de nuestros canales.",
          duration: 8000,
        })

        // Mostrar mensaje de éxito visual
        const successMessage = document.createElement("div")
        successMessage.className =
          "fixed top-4 right-4 z-50 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-2"
        successMessage.innerHTML = `
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
          </svg>
          <span>Email enviado correctamente</span>
        `
        document.body.appendChild(successMessage)
        setTimeout(() => successMessage.remove(), 5000)

        // Reset form
        setActividadFormData({
          titulo: "",
          responsable: "",
          email: "",
          telefono: "",
          fecha: "",
          horaInicio: "",
          horaFin: "",
          espacio: "salon1",
          publico: "",
          aforo: "",
          precio: "",
          descripcion: "",
          redes: "",
          observaciones: "",
        })
        setIsActividadesModalOpen(false)
        setCurrentStep(0)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "❌ Error al enviar",
        description:
          "Hubo un problema al enviar la información. Por favor intenta nuevamente o contacta a hola@animaespacio.org",
        variant: "destructive",
        duration: 10000,
      })

      // Mostrar mensaje de error visual
      const errorMessage = document.createElement("div")
      errorMessage.className =
        "fixed top-4 right-4 z-50 bg-red-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-2"
      errorMessage.innerHTML = `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
        </svg>
        <span>Error al enviar el email</span>
      `
      document.body.appendChild(errorMessage)
      setTimeout(() => errorMessage.remove(), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const openWhatsApp = () => {
    window.open("https://wa.me/59899123456", "_blank")
  }

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Fondo animado */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/30 via-blue-900/20 to-transparent animate-pulse-slow"></div>
        <div
          className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/10 to-blue-500/20"
          style={{
            transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.01}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        ></div>
        <div className="absolute inset-0 backdrop-blur-[100px]"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 w-full flex flex-col min-h-screen">
        <div className="px-4 py-4">
          <SiteHeader backUrl="/" />
        </div>

        <div className="px-16 flex-1 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-light mb-4">CREAR</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Presenta tus ideas, proyectos y actividades para desarrollarlos en Ánima Espacio Cultural
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-8 flex-1 w-full pb-24"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {options.map((option, index) => (
              <motion.div
                key={option.id}
                variants={itemVariants}
                className="h-full"
                style={{
                  height: index < 2 ? "calc(50vh - 100px)" : "calc(50vh - 100px)",
                }}
              >
                {option.action === "modal" ? (
                  <Card
                    className="h-full transition-all hover:shadow-md hover:border-primary/50 cursor-pointer bg-white/5 backdrop-blur-sm border-white/10 relative overflow-hidden flex flex-col"
                    onClick={() => handleOptionClick(option)}
                  >
                    <div className="absolute inset-0 z-0">
                      <img
                        src={option.bgImage || "/placeholder.svg"}
                        alt={option.title}
                        className="w-full h-full object-cover opacity-30"
                      />
                      <div className="absolute inset-0 bg-black/60"></div>
                    </div>
                    <CardHeader className="relative z-10 p-8 flex-grow flex flex-col items-center justify-center text-center">
                      <div className="flex items-center gap-3 mb-4">
                        {option.icon}
                        <CardTitle className="text-2xl font-light">{option.title}</CardTitle>
                      </div>
                      <CardDescription className="text-base">{option.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="relative z-10 p-8 pt-0 flex justify-center">
                      <Button variant="outline">Acceder</Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <Link href={option.href} className="h-full block">
                    <Card className="h-full transition-all hover:shadow-md hover:border-primary/50 bg-white/5 backdrop-blur-sm border-white/10 relative overflow-hidden flex flex-col">
                      <div className="absolute inset-0 z-0">
                        <img
                          src={option.bgImage || "/placeholder.svg"}
                          alt={option.title}
                          className="w-full h-full object-cover opacity-30"
                        />
                        <div className="absolute inset-0 bg-black/60"></div>
                      </div>
                      <CardHeader className="relative z-10 p-8 flex-grow flex flex-col items-center justify-center text-center">
                        <div className="flex items-center gap-3 mb-4">
                          {option.icon}
                          <CardTitle className="text-2xl font-light">{option.title}</CardTitle>
                        </div>
                        <CardDescription className="text-base">{option.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="relative z-10 p-8 pt-0 flex justify-center">
                        <Button variant="outline">Acceder</Button>
                      </CardFooter>
                    </Card>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Botones de acción */}
      <ActionButtons />

      {/* Modal de Propuesta de Proyectos */}
      <Dialog open={isProyectoModalOpen} onOpenChange={setIsProyectoModalOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white/10 backdrop-blur-xl border-white/20">
          <DialogHeader className="p-8 pb-0">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-white" />
                <DialogTitle className="text-2xl font-light">PROPUESTA DE PROYECTOS</DialogTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsProyectoModalOpen(false)}
                className="rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription className="mt-2">
              Presenta tu idea o proyecto para desarrollarlo en Ánima Espacio Cultural
            </DialogDescription>
          </DialogHeader>

          <div className="p-8">
            <Tabs value={`step-${currentStep}`} className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger
                  value="step-0"
                  disabled={currentStep !== 0}
                  className="data-[state=active]:bg-white data-[state=active]:text-black"
                >
                  Introducción
                </TabsTrigger>
                <TabsTrigger
                  value="step-1"
                  disabled={currentStep !== 1}
                  className="data-[state=active]:bg-white data-[state=active]:text-black"
                >
                  Información Personal
                </TabsTrigger>
                <TabsTrigger
                  value="step-2"
                  disabled={currentStep !== 2}
                  className="data-[state=active]:bg-white data-[state=active]:text-black"
                >
                  Detalles del Proyecto
                </TabsTrigger>
                <TabsTrigger
                  value="step-3"
                  disabled={currentStep !== 3}
                  className="data-[state=active]:bg-white data-[state=active]:text-black"
                >
                  Recursos y Finalización
                </TabsTrigger>
              </TabsList>

              <TabsContent value="step-0" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-light mb-4">Llamado a proyectos</h3>
                    <div className="prose prose-invert">
                      <p>
                        Un proyecto en Ánima es una oportunidad para desarrollar ideas creativas en un espacio
                        colaborativo y enriquecedor, conectando con la comunidad artística local e internacional.
                      </p>
                      <p>
                        Este formulario tiene como objetivo ofrecer un espacio abierto a proyectos que busquen ser
                        hospedados en Ánima Espacio Cultural.
                      </p>
                      <p className="font-medium">
                        Antes de rellenar este formulario, y si aún no lo hiciste, te recomendamos leer nuestras bases y
                        fundamentos{" "}
                        <a
                          href="https://comunidad.animaespacio.org"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          aquí
                        </a>
                        .
                      </p>
                      <h4 className="text-lg font-medium mt-6 mb-2">Para completar este formulario necesitarás:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Información personal y de contacto</li>
                        <li>Descripción detallada de tu proyecto</li>
                        <li>Cronograma tentativo de actividades</li>
                        <li>Recursos necesarios para su desarrollo</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <img
                      src="/placeholder.svg?height=600&width=600"
                      alt="Proyectos en Ánima"
                      className="w-full h-auto rounded-lg object-cover aspect-[4/3] mb-6"
                    />
                    <div className="bg-white/5 p-6 rounded-lg">
                      <h4 className="text-lg font-medium mb-4">¿Necesitas ayuda?</h4>
                      <p className="text-muted-foreground mb-4">
                        Si tienes dudas o necesitas asistencia para completar este formulario, no dudes en contactarnos:
                      </p>
                      <div className="flex flex-wrap gap-3 justify-center">
                        <Button variant="outline" size="sm" onClick={openWhatsApp} className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          WhatsApp
                        </Button>
                        <Button variant="outline" size="sm" asChild className="flex items-center gap-2">
                          <a href="tel:+59812345678">
                            <Phone className="h-4 w-4" />
                            Llamar
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild className="flex items-center gap-2">
                          <Link href="/contact">
                            <Send className="h-4 w-4" />
                            Formulario
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="step-1" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre completo</Label>
                        <Input
                          id="nombre"
                          placeholder="Tu nombre completo"
                          value={proyectoFormData.nombre}
                          onChange={(e) => setProyectoFormData((prev) => ({ ...prev, nombre: e.target.value }))}
                          className={proyectoErrors.nombre ? "border-red-500" : ""}
                        />
                        {proyectoErrors.nombre && (
                          <p className="text-sm font-medium text-red-500">{proyectoErrors.nombre}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="tu@email.com"
                          value={proyectoFormData.email}
                          onChange={(e) => setProyectoFormData((prev) => ({ ...prev, email: e.target.value }))}
                          className={proyectoErrors.email ? "border-red-500" : ""}
                        />
                        {proyectoErrors.email && (
                          <p className="text-sm font-medium text-red-500">{proyectoErrors.email}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefono">Teléfono</Label>
                        <Input
                          id="telefono"
                          placeholder="+598 XX XXX XXX"
                          value={proyectoFormData.telefono}
                          onChange={(e) => setProyectoFormData((prev) => ({ ...prev, telefono: e.target.value }))}
                          className={proyectoErrors.telefono ? "border-red-500" : ""}
                        />
                        {proyectoErrors.telefono && (
                          <p className="text-sm font-medium text-red-500">{proyectoErrors.telefono}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nacionalidad">Nacionalidad</Label>
                        <Input
                          id="nacionalidad"
                          placeholder="Tu nacionalidad"
                          value={proyectoFormData.nacionalidad}
                          onChange={(e) => setProyectoFormData((prev) => ({ ...prev, nacionalidad: e.target.value }))}
                          className={proyectoErrors.nacionalidad ? "border-red-500" : ""}
                        />
                        {proyectoErrors.nacionalidad && (
                          <p className="text-sm font-medium text-red-500">{proyectoErrors.nacionalidad}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 p-6 rounded-lg">
                    <h3 className="text-xl font-light mb-4">¿Por qué presentar tu proyecto en Ánima?</h3>
                    <p className="text-muted-foreground mb-4">
                      Ánima Espacio Cultural es un lugar de encuentro para artistas, gestores y creadores que buscan
                      desarrollar sus proyectos en un entorno colaborativo y enriquecedor.
                    </p>
                    <p className="text-muted-foreground mb-4">Al presentar tu proyecto en Ánima, tendrás acceso a:</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>Espacios versátiles para diferentes tipos de actividades</li>
                      <li>Comunidad activa de artistas y colaboradores</li>
                      <li>Apoyo en la difusión y comunicación</li>
                      <li>Posibilidad de vinculación con otros proyectos</li>
                    </ul>
                    <p className="text-muted-foreground">
                      Buscamos proyectos que dialoguen con el contexto local, promuevan el intercambio cultural y
                      contribuyan a la escena artística de Montevideo.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="step-2" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="titulo">Título del proyecto</Label>
                        <Input
                          id="titulo"
                          placeholder="Nombre de tu proyecto"
                          value={proyectoFormData.titulo}
                          onChange={(e) => setProyectoFormData((prev) => ({ ...prev, titulo: e.target.value }))}
                          className={proyectoErrors.titulo ? "border-red-500" : ""}
                        />
                        {proyectoErrors.titulo && (
                          <p className="text-sm font-medium text-red-500">{proyectoErrors.titulo}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="descripcion">Descripción</Label>
                        <Textarea
                          id="descripcion"
                          placeholder="Describe brevemente tu proyecto..."
                          className={`min-h-[120px] ${proyectoErrors.descripcion ? "border-red-500" : ""}`}
                          value={proyectoFormData.descripcion}
                          onChange={(e) => setProyectoFormData((prev) => ({ ...prev, descripcion: e.target.value }))}
                        />
                        {proyectoErrors.descripcion && (
                          <p className="text-sm font-medium text-red-500">{proyectoErrors.descripcion}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="objetivos">Objetivos</Label>
                        <Textarea
                          id="objetivos"
                          placeholder="¿Qué buscas lograr con este proyecto?"
                          className={`min-h-[80px] ${proyectoErrors.objetivos ? "border-red-500" : ""}`}
                          value={proyectoFormData.objetivos}
                          onChange={(e) => setProyectoFormData((prev) => ({ ...prev, objetivos: e.target.value }))}
                        />
                        {proyectoErrors.objetivos && (
                          <p className="text-sm font-medium text-red-500">{proyectoErrors.objetivos}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Área principal</Label>
                        <RadioGroup
                          value={proyectoFormData.area}
                          onValueChange={(value) => setProyectoFormData((prev) => ({ ...prev, area: value }))}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="artes-visuales" id="artes-visuales" />
                            <Label htmlFor="artes-visuales">Artes visuales</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="artes-escenicas" id="artes-escenicas" />
                            <Label htmlFor="artes-escenicas">Artes escénicas</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="musica" id="musica" />
                            <Label htmlFor="musica">Música</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="literatura" id="literatura" />
                            <Label htmlFor="literatura">Literatura</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="interdisciplinar" id="interdisciplinar" />
                            <Label htmlFor="interdisciplinar">Interdisciplinar</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="otro" id="otro" />
                            <Label htmlFor="otro">Otro</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duracion">Duración estimada</Label>
                        <Input
                          id="duracion"
                          placeholder="Ej: 3 meses, 1 semana, etc."
                          value={proyectoFormData.duracion}
                          onChange={(e) => setProyectoFormData((prev) => ({ ...prev, duracion: e.target.value }))}
                          className={proyectoErrors.duracion ? "border-red-500" : ""}
                        />
                        {proyectoErrors.duracion && (
                          <p className="text-sm font-medium text-red-500">{proyectoErrors.duracion}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="participantes">Número de participantes</Label>
                        <Input
                          id="participantes"
                          type="number"
                          placeholder="Ej: 5"
                          value={proyectoFormData.participantes}
                          onChange={(e) => setProyectoFormData((prev) => ({ ...prev, participantes: e.target.value }))}
                          className={proyectoErrors.participantes ? "border-red-500" : ""}
                        />
                        {proyectoErrors.participantes && (
                          <p className="text-sm font-medium text-red-500">{proyectoErrors.participantes}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="step-3" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="recursos">Recursos necesarios</Label>
                        <Textarea
                          id="recursos"
                          placeholder="¿Qué recursos necesitas para desarrollar tu proyecto?"
                          className={`min-h-[120px] ${proyectoErrors.recursos ? "border-red-500" : ""}`}
                          value={proyectoFormData.recursos}
                          onChange={(e) => setProyectoFormData((prev) => ({ ...prev, recursos: e.target.value }))}
                        />
                        {proyectoErrors.recursos && (
                          <p className="text-sm font-medium text-red-500">{proyectoErrors.recursos}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="espacios">Espacios requeridos</Label>
                        <RadioGroup
                          value={proyectoFormData.espacios}
                          onValueChange={(value) => setProyectoFormData((prev) => ({ ...prev, espacios: value }))}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="salon1" id="salon1" />
                            <Label htmlFor="salon1">Salón 1</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="salon2" id="salon2" />
                            <Label htmlFor="salon2">Salón 2</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="salon3" id="salon3" />
                            <Label htmlFor="salon3">Salón 3</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="salon4" id="salon4" />
                            <Label htmlFor="salon4">Salón 4</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="salon5" id="salon5" />
                            <Label htmlFor="salon5">Salón 5</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="casa" id="casa" />
                            <Label htmlFor="casa">Casa</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 p-6 rounded-lg">
                    <h3 className="text-xl font-light mb-4">Proceso de selección</h3>
                    <p className="text-muted-foreground mb-4">
                      Una vez enviada tu propuesta, nuestro equipo la evaluará según los siguientes criterios:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>Calidad y coherencia de la propuesta</li>
                      <li>Viabilidad técnica y económica</li>
                      <li>Pertinencia con los objetivos de Ánima</li>
                      <li>Impacto en la comunidad</li>
                      <li>Originalidad e innovación</li>
                    </ul>
                    <p className="text-muted-foreground mb-4">
                      Te contactaremos en un plazo máximo de 15 días para informarte sobre el resultado de la
                      evaluación.
                    </p>
                    <p className="text-muted-foreground">
                      Si tienes dudas o necesitas más información, no dudes en contactarnos.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter className="p-8 pt-0 flex flex-col sm:flex-row gap-4">
            {currentStep > 0 && (
              <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)} disabled={isSubmitting}>
                Anterior
              </Button>
            )}
            <div className="flex-1"></div>
            {currentStep < 3 ? (
              <Button onClick={handleProyectoNext} disabled={isSubmitting}>
                {currentStep === 0 ? "Comenzar" : "Siguiente"} <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleProyectoSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="mr-2">Enviando</span>
                    <span className="animate-spin">⋯</span>
                  </span>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar propuesta
                  </>
                )}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Comunicación de Actividades */}
      <Dialog open={isActividadesModalOpen} onOpenChange={setIsActividadesModalOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white/10 backdrop-blur-xl border-white/20">
          <DialogHeader className="p-8 pb-0">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-white" />
                <DialogTitle className="text-2xl font-light">COMUNICACIÓN DE ACTIVIDADES</DialogTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsActividadesModalOpen(false)}
                className="rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription className="mt-2">
              Comparte información sobre tus actividades en Ánima Espacio Cultural
            </DialogDescription>
          </DialogHeader>

          <div className="p-8">
            <Tabs value={`step-${currentStep}`} className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger
                  value="step-0"
                  disabled={currentStep !== 0}
                  className="data-[state=active]:bg-white data-[state=active]:text-black"
                >
                  Introducción
                </TabsTrigger>
                <TabsTrigger
                  value="step-1"
                  disabled={currentStep !== 1}
                  className="data-[state=active]:bg-white data-[state=active]:text-black"
                >
                  Información Básica
                </TabsTrigger>
                <TabsTrigger
                  value="step-2"
                  disabled={currentStep !== 2}
                  className="data-[state=active]:bg-white data-[state=active]:text-black"
                >
                  Detalles de la Actividad
                </TabsTrigger>
                <TabsTrigger
                  value="step-3"
                  disabled={currentStep !== 3}
                  className="data-[state=active]:bg-white data-[state=active]:text-black"
                >
                  Materiales y Finalización
                </TabsTrigger>
              </TabsList>

              <TabsContent value="step-0" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-light mb-4">Contenidos para comunicar las actividades</h3>
                    <div className="prose prose-invert">
                      <p>
                        Una vez coordinado tu proyecto con los gestores, completa este formulario detalladamente con la
                        información sobre la actividad, pensando en los usuarios finales.
                      </p>
                      <p>
                        Esta información será utilizada únicamente para crear gráficas y piezas para difundir en las
                        redes de Ánima Espacio Cultural.
                      </p>
                      <h4 className="text-lg font-medium mt-6 mb-2">Para completar este formulario necesitarás:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Información básica de la actividad (título, responsable, contacto)</li>
                        <li>Detalles específicos (fecha, hora, espacio, aforo)</li>
                        <li>Descripción clara y concisa para el público objetivo</li>
                        <li>Materiales promocionales (imágenes, flyers, enlaces)</li>
                      </ul>
                      <p className="mt-4">
                        Recuerda que cuanto más completa sea la información proporcionada, mejor podremos comunicar tu
                        actividad.
                      </p>
                    </div>
                  </div>
                  <div>
                    <img
                      src="/placeholder.svg?height=600&width=600"
                      alt="Actividades en Ánima"
                      className="w-full h-auto rounded-lg object-cover aspect-[4/3] mb-6"
                    />
                    <div className="bg-white/5 p-6 rounded-lg">
                      <h4 className="text-lg font-medium mb-4">¿Necesitas ayuda?</h4>
                      <p className="text-muted-foreground mb-4">
                        Si tienes dudas o necesitas asistencia para completar este formulario, contáctanos:
                      </p>
                      <div className="flex flex-wrap gap-3 justify-center">
                        <Button variant="outline" size="sm" onClick={openWhatsApp} className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          WhatsApp
                        </Button>
                        <Button variant="outline" size="sm" asChild className="flex items-center gap-2">
                          <a href="tel:+59812345678">
                            <Phone className="h-4 w-4" />
                            Llamar
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild className="flex items-center gap-2">
                          <Link href="/contact">
                            <HelpCircle className="h-4 w-4" />
                            Más información
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="step-1" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="act-titulo">Título de la actividad</Label>
                        <Input
                          id="act-titulo"
                          placeholder="Nombre de tu actividad"
                          value={actividadFormData.titulo}
                          onChange={(e) => setActividadFormData((prev) => ({ ...prev, titulo: e.target.value }))}
                          className={actividadErrors.titulo ? "border-red-500" : ""}
                        />
                        {actividadErrors.titulo && (
                          <p className="text-sm font-medium text-red-500">{actividadErrors.titulo}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="act-responsable">Responsable/Organizador</Label>
                        <Input
                          id="act-responsable"
                          placeholder="Nombre del responsable o colectivo"
                          value={actividadFormData.responsable}
                          onChange={(e) => setActividadFormData((prev) => ({ ...prev, responsable: e.target.value }))}
                          className={actividadErrors.responsable ? "border-red-500" : ""}
                        />
                        {actividadErrors.responsable && (
                          <p className="text-sm font-medium text-red-500">{actividadErrors.responsable}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="act-email">Correo electrónico</Label>
                        <Input
                          id="act-email"
                          type="email"
                          placeholder="tu@email.com"
                          value={actividadFormData.email}
                          onChange={(e) => setActividadFormData((prev) => ({ ...prev, email: e.target.value }))}
                          className={actividadErrors.email ? "border-red-500" : ""}
                        />
                        {actividadErrors.email && (
                          <p className="text-sm font-medium text-red-500">{actividadErrors.email}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="act-telefono">Teléfono de contacto</Label>
                        <Input
                          id="act-telefono"
                          placeholder="+598 XX XXX XXX"
                          value={actividadFormData.telefono}
                          onChange={(e) => setActividadFormData((prev) => ({ ...prev, telefono: e.target.value }))}
                          className={actividadErrors.telefono ? "border-red-500" : ""}
                        />
                        {actividadErrors.telefono && (
                          <p className="text-sm font-medium text-red-500">{actividadErrors.telefono}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <img
                      src="/placeholder.svg?height=600&width=600"
                      alt="Actividades en Ánima"
                      className="w-full h-auto rounded-lg object-cover aspect-[4/3] mb-4"
                    />
                    <p className="text-muted-foreground">
                      Compartir información sobre tus actividades nos permite difundirlas a través de nuestros canales
                      de comunicación y ayudar a que lleguen a más personas interesadas.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="step-2" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="act-fecha">Fecha</Label>
                        <Input
                          id="act-fecha"
                          type="date"
                          value={actividadFormData.fecha}
                          onChange={(e) => setActividadFormData((prev) => ({ ...prev, fecha: e.target.value }))}
                          className={actividadErrors.fecha ? "border-red-500" : ""}
                        />
                        {actividadErrors.fecha && (
                          <p className="text-sm font-medium text-red-500">{actividadErrors.fecha}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="act-hora-inicio">Hora de inicio</Label>
                        <Input
                          id="act-hora-inicio"
                          type="time"
                          value={actividadFormData.horaInicio}
                          onChange={(e) => setActividadFormData((prev) => ({ ...prev, horaInicio: e.target.value }))}
                          className={actividadErrors.horaInicio ? "border-red-500" : ""}
                        />
                        {actividadErrors.horaInicio && (
                          <p className="text-sm font-medium text-red-500">{actividadErrors.horaInicio}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="act-hora-fin">Hora de finalización</Label>
                        <Input
                          id="act-hora-fin"
                          type="time"
                          value={actividadFormData.horaFin}
                          onChange={(e) => setActividadFormData((prev) => ({ ...prev, horaFin: e.target.value }))}
                          className={actividadErrors.horaFin ? "border-red-500" : ""}
                        />
                        {actividadErrors.horaFin && (
                          <p className="text-sm font-medium text-red-500">{actividadErrors.horaFin}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="act-espacio">Espacio</Label>
                        <RadioGroup
                          value={actividadFormData.espacio}
                          onValueChange={(value) => setActividadFormData((prev) => ({ ...prev, espacio: value }))}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="salon1" id="act-salon1" />
                            <Label htmlFor="act-salon1">Salón 1</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="salon2" id="act-salon2" />
                            <Label htmlFor="act-salon2">Salón 2</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="salon3" id="act-salon3" />
                            <Label htmlFor="act-salon3">Salón 3</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="salon4" id="act-salon4" />
                            <Label htmlFor="act-salon4">Salón 4</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="salon5" id="act-salon5" />
                            <Label htmlFor="act-salon5">Salón 5</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="casa" id="act-casa" />
                            <Label htmlFor="act-casa">Casa</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="act-descripcion">Descripción</Label>
                        <Textarea
                          id="act-descripcion"
                          placeholder="Describe brevemente la actividad..."
                          className={`min-h-[120px] ${actividadErrors.descripcion ? "border-red-500" : ""}`}
                          value={actividadFormData.descripcion}
                          onChange={(e) => setActividadFormData((prev) => ({ ...prev, descripcion: e.target.value }))}
                        />
                        {actividadErrors.descripcion && (
                          <p className="text-sm font-medium text-red-500">{actividadErrors.descripcion}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="act-publico">Público objetivo</Label>
                        <Input
                          id="act-publico"
                          placeholder="Ej: Todo público, adultos, niños, etc."
                          value={actividadFormData.publico}
                          onChange={(e) => setActividadFormData((prev) => ({ ...prev, publico: e.target.value }))}
                          className={actividadErrors.publico ? "border-red-500" : ""}
                        />
                        {actividadErrors.publico && (
                          <p className="text-sm font-medium text-red-500">{actividadErrors.publico}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="act-aforo">Aforo máximo</Label>
                        <Input
                          id="act-aforo"
                          type="number"
                          placeholder="Ej: 30"
                          value={actividadFormData.aforo}
                          onChange={(e) => setActividadFormData((prev) => ({ ...prev, aforo: e.target.value }))}
                          className={actividadErrors.aforo ? "border-red-500" : ""}
                        />
                        {actividadErrors.aforo && (
                          <p className="text-sm font-medium text-red-500">{actividadErrors.aforo}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="act-precio">Precio (si aplica)</Label>
                        <Input
                          id="act-precio"
                          placeholder="Ej: $200, Entrada libre, etc."
                          value={actividadFormData.precio}
                          onChange={(e) => setActividadFormData((prev) => ({ ...prev, precio: e.target.value }))}
                          className={actividadErrors.precio ? "border-red-500" : ""}
                        />
                        {actividadErrors.precio && (
                          <p className="text-sm font-medium text-red-500">{actividadErrors.precio}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="step-3" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="act-redes">Enlaces a redes sociales</Label>
                        <Input
                          id="act-redes"
                          placeholder="Instagram, Facebook, etc."
                          value={actividadFormData.redes}
                          onChange={(e) => setActividadFormData((prev) => ({ ...prev, redes: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="act-observaciones">Observaciones adicionales</Label>
                        <Textarea
                          id="act-observaciones"
                          placeholder="Cualquier información adicional que consideres relevante..."
                          className="min-h-[80px]"
                          value={actividadFormData.observaciones}
                          onChange={(e) => setActividadFormData((prev) => ({ ...prev, observaciones: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <img
                      src="/placeholder.svg?height=600&width=600"
                      alt="Difusión de actividades"
                      className="w-full h-auto rounded-lg object-cover aspect-[4/3] mb-4"
                    />
                    <div className="bg-white/5 p-6 rounded-lg">
                      <h3 className="text-xl font-light mb-4">Canales de difusión</h3>
                      <p className="text-muted-foreground mb-4">
                        Tu actividad será difundida a través de los siguientes canales:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Sitio web de Ánima Espacio Cultural</li>
                        <li>Redes sociales (Instagram, Facebook)</li>
                        <li>Newsletter mensual</li>
                        <li>Cartelera física en el espacio</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter className="p-8 pt-0 flex flex-col sm:flex-row gap-4">
            {currentStep > 0 && (
              <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)} disabled={isSubmitting}>
                Anterior
              </Button>
            )}
            <div className="flex-1"></div>
            {currentStep < 3 ? (
              <Button onClick={handleActividadNext} disabled={isSubmitting}>
                {currentStep === 0 ? "Comenzar" : "Siguiente"} <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleActividadSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="mr-2">Enviando</span>
                    <span className="animate-spin">⋯</span>
                  </span>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar información
                  </>
                )}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
