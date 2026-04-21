import { Marquee } from '@/components/Marquee';

const PULSE_ITEMS = [
  { label: '@hoopshead · "I stood up and my chair fell over"' },
  { label: 'OKC 104 · DEN 98 · 4Q 3:11' },
  { label: 'NBA · Playoff seeding: 7 teams within 2 games' },
  { label: '@soccerphil · rated Argentina vs France a 10.0' },
  { label: 'NCAAB · #13 over #4 in OT · Buzzr score 9.8' },
  { label: '@tonymad · "Super Bowl overtime. I forgot to breathe"' },
  { label: 'MLS · CF Montréal vs Inter Miami · Buzzr 8.4' },
  { label: 'FLA 3 · TOR 2 · OT · buzzr LIVE' }
];

export function PulseStrip() {
  return (
    <section aria-label="Live pulse from the Buzzr community" className="relative border-y border-white/[0.06] bg-black/30">
      <div className="mx-auto max-w-[1400px]">
        <Marquee items={PULSE_ITEMS} speed={50} className="h-12" />
      </div>
    </section>
  );
}
