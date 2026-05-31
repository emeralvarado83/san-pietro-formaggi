import type { Metadata } from 'next'
import { Playfair_Display, Lora } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
  weight: ['400', '500'],
})

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sanpietroformaggi.com'

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['FoodEstablishment', 'LocalBusiness'],
  '@id': `${BASE_URL}/#organization`,
  name: 'San Pietro Formaggi s.r.l.',
  description:
    "Azienda familiare di Castronovo di Sicilia (PA). Produttore di formaggi artigianali siciliani: pecorini, caciocavalli, provole, ricotte e la Tuma Canziata.",
  url: BASE_URL,
  telephone: '+390918217240',
  email: 'sanpietroformaggi@gmail.com',
  vatID: 'IT06734000828',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Piazzetta San Giovanni 2',
    addressLocality: 'Castronovo di Sicilia',
    addressRegion: 'PA',
    postalCode: '90031',
    addressCountry: 'IT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.6817,
    longitude: 13.6044,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '12:00',
    },
  ],
  priceRange: '€€',
  servesCuisine: 'Siciliana',
  hasMap: 'https://maps.google.com/?q=Piazzetta+San+Giovanni+2,+Castronovo+di+Sicilia+PA',
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/san-pietro-formaggi-logo-transparente.png`,
  },
  image: `${BASE_URL}/latticini-formaggi.png`,
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'San Pietro Formaggi | Formaggi Siciliani',
    template: '%s | San Pietro Formaggi',
  },
  description:
    'Formaggi artigianali prodotti nel cuore della Sicilia, a Castronovo di Sicilia (PA). Pecorini, caciocavalli, ricotte e tradizione casearia siciliana.',
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: 'San Pietro Formaggi',
    title: 'San Pietro Formaggi | Formaggi Siciliani',
    description:
      'Formaggi artigianali prodotti nel cuore della Sicilia, a Castronovo di Sicilia (PA). Pecorini, caciocavalli, ricotte e tradizione casearia siciliana.',
    images: [{ url: '/latticini-formaggi.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'San Pietro Formaggi | Formaggi Siciliani',
    description:
      'Formaggi artigianali prodotti nel cuore della Sicilia, a Castronovo di Sicilia (PA). Pecorini, caciocavalli, ricotte e tradizione casearia siciliana.',
    images: ['/latticini-formaggi.png'],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className={`${playfair.variable} ${lora.variable}`}>
      <body className="min-h-screen flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </body>
    </html>
  )
}
