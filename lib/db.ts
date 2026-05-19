import { prisma } from './prisma'
import { featuredCategories } from './data'

export type { Prodotto, Ricetta } from '@prisma/client'

export async function getProdotti() {
  try {
    return await prisma.prodotto.findMany({
      orderBy: [{ categoria: 'asc' }, { name: 'asc' }],
    })
  } catch {
    console.error('DB non raggiungibile – getProdotti restituisce []')
    return []
  }
}

export async function getFeaturedProducts() {
  try {
    const results = await Promise.all(
      featuredCategories.map((cat) =>
        prisma.prodotto.findFirst({
          where: { categoria: cat, destacado: true },
        }),
      ),
    )
    return results.filter((p): p is NonNullable<typeof p> => p !== null)
  } catch {
    console.error('DB non raggiungibile – getFeaturedProducts restituisce []')
    return []
  }
}

export async function getProdotto(slug: string) {
  try {
    return await prisma.prodotto.findUnique({ where: { slug } })
  } catch {
    console.error('DB non raggiungibile – getProdotto restituisce null')
    return null
  }
}

export async function getRicette() {
  try {
    return await prisma.ricetta.findMany({
      orderBy: { titolo: 'asc' },
    })
  } catch {
    console.error('DB non raggiungibile – getRicette restituisce []')
    return []
  }
}

export async function getRicetta(slug: string) {
  try {
    return await prisma.ricetta.findUnique({ where: { slug } })
  } catch {
    console.error('DB non raggiungibile – getRicetta restituisce null')
    return null
  }
}
