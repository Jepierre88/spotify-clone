'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import debounce from 'lodash/debounce'

type Song = {
  id: string
  title: string
  artist: string
  cover: string
  duration: string
  url: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [songs, setSongs] = useState<Song[]>([])
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')

  useEffect(() => {
    fetch('/api/songs')
      .then((res) => res.json())
      .then((sections) => {
        const allSongs = sections.flatMap((section: any) => section.items)
        setSongs(allSongs)
      })
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
    router.replace(`/search?${params.toString()}`)
  }, 300)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    updateSearchParams(value)
  }

  const filtered = songs.filter((song) =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Buscar</h1>
      <input
        type="text"
        placeholder="Buscar canciones o artistas"
        className="w-full p-2 rounded bg-neutral-800 text-white placeholder:text-neutral-400 mb-6"
        value={searchQuery}
        onChange={handleInputChange}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((song) => (
          <div
            key={song.id}
            className="bg-neutral-800 hover:bg-neutral-700 p-4 rounded-lg cursor-pointer"
          >
            <img src={song.cover} alt={song.title} className="rounded mb-2" />
            <p className="text-sm font-semibold">{song.title}</p>
            <p className="text-xs text-neutral-400">{song.artist}</p>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-neutral-400 mt-10">No se encontraron resultados.</p>
      )}
    </main>
  )
}
