'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Errore nel login')
        return
      }

      router.push('/admin')
    } catch {
      setError('Errore di connessione')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-semibold text-[#2D2D2E]">Admin</h1>
          <p className="text-sm text-[#2D2D2E]/60 mt-2">San Pietro Formaggi</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-sm border border-[#E8DDD0]">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-xs uppercase tracking-widest font-medium text-[#2D2D2E] mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-[#E8DDD0] text-sm focus:outline-none focus:ring-2 focus:ring-[#DD4F22]/30 focus:border-[#DD4F22]"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-xs uppercase tracking-widest font-medium text-[#2D2D2E] mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-[#E8DDD0] text-sm focus:outline-none focus:ring-2 focus:ring-[#DD4F22]/30 focus:border-[#DD4F22]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg text-sm font-medium text-[#FDF8F0] bg-[#2D2D2E] hover:bg-[#DD4F22] transition-colors disabled:opacity-50"
          >
            {loading ? 'Accesso...' : 'Accedi'}
          </button>
        </form>
      </div>
    </div>
  )
}
