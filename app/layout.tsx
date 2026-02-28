import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import {
  BASE_URL,
  BETA_TALLY_URL,
  BUZZR_TV_DISCLAIMER,
  INSTAGRAM_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  TWITTER_URL
} from '@/src/lib/constants';
import { acworth, inter } from './fonts';
import { SiteBackground } from '@/components/SiteBackground';
import { PremiumGridBackground } from '@/components/PremiumGridBackground';
import { FloatingIconsBackground } from '@/components/FloatingIconsBackground';

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
    <html lang="en" className={`dark ${acworth.variable} ${inter.variable}`}>
      <body className="bg-background text-foreground">
        <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-[rgb(var(--bg-gradient-start))] via-[rgb(var(--bg-gradient-mid))] to-[rgb(var(--bg-gradient-end))]">
          <div className="pointer-events-none fixed inset-0 opacity-[0.05] bg-noise z-50 mix-blend-overlay" aria-hidden="true" />
          <SiteBackground />
          <PremiumGridBackground />
          <FloatingIconsBackground />
          <div className="relative z-10 flex min-h-screen flex-col mx-auto w-full max-w-[1400px]">
          <header className="flex items-center justify-between border-b border-border/70 px-6 py-4 backdrop-blur-sm">
            <Link href="/" className="flex items-center transition-opacity hover:opacity-90">
              <span className="font-heading text-sm uppercase tracking-[0.24em] text-buzzr-accent">
                Buzzr
              </span>
            </Link>
            <nav aria-label="Primary">
              <ul className="flex gap-5 text-xs text-mutedForeground">
                <li>
                  <Link href="/support" className="transition-colors hover:text-foreground">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="transition-colors hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="transition-colors hover:text-foreground">
                    Terms
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-border/70 px-6 py-5 text-xs text-mutedForeground">
            <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1">
              <a
                href={BETA_TALLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-buzzr-accent underline-offset-2 hover:underline"
              >
                Get notified when we launch
              </a>
              <a
                href={TWITTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-buzzr-accent underline-offset-2 hover:underline"
              >
                X
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-buzzr-accent underline-offset-2 hover:underline"
              >
                Instagram
              </a>
            </div>
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
        </div>
      </body>
    </html>
  );
}
