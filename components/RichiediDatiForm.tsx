'use client'

import { useState } from 'react'

export default function RichiediDatiForm() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!consent) return

    try {
      const res = await fetch('/api/contatto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: 'Richiesta dati personali',
          email,
          messaggio: 'Richiesta di accesso ai dati personali (GDPR)',
        }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        className="rounded-xl p-8 text-center"
        style={{ backgroundColor: '#FAF7F2', border: '1px solid #E8DDD0' }}
      >
        <div className="text-2xl mb-3" style={{ color: '#DD4F22' }}>◆</div>
        <p className="font-display text-xl font-semibold mb-2" style={{ color: '#2D2D2E' }}>
          Richiesta inviata
        </p>
        <p className="text-sm leading-relaxed" style={{ color: '#2D2D2E', opacity: 0.8 }}>
          Riceverete una risposta all&apos;indirizzo indicato entro 30 giorni, come previsto dal GDPR.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="block text-xs tracking-widest uppercase font-medium mb-2"
          style={{ color: '#DD4F22' }}
        >
          Indirizzo Email *
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="la-vostra@email.com"
          className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200"
          style={{
            backgroundColor: '#FAF7F2',
            border: '1px solid #E8DDD0',
            color: '#2D2D2E',
          }}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="consent"
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 shrink-0 w-4 h-4 rounded cursor-pointer"
          style={{ accentColor: '#DD4F22' }}
        />
        <label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer" style={{ color: '#2D2D2E', opacity: 0.85 }}>
          Acconsento al fatto che San Pietro Formaggi ritiri la mia email in modo che possa inviarmi le mie informazioni richieste.
        </label>
      </div>

      {status === 'error' && (
        <p className="text-sm" style={{ color: '#DD4F22' }}>
          Si è verificato un errore. Riprovate o contattateci direttamente.
        </p>
      )}

      <button
        type="submit"
        disabled={!consent}
        className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Invia Richiesta
      </button>
    </form>
  )
}
