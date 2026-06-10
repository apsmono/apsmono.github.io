import { useEffect, useRef, useState } from "react";

/** Splits "~4 yrs" into prefix "~", number "4", suffix " yrs". */
const NUM_RE = /^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/;

interface CountUpProps {
  value: string;
  /** Animation length in ms. */
  duration?: number;
  className?: string;
}

/**
 * Renders a stat value, counting its numeric part up from 0 the first time it
 * scrolls into view. Values without digits render as-is. Skips straight to the
 * final value under prefers-reduced-motion or without IntersectionObserver.
 */
export function CountUp({ value, duration = 1400, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(NUM_RE);

  const [display, setDisplay] = useState(() => {
    if (!match) return value;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return reduce || typeof IntersectionObserver === "undefined" ? match[2] : "0";
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = parseFloat(match[2]);
    const decimals = match[2].includes(".") ? match[2].split(".")[1].length : 0;
    let raf = 0;

    const run = () => {
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
        setDisplay((target * eased).toFixed(decimals));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          run();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
    // Parsed from `value`; intentionally run once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {match ? `${match[1]}${display}${match[3]}` : value}
    </span>
  );
}
