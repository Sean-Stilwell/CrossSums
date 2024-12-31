import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "fr"];
const defaultLocale = "en";

function getLocale(request: NextRequest) {
    const acceptLanguage = request.headers.get("Accept-Language");
    if (acceptLanguage) {
        const preferredLocales = acceptLanguage
            .split(",")
            .map((locale) => locale.split(";")[0])
            .map((locale) => locale.split("-")[0]);

        for (const locale of preferredLocales) {
            if (locales.includes(locale)) {
                return locale;
            }
        }
    }

    return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    "/((?!_next).*)", '/', '/CrossSums'
  ],
};