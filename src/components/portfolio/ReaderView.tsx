import { X, Download, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

export function ReaderView({ onExit }: { onExit: () => void }) {
  const c = siteConfig;

  return (
    <div className="min-h-screen bg-surface px-4 py-8 print:bg-white print:p-0">
      {/* Toolbar — hidden when printing */}
      <div className="no-print mx-auto mb-6 flex max-w-3xl items-center justify-between">
        <button
          onClick={onExit}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted shadow-sm transition-colors hover:text-text"
        >
          <X size={15} /> Exit reader
        </button>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-on-accent shadow-soft transition-opacity hover:opacity-90"
        >
          <Download size={15} /> Download PDF
        </button>
      </div>

      {/* Document */}
      <article className="reader-doc mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 shadow-soft print:max-w-none print:rounded-none print:border-0 print:p-0 print:shadow-none md:p-12">
        <header className="border-b border-border pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-text">{c.name}</h1>
          <p className="mt-2 text-muted">{c.tagline}</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} /> {c.location}
            </span>
            <a href={`mailto:${c.email}`} className="inline-flex items-center gap-1.5 hover:text-accent">
              <Mail size={14} /> {c.email}
            </a>
            {c.contacts
              .filter((ct) => ct.label !== "Email")
              .map((ct) => (
                <a key={ct.label} href={ct.href} className="hover:text-accent">
                  {ct.label}: {ct.value}
                </a>
              ))}
          </div>
        </header>

        <ReaderSection title="Profile">
          <div className="space-y-3 text-[15px] leading-relaxed text-muted">
            {c.bio.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </ReaderSection>

        <ReaderSection title="Experience">
          <div className="space-y-5">
            {c.experience.map((job, i) => (
              <div key={i}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="font-semibold text-text">
                    {job.role} · {job.company}
                  </h3>
                  <span className="text-xs text-faint">{job.period}</span>
                </div>
                {job.location && <div className="text-sm text-faint">{job.location}</div>}
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                  {job.highlights.map((h, j) => (
                    <li key={j}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ReaderSection>

        <ReaderSection title="Education">
          <div className="space-y-3">
            {c.education.map((ed, i) => (
              <div key={i} className="flex flex-wrap items-baseline justify-between gap-x-3">
                <div>
                  <span className="font-semibold text-text">{ed.school}</span>
                  <span className="text-muted"> — {ed.credential}</span>
                  {ed.detail && <p className="text-sm text-muted">{ed.detail}</p>}
                </div>
                <span className="text-xs text-faint">{ed.period}</span>
              </div>
            ))}
          </div>
        </ReaderSection>

        <ReaderSection title="Skills">
          <p className="text-[15px] leading-relaxed text-muted">
            {c.skills.map((s) => s.name).join(" · ")}
          </p>
        </ReaderSection>

        <ReaderSection title="Selected Projects">
          <div className="space-y-4">
            {c.projects.map((p) => (
              <div key={p.name}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="font-semibold text-text">{p.name}</h3>
                  <span className="text-xs text-faint">{p.tags.join(", ")}</span>
                </div>
                <p className="text-sm text-muted">{p.description}</p>
                <div className="mt-1 flex gap-4 text-xs text-accent">
                  {p.liveUrl && <a href={p.liveUrl}>{p.liveUrl}</a>}
                  <a href={p.sourceUrl}>{p.sourceUrl}</a>
                </div>
              </div>
            ))}
          </div>
        </ReaderSection>
      </article>
    </div>
  );
}

function ReaderSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-7 break-inside-avoid">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {title}
      </h2>
      {children}
    </section>
  );
}
