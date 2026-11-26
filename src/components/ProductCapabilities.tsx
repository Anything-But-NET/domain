import { ArrowUpRight } from "lucide-react";
import { DASHBOARD_HREF } from "../config";

const INGESTION_RUNS = [
  {
    document: "Engineering Runbook",
    status: "COMPLETED",
    tone: "text-success",
  },
  {
    document: "Company Policy",
    status: "COMPLETED",
    tone: "text-success",
  },
  {
    document: "Q4 Budget & Payroll",
    status: "COMPLETED",
    tone: "text-success",
  },
];

export function ProductCapabilities() {
  return (
    <section id="product" className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="mb-14 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-foreground">
            Built for enterprise governance.
          </h2>
        </div>

        {/* Architectural 2x2 Hairline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border bg-background/40">
          {/* 01: Access-filtered search */}
          <div className="border-r border-b border-border p-7 sm:p-10 flex flex-col justify-between gap-8">
            <div className="space-y-2.5">
              <h3 className="text-lg font-medium tracking-tight text-foreground">
                Permission-aware search
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Directory group permissions are checked in PostgreSQL before ranking, so people only get answers from SharePoint files they can already open.
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

          {/* 02: Verified citations */}
          <div className="border-r border-b border-border p-7 sm:p-10 flex flex-col justify-between gap-8">
            <div className="space-y-2.5">
              <h3 className="text-lg font-medium tracking-tight text-foreground">
                Verified citations
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every claim links directly to its exact SharePoint source document while ignoring unverified passages.
              </p>
            </div>

            <div className="pt-4 border-t border-border space-y-1.5">
              <div className="flex items-center justify-between gap-4 text-xs font-mono">
                <span className="text-foreground truncate">
                  [1] Remote Work Hardware Policy
                </span>
                <span className="text-muted-foreground shrink-0">SharePoint</span>
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
                Two-step Slack escalation
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Below the 0.60 confidence gate or when no match is found, SoVa pauses in Slack and asks before sending the question to an expert.
              </p>
            </div>

            <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
              <span className="text-warning">Low confidence (0.31 &lt; 0.60)</span>
              <span className="text-muted-foreground">
                Slack confirm → Review queue
              </span>
            </div>
          </div>

          {/* 04: Operator Dashboard & Analytics */}
          <div className="border-r border-b border-border p-7 sm:p-10 flex flex-col justify-between gap-8">
            <div className="space-y-2.5">
              <h3 className="text-lg font-medium tracking-tight text-foreground">
                Operator dashboard &amp; analytics
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Track answer rates, response latency, confidence tiers, and SharePoint sync runs across 50 documents and 25 synced users.
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
