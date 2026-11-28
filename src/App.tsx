import { useCallback, useEffect, useState } from "react";
import { ArchitectureView } from "./components/ArchitectureView";
import { ClosingFooter } from "./components/ClosingFooter";
import { Header } from "./components/Header";
import { OverviewView } from "./components/OverviewView";
import { TeamSection } from "./components/TeamSection";
import { readViewFromHash, syncHashToView, type ViewMode } from "./config";

export function App() {
  const [view, setView] = useState<ViewMode>(() => readViewFromHash());

  useEffect(() => {
    const onHashChange = () => {
      setView(readViewFromHash());
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleSelectView = useCallback((next: ViewMode) => {
    setView(next);
    syncHashToView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-brand selection:text-foreground flex flex-col">
      <Header view={view} onSelectView={handleSelectView} />

      <main className="flex-1">
        {view === "overview" ? (
          <OverviewView onSelectView={handleSelectView} />
        ) : (
          <ArchitectureView onSelectView={handleSelectView} />
        )}

        <TeamSection />
      </main>

      <ClosingFooter view={view} onSelectView={handleSelectView} />
    </div>
  );
}

export default App;
