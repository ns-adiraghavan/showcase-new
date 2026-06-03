import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Research from "./Research.jsx";
import IndustryResearch from "./IndustryResearch.jsx";
import TechAlt from "./TechAlt.jsx";

// ─── Minimal path router ──────────────────────────────────────────
// Watches window.location.pathname and re-renders on popstate/pushstate.
//   /research                → Research index (existing page, untouched)
//   /research/:industry      → IndustryResearch for that industry slug
//   /research/tech1          → Alt layout for Tech & Software (team comparison)
//   everything else          → main App

const INDUSTRY_SLUGS = ["tech","telecom","retail","fnb","auto","bfsi","mfg","health"];

function usePathname() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const sync = () => setPath(window.location.pathname);
    window.addEventListener("popstate", sync);
    const origPush    = history.pushState.bind(history);
    const origReplace = history.replaceState.bind(history);
    history.pushState    = (...a) => { origPush(...a);    sync(); };
    history.replaceState = (...a) => { origReplace(...a); sync(); };
    return () => window.removeEventListener("popstate", sync);
  }, []);
  return path;
}

function Root() {
  const path = usePathname();

  // /research/automotive  →  industryId = "auto"  (slug aliases below)
  // /research/tech        →  industryId = "tech"
  // etc.
  const SLUG_ALIASES = {
    automotive: "auto",
    finance:    "bfsi",
    "food-and-beverage": "fnb",
    manufacturing: "mfg",
    healthcare: "health",
    technology: "tech",
    telecommunications: "telecom",
    "retail-ecommerce": "retail",
  };

  if (path === "/research") {
    return <Research />;
  }

  // Alt layout: Tech & Software — team comparison build
  if (path === "/research/tech1") {
    return <TechAlt industryId="tech" />;
  }

  if (path.startsWith("/research/")) {
    const slug = path.replace("/research/", "").toLowerCase();
    // Accept both the short id ("auto") and friendly aliases ("automotive")
    const industryId = SLUG_ALIASES[slug] || (INDUSTRY_SLUGS.includes(slug) ? slug : null);
    if (industryId) {
      return <IndustryResearch industryId={industryId} />;
    }
    // Unknown slug — fall back to Research index
    return <Research />;
  }

  return <App />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
