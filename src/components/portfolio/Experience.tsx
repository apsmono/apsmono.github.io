import { Briefcase, GraduationCap } from "lucide-react";
import type { Education, Experience as Exp } from "@/types";
import { SectionHeader } from "./SectionHeader";
import { useReveal } from "@/hooks/useReveal";

interface ExperienceProps {
  experience: Exp[];
  education: Education[];
}

export function Experience({ experience, education }: ExperienceProps) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="background" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="02"
          eyebrow="Background"
          title="Experience & education"
          description="Where I've worked and what I've studied."
        />

        <div ref={ref} className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
          {/* Experience timeline */}
          <div>
            <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-accent">
              <Briefcase size={16} />
              Experience
            </div>
            <ol className="relative border-l border-border pl-6">
              {experience.map((job, i) => (
                <li
                  key={i}
                  className="reveal mb-8 last:mb-0"
                  style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                >
                  <span className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full border-2 border-bg bg-accent" />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h3 className="text-base font-semibold text-text">{job.role}</h3>
                    <span className="text-xs text-faint">{job.period}</span>
                  </div>
                  <div className="mt-0.5 text-sm text-muted">
                    {job.company}
                    {job.location ? ` · ${job.location}` : ""}
                  </div>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted">
                    {job.highlights.map((h, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>

          {/* Education */}
          <div>
            <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-accent">
              <GraduationCap size={16} />
              Education
            </div>
            <div className="space-y-4">
              {education.map((ed, i) => (
                <div
                  key={i}
                  className="reveal rounded-xl border border-border bg-card p-5 shadow-soft"
                  style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h3 className="text-base font-semibold text-text">{ed.school}</h3>
                    <span className="text-xs text-faint">{ed.period}</span>
                  </div>
                  <div className="mt-0.5 text-sm font-medium text-accent">{ed.credential}</div>
                  {ed.detail && <p className="mt-2 text-sm text-muted">{ed.detail}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
