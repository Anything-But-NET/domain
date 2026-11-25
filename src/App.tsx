import { ArrowUpRight, Play } from "lucide-react";
import bgImage from "./assets/bg.webp";
import { ArchitectureSection } from "./components/ArchitectureSection";
import { ClosingFooter } from "./components/ClosingFooter";
import { Header } from "./components/Header";
import { HeroShowcase } from "./components/HeroShowcase";
import { ProductCapabilities } from "./components/ProductCapabilities";
import { TeamSection } from "./components/TeamSection";
import { DASHBOARD_HREF, DEMO_HREF, triggerWalkthroughPlayback } from "./config";

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
          <section className="pt-14 pb-20 sm:pt-20 sm:pb-28">
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
              <div className="max-w-3xl">
                <h1 className="text-4xl sm:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-foreground">
                  Answers from SharePoint,
                  <br />
                  <span className="text-muted-foreground">
                    right inside Slack.
                  </span>
                </h1>

                <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                  Permission-aware answers grounded in SharePoint with STAR hierarchical retrieval. Directory ACLs run in PostgreSQL before ranking, and low-confidence queries confirm escalation to the operator queue.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={DASHBOARD_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 h-10 px-5 bg-primary text-primary-foreground text-sm font-medium hover:bg-brand hover:text-foreground transition-colors focus-visible:outline-1 focus-visible:outline-brand focus-visible:outline-offset-2"
                  >
                    <span>Open dashboard</span>
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                  <a
                    href={DEMO_HREF}
                    onClick={(e) => {
                      e.preventDefault();
                      triggerWalkthroughPlayback();
                    }}
                    className="inline-flex items-center gap-2 h-10 px-5 border border-border-strong bg-background/40 text-foreground text-sm font-medium hover:bg-accent transition-colors focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    <Play className="size-3.5 fill-current" aria-hidden="true" />
                    <span>Watch demo</span>
                  </a>
                </div>
              </div>

              <HeroShowcase />
            </div>
          </section>

          <ProductCapabilities />

          <ArchitectureSection />

          <TeamSection />
        </main>

        <ClosingFooter />
      </div>
    </div>
  );
}

export default App;
