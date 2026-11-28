import { useCallback, useEffect, useState } from "react";
import { ClosingFooter } from "./components/ClosingFooter";
import { Header } from "./components/Header";
import { HorizonView } from "./components/HorizonView";
import { OpenEngineView } from "./components/OpenEngineView";
import { TeamSection } from "./components/TeamSection";
import { type DepthMode, readDepthFromHash, syncHashToDepth } from "./config";

export function App() {
  const [depth, setDepth] = useState<DepthMode>(() => readDepthFromHash());

  useEffect(() => {
    const onHashChange = () => {
      setDepth(readDepthFromHash());
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleSelectDepth = useCallback((next: DepthMode) => {
    setDepth(next);
    syncHashToDepth(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-brand selection:text-foreground flex flex-col">
      <Header depth={depth} onSelectDepth={handleSelectDepth} />

      <main className="flex-1">
        {depth === "horizon" ? (
          <HorizonView onSelectDepth={handleSelectDepth} />
        ) : (
          <OpenEngineView onSelectDepth={handleSelectDepth} />
        )}

        <TeamSection />
      </main>

      <ClosingFooter depth={depth} onSelectDepth={handleSelectDepth} />
    </div>
  );
}

export default App;
