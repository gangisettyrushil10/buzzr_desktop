/**
 * CourtCanvas — static emerald arena aura.
 *
 * Dark hardwood floor with a minimal court outline blooming through. Single
 * overhead stadium light lifts the top. Nothing moves, nothing follows the
 * cursor, no arcs — just a quiet backdrop.
 *
 * Layers (bottom → top):
 *  1. Base #060608.
 *  2. Hardwood grain (1.2% white, 6px vertical repeat).
 *  3. Overhead stadium spotlight (top-center, white ellipse).
 *  4. Court outline SVG: bloom pass + whisper crisp pass, both screen-blend.
 *  5. Court halo vignette (tight ellipse at viewport center).
 *  6. Corner accent tints (top-right + bottom-left).
 *  7. Film grain, 2.8%.
 *  8. 24px top fade.
 */
export function CourtCanvas() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* 1. Base */}
      <div className="absolute inset-0 bg-[#060608]" />

      {/* 2. Hardwood grain */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(255,255,255,0.012) 0px,
            rgba(255,255,255,0.012) 1px,
            transparent 1px,
            transparent 6px
          )`
        }}
      />

      {/* 3. Overhead arena spotlight */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 35% at 50% 0%, rgba(255,255,255,0.035) 0%, transparent 60%)'
        }}
      />

      {/* 4. Court outline */}
      <CourtOutline />

      {/* 7. Film grain */}
      <div
        className="absolute inset-0 opacity-[0.028] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: '128px 128px'
        }}
      />

      {/* 8. Top fade */}
      <div
        className="absolute inset-x-0 top-0 h-24"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)' }}
      />
    </div>
  );
}

function CourtOutline() {
  return (
    <svg
      viewBox="0 0 1880 1000"
      preserveAspectRatio="xMidYMid meet"
      className="absolute left-1/2 top-1/2 h-[min(46vh,520px)] w-[min(92vw,1440px)] -translate-x-1/2 -translate-y-1/2"
    >
      <defs>
        <filter id="court-bloom" x="-15%" y="-15%" width="130%" height="130%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      {/* Bloom pass */}
      <g
        fill="none"
        stroke="#00e676"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.28"
        filter="url(#court-bloom)"
        style={{ mixBlendMode: 'screen' }}
      >
        <CourtPaths />
      </g>

      {/* Crisp whisper */}
      <g
        fill="none"
        stroke="#00e676"
        strokeWidth="0.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.14"
        style={{ mixBlendMode: 'screen' }}
      >
        <CourtPaths />
      </g>
    </svg>
  );
}

/**
 * Minimal court geometry — only straight edges and circles. No arcs.
 * Anything that could be misread as a random swoosh is cut.
 */
function CourtPaths() {
  return (
    <>
      {/* Perimeter */}
      <rect x="4" y="4" width="1872" height="992" rx="2" />
      {/* Half-court */}
      <line x1="940" y1="4" x2="940" y2="996" />
      {/* Center circles */}
      <circle cx="940" cy="500" r="120" />
      <circle cx="940" cy="500" r="40" />
      {/* Left lane */}
      <rect x="0" y="310" width="380" height="380" />
      {/* Right lane */}
      <rect x="1500" y="310" width="380" height="380" />
    </>
  );
}
