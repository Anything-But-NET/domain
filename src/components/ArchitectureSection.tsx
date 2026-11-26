const INGESTION_STEPS = [
  {
    step: "01",
    title: "Microsoft Graph & .NET Worker",
    body: "Runs on-demand SharePoint & Entra ID syncs, converts DOCX and PDF into clean Markdown, skips unchanged files, and publishes updates.",
  },
  {
    step: "02",
    title: "Python Embedding Service",
    body: "Structures document sections hierarchically, embeds passages with BAAI/bge-m3 over gRPC, and emits sync status events.",
  },
  {
    step: "03",
    title: "PostgreSQL Storage",
    body: "Stores indexed document sections and group permissions alongside synced metadata, users, and ingestion history.",
  },
];

const QUERY_STEPS = [
  {
    step: "01",
    title: "Slack Bot to Java Core",
    body: "Captures Slack events, assigns a trace ID in Spring Boot, and resolves the requester's current Entra ID groups.",
  },
  {
    step: "02",
    title: "Permission-Filtered Search",
    body: "Queries PostgreSQL filtered by allowed groups, merges parent context, and generates a grounded answer via Gemini.",
  },
  {
    step: "03",
    title: "Citations, Telemetry & Escalations",
    body: "Attaches SharePoint URLs, records diagnostics, or opens a 15-minute confirmation draft in Slack for expert review.",
  },
];

const EVALUATION_SPECS = [
  {
    metric: "100%",
    label: "Factual grounding & citations (40/40 golden set)",
  },
  {
    metric: "85.0%",
    label: "Answer relevance on 60-case golden set",
  },
  {
    metric: "70.0%",
    label: "Safe no-answer recall (0.60 confidence gate)",
  },
  {
    metric: "1,400 ms",
    label: "Avg latency across 156 live queries (69.2% answered)",
  },
];

export function ArchitectureSection() {
  return (
    <section id="architecture" className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="mb-14 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-foreground">
            Two decoupled pipelines.
          </h2>
        </div>

        {/* 2-Column Hairline Pipeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-b border-border lg:divide-x divide-border">
          {/* Column 1: Document & Permission Ingestion */}
          <div className="py-8 lg:pr-12 border-b lg:border-b-0 border-border">
            <h3 className="text-lg font-medium tracking-tight text-foreground pb-4 border-b border-border">
              Document &amp; Permission Ingestion
            </h3>
            <ol className="divide-y divide-border">
              {INGESTION_STEPS.map((item) => (
                <li
                  key={item.step}
                  className="py-6 last:pb-0 grid grid-cols-[36px_1fr] gap-4 items-baseline"
                >
                  <span className="font-mono text-xs text-subtle tabular-nums">
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

          {/* Column 2: Permission-Aware Query */}
          <div className="py-8 lg:pl-12">
            <h3 className="text-lg font-medium tracking-tight text-foreground pb-4 border-b border-border">
              Permission-Aware Query
            </h3>
            <ol className="divide-y divide-border">
              {QUERY_STEPS.map((item) => (
                <li
                  key={item.step}
                  className="py-6 last:pb-0 grid grid-cols-[36px_1fr] gap-4 items-baseline"
                >
                  <span className="font-mono text-xs text-subtle tabular-nums">
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

        {/* Quiet Evaluation & Telemetry Strip */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {EVALUATION_SPECS.map((spec) => (
            <div key={spec.label} className="space-y-2">
              <p className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                {spec.metric}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {spec.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
