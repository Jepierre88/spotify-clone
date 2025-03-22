// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Header from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'Copia exacta de Spotify con Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`bg-black text-white ${inter.className}`}>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Suspense fallback={<div className="h-[64px] bg-black"></div>}>
              <Header/>
            </Suspense>
            <main className="flex-1 overflow-y-auto">{children}</main>
            <Player />
          </div>
        </div>
      </body>
    </html>
  )
}
