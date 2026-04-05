import createMiddleware from "next-intl/middleware";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

const protectedSegments = ["/account", "/checkout"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const withoutLocale = pathname.replace(/^\/(ru|en)/, "") || "/";
  const isProtected = protectedSegments.some((p) => withoutLocale.startsWith(p));

  if (isProtected && !req.auth) {
    const localeMatch = pathname.match(/^\/(ru|en)/);
    const locale = localeMatch ? localeMatch[1] : "ru";
    const loginUrl = new URL(`/${locale}/login`, req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return intlMiddleware(req);
}) as (req: NextRequest) => Response | Promise<Response>;

export const config = {
  matcher: ["/((?!api|studio|_next/static|_next/image|favicon.ico).*)"],
};
