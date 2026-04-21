# CourtCanvas v2: Clean Blend, No Footsteps, Sleek Court Aura

## Context (this iteration)

Previous CourtCanvas landed but renders as two prominent raw-stroke 3-point arcs at the viewport bottom plus a muddy horizontal green band stripe — it reads as a diagram drawn on the page, not an ambient aura. User feedback: **"blend cleaner"** and **"remove footsteps, make the swoosh be around the basketball court like a really sleek outline. really plan this aura."**

Goal: the court should feel like emerald neon light glowing from the edges of the arena — you sense the shape more than see the lines. Zero visible hard strokes, zero random dots, zero horizontal bands.

## What's wrong with the current render

Looking at the current CourtCanvas output:
1. **Crisp copy is too loud.** `opacity=0.55, strokeWidth=1` plus `round` caps produces clear emerald arcs that read as schematic lines, not ambient light.
2. **Bloom copy is too tight.** `stdDeviation=8, opacity=0.14` is a halo around each stroke, not a wash — you still perceive "a line plus its glow" rather than "the line IS the glow."
3. **Ambient floor wash creates a visible horizontal band.** A single low radial (`ellipse 60% 55% at 50% 70%`) paints a darkened stripe because its edge lives inside the viewport. The eye reads it as a discrete green bar.
4. **Court has too many lines** (perimeter, half-court, center circles, lanes, FT circles, restricted arcs, rims, backboards, 3pt straights, 3pt arcs, sidelines from earlier). Each extra stroke compounds the "diagram" feel.
5. **Footsteps logic was removed** already — but this plan hardens the contract to keep them gone.

## Target look

Imagine a dark hardwood court, lit from above by a single stadium light. The court outline is visible only because the floor finish faintly reflects the perimeter neon, and the center circle glows a little hotter. No hard pencil edges. If you turned off CSS, the page should just be dark; if you turned on CSS, you should FEEL the court before you SEE it.

## Recommended Approach

### 1. Remove every visible discrete stroke; make the bloom the visual

[components/CourtCanvas.tsx](components/CourtCanvas.tsx) → `CourtOutline`:
- **Bloom copy** (the only layer that should really register):
  - `strokeWidth=8`
  - `opacity=0.28`
  - Filter `<feGaussianBlur stdDeviation="18"/>` (triple the current blur)
  - `mix-blend-mode: screen` on the `<g>` wrapper so the glow ADDS light onto the hardwood rather than sitting opaque on top
- **Crisp copy** (a whisper of edge definition for high-DPI screens):
  - `strokeWidth=0.6`
  - `opacity=0.14`
  - Also `mix-blend-mode: screen`
- Remove: rims, backboards, restricted arcs, free-throw circles. Keep only: **perimeter, half-court line, center circle + inner circle, free-throw lanes (both), 3pt arcs + straights (both)**. That's 10 paths total, enough to imply the court, nothing superfluous.

### 2. Replace the banded "floor wash" with a full-viewport vignette

Delete the current `bottom-0 h-[90vh]` floor-wash div (it creates the horizontal stripe). Replace with a single full-screen vignette:
- `absolute inset-0`
- `background: radial-gradient(ellipse 140% 100% at 50% 100%, rgba(0,230,118,0.10) 0%, rgba(0,230,118,0.03) 35%, transparent 70%)`
- Because the ellipse extends 140% wide and 100% tall, its edge never lands inside the viewport — no visible band. It just fades the bottom 70% of the page toward a warm emerald tint.

### 3. Soften the hardwood grain and darken the base

- Base fill goes from `#070709` → `#060608` (a hair darker to let the neon read warmer against it).
- Hardwood grain opacity `0.018 → 0.012`, keep the 6px repeat. It should be just barely visible texture.

### 4. Add a single overhead "arena light" spotlight

Above the court, add one elliptical highlight (`radial-gradient(ellipse 70% 35% at 50% 0%, rgba(255,255,255,0.035) 0%, transparent 60%)`). This sells "the court is lit" and gives the bloom something to bounce off.

### 5. Keep cursor parallax

Unchanged. The hardwood + court SVG + spotlight all live inside the `parallaxRef` container and drift together toward the cursor at 16px / 10px max.

### 6. Confirm footsteps removed

- `FootstepPrint` component: delete.
- `steps` state + spawner `useEffect`: delete.
- No orphaned imports.

## Critical files

| File | Action |
|---|---|
| [components/CourtCanvas.tsx](components/CourtCanvas.tsx) | Rewrite bloom/crisp/floor-wash/spotlight + trim paths + remove footsteps code |
| [app/globals.css](app/globals.css) | `@keyframes footstep-fade` no longer used — can stay (dead) or be deleted in cleanup |

## Verification

1. `npm run dev` at http://localhost:3000 returns 200.
2. Visual: scroll to hero. The lower half of the viewport should feel like it's dimly emerald-tinted with a soft court outline that you sense more than see. Moving the cursor drifts the whole thing.
3. No horizontal stripe, no bright arcs, no dots.
4. DevTools > Rendering > Emulate `prefers-reduced-motion: reduce`: court is static but still present; no parallax motion.
5. `npx tsc --noEmit` clean.

## Out of scope

- Changing HeroStack, LiveScoreWidget, peek cards — all stay as-is from the prior iteration.
- Adding new animation (no pulsing light, no moving scanlines) — keeping it restrained.

---

# (Prior iteration — kept for reference) Hero Polish: NBA Court Background, Remove Ghost Mesh + Ball Dots, Clean Widget

## Context

User feedback on the current hero:
- **CRITICAL — #1 visible bug:** the `AnimatedMeshBackground` in `HeroStack` renders as an ugly green-tinted rectangle sitting behind the cards. It bleeds below the widget into the empty space under the 2 peek cards. Screenshot confirms: there's a visible dim-green box occupying the bottom half of the hero column with nothing in it. This MUST go first.
- The **dot grid** (`GridCanvas`) background feels generic and "grind-y".
- The **rotating ball-emoji row** in `LiveScoreWidget` looks unserious.
- The user wants the **rating action** front-and-center on the hero widget (not a passive "Buzzr Score" number).
- New background direction: an **NBA-court-style floor** that responds to the cursor (subtle parallax upward toward pointer) with ambient **footstep trails** (players moving around the court).

This plan locks in the exact changes, keeps scope tight to the hero surface, and reuses existing primitives where possible.

## Current-State Notes (from read-only audit)

- [components/GridCanvas.tsx](components/GridCanvas.tsx): full-viewport `fixed inset-0 -z-10` dot-grid canvas. Renders base fill + 24px radial dots + 2 accent glows + noise + top fade. Mounted once in [app/layout.tsx](app/layout.tsx) alongside [components/BrandAura.tsx](components/BrandAura.tsx).
- [components/ui/HeroStack.tsx](components/ui/HeroStack.tsx): front card `LiveScoreWidget`, back-left `TakePeekCard` (rotating hot takes), back-right `BracketPeekCard`. Has `AnimatedMeshBackground` at `-inset-10` that bleeds past the cards as a weird rectangle.
- [components/ui/LiveScoreWidget.tsx](components/ui/LiveScoreWidget.tsx): `BallDot` still rendered in JSX (ball-emoji row between slider and league strip — per last edit I already started removing this but need to confirm fully gone; `BallDot` and `BALL_SET` definitions are stale and removable).
- [components/BrandAura.tsx](components/BrandAura.tsx): emerald top-of-page wash, scrolls-out after 200px — keep unchanged.

## Recommended Approach

### 1. Delete `AnimatedMeshBackground` in HeroStack

Remove it entirely. The page already has `BrandAura` + the new `CourtCanvas` to set mood — the stack shouldn't paint its own rectangle.

**File:** [components/ui/HeroStack.tsx](components/ui/HeroStack.tsx)
- Remove `<AnimatedMeshBackground />` render + the function definition.
- Keep the `relative isolate w-full max-w-[520px]` container.
- Tighten the container (probably `h-[620px]` for desktop) so peek cards don't create wasted vertical gap.

### 2. Replace `GridCanvas` with `CourtCanvas`

**New file:** [components/CourtCanvas.tsx](components/CourtCanvas.tsx) (client component).

Visual composition, bottom-up:
1. **Base fill** `bg-buzzr-ink-5` (unchanged canvas color).
2. **Hardwood grain** — horizontal line SVG pattern at ~3% white on `#0a0a0c`, repeated every ~6px vertically, giving a parquet feel without a color shift.
3. **Court markings** — single full-width SVG at ~4% opacity: center-circle + half-court line + a 3-point arc ghost at bottom. Positioned low in the viewport (center around 100vh from top) so only the top arc peeks into the hero. Uses `rgba(0,230,118,0.05)`.
4. **Cursor parallax** — `mousemove` listener on window, computes `(x - vw/2, y - vh/2)` → translate the hardwood + markings layer by up to 12px (hardwood) and 20px (markings) opposite the cursor. Smoothed with `requestAnimationFrame`. Content moves *upward/toward* the cursor (not away) so the surface feels like you're walking over it.
5. **Footstep trails** — JS-driven. A pool of 6 footstep pairs: each pair is `(leftShoe, rightShoe)` SVG prints (~12×16px ellipses, rotated). Every ~1.8–3s a random pair spawns at a random `(x, y)` in the viewport, fades in over 300ms, stays ~2s, fades out over 800ms. Color: emerald `rgba(0,230,118,0.22)`. Subtle rotation matches a walking direction. Reduced-motion users: no footsteps.
6. **Accent glows** — keep the two existing radial glows from GridCanvas top-right + bottom-left, unchanged.
7. **Noise** — keep the fractal-noise overlay at 2.5% opacity for film grain.
8. **Top fade** — keep the 24px top gradient.

Implementation notes:
- Footstep spawn + parallax state in a single `useEffect` with `rAF` for perf.
- `will-change: transform` on the parallax layer.
- `pointer-events-none` on the whole canvas so cursor still hits content.
- Respect `prefers-reduced-motion`: skip parallax + footsteps, render static pattern only.
- Keep it lightweight — no canvas/WebGL, just CSS transforms + inline SVG + DOM footstep nodes pooled.

**File swap:** [app/layout.tsx](app/layout.tsx) — replace `import { GridCanvas }` with `import { CourtCanvas }` and swap the JSX mount.

**Delete:** [components/GridCanvas.tsx](components/GridCanvas.tsx) after the swap is verified (or leave as a deprecated file and remove in cleanup pass).

### 3. Finish LiveScoreWidget cleanup

**File:** [components/ui/LiveScoreWidget.tsx](components/ui/LiveScoreWidget.tsx)

- **Confirm ball-dot removal** — `BallDot` component definition (`const BALL_SET = [...]`, `function BallDot(...)`) should be deleted entirely; the render call has already been replaced with the rate slider block. Ensure no dead code.
- **Polish rating block**: keep the giant band-colored score number, the 1.5-px animated fill bar with white thumb, and the "1 / drag to rate / 10" caption. This is already scaffolded from the prior edit — just verify it reads cleanly after the ball row is gone.
- **Keep league marquee strip** at the bottom — it's the league-coverage showcase the user explicitly asked for earlier.
- **Widget padding**: `p-5` on the content block stays, but the inner border-top reactions row should read as a single piece with the rating (no hairline if it creates a boxy feel — replace with `mt-4` spacing instead).

### 4. No changes to peek cards

`TakePeekCard` and `BracketPeekCard` already match app patterns (multi-reactions + team color chips / seed numbers + pollen wager). Leave them.

## Critical Files

| File | Action |
|---|---|
| [components/CourtCanvas.tsx](components/CourtCanvas.tsx) | **New** — NBA-court parallax background w/ footsteps |
| [app/layout.tsx](app/layout.tsx) | Swap `<GridCanvas />` → `<CourtCanvas />` |
| [components/GridCanvas.tsx](components/GridCanvas.tsx) | Delete after swap verified |
| [components/ui/HeroStack.tsx](components/ui/HeroStack.tsx) | Remove `AnimatedMeshBackground`, tighten container |
| [components/ui/LiveScoreWidget.tsx](components/ui/LiveScoreWidget.tsx) | Delete `BallDot` + `BALL_SET`, polish spacing |
| [components/BrandAura.tsx](components/BrandAura.tsx) | **Unchanged** — keep as-is |

## Verification

1. `npm run dev` running, home at http://localhost:3000 returns 200.
2. **Hero visual pass**:
   - No dot grid anywhere; background feels like a dark hardwood floor with faint court markings at the bottom.
   - Moving the cursor: parallax layer glides a few pixels opposite-cursor. Smooth, no jank.
   - Footsteps: over ~30 seconds you should see ~8–12 pairs fade in/out at random positions.
   - `prefers-reduced-motion: reduce`: no parallax, no footsteps, static pattern only. Verify via DevTools > Rendering > Emulate CSS media feature.
3. **Widget pass**:
   - No ball-emoji row.
   - No ghost rectangle behind the stack — the 2 peek cards sit on the court background directly.
   - Rate slider fills from 0 to the game's buzz score each time the game rotates (every 4.6s), thumb slides with it.
   - League marquee still scrolls along the bottom of the widget.
4. **Performance** — open DevTools > Performance. Record 5s of idle + cursor move. Should stay above 55 fps with no long tasks > 50ms from footstep churn. If not, reduce footstep pool to 4 and bump spawn interval to 2.5–4s.
5. **Typecheck** — `npx tsc --noEmit` passes with zero new errors.
6. **Production build** — `npx next build` succeeds.

## Out of Scope

- Changing the other sections (SwipeSection, SurfacesGrid, Faq, etc.) — they stay on whatever base the new `CourtCanvas` provides.
- Full rewrite of `LiveScoreWidget` — only the ball-dot removal + spacing polish.
- Redesigning peek cards — they're already app-accurate.
- Adding sound effects (footsteps are visual only).
