import Link from 'next/link'
import { Zap, MessageSquare, Package, TrendingUp } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-bold text-gray-900 text-lg">ChatUMKM</span>
        </div>
        <Link
          href="/dashboard"
          className="bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Masuk Dashboard
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <span className="inline-block bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
          🤖 AI Chatbot untuk UMKM Indonesia
        </span>
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Balas chat WhatsApp<br />
          <span className="text-green-600">otomatis 24 jam</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
          Chatbot AI yang paham produk lo. Customer tanya stok, harga, lokasi — 
          langsung dibalas otomatis. Lo fokus jualan, chatbot yang jaga toko.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard"
            className="bg-green-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-700 transition-colors"
          >
            Coba Gratis Sekarang
          </Link>
          <Link
            href="#fitur"
            className="border border-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Lihat Fitur
          </Link>
        </div>
      </section>

      {/* Fitur */}
      <section id="fitur" className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: MessageSquare,
              title: 'Auto Reply 24/7',
              desc: 'Chatbot aktif saat lo tidur, libur, atau sibuk. Ga ada customer yang diabaikan.'
            },
            {
              icon: Package,
              title: 'Katalog Produk Otomatis',
              desc: 'Upload produk sekali, chatbot langsung bisa jawab pertanyaan stok dan harga.'
            },
            {
              icon: TrendingUp,
              title: 'Pantau Performa',
              desc: 'Lihat berapa banyak chat masuk dan produk apa yang paling banyak ditanyain.'
            },
          ].map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="bg-gray-50 rounded-2xl p-6">
                <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={22} className="text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}