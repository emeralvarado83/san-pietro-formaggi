import type { MetadataRoute } from 'next'
import { getProdotti, getRicette } from '@/lib/db'
import { canonical } from '@/lib/site'

export const revalidate = 3600

/** Most recent `updatedAt` of a list, or undefined if the list is empty. */
function latest(items: { updatedAt: Date }[]): Date | undefined {
  if (items.length === 0) return undefined
  return new Date(Math.max(...items.map((i) => i.updatedAt.getTime())))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [prodotti, ricette] = await Promise.all([getProdotti(), getRicette()])

  const lastProduct = latest(prodotti)
  const lastRecipe = latest(ricette)
  const lastContent = latest([...prodotti, ...ricette])

  // lastModified must reflect real content changes: a date that is always
  // "now" is ignored by Google. Static pages without a reliable date omit it.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: canonical('/'), lastModified: lastContent },
    { url: canonical('/i-nostri-formaggi'), lastModified: lastProduct },
    { url: canonical('/ricette'), lastModified: lastRecipe },
    { url: canonical('/lazienda') },
    { url: canonical('/contatti') },
  ]

  const productRoutes: MetadataRoute.Sitemap = prodotti.map((p) => ({
    url: canonical(`/i-nostri-formaggi/${p.slug}`),
    lastModified: p.updatedAt,
  }))

  const recipeRoutes: MetadataRoute.Sitemap = ricette.map((r) => ({
    url: canonical(`/ricette/${r.slug}`),
    lastModified: r.updatedAt,
  }))

  return [...staticRoutes, ...productRoutes, ...recipeRoutes]
}
