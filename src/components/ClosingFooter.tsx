import { ArrowUpRight } from "lucide-react";
import { DASHBOARD_HREF, type ViewMode } from "../config";
import { CalibrationMark } from "./CalibrationMark";

interface ClosingFooterProps {
  view: ViewMode;
  onSelectView: (view: ViewMode) => void;
}

export function ClosingFooter({ view, onSelectView }: ClosingFooterProps) {
  const nextView: ViewMode = view === "overview" ? "architecture" : "overview";

  return (
    <footer className="border-t border-border bg-surface py-12">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <CalibrationMark className="size-4 text-foreground shrink-0" />
          <p className="font-mono text-xs tracking-[0.14em] uppercase text-foreground">
            SoVa
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 font-mono text-xs">
          <button
            type="button"
            onClick={() => onSelectView(nextView)}
            className="mechanical-lever text-muted-foreground hover:text-foreground uppercase tracking-[0.06em] focus-visible:outline-1 focus-visible:outline-brand"
          >
            {view === "overview" ? "Architecture" : "Overview"}
          </button>

          <a
            href={DASHBOARD_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mechanical-lever inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground uppercase tracking-[0.06em] focus-visible:outline-1 focus-visible:outline-brand"
          >
            <span>Control Plane</span>
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>

          <span className="text-subtle border-l border-border pl-6">
            Anything But .NET
          </span>
        </div>
      </div>
    </footer>
  );
}
