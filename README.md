# apsmono.github.io

My personal portfolio — the public front door at **[apsmono.com](https://apsmono.com)**.

This is the GitHub Pages **user site** (repo name = `apsmono.github.io`), served on the apex
custom domain `apsmono.com` via the `CNAME` file. Built with **Vite + React 19 + TypeScript**
and **Tailwind CSS v4**.

## Surfaces

The portfolio is one of three public-facing surfaces, each on its own origin:

| Surface | URL | Repo |
|---------|-----|------|
| Portfolio (this) | [apsmono.com](https://apsmono.com) | `apsmono.github.io` |
| Command center | [dashboard.apsmono.com](https://dashboard.apsmono.com) | `dashboard` |
| API | `api.apsmono.com` | backend |

The portfolio links out to the dashboard and to project source on GitHub. The dashboard is
auth-gated and intentionally not cross-linked from public pages.

## Structure

```
src/
  config/site.ts          # single source of truth: bio, projects, skills, contacts, links
  components/
    layout/               # Navbar, Footer, ThemeProvider
    portfolio/            # Hero, About, Projects, Skills, Contact, PortfolioPage
    ui/                   # Card, Badge, Button
```

Content is data-driven — edit `src/config/site.ts` to change copy, projects, or links;
components render from it. Navigation is in-page hash anchors (`#about`, `#projects`,
`#skills`, `#contact`); external links (e.g. the dashboard) open in a new tab.

## Run locally

```bash
npm install
npm run dev      # local dev server (http://localhost:5173)
npm run build    # tsc type-check + Vite production build → dist/
npm run preview  # preview the production build
```

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) builds on every push to `master` and
publishes `dist/` to GitHub Pages. The `apsmono.com` custom domain and **Enforce HTTPS**
are configured in repo → Settings → Pages; the apex domain is set via `CNAME`.

---

Maintained by [Arif (@apsmono)](https://github.com/apsmono) · React · React Native · Firebase · growing into AI / agent engineering.
