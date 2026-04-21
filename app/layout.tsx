import './globals.css';
import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import { ReactNode } from 'react';
import {
  APP_STORE_URL,
  BASE_URL,
  DISCORD_URL,
  DOCS_URL,
  BUZZR_TV_DISCLAIMER,
  INSTAGRAM_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  TWITTER_URL
} from '@/src/lib/constants';
import { montserrat, jetbrainsMono } from './fonts';
import { BrandAura } from '@/components/BrandAura';
import { BrandMark } from '@/components/BrandMark';
import { CourtCanvas } from '@/components/CourtCanvas';
import { SiteHeader } from '@/components/SiteHeader';
import { BRAND_ASSETS } from '@/src/lib/brandAssets';

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(BASE_URL),
  icons: {
    shortcut: BRAND_ASSETS.shortcut
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: BASE_URL,
    siteName: SITE_NAME,
    type: 'website'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0a0c'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const fontVariables = `${montserrat.variable} ${jetbrainsMono.variable}`;

  return (
    <html lang="en" className={`dark ${fontVariables}`}>
      <body className="bg-background text-foreground overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only absolute left-4 top-4 z-50 rounded-md bg-black px-4 py-2 text-sm font-medium text-foreground focus:not-sr-only focus:outline focus:outline-2 focus:outline-buzzr-accent"
        >
          Skip to content
        </a>
        <CourtCanvas />
        <BrandAura />

        <div className="relative z-10 flex min-h-screen flex-col">
          <SiteHeader />

          <main id="main-content" className="w-full flex-1">
            {children}
          </main>

          {/* ── Footer ── */}
          <footer className="relative border-t border-white/[0.06]">
            <div className="mx-auto w-full max-w-[1200px] px-6 py-12 text-xs text-mutedForeground">
              <div className="mb-10 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <BrandMark alt="" size={22} className="opacity-90" />
                    <span className="font-heading text-[16px] lowercase leading-none text-foreground">
                      buzzr<span className="text-buzzr-accent">.</span>
                    </span>
                  </div>
                  <p className="font-medium text-[9px] uppercase tracking-[0.24em] text-buzzr-ink-80">
                    Rate the game.
                  </p>
                  <p className="max-w-[240px] text-xs leading-relaxed text-mutedForeground">
                    Rate sports games by entertainment, not just the score. Built by Humyn LLC.
                  </p>
                </div>

                <div className="flex flex-wrap gap-x-10 gap-y-6">
                  <div className="space-y-3">
                    <p className="font-medium text-[9px] uppercase tracking-[0.24em] text-buzzr-ink-80">
                      Product
                    </p>
                    <ul className="space-y-2 text-xs">
                      <li>
                        <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="text-mutedForeground transition-colors hover:text-foreground">
                          Get the App
                        </a>
                      </li>
                      <li>
                        <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="text-mutedForeground transition-colors hover:text-foreground">
                          Docs
                        </a>
                      </li>
                      <li>
                        <Link href="/blog" className="text-mutedForeground transition-colors hover:text-foreground">
                          Blog
                        </Link>
                      </li>
                      <li>
                        <Link href="/support" className="text-mutedForeground transition-colors hover:text-foreground">
                          Support
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <p className="font-medium text-[9px] uppercase tracking-[0.24em] text-buzzr-ink-80">
                      Legal
                    </p>
                    <ul className="space-y-2 text-xs">
                      <li><Link href="/privacy" className="text-mutedForeground transition-colors hover:text-foreground">Privacy</Link></li>
                      <li><Link href="/terms" className="text-mutedForeground transition-colors hover:text-foreground">Terms</Link></li>
                      <li><Link href="/delete-account" className="text-mutedForeground transition-colors hover:text-foreground">Delete Account</Link></li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <p className="font-medium text-[9px] uppercase tracking-[0.24em] text-buzzr-ink-80">
                      Social
                    </p>
                    <ul className="space-y-2 text-xs">
                      <li><a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="text-mutedForeground transition-colors hover:text-foreground">Discord</a></li>
                      <li><a href={TWITTER_URL} target="_blank" rel="noopener noreferrer" className="text-mutedForeground transition-colors hover:text-foreground">X / Twitter</a></li>
                      <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-mutedForeground transition-colors hover:text-foreground">Instagram</a></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="divider-hairline mb-5" aria-hidden />
              <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-buzzr-ink-80">
                <span>© {new Date().getFullYear()} Humyn LLC. All rights reserved.</span>
                <p className="max-w-sm text-left sm:text-right">{BUZZR_TV_DISCLAIMER}</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
