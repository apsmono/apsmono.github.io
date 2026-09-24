import type { Project } from "@/types";

export const siteConfig = {
  name: "Arif Eko Pramono",
  tagline: "Product Engineer — React · React Native · Firebase · AI agents. Reliability-minded, growing into AI & agent engineering.",
  email: "arifekop@ymail.com",
  avatar: "https://avatars.githubusercontent.com/u/51656350?v=4",
  heroPhoto: "/photos/hero.jpg",
  aboutPhoto: "/photos/about.jpg",
  location: "Blitar, Indonesia",
  availability: "Open to AI & agent engineering work",
  roles: [
    "Product Engineer",
    "React · React Native",
    "Firebase · Node.js",
    "AI & Agent Engineering",
  ],
  stats: [
    { value: "~4 yrs", label: "Building production apps" },
    { value: "3", label: "Platforms shipped (web · iOS · Android)" },
    { value: "1", label: "Two-sided marketplace, end to end" },
  ],
  bio: [
    "I'm a product engineer based in Blitar, Indonesia. For ~4 years I've built and operated a two-sided travel marketplace end to end at GetGoing — the web dashboard, the iOS/Android apps, and the Firebase Cloud Functions backend. I'm at my best making fragile, production-critical systems trustworthy: safe data migrations, hardened publish flows, transactional bug fixes, and data recovery.",
    "Lately I'm growing into AI and agent engineering — building autonomous research agents with CrewAI, with cost guardrails and idempotent scheduled runs. My daily stack is React, React Native, TypeScript, Firebase, and Node.js.",
    "I work best on a small, fast-moving team where I can own a feature end to end — translating a designer's specs into polished UI and standing behind the backend that powers it. What I'm reaching for next is AI and agent engineering: systems that run reliably in production, not just in demos.",
  ],
  education: [
    {
      school: "HTW Berlin",
      credential: "Business Mathematics (Wirtschaftsmathematik)",
      period: "2015 – 2021",
      detail:
        "Hochschule für Technik und Wirtschaft Berlin. Completed full coursework; left before the final thesis (Bachelorarbeit) — transcript available on request. Preceded by Studienkolleg (foundation year), HTW Berlin, 2014.",
    },
    {
      school: "Certifications",
      credential: "Introduction to R · Intermediate R",
      period: "",
    },
  ],
  experience: [
    {
      role: "React Specialist",
      company: "GetGoing (PT Gue Eksplorasi Terus)",
      period: "Sept 2022 – Present",
      location: "Remote",
      highlights: [
        "One of ~4 engineers on a lean product team — own features end to end across the traveler app, the guide app, the marketing site, and the internal Travel Manager dashboard, spanning iOS, Android, and web.",
        "Core feature contributor to the GetGoing traveler app (React Native + Expo + TypeScript, 4.8★ on Google Play) — trip planner, local-guide and package booking, in-app chat, maps, Xendit payments, and a camera scan-itinerary flow.",
        "Hardened the dashboard's most fragile flows: built a pre-publish validator and error modal, migrated live itinerary data shapes (array→object) with server-side backfill, and recovered lost data via lazy migrations — eliminating silent data loss in the publish pipeline.",
        "Contributed to the Firebase Cloud Functions v2 backend (Node 22) — wrote production functions for payments (Xendit), feedback, and AI generation (Gemini / Imagen / Vertex AI), fixed backend bugs, and helped split a Next.js monorepo into a deploy-isolated functions repo across 10 domain codebases.",
        "Fixed transactional integrity bugs in the user wallet (runTransaction race/safety) and built firebase-admin tooling for surgical recovery of corrupted, deeply-nested Firestore records.",
      ],
    },
  ],
  projects: [
    {
      name: "Intel Digest",
      description:
        "Autonomous AI research agent that produces a weekly competitor/market brief and emails it. Engineered like a product: per-run token & tool-call budget guardrails, idempotent scheduled runs, model routing. Working build — not yet launched.",
      tags: ["Python", "CrewAI", "Cloud Run", "Firestore"],
      // sourceUrl omitted: mas-agentic is private — add back once it's public (see github-profile-plan).
      icon: "Newspaper",
      status: "active",
    },
    {
      name: "Solo Leveling",
      description:
        "Central brain & command center for personal development, financial freedom, and connected-tool automation. Integrates with Notion, Google Drive, and Gmail.",
      tags: ["Python", "FastAPI", "Docker", "PostgreSQL"],
      // sourceUrl omitted: solo-leveling is private, and apsmono/projects (the old
      // workspace monorepo) is now private + archived, so any link here 404s for visitors.
      icon: "Brain",
      status: "active",
    },
    {
      name: "Wedding Invitation",
      description:
        "Digital wedding invitation for Amal & Arif — mobile-first, modern minimalist design with countdown timer, RSVP via WhatsApp, and photo gallery.",
      tags: ["Vite", "React 19", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://apsmono.github.io/wedding-invitation/",
      sourceUrl: "https://github.com/apsmono/wedding-invitation",
      icon: "Heart",
      status: "shipped",
    },
    {
      name: "Koperasi KKS",
      description:
        "Landing page for Koperasi Konsumen Karya Tunggal Sejahtera. Static, fast, and ready for Cloudflare Pages deployment.",
      tags: ["HTML5", "CSS3", "JavaScript"],
      sourceUrl: "https://github.com/apsmono/koperasi",
      icon: "Landmark",
      status: "shipped",
    },
    {
      name: "makeICS",
      description:
        "Translate data sources into iCalendar format so you can sync them directly to your phone's calendar. Simple, scriptable, and useful.",
      tags: ["Python", "iCalendar"],
      sourceUrl: "https://github.com/apsmono/makeICS",
      icon: "CalendarDays",
      status: "shipped",
    },
    {
      name: "Scrapers",
      description:
        "Python automation scripts for data collection and processing. Modular scrapers with environment-based config and clean logging.",
      tags: ["Python", "Automation"],
      sourceUrl: "https://github.com/apsmono/scrapers",
      icon: "Bug",
      status: "active",
    },
    {
      name: "Command Center Dashboard",
      description:
        "An authenticated command center (Cmd+K palette, library stats, integration health, job-application tracker on Firestore) built on React 19 + TypeScript with Firebase Auth. Runs on its own subdomain, gated by Google Sign-In.",
      tags: ["React 19", "TypeScript", "Tailwind CSS", "Firebase"],
      liveUrl: "https://dashboard.apsmono.com",
      sourceUrl: "https://github.com/apsmono/dashboard",
      icon: "LayoutDashboard",
      status: "active",
    },
  ] satisfies Project[],
  skills: [
    { name: "React", icon: "Atom" },
    { name: "React Native", icon: "Smartphone" },
    { name: "TypeScript", icon: "FileType" },
    { name: "JavaScript", icon: "Braces" },
    { name: "Firebase", icon: "Flame" },
    { name: "Node.js", icon: "Hexagon" },
    { name: "Cloud Functions", icon: "Cloud" },
    { name: "Tailwind CSS", icon: "Wind" },
    { name: "Vite", icon: "Bolt" },
    { name: "Python", icon: "Code2" },
    { name: "CrewAI", icon: "Bot" },
    { name: "Docker", icon: "Container" },
    { name: "Git", icon: "GitBranch" },
    { name: "Linux", icon: "Terminal" },
    { name: "HTML5", icon: "Code" },
    { name: "Automation", icon: "Cog" },
  ],
  contacts: [
    { label: "Email", value: "arifekop@ymail.com", href: "mailto:arifekop@ymail.com", icon: "Mail" },
    { label: "GitHub", value: "@apsmono", href: "https://github.com/apsmono", icon: "Github" },
    { label: "Instagram", value: "@apsmono", href: "https://instagram.com/apsmono", icon: "Instagram" },
    { label: "Threads", value: "@apsmono", href: "https://threads.net/@apsmono", icon: "AtSign" },
    { label: "Facebook", value: "apsmono", href: "https://facebook.com/apsmono", icon: "Facebook" },
  ],
};
