import type { MetadataRoute } from 'next'
import { getProdotti, getRicette } from '@/lib/sanity'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sanpietroformaggi.com'

// Regenera el sitemap cada hora en Vercel (ISR)
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [prodotti, ricette] = await Promise.all([getProdotti(), getRicette()])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                        lastModified: new Date() },
    { url: `${BASE_URL}/i-nostri-formaggi`, lastModified: new Date() },
    { url: `${BASE_URL}/ricette`,           lastModified: new Date() },
    { url: `${BASE_URL}/lazienda`,          lastModified: new Date() },
    { url: `${BASE_URL}/contatti`,          lastModified: new Date() },
  ]

  const productRoutes: MetadataRoute.Sitemap = prodotti.map((p) => ({
    url: `${BASE_URL}/i-nostri-formaggi/${p.slug.current}`,
    lastModified: new Date(),
  }))

  const recipeRoutes: MetadataRoute.Sitemap = ricette.map((r) => ({
    url: `${BASE_URL}/ricette/${r.slug.current}`,
    lastModified: new Date(),
  }))

  return [...staticRoutes, ...productRoutes, ...recipeRoutes]
}
