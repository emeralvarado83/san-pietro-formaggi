import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/i-nostri-formaggi', label: 'I Nostri Formaggi' },
  { href: '/ricette', label: 'Ricette' },
  { href: '/lazienda', label: "L'Azienda" },
  { href: '/contatti', label: 'Contatti' },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#2D2D2E', color: '#FDF8F0' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <p className="font-display text-xl font-semibold" style={{ color: '#DD4F22' }}>
                San Pietro Formaggi
              </p>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#E8DDD0', opacity: 0.8 }}>
              Da generazioni produciamo formaggi artigianali nel cuore della Sicilia, nel rispetto della tradizione.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs tracking-widest uppercase font-medium mb-5" style={{ color: '#DD4F22' }}>
              Navigazione
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm link-gold"
                    style={{ color: '#E8DDD0' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs tracking-widest uppercase font-medium mb-5" style={{ color: '#DD4F22' }}>
              Informazioni Legali
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: '/disclaimer', label: 'Disclaimer' },
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/richiedi-dati', label: 'Richiedi Dati Personali' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm link-gold"
                    style={{ color: '#E8DDD0' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs tracking-widest uppercase font-medium mb-5" style={{ color: '#DD4F22' }}>
              Dettagli Azienda
            </h3>
            <div className="space-y-3 text-sm" style={{ color: '#E8DDD0', opacity: 0.85 }}>
              <p className="leading-relaxed">
                Piazzetta San Giovanni 2<br />
                90030 Castronovo di Sicilia (PA)<br />
                Sicilia, Italia
              </p>
              <p>
                Tel/Fax:{' '}
                <a href="tel:+390918217240" className="link-gold" style={{ color: '#E8DDD0' }}>
                  091 8217240
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@sanpietroformaggi.com"
                  className="link-gold"
                  style={{ color: '#E8DDD0' }}
                >
                  info@sanpietroformaggi.com
                </a>
              </p>
              <p style={{ opacity: 0.6 }}>P.IVA 06734000828</p>
              <div className="pt-2">
                <Link href="/contatti" className="btn-outline-gold">
                  Richiedi Preventivo
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divider + copyright */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: '1px solid rgba(232,221,208,0.15)', color: 'rgba(232,221,208,0.5)' }}
        >
          <p>© {new Date().getFullYear()} San Pietro Formaggi s.r.l. Tutti i diritti riservati.</p>
          <p>Castronovo di Sicilia (PA) · Sicilia</p>
        </div>
      </div>
    </footer>
  )
}
