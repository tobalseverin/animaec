import { Resend } from "resend"
import type { NextRequest } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

// TypeScript interfaces for different form types
interface ContactFormData {
  name: string
  email: string
  message: string
}

interface ProjectFormData {
  nombre: string
  email: string
  telefono: string
  nacionalidad: string
  titulo: string
  area: string
  duracion: string
  participantes: string
  descripcion: string
  objetivos: string
  espacios: string
  recursos: string
}

interface ActivityFormData {
  titulo: string
  responsable: string
  email: string
  telefono: string
  fecha: string
  horaInicio: string
  horaFin: string
  espacio: string
  publico: string
  aforo: string
  precio: string
  descripcion: string
  redes: string
  observaciones: string
}

interface RegistrationFormData {
  eventTitle: string
  selectedPlan: string
  price: string
  fullName: string
  email: string
  phone: string
  comments: string
}

// Union type for all form data
type AllFormData = ContactFormData | ProjectFormData | ActivityFormData | RegistrationFormData

// Request body interface
interface RequestBody {
  type?: "contact" | "project" | "activity" | "registration"
  formData?: AllFormData
  // Legacy support for direct contact form
  name?: string
  email?: string
  message?: string
}

// Function to format different types of emails
function formatEmailContent(type: string, data: any): { subject: string; html: string } {
  const timestamp = new Date().toLocaleString("es-ES", {
    timeZone: "America/Montevideo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })

  switch (type) {
    case "contact":
      return {
        subject: `Nuevo mensaje de contacto - ${data.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
              📩 Nuevo mensaje del sitio web
            </h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>🕐 Fecha:</strong> ${timestamp}</p>
              <p><strong>👤 Nombre:</strong> ${data.name}</p>
              <p><strong>📧 Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
              <h3 style="color: #495057; margin-top: 0;">📝 Mensaje:</h3>
              <p style="line-height: 1.6; color: #212529;">${data.message.replace(/\n/g, "<br>")}</p>
            </div>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #dee2e6;">
            <p style="color: #6c757d; font-size: 14px; text-align: center;">
              Enviado desde: <strong>Ánima Espacio Cultural</strong>
            </p>
          </div>
        `,
      }

    case "project":
      return {
        subject: `Nueva propuesta de proyecto - ${data.titulo}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #28a745; padding-bottom: 10px;">
              🎨 Nueva propuesta de proyecto
            </h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>🕐 Fecha:</strong> ${timestamp}</p>
              <p><strong>📋 Título:</strong> ${data.titulo}</p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #495057;">👤 Información Personal</h3>
              <p><strong>Nombre:</strong> ${data.nombre}</p>
              <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
              <p><strong>Teléfono:</strong> ${data.telefono}</p>
              <p><strong>Nacionalidad:</strong> ${data.nacionalidad}</p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #495057;">🎯 Detalles del Proyecto</h3>
              <p><strong>Área:</strong> ${data.area}</p>
              <p><strong>Duración:</strong> ${data.duracion}</p>
              <p><strong>Participantes:</strong> ${data.participantes}</p>
              <p><strong>Espacios:</strong> ${data.espacios}</p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #495057;">📝 Descripción</h3>
              <p style="line-height: 1.6;">${data.descripcion.replace(/\n/g, "<br>")}</p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #495057;">🎯 Objetivos</h3>
              <p style="line-height: 1.6;">${data.objetivos.replace(/\n/g, "<br>")}</p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #495057;">🛠️ Recursos Necesarios</h3>
              <p style="line-height: 1.6;">${data.recursos.replace(/\n/g, "<br>")}</p>
            </div>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #dee2e6;">
            <p style="color: #6c757d; font-size: 14px; text-align: center;">
              Enviado desde: <strong>Ánima Espacio Cultural</strong>
            </p>
          </div>
        `,
      }

    case "activity":
      return {
        subject: `Nueva comunicación de actividad - ${data.titulo}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #ffc107; padding-bottom: 10px;">
              📅 Nueva comunicación de actividad
            </h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>🕐 Fecha de envío:</strong> ${timestamp}</p>
              <p><strong>🎭 Título:</strong> ${data.titulo}</p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #495057;">👤 Información Básica</h3>
              <p><strong>Responsable:</strong> ${data.responsable}</p>
              <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
              <p><strong>Teléfono:</strong> ${data.telefono}</p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #495057;">📅 Detalles de la Actividad</h3>
              <p><strong>Fecha:</strong> ${data.fecha}</p>
              <p><strong>Hora:</strong> ${data.horaInicio} - ${data.horaFin}</p>
              <p><strong>Espacio:</strong> ${data.espacio}</p>
              <p><strong>Público:</strong> ${data.publico}</p>
              <p><strong>Aforo:</strong> ${data.aforo}</p>
              <p><strong>Precio:</strong> ${data.precio}</p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #495057;">📝 Descripción</h3>
              <p style="line-height: 1.6;">${data.descripcion.replace(/\n/g, "<br>")}</p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #495057;">🌐 Redes Sociales</h3>
              <p>${data.redes || "No especificado"}</p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #495057;">📋 Observaciones</h3>
              <p>${data.observaciones || "Ninguna"}</p>
            </div>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #dee2e6;">
            <p style="color: #6c757d; font-size: 14px; text-align: center;">
              Enviado desde: <strong>Ánima Espacio Cultural</strong>
            </p>
          </div>
        `,
      }

    case "registration":
      return {
        subject: `Nueva inscripción - ${data.eventTitle}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #dc3545; padding-bottom: 10px;">
              🎫 Nueva inscripción
            </h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>🕐 Fecha:</strong> ${timestamp}</p>
              <p><strong>🎭 Actividad:</strong> ${data.eventTitle}</p>
              <p><strong>💰 Plan:</strong> ${data.selectedPlan} - ${data.price}</p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #495057;">👤 Datos del Participante</h3>
              <p><strong>Nombre:</strong> ${data.fullName}</p>
              <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
              <p><strong>Teléfono:</strong> ${data.phone}</p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #495057;">💬 Comentarios</h3>
              <p style="line-height: 1.6;">${data.comments || "Sin comentarios"}</p>
            </div>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #dee2e6;">
            <p style="color: #6c757d; font-size: 14px; text-align: center;">
              Enviado desde: <strong>Ánima Espacio Cultural</strong>
            </p>
          </div>
        `,
      }

    default:
      return {
        subject: `Nuevo mensaje - ${type}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">📩 Nuevo mensaje</h2>
            <p><strong>Fecha:</strong> ${timestamp}</p>
            <p><strong>Tipo:</strong> ${type}</p>
            <pre style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; overflow-x: auto;">
              ${JSON.stringify(data, null, 2)}
            </pre>
            <hr>
            <p style="color: #6c757d; font-size: 14px; text-align: center;">
              Enviado desde: <strong>Ánima Espacio Cultural</strong>
            </p>
          </div>
        `,
      }
  }
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body: RequestBody = await request.json()

    console.log("📨 Received request:", {
      hasType: !!body.type,
      hasFormData: !!body.formData,
      hasLegacyData: !!(body.name && body.email && body.message),
      bodyKeys: Object.keys(body),
      timestamp: new Date().toISOString(),
    })

    let messageType: string
    let messageData: any

    // Handle different request formats
    if (body.type && body.formData) {
      messageType = body.type
      messageData = body.formData
    } else if (body.name && body.email && body.message) {
      messageType = "contact"
      messageData = {
        name: body.name,
        email: body.email,
        message: body.message,
      }
    } else {
      console.error("❌ Invalid request format:", body)
      return Response.json(
        {
          success: false,
          error: "Formato de solicitud inválido. Se esperaba {type, formData} o {name, email, message}",
          details: "Los datos enviados no tienen el formato correcto",
        },
        { status: 400 },
      )
    }

    // Validate required fields for contact form
    if (messageType === "contact") {
      const { name, email, message } = messageData
      if (!name?.trim() || !email?.trim() || !message?.trim()) {
        console.error("❌ Missing required contact fields:", { name: !!name, email: !!email, message: !!message })
        return Response.json(
          {
            success: false,
            error: "Faltan campos requeridos: nombre, email y mensaje",
            details: "Todos los campos marcados con * son obligatorios",
          },
          { status: 400 },
        )
      }
    }

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY not configured")
      return Response.json(
        {
          success: false,
          error: "Servicio de email no configurado",
          details: "La clave API de Resend no está configurada en el servidor",
        },
        { status: 500 },
      )
    }

    // Format email content
    console.log(`📝 Formatting ${messageType} email...`)
    const { subject, html } = formatEmailContent(messageType, messageData)

    // Send email with Resend
    console.log("📧 Sending email with Resend...")
    try {
      const emailResult = await resend.emails.send({
        from: "Ánima Espacio Cultural <noreply@animaespacio.org>",
        to: "hola@animaespacio.org",
        subject: subject,
        html: html,
      })

      if (!emailResult.data?.id) {
        throw new Error("No se recibió confirmación del envío del email")
      }

      console.log("✅ Email sent successfully:", {
        type: messageType,
        emailId: emailResult.data.id,
      })

      return Response.json(
        {
          success: true,
          message: "Email enviado correctamente",
          type: messageType,
          email_id: emailResult.data.id,
          timestamp: new Date().toISOString(),
        },
        { status: 200 },
      )
    } catch (resendError) {
      console.error("❌ Resend API error:", resendError)

      let errorMessage = "Error al enviar el email"
      let errorDetails = "Error desconocido del servicio de email"

      if (resendError instanceof Error) {
        if (resendError.message.includes("API key")) {
          errorMessage = "Error de configuración del servicio de email"
          errorDetails = "La clave API no es válida o ha expirado"
        } else if (resendError.message.includes("rate")) {
          errorMessage = "Demasiados emails enviados"
          errorDetails = "Se ha alcanzado el límite de envíos. Intenta nuevamente en unos minutos"
        } else if (resendError.message.includes("domain")) {
          errorMessage = "Error de configuración del dominio"
          errorDetails = "El dominio de envío no está configurado correctamente"
        } else {
          errorDetails = resendError.message
        }
      }

      return Response.json(
        {
          success: false,
          error: errorMessage,
          details: errorDetails,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("🚨 API route error:", error)

    if (error instanceof SyntaxError) {
      return Response.json(
        {
          success: false,
          error: "Formato JSON inválido en la solicitud",
          details: "Los datos enviados no tienen un formato JSON válido",
        },
        { status: 400 },
      )
    }

    return Response.json(
      {
        success: false,
        error: "Error interno del servidor",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}

// GET endpoint for testing configuration
export async function GET(): Promise<Response> {
  const resendApiKey = process.env.RESEND_API_KEY

  console.log("🔍 GET request - Configuration test")

  const configStatus = {
    timestamp: new Date().toISOString(),
    email_configured: !!resendApiKey,
    configuration: {
      has_resend_api_key: !!resendApiKey,
      resend_key_length: resendApiKey?.length || 0,
      destination_email: "hola@animaespacio.org",
      from_email: "noreply@animaespacio.org",
    },
  }

  console.log("🔍 Configuration status:", configStatus)

  return Response.json(configStatus)
}
