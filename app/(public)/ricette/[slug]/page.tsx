import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getRicette, getRicetta } from '@/lib/db'
import ShareButtons from '@/components/ShareButtons'

export async function generateStaticParams() {
  const ricette = await getRicette()
  return ricette.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata(props: PageProps<'/ricette/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const recipe = await getRicetta(slug)
  if (!recipe) return {}
  return {
    title: recipe.titolo,
    openGraph: {
      title: recipe.titolo,
      images: recipe.immagine ? [{ url: recipe.immagine }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: recipe.titolo,
      images: recipe.immagine ? [recipe.immagine] : undefined,
    },
  }
}

function cleanHtml(html: string | null): string {
  if (!html) return ''
  return html.replace(/&nbsp;/g, ' ')
}

export default async function RicettaPage(props: PageProps<'/ricette/[slug]'>) {
  const { slug } = await props.params
  const recipe = await getRicetta(slug)

  if (!recipe) notFound()

  return (
    <div>
      {/* Breadcrumb */}
      <div
        className="px-5 sm:px-8 lg:px-12 py-4"
        style={{ borderBottom: '1px solid #E8DDD0', backgroundColor: '#FAF7F2' }}
      >
        <nav className="max-w-7xl mx-auto flex items-center gap-2 text-xs" style={{ color: '#FBC703' }}>
          <Link href="/" className="hover:text-[#DD4F22] transition-colors">Home</Link>
          <span>·</span>
          <Link href="/ricette" className="hover:text-[#DD4F22] transition-colors">Ricette</Link>
          <span>·</span>
          <span style={{ color: '#2D2D2E', fontWeight: 500 }}>{recipe.titolo}</span>
        </nav>
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 py-14">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-4" style={{ color: '#2D2D2E' }}>
            {recipe.titolo}
          </h1>
          {recipe.indicazioni && (
            <div
              className="rich-content max-w-2xl"
              style={{ fontSize: '1.125rem', opacity: 0.85 }}
              dangerouslySetInnerHTML={{ __html: cleanHtml(recipe.indicazioni) }}
            />
          )}
        </div>

        {/* Hero image */}
        <div
          className="rounded-xl h-64 sm:h-80 relative overflow-hidden mb-12"
          style={{
            background: 'linear-gradient(135deg, #2D2D2E 0%, #2D2D2E 60%, #FBC703 100%)',
          }}
        >
          {recipe.immagine ? (
            <Image
              src={recipe.immagine}
              alt={recipe.titolo}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 960px"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl opacity-40 select-none" style={{ color: '#DD4F22' }}>◆</div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <div
              className="rounded-xl p-6 sticky top-24"
              style={{ backgroundColor: '#FAF7F2', border: '1px solid #E8DDD0' }}
            >
              <h2 className="font-display text-xl font-semibold mb-4" style={{ color: '#2D2D2E' }}>
                Ingredienti
              </h2>
              <div className="h-px mb-4" style={{ backgroundColor: '#E8DDD0' }} />
              <div
                className="rich-content rich-content--ingredients"
                dangerouslySetInnerHTML={{ __html: cleanHtml(recipe.ingredienti) }}
              />
            </div>
          </div>

          {/* Preparation */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-semibold mb-6" style={{ color: '#2D2D2E' }}>
              Preparazione
            </h2>
            <div
              className="rich-content rich-content--steps"
              dangerouslySetInnerHTML={{ __html: cleanHtml(recipe.preparazione) }}
            />

            {/* CTA */}
            <div
              className="mt-10 rounded-xl p-6 text-center"
              style={{ backgroundColor: '#FAF7F2', border: '1px solid #E8DDD0' }}
            >
              <p className="text-sm mb-4" style={{ color: '#2D2D2E' }}>
                Vuoi acquistare i nostri formaggi?
              </p>
              <Link
                href="/contatti"
                className="inline-flex items-center px-6 py-3 text-xs tracking-widest uppercase font-medium rounded-lg transition-all duration-200"
                style={{ backgroundColor: '#2D2D2E', color: '#FDF8F0' }}
              >
                Richiedi Preventivo
              </Link>
            </div>

            <div className="mt-8">
              <ShareButtons title={recipe.titolo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
