import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-change-me')

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow login page and auth API routes
  if (pathname === '/admin/login' || pathname.startsWith('/api/auth/')) {
    return NextResponse.next()
  }

  // Protect /admin/* routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth_token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      await jwtVerify(token, JWT_SECRET)
      return NextResponse.next()
    } catch {
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.delete('auth_token')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
