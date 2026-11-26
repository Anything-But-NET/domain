import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import walkthroughPoster from "../assets/walkthrough-poster.webp";

type CanvasTab = "walkthrough" | "query";
type DirectoryGroup = "RBAC-Finance" | "RBAC-Engineering";
type PromptKey = "payroll" | "hardware";

const PROMPTS: { key: PromptKey; label: string; question: string }[] = [
  {
    key: "payroll",
    label: "Q4 payroll & bonus pool",
    question: "What is the Q4 2026 L3 salary band and December bonus pool?",
  },
  {
    key: "hardware",
    label: "Hardware allowance",
    question: "How much is the remote work hardware allowance and how do I expense it?",
  },
];

export function HeroShowcase() {
  const [activeTab, setActiveTab] = useState<CanvasTab>("walkthrough");
  const [group, setGroup] = useState<DirectoryGroup>("RBAC-Finance");
  const [promptKey, setPromptKey] = useState<PromptKey>("payroll");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handlePlay = () => {
      setActiveTab("walkthrough");
      setIsPlaying(true);
    };
    window.addEventListener("sova:play-walkthrough", handlePlay);
    return () => window.removeEventListener("sova:play-walkthrough", handlePlay);
  }, []);

  const selectedPrompt =
    PROMPTS.find((item) => item.key === promptKey) ?? PROMPTS[0];
  const isBlocked = promptKey === "payroll" && group === "RBAC-Engineering";

  return (
    <div id="walkthrough" className="mt-11 w-full scroll-mt-24">
      <div className="border border-border bg-[#0f0f0e]/90 backdrop-blur-sm">
        {/* Workspace Chrome Bar */}
        <div className="h-11 px-4 sm:px-5 border-b border-border flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground truncate">
            <span className="text-foreground">sova</span>
            <span aria-hidden="true">/</span>
            <span>
              {activeTab === "walkthrough" ? "walkthrough.mp4" : "#ask-sova"}
            </span>
          </div>

          <div
            role="tablist"
            aria-label="Product views"
            className="flex items-center gap-6 h-full"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "walkthrough"}
              onClick={() => setActiveTab("walkthrough")}
              className={`h-full inline-flex items-center text-xs font-medium border-b transition-colors focus-visible:outline-1 focus-visible:outline-brand ${
                activeTab === "walkthrough"
                  ? "border-brand text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Walkthrough
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "query"}
              onClick={() => setActiveTab("query")}
              className={`h-full inline-flex items-center text-xs font-medium border-b transition-colors focus-visible:outline-1 focus-visible:outline-brand ${
                activeTab === "query"
                  ? "border-brand text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Live Query
            </button>
          </div>
        </div>

        {/* Canvas Body */}
        {activeTab === "walkthrough" && (
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
                aria-label="Play SoVa Copilot product walkthrough"
                className="group relative w-full h-full flex flex-col items-center justify-center p-6 text-center focus-visible:outline-1 focus-visible:outline-brand"
              >
                <img
                  src={walkthroughPoster}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-45 group-hover:opacity-60 transition-opacity"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-background/45"
                />
                <div className="relative z-10 flex flex-col items-center">
                  <span className="inline-flex items-center justify-center size-16 bg-primary text-primary-foreground group-hover:bg-brand group-hover:text-foreground transition-colors">
                    <Play className="size-6 fill-current ml-0.5" aria-hidden="true" />
                  </span>
                  <span className="mt-5 text-base sm:text-lg font-medium text-foreground">
                    Watch product walkthrough
                  </span>
                  <span className="mt-1.5 font-mono text-xs text-muted-foreground">
                    0:30 · Slack ACLs, Escalation Queue &amp; Control Plane
                  </span>
                </div>
              </button>
            )}
          </div>
        )}

        {activeTab === "query" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[350px]">
            {/* Left: Interactive Slack Conversation */}
            <div className="lg:col-span-7 p-5 sm:p-7 flex flex-col justify-between gap-6 border-b lg:border-b-0 lg:border-r border-border">
              <div className="space-y-5">
                {/* Role Switcher */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-muted-foreground">
                    Entra ID group
                  </span>
                  <div
                    role="group"
                    aria-label="Directory group"
                    className="inline-flex border border-border font-mono text-xs"
                  >
                    <button
                      type="button"
                      aria-pressed={group === "RBAC-Finance"}
                      onClick={() => setGroup("RBAC-Finance")}
                      className={`px-2.5 py-1 transition-colors focus-visible:outline-1 focus-visible:outline-brand ${
                        group === "RBAC-Finance"
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      RBAC-Finance
                    </button>
                    <button
                      type="button"
                      aria-pressed={group === "RBAC-Engineering"}
                      onClick={() => setGroup("RBAC-Engineering")}
                      className={`px-2.5 py-1 border-l border-border transition-colors focus-visible:outline-1 focus-visible:outline-brand ${
                        group === "RBAC-Engineering"
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      RBAC-Engineering
                    </button>
                  </div>
                </div>

                {/* Question */}
                <div className="space-y-1.5">
                  <p className="text-xs text-muted-foreground">Slack user</p>
                  <p className="text-base text-foreground leading-relaxed">
                    {selectedPrompt.question}
                  </p>
                </div>

                {/* Answer */}
                <div className="border-l-2 border-brand/70 pl-4 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-foreground">
                      SoVa Copilot
                    </span>
                    <span
                      className={`font-mono text-xs ${
                        isBlocked ? "text-warning" : "text-success"
                      }`}
                    >
                      {isBlocked ? "Needs expert" : "Answered"}
                    </span>
                  </div>

                  {promptKey === "payroll" && !isBlocked && (
                    <>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        L3 net base pay for Q4 2026 is $4,600–$5,800/month, and the December 2026 discretionary bonus pool is $84,500{" "}
                        <span className="font-mono text-xs text-foreground">[1]</span>.
                      </p>
                      <p className="font-mono text-xs text-muted-foreground truncate">
                        [1] Q4 2026 Budget &amp; Payroll · SharePoint
                      </p>
                    </>
                  )}

                  {promptKey === "payroll" && isBlocked && (
                    <>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        No accessible SharePoint documents matched your groups. Send this question to an expert?
                      </p>
                      <div className="flex flex-wrap items-center gap-2 pt-0.5 font-mono text-[11px]">
                        <span className="px-2 py-0.5 border border-border-strong text-foreground">
                          Yes, send to expert
                        </span>
                        <span className="text-muted-foreground">
                          Queued for expert review
                        </span>
                      </div>
                    </>
                  )}

                  {promptKey === "hardware" && (
                    <>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Eligible staff receive a one-time $500 allowance for ergonomic chairs, monitors, and desks (laptops and decor excluded). Submit itemized receipts in Expensify / Rippling within 30 days{" "}
                        <span className="font-mono text-xs text-foreground">[1]</span>.
                      </p>
                      <p className="font-mono text-xs text-muted-foreground truncate">
                        [1] Remote Work Hardware Policy · SharePoint
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Query Switcher */}
              <div className="pt-4 border-t border-border flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground mr-1">
                  Try query:
                </span>
                {PROMPTS.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setPromptKey(item.key)}
                    className={`px-2.5 py-1 text-xs border transition-colors focus-visible:outline-1 focus-visible:outline-brand ${
                      promptKey === item.key
                        ? "border-border-strong bg-accent text-foreground"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: SQL + Retrieval Trace */}
            <div className="lg:col-span-5 p-5 sm:p-7 bg-background/70 flex flex-col justify-between gap-5 font-mono text-xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 text-muted-foreground">
                  <span>PostgreSQL</span>
                  <span className={isBlocked ? "text-warning" : "text-success"}>
                    {isBlocked ? "No access match" : "Matched"}
                  </span>
                </div>

                <pre className="leading-relaxed text-foreground overflow-x-auto text-[11px] sm:text-xs">
                  <code>
                    <span className="text-muted-foreground">SELECT</span> vn.id, 1 - (vn.embedding &lt;=&gt; $q) AS score{"\n"}
                    <span className="text-muted-foreground">FROM</span> rag.vector_nodes vn{"\n"}
                    <span className="text-muted-foreground">JOIN</span> rag.document d <span className="text-muted-foreground">ON</span> d.document_id = vn.document_id{"\n"}
                    <span className="text-muted-foreground">WHERE</span> d.allowed_groups{" "}
                    <span className="text-brand">&amp;&amp;</span>{" "}
                    <span className="bg-brand/15 px-1 text-foreground">
                      ARRAY[&apos;{group}&apos;]
                    </span>
                    {"\n"}
                    {"  "}<span className="text-muted-foreground">AND</span> vn.children_count = 0{"\n"}
                    <span className="text-muted-foreground">ORDER BY</span> vn.embedding <span className="text-brand">&lt;=&gt;</span> $q <span className="text-muted-foreground">LIMIT</span> 8;
                  </code>
                </pre>
              </div>

              <div className="pt-4 border-t border-border space-y-2 text-muted-foreground">
                <div className="flex items-center justify-between gap-2">
                  <span>confidence (gate 0.60)</span>
                  <span className={isBlocked ? "text-warning" : "text-foreground"}>
                    {isBlocked ? "0.000 (confirm draft)" : promptKey === "payroll" ? "0.900" : "0.870"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span>latency</span>
                  <span className="text-foreground">
                    {isBlocked ? "250 ms" : "872 ms"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
