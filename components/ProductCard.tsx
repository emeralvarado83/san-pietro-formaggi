import Link from 'next/link'
import Image from 'next/image'
import type { Prodotto } from '@/lib/db'

const categoryColors: Record<string, { bg: string; text: string }> = {
  Freschi: { bg: 'rgba(200,144,42,0.12)', text: '#FBC703' },
  Semistagionati: { bg: 'rgba(139,94,60,0.12)', text: '#2D2D2E' },
  Stagionati: { bg: 'rgba(59,42,26,0.1)', text: '#2D2D2E' },
}

interface ProductCardProps {
  product: Prodotto
  showCategory?: boolean
}

export default function ProductCard({ product, showCategory = true }: ProductCardProps) {
  const colors = categoryColors[product.categoria] ?? { bg: 'rgba(200,144,42,0.12)', text: '#FBC703' }

  return (
    <article
      className="group rounded-xl overflow-hidden transition-all duration-300 flex flex-col"
      style={{
        backgroundColor: '#FAF7F2',
        boxShadow: '0 2px 12px rgba(59,42,26,0.08), 0 1px 3px rgba(59,42,26,0.05)',
        border: '1px solid #E8DDD0',
      }}
    >

      {/* Image area */}
      <div
        className="h-44 flex items-center justify-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #FDF8F0 0%, #EDE4D6 100%)',
        }}
      >
        {product.immagine ? (
          <Image
            src={product.immagine}
            alt={product.name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="text-center">
            <div
              className="text-4xl mb-1 opacity-30 select-none"
              aria-hidden="true"
            >
              ◆
            </div>
            <p
              className="text-xs tracking-widest uppercase font-medium opacity-40"
              style={{ color: '#2D2D2E' }}
            >
              San Pietro
            </p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {showCategory && (
          <span
            className="inline-block text-[10px] tracking-widest uppercase font-medium px-2.5 py-1 rounded-full mb-3 self-start"
            style={{ backgroundColor: colors.bg, color: colors.text }}
          >
            {product.categoria}
          </span>
        )}

        <h3
          className="font-display text-lg font-semibold mb-4 leading-snug transition-colors duration-200 group-hover:text-[#DD4F22]"
          style={{ color: '#2D2D2E' }}
        >
          {product.name}
        </h3>

        <Link
          href={`/i-nostri-formaggi/${product.slug}`}
          className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase font-medium transition-colors duration-200 mt-auto"
          style={{ color: '#DD4F22' }}
        >
          Scopri di più
          <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </article>
  )
}
