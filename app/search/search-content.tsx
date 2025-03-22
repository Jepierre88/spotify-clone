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

function SearchResults({ songs, searchQuery }: { songs: Song[], searchQuery: string }) {
  const filtered = songs.filter((song) =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (filtered.length === 0) {
    return <p className="text-neutral-400 mt-10">No se encontraron resultados.</p>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {filtered.map((song) => (
        <div
          key={song.id}
          className="bg-neutral-800 hover:bg-neutral-700 p-4 rounded-lg cursor-pointer"
        >
          <div className="relative w-full aspect-square mb-2">
            <Image
              src={song.cover}
              alt={song.title}
              fill
              className="rounded object-cover"
            />
          </div>
          <p className="text-sm font-semibold">{song.title}</p>
          <p className="text-xs text-neutral-400">{song.artist}</p>
        </div>
      ))}
    </div>
  )
}

export default function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [songs, setSongs] = useState<Song[]>([])
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')

  useEffect(() => {
    fetch('/api/songs')
      .then((res) => res.json())
      .then((sections: Section[]) => {
        const allSongs = sections.flatMap((section) => section.items)
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
      <SearchResults songs={songs} searchQuery={searchQuery} />
    </main>
  )
}