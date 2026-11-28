import { ArrowRight, Play } from "lucide-react";
import { useEffect, useState } from "react";
import bgImage from "../assets/bg.webp";
import walkthroughPoster from "../assets/walkthrough-poster.webp";
import { type DepthMode, triggerWalkthroughPlayback } from "../config";

interface HorizonViewProps {
  onSelectDepth: (depth: DepthMode) => void;
}

const LAWS = [
  {
    index: "LAW I",
    title: "Clearance Precedes Intelligence",
    body: "Access boundaries are enforced at the storage perimeter before any model inspects a token. Unauthorized records do not exist in the search space.",
    diagram: "clearance" as const,
  },
  {
    index: "LAW II",
    title: "Uncertainty Demands Silence",
    body: "When evidence falls below the deterministic confidence cutoff, synthesis halts. SoVa states what is missing and routes the inquiry to accountable human authority.",
    diagram: "cutoff" as const,
  },
  {
    index: "LAW III",
    title: "Every Claim Carries Custody",
    body: "No floating summaries. Every statement is locked to its exact passage of record and remains continuously auditable from the operator control plane.",
    diagram: "custody" as const,
  },
];

function LawDiagram({ kind }: { kind: "clearance" | "cutoff" | "custody" }) {
  if (kind === "clearance") {
    return (
      <svg
        viewBox="0 0 240 64"
        fill="none"
        aria-hidden="true"
        className="w-full h-16 border-t border-border pt-4 text-muted-foreground"
      >
        {/* Corpus strata */}
        <line x1="0" y1="16" x2="96" y2="16" stroke="currentColor" strokeOpacity="0.35" />
        <line x1="0" y1="32" x2="96" y2="32" stroke="#ece9e1" strokeWidth="1.2" />
        <line x1="0" y1="48" x2="96" y2="48" stroke="currentColor" strokeOpacity="0.35" />
        {/* Sealed perimeter gate */}
        <line x1="112" y1="6" x2="112" y2="58" stroke="#c95b3c" strokeWidth="1.5" />
        <rect x="109" y="29" width="6" height="6" fill="#0b0b0a" stroke="#ece9e1" strokeWidth="1" />
        {/* Authorized ray continuing past gate */}
        <line x1="115" y1="32" x2="232" y2="32" stroke="#ece9e1" strokeWidth="1.2" />
        <rect x="228" y="29" width="6" height="6" fill="#ece9e1" />
        {/* Blocked strata */}
        <line x1="104" y1="12" x2="104" y2="20" stroke="#c95b3c" strokeWidth="1" />
        <line x1="104" y1="44" x2="104" y2="52" stroke="#c95b3c" strokeWidth="1" />
      </svg>
    );
  }

  if (kind === "cutoff") {
    return (
      <svg
        viewBox="0 0 240 64"
        fill="none"
        aria-hidden="true"
        className="w-full h-16 border-t border-border pt-4 text-muted-foreground"
      >
        {/* Baseline */}
        <line x1="0" y1="54" x2="240" y2="54" stroke="currentColor" strokeOpacity="0.3" />
        {/* Deterministic 0.600 cutoff plane */}
        <line
          x1="0"
          y1="28"
          x2="240"
          y2="28"
          stroke="#c95b3c"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        {/* Measured confidence steps */}
        <polyline
          points="0,44 48,44 48,14 108,14 108,42 172,42"
          stroke="#ece9e1"
          strokeWidth="1.2"
        />
        {/* Hard halt marker */}
        <line x1="172" y1="36" x2="172" y2="48" stroke="#c95b3c" strokeWidth="1.5" />
        <rect x="170" y="40" width="4" height="4" fill="#c95b3c" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 240 64"
      fill="none"
      aria-hidden="true"
      className="w-full h-16 border-t border-border pt-4 text-muted-foreground"
    >
      {/* Record anchor -> Vector lock -> Bound output */}
      <rect x="2" y="22" width="36" height="20" stroke="currentColor" strokeOpacity="0.6" />
      <line x1="38" y1="32" x2="104" y2="32" stroke="#ece9e1" strokeWidth="1.2" />
      <rect x="104" y="26" width="12" height="12" stroke="#c95b3c" strokeWidth="1.2" />
      <rect x="108" y="30" width="4" height="4" fill="#c95b3c" />
      <line x1="116" y1="32" x2="196" y2="32" stroke="#ece9e1" strokeWidth="1.2" />
      <rect x="196" y="22" width="42" height="20" stroke="#ece9e1" strokeWidth="1.2" />
      <line x1="204" y1="32" x2="230" y2="32" stroke="#ece9e1" strokeOpacity="0.6" />
    </svg>
  );
}

export function HorizonView({ onSelectDepth }: HorizonViewProps) {
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
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
              Institutional Knowledge Instrument // Standard 01
            </p>

            <h1 className="mt-5 font-serif text-5xl sm:text-7xl tracking-[-0.02em] leading-[0.98] text-foreground">
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
                <span>Observe the instrument</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectDepth("engine")}
                className="mechanical-lever inline-flex items-center gap-2.5 h-11 px-6 border border-border-strong bg-surface text-foreground text-sm font-medium hover:border-foreground focus-visible:outline-1 focus-visible:outline-brand focus-visible:outline-offset-2"
              >
                <span>Step into the engine</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Specimen 01: Instrument Film */}
          <div
            id="specimen-film"
            className="mt-14 border border-border bg-surface scroll-mt-24"
          >
            <div className="h-10 px-4 sm:px-5 border-b border-border flex items-center justify-between gap-4 font-mono text-[11px] tracking-[0.06em] uppercase text-muted-foreground">
              <div className="flex items-center gap-2.5 truncate">
                <span className="size-1.5 bg-brand shrink-0" aria-hidden="true" />
                <span className="text-foreground">Specimen 01</span>
                <span aria-hidden="true">//</span>
                <span className="truncate">Live Instrument Walkthrough</span>
              </div>
              <span className="shrink-0 text-subtle">00:30</span>
            </div>

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
                  aria-label="Play SoVa instrument walkthrough"
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
                      Run Specimen 01
                    </span>
                    <span className="mt-1.5 font-mono text-[11px] text-muted-foreground">
                      Clearance perimeter, cutoff abstention, and operator governance
                    </span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section I: Sovereignty of Law */}
      <section className="py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-14 max-w-2xl">
            <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground">
              01 // The Law
            </p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl tracking-[-0.02em] text-foreground">
              Three laws. Zero improvisation.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-border bg-surface">
            {LAWS.map((law) => (
              <div
                key={law.index}
                className="border-r border-b border-border p-7 sm:p-9 flex flex-col justify-between gap-10"
              >
                <div className="space-y-3">
                  <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-subtle">
                    {law.index}
                  </p>
                  <h3 className="text-lg font-medium tracking-tight text-foreground">
                    {law.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {law.body}
                  </p>
                </div>

                <LawDiagram kind={law.diagram} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section II: Boundary Physics Specimen */}
      <section className="py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 border border-border bg-surface">
            <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-border flex flex-col">
              <div className="h-10 px-4 sm:px-5 border-b border-border flex items-center justify-between gap-4 font-mono text-[11px] tracking-[0.06em] uppercase text-muted-foreground">
                <span className="truncate">
                  Fig. 02 // Boundary-Layer Flow — Non-Spherical Reality
                </span>
                <span className="shrink-0 text-subtle">PLATE II</span>
              </div>

              <div className="relative bg-background aspect-[16/10] overflow-hidden">
                <img
                  src={bgImage}
                  alt="Monochrome aerodynamic vector field around a non-spherical surface"
                  className="w-full h-full object-cover object-center grayscale contrast-125 brightness-90"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 border border-border/50 pointer-events-none"
                />
              </div>
            </div>

            <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between gap-8">
              <div className="space-y-5">
                <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground">
                  02 // On Probabilistic Toys
                </p>
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

              <div className="pt-5 border-t border-border flex items-center justify-between font-mono text-[11px] text-subtle uppercase">
                <span>Posture: Legislator</span>
                <span>Magic: None</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section III: The Second Door Threshold */}
      <section className="py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="border border-border bg-panel p-8 sm:p-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground">
                03 // Door Two — The Open Engine
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl tracking-[-0.02em] leading-[1.02] text-foreground">
                Built for the person who assumes this is a wrapper.
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Step past the surface. Inspect the pre-inference relational boundary, switch directory clearances live, observe the deterministic cutoff halt synthesis below 0.600, and read the production telemetry without slogans.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onSelectDepth("engine")}
              className="mechanical-lever shrink-0 inline-flex items-center gap-3 h-11 px-6 border border-border-strong bg-background text-foreground font-mono text-xs tracking-[0.08em] uppercase hover:border-brand focus-visible:outline-1 focus-visible:outline-brand focus-visible:outline-offset-2"
            >
              <span className="size-1.5 bg-brand" aria-hidden="true" />
              <span>Open the engine</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
