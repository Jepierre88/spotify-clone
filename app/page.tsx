"use client"
import { Suspense } from 'react'
import HomeContent from './home-content'

export default function Home() {
  return (
    <Suspense fallback={<div className="p-6">Cargando...</div>}>
      <HomeContent />
    </Suspense>
  )
}
