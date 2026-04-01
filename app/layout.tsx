import type { Metadata } from 'next'
import { Playfair_Display, Lora } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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

export const metadata: Metadata = {
  title: {
    default: 'San Pietro Formaggi | Caseificio Artigianale Siciliano',
    template: '%s | San Pietro Formaggi',
  },
  description:
    "Formaggi artigianali prodotti nel cuore della Sicilia, a Castronovo di Sicilia (PA). Tradizione casearia siciliana dal sapore autentico: pecorini, caciocavalli, ricotte e molto altro.",
  keywords: ['formaggi siciliani', 'caseificio artigianale', 'pecorino siciliano', 'caciocavallo', 'Castronovo di Sicilia'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className={`${playfair.variable} ${lora.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
