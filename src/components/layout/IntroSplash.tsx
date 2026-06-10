import { useEffect, useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const SEEN_KEY = "aps-intro-seen";

function shouldShow() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (sessionStorage.getItem(SEEN_KEY)) return false;
    return true;
  } catch {
    return false; // storage unavailable (private mode) → skip the splash
  }
}

/**
 * First-visit signature moment: the brand "a" mark draws itself on over the
 * page background, then fades out to reveal the hero. Gated to once per
 * session and skipped entirely under prefers-reduced-motion. While visible,
 * the `intro-hold` class pauses the hero entrance so it plays on reveal.
 */
export function IntroSplash() {
  const [show, setShow] = useState(shouldShow);

  // Pause the hero entrance before first paint.
  useLayoutEffect(() => {
    if (show) document.documentElement.classList.add("intro-hold");
  }, [show]);

  useEffect(() => {
    if (!show) return;
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* best effort */
    }
    const t = window.setTimeout(() => {
      document.documentElement.classList.remove("intro-hold");
      setShow(false);
    }, 1050);
    return () => {
      window.clearTimeout(t);
      document.documentElement.classList.remove("intro-hold");
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeOut" } }}
          className="fixed inset-0 z-[100] grid place-items-center bg-bg"
        >
          <svg
            viewBox="24 24 112 112"
            width={88}
            height={88}
            className="text-text"
            role="img"
            aria-label="aps logo"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth={15}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.circle
                cx={80}
                cy={80}
                r={40}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
              <motion.line
                x1={120}
                y1={40}
                x2={120}
                y2={120}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.35, delay: 0.35, ease: "easeOut" }}
              />
            </g>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
