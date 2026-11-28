import { ArrowRight, Play } from "lucide-react";
import { useEffect, useState } from "react";
import bgImage from "../assets/bg.webp";
import walkthroughPoster from "../assets/walkthrough-poster.webp";
import { triggerWalkthroughPlayback, type ViewMode } from "../config";

interface OverviewViewProps {
  onSelectView: (view: ViewMode) => void;
}

const LAWS = [
  {
    title: "Clearance Precedes Intelligence",
    body: "Access boundaries are enforced at the storage perimeter before any model inspects a token. Unauthorized records do not exist in the search space.",
  },
  {
    title: "Uncertainty Demands Silence",
    body: "When evidence falls below the deterministic confidence cutoff, synthesis halts. SoVa states what is missing and routes the inquiry to accountable human authority.",
  },
  {
    title: "Every Claim Carries Custody",
    body: "No floating summaries. Every statement is locked to its exact passage of record and remains continuously auditable from the operator control plane.",
  },
];

export function OverviewView({ onSelectView }: OverviewViewProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handlePlay = () => {
      setIsPlaying(true);
    };
    window.addEventListener("sova:play-walkthrough", handlePlay);
    return () => window.removeEventListener("sova:play-walkthrough", handlePlay);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl sm:text-7xl tracking-[-0.02em] leading-[0.98] text-foreground">
              A confident guess is worse than silence.
            </h1>

            <p className="mt-7 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Access control is not a polite suggestion written into a prompt. Honesty is not a personality trait tuned with temperature. SoVa enforces clearance before intelligence wakes up, refuses to improvise past uncertainty, and binds every statement to a verifiable record.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={triggerWalkthroughPlayback}
                className="mechanical-lever inline-flex items-center gap-2.5 h-11 px-6 bg-primary text-primary-foreground text-sm font-medium hover:bg-brand hover:text-foreground focus-visible:outline-1 focus-visible:outline-brand focus-visible:outline-offset-2"
              >
                <Play className="size-3.5 fill-current" aria-hidden="true" />
                <span>Watch walkthrough</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectView("architecture")}
                className="mechanical-lever inline-flex items-center gap-2.5 h-11 px-6 border border-border-strong bg-surface text-foreground text-sm font-medium hover:border-foreground focus-visible:outline-1 focus-visible:outline-brand focus-visible:outline-offset-2"
              >
                <span>Inspect architecture</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Walkthrough Video */}
          <div
            id="walkthrough-film"
            className="mt-14 border border-border bg-background scroll-mt-24"
          >
            <div className="aspect-video w-full bg-background relative overflow-hidden">
              {isPlaying ? (
                <video
                  src="/sova-launch.mp4"
                  poster={walkthroughPoster}
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  className="w-full h-full object-contain bg-background block"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  aria-label="Play SoVa walkthrough"
                  className="group relative w-full h-full flex flex-col items-center justify-center p-6 text-center focus-visible:outline-1 focus-visible:outline-brand"
                >
                  <img
                    src={walkthroughPoster}
                    alt=""
                    aria-hidden="true"
                    className="mechanical-lever absolute inset-0 w-full h-full object-cover object-center opacity-45 group-hover:opacity-60"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-background/60"
                  />
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="mechanical-lever inline-flex items-center justify-center size-16 bg-primary text-primary-foreground group-hover:bg-brand group-hover:text-foreground">
                      <Play className="size-6 fill-current ml-0.5" aria-hidden="true" />
                    </span>
                    <span className="mt-5 font-mono text-xs tracking-[0.1em] uppercase text-foreground">
                      Watch walkthrough
                    </span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Three Laws */}
      <section className="py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-14 max-w-2xl">
            <h2 className="font-serif text-4xl sm:text-5xl tracking-[-0.02em] text-foreground">
              Three laws. Zero improvisation.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-border pt-10">
            {LAWS.map((law) => (
              <div key={law.title} className="space-y-3">
                <h3 className="text-lg font-medium tracking-tight text-foreground">
                  {law.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {law.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Turbulent Reality */}
      <section className="py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 border border-border bg-surface">
            <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-border">
              <div className="relative bg-background aspect-[16/10] h-full overflow-hidden">
                <img
                  src={bgImage}
                  alt="Monochrome aerodynamic vector field around a non-spherical surface"
                  className="w-full h-full object-cover object-center grayscale contrast-125 brightness-90"
                />
              </div>
            </div>

            <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-center">
              <div className="space-y-5">
                <h2 className="font-serif text-3xl sm:text-4xl tracking-[-0.02em] leading-[1.05] text-foreground">
                  Built for turbulent reality.
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  The industry assumed a spherical enterprise in a vacuum, wrapped language models in polite instructions, and prayed they would behave.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Real institutions do not operate in frictionless assumptions. Permissions fracture across departments, policies supersede older drafts, and an unauthorized answer is an institutional breach. SoVa treats knowledge governance as boundary physics, not theater.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Threshold */}
      <section className="py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="border border-border bg-panel p-8 sm:p-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <h2 className="font-serif text-3xl sm:text-5xl tracking-[-0.02em] leading-[1.02] text-foreground">
                Built for the person who assumes this is a wrapper.
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Step past the surface. Inspect the pre-inference relational boundary, switch directory clearances live, observe the deterministic cutoff halt synthesis below 0.600, and inspect the operator control plane without slogans.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onSelectView("architecture")}
              className="mechanical-lever shrink-0 inline-flex items-center gap-3 h-11 px-6 border border-border-strong bg-background text-foreground font-mono text-xs tracking-[0.08em] uppercase hover:border-brand focus-visible:outline-1 focus-visible:outline-brand focus-visible:outline-offset-2"
            >
              <span>Inspect architecture</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
