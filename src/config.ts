export const DEMO_HREF = "#walkthrough";
export const DASHBOARD_HREF = "https://dash.anythingbutdotnet.app";

export function triggerWalkthroughPlayback() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("sova:play-walkthrough"));
  document.getElementById("walkthrough")?.scrollIntoView({ behavior: "smooth" });
}
