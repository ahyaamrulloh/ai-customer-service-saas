'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  Settings,
  MessageSquare,
  Menu,
  X,
  Zap
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/products', label: 'Produk', icon: Package },
  { href: '/dashboard/conversations', label: 'Chat', icon: MessageSquare },
  { href: '/dashboard/settings', label: 'Pengaturan', icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200
        transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0
      `}>
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-100">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-bold text-gray-900 text-lg">ChatUMKM</span>
        </div>

        {/* Nav */}
        <nav className="px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-colors duration-150
                  ${isActive
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Plan Badge */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-xs font-semibold text-green-700">Paket Free</p>
            <p className="text-xs text-green-600 mt-0.5">100 pesan/bulan</p>
            <button className="mt-2 w-full bg-green-600 text-white text-xs font-semibold py-1.5 rounded-md hover:bg-green-700 transition-colors">
              Upgrade Paket
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between lg:px-8">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-1.5 rounded-md text-gray-500 hover:bg-gray-100"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold">
              T
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}