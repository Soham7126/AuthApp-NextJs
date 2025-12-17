import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get('token')?.value || ""

  // Define public and protected paths
  const publicPaths = ['/login', '/signup', '/verifyemail']
  const isPublicPath = publicPaths.includes(path)

  // Redirect authenticated users away from public pages
  if(isPublicPath && token){
    return NextResponse.redirect(new URL("/profile", request.nextUrl))
  }

  // Redirect unauthenticated users to login
  if(!isPublicPath && !token){
    return NextResponse.redirect(new URL("/login", request.nextUrl))
  }

  return NextResponse.next()
}
 
export const config = {
  matcher: [
    '/',
    '/profile',
    '/profile/:path*',
    '/login',
    '/signup',
    '/verifyemail'
  ]
}