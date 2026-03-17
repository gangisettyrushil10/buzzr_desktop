import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
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
          {/* Noise texture overlay */}
          <div
            className="pointer-events-none fixed inset-0 opacity-[0.04] z-50 mix-blend-overlay"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }}
            aria-hidden="true"
          />
          <SiteBackground />
          <PremiumGridBackground />
          <FloatingIconsBackground />

          <div className="relative z-10 flex min-h-screen flex-col w-full">

            {/* ── Header ── */}
            <header className="sticky top-0 z-40 border-b border-border/50 backdrop-blur-xl bg-background/70">
              <div className="mx-auto flex w-[90%] max-w-[1400px] items-center justify-between py-3.5">
              <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-85" aria-label="Buzzr home">
                {/* Logo wordmark — "buzzr." lowercase with green dot */}
                <span className="font-heading text-[1.15rem] lowercase leading-none text-foreground">
                  buzzr<span className="text-buzzr-accent">.</span>
                </span>
                {/* Beta badge */}
                <span className="badge-live hidden sm:inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-sans font-medium tracking-wide uppercase">
                  Beta
                </span>
              </Link>

              <nav aria-label="Primary">
                <ul className="flex items-center gap-1 text-[11px] text-mutedForeground">
                  <li>
                    <Link
                      href="/support"
                      className="rounded-md px-3 py-1.5 transition-colors hover:text-foreground hover:bg-buzzr-surface/60"
                    >
                      Support
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="rounded-md px-3 py-1.5 transition-colors hover:text-foreground hover:bg-buzzr-surface/60"
                    >
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={BETA_TALLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 inline-flex items-center rounded-full border border-buzzr-accent/40 bg-buzzr-accent/10 px-3.5 py-1.5 text-buzzr-accent transition-all hover:bg-buzzr-accent/20 hover:border-buzzr-accent/60"
                    >
                      Join Beta
                    </Link>
                  </li>
                </ul>
              </nav>
              </div>
            </header>

            <main className="w-full flex-1">{children}</main>

            {/* ── Footer ── */}
            <footer className="border-t border-border/40 text-xs text-mutedForeground">
              <div className="mx-auto w-[90%] max-w-[1400px] py-8">
                {/* Top row: brand + links */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <span className="font-heading text-lg lowercase leading-none text-foreground">
                      buzzr<span className="text-buzzr-accent">.</span>
                    </span>
                    <p className="text-[10px] font-sans uppercase tracking-widest text-mutedForeground/40">
                      Rate the game.
                    </p>
                    <p className="text-[11px] font-sans text-mutedForeground/60 max-w-[220px] leading-relaxed">
                      Rate sports games by entertainment, not just the score.
                      Built by Humyn LLC.
                    </p>
                    <p className="text-[10px] font-sans text-mutedForeground/35">
                      @the_real_buzzr
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-x-8 gap-y-4 text-[11px] font-sans">
                    <div className="space-y-2">
                      <p className="uppercase tracking-widest text-[10px] text-mutedForeground/50">Product</p>
                      <ul className="space-y-1.5">
                        <li>
                          <a href={BETA_TALLY_URL} target="_blank" rel="noopener noreferrer"
                             className="transition-colors hover:text-foreground">
                            Join Beta
                          </a>
                        </li>
                        <li>
                          <Link href="/support" className="transition-colors hover:text-foreground">
                            Support
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="uppercase tracking-widest text-[10px] text-mutedForeground/50">Legal</p>
                      <ul className="space-y-1.5">
                        <li>
                          <Link href="/privacy" className="transition-colors hover:text-foreground">
                            Privacy Policy
                          </Link>
                        </li>
                        <li>
                          <Link href="/terms" className="transition-colors hover:text-foreground">
                            Terms of Use
                          </Link>
                        </li>
                        <li>
                          <Link href="/delete-account" className="transition-colors hover:text-foreground">
                            Delete Account
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="uppercase tracking-widest text-[10px] text-mutedForeground/50">Social</p>
                      <ul className="space-y-1.5">
                        <li>
                          <a href={TWITTER_URL} target="_blank" rel="noopener noreferrer"
                             className="transition-colors hover:text-foreground">
                            X / Twitter
                          </a>
                        </li>
                        <li>
                          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                             className="transition-colors hover:text-foreground">
                            Instagram
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="uppercase tracking-widest text-[10px] text-mutedForeground/50">About</p>
                      <ul className="space-y-1.5 max-w-[160px]">
                        <li className="text-mutedForeground/60 leading-relaxed">
                          Buzzr is built by Humyn LLC — a small studio making software for sports culture.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Bottom row */}
                <div className="divider-gradient mb-4" aria-hidden />
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-mutedForeground/60">
                  <span>© {new Date().getFullYear()} Humyn LLC. All rights reserved.</span>
                  <p className="max-w-sm text-right">{BUZZR_TV_DISCLAIMER}</p>
                </div>
              </div>
            </footer>

          </div>
        </div>
      </body>
    </html>
  );
}
