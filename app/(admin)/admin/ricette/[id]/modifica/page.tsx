'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import RichTextEditor from '@/components/RichTextEditor'

export default function ModificaRicettaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    titolo: '',
    slug: '',
    indicazioni: '',
    ingredienti: '',
    preparazione: '',
    immagine: '',
  })

  useEffect(() => {
    fetch(`/api/admin/ricette/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({
          titolo: data.titolo || '',
          slug: data.slug || '',
          indicazioni: data.indicazioni || '',
          ingredienti: data.ingredienti || '',
          preparazione: data.preparazione || '',
          immagine: data.immagine || '',
        })
        setFetching(false)
      })
  }, [id])

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.url) update('immagine', data.url)
      else setError(data.error || 'Errore nel caricamento')
    } catch {
      setError('Errore nel caricamento dell\'immagine')
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`/api/admin/ricette/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Errore nell\'aggiornamento')
        return
      }

      router.push('/admin/ricette')
    } catch {
      setError('Errore di connessione')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) return <div className="p-8 text-sm text-gray-500">Caricamento...</div>

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="font-display text-3xl font-semibold text-[#2D2D2E] mb-8">Modifica Ricetta</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">{error}</div>
        )}

        <div>
          <label className="block text-xs uppercase tracking-widest font-medium text-[#2D2D2E] mb-2">Titolo</label>
          <input
            type="text"
            value={form.titolo}
            onChange={(e) => update('titolo', e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-[#E8DDD0] text-sm focus:outline-none focus:ring-2 focus:ring-[#DD4F22]/30"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest font-medium text-[#2D2D2E] mb-2">Slug</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => update('slug', e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-[#E8DDD0] text-sm focus:outline-none focus:ring-2 focus:ring-[#DD4F22]/30"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest font-medium text-[#2D2D2E] mb-2">Indicazioni</label>
          <RichTextEditor value={form.indicazioni} onChange={(val) => update('indicazioni', val)} />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest font-medium text-[#2D2D2E] mb-2">Ingredienti</label>
          <RichTextEditor value={form.ingredienti} onChange={(val) => update('ingredienti', val)} />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest font-medium text-[#2D2D2E] mb-2">Preparazione</label>
          <RichTextEditor value={form.preparazione} onChange={(val) => update('preparazione', val)} />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest font-medium text-[#2D2D2E] mb-2">Immagine</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full text-sm"
          />
          {uploading && <p className="text-xs text-gray-500 mt-1">Caricamento in corso...</p>}
          {form.immagine && (
            <img src={form.immagine} alt="Preview" className="mt-2 h-32 rounded-lg object-cover" />
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading || uploading}
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-[#FDF8F0] bg-[#DD4F22] hover:bg-[#c4441d] transition-colors disabled:opacity-50"
          >
            {loading ? 'Salvataggio...' : 'Salva Modifiche'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-[#2D2D2E] border border-[#E8DDD0] hover:bg-[#FAF7F2] transition-colors"
          >
            Annulla
          </button>
        </div>
      </form>
    </div>
  )
}
