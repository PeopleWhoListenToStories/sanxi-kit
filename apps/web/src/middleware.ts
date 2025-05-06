import { NextRequest } from 'next/server';
// import { withAuth } from 'next-auth/middleware';
import createMiddleware from 'next-intl/middleware';

import { routing } from '~/i18n/routing';

// const publicPages = [
//   '/',
//   '/login'
//   // (/secret requires auth)
// ];

const intlMiddleware = createMiddleware(routing);

// const authMiddleware = withAuth(
//   // Note that this callback is only invoked if
//   // the `authorized` callback has returned `true`
//   // and not for pages listed in `pages`.
//   (req) => intlMiddleware(req),
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         return token != null
//       }
//     },
//     pages: {
//       signIn: '/login'
//     }
//   }
// );

export default function middleware(req: NextRequest) {
  // const publicPathnameRegex = RegExp(`^(/(${routing.locales.join('|')}))?(${publicPages.flatMap((p) => (p === '/' ? ['', '/'] : p)).join('|')})/?$`, 'i');
  // const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  // if (isPublicPage) {
  //   return intlMiddleware(req);
  // } else {
  //   return (authMiddleware as any)(req);
  // }
  return intlMiddleware(req);

}


export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
    '/((?!_next|.*/opengraph-image|.*\\..*).*)',
    '/',
    '/(zh-CN|en)/:path*',
    '/slaykit/:path*'
  ]
};
