const TEAM = [
  {
    name: "Oleh Pona",
    role: "Team Lead & Java Core",
  },
  {
    name: "Vitalii Peleshko",
    role: ".NET Graph Ingestion & Slack Bot",
  },
  {
    name: "Dmytro Patsula",
    role: "Java Core & Diagnostics",
  },
  {
    name: "Maksym Hrechanyi",
    role: "Event Pipeline & Sync",
  },
  {
    name: "Vasyl Khrustiuk",
    role: "Next.js Dashboard & Schemas",
  },
  {
    name: "Andrii Bezpalko",
    role: "Python Search & Embeddings",
  },
  {
    name: "Taras Ivaniuk",
    role: "Access Control & Group Filtering",
  },
  {
    name: "Zakharii Abramchuk",
    role: "Infrastructure & API Contracts",
  },
];

export function TeamSection() {
  return (
    <section id="team" className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-4">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
            Built by Anything But .NET
          </h2>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="border-b border-border py-4 space-y-1"
            >
              <h3 className="text-base font-medium text-foreground">
                {member.name}
              </h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
