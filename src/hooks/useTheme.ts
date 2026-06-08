import { useState, useEffect, useCallback } from "react";

export type Theme = "dark" | "light" | "system";
export type Palette = "current" | "mono" | "image" | "dev";

const THEME_KEY = "dash-theme";
const PALETTE_KEY = "aps-palette";
const PALETTES: Palette[] = ["current", "mono", "image", "dev"];

function getSystemTheme(): "dark" | "light" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getEffectiveTheme(theme: Theme): "dark" | "light" {
  return theme === "system" ? getSystemTheme() : theme;
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
    const html = document.documentElement;
    if (theme === "system") {
      html.removeAttribute("data-theme");
    } else {
      html.setAttribute("data-theme", theme);
    }
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

  const setTheme = useCallback((t: Theme) => {
    localStorage.setItem(THEME_KEY, t);
    setThemeState(t);
  }, []);

  const setPalette = useCallback((p: Palette) => {
    localStorage.setItem(PALETTE_KEY, p);
    setPaletteState(p);
  }, []);

  return {
    theme,
    setTheme,
    palette,
    setPalette,
    effective: getEffectiveTheme(theme),
  };
}
