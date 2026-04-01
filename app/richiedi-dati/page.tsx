import type { Metadata } from 'next'
import RichiediDatiForm from '@/components/RichiediDatiForm'

export const metadata: Metadata = {
  title: 'Richiedi Dati Personali',
  description: 'Richiedi l\'accesso ai tuoi dati personali in possesso di San Pietro Formaggi, ai sensi del GDPR.',
}

export default function RichiediDatiPage() {
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
          GDPR · Tutela dei Dati
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-4" style={{ color: '#2D2D2E' }}>
          Richiedi Dati Personali
        </h1>
        <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: '#2D2D2E', opacity: 0.85 }}>
          Ai sensi del Regolamento UE 2016/679 (GDPR) avete il diritto di richiedere l&apos;accesso,
          la rettifica o la cancellazione dei vostri dati personali.
        </p>
      </div>

      <div className="max-w-lg mx-auto px-5 sm:px-8 py-16">
        <RichiediDatiForm />
      </div>
    </div>
  )
}
