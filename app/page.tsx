'use client'

import { useEffect, useState } from 'react'

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

export default function Home() {
  const [sections, setSections] = useState<Section[]>([])

  useEffect(() => {
    fetch('/api/songs')
      .then((res) => res.json())
      .then(setSections)
  }, [])

  return (
    <main className="p-6 overflow-y-auto space-y-10">
      {sections.map((section) => (
        <div key={section.title}>
          <h2 className="text-xl font-bold mb-4">{section.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {section.items.map((song) => (
              <div
                key={song.id}
                className="bg-neutral-800 hover:bg-neutral-700 transition p-4 rounded-lg cursor-pointer"
              >
                <img
                  src={song.cover}
                  alt={song.title}
                  className="w-full h-auto rounded mb-3"
                />
                <h3 className="text-white font-semibold text-sm truncate">{song.title}</h3>
                <p className="text-neutral-400 text-xs">{song.artist}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  )
}
