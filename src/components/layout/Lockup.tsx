import { useThemeContext } from "./ThemeProvider";

interface LockupProps {
  className?: string;
  alt?: string;
}

/**
 * The official "apsmono" brand lockup (aps mark + "mono" wordmark).
 * Renders the vector artwork from /public, swapping to the white variant
 * in dark mode so it always reverses correctly.
 */
export function Lockup({ className, alt = "apsmono" }: LockupProps) {
  const { effective } = useThemeContext();
  const src = effective === "dark" ? "/aps-lockup-white.svg" : "/aps-lockup.svg";
  return <img src={src} alt={alt} className={className} draggable={false} />;
}
