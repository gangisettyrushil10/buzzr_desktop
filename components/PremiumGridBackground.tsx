export function PremiumGridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
      {/* Background radial gradient to give a subtle center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_0%,rgba(7,190,184,0.08),transparent)] z-0" />
      
      {/* 
        Premium SVG Grid / Dot Matrix
        Masked so it fades smoothly into the background edges 
      */}
      <div 
        className="absolute inset-0 z-10 w-full h-[150vh] -top-[25vh]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0z' fill='none'/%3E%3Cpath d='M20 20h2v2h-2v-2z' fill='%2364748b' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundPosition: 'center top',
          maskImage: 'radial-gradient(ellipse at 50% 30%, black 10%, transparent 65%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 10%, transparent 65%)',
        }}
      />
    </div>
  );
}
