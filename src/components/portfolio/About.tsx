import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { SectionHeader } from "./SectionHeader";
import { stagger, fadeUp, VIEWPORT } from "@/lib/motion";

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
  return (
    <section id="about" className="border-t border-border bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="01"
          eyebrow="About"
          title="Reliability-minded engineer, growing into AI."
        />

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16"
        >
          {/* Portrait */}
          <motion.div variants={fadeUp} className="relative mx-auto w-full max-w-xs md:max-w-none">
            <div className="overflow-hidden rounded-2xl border border-border shadow-soft">
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
          </motion.div>

          {/* Bio + stats */}
          <motion.div variants={fadeUp}>
            <div className="space-y-4 text-[15px] leading-relaxed text-muted md:text-base">
              {bio.map((paragraph, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-semibold text-accent md:text-3xl">
                    <CountUp value={stat.value} />
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
