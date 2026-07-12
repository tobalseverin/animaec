"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import ActionButtons from "@/components/action-buttons"
import ListView from "@/components/list-view"
import CalendarView from "@/components/calendar-view"

export default function ExplorarPage() {
  const [view, setView] = useState<"calendar" | "list">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSalon, setSelectedSalon] = useState<string>("todos")

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

        <div className="flex-1 bg-muted/5 h-[90vh] pb-24">
          {view === "list" ? (
            <ListView
              selectedSalon={selectedSalon}
              onSalonChange={setSelectedSalon}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              currentView={view}
              onViewChange={setView}
            />
          ) : (
            <CalendarView
              selectedSalon={selectedSalon}
              onSalonChange={setSelectedSalon}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              currentView={view}
              onViewChange={setView}
            />
          )}
        </div>
      </div>

      {/* Botones de acción */}
      <ActionButtons />
    </main>
  )
}
