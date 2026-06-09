interface LogoProps {
  size?: number;
  className?: string;
}

/**
 * The brand "a" mark — a geometric circle + stem drawn as line-art.
 * Uses currentColor so it inherits the surrounding text color (ink on
 * light, paper/white on dark). Per the brand kit the mark is never
 * tinted with the interface accent.
 */
export function Logo({ size = 28, className }: LogoProps) {
  return (
    <svg
      viewBox="24 24 112 112"
      width={size}
      height={size}
      className={className}
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
        <circle cx="80" cy="80" r="40" />
        <line x1="120" y1="40" x2="120" y2="120" />
      </g>
    </svg>
  );
}
