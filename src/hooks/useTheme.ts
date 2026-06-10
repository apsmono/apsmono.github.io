import { useState, useEffect, useCallback } from "react";

export type Theme = "dark" | "light" | "system";
export type Palette = "current" | "mono" | "image" | "dev";

/** Viewport coordinates the theme wipe should radiate from (e.g. the toggle). */
export interface TransitionOrigin {
  x: number;
  y: number;
}

const THEME_KEY = "dash-theme";
const PALETTE_KEY = "aps-palette";
const PALETTES: Palette[] = ["current", "mono", "image", "dev"];

function getSystemTheme(): "dark" | "light" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getEffectiveTheme(theme: Theme): "dark" | "light" {
  return theme === "system" ? getSystemTheme() : theme;
}

function applyThemeAttr(t: Theme) {
  const html = document.documentElement;
  if (t === "system") html.removeAttribute("data-theme");
  else html.setAttribute("data-theme", t);
}

interface ViewTransitionLike {
  ready: Promise<void>;
  finished: Promise<void>;
}

/**
 * Wrap a theme/palette DOM mutation in a soft radial wipe (View Transitions
 * API). With an origin, the new theme sweeps out from that point; without one
 * (keyboard activation) it cross-dissolves. Falls back to an instant swap when
 * the API is missing or the user prefers reduced motion — the body's existing
 * color cross-fade still applies there.
 */
function withThemeWipe(mutate: () => void, origin?: TransitionOrigin) {
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => ViewTransitionLike;
  };
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || typeof doc.startViewTransition !== "function") {
    mutate();
    return;
  }

  const html = document.documentElement;
  html.setAttribute("data-vt", origin ? "wipe" : "fade");
  const vt = doc.startViewTransition(mutate);

  if (origin) {
    vt.ready
      .then(() => {
        const { x, y } = origin;
        const r = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );
        html.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${r}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 600,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      .catch(() => {});
  }

  vt.finished.finally(() => html.removeAttribute("data-vt"));
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem(THEME_KEY) as Theme) || "system";
  });
  const [palette, setPaletteState] = useState<Palette>(() => {
    const stored = localStorage.getItem(PALETTE_KEY) as Palette;
    return PALETTES.includes(stored) ? stored : "current";
  });

  useEffect(() => {
    applyThemeAttr(theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-palette", palette);
  }, [palette]);

  // Re-render when the OS theme changes while on "system".
  const [, force] = useState(0);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") force((n) => n + 1);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = useCallback((t: Theme, origin?: TransitionOrigin) => {
    localStorage.setItem(THEME_KEY, t);
    withThemeWipe(() => {
      // Mutate the attribute synchronously so the view transition snapshots
      // the new theme; the effect above re-applies it idempotently.
      applyThemeAttr(t);
      setThemeState(t);
    }, origin);
  }, []);

  const setPalette = useCallback((p: Palette, origin?: TransitionOrigin) => {
    localStorage.setItem(PALETTE_KEY, p);
    withThemeWipe(() => {
      document.documentElement.setAttribute("data-palette", p);
      setPaletteState(p);
    }, origin);
  }, []);

  return {
    theme,
    setTheme,
    palette,
    setPalette,
    effective: getEffectiveTheme(theme),
  };
}
