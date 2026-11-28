export type DepthMode = "horizon" | "engine";

export const DASHBOARD_HREF = "https://dash.anythingbutdotnet.app";

export function readDepthFromHash(): DepthMode {
  if (typeof window === "undefined") return "horizon";
  return window.location.hash === "#engine" ? "engine" : "horizon";
}

export function syncHashToDepth(depth: DepthMode) {
  if (typeof window === "undefined") return;
  const targetHash = depth === "engine" ? "#engine" : "";
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
  document.getElementById("specimen-film")?.scrollIntoView({ behavior: "smooth" });
}
