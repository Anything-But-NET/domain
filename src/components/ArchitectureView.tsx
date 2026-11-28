import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import controlPlaneImage from "../assets/control-plane.webp";
import { DASHBOARD_HREF, type ViewMode } from "../config";

interface ArchitectureViewProps {
  onSelectView: (view: ViewMode) => void;
}

type RoleKey = "FINANCE-L3" | "ENGINEERING";
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

const INVARIANTS = [
  { value: "0", label: "Unauthorized tokens passed to the model" },
  { value: "100%", label: "Answers bound to verified source passages" },
  { value: "0.600", label: "Dual confidence cutoff before synthesis" },
  { value: "0 bytes", label: "Question or answer text stored in telemetry" },
];

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

const STAR_STEPS = [
  {
    step: "01",
    title: "Structure-Preserving AST Parsing",
    body: "A deterministic state machine builds the document heading hierarchy while tracking fenced code blocks (``` and ~~~), so # comments inside code never fracture section levels. The tree serializes into a flat CSR array with raw float32 buffers for an isolated vectorization service over gRPC without blocking API I/O.",
    spec: "AST → CSR flat array + raw float32 over gRPC",
  },
  {
    step: "02",
    title: "Macro / Micro Late Chunking",
    body: "Each section runs through a two-pass window: 7,500-token macro passes (500-token overlap) produce contextualized token embeddings across the full section, while 100-token micro leaves preserve fact-level precision without splitting code blocks.",
    spec: "v_leaf = norm(norm(v_CLS) + norm(mean(H_macro[s:e])))",
  },
  {
    step: "03",
    title: "Self-Attention Centrality Pooling",
    body: "Post-order DFS aggregates every parent node from its heading, leaf chunks, and child subsections through a temperature-scaled self-similarity matrix—producing section-level representations with zero model summarization calls during ingestion.",
    spec: "A = M · Mᵀ   |   w = softmax(mean(A) / τ),  τ = 0.1",
  },
  {
    step: "04",
    title: "Dual-Trigger Auto-Merging & Zero-JOIN Reads",
    body: "Queries search top-8 leaves (children_count = 0) and promote to parent sections—each re-checked against caller ACLs—when either trigger fires. Leaf text is stored once; parent nodes hold pre-ordered descendant chunk indexes so full sections hydrate without recursive SQL JOINs.",
    spec: "quorum > 0.50 ∧ (best_child − parent ≤ 0.06)  ∨  parent > best_child (Δ ≤ 0.06)",
  },
];

const GROUNDING_BARRIERS = [
  {
    step: "01",
    title: "Pre-LLM Filtering & Intact Context Budget",
    body: "Candidate nodes scoring below 0.60 are dropped before synthesis. A 24,000-character budget skips oversized chunks instead of slicing mid-sentence; an empty surviving set triggers zero model calls.",
  },
  {
    step: "02",
    title: "Prompt-Injection Isolation",
    body: "System policy explicitly designates retrieved passages as UNTRUSTED REFERENCE DATA. The question and passages are packed into a single JSON object with tools disabled and temperature locked at 0.",
  },
  {
    step: "03",
    title: "Zero-Tolerance Citation Check",
    body: "Malformed JSON, an empty citation list, or even a single chunk_id absent from the retrieved context map voids the entire response immediately.",
  },
  {
    step: "04",
    title: "Conservative Dual Confidence",
    body: "Effective confidence is capped by the minimum of the model score and the weakest cited passage. Any result below 0.600 suppresses synthesis.",
  },
];

const OPERATIONAL_GUARANTEES = [
  {
    title: "Idempotent Delta Synchronization",
    body: "Expands transitive nested corporate directory groups and direct user grants (allowed_groups ∪ {email}), failing closed on files with no valid principals. Two-layer hash skipping avoids redundant processing—reusing cached bytes when only ACLs change without re-downloading—and advances drive delta links transactionally only at zero errors. Out-of-order updates are guarded by row locking (SELECT ... FOR UPDATE), manual event-bus commits, and DLT routing for malformed messages.",
  },
  {
    title: "Content-Addressed Prompt Lineage",
    body: "Every system prompt and parameter set receives a deterministic UUIDv5 identifier, with recursive secret scrubbing blocking API keys or credentials before database persistence. A single SQL CTE query aggregates answer rate, confidence distribution, p95 latency, and daily trends globally and per individual prompt version.",
  },
  {
    title: "Deterministic Evaluation & Independent RBAC Oracle",
    body: "Offline evaluation avoids unstable model-as-judge scoring by running 4 deterministic metrics (Relevance, Factual Grounding, 3-stage Citation Correctness, Safe No-Answer) across a 60-case golden set—achieving 100% factual grounding and 100% citation correctness across all 40 answerable cases. An independent RBAC oracle sharing zero code with the primary evaluator verifies visibility across 16 personas, 4 nested group levels, breakInheritance boundaries, and prompt-injection fixtures.",
  },
  {
    title: "Isolated Fault Domains & Operator Security",
    body: "Three-tier health probes (UP, DEGRADED, DOWN) isolate background failures: an unreachable event bus or document store connector marks status DEGRADED without interrupting synchronous query resolution. Operator tokens stay isolated in HttpOnly cookies at the BFF layer with SameSite and Origin CSRF checks, 7 granular authorities, and cross-service introspection against live operator status in the database.",
  },
];

const CONTROL_PLANE_MODULES = [
  {
    title: "Outcome Analytics",
    body: "Single-query CTE telemetry across outcomes, confidence tiers, and p95 latency.",
  },
  {
    title: "Escalation Queue",
    body: "State-machine ticket triage with retrieved context, draft responses, and immutable status history.",
  },
  {
    title: "Prompt Lineage",
    body: "Read-only inspection of UUIDv5 prompt versions paired with their scoped production outcomes.",
  },
  {
    title: "Audit & Access",
    body: "Paginated ingestion and generation traces cross-linked to escalations, prompt versions, users, and operators.",
  },
];

function evaluateTrace(role: RoleKey, inquiry: InquiryKey): TraceOutcome {
  if (inquiry === "payroll") {
    if (role === "FINANCE-L3") {
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
        actionNote: "Grounded synthesis verified against retrieved chunk IDs.",
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
        "Zero authorized passages matched role clearance. Synthesis was never invoked. Confirmation draft staged for accountable human review.",
      citation: null,
      actionNote: "Storage boundary returned empty set · 15 min escalation draft staged.",
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
      actionNote: "Grounded synthesis verified against retrieved chunk IDs.",
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

export function ArchitectureView({ onSelectView }: ArchitectureViewProps) {
  const [role, setRole] = useState<RoleKey>("FINANCE-L3");
  const [inquiryKey, setInquiryKey] = useState<InquiryKey>("payroll");

  const selectedInquiry =
    INQUIRIES.find((item) => item.key === inquiryKey) ?? INQUIRIES[0];
  const trace = evaluateTrace(role, inquiryKey);
  const confidencePct = Math.round(Number(trace.confidence) * 100);
  const docLabel = trace.matchedDocs === 1 ? "DOC" : "DOCS";
  const passageLabel = trace.leafPassages === 1 ? "PASSAGE" : "PASSAGES";

  return (
    <div>
      {/* Section 1: Header + 4 Architectural Invariants */}
      <section className="pt-14 pb-20 border-b border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-10">
            <h1 className="font-serif text-5xl sm:text-6xl tracking-[-0.02em] leading-[1.0] text-foreground">
              Architecture.
            </h1>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onSelectView("overview")}
                className="mechanical-lever inline-flex items-center gap-2 h-9 px-3.5 border border-border-strong bg-background text-muted-foreground hover:text-foreground font-mono text-[11px] tracking-[0.06em] uppercase focus-visible:outline-1 focus-visible:outline-brand"
              >
                <ArrowLeft className="size-3.5" aria-hidden="true" />
                <span>Back to overview</span>
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

          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-border pt-8">
            {INVARIANTS.map((item) => (
              <div key={item.label} className="space-y-1.5">
                <dd className="font-mono text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                  {item.value}
                </dd>
                <dt className="font-mono text-xs text-muted-foreground leading-snug">
                  {item.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Section 2: Pre-Inference Storage Boundary */}
      <section className="py-24 border-b border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-10 max-w-3xl space-y-4">
            <h2 className="font-serif text-3xl sm:text-5xl tracking-[-0.02em] leading-[1.04] text-foreground">
              Pre-inference storage boundary.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Standard HNSW indexes filter after top-K selection and starve recall under restrictive access control lists. Running transactional iterative graph scans with GIN group intersection and exact cosine re-sorting preserves recall without data leakage—and skips model invocation completely when the accessible set is empty.
            </p>
          </div>

          <div className="border border-border bg-surface">
            <div className="px-5 py-3.5 border-b border-border flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-subtle">
                  Role
                </span>
                <div
                  role="group"
                  aria-label="Role"
                  className="inline-flex border border-border bg-background font-mono text-xs"
                >
                  {(["FINANCE-L3", "ENGINEERING"] as RoleKey[]).map((key, idx) => (
                    <button
                      key={key}
                      type="button"
                      aria-pressed={role === key}
                      onClick={() => setRole(key)}
                      className={`mechanical-lever px-3 py-1.5 inline-flex items-center focus-visible:outline-1 focus-visible:outline-brand ${
                        idx > 0 ? "border-l border-border" : ""
                      } ${
                        role === key
                          ? "bg-panel text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
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
              <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between gap-8 border-b lg:border-b-0 lg:border-r border-border">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-subtle">
                      Inquiry
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
                      Question
                    </p>
                    <p className="text-base text-foreground leading-relaxed">
                      {selectedInquiry.question}
                    </p>
                  </div>

                  <div className="border-l-2 border-brand pl-4 space-y-2.5">
                    <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
                      <span className="text-foreground uppercase">
                        Response
                      </span>
                      <span
                        className={
                          trace.cutoffPassed ? "text-success" : "text-warning"
                        }
                      >
                        {trace.cutoffPassed ? "VERIFIED" : "SYNTHESIS HALTED"}
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

                <div className="pt-4 border-t border-border font-mono text-[11px] text-muted-foreground">
                  <span>{trace.actionNote}</span>
                </div>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-8 bg-background flex flex-col justify-between gap-6 font-mono text-xs">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 text-muted-foreground">
                    <span>RELATIONAL VECTOR BOUNDARY</span>
                    <span
                      className={
                        trace.matchedDocs > 0 ? "text-success" : "text-warning"
                      }
                    >
                      {trace.matchedDocs} {docLabel} / {trace.leafPassages} {passageLabel}
                    </span>
                  </div>

                  <pre className="p-4 border border-border bg-surface leading-relaxed text-foreground overflow-x-auto text-[11px] sm:text-xs">
                    <code>
                      <span className="text-muted-foreground">SET LOCAL</span> hnsw.iterative_scan = relaxed_order;{"\n\n"}
                      <span className="text-muted-foreground">SELECT</span> vn.id, 1 - (vn.embedding &lt;=&gt; $q) AS score{"\n"}
                      <span className="text-muted-foreground">FROM</span> index.vector_nodes vn{"\n"}
                      <span className="text-muted-foreground">JOIN</span> index.document d{" "}
                      <span className="text-muted-foreground">ON</span> d.document_id = vn.document_id{"\n"}
                      <span className="text-muted-foreground">WHERE</span> d.allowed_groups{" "}
                      <span className="text-brand">&amp;&amp;</span>{" "}
                      <span className="bg-panel border border-border-strong px-1.5 py-0.5 text-foreground">
                        ARRAY[&apos;{role}&apos;]
                      </span>
                      {"\n"}
                      {"  "}<span className="text-muted-foreground">AND</span> vn.children_count = 0{"\n"}
                      <span className="text-muted-foreground">ORDER BY</span> vn.embedding{" "}
                      <span className="text-brand">&lt;=&gt;</span> $q{" "}
                      <span className="text-muted-foreground">LIMIT</span> 8;
                    </code>
                  </pre>

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
                      <div
                        aria-hidden="true"
                        className="absolute inset-y-0 w-[2px] bg-brand"
                        style={{ left: "60%" }}
                      />
                    </div>
                  </div>
                </div>

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

      {/* Section 3: STAR — Hierarchical Vector Tree & Retrieval */}
      <section className="py-24 border-b border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-14 max-w-3xl space-y-4">
            <h2 className="font-serif text-3xl sm:text-5xl tracking-[-0.02em] leading-[1.04] text-foreground">
              Hierarchical retrieval without flat-chunk blindness.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Flat chunking severs conditions, tables, and section context, while model-generated tree summaries are expensive and unpredictable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 border-t border-border pt-12">
            {STAR_STEPS.map((item) => (
              <div
                key={item.step}
                className="flex flex-col justify-between gap-6 pb-8 border-b border-border"
              >
                <div className="space-y-3">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-subtle">
                      {item.step}
                    </span>
                    <h3 className="text-lg font-medium tracking-tight text-foreground">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.body}
                  </p>
                </div>

                <pre className="p-3.5 border border-border bg-surface font-mono text-[11px] sm:text-xs text-foreground overflow-x-auto">
                  <code>{item.spec}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Deterministic Grounding & Cutoff Gate */}
      <section className="py-24 border-b border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-14 max-w-3xl">
            <h2 className="font-serif text-3xl sm:text-5xl tracking-[-0.02em] leading-[1.04] text-foreground">
              Zero-tolerance grounding. Calibrated silence.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-border pt-10">
            <ol className="lg:col-span-7 divide-y divide-border">
              {GROUNDING_BARRIERS.map((item) => (
                <li
                  key={item.step}
                  className="py-6 first:pt-0 last:pb-0 grid grid-cols-[36px_1fr] gap-4 items-baseline"
                >
                  <span className="font-mono text-xs text-subtle">
                    {item.step}
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-medium text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="lg:col-span-5 border border-border bg-surface p-6 space-y-5 font-mono text-xs">
              <div className="flex items-center justify-between text-muted-foreground pb-3 border-b border-border">
                <span>GROUNDING CONTRACT</span>
                <span className="text-foreground">DETERMINISTIC</span>
              </div>

              <pre className="leading-relaxed text-foreground overflow-x-auto text-[11px] sm:text-xs">
                <code>
                  <span className="text-muted-foreground">temperature</span>          = 0{"\n"}
                  <span className="text-muted-foreground">context_budget_chars</span> = 24000{"\n"}
                  <span className="text-muted-foreground">relevance_floor</span>      = 0.600{"\n"}
                  <span className="text-muted-foreground">confidence_cutoff</span>    = 0.600{"\n\n"}
                  effective_confidence = min({"\n"}
                  {"  "}llm_confidence,{"\n"}
                  {"  "}min(score(c) <span className="text-muted-foreground">for</span> c <span className="text-muted-foreground">in</span> citations){"\n"}
                  ){"\n\n"}
                  <span className="text-brand">if</span> retrieval.empty{"\n"}
                  {"  "}<span className="text-brand">or</span> unknown_chunk_id{"\n"}
                  {"  "}<span className="text-brand">or</span> effective_confidence &lt; 0.600:{"\n"}
                  {"    "}suppress_answer(){"\n"}
                  {"    "}stage_escalation_draft(ttl = 900s)
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Privacy-Minimal Telemetry & Two-Step Escalation */}
      <section className="py-24 border-b border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-14 max-w-3xl">
            <h2 className="font-serif text-3xl sm:text-5xl tracking-[-0.02em] leading-[1.04] text-foreground">
              Telemetry without surveillance. Escalation without noise.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-border lg:divide-x divide-border">
            <div className="py-10 lg:pr-12 border-b lg:border-b-0 border-border space-y-6">
              <h3 className="text-lg font-medium tracking-tight text-foreground">
                Privacy-Minimal Telemetry
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Execution diagnostics persist strictly operational metadata—query_id, channel, outcome, reason_code, confidence, latency_ms, and prompt_version_id—with zero question text and zero answer text in permanent logs.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Question text and citations exist temporarily inside an ephemeral draft table for at most 15 minutes (purged automatically every 60 s) and move to permanent escalation storage only after explicit user confirmation.
              </p>

              <pre className="p-4 border border-border bg-surface font-mono text-[11px] sm:text-xs text-foreground overflow-x-auto leading-relaxed">
                <code>
                  <span className="text-muted-foreground">diagnostics:</span> query_id, channel, outcome, reason_code,{"\n"}
                  {"             "}confidence, latency_ms, prompt_version_id{"\n"}
                  <span className="text-muted-foreground">drafts:</span>      query_id, question_text, citations,{"\n"}
                  {"             "}expires_at = now + 15m (purged every 60s)
                </code>
              </pre>
            </div>

            <div className="py-10 lg:pl-12 space-y-6">
              <h3 className="text-lg font-medium tracking-tight text-foreground">
                Transactional Escalation State Machine
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Caller-ownership checks in workplace chat and atomic draft consumption prevent double clicks and duplicate tickets—backed by transactional idempotency on query_id and automatic draft restoration on transient 503 failures.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every ticket advances through a strict finite state machine with immutable transition history recording the operator identifier and timestamp. CLOSED and CANCELLED are terminal states that lock response edits.
              </p>

              <pre className="p-4 border border-border bg-surface font-mono text-[11px] sm:text-xs text-foreground overflow-x-auto leading-relaxed">
                <code>
                  PENDING ──→ IN_PROGRESS ──→ RESOLVED ──→ CLOSED [terminal]{"\n"}
                  {"   "}│             │{"\n"}
                  {"   "}└──→ CANCELLED [terminal] ←──┘
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Operational Guarantees & Verification */}
      <section className="py-24 border-b border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-14 max-w-3xl">
            <h2 className="font-serif text-3xl sm:text-5xl tracking-[-0.02em] leading-[1.04] text-foreground">
              Built to survive real permissions and silent regressions.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 border-t border-border pt-12">
            {OPERATIONAL_GUARANTEES.map((item) => (
              <div
                key={item.title}
                className="space-y-3 pb-8 border-b border-border"
              >
                <h3 className="text-lg font-medium tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Operator Control Plane */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-serif text-3xl sm:text-5xl tracking-[-0.02em] text-foreground">
              Operator Control Plane.
            </h2>

            <a
              href={DASHBOARD_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mechanical-lever inline-flex items-center gap-2 font-mono text-xs text-foreground hover:text-brand uppercase"
            >
              <span>Open live control plane</span>
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="border border-border bg-background">
            <img
              src={controlPlaneImage}
              alt="SoVa operator control plane displaying outcome analytics, confidence scores, and latency distribution"
              className="w-full h-auto block"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-border pt-8">
            {CONTROL_PLANE_MODULES.map((item) => (
              <div key={item.title} className="space-y-2">
                <h3 className="text-sm font-medium text-foreground">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
