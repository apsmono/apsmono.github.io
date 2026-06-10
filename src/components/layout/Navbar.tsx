import { useEffect, useState } from "react";
import { Menu, X, BookOpen, FileDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/useActiveSection";
import { AppearanceMenu } from "./AppearanceMenu";
import { Lockup } from "./Lockup";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  items: NavItem[];
  logo: string;
  logoAccent: string;
  onEnterReader: () => void;
  onDownloadPdf: () => void;
}

const isExternal = (href: string) => /^https?:\/\//.test(href);
const externalProps = (href: string) =>
  isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

export function Navbar({ items, logo, logoAccent, onEnterReader, onDownloadPdf }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Highlight the nav link whose section currently dominates the viewport.
  const sectionIds = items
    .filter((item) => item.href.startsWith("#") && item.href.length > 1)
    .map((item) => item.href.slice(1));
  const active = useActiveSection(sectionIds);

  // Condense the bar + add a shadow once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300",
        solid ? "border-border bg-bg/85 shadow-soft" : "border-transparent bg-bg/40"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-6 transition-[padding] duration-300",
          scrolled ? "py-2" : "py-3.5"
        )}
      >
        <a href="#" className="flex items-center text-text" aria-label={`${logo}${logoAccent}`}>
          {/* Official brand lockup artwork (swaps to white in dark mode). */}
          <Lockup className="h-6 w-auto" alt={`${logo}${logoAccent}`} />
        </a>

        <div className="hidden items-center gap-7 md:flex">
          <ul className="flex items-center gap-7">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  {...externalProps(item.href)}
                  className={cn(
                    "nav-link springy text-sm font-medium hover:text-text",
                    active === item.href.slice(1) ? "is-active text-text" : "text-muted"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={onEnterReader}
              aria-label="Reader view"
              className="group springy flex h-9 items-center rounded-full border border-border bg-card/70 px-2.5 text-muted shadow-sm hover:text-text"
            >
              <BookOpen size={16} className="shrink-0" />
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover:ml-1.5 group-hover:max-w-[6rem] group-hover:opacity-100">
                Reader view
              </span>
            </button>
            <button
              onClick={onDownloadPdf}
              aria-label="Download PDF"
              className="group springy flex h-9 items-center rounded-full border border-border bg-card/70 px-2.5 text-muted shadow-sm hover:text-text"
            >
              <FileDown size={16} className="shrink-0" />
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover:ml-1.5 group-hover:max-w-[6rem] group-hover:opacity-100">
                Download PDF
              </span>
            </button>
            <AppearanceMenu />
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <AppearanceMenu />
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="text-text"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-b border-border bg-bg px-6 pb-4 md:hidden",
          open ? "block" : "hidden"
        )}
      >
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            {...externalProps(item.href)}
            className="block py-2 text-sm font-medium text-muted transition-colors hover:text-text"
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <div className="mt-2 flex gap-2 border-t border-border pt-3">
          <button
            onClick={() => {
              setOpen(false);
              onEnterReader();
            }}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-sm font-medium text-muted hover:text-text"
          >
            <BookOpen size={15} /> Reader
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onDownloadPdf();
            }}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-sm font-medium text-muted hover:text-text"
          >
            <FileDown size={15} /> PDF
          </button>
        </div>
      </div>
    </nav>
  );
}
