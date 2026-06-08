import { Button } from "@/components/ui/Button";
import { ArrowDown, MapPin } from "lucide-react";

interface HeroProps {
  name: string;
  roles: string[];
  location: string;
  availability: string;
  photo: string;
  fallbackPhoto: string;
}

export function Hero({
  name,
  roles,
  location,
  availability,
  photo,
  fallbackPhoto,
}: HeroProps) {
  const [first, ...rest] = name.split(" ");

  return (
    <section className="bg-grain relative min-h-screen px-6 pt-28 pb-16 md:pt-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
        {/* Text column */}
        <div className="order-2 md:order-1">
          <span className="eyebrow">Portfolio — apsmono</span>

          <h1 className="mt-5 text-[clamp(2.75rem,8vw,5.5rem)] font-extrabold leading-[0.95] tracking-tight">
            {first}
            <br />
            <span className="bg-gradient-to-r from-text via-text to-accent bg-clip-text text-transparent">
              {rest.join(" ")}
            </span>
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-base text-muted md:text-lg">
            {roles.map((role, i) => (
              <span key={role} className="flex items-center gap-3">
                {i > 0 && <span className="text-faint">/</span>}
                {role}
              </span>
            ))}
          </div>

          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-sm text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            {availability}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={() => document.getElementById("projects")?.scrollIntoView()}
            >
              View My Work
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => document.getElementById("contact")?.scrollIntoView()}
            >
              Get In Touch
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-2 text-sm text-faint">
            <MapPin size={15} />
            {location}
          </div>
        </div>

        {/* Portrait column */}
        <div className="order-1 md:order-2">
          <div className="relative mx-auto max-w-sm md:max-w-none">
            <div className="absolute -inset-3 -z-10 rounded-[1.75rem] bg-gradient-to-tr from-accent/20 via-transparent to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border">
              <img
                src={photo}
                onError={(e) => {
                  e.currentTarget.src = fallbackPhoto;
                }}
                alt={name}
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/55 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-lg border border-border bg-bg/70 px-3 py-1.5 text-xs font-medium text-muted backdrop-blur-sm">
                {location}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => document.getElementById("about")?.scrollIntoView()}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-faint transition-colors hover:text-text"
        aria-label="Scroll to about"
      >
        <ArrowDown className="mx-auto animate-bounce" size={20} />
      </button>
    </section>
  );
}
