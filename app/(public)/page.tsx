import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import HeroSlider from '@/components/HeroSlider'

export const metadata: Metadata = {
  title: {
    absolute: 'San Pietro Formaggi | Formaggi freschi, semistagionati e stagionati siciliani',
  },
}
import { getProdotti, getFeaturedProducts } from '@/lib/db'
import { categories, categoryDescriptions } from '@/lib/data'

const categoryIcons: Record<string, string> = {
  Freschi: '◇',
  Semistagionati: '◈',
  Stagionati: '◆',
}

export default async function HomePage() {
  const prodotti = await getProdotti()
  const featuredProducts = await getFeaturedProducts()

  return (
    <>
      {/* ── HERO SLIDER ── */}
      <HeroSlider />

      {/* ── CATEGORIES ── */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <AnimateOnScroll direction="down">
          <div className="text-center mb-14">
            <p className="text-xs tracking-widest uppercase font-medium mb-3" style={{ color: '#DD4F22' }}>
              La Nostra Produzione
            </p>
            <h2 className="font-display text-4xl font-semibold" style={{ color: '#2D2D2E' }}>
              I Nostri Prodotti
            </h2>
            <div className="ornament-divider mt-4 max-w-xs mx-auto">
              <span className="text-xs px-3" style={{ color: '#DD4F22' }}>◆</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/i-nostri-formaggi#${category.toLowerCase()}`}
                className="group card-hover rounded-xl p-8 text-center overflow-hidden"
                style={{
                  backgroundColor: '#FAF7F2',
                  border: '1px solid #E8DDD0',
                  boxShadow: '0 2px 12px rgba(59,42,26,0.07)',
                }}
              >
                <div className="text-3xl mb-4" style={{ color: '#DD4F22' }}>
                  {categoryIcons[category]}
                </div>
                <h3 className="font-display text-2xl font-semibold mb-3" style={{ color: '#2D2D2E' }}>
                  {category}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#2D2D2E', opacity: 0.85 }}>
                  {categoryDescriptions[category]}
                </p>
                <div className="mt-6 text-xs tracking-widest uppercase font-medium" style={{ color: '#FBC703' }}>
                  Vedi tutti →
                </div>
              </Link>
            ))}
          </div>
        </AnimateOnScroll>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section style={{ backgroundColor: '#FAF7F2' }} className="py-20">
        <div className="px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto">
          <AnimateOnScroll direction="up">
            <div className="text-center mb-14">
              <p className="text-xs tracking-widest uppercase font-medium mb-3" style={{ color: '#DD4F22' }}>
                Selezione
              </p>
              <h2 className="font-display text-4xl font-semibold" style={{ color: '#2D2D2E' }}>
                Prodotti in Evidenza
              </h2>
              <div className="ornament-divider mt-4 max-w-xs mx-auto">
                <span className="text-xs px-3" style={{ color: '#DD4F22' }}>◆</span>
              </div>
            </div>

            {featuredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  {featuredProducts.map((product) => (
                    <ProductCard key={product.slug} product={product} />
                  ))}
                </div>

                <div className="text-center">
                  <Link href="/i-nostri-formaggi" className="btn-outline">
                    Tutto il Catalogo →
                  </Link>
                </div>
              </>
            ) : (
              <p className="text-center text-base" style={{ color: '#2D2D2E', opacity: 0.6 }}>
                Non sono stati ancora aggiunti prodotti.
              </p>
            )}
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── TUMA CANZIATA ── */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <AnimateOnScroll direction="left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-xl h-80 lg:h-96 overflow-hidden order-last lg:order-first">
              <Image
                src="/tuma-canziata.png"
                alt="Tuma Canziata"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-xs tracking-widest uppercase font-medium mb-3" style={{ color: '#DD4F22' }}>
                Il Nostro Prodotto Esclusivo
              </p>
              <h2 className="font-display text-4xl font-semibold mb-6" style={{ color: '#2D2D2E' }}>
                La &ldquo;Tuma Canziata&rdquo;
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#2D2D2E' }}>
                Da una casuale abitudine dei pastori abbiamo voluto personalizzare un formaggio
                gradevole e raffinato chiamandolo in gergo siciliano &ldquo;Tuma Canziata&rdquo;,
                in quanto il formaggio veniva messo da parte quando i pastori facevano la transumanza
                del gregge per i nuovi pascoli.
              </p>
              <Link href="/i-nostri-formaggi/tuma-canziata" className="btn-gold">
                Scopri di più
              </Link>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* ── SAN PIETRO FORMAGGI ── */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <AnimateOnScroll direction="right">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl font-semibold mb-6" style={{ color: '#2D2D2E' }}>
                San Pietro Formaggi
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: '#2D2D2E' }}>
                <p>
                  L&apos;azienda proviene da una tradizione familiare di allevatori, trasformatori e
                  stagionatori di formaggi.
                </p>
                <p>
                  L&apos;obbiettivo di questa azienda è quello di proporre al mercato prodotti
                  selezionati di alta qualità, curandone i dettagli nelle varie fasi di lavorazione,
                  con la pazienza e la maestria nel processo di stagionatura.
                </p>
                <p>
                  Non viene meno l&apos;attenzione nel curare l&apos;aspetto dei prodotti, nel
                  packaging e infine una rigorosa e puntuale distribuzione.
                </p>
              </div>
              <Link href="/lazienda" className="link-gold inline-flex items-center gap-2 mt-8 text-xs tracking-widest uppercase font-medium">
                Scopri di più su di noi →
              </Link>
            </div>

            <div className="relative">
              <div className="relative rounded-xl h-80 lg:h-96 overflow-hidden">
                <Image
                  src="/latticini-formaggi.png"
                  alt="San Pietro Formaggi"
                  fill
                  className="object-cover"
                />
              </div>
              <div
                className="absolute -bottom-4 -right-4 rounded-lg px-5 py-4"
                style={{ backgroundColor: '#DD4F22', color: '#2D2D2E' }}
              >
                <p className="font-display text-2xl font-bold leading-none">{prodotti.length || 7}</p>
                <p className="text-xs tracking-wide uppercase font-medium mt-0.5">Varietà</p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        className="py-20 px-5 sm:px-8 text-center"
        style={{ background: 'linear-gradient(135deg, #2D2D2E 0%, #2D2D2E 100%)' }}
      >
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'rgba(200,144,42,0.8)' }}>
          Formaggi per privati e ristoranti
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-5" style={{ color: '#FDF8F0' }}>
          Richiedi un Preventivo
        </h2>
        <p className="text-base max-w-xl mx-auto mb-8 leading-relaxed" style={{ color: 'rgba(245,240,232,0.7)' }}>
          Che siate privati, ristoratori o rivenditori, contattateci per conoscere i nostri
          prodotti, i prezzi e le modalità di acquisto.
        </p>
        <Link href="/contatti" className="btn-gold">
          Contattaci Ora
        </Link>
      </section>
    </>
  )
}
