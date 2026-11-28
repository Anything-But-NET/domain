export type ViewMode = "overview" | "architecture";

export const DASHBOARD_HREF = "https://dash.anythingbutdotnet.app";

export function readViewFromHash(): ViewMode {
  if (typeof window === "undefined") return "overview";
  return window.location.hash === "#architecture" ? "architecture" : "overview";
}

export function syncHashToView(view: ViewMode) {
  if (typeof window === "undefined") return;
  const targetHash = view === "architecture" ? "#architecture" : "";
  if (window.location.hash !== targetHash) {
    window.history.replaceState(
      null,
      "",
      targetHash || window.location.pathname + window.location.search
    );
  }
}

export function triggerWalkthroughPlayback() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("sova:play-walkthrough"));
  document.getElementById("walkthrough-film")?.scrollIntoView({ behavior: "smooth" });
}
