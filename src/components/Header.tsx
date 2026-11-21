import { ArrowUpRight } from "lucide-react";
import { DASHBOARD_HREF, DEMO_HREF } from "../config";

export function Header() {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-border bg-background/90 backdrop-blur-xs">
      <div className="max-w-6xl mx-auto h-full px-5 sm:px-8 flex items-center justify-between gap-6">
        <a
          href="#"
          className="text-base font-semibold tracking-tight text-foreground focus-visible:outline-1 focus-visible:outline-brand focus-visible:outline-offset-4"
        >
          SoVa Copilot
        </a>

        <nav
          aria-label="Primary"
          className="hidden sm:flex items-center gap-8 text-sm text-muted-foreground"
        >
          <a
            href="#product"
            className="hover:text-foreground transition-colors focus-visible:outline-1 focus-visible:outline-brand focus-visible:outline-offset-4"
          >
            Product
          </a>
          <a
            href="#architecture"
            className="hover:text-foreground transition-colors focus-visible:outline-1 focus-visible:outline-brand focus-visible:outline-offset-4"
          >
            Architecture
          </a>
          <a
            href="#team"
            className="hover:text-foreground transition-colors focus-visible:outline-1 focus-visible:outline-brand focus-visible:outline-offset-4"
          >
            Team
          </a>
        </nav>

        <div className="flex items-center gap-5">
          <a
            href={DEMO_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-1 focus-visible:outline-brand focus-visible:outline-offset-4"
          >
            Demo
          </a>
          <a
            href={DASHBOARD_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 h-9 px-4 border border-border-strong text-foreground text-sm font-medium hover:bg-accent transition-colors focus-visible:outline-1 focus-visible:outline-brand focus-visible:outline-offset-2"
          >
            <span>Dashboard</span>
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
}
