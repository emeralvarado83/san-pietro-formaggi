import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contatti',
  description: 'Contattaci per richiedere un preventivo sui formaggi artigianali di San Pietro Formaggi.',
}

export default function ContattiPage() {
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
          Siamo qui per voi
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-4" style={{ color: '#2D2D2E' }}>
          Contatti
        </h1>
        <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: '#2D2D2E', opacity: 0.85 }}>
          Per richiedere un preventivo, informazioni sui prodotti o le modalità di acquisto,
          compilate il modulo o contattateci direttamente.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-display text-2xl font-semibold mb-6" style={{ color: '#2D2D2E' }}>
                Informazioni
              </h2>

              <div className="space-y-6">
                <div>
                  <p className="text-xs tracking-widest uppercase font-medium mb-2" style={{ color: '#DD4F22' }}>
                    Indirizzo
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: '#2D2D2E' }}>
                    Piazzetta San Giovanni 2<br />
                    90030 Castronovo di Sicilia (PA)<br />
                    Sicilia, Italia
                  </p>
                </div>

                <div className="h-px" style={{ backgroundColor: '#E8DDD0' }} />

                <div>
                  <p className="text-xs tracking-widest uppercase font-medium mb-2" style={{ color: '#DD4F22' }}>
                    Email
                  </p>
                  <a
                    href="mailto:info@sanpietroformaggi.com"
                    className="text-sm transition-colors duration-200 hover:text-[#DD4F22]"
                    style={{ color: '#2D2D2E' }}
                  >
                    info@sanpietroformaggi.com
                  </a>
                </div>

                <div className="h-px" style={{ backgroundColor: '#E8DDD0' }} />

                <div>
                  <p className="text-xs tracking-widest uppercase font-medium mb-2" style={{ color: '#DD4F22' }}>
                    Orari
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: '#2D2D2E' }}>
                    Lunedì – Venerdì
                    <br />
                    <span>08:00 – 18:00</span>
                  </p>
                  <p className="text-sm leading-relaxed mt-1" style={{ color: '#2D2D2E' }}>
                    Sabato
                    <br />
                    <span>08:00 – 12:00</span>
                  </p>
                </div>

                <div className="h-px" style={{ backgroundColor: '#E8DDD0' }} />

                <div>
                  <p className="text-xs tracking-widest uppercase font-medium mb-2" style={{ color: '#DD4F22' }}>
                    Risposta
                  </p>
                  <p className="text-sm" style={{ color: '#2D2D2E' }}>
                    Rispondiamo entro 24 ore lavorative.
                  </p>
                </div>
              </div>
            </div>

            {/* Note */}
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: '#FAF7F2', border: '1px solid #E8DDD0' }}
            >
              <p className="text-xs tracking-widest uppercase font-medium mb-2" style={{ color: '#DD4F22' }}>
                Nota
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#2D2D2E' }}>
                Non vendiamo online con pagamento diretto. Dopo aver ricevuto la vostra richiesta,
                vi contatteremo per concordare quantità, prezzi e modalità di consegna o ritiro.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <h2 className="font-display text-2xl font-semibold mb-6" style={{ color: '#2D2D2E' }}>
              Invia una Richiesta
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
