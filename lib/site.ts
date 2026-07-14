export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sanpietroformaggi.com'

export function canonical(path: string): string {
  const base = SITE_URL.replace(/\/$/, '')
  const clean = path.startsWith('/') ? path : `/${path}`
  return `${base}${clean}`
}
