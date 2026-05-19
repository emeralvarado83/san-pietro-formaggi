import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/slugify'
import { featuredCategories } from '@/lib/data'

const featuredCategorySet = new Set<string>(featuredCategories)

export async function GET() {
  const prodotti = await prisma.prodotto.findMany({
    orderBy: [{ categoria: 'asc' }, { name: 'asc' }],
  })
  return NextResponse.json(prodotti)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const slug = data.slug || slugify(data.name)
    const destacado = Boolean(data.destacado) && featuredCategorySet.has(data.categoria)

    if (destacado) {
      const activeFeatured = await prisma.prodotto.findFirst({
        where: { categoria: data.categoria, destacado: true },
      })

      if (activeFeatured) {
        return NextResponse.json(
          { error: 'Esiste già un prodotto in evidenza per questa categoria. Prima deselezionalo.' },
          { status: 409 },
        )
      }
    }

    const prodotto = await prisma.prodotto.create({
      data: {
        name: data.name,
        slug,
        categoria: data.categoria,
        descrizioneBreve: data.descrizioneBreve,
        descrizione: data.descrizione || null,
        disponibilita: data.disponibilita || 'Disponibile',
        destacado,
        immagine: data.immagine || null,
      },
    })

    return NextResponse.json(prodotto, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Errore nella creazione del prodotto'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
