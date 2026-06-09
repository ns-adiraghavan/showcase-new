// ─── /research/tech1 — Technology industry filtered view (alt layout) ──
// Renders all Tech & Software cases with Study Type + Region filters,
// landing directly in the panel view. The Industry/Study Type/Region
// toggle bar is replaced by the industry paragraph description.

import { useState, useEffect, useRef } from "react";
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

// ─── Slide data (image pairs from .ai export) ─────────────────────
const SLIDES = [
  {
    bottleneck: "/tech-slides/slide-01.png",
    solution:   "/tech-slides/slide-02.png",
  },
  {
    bottleneck: "/tech-slides/slide-03.png",
    solution:   "/tech-slides/slide-04.png",
  },
  {
    bottleneck: "/tech-slides/slide-05.png",
    solution:   "/tech-slides/slide-06.png",
  },
  {
    bottleneck: "/tech-slides/slide-07.png",
    solution:   "/tech-slides/slide-08.png",
  },
];

// ─── Two-box insight section (image carousel) ─────────────────────
function InsightBoxes({ accent }) {
  const total = SLIDES.length;
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const paused = useRef(false);

  const goTo = (i, direction = 1) => { setDir(direction); setIdx(i); };
  const prev = () => goTo((idx - 1 + total) % total, -1);
  const next = () => goTo((idx + 1) % total, 1);

  useEffect(() => {
    const id = setInterval(() => { if (!paused.current) next(); }, 6000);
    return () => clearInterval(id);
  }, [idx]);

  const slide = SLIDES[idx];

  return (
    <div
      style={{ maxWidth:1160, margin:"0 auto", padding:"0 clamp(16px,4vw,44px)", marginBottom:36 }}
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      <div style={{ borderRadius:4, overflow:"hidden", boxShadow:"0 2px 20px rgba(0,95,134,0.12)", position:"relative" }}>

        {/* Two image panels */}
        <div key={idx} style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}
          className="ta-insight-grid">

          {/* Left — bottleneck (dark teal) */}
          <div style={{ overflow:"hidden", position:"relative", minHeight:260 }}>
            <img
              src={slide.bottleneck}
              alt="Industry Bottlenecks"
              style={{
                width:"100%", height:"100%", objectFit:"cover", objectPosition:"center",
                display:"block",
                animation:`${dir >= 0 ? "slide-fwd" : "slide-bwd"} 0.38s cubic-bezier(0.16,1,0.3,1) both`,
              }}
            />
          </div>

          {/* Right — solution (light) */}
          <div style={{ overflow:"hidden", position:"relative", minHeight:260 }}>
            <img
              src={slide.solution}
              alt="How Netscribes Solves This"
              style={{
                width:"100%", height:"100%", objectFit:"cover", objectPosition:"center",
                display:"block",
                animation:`${dir >= 0 ? "slide-fwd" : "slide-bwd"} 0.38s cubic-bezier(0.16,1,0.3,1) both`,
              }}
            />
          </div>
        </div>

        {/* Controls bar */}
        <div style={{
          background: NS.paperDeep,
          padding: "12px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: `1px solid ${accent}14`,
        }}>
          {/* Dot indicators — centred */}
          <div style={{ flex:1, display:"flex", justifyContent:"center", gap:7, alignItems:"center" }}>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > idx ? 1 : -1)}
                style={{
                  width: i === idx ? 20 : 7,
                  height: 7,
                  borderRadius: 4,
                  background: i === idx ? accent : `${accent}30`,
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                  /* expanded tap area */
                  paddingTop: 8, paddingBottom: 8, marginTop: -8, marginBottom: -8,
                  /* active dot pulse animation */
                  animation: i === idx ? "dot-pulse 2s ease-in-out infinite" : "none",
                  outline: "none",
                }}
              />
            ))}
          </div>

          {/* Counter + arrows — right side */}
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:11, fontWeight:500, color:NS.muted, letterSpacing:"0.04em", fontFamily:"'DM Sans',sans-serif" }}>
              {idx+1} / {total}
            </span>
            <button onClick={prev}
              onMouseEnter={e => e.currentTarget.style.background=`${accent}22`}
              onMouseLeave={e => e.currentTarget.style.background=`${accent}0e`}
              style={{ width:32, height:32, borderRadius:3, border:"none", background:`${accent}0e`,
                color:accent, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
                transition:"background 0.15s", WebkitTapHighlightColor:"transparent" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button onClick={next}
              onMouseEnter={e => e.currentTarget.style.background=`${accent}22`}
              onMouseLeave={e => e.currentTarget.style.background=`${accent}0e`}
              style={{ width:32, height:32, borderRadius:3, border:"none", background:`${accent}0e`,
                color:accent, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
                transition:"background 0.15s", WebkitTapHighlightColor:"transparent" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
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

  const allItems = RESEARCH_DATA.filter(d => d.industry === "tech");

  const availableStudyTypes = STUDY_TYPES.filter(st => allItems.some(d => d.studyType === st.id));
  const [activeStudyType, setActiveStudyType] = useState(null);

  const availableRegions = GEO_REGIONS.filter(g => allItems.some(d => d.geo.includes(g.id)));
  const [activeRegion, setActiveRegion] = useState(null);

  const [viewer, setViewer] = useState(null);

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
        @keyframes slide-fwd { from{opacity:0;transform:translateX(18px);}to{opacity:1;transform:translateX(0);} }
        @keyframes slide-bwd { from{opacity:0;transform:translateX(-18px);}to{opacity:1;transform:translateX(0);} }
        @keyframes dot-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(0,95,134,0.45); }
          60%  { box-shadow: 0 0 0 5px rgba(0,95,134,0); }
          100% { box-shadow: 0 0 0 0 rgba(0,95,134,0); }
        }
        @media (max-width:580px) {
          .ta-insight-grid { grid-template-columns:1fr !important; }
          .ta-filter-bar { grid-template-columns:1fr !important; }
          .ta-filter-bar > div:first-child { border-right:none !important; border-bottom:1px solid rgba(0,95,134,0.13); }
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

      {/* Hero */}
      <div style={{ maxWidth:1160,margin:"0 auto",
        padding:"clamp(36px,6vw,72px) clamp(16px,4vw,44px) 20px" }}>
        <p style={{ fontSize:11,fontWeight:700,letterSpacing:"0.26em",textTransform:"uppercase",color:NS.red,marginBottom:20,display:"flex",alignItems:"center",gap:10 }}>
          <span style={{ display:"inline-block",width:22,height:1,background:NS.red,flexShrink:0 }} />
          Research · {sector.label}
        </p>
        <h1 style={{ fontWeight:400,fontSize:"clamp(36px,6.4vw,76px)",lineHeight:1.02,letterSpacing:"-0.025em",color:NS.ink,textWrap:"balance",marginBottom:14 }}>
          {hero.noun} <em style={{ fontStyle:"normal",color:accent }}>Insights</em>
        </h1>
        <p style={{ color:NS.inkSoft,fontSize:14,lineHeight:1.6,fontWeight:400 }}>
          {hero.desc}
        </p>
      </div>

      {/* Insight image carousel */}
      <InsightBoxes accent={accent} />

      {/* Filter bar — Study Type + Region */}
      <div style={{ maxWidth:1160,margin:"0 auto",padding:"0 clamp(16px,4vw,44px)" }}>
        <div className="ta-filter-bar" style={{
          display:"grid", gridTemplateColumns:"1fr 1fr",
          border:`1px solid ${NS.rule}`,
          borderRadius:3,
          marginBottom:24,
          overflow:"hidden",
        }}>
          {/* Study Type */}
          <div style={{ padding:"14px 20px", borderRight:`1px solid ${NS.rule}` }}>
            <span style={{ fontSize:9,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:NS.muted,display:"block",marginBottom:9 }}>Study Type</span>
            <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
              <PillBtn label="All" active={!activeStudyType} color={accent} onClick={() => setActiveStudyType(null)} />
              {availableStudyTypes.map(st => (
                <PillBtn key={st.id} label={st.label} active={activeStudyType === st.id} color={st.accent}
                  onClick={() => setActiveStudyType(activeStudyType === st.id ? null : st.id)} />
              ))}
            </div>
          </div>

          {/* Region */}
          <div style={{ padding:"14px 20px" }}>
            <span style={{ fontSize:9,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:NS.muted,display:"block",marginBottom:9 }}>Region</span>
            <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
              <PillBtn label="All" active={!activeRegion} color={accent} onClick={() => setActiveRegion(null)} />
              {availableRegions.map(g => (
                <PillBtn key={g.id} label={g.label} active={activeRegion === g.id} color={g.accent}
                  onClick={() => setActiveRegion(activeRegion === g.id ? null : g.id)} />
              ))}
            </div>
          </div>
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
