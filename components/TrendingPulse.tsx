'use client';

import { useEffect, useMemo, useState } from 'react';
import type { TrendingSnapshot } from '@/src/lib/trending';

type FetchState = {
  status: 'loading' | 'ready' | 'error';
  data: TrendingSnapshot | null;
};

const REFRESH_INTERVAL_MS = 30000;

function formatCount(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

export function TrendingPulse() {
  const [state, setState] = useState<FetchState>({ status: 'loading', data: null });

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const response = await fetch('/api/trending', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Failed to fetch trending data');
        }

        const payload = (await response.json()) as TrendingSnapshot;
        if (!mounted) return;

        setState({ status: 'ready', data: payload });
      } catch {
        if (!mounted) return;
        setState((prev) => ({
          status: prev.data ? 'ready' : 'error',
          data: prev.data
        }));
      }
    };

    load();
    const interval = window.setInterval(load, REFRESH_INTERVAL_MS);

    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  const updatedLabel = useMemo(() => {
    if (!state.data?.generatedAt) return null;
    const generatedAt = new Date(state.data.generatedAt);
    return generatedAt.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }, [state.data?.generatedAt]);

  return (
    <section aria-label="Live trending games" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="mb-2 text-center text-xs uppercase tracking-[0.3em] text-buzzr-accent/80">
        Live Buzzr pulse
      </h2>
      <p className="mx-auto mb-10 max-w-lg text-center text-sm text-mutedForeground">
        This feed refreshes every 30 seconds with what fans are rating right now.
      </p>

      {state.status === 'error' && !state.data && (
        <div className="mx-auto max-w-2xl rounded-xl border border-border/60 bg-buzzr-surface/25 px-5 py-4 text-sm text-mutedForeground">
          Live feed is temporarily unavailable. Try refreshing in a moment.
        </div>
      )}

      {state.data && (
        <>
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border/60 bg-buzzr-surface/25 px-5 py-4">
              <p className="text-[11px] uppercase tracking-wide text-mutedForeground">Active raters</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">
                {formatCount(state.data.stats.activeRaters)}
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-buzzr-surface/25 px-5 py-4">
              <p className="text-[11px] uppercase tracking-wide text-mutedForeground">Live watch parties</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">
                {formatCount(state.data.stats.liveWatchParties)}
              </p>
            </div>
          </div>

          <ul className="space-y-3">
            {state.data.games.map((game) => (
              <li
                key={game.id}
                className="rounded-xl border border-border/50 bg-buzzr-surface/35 px-4 py-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-mutedForeground">{game.league}</p>
                    <p className="mt-1 text-sm font-medium text-foreground">{game.matchup}</p>
                    <p className="mt-1 text-xs text-mutedForeground">
                      Starts in about {game.startsInMinutes} min
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-buzzr-accent">{game.momentumLabel}</p>
                    <p className="text-sm text-foreground">Buzz score {game.buzzScore}/100</p>
                    <p className="text-xs text-mutedForeground">
                      {formatCount(game.activeWatchers)} fans watching
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-right text-[11px] text-mutedForeground">
            {state.status === 'loading' ? 'Updating…' : `Updated ${updatedLabel ?? 'just now'}`}
          </p>
        </>
      )}
    </section>
  );
}
