'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const slides = [
  {
    image: '/imagenes-slider/panorama-castronovo-di-sicilia.jpg',
    eyebrow: 'Castronovo di Sicilia · Sicilia',
    title: 'Benvenuto',
    text: "L'obiettivo di questa azienda è quello di proporre al mercato prodotti selezionati di alta qualità, curandone i dettagli nelle vari fasi di lavorazione con la pazienza e la maestria nel processo di stagionatura.",
    cta: { label: 'Vedi Prodotti', href: '/i-nostri-formaggi' },
  },
  {
    image: '/imagenes-slider/formaggi-freschi-sicilia.jpg',
    eyebrow: 'La Nostra Produzione',
    title: 'Formaggi Freschi',
    text: 'Unici nel gusto, i nostri formaggi freschi rispettano ogni standard qualitativo, mantenendo inalterata la tradizione tramandataci da generazioni in generazioni.',
    cta: { label: 'Vedi Prodotti', href: '/i-nostri-formaggi#freschi' },
  },
  {
    image: '/imagenes-slider/formaggi-semistagionati-sicilia.jpg',
    eyebrow: 'La Nostra Produzione',
    title: 'Formaggi Semistagionati',
    text: 'Unici nel gusto, i nostri formaggi semistagionati rispettano ogni standard qualitativo. Essi presentano un gusto dolce, gradevole e non troppo intenso.',
    cta: { label: 'Vedi Prodotti', href: '/i-nostri-formaggi#semistagionati' },
  },
  {
    image: '/imagenes-slider/formaggi-stagionati.jpg',
    eyebrow: 'La Nostra Produzione',
    title: 'Formaggi Stagionati',
    text: 'Unici nel gusto, i nostri formaggi stagionati rispettano ogni standard qualitativo, mantenendo inalterata la tradizione tramandataci da generazioni in generazioni.',
    cta: { label: 'Vedi Prodotti', href: '/i-nostri-formaggi#stagionati' },
  },
]

const INTERVAL = 5000

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [textVisible, setTextVisible] = useState(true)
  const paused = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = useCallback((index: number) => {
    setTextVisible(false)
    setTimeout(() => {
      setPrev(current)
      setCurrent(index)
      setTextVisible(true)
    }, 120)
  }, [current])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length)
  }, [current, goTo])

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      if (!paused.current) next()
    }, INTERVAL)
  }, [next])

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [startTimer])

  const handlePrev = () => {
    goTo((current - 1 + slides.length) % slides.length)
    startTimer()
  }

  const handleNext = () => {
    goTo((current + 1) % slides.length)
    startTimer()
  }

  const handleDot = (i: number) => {
    goTo(i)
    startTimer()
  }

  const slide = slides[current]

  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      onMouseEnter={() => { paused.current = true }}
      onMouseLeave={() => { paused.current = false }}
    >
      {/* Background images */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: 0 }}
        >
          <Image
            src={s.image}
            alt={s.title}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(30,18,8,0.55) 0%, rgba(30,18,8,0.45) 60%, rgba(30,18,8,0.7) 100%)' }}
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? 'translateY(0)' : 'translateY(18px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="block w-12 h-px" style={{ backgroundColor: 'rgba(200,144,42,0.6)' }} />
            <span className="text-sm tracking-widest uppercase" style={{ color: '#DD4F22' }}>
              {slide.eyebrow}
            </span>
            <span className="block w-12 h-px" style={{ backgroundColor: 'rgba(200,144,42,0.6)' }} />
          </div>

          {/* Title */}
          <h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold mb-6 leading-[1.1]"
            style={{ color: '#FDF8F0' }}
          >
            {slide.title}
          </h1>

          {/* Text */}
          <p
            className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ color: 'rgba(245,240,232,0.82)' }}
          >
            {slide.text}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={slide.cta.href} className="btn-gold">
              {slide.cta.label}
            </Link>
            <Link href="/contatti" className="btn-outline-light">
              Richiedi Preventivo
            </Link>
          </div>
        </div>
      </div>

      {/* Arrow controls */}
      <button
        onClick={handlePrev}
        aria-label="Slide precedente"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200"
        style={{ backgroundColor: 'rgba(245,240,232,0.12)', border: '1px solid rgba(245,240,232,0.25)', color: '#FDF8F0' }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(200,144,42,0.35)')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(245,240,232,0.12)')}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        aria-label="Slide successivo"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200"
        style={{ backgroundColor: 'rgba(245,240,232,0.12)', border: '1px solid rgba(245,240,232,0.25)', color: '#FDF8F0' }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(200,144,42,0.35)')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(245,240,232,0.12)')}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDot(i)}
            aria-label={`Vai al slide ${i + 1}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? '28px' : '8px',
              height: '8px',
              backgroundColor: i === current ? '#DD4F22' : 'rgba(245,240,232,0.45)',
            }}
          />
        ))}
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, transparent, #FDF8F0)' }}
      />
    </section>
  )
}
