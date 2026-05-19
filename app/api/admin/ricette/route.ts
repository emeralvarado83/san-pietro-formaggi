import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/slugify'

export async function GET() {
  const ricette = await prisma.ricetta.findMany({
    orderBy: { titolo: 'asc' },
  })
  return NextResponse.json(ricette)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const slug = data.slug || slugify(data.titolo)

    const ricetta = await prisma.ricetta.create({
      data: {
        titolo: data.titolo,
        slug,
        indicazioni: data.indicazioni || null,
        ingredienti: data.ingredienti || null,
        preparazione: data.preparazione || null,
        immagine: data.immagine || null,
      },
    })

    return NextResponse.json(ricetta, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Errore nella creazione della ricetta'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
