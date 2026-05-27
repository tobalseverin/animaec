import ContactForm from "@/components/contact-form"

export default function ContactDemoPage() {
  return (
    <main className="min-h-screen bg-background py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-light text-primary mb-4">Formulario de Contacto</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Componente responsive con React 18, TypeScript, Tailwind CSS y shadcn/ui
          </p>
        </div>

        <ContactForm />

        <div className="mt-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-medium text-primary mb-4">Características Técnicas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="bg-card p-4 rounded-lg border">
                <strong className="text-foreground">React 18</strong>
                <br />
                useState para gestión de estado local
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <strong className="text-foreground">TypeScript</strong>
                <br />
                Tipado fuerte y interfaces
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <strong className="text-foreground">shadcn/ui</strong>
                <br />
                Input, Textarea, Button, Label, Card
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <strong className="text-foreground">Tailwind CSS</strong>
                <br />
                Mobile-first responsive design
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <strong className="text-foreground">Accesibilidad</strong>
                <br />
                ARIA labels y navegación por teclado
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <strong className="text-foreground">API Integration</strong>
                <br />
                POST a /api/send-email con fetch
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
