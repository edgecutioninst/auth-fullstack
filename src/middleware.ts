import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    // Public paths that anyone can see
    const isPublicPath = path === '/login' ||
        path === '/signup' ||
        path === '/verifyemail' ||
        path === '/forgotpassword' ||
        path === '/resetpassword' ||
        path === '/'

    const token = request.cookies.get('token')?.value || ''

    // This was the cause of the loop. If your token is invalid, this rule
    // forces you to Home, but Home forces you back here.
    /* if(isPublicPath && token) {
      return NextResponse.redirect(new URL('/', request.nextUrl))
    }
    */

    // Keep this one! (Protect private pages)
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}

export const config = {
    matcher: [
        '/',
        '/profile',
        '/profile/:path*',
        '/login',
        '/signup',
        '/verifyemail',
        '/forgotpassword',
        '/resetpassword'
    ]
}