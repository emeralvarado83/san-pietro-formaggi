import type { Metadata } from 'next'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sanpietroformaggi.com'

export const SITE_NAME = 'San Pietro Formaggi'

export const DEFAULT_OG_IMAGE = '/latticini-formaggi.png'

export function canonical(path: string): string {
  const base = SITE_URL.replace(/\/$/, '')
  const clean = path.startsWith('/') ? path : `/${path}`
  return `${base}${clean}`
}

/** Absolute URL for an image that may already be absolute (e.g. Cloudinary). */
export function absoluteUrl(src: string): string {
  return /^https?:\/\//i.test(src) ? src : canonical(src)
}

/** Strip HTML tags/entities and collapse whitespace. */
export function stripHtml(html: string | null | undefined): string {
  if (!html) return ''
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Plain-text meta description, cut at a word boundary (~155 chars). */
export function metaDescription(text: string | null | undefined, max = 155): string {
  const plain = stripHtml(text)
  if (plain.length <= max) return plain
  const cut = plain.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.–-]+$/, '')}…`
}

/**
 * Full metadata for a page. Next.js replaces `openGraph`/`twitter` objects
 * from parent layouts instead of merging them, so every page must send the
 * complete set (url, siteName, locale…), otherwise og:url falls back to "/".
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = 'website',
  absoluteTitle = false,
}: {
  title: string
  description: string
  path: string
  image?: string | null
  type?: 'website' | 'article'
  absoluteTitle?: boolean
}): Metadata {
  const url = canonical(path)
  const ogImage = image || DEFAULT_OG_IMAGE
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      locale: 'it_IT',
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [ogImage],
    },
  }
}
