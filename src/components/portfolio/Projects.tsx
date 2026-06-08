import { Card, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ArrowUpRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { Project } from "@/types";
import { SectionHeader } from "./SectionHeader";
import { useReveal } from "@/hooks/useReveal";

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="projects" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="02"
          eyebrow="Work"
          title="Projects"
          description="A selection of things I've built and shipped."
        />

        <div ref={ref} className="reveal grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const Icon = ((LucideIcons as unknown) as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[project.icon] || LucideIcons.Circle;
            return (
              <Card
                key={project.name}
                className="group flex flex-col transition-transform hover:-translate-y-1 hover:border-accent"
              >
                <div className="mb-4 flex h-36 items-center justify-center rounded-lg bg-gradient-to-br from-surface to-card">
                  <Icon size={48} className="text-accent/80" />
                </div>
                <CardTitle className="text-base">{project.name}</CardTitle>
                <p className="mb-4 flex-1 text-sm text-muted">{project.description}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="accent">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-4 text-sm font-medium">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-accent hover:underline"
                    >
                      Live Demo <ArrowUpRight size={14} />
                    </a>
                  )}
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-accent hover:underline"
                  >
                    Source Code <ArrowUpRight size={14} />
                  </a>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
