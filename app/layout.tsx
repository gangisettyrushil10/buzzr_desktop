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
        <div className="relative flex min-h-screen flex-col">
          {/* Subtle noise grain */}
          <div
            className="pointer-events-none fixed inset-0 opacity-[0.03] z-50 mix-blend-overlay"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }}
            aria-hidden="true"
          />
          <SiteBackground />

          <div className="relative z-10 flex min-h-screen flex-col w-full">

            {/* ── Header ── */}
            <header className="sticky top-0 z-40 border-b border-white/[0.06] backdrop-blur-2xl bg-black/60">
              <div className="mx-auto flex w-[90%] max-w-[1400px] items-center justify-between py-4">
                <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-75" aria-label="Buzzr home">
                  <img
                    src="/BuzzrLogo.PNG"
                    alt="Buzzr"
                    width="32"
                    height="32"
                    className="shrink-0"
                  />
                  <div className="flex flex-col gap-px">
                    <span className="font-heading text-[1.1rem] lowercase leading-none text-foreground tracking-tight">
                      buzzr<span className="text-buzzr-accent">.</span>
                    </span>
                    <span className="hidden sm:block text-[8px] font-sans uppercase tracking-[0.35em] text-white/25 leading-none">
                      Rate the game.
                    </span>
                  </div>
                  <span className="badge-live hidden sm:inline-flex items-center px-2 py-0.5 text-[9px] font-sans font-semibold tracking-widest uppercase">
                    Beta
                  </span>
                </Link>

                <nav aria-label="Primary">
                  <ul className="flex items-center gap-0.5 text-[11px] text-white/40">
                    <li>
                      <Link href="/support" className="px-3 py-2 transition-colors hover:text-white rounded-md hover:bg-white/[0.06]">
                        Support
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy" className="px-3 py-2 transition-colors hover:text-white rounded-md hover:bg-white/[0.06]">
                        Privacy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={BETA_TALLY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 inline-flex items-center border border-buzzr-accent/50 bg-buzzr-accent/10 px-4 py-2 text-buzzr-accent transition-all hover:bg-buzzr-accent/20 hover:border-buzzr-accent text-[11px] font-medium tracking-wide"
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
            <footer className="border-t border-white/[0.06] text-xs text-mutedForeground">
              <div className="mx-auto w-[90%] max-w-[1400px] py-10">
                <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <img src="/BuzzrLogo.PNG" alt="Buzzr" width="24" height="24" className="shrink-0 opacity-80" />
                      <span className="font-heading text-base lowercase leading-none text-foreground">
                        buzzr<span className="text-buzzr-accent">.</span>
                      </span>
                    </div>
                    <p className="text-[10px] font-sans uppercase tracking-[0.35em] text-white/20">
                      Rate the game.
                    </p>
                    <p className="text-[11px] font-sans text-white/35 max-w-[200px] leading-relaxed">
                      Rate sports games by entertainment, not just the score. Built by Humyn LLC.
                    </p>
                    <p className="text-[10px] font-sans text-white/20 tracking-wide">
                      @the_real_buzzr
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-x-10 gap-y-5 text-[11px] font-sans">
                    <div className="space-y-2.5">
                      <p className="uppercase tracking-[0.3em] text-[9px] text-white/25">Product</p>
                      <ul className="space-y-2">
                        <li><a href={BETA_TALLY_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white text-white/45">Join Beta</a></li>
                        <li><Link href="/support" className="transition-colors hover:text-white text-white/45">Support</Link></li>
                      </ul>
                    </div>
                    <div className="space-y-2.5">
                      <p className="uppercase tracking-[0.3em] text-[9px] text-white/25">Legal</p>
                      <ul className="space-y-2">
                        <li><Link href="/privacy" className="transition-colors hover:text-white text-white/45">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="transition-colors hover:text-white text-white/45">Terms of Use</Link></li>
                        <li><Link href="/delete-account" className="transition-colors hover:text-white text-white/45">Delete Account</Link></li>
                      </ul>
                    </div>
                    <div className="space-y-2.5">
                      <p className="uppercase tracking-[0.3em] text-[9px] text-white/25">Social</p>
                      <ul className="space-y-2">
                        <li><a href={TWITTER_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white text-white/45">X / Twitter</a></li>
                        <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white text-white/45">Instagram</a></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="divider-gradient mb-5" aria-hidden />
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-white/25">
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
