import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getSiteSettings } from '@/lib/contentful/client';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { ThemeProvider } from './components/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Company',
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
          <NavBar siteSettings={siteSettings} />
          <main className="flex-1">{children}</main>
          <Footer siteSettings={siteSettings} />
        </ThemeProvider>
      </body>
    </html>
  );
}
