import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { DASHBOARD_HREF } from "../config";

type CapabilityId = "access" | "citations" | "escalation" | "control-plane";
type DirectoryRole = "hr-exec" | "engineering";

const CAPABILITIES: {
  id: CapabilityId;
  title: string;
  description: string;
}[] = [
  {
    id: "access",
    title: "Pre-retrieval access control",
    description:
      "Directory group permissions are filtered at the database level before the model sees a single token. Restricted HR or finance files never enter the prompt context.",
  },
  {
    id: "citations",
    title: "Section-level SharePoint citations",
    description:
      "Every factual claim maps back to an exact document title, heading, and direct SharePoint link so employees verify answers in one click.",
  },
  {
    id: "escalation",
    title: "Automatic specialist escalation",
    description:
      "When document evidence is missing or confidence falls below threshold, generation stops and the query routes to the owning team with diagnostics.",
  },
  {
    id: "control-plane",
    title: "Operator Control Plane",
    description:
      "IT and Operations teams get full visibility into SharePoint sync runs, file hashes, active directory groups, and parsing failures from one dashboard.",
  },
];

const FALLBACK_SYNC_ROWS = [
  {
    document: "Remote_Work_Policy_2026.docx",
    site: "People Ops",
    status: "Synced (42 sections)",
    tone: "text-success",
  },
  {
    document: "Q3_Comp_Bands.pdf",
    site: "People Ops / Restricted",
    status: "Synced (18 sections)",
    tone: "text-success",
  },
  {
    document: "Incident_Response_Runbook.md",
    site: "Engineering",
    status: "Synced (31 sections)",
    tone: "text-success",
  },
  {
    document: "Legacy_VPN_Setup_2021.pdf",
    site: "IT Support Archive",
    status: "Skipped (scanned image PDF)",
    tone: "text-warning",
  },
];

export function ProductCapabilities() {
  const [activeId, setActiveId] = useState<CapabilityId>("access");
  const [role, setRole] = useState<DirectoryRole>("hr-exec");
  const [logsImageMissing, setLogsImageMissing] = useState(false);

  return (
    <section id="product" className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="mb-14 max-w-2xl">
          <p className="text-sm text-muted-foreground">Capabilities</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-medium tracking-tight text-foreground">
            Built for enterprise governance.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: 4 Clean Interactive Accordion Tabs */}
          <div
            role="tablist"
            aria-label="Product capabilities"
            className="lg:col-span-5 border-b border-border"
          >
            {CAPABILITIES.map((item) => {
              const isActive = item.id === activeId;
              return (
                <div key={item.id} className="border-t border-border">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveId(item.id)}
                    className={`w-full text-left py-5 pl-5 border-l-2 transition-colors focus-visible:outline-1 focus-visible:outline-brand ${
                      isActive
                        ? "border-brand text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="block text-base sm:text-lg font-medium tracking-tight">
                      {item.title}
                    </span>
                    {isActive && (
                      <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed pr-2">
                        {item.description}
                      </p>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right Column: ONE Generous, Uncluttered Stage */}
          <div className="lg:col-span-7 border border-border bg-card p-6 sm:p-10 min-h-[380px] flex flex-col justify-center">
            {activeId === "access" && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-border">
                  <span className="text-sm text-muted-foreground">
                    Directory group parameter
                  </span>
                  <div
                    role="group"
                    aria-label="Select directory group"
                    className="flex items-center gap-6 text-sm"
                  >
                    <button
                      type="button"
                      aria-pressed={role === "hr-exec"}
                      onClick={() => setRole("hr-exec")}
                      className={`pb-1 border-b-2 transition-colors focus-visible:outline-1 focus-visible:outline-brand ${
                        role === "hr-exec"
                          ? "border-brand text-foreground font-medium"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      hr-exec
                    </button>
                    <button
                      type="button"
                      aria-pressed={role === "engineering"}
                      onClick={() => setRole("engineering")}
                      className={`pb-1 border-b-2 transition-colors focus-visible:outline-1 focus-visible:outline-brand ${
                        role === "engineering"
                          ? "border-brand text-foreground font-medium"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      engineering
                    </button>
                  </div>
                </div>

                <pre className="font-mono text-xs sm:text-sm leading-relaxed text-foreground overflow-x-auto">
                  <code>
                    <span className="text-muted-foreground">SELECT</span> d.title, c.section_path, c.content{"\n"}
                    <span className="text-muted-foreground">FROM</span> document_chunks c{"\n"}
                    <span className="text-muted-foreground">JOIN</span> document_metadata d{" "}
                    <span className="text-muted-foreground">ON</span> d.id = c.document_id{"\n"}
                    <span className="text-muted-foreground">WHERE</span> d.allowed_groups{" "}
                    <span className="text-brand">&amp;&amp;</span>{" "}
                    <span className="text-foreground">ARRAY[&apos;{role}&apos;]</span>{"\n"}
                    <span className="text-muted-foreground">ORDER BY</span> c.embedding{" "}
                    <span className="text-brand">&lt;=&gt;</span> $query_vector{"\n"}
                    <span className="text-muted-foreground">LIMIT</span> 5;
                  </code>
                </pre>

                <div className="pt-5 border-t border-border text-sm">
                  {role === "hr-exec" ? (
                    <p className="text-success">
                      3 chunks matched — <span className="font-mono">Q3_Comp_Bands.pdf</span> (Section 2.1)
                    </p>
                  ) : (
                    <p className="text-warning">
                      0 rows returned — restricted document excluded before retrieval
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeId === "citations" && (
              <div className="space-y-7">
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Verified response in Slack
                  </p>
                  <p className="text-base sm:text-lg text-foreground leading-relaxed">
                    Full-time remote employees receive up to $1,200 every 24 months for workspace equipment, including ergonomic chairs and external displays{" "}
                    <span className="font-mono text-sm text-brand">[1]</span>. Receipts must be submitted in Workday within 30 days of purchase.
                  </p>
                </div>

                <div className="pt-6 border-t border-border space-y-2.5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-foreground">
                      [1] Remote Work Policy
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                      <span>People Ops / Section 3.2</span>
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    &ldquo;Equipment allowance covers desks, ergonomic seating, and monitors up to $1,200 per 24-month cycle for full-time remote staff.&rdquo;
                  </p>
                </div>
              </div>
            )}

            {activeId === "escalation" && (
              <div className="space-y-6">
                <div className="pb-6 border-b border-border space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Employee query outside policy coverage
                  </p>
                  <p className="text-base text-foreground">
                    &ldquo;Can I carry over my unused home-office stipend balance into next year&apos;s conference travel budget?&rdquo;
                  </p>
                </div>

                <pre className="font-mono text-xs sm:text-sm leading-relaxed text-foreground overflow-x-auto">
                  <code>
                    {`{
  "outcome": `}
                    <span className="text-warning">&quot;ESCALATED_TO_EXPERT&quot;</span>
                    {`,
  "insufficient_evidence": `}
                    <span className="text-brand">true</span>
                    {`,
  "confidence": 0.38,
  "threshold": 0.75,
  "routed_to": "people-ops"
}`}
                  </code>
                </pre>
              </div>
            )}

            {activeId === "control-plane" && (
              <div>
                {!logsImageMissing ? (
                  <img
                    src="/control-plane-logs.png"
                    alt="SoVa Copilot Control Plane sync status"
                    onError={() => setLogsImageMissing(true)}
                    className="w-full h-auto block"
                  />
                ) : (
                  <div className="space-y-6">
                    <div className="divide-y divide-border">
                      {FALLBACK_SYNC_ROWS.map((row) => (
                        <div
                          key={row.document}
                          className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm"
                        >
                          <div>
                            <span className="text-foreground font-medium">
                              {row.document}
                            </span>
                            <span className="text-muted-foreground ml-3">
                              {row.site}
                            </span>
                          </div>
                          <span className={row.tone}>{row.status}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-5 border-t border-border">
                      <a
                        href={DASHBOARD_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-brand transition-colors focus-visible:outline-1 focus-visible:outline-brand"
                      >
                        <span>Open live dashboard</span>
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
