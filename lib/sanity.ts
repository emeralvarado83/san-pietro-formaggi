import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = createImageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source)
}

// ── Types ──────────────────────────────────────────────

export interface SanityProdotto {
  _id: string
  name: string
  slug: { current: string }
  categoria: 'Freschi' | 'Semistagionati' | 'Stagionati' | 'Specialità'
  descrizioneBreve: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  descrizione?: any[]
  disponibilita?: 'Disponibile' | 'Non disponibile'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  immagine?: any
}

export interface SanityRicetta {
  _id: string
  titolo: string
  slug: { current: string }
  indicazioni?: string
  ingredienti?: string
  preparazione?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  immagine?: any
}

// ── Queries ────────────────────────────────────────────

export async function getProdotti(): Promise<SanityProdotto[]> {
  return client.fetch(`*[_type == "prodotto"] | order(categoria asc, name asc) {
    _id,
    name,
    slug,
    categoria,
    descrizioneBreve,
    descrizione,
    disponibilita,
    immagine
  }`)
}

export async function getProdotto(slug: string): Promise<SanityProdotto | null> {
  return client.fetch(
    `*[_type == "prodotto" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      categoria,
      descrizioneBreve,
      descrizione,
      disponibilita,
      immagine
    }`,
    { slug }
  )
}

export async function getRicette(): Promise<SanityRicetta[]> {
  return client.fetch(`*[_type == "ricetta"] | order(titolo asc) {
    _id,
    titolo,
    slug,
    indicazioni,
    ingredienti,
    preparazione,
    immagine
  }`)
}

export async function getRicetta(slug: string): Promise<SanityRicetta | null> {
  return client.fetch(
    `*[_type == "ricetta" && slug.current == $slug][0] {
      _id,
      titolo,
      slug,
      indicazioni,
      ingredienti,
      preparazione,
      immagine
    }`,
    { slug }
  )
}
