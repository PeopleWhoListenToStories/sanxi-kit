
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
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "rju0hq0fdx");
            `
          }}
        />
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
