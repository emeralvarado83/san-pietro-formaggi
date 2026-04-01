import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getRicette, getRicetta, urlFor } from '@/lib/sanity'

export async function generateStaticParams() {
  const ricette = await getRicette()
  return ricette.map((r) => ({ slug: r.slug.current }))
}

export async function generateMetadata(props: PageProps<'/ricette/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const recipe = await getRicetta(slug)
  if (!recipe) return {}
  return {
    title: recipe.titolo,
  }
}

export default async function RicettaPage(props: PageProps<'/ricette/[slug]'>) {
  const { slug } = await props.params
  const recipe = await getRicetta(slug)

  if (!recipe) notFound()

  const ingredients = (recipe.ingredienti ?? '').split('\n').filter(Boolean)
  const steps = (recipe.preparazione ?? '').split('\n').filter(Boolean)

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
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: '#2D2D2E', opacity: 0.85 }}>
              {recipe.indicazioni}
            </p>
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
              src={urlFor(recipe.immagine).width(960).height(320).fit('crop').url()}
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
              <ul className="space-y-2.5">
                {ingredients.map((ingredient, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: '#2D2D2E' }}>
                    <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#DD4F22' }} />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Preparation */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-semibold mb-6" style={{ color: '#2D2D2E' }}>
              Preparazione
            </h2>
            <div className="space-y-5">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-5">
                  <div
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5"
                    style={{ backgroundColor: 'rgba(200,144,42,0.15)', color: '#DD4F22' }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-base leading-relaxed pt-1" style={{ color: '#2D2D2E', opacity: 0.85 }}>
                    {step.replace(/^\d+\.\s*/, '')}
                  </p>
                </div>
              ))}
            </div>

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
          </div>
        </div>
      </div>
    </div>
  )
}
