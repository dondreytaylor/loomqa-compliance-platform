import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function parsePathnameFromHeader(value: string | null, base: string): string | null {
  if (!value) return null;
  try {
    return new URL(value, base).pathname;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const internalPathname = request.nextUrl.pathname;

  if (
    internalPathname.startsWith("/_next/static") ||
    internalPathname.startsWith("/_next/image")
  ) {
    return NextResponse.next();
  }

  const base = request.nextUrl.origin;
  const pathnameFromNextUrl = parsePathnameFromHeader(
    request.headers.get("next-url"),
    base,
  );
  const pathnameFromRewritten = parsePathnameFromHeader(
    request.headers.get("x-nextjs-rewritten-path"),
    base,
  );
  const pathnameFromReferer = parsePathnameFromHeader(
    request.headers.get("referer"),
    base,
  );

  const pathnameForUi = internalPathname.startsWith("/_next/")
    ? (pathnameFromNextUrl ?? pathnameFromRewritten ?? pathnameFromReferer ?? "/")
    : (pathnameFromRewritten ?? pathnameFromNextUrl ?? internalPathname);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-LoopQA-pathname", pathnameForUi);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|favicon.ico).*)"],
};
