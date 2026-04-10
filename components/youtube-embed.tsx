"use client"

import { useEffect, useState } from "react"

interface YouTubeEmbedProps {
  src: string
  title: string
  className?: string
}

export function YouTubeEmbed({ src, title, className = "" }: YouTubeEmbedProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className={`bg-muted animate-pulse ${className}`} />
    )
  }

  return (
    <iframe
      src={src}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className={className}
      style={{ border: 0 }}
    />
  )
}
