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
    <section id="skills" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="03"
          eyebrow="Toolbox"
          title="Skills"
          description="Tools and technologies I work with day to day."
        />

        <div ref={ref} className="reveal grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {skills.map((skill) => {
            const Icon = ((LucideIcons as unknown) as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[skill.icon] || LucideIcons.Circle;
            return (
              <Card
                key={skill.name}
                className="flex flex-col items-center justify-center gap-2 py-5 text-center transition-colors hover:border-accent"
              >
                <Icon size={24} className="text-accent" />
                <span className="text-sm font-semibold">{skill.name}</span>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
