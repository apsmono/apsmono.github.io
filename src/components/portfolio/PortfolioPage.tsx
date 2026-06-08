import { useState, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "./Hero";
import { About } from "./About";
import { Experience } from "./Experience";
import { Projects } from "./Projects";
import { Skills } from "./Skills";
import { Contact } from "./Contact";
import { ReaderView } from "./ReaderView";
import { siteConfig } from "@/config/site";

export function PortfolioPage() {
  const [reader, setReader] = useState(false);

  const downloadPdf = useCallback(() => {
    setReader(true);
    // Wait for the reader layout to mount, then open the print dialog.
    requestAnimationFrame(() => setTimeout(() => window.print(), 120));
  }, []);

  if (reader) {
    return <ReaderView onExit={() => setReader(false)} />;
  }

  return (
    <div className="min-h-screen bg-bg text-text">
      <Navbar
        logo="aps"
        logoAccent="mono"
        items={[
          { label: "About", href: "#about" },
          { label: "Background", href: "#background" },
          { label: "Projects", href: "#projects" },
          { label: "Skills", href: "#skills" },
          { label: "Contact", href: "#contact" },
        ]}
        onEnterReader={() => setReader(true)}
        onDownloadPdf={downloadPdf}
      />
      <main>
        <Hero
          name={siteConfig.name}
          roles={siteConfig.roles}
          location={siteConfig.location}
          availability={siteConfig.availability}
          photo={siteConfig.heroPhoto}
          fallbackPhoto={siteConfig.avatar}
        />
        <About
          photo={siteConfig.aboutPhoto}
          fallbackPhoto={siteConfig.avatar}
          bio={siteConfig.bio}
          stats={siteConfig.stats}
        />
        <Experience
          experience={siteConfig.experience}
          education={siteConfig.education}
        />
        <Projects projects={siteConfig.projects} />
        <Skills skills={siteConfig.skills} />
        <Contact contacts={siteConfig.contacts} />
      </main>
      <Footer />
    </div>
  );
}
