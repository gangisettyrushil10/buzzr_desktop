'use client';

import { motion } from 'framer-motion';

/**
 * One cinematic arc behind the hero. An emerald swoosh path draws itself in,
 * holds, fades, pauses, repeats on an 8-second cycle. Two path layers: a wide
 * blurred glow for aura, a crisp gradient stroke on top for definition.
 *
 * Non-interactive. Sits behind the hero content via z-index on the parent.
 * This is the ONLY ambient motion in the hero — no competing layers.
 */

const ARC_PATH = 'M -80 460 Q 380 40 1280 240';
const ARC_CYCLE_S = 8;
// keyframe times (fractions of ARC_CYCLE_S):
//   0.00  invisible, zero length
//   0.38  fully drawn (≈3s draw-in)
//   0.60  still held, full opacity
//   0.78  faded out
//   1.00  held invisible (pause before next cycle)
const TIMES = [0, 0.38, 0.6, 0.78, 1];

export function HeroSwoosh() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <svg
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <defs>
          <linearGradient id="heroArcGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="rgb(0, 230, 118)" stopOpacity="0" />
            <stop offset="35%"  stopColor="rgb(0, 230, 118)" stopOpacity="0.9" />
            <stop offset="70%"  stopColor="rgb(110, 231, 183)" stopOpacity="1" />
            <stop offset="100%" stopColor="rgb(110, 231, 183)" stopOpacity="0" />
          </linearGradient>
          <filter id="heroArcGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        {/* Wide soft glow layer — carries the aura */}
        <motion.path
          d={ARC_PATH}
          stroke="rgb(0, 230, 118)"
          strokeWidth={28}
          strokeLinecap="round"
          strokeOpacity={0.35}
          filter="url(#heroArcGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1, 1, 1],
            opacity:    [0, 1, 1, 0, 0]
          }}
          transition={{
            duration: ARC_CYCLE_S,
            times: TIMES,
            repeat: Infinity,
            ease: [0.22, 1, 0.36, 1]
          }}
        />

        {/* Crisp gradient stroke — the definition */}
        <motion.path
          d={ARC_PATH}
          stroke="url(#heroArcGrad)"
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1, 1, 1],
            opacity:    [0, 1, 1, 0, 0]
          }}
          transition={{
            duration: ARC_CYCLE_S,
            times: TIMES,
            repeat: Infinity,
            ease: [0.22, 1, 0.36, 1]
          }}
        />
      </svg>
    </div>
  );
}
