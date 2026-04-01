import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getRicette, urlFor } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Ricette',
  description: 'Ricette tradizionali siciliane con i formaggi artigianali di San Pietro Formaggi.',
}

export default async function RicettePage() {
  const ricette = await getRicette()

  return (
    <div>
      {/* Page header */}
      <div
        className="py-16 px-5 sm:px-8 text-center"
        style={{
          background: 'linear-gradient(180deg, #FAF7F2 0%, #FDF8F0 100%)',
          borderBottom: '1px solid #E8DDD0',
        }}
      >
        <p className="text-xs tracking-widest uppercase font-medium mb-3" style={{ color: '#DD4F22' }}>
          In Cucina con San Pietro
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-4" style={{ color: '#2D2D2E' }}>
          Le Nostre Ricette
        </h1>
        <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: '#2D2D2E', opacity: 0.85 }}>
          Ricette della tradizione siciliana che valorizzano i nostri formaggi artigianali.
          Sapori autentici, ingredienti di qualità, semplicità.
        </p>
      </div>

      {/* Recipes grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16">
        {ricette.length === 0 ? (
          <p className="text-center text-sm italic" style={{ color: '#FBC703', opacity: 0.7 }}>
            Nessuna ricetta disponibile al momento.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ricette.map((recipe, index) => (
              <article
                key={recipe._id}
                className="rounded-xl overflow-hidden transition-all duration-300 flex flex-col"
                style={{
                  backgroundColor: '#FAF7F2',
                  border: '1px solid #E8DDD0',
                  boxShadow: '0 2px 12px rgba(59,42,26,0.07)',
                }}
              >
                {/* Image */}
                <div
                  className="h-52 relative flex items-center justify-center"
                  style={{
                    background: index % 2 === 0
                      ? 'linear-gradient(135deg, #2D2D2E 0%, #2D2D2E 100%)'
                      : 'linear-gradient(135deg, #2D2D2E 0%, #FBC703 100%)',
                  }}
                >
                  {recipe.immagine ? (
                    <Image
                      src={urlFor(recipe.immagine).width(600).height(208).fit('crop').url()}
                      alt={recipe.titolo}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="text-3xl mb-2 opacity-40 select-none" style={{ color: '#DD4F22' }}>◆</div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="font-display text-2xl font-semibold mb-3 leading-snug" style={{ color: '#2D2D2E' }}>
                    {recipe.titolo}
                  </h2>

                  <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: '#2D2D2E', opacity: 0.85 }}>
                    {recipe.indicazioni}
                  </p>

                  <Link
                    href={`/ricette/${recipe.slug.current}`}
                    className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase font-medium transition-colors duration-200 mt-auto"
                    style={{ color: '#DD4F22' }}
                  >
                    Vedi Ricetta →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
