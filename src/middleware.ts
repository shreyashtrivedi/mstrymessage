import { NextResponse, NextRequest } from 'next/server'
// import type { NextRequest } from 'next/server'

export { default } from "next-auth/middleware"
import { getToken } from 'next-auth/jwt'
import { getURL } from 'next/dist/shared/lib/utils'
 

// This function can be marked `async` if using `await` inside

export async function middleware(request: NextRequest) {

    const token = await getToken({req: request})
    const url = request.nextUrl

    if(token &&
        (
            url.pathname.startsWith('/sign-in') ||
            url.pathname.startsWith('/sign-up') ||
            url.pathname.startsWith('/verify')  ||
            url.pathname.startsWith('/')
        )
    ) {
        // return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if (
    !token &&
    (url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/verify'))
  ) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  // Otherwise, allow the request
  return NextResponse.next()
    


//   return NextResponse.redirect(new URL('/home', request.url))
}
 

// KAHA KAHA MIDDLEWARE CHALEGA =>
export const config = {
  matcher: ['/sign-in',
  '/sign-up',
  '/',
  '/dashboard/:path*',           //dashboard ke andar jitne bhi path honge sabke liye
  '/verify/:path*',
  ]
}