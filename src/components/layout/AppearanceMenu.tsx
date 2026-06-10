import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { Sun, Moon, Monitor, Palette as PaletteIcon, Check, ChevronDown } from "lucide-react";
import { useThemeContext } from "./ThemeProvider";
import type { Theme, Palette } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

const modes: { value: Theme; label: string; Icon: typeof Sun }[] = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
];

const palettes: { value: Palette; label: string; dots: [string, string, string] }[] = [
  { value: "current", label: "aps · Paper & ink", dots: ["#16150f", "#2f6bff", "#f5f4ef"] },
  { value: "mono", label: "Monochrome", dots: ["#18181b", "#a1a1aa", "#fafafa"] },
  { value: "image", label: "Coral & teal", dots: ["#4f9aa1", "#c97b6b", "#f3f6f7"] },
  { value: "dev", label: "Indigo & slate", dots: ["#4f46e5", "#6366f1", "#f8fafc"] },
];

/** Pointer position for the theme wipe; keyboard activation (detail 0) → none. */
const wipeOrigin = (e: ReactMouseEvent) =>
  e.detail === 0 ? undefined : { x: e.clientX, y: e.clientY };

export function AppearanceMenu() {
  const { theme, setTheme, palette, setPalette } = useThemeContext();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const activePalette = palettes.find((p) => p.value === palette) ?? palettes[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Appearance settings"
        className="group springy inline-flex items-center rounded-full border border-border bg-card/70 px-2.5 py-1.5 text-sm text-muted shadow-sm backdrop-blur-sm hover:text-text"
      >
        <PaletteIcon size={15} className="shrink-0" />
        <span
          className={cn(
            "overflow-hidden whitespace-nowrap transition-all duration-300",
            open
              ? "ml-1.5 max-w-[10rem] opacity-100"
              : "max-w-0 opacity-0 group-hover:ml-1.5 group-hover:max-w-[10rem] group-hover:opacity-100"
          )}
        >
          {activePalette.label}
        </span>
        <ChevronDown
          size={14}
          className={cn(
            "shrink-0 transition-all duration-300",
            open
              ? "ml-1 max-w-[1rem] rotate-180 opacity-100"
              : "max-w-0 opacity-0 group-hover:ml-1 group-hover:max-w-[1rem] group-hover:opacity-100"
          )}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-60 rounded-2xl border border-border bg-card p-3 shadow-lift"
        >
          <div className="px-1 pb-1 text-xs font-semibold uppercase tracking-wider text-faint">
            Mode
          </div>
          <div className="mb-3 grid grid-cols-3 gap-1 rounded-xl border border-border bg-surface/60 p-1">
            {modes.map(({ value, label, Icon }) => (
              <button
                key={value}
                onClick={(e) => setTheme(value, wipeOrigin(e))}
                aria-pressed={theme === value}
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-colors",
                  theme === value
                    ? "bg-accent text-on-accent"
                    : "text-muted hover:text-text"
                )}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>

          <div className="px-1 pb-1 text-xs font-semibold uppercase tracking-wider text-faint">
            Palette
          </div>
          <div className="flex flex-col gap-0.5">
            {palettes.map((p) => (
              <button
                key={p.value}
                role="menuitemradio"
                aria-checked={palette === p.value}
                onClick={(e) => setPalette(p.value, wipeOrigin(e))}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors",
                  palette === p.value ? "bg-surface text-text" : "text-muted hover:bg-surface/60 hover:text-text"
                )}
              >
                <span className="flex -space-x-1">
                  {p.dots.map((c, i) => (
                    <span
                      key={i}
                      className="h-4 w-4 rounded-full border border-border"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </span>
                <span className="flex-1">{p.label}</span>
                {palette === p.value && <Check size={15} className="text-accent" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
