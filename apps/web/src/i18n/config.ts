export type Locale = (typeof locales)[number];

export const locales = ['en', 'zh-CN'] as const;
export const defaultLocale: Locale = 'zh-CN';
export const localePrefix = process.env.NEXT_PUBLIC_USE_CASE === 'locale-prefix-never'
  ? 'never'
  : {
    mode: 'as-needed',
    prefixes: {
      es: '/spain'
    }
  };

export const domains = process.env.NEXT_PUBLIC_USE_CASE === 'domains'
  ? [
    {
      domain: 'example.com',
      defaultLocale: 'en',
      locales: ['en', 'es', 'ja']
    },
    {
      domain: 'example.de',
      defaultLocale: 'de',
      locales: ['de']
    }
  ]
  : undefined;

export const localeCookie = process.env.NEXT_PUBLIC_USE_CASE === 'locale-cookie-false'
  ? false
  : {
    // 200 days
    maxAge: 200 * 24 * 60 * 60
  };