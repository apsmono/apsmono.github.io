import { lazy, Suspense, useEffect, useRef, useState, type RefObject } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowDown, MapPin } from "lucide-react";

// Signature accent: lazy-loaded into its own chunk so it never affects LCP.
const HeroCanvas = lazy(() => import("./HeroCanvas"));

interface HeroProps {
  name: string;
  roles: string[];
  location: string;
  availability: string;
  photo: string;
  fallbackPhoto: string;
}

/**
 * Pointer-follow glow + gentle blob parallax. Mouse-only (pointer: fine),
 * disabled under prefers-reduced-motion, and runs entirely via transforms
 * on a lerped rAF loop — no React re-renders.
 */
function useCursorGlow(
  section: RefObject<HTMLElement | null>,
  glow: RefObject<HTMLDivElement | null>,
  blobA: RefObject<HTMLDivElement | null>,
  blobB: RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    const el = section.current;
    const glowEl = glow.current;
    if (!el || !glowEl) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let w = 1;
    let h = 1;
    let tx = 0, ty = 0; // target (pointer, section coords)
    let gx = 0, gy = 0; // lerped position
    const half = () => glowEl.offsetWidth / 2;

    const tick = () => {
      raf = 0;
      gx += (tx - gx) * 0.14;
      gy += (ty - gy) * 0.14;

      glowEl.style.transform = `translate3d(${gx - half()}px, ${gy - half()}px, 0)`;

      // Blobs drift subtly toward/away from the pointer (parallax).
      const nx = gx / w - 0.5;
      const ny = gy / h - 0.5;
      if (blobA.current)
        blobA.current.style.transform = `translate3d(${nx * 26}px, ${ny * 18}px, 0)`;
      if (blobB.current)
        blobB.current.style.transform = `translate3d(${nx * -32}px, ${ny * -22}px, 0)`;

      if (Math.abs(tx - gx) > 0.5 || Math.abs(ty - gy) > 0.5) {
        raf = requestAnimationFrame(tick);
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      w = r.width;
      h = r.height;
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      schedule();
    };

    const onEnter = (e: PointerEvent) => {
      // Start from the entry point so the glow doesn't streak across.
      const r = el.getBoundingClientRect();
      gx = tx = e.clientX - r.left;
      gy = ty = e.clientY - r.top;
      glowEl.style.opacity = "1";
      schedule();
    };

    const onLeave = () => {
      glowEl.style.opacity = "0";
      // Let the blobs ease back to rest.
      tx = w / 2;
      ty = h / 2;
      schedule();
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [section, glow, blobA, blobB]);
}

export function Hero({
  name,
  roles,
  location,
  availability,
  photo,
  fallbackPhoto,
}: HeroProps) {
  const [first, ...rest] = name.split(" ");

  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const blobARef = useRef<HTMLDivElement>(null);
  const blobBRef = useRef<HTMLDivElement>(null);
  useCursorGlow(sectionRef, glowRef, blobARef, blobBRef);

  // Mount the particle canvas only after the page has loaded and gone idle,
  // and never under prefers-reduced-motion (blobs remain as the static fallback).
  const [particles, setParticles] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let idleId: number | undefined;
    let timerId: number | undefined;
    const fire = () => {
      if (!cancelled) setParticles(true);
    };
    const start = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(fire, { timeout: 2500 });
      } else {
        timerId = window.setTimeout(fire, 400);
      }
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-grain relative min-h-screen overflow-hidden px-6 pt-28 pb-16 md:pt-32"
    >
      {/* Soft cool blobs (drift toward the pointer) */}
      <div
        ref={blobARef}
        aria-hidden
        className="pointer-events-none absolute -left-24 top-24 -z-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
      />
      <div
        ref={blobBRef}
        aria-hidden
        className="pointer-events-none absolute -right-16 top-48 -z-10 h-80 w-80 rounded-full bg-accent-soft/15 blur-3xl"
      />
      {/* Cursor-follow glow (activated for fine pointers only) */}
      <div ref={glowRef} aria-hidden className="hero-glow pointer-events-none -z-10" />
      {/* Particle constellation (lazy, post-load, motion-safe) */}
      {particles && (
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      )}

      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
        {/* Text column */}
        <div className="hero-in order-2 md:order-1">
          <span className="eyebrow">Portfolio — apsmono</span>

          <h1 className="mt-5 text-[clamp(2.75rem,8vw,5.5rem)] font-extrabold leading-[0.95] tracking-tight">
            {first}
            <br />
            <span className="bg-gradient-to-r from-accent to-accent-soft bg-clip-text text-transparent">
              {rest.join(" ")}
            </span>
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-base text-muted md:text-lg">
            {roles.map((role, i) => (
              <span key={role} className="flex items-center gap-3">
                {i > 0 && <span className="text-faint">/</span>}
                {role}
              </span>
            ))}
          </div>

          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-sm text-muted shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            {availability}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={() => document.getElementById("projects")?.scrollIntoView()}
            >
              View My Work
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => document.getElementById("contact")?.scrollIntoView()}
            >
              Get In Touch
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-2 text-sm text-faint">
            <MapPin size={15} />
            {location}
          </div>
        </div>

        {/* Portrait column */}
        <div className="hero-in order-1 md:order-2" style={{ animationDelay: "0.12s" }}>
          <div className="relative mx-auto max-w-sm md:max-w-none">
            <div className="absolute -inset-3 -z-10 rounded-[1.75rem] bg-gradient-to-tr from-accent/25 via-accent-soft/10 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border shadow-soft">
              <img
                src={photo}
                onError={(e) => {
                  e.currentTarget.src = fallbackPhoto;
                }}
                alt={name}
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/15 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-lg border border-border bg-card/80 px-3 py-1.5 text-xs font-medium text-muted backdrop-blur-sm">
                {location}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => document.getElementById("about")?.scrollIntoView()}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-faint transition-colors hover:text-text"
        aria-label="Scroll to about"
      >
        <ArrowDown className="mx-auto animate-bounce" size={20} />
      </button>
    </section>
  );
}
