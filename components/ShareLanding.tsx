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
  title
}: ShareLandingProps) {
  return (
    <section className="mx-auto flex min-h-[72vh] w-full max-w-[960px] flex-col justify-center px-6 py-16">
      <span className="mb-6 font-mono text-[12px] uppercase tracking-[0.1em] leading-[2] text-muted">
        {badge}
      </span>
      <h1 className="max-w-3xl text-[clamp(36px,5vw,48px)] font-normal leading-[1.11] tracking-[-0.025em] text-foreground">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-[16px] leading-[1.5] tracking-[-0.025em] text-muted md:text-[20px] md:leading-[1.4]">
        {description}
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <a
          href={openUrl}
          className="inline-flex items-center justify-center rounded-full bg-foreground px-3 py-1 text-[14px] tracking-[-0.025em] text-canvas transition-colors hover:bg-foreground/90"
        >
          Open in Buzzr
        </a>
        <a
          href={installUrl}
          className="inline-flex items-center justify-center rounded-full border border-white/25 px-4 py-2 text-[14px] tracking-[-0.025em] text-foreground transition-colors hover:border-white/50"
        >
          Get the app
        </a>
      </div>

      <div className="mt-8 max-w-2xl border border-surface bg-canvas px-4 py-3">
        <span className="font-mono text-[12px] uppercase tracking-[0.1em] leading-[2] text-muted">
          Shared link
        </span>
        <Link
          href={canonical}
          className="mt-1 block break-all text-[14px] leading-[1.43] tracking-[0.1px] text-muted transition-colors hover:text-foreground"
        >
          {canonical}
        </Link>
      </div>
    </section>
  );
}
