'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import debounce from 'lodash/debounce'
import Image from 'next/image'

type Song = {
  id: string
  title: string
  artist: string
  cover: string
  duration: string
  url: string
}

type Section = {
  title: string
  items: Song[]
}

export default function LibraryContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [sections, setSections] = useState<Section[]>([])
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')

  useEffect(() => {
    fetch('/api/songs')
      .then((res) => res.json())
      .then(setSections)
  }, [])

  useEffect(() => {
    const currentQuery = searchParams.get('q') || ''
    setSearchQuery(currentQuery)
  }, [searchParams])

  const updateSearchParams = debounce((value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('q', value)
    } else {
      params.delete('q')
    }
    router.replace(`/library?${params.toString()}`)
  }, 300)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    updateSearchParams(value)
  }

  const filteredSections = sections.map(section => ({
    ...section,
    items: section.items.filter(song =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0)

  return (
    <main className="p-6 overflow-y-auto space-y-10">
      <input
        type="text"
        placeholder="Buscar en tu biblioteca"
        className="w-full p-2 rounded bg-neutral-800 text-white placeholder:text-neutral-400 mb-6"
        value={searchQuery}
        onChange={handleInputChange}
      />
      {filteredSections.length === 0 && searchQuery ? (
        <p className="text-neutral-400">No se encontraron resultados.</p>
      ) : (
        filteredSections.map((section) => (
          <div key={section.title}>
            <h2 className="text-xl font-bold mb-4">{section.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {section.items.map((song) => (
                <div
                  key={song.id}
                  className="bg-neutral-800 hover:bg-neutral-700 transition p-4 rounded-lg cursor-pointer"
                >
                  <div className="relative w-full aspect-square mb-3">
                    <Image
                      src={song.cover}
                      alt={song.title}
                      fill
                      className="rounded object-cover"
                    />
                  </div>
                  <h3 className="text-white font-semibold text-sm truncate">{song.title}</h3>
                  <p className="text-neutral-400 text-xs">{song.artist}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </main>
  )
}