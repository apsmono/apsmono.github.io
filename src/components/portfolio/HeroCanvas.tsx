import { useEffect, useRef } from "react";

const MAX_PARTICLES = 90;
const LINK_DIST = 110;
const POINTER_RADIUS = 140;

/**
 * Subtle constellation accent for the hero: drifting accent-colored particles
 * linked by faint lines, gently repelled by the pointer.
 *
 * Loaded lazily (own chunk) after the page is idle, so it never affects LCP.
 * The animation pauses when the hero is offscreen or the tab is hidden, and
 * re-reads the accent color whenever the theme/palette changes. The component
 * is only mounted at all for users without prefers-reduced-motion — the
 * static gradient blobs behind it are the fallback.
 */
export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let particles: { x: number; y: number; vx: number; vy: number }[] = [];
    let accent = "#2f6bff";
    let raf = 0;
    let inView = true;
    let pageVisible = !document.hidden;
    const pointer = { x: -9999, y: -9999 };

    const readAccent = () => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-accent")
        .trim();
      if (v) accent = v;
    };

    const seed = () => {
      const count = Math.min(MAX_PARTICLES, Math.max(24, Math.round((w * h) / 16000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const step = () => {
      raf = 0;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        // Gentle pointer repulsion.
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < POINTER_RADIUS * POINTER_RADIUS && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const f = ((POINTER_RADIUS - d) / POINTER_RADIUS) * 0.06;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        // Damp back toward drift speed, integrate, wrap edges.
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      }

      ctx.fillStyle = accent;
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1;

      for (const p of particles) {
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            ctx.globalAlpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.13;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      if (inView && pageVisible) raf = requestAnimationFrame(step);
    };

    const play = () => {
      if (!raf && inView && pageVisible) raf = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      play();
    });
    io.observe(parent);

    const onVisibility = () => {
      pageVisible = !document.hidden;
      play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const mo = new MutationObserver(readAccent);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "data-palette"],
    });

    readAccent();
    resize();
    play();

    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="hero-canvas pointer-events-none absolute inset-0 -z-10"
    />
  );
}
