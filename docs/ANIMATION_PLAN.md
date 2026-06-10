# Animation Plan — toward an "animated professional" portfolio

This documents what's already shipped (Phase 0) and a staged plan for a richer,
motion-led version to tackle as a dedicated future pass. The guiding rule: motion
should feel *professional and intentional*, never decorative noise. Everything must
degrade gracefully under `prefers-reduced-motion` (already wired globally in
`src/index.css`).

## Phase 0 — shipped now (subtle polish)

- Hero entrance: text and portrait fade up on load (`.hero-in`, staggered 120ms).
- Scroll reveals: sections fade up as they enter the viewport (`useReveal` +
  `.reveal`), now with **staggered children** in Projects, Skills, Contact, and the
  Experience timeline (`--reveal-delay`).
- Smooth hover states: cards lift with a soft accent shadow; skill/contact icons fill
  with the accent on hover.
- Theme/palette transitions: background and text color cross-fade on toggle.

## Phase 1 — micro-interactions ✅ shipped

- **Animated theme/palette switch**: radial wipe from the click point via the View
  Transitions API (`withThemeWipe` in `useTheme`); keyboard activation falls back to
  a cross-dissolve, unsupported browsers / reduced-motion to an instant swap.
- **Springy buttons and nav links**: `.springy` utility (transform + soft press on
  `:active`), applied to `Button`, nav links, and the navbar pills.
- **Animated counters**: `CountUp` component parses stat strings ("~4 yrs") and
  counts the numeric part up on first view; reduced-motion renders final value.
- **Nav bar**: condenses + gains shadow past 24px scroll; active-section link
  highlighting via `useActiveSection` (IntersectionObserver) with a sliding accent
  underline (`.nav-link`).
- **Cursor-follow glow**: `useCursorGlow` in Hero — lerped rAF loop drives a follow
  glow + blob parallax with transforms only; gated on `pointer: fine` and
  reduced-motion.

Tooling: no new dependencies — CSS + small hooks, as planned.

## Phase 2 — orchestrated motion ✅ shipped

- **`motion` adopted** (measured cost: ~38 KB gzipped — within the 30–50 KB budget).
  `MotionConfig reducedMotion="user"` strips transforms for reduced-motion users.
- **`useReveal` replaced** with `whileInView` variants + stagger containers
  (shared variants in `src/lib/motion.ts`; hook and `.reveal` CSS removed).
- **Project tag filter**: chips for tags on 2+ projects, sliding active pill
  (`layoutId`), grid reflow via `layout` + `AnimatePresence mode="popLayout"`.
  The featured card morphs into the grid when a filter is active.
- **Project detail modal**: shared-element morph from card → dialog (`layoutId`),
  with scroll lock, Escape/backdrop close, and focus restore.
- Page-level route transitions: still deferred until the site has multiple pages.

## Phase 3 — signature moments ✅ shipped

- **Hero particle constellation** (`HeroCanvas`): pointer-reactive canvas-2D accent,
  lazy-loaded into its own chunk (~1.2 KB gz) after page load + idle, paused when
  offscreen or tab-hidden, accent-aware across palettes. Static blobs remain the
  reduced-motion/initial fallback — LCP untouched.
- **Scroll-driven story** (`ScrollHighlights`): the GetGoing highlights become a
  pinned, progress-linked step-through (motion `useScroll` for cross-browser support
  instead of CSS `scroll-timeline`). Desktop only; mobile and reduced-motion get the
  static list; full list kept for screen readers.
- **Logo draw-on** (`IntroSplash`): the "a" mark strokes itself in on first visit
  (~1.4s total, once per session via sessionStorage), holding the hero entrance so
  it plays on reveal. Skipped under reduced motion.

## Performance & accessibility guardrails

- Keep Largest Contentful Paint unaffected: defer/lazy-load any heavy motion.
- Animate only `transform` and `opacity` (compositor-friendly); avoid layout thrash.
- Honor `prefers-reduced-motion` for every effect (global reset already in place).
- Budget: keep total JS for motion under ~50 KB gzipped until there's clear payoff.

## Status

All phases shipped (June 2026). Bundle cost of motion work: ~48 KB gzipped over the
Phase 0 baseline (motion library + components), plus a ~1.2 KB lazy chunk for the
hero canvas. Remaining deferred item: page-level route transitions, to revisit
if/when the site grows beyond one page.
