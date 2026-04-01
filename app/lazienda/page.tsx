import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Chi Siamo',
  description: 'La storia di San Pietro Formaggi, caseificio artigianale di Castronovo di Sicilia (PA).',
}

export default function ChiSiamoPage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative py-24 px-5 sm:px-8 text-center grain-overlay"
        style={{ background: 'linear-gradient(135deg, #2D2D2E 0%, #2D2D2E 60%, #FBC703 100%)' }}
      >
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-xs tracking-widest uppercase font-medium mb-4" style={{ color: 'rgba(200,144,42,0.9)' }}>
            Castronovo di Sicilia (PA)
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-5" style={{ color: '#FDF8F0' }}>
            Chi Siamo
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'rgba(245,240,232,0.75)' }}>
            Una tradizione familiare di allevatori, trasformatori e stagionatori di formaggi,
            nel cuore della Sicilia.
          </p>
        </div>
      </section>

      {/* La Stagionatura */}
      <section style={{ backgroundColor: '#FAF7F2' }} className="py-20">
        <div className="px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-xl h-72 lg:h-80 overflow-hidden order-last lg:order-first">
              <Image
                src="/la-stagionatura.png"
                alt="La Stagionatura"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-xs tracking-widest uppercase font-medium mb-3" style={{ color: '#DD4F22' }}>
                L'Area di Stoccaggio
              </p>
              <h2 className="font-display text-3xl font-semibold mb-6" style={{ color: '#2D2D2E' }}>
                La Stagionatura
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: '#2D2D2E' }}>
                <p>
                  La stagionatura dei nostri formaggi avviene rigorosamente in apposite aree di
                  stoccaggio, idonee a mantenere inalterate le qualità organolettiche.
                </p>
                <p>
                  Avviene su scaffali di legno di abete bianco non trattato, a temperatura
                  controllata, e viene settimanalmente rivoltata e spazzolata da operatori esperti
                  per mantenere le proprietà organolettiche.
                </p>
                <p>
                  La stagionatura dei formaggi semiduri avviene per un periodo che va dai 3 ai 6
                  mesi, mentre i formaggi duri avviene per un periodo che va dai 6 ai 12 mesi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Il Laboratorio */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-widest uppercase font-medium mb-3" style={{ color: '#DD4F22' }}>
              Il Laboratorio
            </p>
            <h2 className="font-display text-3xl font-semibold mb-6" style={{ color: '#2D2D2E' }}>
              La Salatura
            </h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: '#2D2D2E' }}>
              <p>
                Noi rispettiamo la tradizione! Ad oggi nei più moderni stabilimenti il processo di
                salatura avviene nelle salamoie, ovvero grandi vasche dove viene immerso il
                formaggio, mentre il nostro formaggio subisce una salatura a secco.
              </p>
              <p>
                I nostri addetti, con anni di esperienza nel settore, sono capaci di dare un grado
                di salinità uniforme e costante, al fine di mantenere un gusto unico e inimitabile.
              </p>
            </div>
          </div>

          <div className="relative rounded-xl h-72 lg:h-80 overflow-hidden">
            <Image
              src="/il-laboratorio.png"
              alt="Il Laboratorio"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 px-5 sm:px-8 text-center"
        style={{ backgroundColor: '#FAF7F2', borderTop: '1px solid #E8DDD0' }}
      >
        <h2 className="font-display text-3xl font-semibold mb-4" style={{ color: '#2D2D2E' }}>
          Vuoi Conoscerci Meglio?
        </h2>
        <p className="text-base mb-7 max-w-md mx-auto" style={{ color: '#2D2D2E', opacity: 0.85 }}>
          Contattaci per richiedere un preventivo, fare una domanda o semplicemente per saperne
          di più sui nostri prodotti.
        </p>
        <Link href="/contatti" className="btn-primary">
          Contattaci
        </Link>
      </section>
    </div>
  )
}
