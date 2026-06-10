import { motion, useReducedMotion } from "motion/react";
import { Briefcase, GraduationCap } from "lucide-react";
import type { Education, Experience as Exp } from "@/types";
import { SectionHeader } from "./SectionHeader";
import { ScrollHighlights } from "./ScrollHighlights";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { stagger, fadeUp, VIEWPORT } from "@/lib/motion";

interface ExperienceProps {
  experience: Exp[];
  education: Education[];
}

export function Experience({ experience, education }: ExperienceProps) {
  // Scroll-driven storytelling for the first role — desktop pointers only;
  // mobile and reduced-motion users get the plain list.
  const reduceMotion = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 768px)");
  const storytelling = desktop && !reduceMotion;

  return (
    <section id="background" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="02"
          eyebrow="Background"
          title="Experience & education"
          description="Where I've worked and what I've studied."
        />

        <motion.div
          variants={stagger(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16"
        >
          {/* Experience timeline */}
          <div>
            <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-accent">
              <Briefcase size={16} />
              Experience
            </div>
            <ol className="relative border-l border-border pl-6">
              {experience.map((job, i) => (
                <motion.li key={i} variants={fadeUp} className="relative mb-8 last:mb-0">
                  <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-bg bg-accent" />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h3 className="text-base font-semibold text-text">{job.role}</h3>
                    <span className="text-xs text-faint">{job.period}</span>
                  </div>
                  <div className="mt-0.5 text-sm text-muted">
                    {job.company}
                    {job.location ? ` · ${job.location}` : ""}
                  </div>
                  {storytelling && i === 0 && job.highlights.length >= 3 ? (
                    <ScrollHighlights items={job.highlights} />
                  ) : (
                    <ul className="mt-3 space-y-1.5 text-sm text-muted">
                      {job.highlights.map((h, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}
            </ol>
          </div>

          {/* Education (pins alongside the story runway on desktop) */}
          <div className="md:sticky md:top-24 md:self-start">
            <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-accent">
              <GraduationCap size={16} />
              Education
            </div>
            <div className="space-y-4">
              {education.map((ed, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="rounded-xl border border-border bg-card p-5 shadow-soft"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h3 className="text-base font-semibold text-text">{ed.school}</h3>
                    <span className="text-xs text-faint">{ed.period}</span>
                  </div>
                  <div className="mt-0.5 text-sm font-medium text-accent">{ed.credential}</div>
                  {ed.detail && <p className="mt-2 text-sm text-muted">{ed.detail}</p>}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
