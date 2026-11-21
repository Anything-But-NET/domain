import { ArrowUpRight } from "lucide-react";
import { DASHBOARD_HREF, DEMO_HREF } from "../config";

export function ClosingFooter() {
  return (
    <>
      <section className="border-t border-border py-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
              See SoVa Copilot in action.
            </h2>
            <p className="text-base text-muted-foreground">
              Watch the walkthrough or inspect live SharePoint syncs in the operator dashboard.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
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
              className="inline-flex items-center gap-2 h-11 px-6 border border-border-strong text-foreground text-sm font-medium hover:bg-accent transition-colors focus-visible:outline-1 focus-visible:outline-brand focus-visible:outline-offset-2"
            >
              <span>Open dashboard</span>
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-sm text-muted-foreground">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span className="text-foreground font-medium">SoVa Copilot</span>
          <span>Anything But .NET</span>
        </div>
      </footer>
    </>
  );
}
