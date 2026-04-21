'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple } from '@fortawesome/free-brands-svg-icons';
import { BrandMark } from '@/components/BrandMark';
import { APP_STORE_URL, DOCS_URL } from '@/src/lib/constants';

type NavItem = { id: string; label: string };

// Section IDs must match the `id` on the corresponding <section> in app/page.tsx:
// SwipeSection, SurfacesGrid, DataBento, LeaguesWall, Faq.
const SECTIONS: NavItem[] = [
  { id: 'swipe',    label: 'Swipe' },
  { id: 'surfaces', label: 'Surfaces' },
  { id: 'data',     label: 'Data' },
  { id: 'leagues',  label: 'Leagues' },
  { id: 'faq',      label: 'FAQ' }
];

const FIRST_SECTION_ID = SECTIONS[0].id;

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [active, setActive] = useState<string>(FIRST_SECTION_ID);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll-spy: track which section is currently in view.
  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        // Trigger when a section crosses the middle of the viewport.
        rootMargin: '-40% 0px -50% 0px',
        threshold: [0, 0.2, 0.5, 1]
      }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, [isHome]);

  // Close mobile menu on route change.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open.
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const handleAnchor = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      if (!isHome) return; // Let Link navigate to /#id
      e.preventDefault();
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${id}`);
      setActive(id);
      setMenuOpen(false);
    },
    [isHome]
  );

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <>
      <header
        className={`fixed left-1/2 top-4 z-40 w-[calc(100%-1.5rem)] -translate-x-1/2 rounded-full border transition-all duration-200 md:w-auto md:max-w-[900px] ${
          scrolled || !isHome
            ? 'border-white/[0.08] bg-black/65 shadow-cool-lg backdrop-blur-2xl'
            : 'border-white/[0.05] bg-black/35 backdrop-blur-xl'
        }`}
      >
        <div className="flex items-center justify-between gap-2 px-3 py-2 sm:gap-4 sm:pl-4 sm:pr-2">
          {/* Logo : on home, jump to top; elsewhere, route home */}
          <Link
            href={isHome ? '#top' : '/'}
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                history.replaceState(null, '', '/');
                setActive(FIRST_SECTION_ID);
              }
            }}
            className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
          >
            <BrandMark
              alt=""
              size={28}
              priority
              className="drop-shadow-[0_0_8px_rgba(0,230,118,0.55)]"
            />
            <span className="font-heading text-[18px] lowercase leading-none text-foreground tracking-tight">
              buzzr<span className="text-buzzr-accent">.</span>
            </span>
          </Link>

          {/* Desktop section nav */}
          <nav aria-label="Sections" className="hidden md:block">
            <ul className="flex items-center gap-0.5 text-xs">
              {SECTIONS.map(({ id, label }) => {
                const isActive = isHome && active === id;
                return (
                  <li key={id}>
                    <Link
                      href={hrefFor(id)}
                      onClick={(e) => handleAnchor(e, id)}
                      aria-current={isActive ? 'location' : undefined}
                      className={`relative inline-flex items-center rounded-full px-3 py-1.5 transition-colors ${
                        isActive
                          ? 'bg-white/[0.06] text-foreground'
                          : 'text-mutedForeground hover:bg-white/[0.04] hover:text-foreground'
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right cluster : CTA + mobile menu */}
          <div className="flex items-center gap-1">
            <Link
              href="/blog"
              className="hidden md:inline-flex rounded-full px-3 py-1.5 text-xs text-mutedForeground transition-colors hover:bg-white/[0.04] hover:text-foreground"
            >
              Blog
            </Link>
            <Link
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 hidden sm:inline-flex items-center gap-1.5 rounded-full bg-buzzr-accent px-4 py-2 text-xs font-semibold text-buzzr-onAccent transition-all hover:shadow-glow-sm active:scale-[0.98]"
            >
              <FontAwesomeIcon icon={faApple} className="h-3.5 w-3.5" aria-hidden />
              Get the App
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-white/[0.05] md:hidden"
            >
              <span className="relative block h-4 w-5">
                <span
                  className={`absolute left-0 top-0 h-[2px] w-full bg-current transition-transform duration-200 ${
                    menuOpen ? 'translate-y-[7px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] h-[2px] w-full bg-current transition-opacity duration-150 ${
                    menuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 bottom-0 h-[2px] w-full bg-current transition-transform duration-200 ${
                    menuOpen ? '-translate-y-[7px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav drawer */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`fixed inset-0 z-30 md:hidden ${menuOpen ? '' : 'pointer-events-none'}`}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-200 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute inset-x-3 top-[84px] rounded-2xl border border-white/[0.08] bg-black/90 backdrop-blur-xl transition-transform duration-200 ${
            menuOpen ? 'translate-y-0' : '-translate-y-4 opacity-0'
          }`}
        >
          <nav aria-label="Sections" className="mx-auto w-full max-w-[1200px] px-6 py-4">
            <ul className="flex flex-col gap-1">
              {SECTIONS.map(({ id, label }) => {
                const isActive = isHome && active === id;
                return (
                  <li key={id}>
                    <Link
                      href={hrefFor(id)}
                      onClick={(e) => handleAnchor(e, id)}
                      className={`flex items-center justify-between rounded-md px-3 py-3 text-sm transition-colors ${
                        isActive
                          ? 'bg-white/[0.04] text-foreground'
                          : 'text-mutedForeground hover:bg-white/[0.03] hover:text-foreground'
                      }`}
                    >
                      <span>{label}</span>
                      {isActive && (
                        <span
                          aria-hidden
                          className="h-1.5 w-1.5 rounded-full bg-buzzr-accent shadow-[0_0_8px_rgba(0,230,118,0.7)]"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="my-3 h-px bg-white/[0.06]" aria-hidden />

            <ul className="flex flex-col gap-1">
              <li>
                <a
                  href={DOCS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md px-3 py-3 text-sm text-mutedForeground transition-colors hover:bg-white/[0.03] hover:text-foreground"
                >
                  Docs
                </a>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="block rounded-md px-3 py-3 text-sm text-mutedForeground transition-colors hover:bg-white/[0.03] hover:text-foreground"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="block rounded-md px-3 py-3 text-sm text-mutedForeground transition-colors hover:bg-white/[0.03] hover:text-foreground"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="block rounded-md px-3 py-3 text-sm text-mutedForeground transition-colors hover:bg-white/[0.03] hover:text-foreground"
                >
                  Privacy
                </Link>
              </li>
            </ul>

            <div className="mt-4">
              <Link
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-buzzr-accent px-4 py-3 text-sm font-semibold text-buzzr-onAccent transition-all hover:shadow-glow-sm active:scale-[0.98]"
              >
                <FontAwesomeIcon icon={faApple} className="h-4 w-4" aria-hidden />
                Get the App
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
