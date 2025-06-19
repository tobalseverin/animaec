import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, formData } = body

    let subject = ""
    let htmlContent = ""
    let textContent = ""

    switch (type) {
      case "contact":
        subject = `Nuevo mensaje de contacto - ${formData.name}`
        htmlContent = `
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${formData.message.replace(/\n/g, "<br>")}</p>
        `
        textContent = `
          Nuevo mensaje de contacto
          
          Nombre: ${formData.name}
          Email: ${formData.email}
          Mensaje: ${formData.message}
        `
        break

      case "project":
        subject = `Nueva propuesta de proyecto - ${formData.titulo}`
        htmlContent = `
          <h2>Nueva propuesta de proyecto</h2>
          <h3>Información personal</h3>
          <p><strong>Nombre:</strong> ${formData.nombre}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Teléfono:</strong> ${formData.telefono}</p>
          <p><strong>Nacionalidad:</strong> ${formData.nacionalidad}</p>
          
          <h3>Detalles del proyecto</h3>
          <p><strong>Título:</strong> ${formData.titulo}</p>
          <p><strong>Área:</strong> ${formData.area}</p>
          <p><strong>Duración estimada:</strong> ${formData.duracion}</p>
          <p><strong>Número de participantes:</strong> ${formData.participantes}</p>
          <p><strong>Descripción:</strong></p>
          <p>${formData.descripcion?.replace(/\n/g, "<br>")}</p>
          <p><strong>Objetivos:</strong></p>
          <p>${formData.objetivos?.replace(/\n/g, "<br>")}</p>
          
          <h3>Recursos</h3>
          <p><strong>Espacios requeridos:</strong> ${formData.espacios}</p>
          <p><strong>Recursos necesarios:</strong></p>
          <p>${formData.recursos?.replace(/\n/g, "<br>")}</p>
        `
        textContent = `
          Nueva propuesta de proyecto
          
          INFORMACIÓN PERSONAL
          Nombre: ${formData.nombre}
          Email: ${formData.email}
          Teléfono: ${formData.telefono}
          Nacionalidad: ${formData.nacionalidad}
          
          DETALLES DEL PROYECTO
          Título: ${formData.titulo}
          Área: ${formData.area}
          Duración estimada: ${formData.duracion}
          Número de participantes: ${formData.participantes}
          Descripción: ${formData.descripcion}
          Objetivos: ${formData.objetivos}
          
          RECURSOS
          Espacios requeridos: ${formData.espacios}
          Recursos necesarios: ${formData.recursos}
        `
        break

      case "activity":
        subject = `Nueva comunicación de actividad - ${formData.titulo}`
        htmlContent = `
          <h2>Nueva comunicación de actividad</h2>
          <h3>Información básica</h3>
          <p><strong>Título:</strong> ${formData.titulo}</p>
          <p><strong>Responsable:</strong> ${formData.responsable}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Teléfono:</strong> ${formData.telefono}</p>
          
          <h3>Detalles de la actividad</h3>
          <p><strong>Fecha:</strong> ${formData.fecha}</p>
          <p><strong>Hora de inicio:</strong> ${formData.horaInicio}</p>
          <p><strong>Hora de finalización:</strong> ${formData.horaFin}</p>
          <p><strong>Espacio:</strong> ${formData.espacio}</p>
          <p><strong>Público objetivo:</strong> ${formData.publico}</p>
          <p><strong>Aforo máximo:</strong> ${formData.aforo}</p>
          <p><strong>Precio:</strong> ${formData.precio}</p>
          <p><strong>Descripción:</strong></p>
          <p>${formData.descripcion?.replace(/\n/g, "<br>")}</p>
          
          <h3>Materiales y observaciones</h3>
          <p><strong>Enlaces a redes sociales:</strong> ${formData.redes}</p>
          <p><strong>Observaciones adicionales:</strong></p>
          <p>${formData.observaciones?.replace(/\n/g, "<br>")}</p>
        `
        textContent = `
          Nueva comunicación de actividad
          
          INFORMACIÓN BÁSICA
          Título: ${formData.titulo}
          Responsable: ${formData.responsable}
          Email: ${formData.email}
          Teléfono: ${formData.telefono}
          
          DETALLES DE LA ACTIVIDAD
          Fecha: ${formData.fecha}
          Hora de inicio: ${formData.horaInicio}
          Hora de finalización: ${formData.horaFin}
          Espacio: ${formData.espacio}
          Público objetivo: ${formData.publico}
          Aforo máximo: ${formData.aforo}
          Precio: ${formData.precio}
          Descripción: ${formData.descripcion}
          
          MATERIALES Y OBSERVACIONES
          Enlaces a redes sociales: ${formData.redes}
          Observaciones adicionales: ${formData.observaciones}
        `
        break

      case "registration":
        subject = `Nueva inscripción - ${formData.eventTitle}`
        htmlContent = `
          <h2>Nueva inscripción a actividad</h2>
          <p><strong>Actividad:</strong> ${formData.eventTitle}</p>
          <p><strong>Plan seleccionado:</strong> ${formData.selectedPlan}</p>
          <p><strong>Precio:</strong> ${formData.price}</p>
          
          <h3>Datos del participante</h3>
          <p><strong>Nombre completo:</strong> ${formData.fullName}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Teléfono:</strong> ${formData.phone}</p>
          <p><strong>Comentarios:</strong> ${formData.comments || "Sin comentarios"}</p>
        `
        textContent = `
          Nueva inscripción a actividad
          
          Actividad: ${formData.eventTitle}
          Plan seleccionado: ${formData.selectedPlan}
          Precio: ${formData.price}
          
          DATOS DEL PARTICIPANTE
          Nombre completo: ${formData.fullName}
          Email: ${formData.email}
          Teléfono: ${formData.phone}
          Comentarios: ${formData.comments || "Sin comentarios"}
        `
        break

      default:
        return NextResponse.json({ error: "Tipo de formulario no válido" }, { status: 400 })
    }

    const { data, error } = await resend.emails.send({
      from: "Ánima Espacio Cultural <noreply@animaespacio.org>",
      to: ["hola@animaespacio.org"],
      subject: subject,
      html: htmlContent,
      text: textContent,
    })

    if (error) {
      console.error("Error sending email:", error)
      return NextResponse.json({ error: "Error al enviar el email" }, { status: 500 })
    }

    return NextResponse.json({ message: "Email enviado correctamente", id: data?.id }, { status: 200 })
  } catch (error) {
    console.error("Error in send-email API:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
