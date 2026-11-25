const INGESTION_STEPS = [
  {
    step: "01",
    title: "Microsoft Graph & .NET 10 Worker",
    body: "Runs on-demand SharePoint & Entra ID syncs, converts DOCX/PDF via Mammoth and PdfPig into Markdown, deduplicates unchanged payloads in memory via SHA-256, and publishes to Kafka.",
  },
  {
    step: "02",
    title: "Python FastAPI & gRPC STAR Vectorizer",
    body: "Consumes rag.documents.ingestion.v1, embeds hierarchical trees with BAAI/bge-m3 (1024-dim Late Chunking + self-attention pooling over gRPC), and emits rag.sync.status.v1.",
  },
  {
    step: "03",
    title: "Dual-Schema PostgreSQL (rag & core)",
    body: "Stores leaf/parent vectors in rag.vector_nodes (pgvector HNSW) and group ACLs in rag.document, while Java Core syncs document metadata, users, and sync runs into core.*.",
  },
];

const QUERY_STEPS = [
  {
    step: "01",
    title: "Slack Bot (.NET 10) to Java Core",
    body: "Captures Slack events, assigns a trace ID in Spring Boot, and resolves the requester's current Entra ID allowed_groups from core.users.",
  },
  {
    step: "02",
    title: "SQL-Filtered STAR RAG & Guardrails",
    body: "Executes hnsw.iterative_scan filtered by allowed_groups, merges parent nodes (0.50 threshold, 0.06 anti-dilution guard), and generates grounded JSON via google/gemini-3.5-flash-lite.",
  },
  {
    step: "03",
    title: "Citations, Telemetry & Escalations",
    body: "Enriches SharePoint URLs, writes outcomes to core.generation_diagnostics, or opens a 15-minute Slack confirmation draft promoting to core.escalations.",
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
          <p className="text-sm text-muted-foreground">Architecture</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-foreground">
            Two decoupled pipelines.
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Kafka-decoupled document ingestion writes to PostgreSQL asynchronously so live Slack queries stay deterministic.
          </p>
        </div>

        {/* 2-Column Hairline Pipeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-b border-border lg:divide-x divide-border">
          {/* Column 1: Document & ACL Ingestion */}
          <div className="py-8 lg:pr-12 border-b lg:border-b-0 border-border">
            <h3 className="text-lg font-medium tracking-tight text-foreground pb-4 border-b border-border">
              Document &amp; ACL Ingestion
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
