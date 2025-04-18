import { Metadata } from 'next';

export function generateSEOMetadata({
  title,
  description,
  keywords,
  url,
  type = 'website',
  locale,
  image,
  publishedTime,
  modifiedTime,
  authors,
}: {
  title: string;
  description: string;
  keywords?: string;
  url: string;
  type?: string;
  locale: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
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
      ...(image && { images: [{ url: image }] }),
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors?.length && { authors: authors.map(author => ({ name: author })) }),
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
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'Article' : 'WebSite',
      name: title,
      description,
      url,
      ...(image && { image }),
      ...(publishedTime && { datePublished: publishedTime }),
      ...(modifiedTime && { dateModified: modifiedTime }),
      ...(authors?.length && { author: authors.map(author => ({ '@type': 'Person', name: author })) }),
    },
  };
}