# Portfolio Roadmap & TODO List

This document tracks upcoming features, improvements, and content enhancements for **[apsmono.com](https://apsmono.com)** (`apsmono.github.io`).

---

## 🎯 High Priority (Immediate Value)

### 1. Project Showcase & Content Sync
- [x] **Add new recent repositories to `siteConfig.projects` in [`src/config/site.ts`](../src/config/site.ts)**:
  - **Sort Visualizer**: Interactive sorting algorithm visualizer with reversible time-travel step controls, time/space complexity analysis, and accessibility annotations.
  - **Online Math & Probability Platform (`course`)**: MDX-driven localized educational platform with interactive practice tests and mathematical problem solvers.
  - **Tower Planner**: Account-synced tracking and planning tool.
- [x] **Audit & update project tags and icons**:
  - Added unified stack tags (`React`, `TypeScript`, `Tailwind CSS`, `Next.js`, `MDX`, `Zustand`, `Vite`, `Algorithms`).
  - Mapped clean Lucide icons (`BarChart3`, `GraduationCap`, `Layers`).
- [x] **Resume PDF link / export**:
  - Verified navbar reader/print view (`ReaderView.tsx` with print styles and `window.print()` CV export).

### 2. Design, Branding & Content Audit
- [ ] **Remove color palette picker in production**:
  - Strip or hide the multi-palette selection menu in the production build so the UI remains focused and uncluttered.
- [ ] **Use `aps Paper & Ink` as the default color in production**:
  - Ensure `aps Paper & Ink` (`#F5F4EF` / `#16150F`, accent `#2F6BFF`) is locked as the primary, default brand palette.
- [ ] **Review color across UI/UX**:
  - Conduct a full audit of contrast, borders, card backgrounds, hover states, and accent highlights across light and dark modes to ensure 100% harmony with the brand tokens.
- [ ] **Audit & update skills list**:
  - Verify and update `siteConfig.skills` in [`src/config/site.ts`](../src/config/site.ts) with current proficiencies (e.g. Next.js, Zustand, Fastify/FastAPI, Vitest, Cloud Functions v2, CrewAI/Agent engineering).

---

## ⚡ Medium Priority (UX & Interactive Polish)

### 3. Micro-Interactions & Usability
- [ ] **Interactive Toast / Quick Copy for Contact**:
  - Add a one-click "Copy Email" button in the Hero / Contact section with a springy toast notification (`"Copied to clipboard!"`).
- [ ] **Project Modal Enhancements**:
  - Add rich preview media (GIF / WebP recording previews or screenshots) in the expanded project detail modal.
  - Add direct links to live demo vs. source code with distinct primary/secondary styling.
- [ ] **Keyboard Navigation (`Cmd+K` Quick Palette)**:
  - Add a global command palette shortcut (`Cmd+K` / `Ctrl+K`) to jump directly to sections, switch palettes/themes, or open project links.

---

## 🔍 Search Engine Optimization & Sharing (SEO & Social)

### 4. Metadata & Rich Results
- [ ] **JSON-LD Structured Data**:
  - Add Schema.org `Person`, `ProfilePage`, and `ItemList` (for software projects) schema in `index.html` or dynamically in `App.tsx`.
- [ ] **Dynamic Open Graph & Twitter Cards**:
  - Create a branded social share preview image (`public/og-image.png`, 1200x630) showcasing name, title, and brand lockup.
  - Verify `og:image`, `og:description`, `twitter:card` tags in `index.html`.
- [ ] **Sitemap & `robots.txt`**:
  - Add `public/robots.txt` and `public/sitemap.xml` pointing to `https://apsmono.com`.

---

## 🤖 AI & Agent Showcase

### 5. Interactive AI & Workflow Demonstrations
- [ ] **CrewAI / Agent Architecture Visualizer**:
  - Add an interactive visual flow diagram or terminal replay widget in the About or Projects section demonstrating autonomous multi-agent research loops, guardrails, and cost tracking.
- [ ] **AI Engineering Case Study**:
  - Create a dedicated write-up / modal highlight on Firebase Cloud Functions v2 + Vertex AI / Gemini integration patterns and transactional data recovery.

---

## 🛠️ Performance, Testing & Quality Assurance

### 6. Automation & Code Quality
- [ ] **Automated Test Suite**:
  - Setup `vitest` + `@testing-library/react` for testing core hooks (`useTheme`, `useActiveSection`, `useMediaQuery`) and UI components (`CountUp`, `AppearanceMenu`).
- [ ] **Lighthouse / Web Vitals CI**:
  - Add a GitHub Action or local script to audit Core Web Vitals (LCP, INP, CLS) and maintain 100/100 performance scores across all theme palettes.
- [ ] **Bundle Size Budget**:
  - Keep production JS bundle under the 50 KB gzip budget with `rollup-plugin-visualizer` to monitor tree-shaking on `motion` and `lucide-react`.

---

## 📝 Changelog & Status Summary

| Phase | Milestone | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Phase 0** | Baseline Polish | ✅ Completed | Static transitions, reveal animations, hover states. |
| **Phase 1** | Micro-interactions | ✅ Completed | Radial theme wipe, springy buttons, CountUp stats, active scroll spy. |
| **Phase 2** | Orchestrated Motion | ✅ Completed | Motion v12 migration, project filter pills, shared-element modal morph. |
| **Phase 3** | Signature Moments | ✅ Completed | Hero particle canvas, pinned scroll story (GetGoing), intro splash draw-on. |
| **Phase 4** | Content Sync & SEO | ⏳ In Planning | Update project catalog, add structured schema, OG image, and test suite. |
