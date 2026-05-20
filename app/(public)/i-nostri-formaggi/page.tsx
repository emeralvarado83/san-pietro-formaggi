import type { Metadata } from 'next'
import ProductCard from '@/components/ProductCard'
import { getProdotti, type Prodotto } from '@/lib/db'
import { categories, categoryDescriptions } from '@/lib/data'

export const metadata: Metadata = {
  title: 'I Nostri Formaggi',
  description: 'Scopri tutti i formaggi artigianali di San Pietro Formaggi: freschi, semistagionati e stagionati.',
}

export const dynamic = 'force-dynamic'

export default async function CatalogoPage() {
  const prodotti = await getProdotti()

  const byCategory = categories.reduce<Record<string, Prodotto[]>>((acc, cat) => {
    acc[cat] = prodotti.filter((p) => p.categoria === cat)
    return acc
  }, {})

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
          San Pietro Formaggi
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-4" style={{ color: '#2D2D2E' }}>
          Il Nostro Catalogo
        </h1>
        <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: '#2D2D2E', opacity: 0.85 }}>
          Scopri la nostra sezione dedicata ai formaggi artigianali.
        </p>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 space-y-20">
        {categories.map((category) => {
          const categoryProducts = byCategory[category] ?? []
          return (
            <section key={category} id={category.toLowerCase()}>
              {/* Section header */}
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p
                    className="text-xs tracking-widest uppercase font-medium mb-1"
                    style={{ color: '#DD4F22' }}
                  >
                    {categoryProducts.length} varietà
                  </p>
                  <h2 className="font-display text-3xl font-semibold" style={{ color: '#2D2D2E' }}>
                    {category}
                  </h2>
                  <p className="text-sm mt-2 max-w-md leading-relaxed" style={{ color: '#2D2D2E', opacity: 0.8 }}>
                    {categoryDescriptions[category]}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="mb-8 h-px" style={{ backgroundColor: '#E8DDD0' }} />

              {/* Products grid */}
              {categoryProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} showCategory={false} />
                  ))}
                </div>
              ) : (
                <p className="text-sm italic" style={{ color: '#FBC703', opacity: 0.7 }}>
                  Nessun prodotto disponibile in questa categoria.
                </p>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
