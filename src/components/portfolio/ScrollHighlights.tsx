import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

interface ScrollHighlightsProps {
  items: string[];
}

/**
 * Scroll-driven storytelling: a tall scroll runway with a sticky panel that
 * steps through one highlight at a time as the reader scrolls, with a
 * progress rail and step dots. Render only on viewports/users where pinned
 * sections make sense (the caller gates md+ / reduced-motion and falls back
 * to a static list).
 */
export function ScrollHighlights({ items }: ScrollHighlightsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.5", "end 0.85"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.max(0, Math.min(items.length - 1, Math.floor(v * items.length)));
    setIndex(next);
  });

  return (
    <div ref={ref} className="relative" style={{ height: `${items.length * 42}vh` }}>
      <div className="sticky top-[24vh]">
        {/* Progress rail */}
        <motion.div
          aria-hidden
          style={{ scaleX: scrollYProgress }}
          className="h-0.5 origin-left rounded bg-accent/70"
        />

        <div className="section-index mt-5 text-xs font-medium text-accent">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </div>

        {/* One highlight at a time (sr users get the full list below) */}
        <div aria-hidden className="relative mt-3 min-h-[9.5rem]">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="text-base leading-relaxed text-text md:text-lg"
            >
              {items[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Step dots */}
        <div aria-hidden className="mt-4 flex gap-1.5">
          {items.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                i === index ? "w-6 bg-accent" : "w-2.5 bg-border"
              )}
            />
          ))}
        </div>

        {/* Static copy for assistive tech (the carousel is visual sugar) */}
        <ul className="sr-only">
          {items.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
