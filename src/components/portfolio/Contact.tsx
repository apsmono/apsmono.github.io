import { Card } from "@/components/ui/Card";
import * as LucideIcons from "lucide-react";
import type { Contact } from "@/types";
import { SectionHeader } from "./SectionHeader";
import { useReveal } from "@/hooks/useReveal";

interface ContactProps {
  contacts: Contact[];
}

export function Contact({ contacts }: ContactProps) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="contact" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="05"
          eyebrow="Contact"
          title="Let's build something together."
          description="Have a project in mind, or just want to say hi? Reach out on any of these."
        />

        <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact, i) => {
            const Icon = ((LucideIcons as unknown) as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[contact.icon] || LucideIcons.Circle;
            return (
              <a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
                className="reveal block"
              >
                <Card className="group flex flex-col items-center gap-2 py-6 text-center transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-lift">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-on-accent">
                    <Icon size={22} />
                  </span>
                  <div className="text-xs uppercase tracking-wide text-faint">{contact.label}</div>
                  <div className="font-semibold">{contact.value}</div>
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
