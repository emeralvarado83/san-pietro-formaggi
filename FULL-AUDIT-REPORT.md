# Full SEO Audit Report — San Pietro Formaggi
**URL:** https://san-pietro-formaggi.vercel.app/
**Date:** 2026-04-06
**Platform:** Next.js 16.2 / React 19 / Sanity CMS / Vercel
**Business:** San Pietro Formaggi s.r.l. — Caseificio Artigianale, Castronovo di Sicilia (PA), Sicilia

---

## Overall SEO Health Score: 44 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 44/100 | 9.7 |
| Content Quality (E-E-A-T) | 23% | 54/100 | 12.4 |
| On-Page SEO | 20% | 45/100 | 9.0 |
| Schema / Structured Data | 10% | 0/100 | 0.0 |
| Performance (CWV est.) | 10% | 65/100 | 6.5 |
| AI Search Readiness (GEO) | 10% | 38/100 | 3.8 |
| Images | 5% | 50/100 | 2.5 |
| **TOTAL** | | | **43.9 / 100** |

---

## Executive Summary

San Pietro Formaggi has a well-built Next.js site with genuine brand assets — a unique product (Tuma Canziata), authentic artisan process detail, and a verifiable legal identity. However, it is functionally invisible to both search engines and AI systems due to five critical missing elements: no robots.txt, no sitemap.xml, no structured data of any kind, no Open Graph metadata, and no Google Business Profile integration. These are all fixable within one to two development days.

### Top 5 Critical Issues
1. **robots.txt missing (404)** — Sanity Studio at `/studio` is publicly crawlable and indexable
2. **sitemap.xml missing (404)** — dynamic product and recipe pages may never be discovered by Google
3. **Zero JSON-LD structured data** — no LocalBusiness, Product, or Recipe rich results possible
4. **Homepage H1 = "Benvenuto"** — zero keyword or entity signal in the page's most important heading
5. **No Google Business Profile integration** — local pack visibility is zero

### Top 5 Quick Wins
1. Create `app/robots.ts` — blocks `/studio`, references sitemap. **30 minutes.**
2. Create `app/sitemap.ts` with dynamic Sanity queries. **1 hour.**
3. Add `metadataBase` + `openGraph` + `twitter` to `app/layout.tsx`. **20 minutes.**
4. Change H1 on HeroSlider slide 0 from "Benvenuto" to keyword-rich text. **5 minutes.**
5. Create `/public/llms.txt` to make the business machine-readable for AI systems. **30 minutes.**

---

## Section 1 — Technical SEO
**Score: 44 / 100**

### CRITICAL

#### robots.txt — MISSING (404)
Without a robots.txt, crawlers have no guidance. Critically, the Sanity Studio admin interface at `/studio` is publicly reachable and indexable. Crawl budget is wasted on admin pages.

**Fix — create `app/robots.ts`:**
```ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/', '/api/'],
    },
    sitemap: 'https://san-pietro-formaggi.vercel.app/sitemap.xml',
  }
}
```

#### sitemap.xml — MISSING (404)
Dynamic product and recipe pages under `/i-nostri-formaggi/[slug]` and `/ricette/[slug]` risk never being crawled. A missing sitemap is the most avoidable indexing friction for a new site.

**Fix — create `app/sitemap.ts`:**
```ts
import type { MetadataRoute } from 'next'
import { getProdotti, getRicette } from '@/lib/sanity'

const BASE = 'https://san-pietro-formaggi.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [prodotti, ricette] = await Promise.all([getProdotti(), getRicette()])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                        lastModified: new Date() },
    { url: `${BASE}/i-nostri-formaggi`, lastModified: new Date() },
    { url: `${BASE}/ricette`,           lastModified: new Date() },
    { url: `${BASE}/lazienda`,          lastModified: new Date() },
    { url: `${BASE}/contatti`,          lastModified: new Date() },
  ]

  const productRoutes: MetadataRoute.Sitemap = prodotti.map((p) => ({
    url: `${BASE}/i-nostri-formaggi/${p.slug.current}`,
    lastModified: new Date(),
  }))

  const recipeRoutes: MetadataRoute.Sitemap = ricette.map((r) => ({
    url: `${BASE}/ricette/${r.slug.current}`,
    lastModified: new Date(),
  }))

  return [...staticRoutes, ...productRoutes, ...recipeRoutes]
}
```

Note: `/studio`, `/api`, `/privacy`, `/disclaimer`, `/richiedi-dati` are intentionally excluded.

#### No Canonical Tags on Any Page
Risk: Vercel preview URLs (`*.vercel.app`) vs. production URL can create duplicate content. Trailing slash variants add further risk.

**Fix — add `metadataBase` to `app/layout.tsx`:**
```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://san-pietro-formaggi.vercel.app'),
  // ...
}
```

Then add `alternates: { canonical: '/' }` to each page's metadata export and `alternates: { canonical: \`/i-nostri-formaggi/${slug}\` }` to `generateMetadata` on dynamic pages.

### HIGH

#### Homepage H1 = "Benvenuto" — No Keyword Signal
Source: `components/HeroSlider.tsx` slide 0 is SSR-rendered with H1 "Benvenuto".

**Fix:** Change slide 0 H1 to `"Formaggi Artigianali Siciliani"` or `"Caseificio Artigianale a Castronovo di Sicilia"`.

#### No Open Graph or Twitter Card Tags
Every social share falls back to browser defaults — no image, no formatted title. Critical for a food business where visuals drive clicks.

**Fix — add to `app/layout.tsx` metadata:**
```ts
openGraph: {
  type: 'website',
  locale: 'it_IT',
  siteName: 'San Pietro Formaggi',
  title: 'San Pietro Formaggi | Caseificio Artigianale Siciliano',
  description: 'Formaggi artigianali prodotti nel cuore della Sicilia, a Castronovo di Sicilia (PA)...',
  images: [{ url: '/san-pietro-formaggi-logo-fondo-blanco.png', width: 1200, height: 630 }],
},
twitter: {
  card: 'summary_large_image',
  title: 'San Pietro Formaggi | Caseificio Artigianale Siciliano',
  images: ['/san-pietro-formaggi-logo-fondo-blanco.png'],
},
```

#### Recipe Detail Pages Have No Meta Description
Source: `app/ricette/[slug]/page.tsx` `generateMetadata` returns only `title`.

**Fix:**
```ts
return {
  title: recipe.titolo,
  description: recipe.indicazioni
    ? recipe.indicazioni.slice(0, 155)
    : 'Ricetta tradizionale siciliana con i formaggi artigianali di San Pietro Formaggi.',
  alternates: { canonical: `/ricette/${slug}` },
}
```

#### `/studio` is Publicly Accessible and Indexable
Source: `app/studio/[[...tool]]/page.tsx` exists with no access control.

**Fix:** The `robots.ts` above disallows `/studio/`. Additionally add:
```ts
export const metadata = { robots: { index: false } }
```
to `app/studio/[[...tool]]/page.tsx`. Separately implement the pending middleware for password protection.

### MEDIUM

#### Title Tags Need Improvement

| Page | Current | Recommended |
|---|---|---|
| `/i-nostri-formaggi` | "Catalogo \| San Pietro Formaggi" | "I Nostri Formaggi Artigianali \| San Pietro Formaggi" |
| `/lazienda` | "Chi Siamo \| San Pietro Formaggi" | "Caseificio di Castronovo di Sicilia \| San Pietro Formaggi" |
| `/ricette` | "Ricette \| San Pietro Formaggi" | "Ricette con Formaggi Siciliani \| San Pietro Formaggi" |

#### Homepage Meta Description Too Long
Current: 177 chars (Google truncates at ~155). Trim to:
"Formaggi artigianali prodotti nel cuore della Sicilia, a Castronovo di Sicilia (PA). Pecorini, caciocavalli, ricotte e tradizione casearia siciliana." (148 chars)

#### Meta Keywords Tag Present
`app/layout.tsx` line 28 includes `keywords` field. Google has ignored this since 2009. Remove it.

#### Privacy/Disclaimer Pages Should Be Noindexed
Add `export const metadata = { robots: { index: false } }` to `/privacy`, `/disclaimer`, `/richiedi-dati` pages.

### LOW

#### Security Headers
Vercel provides HTTPS and HSTS automatically. Add missing headers to `next.config.ts`:
```ts
async headers() {
  return [{
    source: '/(.*)',
    headers: [
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ],
  }]
}
```

#### Core Web Vitals (Estimated)
- **LCP:** 1.8–2.8s (Good to Needs Improvement). Hero image has `priority={true}` on slide 0. Risk: homepage calls `getProdotti()` without caching — add `{ next: { revalidate: 3600 } }` to the Sanity fetch.
- **INP:** Good (<200ms). No heavy third-party scripts.
- **CLS:** Good (<0.1). Images use `fill` with defined containers. `next/font` prevents font-related CLS.

#### Internal Linking Gap
Recipe pages don't link to featured products and vice versa. Add cross-links between recipe pages and the relevant product detail pages.

---

## Section 2 — Content Quality (E-E-A-T)
**Score: 54 / 100**

### E-E-A-T Breakdown

| Factor | Score | Weight | Contribution |
|---|---|---|---|
| Experience | 58/100 | 20% | 11.6 |
| Expertise | 52/100 | 25% | 13.0 |
| Authoritativeness | 38/100 | 25% | 9.5 |
| Trustworthiness | 62/100 | 30% | 18.6 |
| **Composite** | | | **52.7 / 100** |

### Experience (58/100)
**Strengths:** Tuma Canziata origin story names specific shepherd practices (transumanza). Aging page details fir-wood shelves, weekly hand-turning, dry-salting. Product descriptions reference Madonie milk and specific aging windows.

**Gaps:** No founding year, no founder name, no verified photos of the actual facility. Product descriptions in `lib/data.ts` are static fallback — verify they match live Sanity CMS data.

### Expertise (52/100)
**Strengths:** Technical process knowledge demonstrated: brine vs. dry-salting distinction, specific aging durations, pasta-filata technique, shelf material. These are credible hands-on knowledge signals.

**Gaps:** No named authors anywhere. No mastro casaro identified. The `SanityRicetta` interface has no `autore` field — add one to the Sanity schema. No formal credentials or trade-body affiliations cited.

### Authoritativeness (38/100) — LOWEST FACTOR
**Strengths:** Verifiable P.IVA (06734000828), physical address, named email domain.

**Gaps:** No press mentions, no awards (Slow Food, regional DOP, food fairs), no external recognition of any kind. No social media links visible. No industry association memberships. No backlink signals.

### Trustworthiness (62/100)
**Strengths:** Full legal identity disclosed (address, P.IVA, email, phone, hours). Clear no-online-payment explanation. Privacy Policy, Disclaimer, and GDPR request pages exist. `lang="it"` correctly set.

**Gaps:** No cookie consent / CMP (required under Garante Privacy / Italian GDPR transposition). No testimonials. Phone number only in footer — not on contact page body. No map embed.

### Page-by-Page Word Count Assessment

| Page | Est. Word Count | Minimum | Status |
|---|---|---|---|
| Homepage | ~280 | 500 | FAIL |
| /lazienda | ~220 | 800 | FAIL |
| /i-nostri-formaggi | ~120 (index) | 300 | FAIL |
| /ricette | ~80 (index) | 200 | PASS-ish |
| Product detail pages | ~150-250 each | 300 | BORDERLINE |
| Recipe detail pages | ~200-350 each | 300 | PASS |

### AI Citation Readiness: 41/100
Tuma Canziata origin story and aging process details are quotable but too short (<134 words). Recipes are the highest-scoring content for AI citation but lack Recipe schema. No FAQ section anywhere.

---

## Section 3 — Schema / Structured Data
**Score: 0 / 100**

**Status: Zero structured data on any page.** No JSON-LD, no Microdata, no RDFa.

### Missing Schema — Priority Order

| Priority | Type | Page | Rich Result Unlocked |
|---|---|---|---|
| CRITICAL | `FoodEstablishment` + `LocalBusiness` | `/` and layout | Knowledge Panel, Local Pack |
| CRITICAL | `BreadcrumbList` | All `[slug]` pages | Breadcrumb trail in SERPs |
| HIGH | `Product` | `/i-nostri-formaggi/[slug]` | Product rich result |
| HIGH | `Recipe` | `/ricette/[slug]` | Recipe rich result (image, time, ingredients) |
| HIGH | `ItemList` | `/i-nostri-formaggi`, `/ricette` | Carousel rich result |
| HIGH | `WebSite` + `SearchAction` | `/` | Sitelinks Searchbox |
| MEDIUM | `AboutPage` | `/lazienda` | Better content understanding |
| MEDIUM | `ContactPage` | `/contatti` | Better content understanding |

### LocalBusiness JSON-LD (for `app/layout.tsx`)
```json
{
  "@context": "https://schema.org",
  "@type": ["FoodEstablishment", "LocalBusiness"],
  "@id": "https://san-pietro-formaggi.vercel.app/#organization",
  "name": "San Pietro Formaggi s.r.l.",
  "description": "Caseificio artigianale situato a Castronovo di Sicilia (PA). Produttore di formaggi artigianali siciliani: pecorini, caciocavalli, provole, ricotte e la Tuma Canziata.",
  "url": "https://san-pietro-formaggi.vercel.app/",
  "telephone": "+390918217240",
  "email": "info@sanpietroformaggi.com",
  "vatID": "IT06734000828",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Piazzetta San Giovanni 2",
    "addressLocality": "Castronovo di Sicilia",
    "addressRegion": "PA",
    "postalCode": "90031",
    "addressCountry": "IT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 37.6817,
    "longitude": 13.6044
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "08:00",
    "closes": "18:00"
  }],
  "priceRange": "€€",
  "servesCuisine": "Siciliana"
}
```

**Implementation in Next.js App Router:**
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObject) }}
/>
```
Place before `</body>` in `app/layout.tsx`. JSON-LD can appear anywhere in the document body — it does not need to be in `<head>`.

### Product JSON-LD (for `/i-nostri-formaggi/[slug]/page.tsx`)
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "[product.name]",
  "description": "[product.descrizioneBreve]",
  "image": "[urlFor(product.immagine).width(800).height(600).url()]",
  "brand": { "@type": "Brand", "name": "San Pietro Formaggi" },
  "manufacturer": { "@id": "https://san-pietro-formaggi.vercel.app/#organization" },
  "category": "[product.categoria]",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "EUR",
    "seller": { "@id": "https://san-pietro-formaggi.vercel.app/#organization" },
    "url": "https://san-pietro-formaggi.vercel.app/contatti"
  }
}
```

### Recipe JSON-LD (for `/ricette/[slug]/page.tsx`)
```json
{
  "@context": "https://schema.org",
  "@type": "Recipe",
  "name": "[recipe.titolo]",
  "author": {
    "@type": "Organization",
    "name": "San Pietro Formaggi",
    "@id": "https://san-pietro-formaggi.vercel.app/#organization"
  },
  "recipeCategory": "Siciliana",
  "recipeIngredient": "[recipe.ingredienti as array]",
  "recipeInstructions": "[recipe.preparazione mapped to HowToStep array]",
  "totalTime": "PT30M",
  "recipeYield": "4 persone",
  "datePublished": "2024-01-01"
}
```

---

## Section 4 — Local SEO
**Score: 19 / 100**

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| GBP Signals | 25% | 0/100 | 0.0 |
| Reviews & Reputation | 20% | 0/100 | 0.0 |
| Local On-Page SEO | 20% | 55/100 | 11.0 |
| NAP Consistency | 15% | 40/100 | 6.0 |
| Local Schema Markup | 10% | 0/100 | 0.0 |
| Local Link & Authority | 10% | 20/100 | 2.0 |
| **Total** | | | **19 / 100** |

### NAP Issues

**Canonical NAP (use this everywhere):**
- Name: San Pietro Formaggi s.r.l.
- Address: Piazzetta San Giovanni 2, 90031 Castronovo di Sicilia (PA), Sicilia, Italia
- Phone: +39 091 8217240

**Discrepancies found:**
- CAP (90031) is missing from all address references on the site
- Phone displays as "091 8217240" on-site but href is `tel:+390918217240` — standardize visible display to "+39 091 8217240"
- "s.r.l." appears only in the copyright line — use consistently
- Business hours appear only on `/contatti` — also add to footer and to schema

### Google Business Profile — STATUS UNKNOWN, LIKELY ABSENT
GBP is the single highest-impact action for local visibility. No GBP embed, no GBP link, no Place ID referenced anywhere in the codebase.

**Recommended GBP primary category:** "Caseificio" (or "Produttore di formaggi")
**Secondary categories:** Negozio di prodotti lattiero-caseari, Negozio di specialità alimentari

### Local Keyword Gaps

| Missing Keyword | Where to Add |
|---|---|
| Palermo / provincia di Palermo | `/lazienda` title, homepage H2 |
| Madonie | Title tags, meta descriptions, H2 headings |
| acquisto formaggi siciliani | `/contatti` body copy |
| caseificio Palermo provincia | `/contatti` and `/lazienda` |
| formaggi artigianali Madonie | `/i-nostri-formaggi` intro |

### B2B Buyer Page Missing
The homepage mentions "ristoratori" but no dedicated page exists for restaurant/retail buyers. A `/ristoranti-e-rivenditori` page targeting "fornitore formaggi ristoranti Palermo" would capture high-value commercial intent.

### Citation Priorities (Italian Tier 1)

| Directory | Priority |
|---|---|
| Google Business Profile | Critical |
| Pagine Gialle (paginegialle.it) | Critical |
| Yelp Italy (yelp.it) | High |
| TripAdvisor | High |
| Camera di Commercio di Palermo | High |
| Slow Food producers directory | Medium |
| Botteghe di Sicilia / Sapori di Sicilia | Medium |

---

## Section 5 — AI Search Readiness (GEO)
**Score: 38 / 100**

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| Citability | 25% | 42/100 | 10.5 |
| Structural Readability | 20% | 35/100 | 7.0 |
| Multi-Modal Content | 15% | 30/100 | 4.5 |
| Authority & Brand Signals | 20% | 22/100 | 4.4 |
| Technical Accessibility | 20% | 58/100 | 11.6 |
| **Total** | | | **38 / 100** |

### Platform Visibility Estimates

| Platform | Score | Primary Blocker |
|---|---|---|
| Google AI Overviews | 15/100 | No structured data, no E-E-A-T signals |
| ChatGPT (web search) | 20/100 | No robots.txt allow, no llms.txt |
| Perplexity | 25/100 | Content crawlable (SSR) but no citation-ready passages |
| Bing Copilot | 18/100 | No OG tags, no sitemap, limited inbound links |

### AI Crawler Access
No robots.txt means crawlers receive no directives. GPTBot, ClaudeBot, PerplexityBot are not blocked but also not explicitly invited. Creating robots.txt with explicit `Allow: /` for all AI crawlers sends a positive signal.

### llms.txt — Missing
Create `/public/llms.txt` with a structured machine-readable brief. The Tuma Canziata story, aging process, product taxonomy, and contact model are all ideal llms.txt content. A draft is provided in the Action Plan.

### Passage-Level Citability

| Page | Score | Notes |
|---|---|---|
| `/ricette/[slug]` | 62/100 | Best content — structured ingredients + steps. Missing Recipe schema. |
| `/i-nostri-formaggi/[slug]` | 55/100 | Factual product descriptions. Below 134-word threshold. |
| `/lazienda` | 52/100 | Good process facts (dry-salting, fir wood). Too short. |
| Homepage | 32/100 | Tuma Canziata paragraph is quotable but at 50 words — too short. |
| `/contatti` | 28/100 | Useful for entity extraction but minimal prose. |

### Highest-Impact GEO Fixes
1. Add JSON-LD to all pages (unlocks AIO rich results)
2. Create `robots.txt` with AI crawler allow rules + sitemap pointer
3. Create `/public/llms.txt`
4. Restructure content so each section opens with a direct 40-60 word answer
5. Add a YouTube video showing the aging cave / Tuma Canziata story (highest brand mention correlation)
6. Wikipedia stub for "Tuma Canziata" — the etymology + shepherd tradition + named producer meets stub criteria

---

## Section 6 — Sitemap
**Score: 0 / 100 (404)**

The implementation instructions are in Section 1. A static fallback XML covering known pages is:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://san-pietro-formaggi.vercel.app/</loc></url>
  <url><loc>https://san-pietro-formaggi.vercel.app/i-nostri-formaggi</loc></url>
  <url><loc>https://san-pietro-formaggi.vercel.app/ricette</loc></url>
  <url><loc>https://san-pietro-formaggi.vercel.app/lazienda</loc></url>
  <url><loc>https://san-pietro-formaggi.vercel.app/contatti</loc></url>
</urlset>
```

However, the dynamic `app/sitemap.ts` in Section 1 is strongly preferred — it auto-includes all 24 product pages and all recipe pages by querying Sanity.

---

## Key Files Reference

| File | Issues |
|---|---|
| `app/layout.tsx` | No metadataBase, no OG, no Twitter, no JSON-LD, meta keywords present |
| `app/robots.ts` | MISSING — must create |
| `app/sitemap.ts` | MISSING — must create |
| `public/robots.txt` | MISSING |
| `public/llms.txt` | MISSING |
| `components/HeroSlider.tsx` | H1 on slide 0 = "Benvenuto" |
| `app/ricette/[slug]/page.tsx` | No meta description, no canonical, no Recipe JSON-LD |
| `app/i-nostri-formaggi/[slug]/page.tsx` | No canonical, no Product JSON-LD |
| `app/studio/[[...tool]]/page.tsx` | No noindex, publicly crawlable |
| `app/contatti/page.tsx` | No map embed, phone only in footer |
| `next.config.ts` | No security headers configured |
| `lib/sanity.ts` | Sanity fetch calls lack `revalidate` option |
