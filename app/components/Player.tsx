// app/components/Player.tsx
'use client'

import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import { useState } from 'react'

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => setIsPlaying(!isPlaying)

  return (
    <div className="h-20 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between px-4">
      {/* Info de canción */}
      <div className="flex items-center gap-4 w-1/3">
        <img
          src="/images/blinding-lights.jpg"
          alt="Blinding Lights"
          className="w-12 h-12 rounded"
        />
        <div>
          <p className="text-sm font-semibold text-white">Blinding Lights</p>
          <p className="text-xs text-neutral-400">The Weeknd</p>
        </div>
      </div>

      {/* Controles */}
      <div className="flex items-center gap-6 w-1/3 justify-center">
        <SkipBack className="cursor-pointer text-white" />
        <button
          onClick={togglePlay}
          className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <SkipForward className="cursor-pointer text-white" />
      </div>

      {/* Placeholder de volumen */}
      <div className="w-1/3 flex justify-end text-sm text-neutral-400">
        <p className="hidden md:block">Volumen</p>
      </div>
    </div>
  )
}
