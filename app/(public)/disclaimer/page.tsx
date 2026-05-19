import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer e condizioni di utilizzo del sito San Pietro Formaggi.',
}

export default function DisclaimerPage() {
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
          Informazioni Legali
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-4" style={{ color: '#2D2D2E' }}>
          Disclaimer
        </h1>
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 py-16 space-y-10">
        {/* Uso consentito */}
        <section>
          <h2 className="font-display text-2xl font-semibold mb-4" style={{ color: '#2D2D2E' }}>
            Uso Consentito
          </h2>
          <div className="h-px mb-6" style={{ backgroundColor: '#E8DDD0' }} />
          <div className="space-y-4 text-sm leading-relaxed" style={{ color: '#2D2D2E', opacity: 0.85 }}>
            <p>
              SAN PIETRO FORMAGGI è proprietario di questo sito e ne cura la gestione. SAN PIETRO FORMAGGI
              autorizza agli utenti l&apos;accesso al Sito e l&apos;utilizzo dello stesso, ivi compresi testi,
              immagini, audio, video o software, a solo scopo di informazione personale.
            </p>
            <p>
              È consentito, esclusivamente per scopo personale e non commerciale, scaricare materiali e
              contenuti presentati nel Sito, purché si riportino tutte le indicazioni relative alla proprietà
              e ai diritti d&apos;autore contenute nei suddetti materiali.
            </p>
            <p>
              Non è consentito, per scopi pubblici o commerciali, distribuire, modificare, ripubblicare,
              trasmettere, riutilizzare, riportare, immettere, caricare o utilizzare i contenuti del Sito,
              ivi compresi testi, immagini, audio, video o software, senza previa autorizzazione scritta
              da parte di SAN PIETRO FORMAGGI.
            </p>
            <p>
              Non è consentito utilizzare il Sito in alcun modo se l&apos;utilizzo può danneggiare,
              disattivare, sovraccaricare o deteriorare un qualsiasi server, o interferire con
              l&apos;utilizzo del Sito da parte di terzi.
            </p>
            <p>
              Ad eccezione di quanto sopra riportato, è consentito utilizzare simulazioni e risultati
              dei test pubblicati in questo Sito nei vostri rapporti con clienti.
            </p>
          </div>
        </section>

        {/* Contenuti */}
        <section>
          <h2 className="font-display text-2xl font-semibold mb-4" style={{ color: '#2D2D2E' }}>
            Contenuti Pubblicati nel Sito
          </h2>
          <div className="h-px mb-6" style={{ backgroundColor: '#E8DDD0' }} />
          <div className="space-y-4 text-sm leading-relaxed" style={{ color: '#2D2D2E', opacity: 0.85 }}>
            <p>
              I materiali e i contenuti del Sito, ivi compresi tutti quelli di Proprietà Intellettuale,
              sono proprietà di SAN PIETRO FORMAGGI. Tutti i materiali, contenuti e funzionalità del Sito,
              compresi, ma non limitati a, testi, grafiche, logo, icone e immagini e la relativa selezione
              e disposizione, sono di proprietà esclusiva di SAN PIETRO FORMAGGI e sono protetti dalle leggi
              nazionali e internazionali in materia di diritti d&apos;autore. Tutti i diritti non concessi
              espressamente sono da considerarsi riservati.
            </p>
            <p>
              È vietato rimuovere scritti distintivi di proprietà intellettuale, ivi comprese indicazioni
              relative ai diritti d&apos;autore o apposte a contenuti o materiali scaricati dal Sito.
            </p>
            <p>
              Immagini e grafiche presentate nel Sito sono proprietà di SAN PIETRO FORMAGGI o usate da
              quest&apos;ultimo previa autorizzazione di terzi. È vietato l&apos;utilizzo delle dette immagini
              da parte dell&apos;utente o da persone da esso autorizzate, salvo permesso specifico indicato
              nelle presenti Condizioni o in altra parte del Sito.
            </p>
            <p>
              L&apos;utilizzo non autorizzato di dette immagini può costituire violazione delle leggi sul
              diritto d&apos;autore, sui marchi depositati, sulla privacy o sulla pubblicità, oltre che
              delle regole e delle leggi sulle comunicazioni.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
