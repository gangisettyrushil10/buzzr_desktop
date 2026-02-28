# Buzzr Branding Guide

This file is the source of truth for Buzzr visual and copy branding in this repository.

## 1. Brand Identity
- Product name: `Buzzr`
- Tagline: `Rate sports games by entertainment.`
- Company/legal entity: `Humyn LLC`
- Required disclaimer: `Buzzr is not affiliated with BUZZR TV (Fremantle).`

Implementation source:
- `src/lib/constants.ts`

## 2. Voice and Messaging
Use concise, fan-first language.

Core positioning:
- `Letterboxd for sports`
- Emphasize entertainment, chaos, drama, and watchability over box scores.

Copy style rules:
- Keep copy direct and energetic.
- Avoid legalese in marketing sections.
- Keep legal language confined to `privacy` and `terms` pages.

## 3. Color System

### Accent Palette (brand highlights)
- Primary accent (important UI): `#07beb8`
- Secondary accents: `#3dccc7`, `#68d8d6`, `#9ceaef`, `#c4fff9`

### Main Palette (foundational tones)
- `#e0fbfc`, `#c2dfe3`, `#9db4c0`, `#5c6b73`, `#253237`

### Usage Rules
- Use `#07beb8` (token: `accent`) for important actions/status emphasis:
  - Primary buttons
  - Key links and section labels
  - Active indicators and ring/highlight states
- Use secondary accent tones for ambient effects only (background glows, gradients, mesh/orbs).
- Use main palette for layout surfaces, borders, body text, and contrast structure.

Implementation source:
- `app/globals.css` CSS variables
- `tailwind.config.ts` semantic Tailwind token mapping

## 4. Theme Behavior (Light/Dark)
The app supports light/dark in two ways:
- Default: system preference via `@media (prefers-color-scheme: dark)`
- Optional override: `.light` and `.dark` classes

Key requirement:
- All UI colors should come from semantic tokens (`background`, `foreground`, `muted`, `accent`, `border`, `input`, `ring`, `buzzr.*`), not hardcoded hex in components.

## 5. Typography
- Brand font: `Acworth` (primary heading + sans usage in this repo)
- Supporting font loaded: `Inter`

Implementation source:
- `app/fonts.ts`
- `tailwind.config.ts` (`fontFamily.heading`, `fontFamily.sans`)

## 6. Interaction and Motion
- Hover policy:
  - Hover styles are allowed on clickable elements only.
  - Non-clickable cards/containers must not react on hover.
- Focus styles must remain visible for keyboard accessibility.
- Motion should support hierarchy and atmosphere, not distract from content.

Implementation source:
- `components/ui/button.tsx`
- `app/page.tsx`
- `app/globals.css`

## 7. Asset and Naming Consistency
- Logo/brand references should use `Buzzr` in user-facing copy.
- Metadata titles/descriptions should derive from shared constants where practical.
- URL defaults should use Buzzr domain conventions.

## 8. Branding QA Checklist (Before Merge)
1. Product naming is consistently `Buzzr` in user-facing copy.
2. `Humyn LLC` appears only where legal/operator context is required.
3. Primary CTA and important emphasis use `accent` (`#07beb8`).
4. No hardcoded color literals in app/components (except in token definition comments).
5. Light and dark themes both preserve contrast and brand identity.
6. Non-clickable elements have no hover effects.
7. Footer disclaimer remains present.
