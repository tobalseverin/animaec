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

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Error al enviar el email")
    }

    const result = await response.json()
    return { success: true, data: result }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}
