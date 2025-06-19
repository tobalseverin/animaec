"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Send } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { sendEmail } from "@/lib/email-service"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  })

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      message: "",
    }

    if (formData.name.length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres."
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Por favor ingresa un correo electrónico válido."
    }

    if (formData.message.length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres."
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error !== "")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const result = await sendEmail("contact", formData)

      if (result.success) {
        toast({
          title: "Mensaje enviado",
          description: "Gracias por contactarnos. Te responderemos a la brevedad.",
        })
        setFormData({ name: "", email: "", message: "" })
      } else {
        toast({
          title: "Error",
          description: result.error || "Hubo un problema al enviar tu mensaje. Por favor intenta nuevamente.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu mensaje. Por favor intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <h1 className="text-4xl font-light mb-6">Contacto</h1>
            <p className="text-xl mb-8">¿Tienes alguna pregunta o propuesta? Nos encantaría escucharte.</p>

            <div className="grid gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Dirección</h3>
                <p className="text-muted-foreground">Casa Soca, Montevideo, Uruguay</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Email</h3>
                <p className="text-muted-foreground">
                  <a href="mailto:hola@animaespacio.org" className="hover:underline">
                    hola@animaespacio.org
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Redes Sociales</h3>
                <div className="flex gap-4">
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
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Envíanos un mensaje</CardTitle>
                <CardDescription>Completa el formulario y te responderemos a la brevedad.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Nombre
                    </label>
                    <Input
                      id="name"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-sm font-medium text-red-500">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Correo electrónico
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-sm font-medium text-red-500">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Mensaje
                    </label>
                    <Textarea
                      id="message"
                      placeholder="¿En qué podemos ayudarte?"
                      className={`min-h-[120px] ${errors.message ? "border-red-500" : ""}`}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                    />
                    {errors.message && <p className="text-sm font-medium text-red-500">{errors.message}</p>}
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <span className="mr-2">Enviando</span>
                        <span className="animate-spin">⋯</span>
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <span className="mr-2">Enviar mensaje</span>
                        <Send className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
