import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ArrowUpRight, X } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./SectionHeader";
import { stagger, fadeUp, VIEWPORT, EASE } from "@/lib/motion";

interface ProjectsProps {
  projects: Project[];
}

type IconComp = React.ComponentType<{ size?: number; className?: string }>;
const iconFor = (name: string): IconComp =>
  ((LucideIcons as unknown) as Record<string, IconComp>)[name] || LucideIcons.Circle;

/** Shared-element id: featured card ↔ grid card ↔ detail modal. */
const layoutIdFor = (project: Project) => `project-${project.name}`;

const layoutTransition = { layout: { duration: 0.45, ease: EASE } };

function ProjectLinks({ project, size = "sm" }: { project: Project; size?: "sm" | "md" }) {
  return (
    <div className={cn("flex gap-4 font-medium", size === "sm" ? "text-sm" : "text-base")}>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-accent hover:underline"
        >
          Live Demo <ArrowUpRight size={14} />
        </a>
      )}
      <a
        href={project.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-1 text-accent hover:underline"
      >
        Source Code <ArrowUpRight size={14} />
      </a>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "springy relative rounded-full border px-3.5 py-1.5 text-sm font-medium",
        active
          ? "border-transparent text-on-accent"
          : "border-border bg-card/60 text-muted hover:text-text"
      )}
    >
      {active && (
        <motion.span
          layoutId="project-filter-pill"
          transition={{ duration: 0.35, ease: EASE }}
          className="absolute inset-0 -z-10 rounded-full bg-accent"
        />
      )}
      {children}
    </button>
  );
}

const interactiveCardProps = (onOpen: () => void) => ({
  role: "button" as const,
  tabIndex: 0,
  onClick: onOpen,
  onKeyDown: (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  },
});

function FeaturedCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const Icon = iconFor(project.icon);
  return (
    <motion.div
      layout
      layoutId={layoutIdFor(project)}
      transition={layoutTransition}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      whileHover={{ y: -3 }}
      style={{ borderRadius: 12 }}
      {...interactiveCardProps(onOpen)}
      className="group mb-6 grid cursor-pointer gap-6 overflow-hidden border border-border bg-card shadow-soft transition-shadow hover:shadow-lift md:grid-cols-[1fr_1.1fr]"
    >
      <div className="relative flex min-h-[200px] items-center justify-center bg-gradient-to-br from-accent/15 via-accent-soft/10 to-transparent p-8">
        <Icon size={72} className="text-accent" />
        <span className="absolute left-4 top-4 rounded-full bg-card/80 px-3 py-1 text-xs font-semibold text-accent backdrop-blur-sm">
          Featured
        </span>
      </div>
      <div className="flex flex-col p-6 md:py-8 md:pr-8">
        <CardTitle className="text-xl">{project.name}</CardTitle>
        <p className="mb-4 flex-1 text-sm text-muted md:text-base">{project.description}</p>
        <div className="mb-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="accent">
              {tag}
            </Badge>
          ))}
        </div>
        <ProjectLinks project={project} />
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const Icon = iconFor(project.icon);
  return (
    <motion.div
      layout
      layoutId={layoutIdFor(project)}
      transition={layoutTransition}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -4 }}
      style={{ borderRadius: 12 }}
      {...interactiveCardProps(onOpen)}
      className="group flex cursor-pointer flex-col overflow-hidden border border-border bg-card shadow-soft transition-shadow hover:shadow-lift"
    >
      <div className="flex h-36 items-center justify-center border-b border-border bg-gradient-to-br from-accent/10 to-transparent">
        <Icon size={44} className="text-accent" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <CardTitle className="text-base">{project.name}</CardTitle>
        <p className="mb-4 flex-1 text-sm text-muted">{project.description}</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="accent">
              {tag}
            </Badge>
          ))}
        </div>
        <ProjectLinks project={project} />
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const Icon = iconFor(project.icon);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
      />
      <div className="pointer-events-none fixed inset-0 z-[70] overflow-y-auto p-4 sm:p-8">
        <motion.div
          layoutId={layoutIdFor(project)}
          transition={layoutTransition}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          style={{ borderRadius: 16 }}
          role="dialog"
          aria-modal="true"
          aria-label={project.name}
          className="pointer-events-auto relative mx-auto my-8 w-full max-w-2xl overflow-hidden border border-border bg-card shadow-lift"
        >
          <div className="relative flex min-h-[180px] items-center justify-center bg-gradient-to-br from-accent/15 via-accent-soft/10 to-transparent p-8">
            <Icon size={80} className="text-accent" />
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close project details"
              className="springy absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/80 text-muted backdrop-blur-sm hover:text-text"
            >
              <X size={18} />
            </button>
          </div>
          <div className="p-6 md:p-8">
            <CardTitle className="text-2xl">{project.name}</CardTitle>
            <p className="mb-5 text-[15px] leading-relaxed text-muted md:text-base">
              {project.description}
            </p>
            <div className="mb-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="accent">
                  {tag}
                </Badge>
              ))}
            </div>
            <ProjectLinks project={project} size="md" />
          </div>
        </motion.div>
      </div>
    </>
  );
}

export function Projects({ projects }: ProjectsProps) {
  const [filter, setFilter] = useState<string | null>(null);
  const [selected, setSelected] = useState<Project | null>(null);

  // Offer only tags that appear on 2+ projects, most common first.
  const filterTags = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((p) => p.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
    return [...counts.entries()]
      .filter(([, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tag]) => tag);
  }, [projects]);

  const [featured, ...rest] = projects;
  const showFeatured = filter === null;
  const gridProjects = filter ? projects.filter((p) => p.tags.includes(filter)) : rest;

  return (
    <section id="projects" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="03"
          eyebrow="Work"
          title="Projects"
          description="A selection of things I've built and shipped. Click a card for details."
        />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {/* Tag filter */}
          {filterTags.length > 0 && (
            <motion.div variants={fadeUp} className="mb-8 flex flex-wrap gap-2">
              <FilterChip active={filter === null} onClick={() => setFilter(null)}>
                All
              </FilterChip>
              {filterTags.map((tag) => (
                <FilterChip
                  key={tag}
                  active={filter === tag}
                  onClick={() => setFilter(filter === tag ? null : tag)}
                >
                  {tag}
                </FilterChip>
              ))}
            </motion.div>
          )}

          <motion.div variants={fadeUp} className="relative">
            {/* Featured project (All view only; morphs into the grid when filtering) */}
            <AnimatePresence mode="popLayout" initial={false}>
              {showFeatured && (
                <FeaturedCard
                  key={layoutIdFor(featured)}
                  project={featured}
                  onOpen={() => setSelected(featured)}
                />
              )}
            </AnimatePresence>

            {/* Grid (reflows with layout animation on filter) */}
            <motion.div layout className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {gridProjects.map((project) => (
                  <ProjectCard
                    key={layoutIdFor(project)}
                    project={project}
                    onOpen={() => setSelected(project)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Detail modal (shared-element morph from the card) */}
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
