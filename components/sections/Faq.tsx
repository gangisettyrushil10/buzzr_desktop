import { FaqAccordion } from '@/components/FaqAccordion';

const FAQS = [
  {
    q: 'What is a Buzzr Score?',
    a: 'A single 1 to 10 rating for every live game. 9 and up is Elite, 7 to 8.9 is Good, 5 to 6.9 is Mid, 3 to 4.9 is Meh, below 3 is Bad. Rate it in seconds, then drop a Hot Take if you want to explain yourself.'
  },
  {
    q: 'Is Buzzr a betting app?',
    a: 'No. Zero spreads, zero sportsbooks, zero affiliate odds. It is entertainment tracking.'
  },
  {
    q: 'Which sports and leagues does it cover?',
    a: 'NBA, WNBA, NCAAM, NFL, MLB, NHL, MLS, EPL, La Liga, Bundesliga, Serie A, Ligue 1, Liga MX, NWSL, UCL, FIFA World Cup, F1, NASCAR, UFC, ATP, WTA, plus League of Legends, Valorant, Counter Strike 2, and Dota 2. Live scores and schedules on all of them.'
  },
  {
    q: 'What is a Watch Party?',
    a: 'A live rate-along with friends. One host, shared chat, shared RSVP, shared ratings. You can run it streaming or in-person, invite by link, and see the Buzzr Score shift together as the game unfolds.'
  },
  {
    q: 'What is the Swarm?',
    a: 'Your community feed. Who just rated what, who joined a hive, who advanced in a bracket, who unlocked a badge. React with fire, open the game, keep scrolling.'
  },
  {
    q: 'What is Pollen?',
    a: 'The in-app points you earn for rating games, posting takes, reacting, and entering brackets. It powers your level, your predictions, and your badges. No paywall, no purchases.'
  },
  {
    q: 'What are the badges?',
    a: 'Called It (you predicted the winner), Nailed It (your rating matched the consensus), Prophet (three picks correct in a row), Crystal Ball (top-tier prediction streak), and more as you play.'
  },
  {
    q: 'How do I get the app?',
    a: 'Buzzr is live on the iOS App Store for iPhone and iPad. Free. Android is on the roadmap.'
  },
  {
    q: 'Can I rate games from the past?',
    a: 'Yes. Search any game in the catalog, log it, rate it, and add it to your history. Last night or 2008 Finals.'
  },
  {
    q: 'How do I delete my account or data?',
    a: 'Settings → Delete account inside the app, or visit buzzr.app/delete-account from any browser. Full data export available on request via support.'
  }
];

export function Faq() {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a
      }
    }))
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative mx-auto w-full max-w-[1200px] px-6 py-28 md:py-36 scroll-mt-24"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <div
        aria-hidden
        className="accent-glow-soft pointer-events-none absolute left-1/2 top-16 h-[320px] w-[520px] -translate-x-1/2 rounded-full opacity-60"
      />
      <header className="relative mx-auto mb-12 max-w-[720px] text-center">
        <h2
          id="faq-title"
          className="font-display text-[clamp(32px,5vw,56px)] font-light leading-[0.98] tracking-[-0.035em] text-foreground"
        >
          Questions.
        </h2>
      </header>

      <div className="mx-auto max-w-[720px]">
        <FaqAccordion items={FAQS} />
      </div>
    </section>
  );
}
