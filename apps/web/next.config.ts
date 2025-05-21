import type { NextConfig } from "next";
// import createMDX from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';
import createBundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin({
  // requestConfig: './src/i18n/request.ts',
  // experimental: {
  //   createMessagesDeclaration: './messages/default.json'
  // }
});
// const withMdx = createMDX({});
const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
});

const rewrites = async () => {
  return [
    {
      source: '/api/:slug*',
      destination: 'http://sanxi.xulai.fun/api/:slug*',
    },
    {
      source: '/short-url/:slug*',
      destination: 'https://api.xulai.fun/:slug*',
    },
    {
      source: '/zh-CN/short-url/:slug*',
      destination: 'https://api.xulai.fun/:slug*',
    },
    {
      source: '/en/short-url/:slug*',
      destination: 'https://api.xulai.fun/:slug*',
    },
    {
      source: '/ai/:slug*',
      destination: 'https://api-demo.tiptap.dev/v1/ai/:slug*',
    },
    {
      source: '/slaykit/:slug*',
      destination: 'https://api.sanxi.xulai.fun/:slug*',
    },
    {
      source: '/zh-CN/slaykit/:slug*',
      destination: 'https://api.sanxi.xulai.fun/:slug*',
    },
    {
      source: '/en/slaykit/:slug*',
      destination: 'https://api.sanxi.xulai.fun/:slug*',
    },
  ];
};

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: 'standalone',
  trailingSlash: false,
  reactStrictMode: false,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  // trailingSlash: process.env.NEXT_PUBLIC_USE_CASE === 'trailing-slash',
  // basePath: process.env.NEXT_PUBLIC_USE_CASE === 'base-path' ? '/base/path' : undefined,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  rewrites,
  env: {
    SERVER_API_URL: '/slaykit',
    COLLABORATION_API_URL: 'https://api.sanxi.xulai.fun/ws-sanxi/',
    // COLLABORATION_API_URL: 'wss://110.40.181.43:31063/',
    NEXT_PUBLIC_LOCALE_PREFIX: 'always',
    NEXT_PUBLIC_TIPTAP_AI_APP_ID: '79drg0x6',
    NEXT_PUBLIC_TIPTAP_AI_TOKEN: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTk5MDQxNjl9.lYbRIEGpK2k5J8cRY-MEnx65gMn4uNx8YjUfBmGyn08',
    NEXT_PUBLIC_TIPTAP_AI_BASE_URL: '/ai',
    NEXT_PUBLIC_SHORT_URL: 'https://api.xulai.fun',
    PORT: '30054',
    ENV: 'dev',
    NEXT_PUBLIC_APP_URL: 'https://sanxi.xulai.fun',
    NEXTAUTH_SECRET: 'R6M8k5IbsA8l9akKzGllij679B2JsVgOsdqi0hHiW8I=',
    NEXTAUTH_URL: 'https://sanxi.xulai.fun',
    GITHUB_CLIENT_ID: 'Ov23liESo088K0TL2f6R',
    GITHUB_CLIENT_SECRET: 'd8eaf116c7ec41373bf3db11c6b5fcfc8c810b95',
    NEXT_PUBLIC_AVATAR_URL: 'https://api.xulai.fun/image/fun-emoji/svg?radius=50&size=32&backgroundType=gradientLinear',
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: 'WgSuiiXb-y1m0KzugvMLzFLWavsD02AX9wOz0wWXLtI'
    // ENABLE_ALIYUN_OSS: !!config.oss.aliyun.accessKeyId,
    // DNS_PREFETCH: (config.client.dnsPrefetch || '').split(' '),
    // SEO_APPNAME: config.client.seoAppName,
    // SEO_DESCRIPTION: config.client.seoDescription,
    // SEO_KEYWORDS: config.client.seoKeywords,
  },
  compiler: {
    styledComponents: true,
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            dimensions: false,
          },
        },
      ],
    });
    return config;
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https', // 图片资源的协议
        hostname: 'img.xulai.fun', // 图片资源的域名
      },
      // {
      //   protocol: "https",
      //   hostname: "utfs.io",
      //   pathname: `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/*`,
      // },
    ],
  },
};

export default withNextIntl(withBundleAnalyzer(nextConfig));
// export default withNextIntl(withMdx(withBundleAnalyzer(nextConfig)));
