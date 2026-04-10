"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import SiteHeader from "@/components/site-header"
import ActionButtons from "@/components/action-buttons"

interface Space {
  id: string
  name: string
  color: string
  position: { x: number; y: number; z: number }
}

export default function ThreeDViewer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [spaces, setSpaces] = useState<Space[]>([
    { id: "salon1", name: "Salón 1", color: "#e91e63", position: { x: -5, y: 0, z: 0 } },
    { id: "salon2", name: "Salón 2", color: "#2196f3", position: { x: 0, y: 0, z: -5 } },
    { id: "salon3", name: "Salón 3", color: "#4caf50", position: { x: 5, y: 0, z: 0 } },
    { id: "salon4", name: "Salón 4", color: "#ffc107", position: { x: 0, y: 0, z: 5 } },
    { id: "salon5", name: "Salón 5", color: "#9c27b0", position: { x: 0, y: 3, z: 0 } },
    { id: "casa", name: "Casa", color: "#ff9800", position: { x: 0, y: 0, z: 0 } },
  ])
  const [activeSpace, setActiveSpace] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [isInfoVisible, setIsInfoVisible] = useState(true)

  useEffect(() => {
    let scene: any, camera: any, renderer: any, controls: any

    const initThreeJS = async () => {
      try {
        // Importación dinámica de Three.js
        const THREE = await import("three")
        const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js")

        if (!containerRef.current) return

        // Scene setup
        scene = new THREE.Scene()
        scene.background = new THREE.Color(0x111111)

        // Camera setup
        camera = new THREE.PerspectiveCamera(
          75,
          containerRef.current.clientWidth / containerRef.current.clientHeight,
          0.1,
          1000,
        )
        camera.position.set(10, 10, 10)

        // Renderer setup
        renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.shadowMap.enabled = true
        containerRef.current.appendChild(renderer.domElement)

        // Controls
        controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.05

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        directionalLight.position.set(5, 10, 5)
        directionalLight.castShadow = true
        scene.add(directionalLight)

        // Create fallback geometry
        const buildingGroup = new THREE.Group()

        // Main building
        const buildingGeometry = new THREE.BoxGeometry(10, 5, 8)
        const buildingMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc })
        const building = new THREE.Mesh(buildingGeometry, buildingMaterial)
        building.position.y = 2.5
        buildingGroup.add(building)

        // Roof
        const roofGeometry = new THREE.ConeGeometry(7, 3, 4)
        const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 })
        const roof = new THREE.Mesh(roofGeometry, roofMaterial)
        roof.position.y = 6.5
        roof.rotation.y = Math.PI / 4
        buildingGroup.add(roof)

        // Create rooms for each space
        spaces.forEach((space) => {
          const roomGeometry = new THREE.BoxGeometry(3, 2, 3)
          const roomMaterial = new THREE.MeshStandardMaterial({
            color: space.color,
            transparent: true,
            opacity: 0.7,
          })
          const room = new THREE.Mesh(roomGeometry, roomMaterial)
          room.position.set(space.position.x, 2, space.position.z)
          room.userData = { spaceId: space.id }
          buildingGroup.add(room)
        })

        scene.add(buildingGroup)

        // Position camera
        camera.position.set(15, 10, 15)
        camera.lookAt(new THREE.Vector3(0, 0, 0))
        controls.update()

        setIsLoading(false)
        setLoadError(null)

        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate)
          controls.update()
          renderer.render(scene, camera)
        }
        animate()
      } catch (error) {
        console.error("Error loading Three.js:", error)
        setLoadError("Error al cargar el visor 3D. Por favor, recarga la página.")
        setIsLoading(false)
      }
    }

    initThreeJS()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current && renderer) {
        containerRef.current.removeChild(renderer.domElement)
      }
      if (renderer) {
        renderer.dispose()
      }
    }
  }, [spaces])

  // Highlight effect for active space
  useEffect(() => {
    // This would update highlights when activeSpace changes
    // Implementation depends on the Three.js scene being ready
  }, [activeSpace])

  return (
    <main className="min-h-screen flex flex-col relative">
      {/* Header */}
      <div className="px-4 py-4">
        <SiteHeader showBackButton={true} backUrl="/explorar/espacios" />
      </div>

      {/* Contenedor 3D a pantalla completa */}
      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Cargando modelo 3D...</p>
            </div>
          </div>
        )}
        {loadError && (
          <div className="absolute top-4 left-4 right-4 bg-red-500/20 border border-red-500 text-red-700 dark:text-red-300 p-3 rounded-md z-10">
            <p>{loadError}</p>
          </div>
        )}
        <div ref={containerRef} className="w-full h-full absolute inset-0"></div>

        {/* Panel de información plegable */}
        <div
          className={`absolute top-4 right-4 z-10 transition-transform duration-300 ${isInfoVisible ? "translate-x-0" : "translate-x-[calc(100%-40px)]"}`}
        >
          <Card className="w-64 bg-background/80 backdrop-blur-sm">
            <div
              className="absolute -left-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm p-1 rounded-l-md cursor-pointer"
              onClick={() => setIsInfoVisible(!isInfoVisible)}
            >
              {isInfoVisible ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Nuestros espacios</h3>
              </div>
              <div className="grid gap-3">
                {spaces.map((space) => (
                  <Button
                    key={space.id}
                    variant={activeSpace === space.id ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setActiveSpace(space.id === activeSpace ? null : space.id)}
                  >
                    <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: space.color }}></span>
                    {space.name}
                  </Button>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Instrucciones</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Haz clic y arrastra para rotar la vista</li>
                  <li>Usa la rueda del ratón para acercar o alejar</li>
                  <li>Selecciona un espacio de la lista para destacarlo</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Botones de acción */}
      <ActionButtons />
    </main>
  )
}
