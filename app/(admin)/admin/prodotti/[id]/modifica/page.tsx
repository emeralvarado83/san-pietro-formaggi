'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { categories, featuredCategories } from '@/lib/data'
import RichTextEditor from '@/components/RichTextEditor'

export default function ModificaProdottoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    slug: '',
    categoria: 'Freschi',
    descrizioneBreve: '',
    descrizione: '',
    disponibilita: 'Disponibile',
    destacado: false,
    immagine: '',
  })

  const canBeFeatured = featuredCategories.includes(form.categoria as (typeof featuredCategories)[number])

  useEffect(() => {
    fetch(`/api/admin/prodotti/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({
          name: data.name || '',
          slug: data.slug || '',
          categoria: data.categoria || 'Freschi',
          descrizioneBreve: data.descrizioneBreve || '',
          descrizione: data.descrizione || '',
          disponibilita: data.disponibilita || 'Disponibile',
          destacado: Boolean(data.destacado),
          immagine: data.immagine || '',
        })
        setFetching(false)
      })
  }, [id])

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function updateCategoria(value: string) {
    setForm((prev) => ({
      ...prev,
      categoria: value,
      destacado: featuredCategories.includes(value as (typeof featuredCategories)[number]) ? prev.destacado : false,
    }))
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
      const res = await fetch(`/api/admin/prodotti/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Errore nell\'aggiornamento')
        return
      }

      router.push('/admin/prodotti')
    } catch {
      setError('Errore di connessione')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) return <div className="p-8 text-sm text-gray-500">Caricamento...</div>

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="font-display text-3xl font-semibold text-[#2D2D2E] mb-8">Modifica Prodotto</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">{error}</div>
        )}

        <div>
          <label className="block text-xs uppercase tracking-widest font-medium text-[#2D2D2E] mb-2">Nome</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
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
          <label className="block text-xs uppercase tracking-widest font-medium text-[#2D2D2E] mb-2">Categoria</label>
          <select
            value={form.categoria}
            onChange={(e) => updateCategoria(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-[#E8DDD0] text-sm focus:outline-none focus:ring-2 focus:ring-[#DD4F22]/30"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {canBeFeatured && (
          <label className="flex items-start gap-3 rounded-lg border border-[#E8DDD0] bg-[#FAF7F2] p-4 text-sm text-[#2D2D2E]">
            <input
              type="checkbox"
              checked={form.destacado}
              onChange={(e) => update('destacado', e.target.checked)}
              className="mt-1"
            />
            <span>
              <span className="block font-medium">Prodotto in evidenza</span>
              <span className="block text-xs text-[#2D2D2E]/60">
                Solo un prodotto può essere in evidenza per categoria.
              </span>
            </span>
          </label>
        )}

        <div>
          <label className="block text-xs uppercase tracking-widest font-medium text-[#2D2D2E] mb-2">Descrizione Breve</label>
          <input
            type="text"
            value={form.descrizioneBreve}
            onChange={(e) => update('descrizioneBreve', e.target.value)}
            required
            maxLength={600}
            className="w-full px-4 py-2.5 rounded-lg border border-[#E8DDD0] text-sm focus:outline-none focus:ring-2 focus:ring-[#DD4F22]/30"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest font-medium text-[#2D2D2E] mb-2">Descrizione Completa</label>
          <RichTextEditor value={form.descrizione} onChange={(val) => update('descrizione', val)} />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest font-medium text-[#2D2D2E] mb-2">Disponibilità</label>
          <select
            value={form.disponibilita}
            onChange={(e) => update('disponibilita', e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-[#E8DDD0] text-sm focus:outline-none focus:ring-2 focus:ring-[#DD4F22]/30"
          >
            <option value="Disponibile">Disponibile</option>
            <option value="Non disponibile">Non disponibile</option>
          </select>
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
