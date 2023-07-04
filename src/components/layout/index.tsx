'use client'

import { usePathname } from 'next/navigation'
import { useTheme } from '@/hooks/useTheme'

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const { theme } = useTheme()

  return <main className={`flex h-screen bg-light`}>{children}</main>
}
