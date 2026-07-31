import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PROTECTED_PREFIXES = ["/board"]

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get("token")?.value

    const isProtected = PROTECTED_PREFIXES.some(
        (p) => pathname === p || pathname.startsWith(`${p}/`)
    )

    if (isProtected && !token) {
        const url = request.nextUrl.clone()
        url.pathname = "/signin"
        url.searchParams.set("from", pathname)
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/board/:path*",
    ],
}
