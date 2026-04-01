'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/i-nostri-formaggi', label: 'I Nostri Formaggi' },
  { href: '/ricette', label: 'Ricette' },
  { href: '/lazienda', label: "L'Azienda" },
  { href: '/contatti', label: 'Contatti' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: '#FAF7F2',
        boxShadow: isScrolled ? '0 2px 20px rgba(59,42,26,0.12)' : 'none',
        borderBottom: isScrolled ? 'none' : '1px solid #E8DDD0',
      }}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/san-pietro-formaggi-logo-transparente.png"
              alt="San Pietro Formaggi"
              width={100}
              height={40}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide transition-colors duration-200 relative"
                style={{
                  color: pathname === link.href ? '#DD4F22' : '#2D2D2E',
                  fontWeight: pathname === link.href ? '500' : '400',
                  fontFamily: 'var(--font-lora, Lora, serif)',
                }}
              >
                {link.label}
                {pathname === link.href && (
                  <span
                    className="absolute -bottom-0.5 left-0 right-0 h-px"
                    style={{ backgroundColor: '#DD4F22' }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/contatti"
              className="hidden md:inline-flex items-center px-4 py-2 text-xs tracking-widest uppercase font-medium transition-all duration-200 rounded"
              style={{
                backgroundColor: '#2D2D2E',
                color: '#FDF8F0',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FBC703')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2D2D2E')}
            >
              Richiedi Preventivo
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 flex flex-col justify-center gap-1.5"
              aria-label={isOpen ? 'Chiudi menu' : 'Apri menu'}
              aria-expanded={isOpen}
            >
              <span
                className="block w-5 h-px transition-all duration-300 origin-center"
                style={{
                  backgroundColor: '#2D2D2E',
                  transform: isOpen ? 'rotate(45deg) translate(2px, 4px)' : 'none',
                }}
              />
              <span
                className="block w-5 h-px transition-all duration-300"
                style={{
                  backgroundColor: '#2D2D2E',
                  opacity: isOpen ? 0 : 1,
                  transform: isOpen ? 'translateX(-4px)' : 'none',
                }}
              />
              <span
                className="block w-5 h-px transition-all duration-300 origin-center"
                style={{
                  backgroundColor: '#2D2D2E',
                  transform: isOpen ? 'rotate(-45deg) translate(2px, -4px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{ maxHeight: isOpen ? '400px' : '0', opacity: isOpen ? 1 : 0 }}
        >
          <div className="py-4 border-t" style={{ borderColor: '#E8DDD0' }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2.5 text-sm tracking-wide"
                style={{
                  color: pathname === link.href ? '#DD4F22' : '#2D2D2E',
                  fontWeight: pathname === link.href ? '500' : '400',
                  fontFamily: 'var(--font-lora, Lora, serif)',
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contatti"
              className="mt-4 block text-center px-4 py-2.5 text-xs tracking-widest uppercase font-medium rounded"
              style={{ backgroundColor: '#2D2D2E', color: '#FDF8F0' }}
            >
              Richiedi Preventivo
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
