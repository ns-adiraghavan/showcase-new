// ─── /research/tech1 — Technology industry filtered view (alt layout) ──
// Renders all Tech & Software cases with Study Type + Region filters,
// landing directly in the panel view. The Industry/Study Type/Region
// toggle bar is replaced by the industry paragraph description.

import { useState, useEffect } from "react";
import logoSrc from "./assets/netscribes-logo.png";
import {
  NS, SECTORS, STUDY_TYPES, RESEARCH_DATA, GEO_REGIONS, INDUSTRY_HERO,
} from "./researchData";

// ─── Logo ─────────────────────────────────────────────────────────
function Logo({ height = 19, opacity = 0.85 }) {
  return <img src={logoSrc} alt="Netscribes" style={{ height, opacity, objectFit:"contain", display:"block" }} />;
}

// ─── Scroll lock ──────────────────────────────────────────────────
function useLock(on) {
  useEffect(() => {
    document.body.style.overflow = on ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [on]);
}

// ─── Case Viewer ──────────────────────────────────────────────────
function CaseViewer({ item, accent, onClose }) {
  useLock(true);
  useEffect(() => {
    const h = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  const sector = SECTORS.find(s => s.id === item.industry);
  const study  = STUDY_TYPES.find(s => s.id === item.studyType);
  return (
    <div onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position:"fixed",inset:0,zIndex:4000,background:"rgba(15,27,39,0.82)",
        backdropFilter:"blur(10px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24 }}>
      <div style={{ background:NS.surface,borderRadius:3,width:"100%",maxWidth:900,maxHeight:"92vh",
        display:"flex",flexDirection:"column",boxShadow:"0 40px 100px rgba(0,0,0,0.35)",animation:"rc-pop 0.2s ease both" }}>
        <div style={{ height:4,background:accent,borderRadius:"3px 3px 0 0",flexShrink:0 }} />
        <div style={{ padding:"20px 24px 16px",borderBottom:`1px solid ${NS.rule}`,flexShrink:0 }}>
          <div style={{ display:"flex",alignItems:"flex-start",gap:16,justifyContent:"space-between" }}>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex",gap:6,marginBottom:9,flexWrap:"wrap" }}>
                {study  && <span style={{ fontSize:10,fontWeight:700,letterSpacing:"0.11em",textTransform:"uppercase",color:study.accent,background:`${study.accent}14`,padding:"2px 7px",borderRadius:2 }}>{study.label}</span>}
                {sector && <span style={{ fontSize:10,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:sector.accent,background:`${sector.accent}12`,padding:"2px 7px",borderRadius:2 }}>{sector.label}</span>}
                {item.primaryType && <span style={{ fontSize:10,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:NS.muted,background:NS.paperDeep,padding:"2px 7px",borderRadius:2 }}>{item.primaryType}</span>}
                {item.geo.slice(0,3).map(g => <span key={g} style={{ fontSize:10,fontWeight:500,color:NS.muted,background:NS.paperDeep,padding:"2px 7px",borderRadius:2 }}>{g}</span>)}
              </div>
              <h2 style={{ fontSize:"clamp(15px,1.8vw,19px)",fontWeight:700,color:NS.ink,lineHeight:1.35,letterSpacing:"-0.015em",textWrap:"balance" }}>{item.title}</h2>
              <p style={{ marginTop:5,fontSize:13,color:NS.muted,lineHeight:1.6,maxWidth:600 }}>{item.desc}</p>
              <a href={item.driveViewUrl} target="_blank" rel="noreferrer"
                style={{ display:"inline-flex",alignItems:"center",gap:5,marginTop:9,fontSize:11,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:accent,textDecoration:"none" }}>
                Open in Drive ↗
              </a>
            </div>
            <button onClick={onClose}
              style={{ flexShrink:0,width:30,height:30,borderRadius:"50%",border:`1px solid ${NS.rule}`,background:NS.paper,cursor:"pointer",fontSize:14,color:NS.muted,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif" }}>✕</button>
          </div>
        </div>
        <div style={{ flex:1,minHeight:0,background:NS.paperDeep }}>
          <iframe src={item.driveEmbedUrl} title={item.title}
            style={{ width:"100%",height:"100%",minHeight:460,border:"none" }} allow="autoplay" />
        </div>
      </div>
    </div>
  );
}

// ─── Pill button ──────────────────────────────────────────────────
function PillBtn({ label, active, color, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ fontSize:11,fontWeight:active?700:500,
        color:active?"#fff":(hov?color:NS.muted),
        background:active?color:(hov?`${color}10`:"transparent"),
        border:`1px solid ${active?color:(hov?color:NS.rule)}`,
        borderRadius:2,padding:"4px 11px",cursor:"pointer",
        transition:"all 0.15s",fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap" }}>
      {label}
    </button>
  );
}

// ─── Case Tile ────────────────────────────────────────────────────
function CaseTile({ item, accent, onOpen }) {
  const [hov, setHov] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const sector       = SECTORS.find(s => s.id === item.industry);
  const sectorAccent = sector?.accent || accent;
  const sectorLabel  = sector?.label || item.industry;
  const indBg   = hov ? "rgba(255,255,255,0.14)" : `${sectorAccent}12`;
  const indCol  = hov ? "rgba(255,255,255,0.85)" : sectorAccent;
  const muteBg  = hov ? "rgba(255,255,255,0.14)" : NS.paperDeep;
  const muteCol = hov ? "rgba(255,255,255,0.75)" : NS.muted;
  const showDesc = hov || summaryOpen;
  return (
    <div onClick={() => onOpen(item)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background:hov?accent:NS.surface,
        border:`1.5px solid ${hov?accent:NS.rule}`,
        borderRadius:3,padding:"16px 18px",cursor:"pointer",
        transition:"background 0.18s ease,border-color 0.18s ease,box-shadow 0.18s ease,transform 0.18s ease",
        transform:hov?"translateY(-2px)":"none",
        boxShadow:hov?`0 8px 24px ${accent}22`:"none" }}>
      <div style={{ display:"flex",justifyContent:"space-between",gap:8,marginBottom:8 }}>
        <p style={{ fontSize:13,fontWeight:700,color:hov?"#fff":NS.ink,lineHeight:1.35,flex:1,transition:"color 0.18s",textWrap:"balance" }}>{item.title}</p>
        <span style={{ color:hov?"rgba(255,255,255,0.8)":accent,fontSize:15,flexShrink:0,transition:"color 0.18s" }}>↗</span>
      </div>
      <div style={{ display:"flex",gap:4,flexWrap:"wrap",marginTop:4 }}>
        {(() => { const st = STUDY_TYPES.find(s=>s.id===item.studyType); const stCol = st?.accent||accent; return <span style={{ fontSize:9,padding:"2px 6px",borderRadius:2,background:hov?"rgba(255,255,255,0.18)":`${stCol}15`,color:hov?"#fff":stCol,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",transition:"all 0.18s" }}>{item.studyType}</span>; })()}
        <span style={{ fontSize:9,padding:"2px 6px",borderRadius:2,background:indBg,color:indCol,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",transition:"all 0.18s" }}>{sectorLabel}</span>
        {item.primaryType && <span style={{ fontSize:9,padding:"2px 6px",borderRadius:2,background:muteBg,color:muteCol,fontWeight:600,transition:"all 0.18s" }}>{item.primaryType}</span>}
        {item.geo.map(g => <span key={g} style={{ fontSize:9,padding:"2px 6px",borderRadius:2,background:muteBg,color:muteCol,transition:"all 0.18s" }}>{g}</span>)}
      </div>
      {item.desc && (
        <div style={{ maxHeight:showDesc?"120px":"0",overflow:"hidden",transition:"max-height 0.22s ease" }}>
          <p style={{ fontSize:11.5,lineHeight:1.55,color:hov?"rgba(255,255,255,0.88)":NS.inkSoft,marginTop:10,transition:"color 0.18s" }}>{item.desc}</p>
        </div>
      )}
    </div>
  );
}

// ─── Inline SVG icons (Lucide-style, open source) ─────────────────
const ICONS = {
  cpu: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
      <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
      <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
      <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
      <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
    </svg>
  ),
  barChart: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  ),
  network: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>
      <line x1="12" y1="7" x2="5" y2="17"/><line x1="12" y1="7" x2="19" y2="17"/>
    </svg>
  ),
  compass: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  ),
  megaphone: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l19-9-9 19-2-8-8-2z"/>
    </svg>
  ),
  lightbulb: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.3 6H8.3A7 7 0 0 1 5 9a7 7 0 0 1 7-7z"/>
    </svg>
  ),
  fileSearch: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <circle cx="11.5" cy="14.5" r="2.5"/><line x1="13.25" y1="16.25" x2="15" y2="18"/>
    </svg>
  ),
  // Solve icons
  microscope: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/>
      <path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6l3-3 3 3v4a2 2 0 0 1-2 2Z"/>
    </svg>
  ),
  map: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
      <line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
    </svg>
  ),
  target: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  shield: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  activity: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  award: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  layers: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
};

const BOTTLENECKS = [
  { icon: ICONS.cpu,        text: "Challenges in assessing the impact of emerging technologies such as AI, IoT, and cloud computing on operations, governance, and stakeholder trust" },
  { icon: ICONS.barChart,   text: "Limited visibility into competitor pricing, product differentiation, and market adoption trends in fast-evolving tech segments" },
  { icon: ICONS.network,    text: "Difficulty in identifying market-entry triggers, target accounts, and partnership opportunities in complex technology ecosystems" },
  { icon: ICONS.compass,    text: "Lack of clarity on competitive positioning in niche domains like cloud-based SCM and 3D printing" },
  { icon: ICONS.megaphone,  text: "Inability to measure marketing effectiveness, brand awareness, perception, and purchase intent for technology solutions" },
  { icon: ICONS.lightbulb,  text: "Challenges in identifying innovation whitespaces and emerging technology opportunities across domains such as Generative AI, in-cabin sensing, advanced displays, semiconductors, and smart materials" },
  { icon: ICONS.fileSearch, text: "Inability to benchmark competitor patent portfolios, innovation focus areas, and R&D trajectories to understand relative competitive positioning" },
];

const SOLUTIONS = [
  { icon: ICONS.microscope, text: "Conducts deep-dive assessments through expert-led primary research with C-suite and R&D leaders to evaluate technology readiness, adoption trends, and governance requirements" },
  { icon: ICONS.map,        text: "Delivers ecosystem mapping, customer profiling, and stakeholder interviews to identify market-entry opportunities and growth triggers" },
  { icon: ICONS.target,     text: "Leverages competitive benchmarking, market analysis, and stakeholder insights to decode pricing structures and competitive positioning" },
  { icon: ICONS.shield,     text: "Identifies market white-space opportunities to strengthen positioning in emerging technology domains" },
  { icon: ICONS.activity,   text: "Applies pre- and post-campaign evaluations using quantitative surveys and statistical analysis to track KPI improvements, brand perception, and purchase intent" },
  { icon: ICONS.award,      text: "Conducts comprehensive patent landscape, whitespace, patentability, and Freedom-to-Operate (FTO) analysis using global patent and non-patent literature databases" },
  { icon: ICONS.layers,     text: "Combines IP intelligence with market, regulatory, competitor, and commercialization assessments to develop market-entry and go-to-market strategies" },
];

// ─── Two-box insight section ───────────────────────────────────────
function InsightBoxes({ accent }) {
  return (
    <div style={{ maxWidth:1160,margin:"0 auto",padding:"0 clamp(16px,4vw,44px)",marginBottom:36 }}>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,borderRadius:4,overflow:"hidden",
        boxShadow:"0 2px 16px rgba(0,95,134,0.10)" }}
        className="ta-insight-grid">
        {/* Left — Bottlenecks */}
        <div style={{ background:NS.surface,padding:"28px 30px" }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:20 }}>
            <div style={{ width:32,height:32,borderRadius:"50%",background:`${accent}12`,
              display:"flex",alignItems:"center",justifyContent:"center",color:accent,flexShrink:0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <h3 style={{ fontSize:13,fontWeight:700,letterSpacing:"0.04em",color:NS.ink,textTransform:"uppercase",margin:0 }}>
              Industry Bottlenecks
            </h3>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:13 }}>
            {BOTTLENECKS.map((item, i) => (
              <div key={i} style={{ display:"flex",alignItems:"flex-start",gap:12 }}>
                <div style={{ width:30,height:30,borderRadius:3,background:`${accent}0e`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  color:accent,flexShrink:0,marginTop:0 }}>
                  {item.icon}
                </div>
                <p style={{ fontSize:12.5,lineHeight:1.55,color:NS.inkSoft,margin:0,paddingTop:5 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Solutions (Tech blue filled) */}
        <div style={{ background:accent,padding:"28px 30px" }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:20 }}>
            <div style={{ width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,0.15)",
              display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,0.95)",flexShrink:0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h3 style={{ fontSize:13,fontWeight:700,letterSpacing:"0.04em",color:"#fff",textTransform:"uppercase",margin:0 }}>
              How Netscribes Solves This
            </h3>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:13 }}>
            {SOLUTIONS.map((item, i) => (
              <div key={i} style={{ display:"flex",alignItems:"flex-start",gap:12 }}>
                <div style={{ width:30,height:30,borderRadius:3,background:"rgba(255,255,255,0.13)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  color:"rgba(255,255,255,0.9)",flexShrink:0,marginTop:0 }}>
                  {item.icon}
                </div>
                <p style={{ fontSize:12.5,lineHeight:1.55,color:"rgba(255,255,255,0.88)",margin:0,paddingTop:5 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────
export default function TechAlt() {
  const sector  = SECTORS.find(s => s.id === "tech");
  const hero    = INDUSTRY_HERO["tech"];
  const accent  = sector.accent;

  // All tech cases
  const allItems = RESEARCH_DATA.filter(d => d.industry === "tech");

  // Study Type filter
  const availableStudyTypes = STUDY_TYPES.filter(st => allItems.some(d => d.studyType === st.id));
  const [activeStudyType, setActiveStudyType] = useState(null);

  // Region filter
  const availableRegions = GEO_REGIONS.filter(g => allItems.some(d => d.geo.includes(g.id)));
  const [activeRegion, setActiveRegion] = useState(null);

  const [viewer, setViewer] = useState(null);

  // Apply both filters
  let filtered = activeStudyType ? allItems.filter(d => d.studyType === activeStudyType) : allItems;
  filtered = activeRegion ? filtered.filter(d => d.geo.includes(activeRegion)) : filtered;

  return (
    <div style={{ background:NS.paper, minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        html { scroll-behavior:smooth; }
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { background:#F5F1EA; font-family:'DM Sans',system-ui,sans-serif; color:#0F1B27; -webkit-font-smoothing:antialiased; }
        button, a { font-family:'DM Sans',system-ui,sans-serif; }
        @keyframes rc-pop { from{opacity:0;transform:scale(0.97) translateY(10px);}to{opacity:1;transform:none;} }
        @media (max-width:580px) {
          .ta-filter-bar { grid-template-columns:1fr !important; }
          .ta-filter-bar > div:first-child { border-right:none !important; border-bottom:1px solid rgba(0,95,134,0.13); }
          .ta-insight-grid { grid-template-columns:1fr !important; }
        }
        .casetile-summary-btn { display:none; }
        @media (pointer:coarse) { .casetile-summary-btn { display:inline-block; } }
      `}</style>

      {/* Nav */}
      <div style={{ position:"sticky",top:0,zIndex:100,background:"rgba(245,241,234,0.95)",
        backdropFilter:"blur(14px)",borderBottom:`1px solid ${NS.rule}`,
        display:"flex",alignItems:"center",height:52,padding:"0 clamp(16px,4vw,44px)" }}>
        <a href="/research" style={{ display:"flex",alignItems:"center",gap:9,textDecoration:"none" }}>
          <Logo height={19} opacity={0.85} />
          <span style={{ fontSize:10,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:NS.muted }}> / Research</span>
          <span style={{ fontSize:10,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:accent }}> / {sector.tag}</span>
        </a>
      </div>

      {/* Hero — stacked: eyebrow → h1 → desc */}
      <div style={{ maxWidth:1160,margin:"0 auto",
        padding:"clamp(36px,6vw,72px) clamp(16px,4vw,44px) clamp(28px,4vw,44px)" }}>
        <p style={{ fontSize:11,fontWeight:700,letterSpacing:"0.26em",textTransform:"uppercase",color:NS.red,marginBottom:20,display:"flex",alignItems:"center",gap:10 }}>
          <span style={{ display:"inline-block",width:22,height:1,background:NS.red,flexShrink:0 }} />
          Research · {sector.label}
        </p>
        <h1 style={{ fontWeight:400,fontSize:"clamp(36px,6.4vw,76px)",lineHeight:1.02,letterSpacing:"-0.025em",color:NS.ink,textWrap:"balance",marginBottom:18 }}>
          {hero.noun} <em style={{ fontStyle:"normal",color:accent }}>Insights</em>
        </h1>
        <p style={{ color:NS.inkSoft,fontSize:15,lineHeight:1.65,maxWidth:600,fontWeight:400 }}>
          {hero.desc}
        </p>
      </div>

      {/* Two-box insight section */}
      <InsightBoxes accent={accent} />

      {/* Filter bar — Study Type + Region */}
      <div style={{ maxWidth:1160,margin:"0 auto",padding:"0 clamp(16px,4vw,44px)" }}>
        <div className="ta-filter-bar" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",
          border:`1px solid ${NS.rule}`,marginBottom:24 }}>
          <div style={{ padding:"14px 18px",borderRight:`1px solid ${NS.rule}` }}>
            <span style={{ fontSize:9,fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:NS.muted,display:"block",marginBottom:8 }}>Study Type</span>
            <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
              <PillBtn label="All" active={!activeStudyType} color={accent} onClick={() => setActiveStudyType(null)} />
              {availableStudyTypes.map(st => (
                <PillBtn key={st.id} label={st.label} active={activeStudyType === st.id} color={st.accent}
                  onClick={() => setActiveStudyType(activeStudyType === st.id ? null : st.id)} />
              ))}
            </div>
          </div>
          <div style={{ padding:"14px 18px" }}>
            <span style={{ fontSize:9,fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:NS.muted,display:"block",marginBottom:8 }}>Region</span>
            <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
              <PillBtn label="All" active={!activeRegion} color={accent} onClick={() => setActiveRegion(null)} />
              {availableRegions.map(g => (
                <PillBtn key={g.id} label={g.label} active={activeRegion === g.id} color={g.accent}
                  onClick={() => setActiveRegion(activeRegion === g.id ? null : g.id)} />
              ))}
            </div>
          </div>
        </div>

        {/* Count */}
        <div style={{ marginBottom:16 }}>
          <span style={{ fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:NS.muted }}>
            {filtered.length} {filtered.length === 1 ? "sample" : "samples"}{(activeStudyType || activeRegion) ? " · filtered" : ""}
          </span>
        </div>

        {/* Cases grid */}
        {filtered.length === 0 ? (
          <div style={{ padding:"48px 0",textAlign:"center",color:NS.muted,fontSize:14 }}>No studies match these filters.</div>
        ) : (
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:10,animation:"rc-pop 0.22s ease both" }}>
            {filtered.map((item, i) => (
              <CaseTile key={item.title + i} item={item} accent={accent} onOpen={setViewer} />
            ))}
          </div>
        )}
        <div style={{ height:56 }} />
      </div>

      {/* Footer */}
      <footer style={{ borderTop:`1px solid ${NS.rule}`,maxWidth:1160,margin:"0 auto",
        padding:"22px clamp(20px,4vw,44px) 40px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10 }}>
        <Logo height={17} opacity={0.55} />
        <span style={{ fontSize:11,color:NS.muted,letterSpacing:"0.12em",textTransform:"uppercase" }}>Research · {sector.label}</span>
      </footer>

      {viewer && (
        <CaseViewer item={viewer} accent={accent} onClose={() => setViewer(null)} />
      )}
    </div>
  );
}
