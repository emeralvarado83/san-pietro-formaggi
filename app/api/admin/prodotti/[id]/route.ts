import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { featuredCategories } from '@/lib/data'

const featuredCategorySet = new Set<string>(featuredCategories)

export async function GET(
  _request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params
  const prodotto = await prisma.prodotto.findUnique({ where: { id } })
  if (!prodotto) {
    return NextResponse.json({ error: 'Prodotto non trovato' }, { status: 404 })
  }
  return NextResponse.json(prodotto)
}

export async function PUT(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params
    const data = await request.json()
    const destacado = Boolean(data.destacado) && featuredCategorySet.has(data.categoria)

    if (destacado) {
      const activeFeatured = await prisma.prodotto.findFirst({
        where: { categoria: data.categoria, destacado: true, NOT: { id } },
      })

      if (activeFeatured) {
        return NextResponse.json(
          { error: 'Esiste già un prodotto in evidenza per questa categoria. Prima deselezionalo.' },
          { status: 409 },
        )
      }
    }

    const prodotto = await prisma.prodotto.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        categoria: data.categoria,
        descrizioneBreve: data.descrizioneBreve,
        descrizione: data.descrizione || null,
        disponibilita: data.disponibilita || 'Disponibile',
        destacado,
        immagine: data.immagine || null,
      },
    })

    return NextResponse.json(prodotto)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Errore nell\'aggiornamento'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params
    await prisma.prodotto.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Errore nell\'eliminazione' }, { status: 500 })
  }
}
