import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Nessun file caricato' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'san-pietro-formaggi',
            resource_type: 'image',
          },
          (error, result) => {
            if (error) reject(error)
            else resolve(result as { secure_url: string })
          }
        )
        .end(buffer)
    })

    return NextResponse.json({ url: result.secure_url })
  } catch {
    return NextResponse.json({ error: 'Errore nel caricamento dell\'immagine' }, { status: 500 })
  }
}
