import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nome, email, telefono, messaggio } = body

    // Validation
    if (!nome || typeof nome !== 'string' || nome.trim().length < 2) {
      return NextResponse.json({ error: 'Nome non valido.' }, { status: 400 })
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Email non valida.' }, { status: 400 })
    }
    if (!messaggio || typeof messaggio !== 'string' || messaggio.trim().length < 10) {
      return NextResponse.json({ error: 'Il messaggio è troppo breve.' }, { status: 400 })
    }

    const toEmail = process.env.CONTACT_EMAIL || 'info@sanpietroformaggi.com'

    const { error } = await getResend().emails.send({
      from: 'San Pietro Formaggi <onboarding@resend.dev>',
      to: [toEmail],
      replyTo: email,
      subject: `Nuova richiesta da ${nome.trim()} — San Pietro Formaggi`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; color: #2D2D2E;">
          <div style="border-bottom: 2px solid #DD4F22; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="margin: 0; font-size: 22px; color: #2D2D2E;">Nuova richiesta di contatto</h1>
            <p style="margin: 4px 0 0; font-size: 13px; color: #FBC703;">San Pietro Formaggi — Modulo di contatto</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E8DDD0; font-size: 12px; color: #FBC703; text-transform: uppercase; letter-spacing: 0.1em; width: 120px;">Nome</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E8DDD0; font-size: 15px;">${nome.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E8DDD0; font-size: 12px; color: #FBC703; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E8DDD0; font-size: 15px;"><a href="mailto:${email}" style="color: #DD4F22;">${email}</a></td>
            </tr>
            ${telefono ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E8DDD0; font-size: 12px; color: #FBC703; text-transform: uppercase; letter-spacing: 0.1em;">Telefono</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E8DDD0; font-size: 15px;">${telefono.trim()}</td>
            </tr>` : ''}
          </table>

          <div style="margin-top: 24px;">
            <p style="font-size: 12px; color: #FBC703; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px;">Messaggio</p>
            <div style="background: #FAF7F2; border: 1px solid #E8DDD0; border-radius: 8px; padding: 16px; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${messaggio.trim()}</div>
          </div>

          <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #E8DDD0; font-size: 12px; color: #FBC703;">
            San Pietro Formaggi · Castronovo di Sicilia (PA) · Sicilia, Italia
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Errore durante l\'invio. Riprova o contattaci via email.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Errore del server. Riprova più tardi.' }, { status: 500 })
  }
}
