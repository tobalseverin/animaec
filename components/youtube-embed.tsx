"use client"

import { useEffect, useRef, useState } from "react"

interface YouTubeEmbedProps {
  src: string
  title: string
  className?: string
}

export function YouTubeEmbed({ src, title, className = "" }: YouTubeEmbedProps) {
  const [isClient, setIsClient] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && containerRef.current) {
      // Create iframe using DOM API to avoid React script tag warning
      const iframe = document.createElement("iframe")
      iframe.src = src
      iframe.title = title
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      iframe.allowFullscreen = true
      iframe.style.border = "0"
      iframe.style.width = "100%"
      iframe.style.height = "100%"
      
      // Clear and append
      containerRef.current.innerHTML = ""
      containerRef.current.appendChild(iframe)
    }
  }, [isClient, src, title])

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{ width: "100%", height: "100%" }}
    >
      {!isClient && <div className="bg-muted animate-pulse w-full h-full" />}
    </div>
  )
}
