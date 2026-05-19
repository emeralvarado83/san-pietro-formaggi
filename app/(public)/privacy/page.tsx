import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Informativa sul trattamento dei dati personali di San Pietro Formaggi.',
}

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-sm max-w-xl mx-auto leading-relaxed" style={{ color: '#2D2D2E', opacity: 0.75 }}>
          Oggetto: Informativa sul trattamento dei Suoi dati personali, ai sensi dell&apos;articolo 13
          del Dlgs 196/2003, recante il codice in materia di protezione dei dati personali, e richiesta
          del Suo consenso al trattamento di taluni dati.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 py-16">
        <ol className="space-y-8">
          {/* 1 */}
          <li className="flex gap-5">
            <span className="shrink-0 font-display text-lg font-semibold mt-0.5" style={{ color: '#DD4F22' }}>1.</span>
            <p className="text-sm leading-relaxed" style={{ color: '#2D2D2E', opacity: 0.85 }}>
              Il Dlgs 196/2003 ha introdotto il codice in materia di protezione dei dati personali.
              In ottemperanza a quanto previsto da tale codice, il trattamento dei dati personali da
              parte della nostra organizzazione è improntato ai principi di correttezza, liceità e
              trasparenza e di tutela della riservatezza e dei diritti dei soggetti cui i dati si riferiscono.
            </p>
          </li>

          {/* 2 */}
          <li className="flex gap-5">
            <span className="shrink-0 font-display text-lg font-semibold mt-0.5" style={{ color: '#DD4F22' }}>2.</span>
            <p className="text-sm leading-relaxed" style={{ color: '#2D2D2E', opacity: 0.85 }}>
              In tale ambito, Le forniamo l&apos;informativa prevista dall&apos;articolo 13 Dlgs 196/2003
              e Le chiediamo di esprimere il suo consenso per il trattamento dei dati personali in seguito
              specificati per le seguenti finalità: gestire la sua richiesta di informazioni e/o prenotazione
              al fine di fornirle le indicazioni a riguardo.
            </p>
          </li>

          {/* 3 */}
          <li className="flex gap-5">
            <span className="shrink-0 font-display text-lg font-semibold mt-0.5" style={{ color: '#DD4F22' }}>3.</span>
            <p className="text-sm leading-relaxed" style={{ color: '#2D2D2E', opacity: 0.85 }}>
              Il conferimento dei Suoi dati è obbligatorio per il conseguimento delle finalità di cui sopra;
              il loro mancato, parziale o inesatto conferimento potrebbe avere come conseguenza
              l&apos;impossibilità di fornirLe i servizi richiesti.
            </p>
          </li>

          {/* 4 */}
          <li className="flex gap-5">
            <span className="shrink-0 font-display text-lg font-semibold mt-0.5" style={{ color: '#DD4F22' }}>4.</span>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: '#2D2D2E', opacity: 0.85 }}>
              <p>
                Nel caso in cui abbia espresso il consenso e fino alla revoca dello stesso, i Suoi dati
                personali forniti saranno altresì trattati per le seguenti ulteriori finalità:
              </p>
              <ol className="space-y-2 pl-1">
                {[
                  { key: 'a', text: 'elaborare studi e ricerche statistiche e di mercato;' },
                  { key: 'b', text: 'inviare tramite posta, posta elettronica e/o canali telefonici, materiale pubblicitario, informativo e informazioni commerciali;' },
                  { key: 'c', text: 'compiere attività dirette ed indirette di vendita e di collocamento;' },
                  { key: 'd', text: 'effettuare comunicazioni commerciali interattive;' },
                  { key: 'e', text: 'effettuare rilevazioni del grado di soddisfazione della clientela sulla qualità dei servizi forniti (anche attraverso soggetti terzi).' },
                ].map(({ key, text }) => (
                  <li key={key} className="flex gap-3">
                    <span className="shrink-0 font-medium" style={{ color: '#DD4F22' }}>{key}.</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ol>
              <p>
                Lei potrà revocare il consenso fornito per tali finalità in qualsiasi momento contattando
                il responsabile indicato al punto 10. Il consenso per i trattamenti e le finalità di cui
                al presente punto 4 non è obbligatorio; a seguito di un eventuale diniego i Suoi dati
                saranno trattati per le sole finalità indicate al precedente punto 2.
              </p>
            </div>
          </li>

          {/* 5 */}
          <li className="flex gap-5">
            <span className="shrink-0 font-display text-lg font-semibold mt-0.5" style={{ color: '#DD4F22' }}>5.</span>
            <p className="text-sm leading-relaxed" style={{ color: '#2D2D2E', opacity: 0.85 }}>
              In qualità di clienti o potenziali clienti, i dati oggetto di trattamento sono generalmente
              di natura comune, poiché consistono essenzialmente in elementi di identificazione personale.
              Nel caso in cui Lei dovesse indicare nei campi che non prevedono una specifica indicazione
              dati che, ai sensi dell&apos;articolo 4 lettera d) Dlgs 196/2003, sono di natura sensibile
              ed in quanto tali meritevoli di tutele particolari, La informiamo che tali dati saranno da
              noi trattati nei limiti previsti dal codice della Privacy. Ricordiamo che in generale,
              l&apos;articolo 4 lettera d) Dlgs 196/2003 definisce come &ldquo;dati sensibili&rdquo; i dati
              personali &ldquo;idonei a rivelare l&apos;origine razziale ed etnica, le convinzioni religiose,
              filosofiche o di altro genere, le opinioni politiche, l&apos;adesione a partiti, sindacati,
              associazioni od organizzazioni a carattere religioso, filosofico, politico o sindacale,
              nonché i dati personali idonei a rivelare lo stato di salute e la vita sessuale&rdquo;.
            </p>
          </li>

          {/* 6 */}
          <li className="flex gap-5">
            <span className="shrink-0 font-display text-lg font-semibold mt-0.5" style={{ color: '#DD4F22' }}>6.</span>
            <p className="text-sm leading-relaxed" style={{ color: '#2D2D2E', opacity: 0.85 }}>
              Il trattamento di dati raccolti sarà effettuato mediante strumenti cartacei e/o elettronici
              e comunque in conformità alle disposizioni normative vigenti in materia.
            </p>
          </li>

          {/* 7 */}
          <li className="flex gap-5">
            <span className="shrink-0 font-display text-lg font-semibold mt-0.5" style={{ color: '#DD4F22' }}>7.</span>
            <p className="text-sm leading-relaxed" style={{ color: '#2D2D2E', opacity: 0.85 }}>
              Precisiamo che la nostra organizzazione pone in atto le necessarie misure di carattere
              organizzativo, fisico e logico, atte a garantire la sicurezza dei dati, con particolare
              riferimento a quanto previsto dall&apos;allegato B del Dpr 196/2003. Disciplinare tecnico
              in materia di misure minime di sicurezza.
            </p>
          </li>

          {/* 8 */}
          <li className="flex gap-5">
            <span className="shrink-0 font-display text-lg font-semibold mt-0.5" style={{ color: '#DD4F22' }}>8.</span>
            <p className="text-sm leading-relaxed" style={{ color: '#2D2D2E', opacity: 0.85 }}>
              Oltre che dai dipendenti della Società, alcuni trattamenti dei Suoi dati personali potranno
              essere effettuati anche da soggetti terzi, con sede in Italia e/o all&apos;estero, ai quali
              la nostra organizzazione affida talune attività (o parte di esse) funzionali alla fornitura
              dei servizi sopra citati. In tal caso gli stessi soggetti opereranno in qualità di Titolari
              autonomi o saranno designati come Responsabili o Incaricati del trattamento. I Responsabili
              e gli Incaricati eventualmente designati riceveranno adeguate istruzioni operative, con
              particolare riferimento all&apos;adozione delle misure minime di sicurezza, al fine di poter
              garantire la riservatezza e la sicurezza dei dati. I soggetti terzi sopra citati sono
              essenzialmente ricompresi nelle seguenti categorie: Società di recupero credito, Società
              che elaborano dati di traffico per la fatturazione, Società incaricate per la stampa e la
              spedizione delle fatture ai clienti, Società di Consulenza, Società cessionarie dei crediti,
              Agenti e Procacciatori, Franchisee, Fornitori di servizi tecnologici, Content Provider.
            </p>
          </li>

          {/* 9 */}
          <li className="flex gap-5">
            <span className="shrink-0 font-display text-lg font-semibold mt-0.5" style={{ color: '#DD4F22' }}>9.</span>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: '#2D2D2E', opacity: 0.85 }}>
              <p>
                Riportiamo di seguito l&apos;estratto dell&apos;articolo 7 Dlgs 196/2003, per ricordarLe
                che può esercitare nei nostri confronti i seguenti diritti:
              </p>
              <ol className="space-y-2 pl-1">
                {[
                  { key: 'a', text: 'ottenere la conferma dell\'esistenza di dati personali che La riguardano, anche se non ancora registrati, e la comunicazione in forma intelligibile;' },
                  { key: 'b', text: 'ottenere l\'indicazione dell\'origine dei dati personali, nonché delle finalità e delle modalità del trattamento;' },
                  { key: 'c', text: 'ottenere l\'indicazione della logica applicata nei trattamenti effettuati con l\'ausilio di strumenti elettronici;' },
                  { key: 'd', text: 'ottenere l\'indicazione degli estremi identificativi del titolare e dei responsabili;' },
                  { key: 'e', text: 'ottenere l\'indicazione dei soggetti o delle categorie di soggetti ai quali i dati personali possono essere comunicati o che possono venirne a conoscenza in qualità di rappresentante designato nel territorio dello Stato, di responsabili o incaricati;' },
                  { key: 'f', text: 'ottenere l\'aggiornamento, la rettificazione ovvero, quando vi ha interesse, l\'integrazione dei dati;' },
                  { key: 'g', text: 'ottenere la cancellazione, la trasformazione in forma anonima o il blocco dei dati trattati in violazione di legge;' },
                  { key: 'h', text: 'ottenere la cancellazione, la trasformazione in forma anonima o il blocco dei dati di cui non è necessaria la conservazione, in relazione agli scopi per i quali i dati sono stati raccolti o successivamente trattati;' },
                  { key: 'i', text: 'ottenere l\'attestazione che l\'aggiornamento, la rettificazione, l\'integrazione, la cancellazione, la trasformazione in forma anonima o il blocco sono stati portati a conoscenza, anche per quanto riguarda il contenuto, di coloro ai quali i dati sono stati comunicati o diffusi, tranne che nei casi in cui tale adempimento si riveli impossibile o comporti un impiego di mezzi manifestamente sproporzionato rispetto al diritto tutelato;' },
                  { key: 'j', text: 'opporsi, in tutto o in parte, per motivi legittimi, al trattamento dei dati personali che La riguardano, ancorché pertinenti allo scopo della raccolta;' },
                  { key: 'k', text: 'opporsi, in tutto o in parte, al trattamento di dati personali che La riguardano a fini di invio di materiale pubblicitario o di vendita diretta o per il compimento di ricerche di mercato o di comunicazione commerciale.' },
                ].map(({ key, text }) => (
                  <li key={key} className="flex gap-3">
                    <span className="shrink-0 font-medium" style={{ color: '#DD4F22' }}>{key}.</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </li>

          {/* 10 */}
          <li className="flex gap-5">
            <span className="shrink-0 font-display text-lg font-semibold mt-0.5" style={{ color: '#DD4F22' }}>10.</span>
            <div
              className="flex-1 rounded-xl p-5 text-sm leading-relaxed"
              style={{ backgroundColor: '#FAF7F2', border: '1px solid #E8DDD0', color: '#2D2D2E' }}
            >
              <p className="mb-2">
                Per esercitare tali diritti può rivolgersi al titolare del trattamento:
              </p>
              <p className="font-medium">
                Patti Giuseppe (San Pietro Formaggi)<br />
                C.da Scaletta, SNC<br />
                90030 Castronovo di Sicilia (PA)
              </p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  )
}
