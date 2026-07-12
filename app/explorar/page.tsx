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
import CalendarView from "@/components/calendar-view"

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-light">Explorar</h1>
            <p className="text-xl text-muted-foreground mt-2">
              Descubre las actividades y espacios disponibles en Ánima
            </p>
          </div>
          {/* Toggle Actividades | Espacios */}
          <div className="flex gap-0 bg-muted rounded-lg p-1">
            <Button
              variant={view === "list" ? "default" : "ghost"}
              onClick={() => setView("list")}
              className="rounded-md px-6 py-2 text-base font-medium"
            >
              Actividades
            </Button>
            <Button
              variant="ghost"
              asChild
              className="rounded-md px-6 py-2 text-base font-medium"
            >
              <Link href="/explorar/espacios">Espacios</Link>
            </Button>
          </div>
        </div>

        {/* Controles: Búsqueda y Vista */}
        <div className="flex items-center gap-4 mb-6">
          {/* Buscador con popover */}
          <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
                <span className="sr-only">Buscar</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
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

          {/* Botones de vista unidos */}
          <div className="flex gap-0 bg-muted rounded-lg p-1">
            <Button
              variant={view === "calendar" ? "default" : "ghost"}
              size="icon"
              onClick={() => setView("calendar")}
              aria-label="Calendario"
              title="Calendario"
              className="rounded-md"
            >
              <Calendar className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setView("list")}
              aria-label="Lista"
              title="Lista"
              className="rounded-md"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 bg-muted/5 h-[90vh] pb-24">
          {view === "list" ? (
            <ListView selectedSalon={selectedSalon} onSalonChange={setSelectedSalon} />
          ) : (
            <CalendarView />
          )}
        </div>
      </div>

      {/* Botones de acción */}
      <ActionButtons />
    </main>
  )
}
