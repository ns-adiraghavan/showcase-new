import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Mirrors the /demos/* rewrites in vercel.json for `npm run dev` / `npm run preview`.
const DEMOS = ["tcpl-ccm", "tcpl-audit-mentor"];
const demoRewrite = () => (req, _res, next) => {
  const m = req.url && req.url.match(/^\/demos\/([^/?#]+)\/?(\?.*)?$/);
  if (m && DEMOS.includes(m[1])) req.url = `/demo-files/${m[1]}.html${m[2] || ""}`;
  next();
};
const demoRoutes = {
  name: "demo-routes",
  configureServer(s) { s.middlewares.use(demoRewrite()); },
  configurePreviewServer(s) { s.middlewares.use(demoRewrite()); },
};

export default defineConfig({
  plugins: [react(), demoRoutes],
  build: {
    outDir: "dist",
  },
});
