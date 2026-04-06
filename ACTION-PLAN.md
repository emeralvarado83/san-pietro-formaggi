# SEO Action Plan — San Pietro Formaggi
**Generated:** 2026-04-06
**Overall Score:** 44 / 100
**Target Score:** 72 / 100 (after all Critical + High fixes)

---

## CRITICAL — Fix Immediately (Day 1–2)

### C1. Create `app/robots.ts`
**File:** `app/robots.ts` (new)
**Time:** 30 min
**Impact:** Stops `/studio` from being indexed; declares sitemap to all crawlers; explicitly invites AI crawlers.

```ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/api/'],
      },
    ],
    sitemap: 'https://san-pietro-formaggi.vercel.app/sitemap.xml',
  }
}
```

---

### C2. Create `app/sitemap.ts`
**File:** `app/sitemap.ts` (new)
**Time:** 1 hour
**Impact:** All 24 product pages and all recipe pages become immediately discoverable. Submit to Google Search Console after deploy.

```ts
import type { MetadataRoute } from 'next'
import { getProdotti, getRicette } from '@/lib/sanity'

const BASE = 'https://san-pietro-formaggi.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [prodotti, ricette] = await Promise.all([getProdotti(), getRicette()])

  return [
    { url: BASE,                        lastModified: new Date() },
    { url: `${BASE}/i-nostri-formaggi`, lastModified: new Date() },
    { url: `${BASE}/ricette`,           lastModified: new Date() },
    { url: `${BASE}/lazienda`,          lastModified: new Date() },
    { url: `${BASE}/contatti`,          lastModified: new Date() },
    ...prodotti.map((p) => ({
      url: `${BASE}/i-nostri-formaggi/${p.slug.current}`,
      lastModified: new Date(),
    })),
    ...ricette.map((r) => ({
      url: `${BASE}/ricette/${r.slug.current}`,
      lastModified: new Date(),
    })),
  ]
}
```

---

### C3. Add `metadataBase` + Open Graph + Twitter to `app/layout.tsx`
**File:** `app/layout.tsx`
**Time:** 20 min
**Impact:** Fixes canonical URL resolution; enables social sharing previews; prerequisite for all other OG work.

In the existing `metadata` export, add:
```ts
metadataBase: new URL('https://san-pietro-formaggi.vercel.app'),
openGraph: {
  type: 'website',
  locale: 'it_IT',
  siteName: 'San Pietro Formaggi',
  title: 'San Pietro Formaggi | Caseificio Artigianale Siciliano',
  description: 'Formaggi artigianali prodotti nel cuore della Sicilia, a Castronovo di Sicilia (PA). Pecorini, caciocavalli, ricotte e tradizione casearia.',
  images: [{ url: '/san-pietro-formaggi-logo-fondo-blanco.png', width: 1200, height: 630 }],
},
twitter: {
  card: 'summary_large_image',
  title: 'San Pietro Formaggi | Caseificio Artigianale Siciliano',
  description: 'Formaggi artigianali prodotti nel cuore della Sicilia, a Castronovo di Sicilia (PA).',
  images: ['/san-pietro-formaggi-logo-fondo-blanco.png'],
},
```

Also remove the `keywords` field from metadata (zero SEO value, minor Bing risk).

Also trim homepage meta description to under 155 chars:
```
'Formaggi artigianali prodotti nel cuore della Sicilia, a Castronovo di Sicilia (PA). Pecorini, caciocavalli, ricotte e tradizione casearia siciliana.'
```

---

### C4. Add `LocalBusiness` JSON-LD to `app/layout.tsx`
**File:** `app/layout.tsx`
**Time:** 1 hour
**Impact:** Powers Google Knowledge Panel, local pack, and AI Overview citations for all location-based queries. Highest single ROI change on the site.

Add this inside the root layout's JSX return (before `</body>`):
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["FoodEstablishment", "LocalBusiness"],
      "@id": "https://san-pietro-formaggi.vercel.app/#organization",
      "name": "San Pietro Formaggi s.r.l.",
      "description": "Caseificio artigianale a Castronovo di Sicilia (PA). Produttore di formaggi artigianali siciliani: pecorini, caciocavalli, provole, ricotte e la Tuma Canziata.",
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
      "servesCuisine": "Siciliana",
      "hasMap": "https://maps.google.com/?q=Piazzetta+San+Giovanni+2,+Castronovo+di+Sicilia+PA"
    })
  }}
/>
```

---

### C5. Fix Homepage H1 in `HeroSlider.tsx`
**File:** `components/HeroSlider.tsx`
**Time:** 5 min
**Impact:** Replaces zero-value "Benvenuto" with keyword-carrying text that Google crawls from SSR output.

Change slide 0 H1 from `"Benvenuto"` to:
```
"Formaggi Artigianali Siciliani"
```
or
```
"Caseificio Artigianale a Castronovo di Sicilia"
```

---

### C6. Create Google Business Profile
**Action:** External (Google Business)
**Time:** 2–3 hours (including verification)
**Impact:** Without a verified GBP, the business does not appear in the local 3-pack for any query. This is the highest-impact action for local visibility.

1. Go to https://business.google.com and create/claim the listing
2. Use exact legal name: "San Pietro Formaggi s.r.l."
3. Full address with CAP 90031
4. Phone: +39 091 8217240
5. Primary category: "Caseificio" (or nearest available)
6. Upload minimum 10 photos: exterior, aging room, products, team
7. Set hours: Mon–Fri 08:00–18:00
8. After verification: embed Maps iframe on `/contatti` page

---

### C7. Create `/public/llms.txt`
**File:** `public/llms.txt` (new)
**Time:** 30 min
**Impact:** Makes the business directly machine-readable for ChatGPT, Perplexity, and other AI systems.

```
# San Pietro Formaggi

> Caseificio artigianale a Castronovo di Sicilia (PA), Sicilia, Italia.
> Produce 24 varietà di formaggi artigianali con latte locale delle Madonie.

## Business Identity

San Pietro Formaggi s.r.l. is an artisan cheese producer (caseificio artigianale) located at Piazzetta San Giovanni 2, 90031 Castronovo di Sicilia (PA), Sicily, Italy. The company represents a multi-generational family tradition of livestock rearing, cheese transformation, and aging. All cheeses are produced using local milk from the Madonie mountain area of central Sicily.

VAT: IT06734000828 | Email: info@sanpietroformaggi.com | Tel: +39 091 8217240
Hours: Monday–Friday 08:00–18:00

## Product Catalog

24 cheese varieties organized in four categories:
- **Freschi** (12 varieties): short maturation, delicate milky flavor, consumed fresh
- **Semistagionati** (5 varieties): 3–6 months maturation, defined character, elastic texture
- **Stagionati** (5 varieties): 6–12 months maturation, intense and complex flavor
- **Specialità** (2 varieties): unique seasonal productions

## Signature Product: Tuma Canziata

The Tuma Canziata is San Pietro Formaggi's exclusive cheese. The name comes from Sicilian pastoral dialect: shepherds would set aside (canziata) cheese when moving their flocks to new pastures during the seasonal transhumance (transumanza). San Pietro Formaggi formalized this shepherd tradition into a refined, distinctive cheese.

## Production Process

- Aging: untreated white fir wood shelves in temperature-controlled rooms
- Weekly hand-turning and brushing by experienced staff
- Semi-hard varieties: 3–6 months aging
- Hard varieties: 6–12 months aging
- Salting method: traditional dry-salting (salatura a secco), not brine immersion

## How to Order

The company does not sell online with direct payment. Contact to arrange quantities, prices, delivery, or pickup.
- Email: info@sanpietroformaggi.com
- Phone: +39 091 8217240
- Contact form: https://san-pietro-formaggi.vercel.app/contatti

## Recipes

Traditional Sicilian recipes using their cheeses:
https://san-pietro-formaggi.vercel.app/ricette

## Sitemap

- / — Homepage
- /i-nostri-formaggi — Full product catalog
- /lazienda — Company history and process
- /ricette — Traditional Sicilian recipes
- /contatti — Contact and order inquiry
```

---

## HIGH — Fix Within 1 Week

### H1. Add `Product` JSON-LD to `/i-nostri-formaggi/[slug]/page.tsx`
**Time:** 45 min
**Impact:** Enables product rich results; entity association between products and business.

In `generateMetadata` (or the page component), add:
```tsx
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.nome,
  "description": product.descrizioneBreve,
  "image": urlFor(product.immagine).width(800).height(600).url(),
  "brand": { "@type": "Brand", "name": "San Pietro Formaggi" },
  "manufacturer": { "@id": "https://san-pietro-formaggi.vercel.app/#organization" },
  "category": product.categoria,
  "offers": {
    "@type": "Offer",
    "availability": product.disponibilita === 'Non disponibile'
      ? "https://schema.org/OutOfStock"
      : "https://schema.org/InStock",
    "priceCurrency": "EUR",
    "seller": { "@id": "https://san-pietro-formaggi.vercel.app/#organization" },
    "url": "https://san-pietro-formaggi.vercel.app/contatti"
  }
}
```

---

### H2. Add `Recipe` JSON-LD to `/ricette/[slug]/page.tsx`
**Time:** 45 min
**Impact:** Unlocks recipe rich results — highest-CTR format in Italian food search. Data is already in Sanity.

Add to the recipe detail page:
```tsx
const recipeSchema = {
  "@context": "https://schema.org",
  "@type": "Recipe",
  "name": recipe.titolo,
  "author": {
    "@type": "Organization",
    "name": "San Pietro Formaggi",
    "@id": "https://san-pietro-formaggi.vercel.app/#organization"
  },
  "datePublished": "2024-01-01",
  "recipeCategory": "Siciliana",
  "recipeIngredient": recipe.ingredienti, // already an array in Sanity
  "recipeInstructions": recipe.preparazione.map((step: string, i: number) => ({
    "@type": "HowToStep",
    "position": i + 1,
    "text": step
  })),
  "totalTime": "PT30M", // add to Sanity schema for per-recipe accuracy
  "recipeYield": "4 persone"
}
```

Also add meta description to `generateMetadata`:
```ts
description: recipe.indicazioni?.slice(0, 155)
  ?? 'Ricetta tradizionale siciliana con i formaggi artigianali di San Pietro Formaggi.',
alternates: { canonical: `/ricette/${slug}` },
```

---

### H3. Add `BreadcrumbList` to Both `[slug]` Pages
**Time:** 30 min
**Impact:** Breadcrumbs replace raw URLs in search snippets; immediate SERP appearance improvement.

Product detail:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://san-pietro-formaggi.vercel.app/" },
    { "@type": "ListItem", "position": 2, "name": "I Nostri Formaggi", "item": "https://san-pietro-formaggi.vercel.app/i-nostri-formaggi" },
    { "@type": "ListItem", "position": 3, "name": "[product.nome]", "item": "https://san-pietro-formaggi.vercel.app/i-nostri-formaggi/[slug]" }
  ]
}
```

Recipe detail: same pattern with `/ricette` as position 2.

---

### H4. Add `alternates.canonical` to All Pages
**Time:** 30 min
**Impact:** Prevents Vercel preview URL duplication; signals definitive URL to Google.

In each page's `metadata` export add `alternates: { canonical: '/path' }`. In `generateMetadata` for dynamic pages, use `alternates: { canonical: \`/i-nostri-formaggi/${slug}\` }`.

---

### H5. Add Noindex to Studio and Legal Pages
**Time:** 10 min

Add to `app/studio/[[...tool]]/page.tsx`:
```ts
export const metadata = { robots: { index: false, follow: false } }
```

Add to `/privacy`, `/disclaimer`, `/richiedi-dati` pages:
```ts
export const metadata = { robots: { index: false } }
```

---

### H6. Fix Title Tags
**Time:** 15 min
**File:** Respective `page.tsx` files

| File | Change |
|---|---|
| `app/i-nostri-formaggi/page.tsx` | title: `'I Nostri Formaggi Artigianali'` |
| `app/lazienda/page.tsx` | title: `'Caseificio di Castronovo di Sicilia'` |
| `app/ricette/page.tsx` | title: `'Ricette con Formaggi Siciliani'` |

---

### H7. Add Caching to Sanity Fetch Calls
**Time:** 15 min
**Impact:** Reduces LCP on the homepage by caching the `getProdotti()` call.

In `lib/sanity.ts`, add `next: { revalidate: 3600 }` to all fetch options:
```ts
export async function getProdotti() {
  return client.fetch(query, {}, { next: { revalidate: 3600 } })
}
```

---

### H8. Submit Sitemap to Google Search Console
**Action:** External
**Time:** 10 min
1. Add property `https://san-pietro-formaggi.vercel.app` to GSC
2. Sitemaps section → enter `sitemap.xml` → Submit
3. Check Discovered URLs after 48–72 hours

---

## MEDIUM — Fix Within 1 Month

### M1. Expand "Chi Siamo" Page (`/lazienda`) to 800+ Words
Current: ~220 words. Minimum for an artisan food producer about page: 800 words.

Content to add:
- Founding year and story
- Named founder(s) and their roles
- Why Castronovo di Sicilia specifically (Madonie altitude, local breeds, pasture quality)
- What "Da generazioni" means concretely (2 generations? 3?)
- Name the mastro casaro
- Description of aging caves / cantine
- Any certifications, fair appearances, or recognitions

---

### M2. Expand Homepage Body Copy to 500+ Words
Current: ~280 words. The Tuma Canziata section (currently ~68 words) should expand to 200+ words:
- Origin paragraph (shepherds, transumanza)
- How San Pietro formalized the recipe
- Flavor profile and serving suggestions
- Where to find it in the catalog

---

### M3. Add Recipe-to-Product Cross-Links
In each recipe detail page, add a link to the featured product's page.
In each product detail page, add a "Ricette con questo formaggio" section linking relevant recipes.

This creates a content hub structure that increases pages-per-session and distributes internal link equity.

---

### M4. Add `ItemList` Schema to Catalog and Recipe Index Pages
**File:** `app/i-nostri-formaggi/page.tsx`, `app/ricette/page.tsx`

Generate `ItemList` dynamically from the Sanity data arrays. Enables carousel rich results.

---

### M5. Add Province-Level Keywords
Add "Madonie" and "Palermo / provincia di Palermo" to:
- `/lazienda` page title and first H2
- Homepage H2 (add new section: "Formaggi Artigianali delle Madonie, Provincia di Palermo")
- Contact page meta description

---

### M6. Add a Testimonials / Clienti Section to Homepage
3–5 attributed quotes from restaurant owners or regular clients. Mark up with `Review` schema nested in `LocalBusiness`. Critical for trustworthiness signals.

---

### M7. Add a Cookie Consent / CMP
Required under Italian GDPR (Garante Privacy). Options: Cookiebot, Iubenda (popular in Italy), or a lightweight custom banner. Without this, the site has a legal and trust gap.

---

### M8. Add Telephone to `/contatti` Page Body
Currently phone is only in the footer. Move it prominently to the contact page's main content section.

---

### M9. Add Google Maps Embed to `/contatti`
After GBP is verified, embed the Maps iframe pointing to the GBP Place (not just coordinates). Add a "Indicazioni Stradali" link opening Google Maps directions.

---

### M10. Add Social Media Links (Footer)
Create Instagram and Facebook business pages if they don't exist. Add footer links. Add `sameAs` array to the `LocalBusiness` JSON-LD. Add WhatsApp click-to-chat link (`https://wa.me/390918217240`).

---

### M11. Security Headers in `next.config.ts`
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

---

### M12. Submit to Italian Directories
Using canonical NAP (Name: San Pietro Formaggi s.r.l. | Address: Piazzetta San Giovanni 2, 90031 Castronovo di Sicilia (PA) | Phone: +39 091 8217240):
1. Pagine Gialle — paginegialle.it
2. Yelp Italy — yelp.it
3. TripAdvisor
4. Slow Food producers directory
5. Botteghe di Sicilia / Sapori di Sicilia portals

---

## LOW — Backlog

### L1. Create B2B / Restaurant Buyer Page
New route `/ristoranti-e-rivenditori` targeting "fornitore formaggi ristoranti Palermo" and similar commercial queries. Include: minimum order, delivery area, product list, quality commitment.

### L2. YouTube Video
3–5 min video showing aging cave, dry-salting process, Tuma Canziata story. Title: "Come si produce la Tuma Canziata - San Pietro Formaggi, Castronovo di Sicilia". Highest brand-mention ROI for AI citation frequency.

### L3. Wikipedia Stub for "Tuma Canziata"
The cheese has documented etymology (Sicilian pastoral dialect, transhumance tradition) and a named producer. Qualifies for a stub article, which would create a permanent entity anchor for AI citation.

### L4. Named Author on "Chi Siamo" and Recipe Pages
Add `autore` field to `SanityRicetta` schema. Render on recipe pages: "Ricetta a cura di [Name], San Pietro Formaggi."

### L5. Add Publication Date to Recipe Pages
Even a simple `<time dateTime="2024-01-01">Gennaio 2024</time>` satisfies the content freshness signal.

### L6. IndexNow Protocol
For future: trigger IndexNow via Sanity webhook when products/recipes are published. Low priority — Bing Italian market share ~3–5%.

---

## Expected Score Impact After Fixes

| Phase | Actions | Est. Score |
|---|---|---|
| Before (current) | — | **44 / 100** |
| After Critical (C1–C7) | robots, sitemap, OG, LocalBusiness schema, H1 fix, GBP, llms.txt | **~58 / 100** |
| After Critical + High (H1–H8) | + Product/Recipe schema, breadcrumbs, canonicals, title fixes | **~68 / 100** |
| After All Medium (M1–M12) | + expanded content, testimonials, citations, social, maps | **~78 / 100** |
| After All Low (L1–L6) | + B2B page, YouTube, Wikipedia, named authors | **~84 / 100** |
