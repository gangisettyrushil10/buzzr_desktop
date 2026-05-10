export default function Loading() {
  return (
    <section
      aria-busy="true"
      aria-live="polite"
      className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-6 pt-32 pb-24 md:pt-40"
    >
      <span className="sr-only">Loading…</span>
      <div className="h-3 w-24 animate-pulse bg-surface" />
      <div className="h-14 w-[min(80%,560px)] animate-pulse bg-surface" />
      <div className="h-14 w-[min(60%,420px)] animate-pulse bg-surface" />
      <div className="mt-4 h-6 w-[min(70%,520px)] animate-pulse bg-surface" />
      <div className="h-6 w-[min(55%,420px)] animate-pulse bg-surface" />
      <div className="mt-6 flex flex-wrap gap-3">
        <div className="h-10 w-32 animate-pulse rounded-full bg-surface" />
        <div className="h-10 w-32 animate-pulse rounded-full bg-surface" />
      </div>
    </section>
  );
}
