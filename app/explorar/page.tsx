"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, List, Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import SiteHeader from "@/components/site-header"
import ActionButtons from "@/components/action-buttons"
import ListView from "@/components/list-view"

export default function ExplorarPage() {
  const [view, setView] = useState<"calendar" | "list">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSalon, setSelectedSalon] = useState<string>("todos")
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearchOpen(false)
  }

  return (
    <main className="min-h-screen flex flex-col relative">
      {/* Header */}
      <div className="px-4 py-4">
        <SiteHeader showLogo={true} />
      </div>

      <div className="px-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-light">Explorar</h1>
            <p className="text-xl text-muted-foreground mt-2">
              Descubre las actividades y espacios disponibles en Ánima
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link href="/explorar/espacios">Espacios</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/explorar/como-llegar">Cómo llegar</Link>
            </Button>
          </div>
        </div>

        <div className="flex justify-end items-center mb-6">
          {/* Buscador con popover */}
          <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
                <span className="sr-only">Buscar</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <form onSubmit={handleSearch} className="flex items-center p-2">
                <Input
                  type="text"
                  placeholder="Buscar actividades..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="sm" className="ml-2">
                  Buscar
                </Button>
              </form>
            </PopoverContent>
          </Popover>

          {/* Selector de salón */}
          <Select value={selectedSalon} onValueChange={setSelectedSalon}>
            <SelectTrigger className="w-[180px] ml-4">
              <SelectValue placeholder="Todos los salones" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los salones</SelectItem>
              <SelectItem value="Salón 1">Salón 1</SelectItem>
              <SelectItem value="Salón 2">Salón 2</SelectItem>
              <SelectItem value="Salón 3">Salón 3</SelectItem>
              <SelectItem value="Salón 4">Salón 4</SelectItem>
              <SelectItem value="Salón 5">Salón 5</SelectItem>
              <SelectItem value="Casa">Casa</SelectItem>
            </SelectContent>
          </Select>

          {/* Botones de vista */}
          <Button
            variant={view === "calendar" ? "default" : "outline"}
            onClick={() => setView("calendar")}
            className="flex items-center gap-2 ml-4"
          >
            <Calendar className="h-4 w-4" />
            Calendario
          </Button>
          <Button
            variant={view === "list" ? "default" : "outline"}
            onClick={() => setView("list")}
            className="flex items-center gap-2 ml-4"
          >
            <List className="h-4 w-4" />
            Lista
          </Button>
        </div>

        <div className="flex-1 bg-muted/5 h-[90vh] pb-24">
          {view === "list" ? (
            <ListView />
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              <p>Vista de calendario no disponible en este momento.</p>
            </div>
          )}
        </div>
      </div>

      {/* Botones de acción */}
      <ActionButtons />
    </main>
  )
}
