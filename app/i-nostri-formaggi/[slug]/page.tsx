import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { getProdotti, getProdotto, urlFor } from '@/lib/sanity'

export async function generateStaticParams() {
  const prodotti = await getProdotti()
  return prodotti.map((p) => ({ slug: p.slug.current }))
}

export async function generateMetadata(props: PageProps<'/i-nostri-formaggi/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const product = await getProdotto(slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.descrizioneBreve,
  }
}

const categoryColors: Record<string, string> = {
  Freschi: '#FBC703',
  Semistagionati: '#2D2D2E',
  Stagionati: '#2D2D2E',
}

export default async function ProductPage(props: PageProps<'/i-nostri-formaggi/[slug]'>) {
  const { slug } = await props.params
  const product = await getProdotto(slug)

  if (!product) notFound()

  const categoryColor = categoryColors[product.categoria] || '#2D2D2E'

  const portableTextComponents = {
    block: {
      normal: ({ children }: { children?: React.ReactNode }) => (
        <p className="text-base leading-relaxed mb-4" style={{ color: '#2D2D2E', opacity: 0.85 }}>{children}</p>
      ),
      h3: ({ children }: { children?: React.ReactNode }) => (
        <h3 className="font-display text-lg font-semibold mt-6 mb-2" style={{ color: '#2D2D2E' }}>{children}</h3>
      ),
    },
    marks: {
      strong: ({ children }: { children?: React.ReactNode }) => (
        <strong style={{ color: '#2D2D2E', fontWeight: 600 }}>{children}</strong>
      ),
    },
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div
        className="px-5 sm:px-8 lg:px-12 py-4"
        style={{ borderBottom: '1px solid #E8DDD0', backgroundColor: '#FAF7F2' }}
      >
        <nav className="max-w-7xl mx-auto flex items-center gap-2 text-xs" style={{ color: '#FBC703' }}>
          <Link href="/" className="link-gold" style={{ color: '#FBC703' }}>Home</Link>
          <span>·</span>
          <Link href="/i-nostri-formaggi" className="link-gold" style={{ color: '#FBC703' }}>Catalogo</Link>
          <span>·</span>
          <Link href={`/i-nostri-formaggi#${product.categoria.toLowerCase()}`} className="link-gold" style={{ color: '#FBC703' }}>
            {product.categoria}
          </Link>
          <span>·</span>
          <span style={{ color: '#2D2D2E', fontWeight: 500 }}>{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Image */}
          <div
            className="rounded-xl h-80 sm:h-96 lg:h-[480px] relative overflow-hidden lg:sticky lg:top-24"
            style={{
              background: 'linear-gradient(135deg, #FDF8F0 0%, #EDE4D6 60%, #E0D3C0 100%)',
              border: '1px solid #E8DDD0',
            }}
          >
            {product.immagine ? (
              <Image
                src={urlFor(product.immagine).width(800).height(600).fit('crop').url()}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-3 opacity-25 select-none" style={{ color: '#2D2D2E' }} aria-hidden="true">◆</div>
                  <p className="text-xs tracking-widest uppercase opacity-40 font-medium" style={{ color: '#2D2D2E' }}>
                    San Pietro Formaggi
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <span
              className="inline-block text-[10px] tracking-widest uppercase font-medium px-3 py-1.5 rounded-full mb-4"
              style={{ backgroundColor: 'rgba(200,144,42,0.12)', color: categoryColor }}
            >
              {product.categoria}
            </span>

            <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-4" style={{ color: '#2D2D2E' }}>
              {product.name}
            </h1>

            <p className="text-lg mb-8 leading-relaxed" style={{ color: '#2D2D2E', opacity: 0.85 }}>
              {product.descrizioneBreve}
            </p>

            <div className="h-px mb-8" style={{ backgroundColor: '#E8DDD0' }} />

            {product.descrizione && product.descrizione.length > 0 && (
              <div className="mb-10">
                <PortableText value={product.descrizione} components={portableTextComponents} />
              </div>
            )}

            {/* Info box */}
            <div
              className="rounded-xl p-5 mb-8"
              style={{ backgroundColor: '#FAF7F2', border: '1px solid #E8DDD0' }}
            >
              <p className="text-xs tracking-widest uppercase font-medium mb-3" style={{ color: '#DD4F22' }}>
                Informazioni
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ['Categoria', product.categoria],
                  ['Origine', 'Sicilia'],
                  ['Produzione', 'Artigianale'],
                  ['Latte', 'Locale · Madonie'],
                ].map(([label, value]) => (
                  <div key={label}>
                    <span className="block text-xs uppercase tracking-wide mb-0.5 opacity-60" style={{ color: '#2D2D2E' }}>
                      {label}
                    </span>
                    <span style={{ color: '#2D2D2E', fontWeight: 500 }}>{value}</span>
                  </div>
                ))}
                <div>
                  <span className="block text-xs uppercase tracking-wide mb-0.5 opacity-60" style={{ color: '#2D2D2E' }}>
                    Disponibilità
                  </span>
                  <span
                    style={{
                      fontWeight: 500,
                      color: product.disponibilita === 'Non disponibile' ? '#c0392b' : '#2e7d32',
                    }}
                  >
                    {product.disponibilita ?? 'Disponibile'}
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contatti" className="btn-primary flex-1">
                Richiedi Preventivo
              </Link>
              <Link href="/i-nostri-formaggi" className="btn-outline px-6">
                Torna al Catalogo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
