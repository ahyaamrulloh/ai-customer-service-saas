'use client'

import { MessageSquare, TrendingUp, Package, Zap } from 'lucide-react'

const stats = [
  {
    label: 'Pesan Hari Ini',
    value: '0',
    icon: MessageSquare,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    label: 'Total Produk',
    value: '0',
    icon: Package,
    color: 'text-purple-600',
    bg: 'bg-purple-50'
  },
  {
    label: 'Pesan Bulan Ini',
    value: '0',
    icon: TrendingUp,
    color: 'text-green-600',
    bg: 'bg-green-50'
  },
  {
    label: 'Sisa Kuota',
    value: '100',
    icon: Zap,
    color: 'text-orange-600',
    bg: 'bg-orange-50'
  },
]

export default function DashboardPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Selamat datang! 👋</h1>
        <p className="text-gray-500 mt-1">Pantau performa chatbot toko lo di sini.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
                <Icon size={20} className={stat.color} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Status Chatbot */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-900">Status Chatbot</h2>
            <p className="text-sm text-gray-500 mt-0.5">WhatsApp belum tersambung</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
            <span className="text-sm text-gray-500">Nonaktif</span>
          </div>
        </div>
        <button className="mt-4 bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Sambungkan WhatsApp
        </button>
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Mulai dari sini</h2>
        <div className="space-y-3">
          {[
            { step: '1', text: 'Tambah produk ke katalog', href: '/dashboard/products' },
            { step: '2', text: 'Sambungkan WhatsApp', href: '/dashboard/settings' },
            { step: '3', text: 'Test chatbot lo', href: '/dashboard/settings' },
          ].map((item) => (
            <a
              key={item.step}
              href={item.href}
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-colors group">
              <div className="w-7 h-7 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                {item.step}
              </div>
              <span className="text-sm text-gray-700 font-medium">{item.text}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}