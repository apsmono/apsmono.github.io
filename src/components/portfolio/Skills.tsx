import { Card } from "@/components/ui/Card";
import * as LucideIcons from "lucide-react";
import type { Skill } from "@/types";
import { SectionHeader } from "./SectionHeader";
import { useReveal } from "@/hooks/useReveal";

interface SkillsProps {
  skills: Skill[];
}

export function Skills({ skills }: SkillsProps) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="skills" className="border-t border-border bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="04"
          eyebrow="Toolbox"
          title="Skills"
          description="Tools and technologies I work with day to day."
        />

        <div ref={ref} className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {skills.map((skill, i) => {
            const Icon = ((LucideIcons as unknown) as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[skill.icon] || LucideIcons.Circle;
            return (
              <Card
                key={skill.name}
                style={{ ["--reveal-delay" as string]: `${i * 45}ms` }}
                className="reveal group flex flex-col items-center justify-center gap-2 py-5 text-center transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-lift"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-on-accent">
                  <Icon size={22} />
                </span>
                <span className="text-sm font-semibold">{skill.name}</span>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
