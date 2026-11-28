import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import controlPlaneImage from "../assets/control-plane.webp";
import { DASHBOARD_HREF, type DepthMode } from "../config";

interface OpenEngineViewProps {
  onSelectDepth: (depth: DepthMode) => void;
}

type PrincipalKey = "FINANCE-L3" | "ENGINEERING";
type InquiryKey = "payroll" | "hardware" | "tax";

interface TraceOutcome {
  state: "ANSWERED_GROUNDED" | "DENIED_BOUNDARY_EMPTY" | "ABSTAINED_LOW_CONFIDENCE";
  matchedDocs: number;
  leafPassages: number;
  confidence: string;
  cutoffPassed: boolean;
  synthesisInvoked: boolean;
  perimeterMs: number;
  rankMs: number;
  resolutionMs: number;
  totalMs: number;
  answer: string;
  citation: string | null;
  actionNote: string;
}

const INQUIRIES: { key: InquiryKey; code: string; label: string; question: string }[] = [
  {
    key: "payroll",
    code: "INQ-01",
    label: "Executive Payroll & Bonus Pool",
    question: "What is the Q4 2026 L3 salary band and December bonus pool?",
  },
  {
    key: "hardware",
    code: "INQ-02",
    label: "Remote Hardware Allowance",
    question: "How much is the remote work hardware allowance and how do I expense it?",
  },
  {
    key: "tax",
    code: "INQ-03",
    label: "Unwritten Cross-Border Edge Case",
    question: "Does the Q4 contractor stipend cover cross-border social tax in Portugal?",
  },
];

function evaluateTrace(principal: PrincipalKey, inquiry: InquiryKey): TraceOutcome {
  if (inquiry === "payroll") {
    if (principal === "FINANCE-L3") {
      return {
        state: "ANSWERED_GROUNDED",
        matchedDocs: 1,
        leafPassages: 4,
        confidence: "0.900",
        cutoffPassed: true,
        synthesisInvoked: true,
        perimeterMs: 24,
        rankMs: 180,
        resolutionMs: 668,
        totalMs: 872,
        answer:
          "L3 net base pay for Q4 2026 is $4,600–$5,800/month, and the December 2026 discretionary bonus pool is $84,500 [1].",
        citation: "[1] Q4 2026 Budget & Payroll · Restricted Corpus",
        actionNote: "Verified extractive synthesis bound to source custody.",
      };
    }

    return {
      state: "DENIED_BOUNDARY_EMPTY",
      matchedDocs: 0,
      leafPassages: 0,
      confidence: "0.000",
      cutoffPassed: false,
      synthesisInvoked: false,
      perimeterMs: 19,
      rankMs: 0,
      resolutionMs: 231,
      totalMs: 250,
      answer:
        "Zero authorized passages matched principal clearance. Inference was never invoked. Confirmation draft opened for accountable human authority.",
      citation: null,
      actionNote: "Storage boundary returned empty set · 900 s escalation draft staged.",
    };
  }

  if (inquiry === "hardware") {
    return {
      state: "ANSWERED_GROUNDED",
      matchedDocs: 1,
      leafPassages: 6,
      confidence: "0.870",
      cutoffPassed: true,
      synthesisInvoked: true,
      perimeterMs: 21,
      rankMs: 174,
      resolutionMs: 615,
      totalMs: 810,
      answer:
        "Eligible staff receive a one-time $500 allowance for ergonomic chairs, monitors, and desks (laptops and decor excluded). Submit itemized receipts through the standard expense ledger within 30 calendar days [1].",
      citation: "[1] Remote Work Hardware Policy · General Corpus",
      actionNote: "Verified extractive synthesis bound to source custody.",
    };
  }

  return {
    state: "ABSTAINED_LOW_CONFIDENCE",
    matchedDocs: 2,
    leafPassages: 3,
    confidence: "0.310",
    cutoffPassed: false,
    synthesisInvoked: false,
    perimeterMs: 22,
    rankMs: 196,
    resolutionMs: 42,
    totalMs: 260,
    answer:
      "Authorized corpus contained 3 adjacent passages, but maximum calibrated grounding scored 0.310 against the 0.600 cutoff. Synthesis halted to prevent fabrication.",
    citation: null,
    actionNote: "Deterministic abstention triggered · Staged for expert review.",
  };
}

const PIPELINE_INGESTION = [
  {
    step: "01",
    title: "Incremental Repository Synchronization",
    body: "Polls institutional document stores on demand, normalizes binary office formats into canonical Markdown, hashes content to skip unchanged artifacts, and records immutable run states.",
  },
  {
    step: "02",
    title: "Hierarchical Passage Indexing",
    body: "Decomposes documents into parent-child section trees, computes dense vector representations on leaf passages over an internal RPC channel, and preserves exact coordinate links.",
  },
  {
    step: "03",
    title: "Atomic Principal & Clearance Binding",
    body: "Commits document sections alongside synchronized directory principals, group memberships, and clearance masks within a unified transactional store.",
  },
];

const PIPELINE_QUERY = [
  {
    step: "01",
    title: "Trace Assignment & Principal Resolution",
    body: "Assigns an immutable trace identifier to each incoming workplace inquiry and resolves the caller's live directory clearance mask before retrieval begins.",
  },
  {
    step: "02",
    title: "Pre-Inference Storage Boundary",
    body: "Executes vector ranking strictly across leaf passages whose parent clearance mask intersects the principal's groups, expanding parent context only for permitted matches.",
  },
  {
    step: "03",
    title: "Cutoff Gate & Escalation Custody",
    body: "Enforces the 0.600 deterministic confidence gate, attaches verified source citations, writes complete trace telemetry, or opens a 900-second confirmation draft for human authority.",
  },
];

const GOLDEN_BENCHMARKS = [
  { metric: "100.0%", detail: "Factual grounding & source binding (40 / 40 golden cases)" },
  { metric: "85.0%", detail: "Answer relevance across 60-case evaluation suite" },
  { metric: "70.0%", detail: "Safe abstention recall at 0.600 deterministic cutoff" },
  { metric: "0.704", detail: "Mean confidence across 149 scored production traces" },
];

const PRODUCTION_TELEMETRY = [
  { label: "Answered (citation-bound)", count: "108", ratio: "69.2%", tone: "text-success" },
  { label: "Safe abstention (below cutoff)", count: "25", ratio: "16.0%", tone: "text-warning" },
  { label: "Escalated to accountable authority", count: "16", ratio: "10.3%", tone: "text-foreground" },
  { label: "Upstream boundary fault", count: "7", ratio: "4.5%", tone: "text-destructive" },
];

export function OpenEngineView({ onSelectDepth }: OpenEngineViewProps) {
  const [principal, setPrincipal] = useState<PrincipalKey>("FINANCE-L3");
  const [inquiryKey, setInquiryKey] = useState<InquiryKey>("payroll");

  const selectedInquiry =
    INQUIRIES.find((item) => item.key === inquiryKey) ?? INQUIRIES[0];
  const trace = evaluateTrace(principal, inquiryKey);
  const confidencePct = Math.round(Number(trace.confidence) * 100);

  return (
    <div>
      {/* Engine Specification Header Strip */}
      <section className="pt-12 pb-16 border-b border-border bg-surface">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-border">
            <div className="space-y-2">
              <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground">
                Door 02 // Forensic Runtime Inspection
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl tracking-[-0.02em] text-foreground">
                The Open Engine.
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onSelectDepth("horizon")}
                className="mechanical-lever inline-flex items-center gap-2 h-9 px-3.5 border border-border-strong bg-background text-muted-foreground hover:text-foreground font-mono text-[11px] tracking-[0.06em] uppercase focus-visible:outline-1 focus-visible:outline-brand"
              >
                <ArrowLeft className="size-3.5" aria-hidden="true" />
                <span>Return to horizon</span>
              </button>
              <a
                href={DASHBOARD_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="mechanical-lever inline-flex items-center gap-2 h-9 px-4 bg-primary text-primary-foreground font-mono text-[11px] tracking-[0.06em] uppercase hover:bg-brand hover:text-foreground focus-visible:outline-1 focus-visible:outline-brand"
              >
                <span>Open live control plane</span>
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Deterministic Invariants Bar */}
          <dl className="grid grid-cols-2 lg:grid-cols-4 border-l border-b border-border bg-background">
            <div className="p-4 border-r border-t border-border space-y-1">
              <dt className="font-mono text-[10px] tracking-[0.1em] uppercase text-subtle">
                Pre-Inference ACL
              </dt>
              <dd className="font-mono text-xs text-foreground">ENFORCED AT STORAGE</dd>
            </div>
            <div className="p-4 border-r border-t border-border space-y-1">
              <dt className="font-mono text-[10px] tracking-[0.1em] uppercase text-subtle">
                Confidence Cutoff
              </dt>
              <dd className="font-mono text-xs text-foreground">0.600 DETERMINISTIC</dd>
            </div>
            <div className="p-4 border-r border-t border-border space-y-1">
              <dt className="font-mono text-[10px] tracking-[0.1em] uppercase text-subtle">
                Escalation Draft TTL
              </dt>
              <dd className="font-mono text-xs text-foreground">900 S (15 MIN)</dd>
            </div>
            <div className="p-4 border-r border-t border-border space-y-1">
              <dt className="font-mono text-[10px] tracking-[0.1em] uppercase text-subtle">
                Observed Sample
              </dt>
              <dd className="font-mono text-xs text-foreground">156 LIVE TRACES</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Section 01: Interactive Clearance & Cutoff Trace Inspector */}
      <section className="py-20 border-b border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground">
                01 // Deterministic Boundary &amp; Cutoff Trace
              </p>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                Inspect clearance enforcement before inference.
              </h2>
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              Select a directory principal and an inquiry to inspect storage-level filtering and the 0.600 cutoff gate.
            </p>
          </div>

          <div className="border border-border bg-surface">
            {/* Control Console Header */}
            <div className="px-5 py-3.5 border-b border-border flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-subtle">
                  Active Principal
                </span>
                <div
                  role="group"
                  aria-label="Directory principal"
                  className="inline-flex border border-border bg-background font-mono text-xs"
                >
                  {(["FINANCE-L3", "ENGINEERING"] as PrincipalKey[]).map((key, idx) => (
                    <button
                      key={key}
                      type="button"
                      aria-pressed={principal === key}
                      onClick={() => setPrincipal(key)}
                      className={`mechanical-lever px-3 py-1.5 inline-flex items-center gap-2 focus-visible:outline-1 focus-visible:outline-brand ${
                        idx > 0 ? "border-l border-border" : ""
                      } ${
                        principal === key
                          ? "bg-panel text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`size-1.5 ${
                          principal === key ? "bg-brand" : "bg-border-strong"
                        }`}
                      />
                      <span>{key}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="font-mono text-xs flex items-center gap-2">
                <span className="text-subtle">STATE:</span>
                <span
                  className={
                    trace.state === "ANSWERED_GROUNDED"
                      ? "text-success"
                      : "text-warning"
                  }
                >
                  {trace.state}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left: Inquiry Selector & Output */}
              <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between gap-8 border-b lg:border-b-0 lg:border-r border-border">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-subtle">
                      Test Inquiry
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {INQUIRIES.map((item) => (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setInquiryKey(item.key)}
                          className={`mechanical-lever text-left px-3.5 py-2.5 border flex items-center justify-between gap-4 focus-visible:outline-1 focus-visible:outline-brand ${
                            inquiryKey === item.key
                              ? "border-border-strong bg-panel text-foreground"
                              : "border-border bg-background text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <span className="text-xs sm:text-sm font-medium">
                            {item.label}
                          </span>
                          <span className="font-mono text-[11px] text-subtle shrink-0">
                            {item.code}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border space-y-2">
                    <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-subtle">
                      Prompt Payload
                    </p>
                    <p className="text-base text-foreground leading-relaxed">
                      {selectedInquiry.question}
                    </p>
                  </div>

                  <div className="border-l-2 border-brand pl-4 space-y-2.5">
                    <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
                      <span className="text-foreground uppercase">
                        Instrument Output
                      </span>
                      <span
                        className={
                          trace.cutoffPassed ? "text-success" : "text-warning"
                        }
                      >
                        {trace.cutoffPassed ? "CUSTODY VERIFIED" : "SYNTHESIS HALTED"}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {trace.answer}
                    </p>

                    {trace.citation && (
                      <p className="font-mono text-xs text-foreground truncate">
                        {trace.citation}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-border font-mono text-[11px] text-muted-foreground flex items-center justify-between gap-3">
                  <span>{trace.actionNote}</span>
                </div>
              </div>

              {/* Right: Relational Boundary Predicate & Stage Telemetry */}
              <div className="lg:col-span-6 p-6 sm:p-8 bg-background flex flex-col justify-between gap-6 font-mono text-xs">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 text-muted-foreground">
                    <span>RELATIONAL VECTOR BOUNDARY</span>
                    <span
                      className={
                        trace.matchedDocs > 0 ? "text-success" : "text-warning"
                      }
                    >
                      {trace.matchedDocs} DOCS / {trace.leafPassages} PASSAGES
                    </span>
                  </div>

                  <pre className="p-4 border border-border bg-surface leading-relaxed text-foreground overflow-x-auto text-[11px] sm:text-xs">
                    <code>
                      <span className="text-muted-foreground">SELECT</span> vn.id, 1 - (vn.embedding &lt;=&gt; $q) AS score{"\n"}
                      <span className="text-muted-foreground">FROM</span> index.vector_nodes vn{"\n"}
                      <span className="text-muted-foreground">JOIN</span> index.document d{" "}
                      <span className="text-muted-foreground">ON</span> d.document_id = vn.document_id{"\n"}
                      <span className="text-muted-foreground">WHERE</span> d.allowed_groups{" "}
                      <span className="text-brand">&amp;&amp;</span>{" "}
                      <span className="bg-panel border border-border-strong px-1.5 py-0.5 text-foreground">
                        ARRAY[&apos;{principal}&apos;]
                      </span>
                      {"\n"}
                      {"  "}<span className="text-muted-foreground">AND</span> vn.children_count = 0{"\n"}
                      <span className="text-muted-foreground">ORDER BY</span> vn.embedding{" "}
                      <span className="text-brand">&lt;=&gt;</span> $q{" "}
                      <span className="text-muted-foreground">LIMIT</span> 8;
                    </code>
                  </pre>

                  {/* Confidence Gauge against 0.600 cutoff */}
                  <div className="p-4 border border-border bg-surface space-y-2.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">
                        CALIBRATED CONFIDENCE VS 0.600 CUTOFF
                      </span>
                      <span
                        className={
                          trace.cutoffPassed ? "text-foreground" : "text-warning"
                        }
                      >
                        {trace.confidence} / 1.000
                      </span>
                    </div>

                    <div className="relative h-3 bg-background border border-border">
                      <div
                        className={`h-full ${
                          trace.cutoffPassed ? "bg-foreground" : "bg-warning"
                        }`}
                        style={{ width: `${confidencePct}%` }}
                      />
                      {/* 0.600 mechanical cutoff line */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-y-0 w-[2px] bg-brand"
                        style={{ left: "60%" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Stage Latency Breakdown */}
                <div className="border-t border-border pt-4 space-y-2 text-[11px]">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>01 perimeter &amp; principal resolution</span>
                    <span className="text-foreground">{trace.perimeterMs} ms</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>02 pre-filtered vector rank</span>
                    <span className="text-foreground">{trace.rankMs} ms</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>
                      03 {trace.synthesisInvoked ? "grounded synthesis" : "cutoff / escalation dispatch"}
                    </span>
                    <span className="text-foreground">{trace.resolutionMs} ms</span>
                  </div>
                  <div className="pt-2 border-t border-border flex items-center justify-between text-foreground">
                    <span>TOTAL RESOLUTION LATENCY</span>
                    <span>{trace.totalMs} ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02: Two Decoupled Pipelines */}
      <section className="py-20 border-b border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-12 max-w-2xl space-y-2">
            <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground">
              02 // Sovereign Subsystem Architecture
            </p>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
              Two decoupled deterministic pipelines.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-b border-border lg:divide-x divide-border">
            <div className="py-8 lg:pr-12 border-b lg:border-b-0 border-border">
              <h3 className="font-mono text-xs tracking-[0.08em] uppercase text-foreground pb-4 border-b border-border">
                Pipeline A // Corpus &amp; Principal Synchronization
              </h3>
              <ol className="divide-y divide-border">
                {PIPELINE_INGESTION.map((item) => (
                  <li
                    key={item.step}
                    className="py-6 last:pb-0 grid grid-cols-[36px_1fr] gap-4 items-baseline"
                  >
                    <span className="font-mono text-xs text-subtle">
                      {item.step}
                    </span>
                    <div className="space-y-1.5">
                      <h4 className="text-base font-medium text-foreground">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="py-8 lg:pl-12">
              <h3 className="font-mono text-xs tracking-[0.08em] uppercase text-foreground pb-4 border-b border-border">
                Pipeline B // Pre-Filtered Retrieval &amp; Governed Resolution
              </h3>
              <ol className="divide-y divide-border">
                {PIPELINE_QUERY.map((item) => (
                  <li
                    key={item.step}
                    className="py-6 last:pb-0 grid grid-cols-[36px_1fr] gap-4 items-baseline"
                  >
                    <span className="font-mono text-xs text-subtle">
                      {item.step}
                    </span>
                    <div className="space-y-1.5">
                      <h4 className="text-base font-medium text-foreground">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Section 03: Empirical Verification & Control Plane */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground">
                03 // Empirical Telemetry &amp; Control Plane
              </p>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                Measured performance across 156 live inquiries.
              </h2>
            </div>

            <a
              href={DASHBOARD_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mechanical-lever inline-flex items-center gap-2 font-mono text-xs text-foreground hover:text-brand uppercase"
            >
              <span>Inspect live telemetry</span>
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>

          {/* Golden Evaluation Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-border bg-surface">
            {GOLDEN_BENCHMARKS.map((item) => (
              <div
                key={item.detail}
                className="p-6 border-r border-b border-border space-y-2"
              >
                <p className="font-mono text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                  {item.metric}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Outcome Table + Framed Control Plane Plate */}
          <div className="grid grid-cols-1 lg:grid-cols-12 border border-border bg-surface">
            <div className="lg:col-span-5 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-border flex flex-col justify-between gap-6">
              <div className="space-y-5">
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                  <span>Outcome Distribution</span>
                  <span>N = 156</span>
                </div>

                <div className="divide-y divide-border border-t border-b border-border">
                  {PRODUCTION_TELEMETRY.map((row) => (
                    <div
                      key={row.label}
                      className="py-3.5 flex items-center justify-between gap-4 font-mono text-xs"
                    >
                      <span className={row.tone}>{row.label}</span>
                      <div className="flex items-center gap-4 shrink-0">
                        <span className="text-foreground">{row.count}</span>
                        <span className="text-muted-foreground w-12 text-right">
                          {row.ratio}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border font-mono text-xs space-y-1.5">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Corpus &amp; directory footprint</span>
                  <span className="text-foreground">50 docs / 25 principals</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Mean / p95 latency</span>
                  <span className="text-foreground">1,400 ms / 3,658 ms</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col bg-background">
              <div className="h-10 px-4 sm:px-5 border-b border-border flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
                <span>Fig. 03 // Operator Control Plane</span>
                <span className="text-subtle">TELEMETRY &amp; QUEUE</span>
              </div>
              <div className="p-4 sm:p-6">
                <img
                  src={controlPlaneImage}
                  alt="SoVa operator control plane displaying outcome analytics, confidence scores, and latency distribution"
                  className="w-full h-auto border border-border block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
