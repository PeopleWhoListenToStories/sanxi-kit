
import React from 'react';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { SidebarProvider } from '~/components/ui/sidebar';
import "~/styles/globals.css";
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

type Props = { children: React.ReactNode };

export default function RootLayout({ children }: Props) {
  return (
    <html lang="zh-CN" className={inter.className}>
      <head>
        <Script defer src="https://umami.xulai.fun/script.js" data-website-id="4e405d27-c14b-4799-8fd0-31a7b250c32b" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="enableSystem" enableSystem={true}>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
