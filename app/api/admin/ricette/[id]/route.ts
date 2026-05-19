import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params
  const ricetta = await prisma.ricetta.findUnique({ where: { id } })
  if (!ricetta) {
    return NextResponse.json({ error: 'Ricetta non trovata' }, { status: 404 })
  }
  return NextResponse.json(ricetta)
}

export async function PUT(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params
    const data = await request.json()

    const ricetta = await prisma.ricetta.update({
      where: { id },
      data: {
        titolo: data.titolo,
        slug: data.slug,
        indicazioni: data.indicazioni || null,
        ingredienti: data.ingredienti || null,
        preparazione: data.preparazione || null,
        immagine: data.immagine || null,
      },
    })

    return NextResponse.json(ricetta)
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
    await prisma.ricetta.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Errore nell\'eliminazione' }, { status: 500 })
  }
}
