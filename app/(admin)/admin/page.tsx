import { prisma } from '@/lib/prisma'

export default async function AdminDashboard() {
  const [prodottiCount, ricetteCount] = await Promise.all([
    prisma.prodotto.count(),
    prisma.ricetta.count(),
  ])

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-semibold text-[#2D2D2E] mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-[#E8DDD0]">
          <p className="text-xs uppercase tracking-widest text-[#DD4F22] font-medium mb-2">Prodotti</p>
          <p className="font-display text-4xl font-semibold text-[#2D2D2E]">{prodottiCount}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E8DDD0]">
          <p className="text-xs uppercase tracking-widest text-[#DD4F22] font-medium mb-2">Ricette</p>
          <p className="font-display text-4xl font-semibold text-[#2D2D2E]">{ricetteCount}</p>
        </div>
      </div>
    </div>
  )
}
