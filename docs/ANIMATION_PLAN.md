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

## Phase 1 — micro-interactions (low effort, high polish)

- Animated theme/palette switch (a soft radial wipe from the toggle, or a quick
  cross-dissolve) instead of an instant swap.
- Magnetic / springy buttons and nav links on hover (CSS transforms only).
- Animated counters for the About stats (count up when scrolled into view).
- Nav bar: condense + add shadow on scroll; active-section link highlighting via
  IntersectionObserver.
- Cursor-follow glow on the hero blobs (respect reduced-motion + pointer: fine).

Tooling: no new dependencies needed — CSS + small hooks.

## Phase 2 — orchestrated motion (medium effort)

- Adopt a motion library (recommended: **Framer Motion / `motion`**) for declarative
  enter/exit, layout animations, and shared-element transitions.
- Replace the bespoke `useReveal` with `whileInView` variants + stagger containers.
- Project cards: layout animation on filter/sort; modal/expand for case studies.
- Page-level route transitions if/when the site grows beyond one page.

Trade-off: adds ~30–50 KB gzipped. Worth it once there are several animated surfaces;
overkill for the current single page.

## Phase 3 — signature moments (higher effort, do sparingly)

- A hero canvas/WebGL accent (e.g. subtle particle field or gradient mesh that reacts
  to pointer) — lazy-loaded, with a static fallback.
- Scroll-driven storytelling for a featured project (pinned section, progress-linked
  animation) using the native CSS `scroll-timeline` where supported.
- An animated SVG logo draw-on for the first visit.

## Performance & accessibility guardrails

- Keep Largest Contentful Paint unaffected: defer/lazy-load any heavy motion.
- Animate only `transform` and `opacity` (compositor-friendly); avoid layout thrash.
- Honor `prefers-reduced-motion` for every effect (global reset already in place).
- Budget: keep total JS for motion under ~50 KB gzipped until there's clear payoff.

## Recommendation

Phase 0 (done) + Phase 1 give ~80% of the "feels alive and professional" impression
for very little cost and no new dependencies. Pursue Phase 2 only when adding more
pages or interactive project views; reserve Phase 3 for one or two signature moments
so the site stays fast and tasteful.
