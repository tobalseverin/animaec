'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import type { ThemeProviderProps } from 'next-themes'

// Dynamic import to avoid SSR script tag warning from next-themes
const NextThemesProvider = dynamic(
  () => import('next-themes').then((mod) => mod.ThemeProvider),
  { ssr: false }
)

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Avoid hydration mismatch by rendering children only after mount
  if (!mounted) {
    return <>{children}</>
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
