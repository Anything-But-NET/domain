import { ArrowUpRight } from "lucide-react";
import { DASHBOARD_HREF } from "../config";

const INGESTION_RUNS = [
  {
    document: "db-migrations.md",
    status: "COMPLETED",
    tone: "text-success",
  },
  {
    document: "Policy.md",
    status: "COMPLETED",
    tone: "text-success",
  },
  {
    document: "q4_2026_budget_and_payroll_confidential.md",
    status: "COMPLETED",
    tone: "text-success",
  },
];

export function ProductCapabilities() {
  return (
    <section id="product" className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="mb-14 max-w-2xl">
          <p className="text-sm text-muted-foreground">Capabilities</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-foreground">
            Built for enterprise governance.
          </h2>
        </div>

        {/* Architectural 2x2 Hairline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border bg-background/40">
          {/* 01: SQL ACLs & STAR hierarchical retrieval */}
          <div className="border-r border-b border-border p-7 sm:p-10 flex flex-col justify-between gap-8">
            <div className="space-y-2.5">
              <h3 className="text-lg font-medium tracking-tight text-foreground">
                Pre-retrieval SQL RBAC &amp; STAR trees
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Directory group permissions filter leaf nodes in PostgreSQL using pgvector iterative HNSW scans before STAR bottom-up auto-merge reconstructs parent heading context.
              </p>
            </div>

            <pre className="font-mono text-xs text-muted-foreground leading-relaxed overflow-x-auto pt-4 border-t border-border">
              <code>
                <span className="text-foreground">WHERE</span> d.allowed_groups{" "}
                <span className="text-brand">&amp;&amp;</span> user_groups{" "}
                <span className="text-foreground">AND</span> vn.children_count = 0
                {"\n"}
                <span className="text-foreground">ORDER BY</span> vn.embedding{" "}
                <span className="text-brand">&lt;=&gt;</span> $query_vec{" "}
                <span className="text-foreground">LIMIT</span> 8
              </code>
            </pre>
          </div>

          {/* 02: Grounded citations & prompt versioning */}
          <div className="border-r border-b border-border p-7 sm:p-10 flex flex-col justify-between gap-8">
            <div className="space-y-2.5">
              <h3 className="text-lg font-medium tracking-tight text-foreground">
                Verified citations &amp; prompt versions
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Claims resolve to exact SharePoint URLs from <span className="font-mono text-xs text-foreground">core.document_metadata</span> while rejecting unretrieved chunk IDs. Prompts are hashed with UUIDv5 and scoped to outcome analytics.
              </p>
            </div>

            <div className="pt-4 border-t border-border space-y-1.5">
              <div className="flex items-center justify-between gap-4 text-xs font-mono">
                <span className="text-foreground truncate">
                  [1] remote_work_hardware_allowance_old.md
                </span>
                <span className="text-muted-foreground shrink-0">prompt fdf8ab35</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                &ldquo;One-time $500 allowance... submit in Expensify / Rippling within 30 calendar days.&rdquo;
              </p>
            </div>
          </div>

          {/* 03: Two-step human escalation */}
          <div className="border-r border-b border-border p-7 sm:p-10 flex flex-col justify-between gap-8">
            <div className="space-y-2.5">
              <h3 className="text-lg font-medium tracking-tight text-foreground">
                Two-step Slack escalation queue
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Below the 0.60 confidence gate or on empty retrieval, SoVa pauses and posts a 15-minute confirmation draft in Slack. Confirmed questions enter the Control Plane queue with full status history.
              </p>
            </div>

            <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
              <span className="text-warning">LOW_CONFIDENCE (0.310 &lt; 0.60)</span>
              <span className="text-muted-foreground">
                Slack confirm → /escalations (PENDING)
              </span>
            </div>
          </div>

          {/* 04: Operator Control Plane */}
          <div className="border-r border-b border-border p-7 sm:p-10 flex flex-col justify-between gap-8">
            <div className="space-y-2.5">
              <h3 className="text-lg font-medium tracking-tight text-foreground">
                Operator Control Plane &amp; Analytics
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Track answer rates, p95 latency, confidence tiers, prompt metrics, operator authorities, and SharePoint ingestion runs across 50 documents and 25 synced users.
              </p>
            </div>

            <div className="pt-4 border-t border-border space-y-2.5">
              {INGESTION_RUNS.map((row) => (
                <div
                  key={row.document}
                  className="flex items-center justify-between gap-4 text-xs font-mono"
                >
                  <span className="text-muted-foreground truncate">
                    {row.document}
                  </span>
                  <span className={row.tone}>{row.status}</span>
                </div>
              ))}
              <div className="pt-2">
                <a
                  href={DASHBOARD_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:text-brand transition-colors focus-visible:outline-1 focus-visible:outline-brand"
                >
                  <span>Open live dashboard</span>
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
