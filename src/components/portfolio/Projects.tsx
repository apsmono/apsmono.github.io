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

type IconComp = React.ComponentType<{ size?: number; className?: string }>;
const iconFor = (name: string): IconComp =>
  ((LucideIcons as unknown) as Record<string, IconComp>)[name] || LucideIcons.Circle;

function ProjectLinks({ project }: { project: Project }) {
  return (
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
  );
}

export function Projects({ projects }: ProjectsProps) {
  const ref = useReveal<HTMLDivElement>();
  const [featured, ...rest] = projects;
  const FeaturedIcon = iconFor(featured.icon);

  return (
    <section id="projects" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="03"
          eyebrow="Work"
          title="Projects"
          description="A selection of things I've built and shipped."
        />

        <div ref={ref}>
          {/* Featured project */}
          <Card className="reveal group mb-6 grid gap-6 overflow-hidden p-0 transition-shadow hover:shadow-lift md:grid-cols-[1fr_1.1fr]">
            <div className="relative flex min-h-[200px] items-center justify-center bg-gradient-to-br from-accent/15 via-accent-soft/10 to-transparent p-8">
              <FeaturedIcon size={72} className="text-accent" />
              <span className="absolute left-4 top-4 rounded-full bg-card/80 px-3 py-1 text-xs font-semibold text-accent backdrop-blur-sm">
                Featured
              </span>
            </div>
            <div className="flex flex-col p-6 md:py-8 md:pr-8">
              <CardTitle className="text-xl">{featured.name}</CardTitle>
              <p className="mb-4 flex-1 text-sm text-muted md:text-base">
                {featured.description}
              </p>
              <div className="mb-5 flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <Badge key={tag} variant="accent">
                    {tag}
                  </Badge>
                ))}
              </div>
              <ProjectLinks project={featured} />
            </div>
          </Card>

          {/* Rest of the grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((project, i) => {
              const Icon = iconFor(project.icon);
              return (
                <Card
                  key={project.name}
                  style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                  className="reveal group flex flex-col p-0 transition-all hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="flex h-36 items-center justify-center rounded-t-xl border-b border-border bg-gradient-to-br from-accent/10 to-transparent">
                    <Icon size={44} className="text-accent" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <CardTitle className="text-base">{project.name}</CardTitle>
                    <p className="mb-4 flex-1 text-sm text-muted">
                      {project.description}
                    </p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="accent">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <ProjectLinks project={project} />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
