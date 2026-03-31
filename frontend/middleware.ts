import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

const cspDirectives = [
  "default-src 'self'",
  // Next.js requires unsafe-inline for hydration scripts; unsafe-eval is needed in dev
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://cdn.sanity.io",
  // Sanity live queries use SSE and WebSocket connections
  "connect-src 'self' https://*.sanity.io https://api.sanity.io wss://*.sanity.io https://va.vercel-scripts.com",
  // Allow Sanity Studio to embed site in iframe for Visual Editing
  "frame-ancestors 'self' http://localhost:3333 https://*.sanity.io",
].join('; ')

const securityHeaders = [
  // X-Frame-Options omitted — frame-ancestors in CSP is the modern replacement
  // and X-Frame-Options SAMEORIGIN would block Studio (port 3333) from embedding this app (port 3000)
  {key: 'X-Content-Type-Options', value: 'nosniff'},
  {key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin'},
  {key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()'},
  {key: 'Content-Security-Policy', value: cspDirectives},
]

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  for (const {key, value} of securityHeaders) {
    response.headers.set(key, value)
  }

  return response
}

export const config = {
  matcher: [
    // Apply to all routes except static files and images
    {
      source: '/((?!_next/static|_next/image|favicon.ico).*)',
      missing: [
        {type: 'header', key: 'next-router-prefetch'},
        {type: 'header', key: 'purpose', value: 'prefetch'},
      ],
    },
  ],
}
