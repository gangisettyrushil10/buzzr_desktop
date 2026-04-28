import Link from 'next/link';

type ShareLandingProps = {
  badge: string;
  title: string;
  description: string;
  canonical: string;
  openUrl: string;
  installUrl: string;
};

export function ShareLanding({
  badge,
  canonical,
  description,
  installUrl,
  openUrl,
  title,
}: ShareLandingProps) {
  return (
    <section className="mx-auto flex min-h-[72vh] w-full max-w-[960px] flex-col justify-center px-6 py-16">
      <div className="mb-6 text-[11px] font-semibold uppercase tracking-[0.26em] text-buzzr-accent">
        {badge}
      </div>
      <h1 className="max-w-3xl font-heading text-4xl font-black leading-tight text-foreground sm:text-6xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-mutedForeground sm:text-lg">
        {description}
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <a
          href={openUrl}
          className="inline-flex min-h-12 items-center justify-center rounded-md bg-buzzr-accent px-6 text-sm font-black uppercase tracking-[0.16em] text-black transition-opacity hover:opacity-90"
        >
          Open in Buzzr
        </a>
        <a
          href={installUrl}
          className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/15 bg-white/[0.05] px-6 text-sm font-black uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-white/[0.08]"
        >
          Get the app
        </a>
      </div>

      <div className="mt-8 max-w-2xl rounded-md border border-white/[0.08] bg-black/20 px-4 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-buzzr-ink-80">
          Shared link
        </p>
        <Link
          href={canonical}
          className="mt-1 block break-all text-sm text-mutedForeground transition-colors hover:text-foreground"
        >
          {canonical}
        </Link>
      </div>
    </section>
  );
}
