import { ArrowUpRight } from "lucide-react";
import { DASHBOARD_HREF, type DepthMode } from "../config";
import { CalibrationMark } from "./CalibrationMark";

interface HeaderProps {
  depth: DepthMode;
  onSelectDepth: (depth: DepthMode) => void;
}

export function Header({ depth, onSelectDepth }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-border bg-background">
      <div className="max-w-6xl mx-auto h-full px-5 sm:px-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onSelectDepth("horizon")}
          className="inline-flex items-center gap-3 text-left focus-visible:outline-1 focus-visible:outline-brand focus-visible:outline-offset-4"
        >
          <CalibrationMark className="size-4 text-foreground shrink-0" />
          <span className="text-sm font-medium tracking-[0.16em] text-foreground uppercase">
            SoVa
          </span>
          <span className="hidden md:inline-block font-mono text-[11px] text-subtle border-l border-border pl-3">
            STD // 01
          </span>
        </button>

        {/* Braun Console Mechanical Depth Switch */}
        <div className="flex items-center gap-4 sm:gap-6 h-full">
          <div
            role="tablist"
            aria-label="Instrument depth"
            className="inline-flex items-stretch border border-border bg-surface h-9"
          >
            <button
              type="button"
              role="tab"
              aria-selected={depth === "horizon"}
              onClick={() => onSelectDepth("horizon")}
              className={`mechanical-lever relative px-3 sm:px-4 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] uppercase focus-visible:outline-1 focus-visible:outline-brand ${
                depth === "horizon"
                  ? "bg-panel text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span
                aria-hidden="true"
                className={`size-1.5 ${
                  depth === "horizon" ? "bg-brand" : "bg-border-strong"
                }`}
              />
              <span>01 Horizon</span>
              {depth === "horizon" && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[2px] bg-brand"
                />
              )}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={depth === "engine"}
              onClick={() => onSelectDepth("engine")}
              className={`mechanical-lever relative px-3 sm:px-4 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] uppercase border-l border-border focus-visible:outline-1 focus-visible:outline-brand ${
                depth === "engine"
                  ? "bg-panel text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span
                aria-hidden="true"
                className={`size-1.5 ${
                  depth === "engine" ? "bg-brand" : "bg-border-strong"
                }`}
              />
              <span>02 Open Engine</span>
              {depth === "engine" && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[2px] bg-brand"
                />
              )}
            </button>
          </div>

          <a
            href={DASHBOARD_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mechanical-lever hidden sm:inline-flex items-center gap-1.5 h-9 px-3.5 border border-border-strong bg-background text-foreground font-mono text-[11px] tracking-[0.06em] uppercase hover:border-foreground focus-visible:outline-1 focus-visible:outline-brand focus-visible:outline-offset-2"
          >
            <span>Control Plane</span>
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
}
