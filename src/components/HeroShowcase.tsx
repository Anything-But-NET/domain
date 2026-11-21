import { ArrowUpRight, Play } from "lucide-react";
import { useState } from "react";
import controlPlaneImage from "../assets/control-plane.webp";
import { DASHBOARD_HREF } from "../config";

type MediaTab = "walkthrough" | "control-plane";

export function HeroShowcase() {
  const [activeTab, setActiveTab] = useState<MediaTab>("walkthrough");
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageMissing, setImageMissing] = useState(false);

  return (
    <div className="mt-16 w-full">
      {/* Clean Underline Tab Bar */}
      <div
        role="tablist"
        aria-label="Product media views"
        className="flex items-center gap-8 border-b border-border mb-6"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "walkthrough"}
          onClick={() => setActiveTab("walkthrough")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors focus-visible:outline-1 focus-visible:outline-brand ${
            activeTab === "walkthrough"
              ? "border-brand text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Product Walkthrough
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "control-plane"}
          onClick={() => setActiveTab("control-plane")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors focus-visible:outline-1 focus-visible:outline-brand ${
            activeTab === "control-plane"
              ? "border-brand text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Control Plane
        </button>
      </div>

      {/* Single 16:9 Media Frame */}
      <div className="aspect-video w-full border border-border bg-card relative overflow-hidden">
        {activeTab === "walkthrough" ? (
          isPlaying ? (
            <iframe
              src="https://www.youtube.com/embed/PDJLvF1dUek?autoplay=1&rel=0"
              title="SoVa Copilot end-to-end walkthrough"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              aria-label="Play product walkthrough video"
              className="group w-full h-full flex flex-col items-center justify-center p-6 text-center bg-card hover:bg-secondary/60 transition-colors focus-visible:outline-1 focus-visible:outline-brand"
            >
              <span className="inline-flex items-center justify-center size-14 bg-primary text-primary-foreground group-hover:bg-brand group-hover:text-foreground transition-colors">
                <Play className="size-5 fill-current ml-0.5" aria-hidden="true" />
              </span>
              <span className="mt-5 text-base font-medium text-foreground">
                End-to-end walkthrough: Slack, Teams &amp; Control Plane
              </span>
              <span className="mt-1.5 text-sm text-muted-foreground">
                Click to load video player
              </span>
            </button>
          )
        ) : !imageMissing ? (
          <img
            src={controlPlaneImage}
            alt="SoVa Copilot Control Plane"
            onError={() => setImageMissing(true)}
            className="w-full h-full object-contain bg-background block"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
            <p className="text-base font-medium text-foreground">
              SoVa Copilot Control Plane
            </p>
            <p className="mt-2 text-sm text-muted-foreground max-w-md leading-relaxed">
              Inspect live SharePoint synchronization runs, SHA-256 content hashes, directory permission groups, and ingestion diagnostics directly in the operator console.
            </p>
            <a
              href={DASHBOARD_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 h-10 px-5 bg-primary text-primary-foreground text-sm font-medium hover:bg-brand hover:text-foreground transition-colors focus-visible:outline-1 focus-visible:outline-brand focus-visible:outline-offset-2"
            >
              <span>Open live dashboard</span>
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
