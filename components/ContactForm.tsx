'use client'

import { useState } from 'react'

interface FormState {
  nome: string
  email: string
  telefono: string
  messaggio: string
}

const initialState: FormState = {
  nome: '',
  email: '',
  telefono: '',
  messaggio: '',
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contatto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Errore durante l\'invio.')
      }

      setStatus('success')
      setForm(initialState)
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Si è verificato un errore. Riprova.')
    }
  }

  const inputClass =
    'w-full px-4 py-3 text-sm rounded-lg outline-none transition-all duration-200'
  const inputStyle = {
    backgroundColor: '#FDF8F0',
    border: '1px solid #E8DDD0',
    color: '#2D2D2E',
    fontFamily: 'var(--font-lora, Lora, serif)',
  }

  if (status === 'success') {
    return (
      <div
        className="rounded-xl p-10 text-center"
        style={{ backgroundColor: '#FAF7F2', border: '1px solid #E8DDD0' }}
      >
        <div className="text-3xl mb-4 select-none" style={{ color: '#DD4F22' }}>
          ◆
        </div>
        <h3 className="font-display text-2xl font-semibold mb-3" style={{ color: '#2D2D2E' }}>
          Messaggio inviato!
        </h3>
        <p className="text-sm leading-relaxed mb-6" style={{ color: '#2D2D2E' }}>
          Grazie per averci contattato. Risponderemo entro 24 ore lavorative.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-xs tracking-widest uppercase font-medium px-5 py-2.5 rounded-lg transition-colors duration-200"
          style={{ backgroundColor: '#2D2D2E', color: '#FDF8F0' }}
        >
          Invia un altro messaggio
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs tracking-widest uppercase font-medium mb-2" style={{ color: '#FBC703' }}>
            Nome e Cognome *
          </label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            placeholder="Mario Rossi"
            className={inputClass}
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#DD4F22')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#E8DDD0')}
          />
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase font-medium mb-2" style={{ color: '#FBC703' }}>
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="mario@esempio.it"
            className={inputClass}
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#DD4F22')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#E8DDD0')}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs tracking-widest uppercase font-medium mb-2" style={{ color: '#FBC703' }}>
          Telefono <span style={{ color: '#FBC703', opacity: 0.6 }}>(facoltativo)</span>
        </label>
        <input
          type="tel"
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          placeholder="+39 091 123 4567"
          className={inputClass}
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#DD4F22')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#E8DDD0')}
        />
      </div>

      <div>
        <label className="block text-xs tracking-widest uppercase font-medium mb-2" style={{ color: '#FBC703' }}>
          Messaggio *
        </label>
        <textarea
          name="messaggio"
          value={form.messaggio}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Descrivete la vostra richiesta: tipologia di prodotti, quantità, eventuali esigenze particolari..."
          className={inputClass}
          style={{ ...inputStyle, resize: 'vertical' }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#DD4F22')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#E8DDD0')}
        />
      </div>

      {status === 'error' && (
        <div
          className="px-4 py-3 rounded-lg text-sm"
          style={{ backgroundColor: 'rgba(180,50,30,0.08)', color: '#8B2E1A', border: '1px solid rgba(180,50,30,0.2)' }}
        >
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3.5 text-xs tracking-widest uppercase font-medium rounded-lg transition-all duration-200 disabled:opacity-60"
        style={{
          backgroundColor: status === 'loading' ? '#FBC703' : '#2D2D2E',
          color: '#FDF8F0',
        }}
        onMouseEnter={(e) => {
          if (status !== 'loading') e.currentTarget.style.backgroundColor = '#DD4F22'
        }}
        onMouseLeave={(e) => {
          if (status !== 'loading') e.currentTarget.style.backgroundColor = '#2D2D2E'
        }}
      >
        {status === 'loading' ? 'Invio in corso...' : 'Invia Richiesta'}
      </button>

      <p className="text-xs text-center" style={{ color: '#FBC703', opacity: 0.7 }}>
        Risponderemo entro 24 ore lavorative · sanpietroformaggi@gmail.com
      </p>
    </form>
  )
}
