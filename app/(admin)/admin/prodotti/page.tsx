'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Prodotto {
  id: string
  name: string
  slug: string
  categoria: string
  disponibilita: string
  destacado: boolean
}

export default function ProdottiPage() {
  const [prodotti, setProdotti] = useState<Prodotto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/prodotti')
      .then((r) => r.json())
      .then((data) => {
        setProdotti(data)
        setLoading(false)
      })
  }, [])

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Eliminare "${name}"?`)) return

    const res = await fetch(`/api/admin/prodotti/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setProdotti((prev) => prev.filter((p) => p.id !== id))
    }
  }

  if (loading) return <div className="p-8 text-sm text-gray-500">Caricamento...</div>

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-semibold text-[#2D2D2E]">Prodotti</h1>
        <Link
          href="/admin/prodotti/nuovo"
          className="px-4 py-2 rounded-lg text-sm font-medium text-[#FDF8F0] bg-[#DD4F22] hover:bg-[#c4441d] transition-colors"
        >
          + Nuovo Prodotto
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-[#E8DDD0] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E8DDD0] bg-[#FAF7F2]">
              <th className="text-left px-6 py-3 text-xs uppercase tracking-widest font-medium text-[#2D2D2E]/60">Nome</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-widest font-medium text-[#2D2D2E]/60">Categoria</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-widest font-medium text-[#2D2D2E]/60">Stato</th>
              <th className="text-left px-6 py-3 text-xs uppercase tracking-widest font-medium text-[#2D2D2E]/60">Evidenza</th>
              <th className="text-right px-6 py-3 text-xs uppercase tracking-widest font-medium text-[#2D2D2E]/60">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {prodotti.map((p) => (
              <tr key={p.id} className="border-b border-[#E8DDD0] last:border-0">
                <td className="px-6 py-4 font-medium text-[#2D2D2E]">{p.name}</td>
                <td className="px-6 py-4 text-[#2D2D2E]/70">{p.categoria}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                    p.disponibilita === 'Non disponibile' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                  }`}>
                    {p.disponibilita}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {p.destacado && (
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-[#FBC703]/20 text-[#8B5E3C]">
                      In evidenza
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Link
                    href={`/admin/prodotti/${p.id}/modifica`}
                    className="text-[#DD4F22] hover:underline"
                  >
                    Modifica
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id, p.name)}
                    className="text-red-500 hover:underline"
                  >
                    Elimina
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {prodotti.length === 0 && (
          <p className="p-6 text-center text-gray-400 text-sm">Nessun prodotto trovato.</p>
        )}
      </div>
    </div>
  )
}
