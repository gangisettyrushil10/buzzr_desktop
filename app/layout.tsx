import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import {
  BASE_URL,
  BUZZR_TV_DISCLAIMER,
  SITE_DESCRIPTION,
  SITE_NAME
} from '@/src/lib/constants';
import { acworth, inter } from './fonts';

export const metadata: Metadata = {
  title: `${SITE_NAME} — Rate sports games by entertainment.`,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: `${SITE_NAME} — Rate sports games by entertainment.`,
    description: SITE_DESCRIPTION,
    url: BASE_URL,
    siteName: SITE_NAME,
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${acworth.variable} ${inter.variable}`}>
      <body className="bg-background text-foreground">
        <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#253237] via-[#111827] to-black">
          <header className="flex items-center justify-between border-b border-border/70 px-6 py-4 backdrop-blur-sm">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-9 w-9 overflow-hidden rounded-[0.4rem] border border-buzzr-accent/70 bg-[#020617] pixelated pixel-border">
                <Image
                  src="/buzzr-stadium-dark.png"
                  alt="Buzzr Sports stadium logo"
                  fill
                  sizes="36px"
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-heading text-sm uppercase tracking-[0.24em] text-buzzr-accent">
                Buzzr Sports
              </span>
            </Link>
            <nav aria-label="Primary">
              <ul className="flex gap-5 text-xs text-mutedForeground">
                <li>
                  <Link href="/support" className="hover:text-foreground">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground">
                    Terms
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-border/70 px-6 py-5 text-xs text-mutedForeground">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span>© {new Date().getFullYear()} Humyn LLC</span>
              <div className="flex gap-3">
                <Link href="/privacy" className="hover:text-foreground">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-foreground">
                  Terms
                </Link>
                <Link href="/support" className="hover:text-foreground">
                  Support
                </Link>
              </div>
            </div>
            <p className="mt-2 max-w-xl text-[0.7rem] text-mutedForeground">
              {BUZZR_TV_DISCLAIMER}
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
