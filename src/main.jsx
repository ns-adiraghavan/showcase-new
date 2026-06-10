import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Research from "./Research.jsx";
import IndustryResearch from "./IndustryResearch.jsx";

// ─── Minimal path router ──────────────────────────────────────────
//   /research                → Research index
//   /research/:industry      → IndustryResearch for that industry slug
//   /research/tech1          → IndustryResearch with industryId="tech" (alt layout, now the standard)
//   everything else          → main App

const INDUSTRY_SLUGS = ["tech","telecom","retail","fnb","auto","bfsi","mfg","health"];

const SLUG_ALIASES = {
  automotive:          "auto",
  finance:             "bfsi",
  "food-and-beverage": "fnb",
  manufacturing:       "mfg",
  healthcare:          "health",
  technology:          "tech",
  telecommunications:  "telecom",
  "retail-ecommerce":  "retail",
  tech1:               "tech",
  tech2:               "tech",
};

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

  if (path === "/research") {
    return <Research />;
  }

  if (path.startsWith("/research/")) {
    const slug = path.replace("/research/", "").toLowerCase();

    const industryId = SLUG_ALIASES[slug] || (INDUSTRY_SLUGS.includes(slug) ? slug : null);
    if (industryId) {
      return <IndustryResearch industryId={industryId} />;
    }

    return <Research />;
  }

  return <App />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
