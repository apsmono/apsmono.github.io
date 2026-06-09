interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeader({ index, eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-12 max-w-2xl">
      <div className="mb-4 flex items-center gap-3">
        <span className="section-index text-sm font-semibold text-accent">{index}</span>
        <span className="h-px w-8 bg-border" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-muted">{description}</p>}
    </div>
  );
}
