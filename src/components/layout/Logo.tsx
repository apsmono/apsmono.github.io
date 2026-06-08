interface LogoProps {
  size?: number;
  className?: string;
}

/** Compact "A" monogram mark — uses the active accent via currentColor stops. */
export function Logo({ size = 28, className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="apsmono logo"
    >
      <rect width="64" height="64" rx="16" className="fill-accent" />
      <path
        d="M18 44 L26 20 h6 l8 24 h-6.2 l-1.5-4.8h-7.6L21.2 44 H18Z M24.7 34.2h4.6L27 26.6 24.7 34.2Z"
        className="fill-on-accent"
      />
      <circle cx="44" cy="40" r="4" className="fill-on-accent" />
    </svg>
  );
}
