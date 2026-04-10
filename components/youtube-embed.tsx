"use client"

import { useEffect, useRef } from "react"

interface YouTubeEmbedProps {
  src: string
  title: string
  className?: string
}

export function YouTubeEmbed({ src, title, className = "" }: YouTubeEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeCreated = useRef(false)

  useEffect(() => {
    if (containerRef.current && !iframeCreated.current) {
      iframeCreated.current = true
      
      // Use requestAnimationFrame to ensure we're in browser context
      requestAnimationFrame(() => {
        if (!containerRef.current) return
        
        // Create iframe using DOM API to completely bypass React
        const iframe = document.createElement("iframe")
        iframe.src = src
        iframe.title = title
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        iframe.allowFullscreen = true
        iframe.loading = "lazy"
        iframe.style.cssText = "border:0;width:100%;height:100%;position:absolute;top:0;left:0;"
        
        containerRef.current.appendChild(iframe)
      })
    }
    
    return () => {
      iframeCreated.current = false
    }
  }, [src, title])

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{ 
        width: "100%", 
        height: "100%", 
        position: "relative",
        backgroundColor: "#000"
      }}
    />
  )
}
