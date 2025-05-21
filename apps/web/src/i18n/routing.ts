import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale, localePrefix, domains, localeCookie } from '~/i18n/config';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Only add the locale prefix when the locale is not the default
  localePrefix:
    process.env.NEXT_PUBLIC_USE_CASE === 'locale-prefix-never'
      ? 'never'
      : {
        mode: 'as-needed',
        prefixes: {
          es: '/spain'
        }
      },
  domains:
    process.env.NEXT_PUBLIC_USE_CASE === 'domains'
      ? [
        {
          domain: 'example.com',
          defaultLocale: 'en',
          locales: ['en', 'es', 'zh-CN']
        },
        {
          domain: 'example.de',
          defaultLocale: 'de',
          locales: ['de']
        }
      ]
      : undefined,

  localeCookie,

  pathnames: {
    '/': '/',
    '/client': '/client',
    '/about': '/about',
    '/client/redirect': '/client/redirect',
    '/nested': {
      en: '/nested',
      de: '/verschachtelt',
      es: '/anidada',
      ja: '/ネスト'
    },
    '/redirect': '/redirect',
    '/news/[articleId]': {
      en: '/news/[articleId]',
      de: '/neuigkeiten/[articleId]',
      es: '/noticias/[articleId]',
      ja: '/ニュース/[articleId]'
    },
    '/news/just-in': {
      en: '/news/just-in',
      de: '/neuigkeiten/aktuell',
      es: '/noticias/justo-en',
      ja: '/ニュース/現在'
    }
  },

}); 