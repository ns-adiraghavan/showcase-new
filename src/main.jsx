import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Research from "./Research.jsx";

// ─── Minimal path router — no dependency needed ───────────────────
// Watches window.location.pathname and re-renders on popstate/pushstate.
// All paths under /research → Research microsite.
// Everything else → main NetscribesShowcase.

function usePathname() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const sync = () => setPath(window.location.pathname);
    window.addEventListener("popstate", sync);
    // Also catch programmatic navigation (pushState/replaceState)
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
  // Match /research and any sub-path under it
  if (path === "/research" || path.startsWith("/research/")) {
    return <Research />;
  }
  return <App />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
