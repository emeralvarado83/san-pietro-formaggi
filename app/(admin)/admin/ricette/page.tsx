'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Ricetta {
  id: string
  titolo: string
  slug: string
}

export default function RicettePage() {
  const [ricette, setRicette] = useState<Ricetta[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/ricette')
      .then((r) => r.json())
      .then((data) => {
        setRicette(data)
        setLoading(false)
      })
  }, [])

  async function handleDelete(id: string, titolo: string) {
    if (!confirm(`Eliminare "${titolo}"?`)) return

    const res = await fetch(`/api/admin/ricette/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setRicette((prev) => prev.filter((r) => r.id !== id))
    }
  }

  if (loading) return <div className="p-8 text-sm text-gray-500">Caricamento...</div>

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-semibold text-[#2D2D2E]">Ricette</h1>
        <Link
          href="/admin/ricette/nuovo"
          className="px-4 py-2 rounded-lg text-sm font-medium text-[#FDF8F0] bg-[#DD4F22] hover:bg-[#c4441d] transition-colors"
        >
          + Nuova Ricetta
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-[#E8DDD0] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E8DDD0] bg-[#FAF7F2]">
              <th className="text-left px-6 py-3 text-xs uppercase tracking-widest font-medium text-[#2D2D2E]/60">Titolo</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-widest font-medium text-[#2D2D2E]/60">Slug</th>
              <th className="text-right px-6 py-3 text-xs uppercase tracking-widest font-medium text-[#2D2D2E]/60">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {ricette.map((r) => (
              <tr key={r.id} className="border-b border-[#E8DDD0] last:border-0">
                <td className="px-6 py-4 font-medium text-[#2D2D2E]">{r.titolo}</td>
                <td className="px-6 py-4 text-[#2D2D2E]/70">{r.slug}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Link
                    href={`/admin/ricette/${r.id}/modifica`}
                    className="text-[#DD4F22] hover:underline"
                  >
                    Modifica
                  </Link>
                  <button
                    onClick={() => handleDelete(r.id, r.titolo)}
                    className="text-red-500 hover:underline"
                  >
                    Elimina
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {ricette.length === 0 && (
          <p className="p-6 text-center text-gray-400 text-sm">Nessuna ricetta trovata.</p>
        )}
      </div>
    </div>
  )
}
