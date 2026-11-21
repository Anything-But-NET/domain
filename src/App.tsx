import { ArrowUpRight } from "lucide-react";
import bgImage from "./assets/bg.webp";
import { ArchitectureSection } from "./components/ArchitectureSection";
import { ClosingFooter } from "./components/ClosingFooter";
import { Header } from "./components/Header";
import { HeroShowcase } from "./components/HeroShowcase";
import { ProductCapabilities } from "./components/ProductCapabilities";
import { TeamSection } from "./components/TeamSection";
import { DASHBOARD_HREF, DEMO_HREF } from "./config";

export function App() {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-brand selection:text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      >
        <img
          src={bgImage}
          alt=""
          className="h-full w-full object-cover object-center opacity-[0.07] brightness-75 saturate-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/80" />
      </div>

      <div className="relative z-10">
        <Header />

      <main>
        {/* Hero */}
        <section className="pt-20 pb-24 sm:pt-28 sm:pb-28">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="max-w-3xl">
              <p className="text-sm text-muted-foreground">
                Enterprise Knowledge &amp; Support Copilot
              </p>

              <h1 className="mt-4 text-4xl sm:text-6xl font-medium tracking-tight leading-[1.06] text-foreground">
                Answers from SharePoint,
                <br />
                <span className="text-muted-foreground">
                  right inside Slack and Teams.
                </span>
              </h1>

              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Employees ask questions where they already work and get answers grounded strictly in your SharePoint documents. Directory permissions are enforced in SQL before retrieval, and weak evidence escalates automatically to a specialist.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={DEMO_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-11 px-6 bg-primary text-primary-foreground text-sm font-medium hover:bg-brand hover:text-foreground transition-colors focus-visible:outline-1 focus-visible:outline-brand focus-visible:outline-offset-2"
                >
                  <span>Watch demo</span>
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={DASHBOARD_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-11 px-6 border border-border-strong text-foreground text-sm font-medium hover:bg-accent transition-colors focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <span>Open dashboard</span>
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <HeroShowcase />
          </div>
        </section>

        {/* Product Capabilities — Master-Detail Switcher */}
        <ProductCapabilities />

        {/* Architecture & Quiet Evaluation Strip */}
        <ArchitectureSection />

        {/* Team */}
        <TeamSection />
      </main>

      <ClosingFooter />
      </div>
    </div>
  );
}

export default App;
