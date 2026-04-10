export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface ProjectFormData {
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

export interface ActivityFormData {
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

export interface RegistrationFormData {
  eventTitle: string
  selectedPlan: string
  price: string
  fullName: string
  email: string
  phone: string
  comments: string
}

export type FormData = ContactFormData | ProjectFormData | ActivityFormData | RegistrationFormData

export async function sendEmail(type: "contact" | "project" | "activity" | "registration", formData: FormData) {
  try {
    console.log("🔄 Email service - sending request:", { type })

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        formData,
      }),
    })

    console.log("📡 Email service - response status:", response.status, response.statusText)

    let result
    try {
      result = await response.json()
      console.log("📡 Email service - parsed response:", result)
    } catch (parseError) {
      console.error("❌ Email service - failed to parse JSON:", parseError)
      const textResponse = await response.text()
      console.error("❌ Email service - raw response:", textResponse)
      throw new Error(`Server returned invalid response. Status: ${response.status}`)
    }

    if (!response.ok) {
      const errorMessage = result.details || result.error || `HTTP ${response.status}: ${response.statusText}`
      console.error("❌ Email service - API error:", {
        status: response.status,
        error: result.error,
        details: result.details,
        fullResponse: result,
      })
      throw new Error(errorMessage)
    }

    console.log("✅ Email service - success:", result)
    return { success: true, data: result }
  } catch (error) {
    console.error("❌ Email service - error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}
