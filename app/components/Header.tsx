// app/components/Header.tsx
'use client'

import { Home, Search, MonitorSmartphone } from 'lucide-react'
import Image from 'next/image'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import debounce from 'lodash/debounce'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')

  const updateSearchParams = debounce((value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('q', value)
    } else {
      params.delete('q')
    }
    if (pathname === '/search') {
      router.replace(`/search?${params.toString()}`)
    } else {
      router.push(`/search?${params.toString()}`)
    }
  }, 300)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    updateSearchParams(query)
  }

  return (
    <header className="h-16 bg-black px-6 flex items-center justify-between border-b border-neutral-800 sticky top-0 z-10">
      {/* IZQUIERDA */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <Image src="/images/logo.png" alt="Spotify" width={32} height={32} />

        <button className="hover:opacity-80" onClick={() => router.push('/')}>
          <Home className="text-white" />
        </button>

        <button className="hover:opacity-80" onClick={() => router.push('/search')}>
          <Search className="text-white" />
        </button>

        {/* Búsqueda */}
        <div className="hidden md:flex items-center bg-neutral-800 px-3 py-1 rounded-full w-72">
          <Search size={16} className="text-neutral-400 mr-2" />
          <input
            type="text"
            placeholder="¿Qué quieres reproducir?"
            className="bg-transparent outline-none text-sm text-white placeholder:text-neutral-400 w-full"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <button className="ml-4 hidden md:block hover:opacity-80">
          <MonitorSmartphone className="text-white" />
        </button>
      </div>

      {/* DERECHA */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white">
        <a href="#" className="hover:underline">Premium</a>
        <a href="#" className="hover:underline">Asistencia</a>
        <a href="#" className="hover:underline">Descargar</a>
        <span className="text-neutral-600">|</span>
        <a href="#" className="hover:underline">Instalar app</a>
        <a href="#" className="hover:underline">Registrarte</a>
        <button className="bg-white text-black px-4 py-1 rounded-full hover:scale-105 transition text-sm">
          Iniciar sesión
        </button>
      </div>
    </header>
  )
}
