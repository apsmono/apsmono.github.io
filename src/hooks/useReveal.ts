import { useEffect, useRef } from "react";

/**
 * Adds the `is-visible` class to an element the first time it scrolls into view.
 * Pair with the `.reveal` CSS class for a fade-up animation.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reveal the element itself plus any nested `.reveal` children (stagger).
    const reveal = () => {
      el.classList.add("is-visible");
      el.querySelectorAll(".reveal").forEach((child) => child.classList.add("is-visible"));
    };

    // No observer support → just show the content.
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -5% 0px", ...options }
    );

    observer.observe(el);

    // Safety net: if the element is already on-screen shortly after mount
    // (e.g. after an HMR swap or a reload scrolled mid-page), reveal it even
    // if the observer's initial callback missed it — content must never stay
    // stuck at opacity 0.
    const fallback = window.setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        reveal();
        observer.disconnect();
      }
    }, 600);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [options]);

  return ref;
}
