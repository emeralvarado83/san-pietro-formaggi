'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/prodotti', label: 'Prodotti' },
  { href: '/admin/ricette', label: 'Ricette' },
]

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <aside className="w-64 min-h-screen bg-[#2D2D2E] text-[#FDF8F0] flex flex-col">
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="font-display text-lg font-semibold text-[#DD4F22]">
          San Pietro Admin
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-4 py-2.5 rounded-lg text-sm transition-colors ${
              pathname === link.href
                ? 'bg-white/10 text-[#DD4F22] font-medium'
                : 'text-[#E8DDD0] hover:bg-white/5'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          href="/"
          className="block px-4 py-2 rounded-lg text-sm text-[#E8DDD0] hover:bg-white/5 transition-colors"
        >
          Torna al sito
        </Link>
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 rounded-lg text-sm text-red-400 hover:bg-white/5 transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}
