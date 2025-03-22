'use client'
// app/components/Sidebar.tsx
import { Home, Search, Library } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const routes = [
  { name: 'Inicio', href: '/', icon: Home },
  { name: 'Buscar', href: '/search', icon: Search },
  { name: 'Tu biblioteca', href: '/library', icon: Library },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="h-full w-full md:w-60 bg-black p-4 flex flex-col gap-6 border-r border-neutral-800">
      <div className="flex flex-col gap-4">
        {routes.map(({ name, href, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link key={name} href={href}>
              <div
                className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer text-sm font-medium transition ${
                  active ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{name}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
