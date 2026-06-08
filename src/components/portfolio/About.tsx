import { Button } from "@/components/ui/Button";
import { SectionHeader } from "./SectionHeader";
import { useReveal } from "@/hooks/useReveal";

interface Stat {
  value: string;
  label: string;
}

interface AboutProps {
  photo: string;
  fallbackPhoto: string;
  bio: string[];
  stats: Stat[];
}

export function About({ photo, fallbackPhoto, bio, stats }: AboutProps) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="01"
          eyebrow="About"
          title="Reliability-minded engineer, growing into AI."
        />

        <div
          ref={ref}
          className="reveal grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16"
        >
          {/* Portrait */}
          <div className="relative mx-auto w-full max-w-xs md:max-w-none">
            <div className="overflow-hidden rounded-2xl border border-border">
              <img
                src={photo}
                onError={(e) => {
                  e.currentTarget.src = fallbackPhoto;
                }}
                alt="Arif Eko Pramono"
                className="aspect-[3/4] w-full object-cover object-top grayscale transition-all duration-500 hover:grayscale-0"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 -z-10 h-24 w-24 rounded-2xl border border-accent/40" />
          </div>

          {/* Bio + stats */}
          <div>
            <div className="space-y-4 text-[15px] leading-relaxed text-muted md:text-base">
              {bio.map((paragraph, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-text md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs leading-snug text-faint">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <Button
              className="mt-10"
              onClick={() => document.getElementById("contact")?.scrollIntoView()}
            >
              Let's Talk
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
