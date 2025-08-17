

'use client'

import Link from 'next/link'
import { Phone, BarChart3, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function Header() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <header className="border-b bg-white dark:bg-gray-900 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Phone className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dextego Sales Dashboard
          </h1>
        </div>

        <div className="flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link href="/calls" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              <Phone className="h-4 w-4" />
              <span>Calls</span>
            </Link>
          </nav>

          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}