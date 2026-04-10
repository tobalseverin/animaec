"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, CheckCircle, XCircle, Loader2 } from "lucide-react"

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState<{
    show: boolean
    type: "success" | "error" | "loading"
    message: string
  }>({
    show: false,
    type: "loading",
    message: "",
  })

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres"
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es requerido"
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Por favor ingresa un correo electrónico válido"
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }))
    }

    // Ocultar notificación cuando el usuario empiece a escribir
    if (notification.show) {
      setNotification((prev) => ({ ...prev, show: false }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // MOSTRAR NOTIFICACIÓN INMEDIATAMENTE
    setIsSubmitting(true)
    setNotification({
      show: true,
      type: "loading",
      message: "📤 Enviando tu mensaje...",
    })

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      })

      let result
      try {
        result = await response.json()
      } catch (parseError) {
        throw new Error(`El servidor devolvió una respuesta inválida`)
      }

      if (!response.ok) {
        const errorMessage = result.details || result.error || `Error HTTP ${response.status}`
        throw new Error(errorMessage)
      }

      if (!result.success) {
        throw new Error(result.error || result.details || "El mensaje no pudo ser enviado")
      }

      // ÉXITO
      setNotification({
        show: true,
        type: "success",
        message: "✅ ¡Mensaje enviado exitosamente! Te responderemos pronto.",
      })

      // Limpiar formulario
      setFormData({
        name: "",
        email: "",
        message: "",
      })
      setErrors({})
    } catch (error) {
      // ERROR
      let errorMessage = "❌ Error al enviar el mensaje. "

      if (error instanceof Error) {
        if (error.message.includes("resend") || error.message.includes("api key")) {
          errorMessage += "Error de configuración del servicio."
        } else if (error.message.includes("network") || error.message.includes("fetch")) {
          errorMessage += "Verifica tu conexión a internet."
        } else {
          errorMessage += error.message
        }
      }

      setNotification({
        show: true,
        type: "error",
        message: errorMessage,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center sm:text-left">
          <CardTitle className="text-2xl font-light text-primary">Contáctanos</CardTitle>
          <CardDescription className="text-base">
            ¿Tienes alguna pregunta o propuesta? Nos encantaría escucharte.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="space-y-2">
              <Label htmlFor="contact-name" className="text-sm font-medium text-foreground">
                Nombre *
              </Label>
              <Input
                id="contact-name"
                type="text"
                placeholder="Tu nombre completo"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`transition-colors ${
                  errors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "focus:border-primary focus:ring-primary"
                }`}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                disabled={isSubmitting}
                required
              />
              {errors.name && (
                <p id="name-error" className="text-sm text-red-600" role="alert" aria-live="polite">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-email" className="text-sm font-medium text-foreground">
                Correo Electrónico *
              </Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`transition-colors ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "focus:border-primary focus:ring-primary"
                }`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                disabled={isSubmitting}
                required
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-red-600" role="alert" aria-live="polite">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-message" className="text-sm font-medium text-foreground">
                Mensaje *
              </Label>
              <Textarea
                id="contact-message"
                placeholder="¿En qué podemos ayudarte? Cuéntanos sobre tu proyecto, pregunta o propuesta..."
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className={`min-h-[120px] resize-none transition-colors ${
                  errors.message
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "focus:border-primary focus:ring-primary"
                }`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                disabled={isSubmitting}
                required
              />
              {errors.message && (
                <p id="message-error" className="text-sm text-red-600" role="alert" aria-live="polite">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send className="h-4 w-4" />
                    Enviar Mensaje
                  </span>
                )}
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">* Campos requeridos</p>
          </form>
        </CardContent>
      </Card>

      {/* NOTIFICACIÓN FORZADA CON ESTILOS INLINE */}
      {notification.show && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 9999,
            minWidth: "300px",
            maxWidth: "500px",
            padding: "16px",
            borderRadius: "8px",
            border: "3px solid",
            fontSize: "14px",
            fontWeight: "600",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            backgroundColor:
              notification.type === "loading" ? "#dbeafe" : notification.type === "success" ? "#dcfce7" : "#fee2e2",
            borderColor:
              notification.type === "loading" ? "#3b82f6" : notification.type === "success" ? "#16a34a" : "#dc2626",
            color:
              notification.type === "loading" ? "#1e40af" : notification.type === "success" ? "#166534" : "#991b1b",
          }}
          role="alert"
          aria-live="polite"
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div style={{ flexShrink: 0, marginTop: "2px" }}>
              {notification.type === "loading" && (
                <Loader2 style={{ width: "20px", height: "20px", animation: "spin 1s linear infinite" }} />
              )}
              {notification.type === "success" && (
                <CheckCircle style={{ width: "20px", height: "20px", color: "#16a34a" }} />
              )}
              {notification.type === "error" && <XCircle style={{ width: "20px", height: "20px", color: "#dc2626" }} />}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, lineHeight: "1.4" }}>{notification.message}</p>
              {notification.type === "error" && (
                <p style={{ margin: "8px 0 0 0", fontSize: "12px", opacity: 0.8 }}>
                  Si el problema persiste, contacta directamente:{" "}
                  <a href="mailto:hola@animaespacio.org" style={{ textDecoration: "underline", fontWeight: "600" }}>
                    hola@animaespacio.org
                  </a>
                </p>
              )}
            </div>
            <button
              onClick={() => setNotification((prev) => ({ ...prev, show: false }))}
              style={{
                background: "none",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
                padding: "0",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.7,
              }}
              aria-label="Cerrar notificación"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
