const INGESTION_STEPS = [
  {
    step: "01",
    title: "Microsoft Graph & .NET Worker",
    body: "Polls SharePoint libraries and Active Directory groups, converts PDF/DOCX into clean Markdown, and tracks changes via SHA-256 content hashes.",
  },
  {
    step: "02",
    title: "Apache Kafka Event Bus",
    body: "Decouples document ingestion, ACL updates, and sync status across dedicated topics.",
  },
  {
    step: "03",
    title: "PyTorch gRPC Vectorizer & Java Core",
    body: "Generates hierarchical section embeddings into PostgreSQL (pgvector HNSW index) while syncing document metadata and permissions for the Admin UI.",
  },
];

const QUERY_STEPS = [
  {
    step: "01",
    title: "Slack & Teams to Java Core",
    body: "Incoming employee questions receive a trace ID and resolve the requester's current directory security groups.",
  },
  {
    step: "02",
    title: "SQL-Filtered Python RAG",
    body: "Runs vector search strictly inside authorized chunks (allowed_groups && user_groups) and merges parent heading context.",
  },
  {
    step: "03",
    title: "Citation Enrichment or Escalation",
    body: "Returns strict JSON citations enriched with direct SharePoint links, or flags low-confidence queries for specialist triage.",
  },
];

const EVALUATION_SPECS = [
  {
    metric: ">85%",
    label: "Faithfulness to retrieved SharePoint sources",
  },
  {
    metric: ">90%",
    label: "Citation precision to exact section",
  },
  {
    metric: ">90%",
    label: "Escalation recall on unanswerable queries",
  },
  {
    metric: "SQL-first",
    label: "Pre-retrieval RBAC before LLM context",
  },
];

export function ArchitectureSection() {
  return (
    <section id="architecture" className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="mb-14 max-w-2xl">
          <p className="text-sm text-muted-foreground">Architecture</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-medium tracking-tight text-foreground">
            Two decoupled pipelines.
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Document synchronization runs asynchronously so live queries stay fast and deterministic.
          </p>
        </div>

        {/* 2-Column Airy Pipeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Column 1: Continuous Ingestion & Sync */}
          <div>
            <h3 className="text-lg font-medium tracking-tight text-foreground pb-4 border-b border-border">
              Continuous Ingestion &amp; Sync
            </h3>
            <ol className="divide-y divide-border">
              {INGESTION_STEPS.map((item) => (
                <li
                  key={item.step}
                  className="py-6 grid grid-cols-[36px_1fr] gap-4 items-baseline"
                >
                  <span className="text-sm text-subtle tabular-nums">
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
          <div>
            <h3 className="text-lg font-medium tracking-tight text-foreground pb-4 border-b border-border">
              Permission-Aware Query
            </h3>
            <ol className="divide-y divide-border">
              {QUERY_STEPS.map((item) => (
                <li
                  key={item.step}
                  className="py-6 grid grid-cols-[36px_1fr] gap-4 items-baseline"
                >
                  <span className="text-sm text-subtle tabular-nums">
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

        {/* Quiet Evaluation Spec Strip */}
        <div className="mt-16 pt-12 border-t border-border grid grid-cols-2 lg:grid-cols-4 gap-8">
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
