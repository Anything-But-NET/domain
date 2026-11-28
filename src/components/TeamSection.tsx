const TEAM = [
  {
    name: "Oleh Pona",
    role: "Team Lead & Resolution Core",
  },
  {
    name: "Vitalii Peleshko",
    role: "Corpus Ingestion & Workplace Interface",
  },
  {
    name: "Dmytro Patsula",
    role: "Resolution Core & Trace Diagnostics",
  },
  {
    name: "Maksym Hrechanyi",
    role: "Event Pipeline & Synchronization",
  },
  {
    name: "Vasyl Khrustiuk",
    role: "Control Plane & Data Schemas",
  },
  {
    name: "Andrii Bezpalko",
    role: "Semantic Retrieval & Vector Indexing",
  },
  {
    name: "Taras Ivaniuk",
    role: "Clearance Enforcement & Group Filtering",
  },
  {
    name: "Zakharii Abramchuk",
    role: "Infrastructure & Service Contracts",
  },
];

export function TeamSection() {
  return (
    <section id="team" className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-4 space-y-3">
          <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground">
            Colophon // Craft
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-[-0.02em] text-foreground">
            Engineered by Anything But .NET.
          </h2>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 border-t border-border">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="border-b border-border py-4 space-y-1"
            >
              <h3 className="text-base font-medium text-foreground">
                {member.name}
              </h3>
              <p className="font-mono text-xs text-muted-foreground">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
