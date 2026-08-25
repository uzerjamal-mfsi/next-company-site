import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { env } from '@/env';
import { getSiteSettings } from '@/lib/contentful/client';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { ThemeProvider } from './components/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  title: {
    default: 'The Company',
    template: '%s | The Company',
  },
  description: 'Software Services',
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
          >
            Skip to content
          </a>
          <NavBar siteSettings={siteSettings} />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer siteSettings={siteSettings} />
        </ThemeProvider>
      </body>
    </html>
  );
}
