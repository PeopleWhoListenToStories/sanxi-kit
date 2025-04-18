import { Metadata } from 'next';

export function generateSEOMetadata({
  title,
  description,
  keywords,
  url,
  type = 'website',
  locale,
}: {
  title: string;
  description: string;
  keywords?: string;
  url: string;
  type?: string;
  locale: string;
}): Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Sanxi',
      locale,
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}