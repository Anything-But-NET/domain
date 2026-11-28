import { ArrowUpRight } from "lucide-react";
import { DASHBOARD_HREF, type DepthMode } from "../config";
import { CalibrationMark } from "./CalibrationMark";

interface ClosingFooterProps {
  depth: DepthMode;
  onSelectDepth: (depth: DepthMode) => void;
}

export function ClosingFooter({ depth, onSelectDepth }: ClosingFooterProps) {
  const nextDepth: DepthMode = depth === "horizon" ? "engine" : "horizon";

  return (
    <footer className="border-t border-border bg-surface py-12">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <CalibrationMark className="size-4 text-foreground shrink-0 mt-1 sm:mt-0" />
          <div className="space-y-1">
            <p className="font-mono text-xs tracking-[0.14em] uppercase text-foreground">
              SoVa
            </p>
            <p className="text-sm text-muted-foreground">
              Instruments obey the laws of the institution they serve.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 font-mono text-xs">
          <button
            type="button"
            onClick={() => onSelectDepth(nextDepth)}
            className="mechanical-lever text-muted-foreground hover:text-foreground uppercase tracking-[0.06em] focus-visible:outline-1 focus-visible:outline-brand"
          >
            {depth === "horizon" ? "02 Open Engine" : "01 Horizon"}
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
