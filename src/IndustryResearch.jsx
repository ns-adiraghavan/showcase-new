// ─── /research/[industry] — Industry Research page ───────────────
import { useState, useEffect } from "react";
import logoSrc from "./assets/netscribes-logo.png";
import {
  NS, SECTORS, STUDY_TYPES, RESEARCH_DATA, GEO_REGIONS, INDUSTRY_HERO,
} from "./researchData";

// ─── Logo ─────────────────────────────────────────────────────────
function Logo({ height = 19, opacity = 0.85 }) {
  return <img src={logoSrc} alt="Netscribes" style={{ height, opacity, objectFit:"contain", display:"block" }} />;
}

// ─── Hooks ────────────────────────────────────────────────────────
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

// ─── Industry path map ────────────────────────────────────────────
const INDUSTRY_PATHS = {
  tech:"technology", telecom:"telecom", retail:"retail",
  fnb:"food-and-beverage", auto:"automotive", bfsi:"finance",
  mfg:"manufacturing", health:"healthcare",
};

// ─── Sticky Nav ───────────────────────────────────────────────────
// Entire breadcrumb links back to this industry page — resets to strip view
function IndustryNav({ sector }) {
  const path = `/research/${INDUSTRY_PATHS[sector.id] || sector.id}`;
  return (
    <div style={{ position:"sticky",top:0,zIndex:100,background:"rgba(245,241,234,0.95)",
      backdropFilter:"blur(14px)",borderBottom:`1px solid ${NS.rule}`,
      display:"flex",alignItems:"center",height:52,padding:"0 clamp(16px,4vw,44px)" }}>
      <a href={path} style={{ display:"flex",alignItems:"center",gap:9,textDecoration:"none",minWidth:0,overflow:"hidden" }}>
        <Logo height={19} opacity={0.85} />
        <span style={{ fontSize:10,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:NS.muted,whiteSpace:"nowrap" }}> / Research</span>
        <span style={{ fontSize:10,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:sector.accent,whiteSpace:"nowrap" }}> / {sector.tag}</span>
      </a>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────
function IndustryHero({ sector, hero }) {
  return (
    <div style={{ maxWidth:1160,margin:"0 auto",
      padding:"clamp(36px,6vw,72px) clamp(16px,4vw,44px) clamp(28px,4vw,44px)",
      borderBottom:`1px solid ${NS.rule}`,position:"relative" }}>
      <span style={{ position:"absolute",top:"clamp(20px,3.5vw,32px)",right:"clamp(16px,4vw,44px)",
        fontSize:9,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",
        border:`1px solid ${sector.accent}50`,color:sector.accent,padding:"3px 8px",borderRadius:2 }}>
        {sector.tag}
      </span>
      <div className="hero-row" style={{ display:"grid",gridTemplateColumns:"minmax(0,1fr) 320px",alignItems:"end",columnGap:40,rowGap:20 }}>
        <div style={{ minWidth:0 }}>
          <p style={{ fontSize:11,fontWeight:700,letterSpacing:"0.26em",textTransform:"uppercase",color:NS.red,marginBottom:20,display:"flex",alignItems:"center",gap:10 }}>
            <span style={{ display:"inline-block",width:22,height:1,background:NS.red,flexShrink:0 }} />
            Research · {sector.label}
          </p>
          <h1 style={{ fontWeight:400,fontSize:"clamp(36px,6.4vw,76px)",lineHeight:1.02,letterSpacing:"-0.025em",color:NS.ink,textWrap:"balance" }}>
            {hero.noun} intelligence<br />
            <em style={{ fontStyle:"normal",color:sector.accent }}>that drives decisions.</em>
          </h1>
        </div>
        <p style={{ color:NS.inkSoft,fontSize:14,lineHeight:1.65,maxWidth:360,fontWeight:400,minWidth:0,paddingBottom:6 }}>
          {hero.desc}
        </p>
      </div>
    </div>
  );
}

// ─── Capability Strip — always visible, mirrors App.jsx StripTile exactly ──
function CapabilityStrip({ types, active, onSelect }) {
  const count = types.length;
  return (
    <div style={{ maxWidth:1160,margin:"0 auto",padding:"0 clamp(16px,4vw,44px)" }}>
      <div className="strip-grid" style={{
        display:"grid",
        gridTemplateColumns:`repeat(${count},1fr)`,
        border:`1px solid ${NS.rule}`,
        background:NS.surface,
      }}>
        {types.map((st, i) => {
          const isActive = st.id === active;
          const isLast   = i === count - 1;
          return <StripTile key={st.id} st={st} num={String(i+1).padStart(2,"0")} active={isActive} borderRight={!isLast} onClick={() => onSelect(st.id)} />;
        })}
      </div>
    </div>
  );
}

function StripTile({ st, num, active, borderRight, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textAlign:"left",
        background: active ? st.accent : (hov ? NS.paperDeep : NS.surface),
        borderRight: borderRight ? `1px solid ${NS.rule}` : "none",
        borderTop:"none", borderBottom:"none", borderLeft:"none",
        padding:"22px 22px",
        cursor:"pointer",
        display:"flex", flexDirection:"column", gap:8,
        fontFamily:"'DM Sans',sans-serif",
        transition:"background 0.22s",
        width:"100%",
      }}>
      {/* number row */}
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:12 }}>
        <span style={{ fontFamily:"'JetBrains Mono',ui-monospace,monospace",fontSize:10,fontWeight:500,letterSpacing:"0.12em",
          color: active ? "rgba(255,255,255,0.75)" : NS.muted }}>
          {num}
        </span>
        {active && <span style={{ width:6,height:6,borderRadius:"50%",background:"#fff",flexShrink:0 }} />}
      </div>
      {/* label */}
      <h3 style={{ fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:24,
        letterSpacing:"-0.02em",lineHeight:1,color:active?"#fff":NS.ink,
        whiteSpace:"nowrap",margin:0,
        overflow:"hidden",textOverflow:"ellipsis",
      }}>
        {st.label}
      </h3>
      {/* tag */}
      <span style={{ fontSize:10,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",
        color: active ? "rgba(255,255,255,0.78)" : st.accent }}>
        {/* Use a short tag for each study type */}
        {ST_TAG[st.id] || st.label.split(" ")[0].toUpperCase()}
      </span>
    </button>
  );
}

// Short tags for each study type, matching App.jsx's tag pattern
const ST_TAG = {
  "Industry Analysis":        "Landscape",
  "GTM":                      "Strategy",
  "Competitive Benchmarking": "Rivals",
  "Consumer Research":        "Consumer",
  "Sales Enablement":         "Intel",
  "AI Readiness":             "Maturity",
  "Investment Research":      "Invest",
  "Patent Research":          "IP",
  "Synthetic Data":           "Data",
};

// ─── Section banner — mirrors App.jsx SectionBanner exactly ──────
function SectionBanner({ st }) {
  return (
    <div style={{ maxWidth:1160,margin:"0 auto",padding:"0 clamp(16px,4vw,44px)" }}>
      <div style={{
        borderLeft:`1px solid ${NS.rule}`,
        borderRight:`1px solid ${NS.rule}`,
        borderBottom:`1px solid ${NS.rule}`,
        background:NS.surface,
        padding:"32px 32px",
        display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:24,flexWrap:"wrap",
      }}>
        <div style={{ flex:"1 1 320px" }}>
          <p style={{ fontSize:10,fontWeight:700,letterSpacing:"0.24em",textTransform:"uppercase",
            color:st.accent,marginBottom:8 }}>
            Now showing · {ST_TAG[st.id] || st.id} samples
          </p>
          <h2 style={{ fontFamily:"'DM Sans',sans-serif",fontWeight:400,fontSize:44,
            letterSpacing:"-0.02em",color:NS.ink,lineHeight:1.02,margin:0 }}>
            {st.label}
          </h2>
          <p style={{ marginTop:8,color:NS.inkSoft,fontSize:"clamp(10px,1.1vw,14px)",lineHeight:1.55 }}>
            {st.desc}
          </p>
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

// ─── Case Tile — same compact card as Research.jsx CaseTile ──────
function CaseTile({ item, accent, onOpen }) {
  const [hov, setHov]         = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const sector       = SECTORS.find(s => s.id === item.industry);
  const sectorLabel  = sector?.label || item.industry;
  const sectorAccent = sector?.accent || accent;
  const indBg   = hov ? "rgba(255,255,255,0.14)" : `${sectorAccent}12`;
  const indCol  = hov ? "rgba(255,255,255,0.85)" : sectorAccent;
  const muteBg  = hov ? "rgba(255,255,255,0.14)" : NS.paperDeep;
  const muteCol = hov ? "rgba(255,255,255,0.75)" : NS.muted;
  const showDesc = hov || summaryOpen;

  return (
    <div onClick={() => onOpen(item)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? accent : NS.surface,
        border:`1.5px solid ${hov ? accent : NS.rule}`,
        borderRadius:3, padding:"16px 18px", cursor:"pointer",
        transition:"background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease",
        transform: hov ? "translateY(-2px)" : "none",
        boxShadow: hov ? `0 8px 24px ${accent}22` : "none",
      }}>
      <div style={{ display:"flex",justifyContent:"space-between",gap:8,marginBottom:8 }}>
        <p style={{ fontSize:13,fontWeight:700,color:hov?"#fff":NS.ink,lineHeight:1.35,flex:1,transition:"color 0.18s",textWrap:"balance" }}>{item.title}</p>
        <span style={{ color:hov?"rgba(255,255,255,0.8)":accent,fontSize:15,flexShrink:0,transition:"color 0.18s" }}>↗</span>
      </div>
      <div style={{ display:"flex",gap:4,flexWrap:"wrap",marginTop:4 }}>
        {(() => {
          const st   = STUDY_TYPES.find(s => s.id === item.studyType);
          const stCol = st?.accent || accent;
          const stBg  = hov ? "rgba(255,255,255,0.18)" : `${stCol}15`;
          const stFg  = hov ? "#fff" : stCol;
          return <span style={{ fontSize:9,padding:"2px 6px",borderRadius:2,background:stBg,color:stFg,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",transition:"all 0.18s" }}>{item.studyType}</span>;
        })()}
        <span style={{ fontSize:9,padding:"2px 6px",borderRadius:2,background:indBg,color:indCol,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",transition:"all 0.18s" }}>{sectorLabel}</span>
        {item.primaryType && <span style={{ fontSize:9,padding:"2px 6px",borderRadius:2,background:muteBg,color:muteCol,fontWeight:600,transition:"all 0.18s" }}>{item.primaryType}</span>}
        {item.geo.map(g => <span key={g} style={{ fontSize:9,padding:"2px 6px",borderRadius:2,background:muteBg,color:muteCol,transition:"all 0.18s" }}>{g}</span>)}
      </div>
      {item.desc && (
        <div style={{ maxHeight:showDesc?"120px":"0", overflow:"hidden", transition:"max-height 0.22s ease" }}>
          <p style={{ fontSize:11.5,lineHeight:1.55,color:hov?"rgba(255,255,255,0.88)":NS.inkSoft,marginTop:10,transition:"color 0.18s" }}>
            {item.desc}
          </p>
        </div>
      )}
      {item.desc && (
        <button onClick={e => { e.stopPropagation(); setSummaryOpen(v=>!v); }}
          className="casetile-summary-btn"
          style={{ display:"none",marginTop:8,fontSize:10,fontWeight:700,letterSpacing:"0.06em",
            textTransform:"uppercase",border:`1px solid ${summaryOpen?"rgba(255,255,255,0.4)":accent}`,
            borderRadius:2,padding:"3px 8px",background:"transparent",
            color:summaryOpen?"rgba(255,255,255,0.8)":accent,cursor:"pointer",fontFamily:"'DM Sans',sans-serif" }}>
          {summaryOpen ? "Hide" : "Summary"}
        </button>
      )}
    </div>
  );
}

// ─── Samples section (below the strip) ───────────────────────────
function SamplesSection({ studyType, sector, items }) {
  const accent = studyType.accent;
  const availableRegions = GEO_REGIONS.filter(g => items.some(i => i.geo.includes(g.id)));
  const [activeRegion, setActiveRegion] = useState(null);
  const [viewer, setViewer] = useState(null);

  // Reset region filter when study type changes
  useEffect(() => { setActiveRegion(null); }, [studyType.id]);

  const shown = activeRegion
    ? items.filter(i => i.geo.includes(activeRegion))
    : items;

  return (
    <>
      <div style={{ maxWidth:1160,margin:"0 auto",padding:"clamp(24px,3.5vw,40px) clamp(16px,4vw,44px) 0" }}>
        {/* Count + region filter row */}
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",
          gap:16,marginBottom:20,flexWrap:"wrap" }}>
          <span style={{ fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:NS.muted }}>
            {shown.length} {shown.length===1?"sample":"samples"}{activeRegion?" · filtered":""}
          </span>
          {availableRegions.length > 1 && (
            <div style={{ display:"flex",flexWrap:"wrap",gap:5,alignItems:"center" }}>
              <span style={{ fontSize:10,fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:NS.muted,marginRight:2,whiteSpace:"nowrap" }}>Region</span>
              <PillBtn label="All" active={!activeRegion} color={accent} onClick={() => setActiveRegion(null)} />
              {availableRegions.map(g => (
                <PillBtn key={g.id} label={g.label} active={activeRegion===g.id} color={g.accent}
                  onClick={() => setActiveRegion(activeRegion===g.id ? null : g.id)} />
              ))}
            </div>
          )}
        </div>

        {shown.length === 0 ? (
          <div style={{ padding:"48px 0",textAlign:"center",color:NS.muted,fontSize:14 }}>No samples match the selected region.</div>
        ) : (
          <div key={studyType.id+(activeRegion||"")}
            style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:10,animation:"rc-pop 0.22s ease both" }}>
            {shown.map((item,i) => <CaseTile key={item.title+i} item={item} accent={accent} onOpen={setViewer} />)}
          </div>
        )}
        <div style={{ height:56 }} />
      </div>

      {viewer && (
        <CaseViewer item={viewer}
          accent={(STUDY_TYPES.find(s=>s.id===viewer.studyType)?.accent)||sector.accent}
          onClose={() => setViewer(null)} />
      )}
    </>
  );
}

// ─── Root ─────────────────────────────────────────────────────────
export default function IndustryResearch({ industryId = "auto" }) {
  const sector = SECTORS.find(s => s.id === industryId) || SECTORS[0];
  const hero   = INDUSTRY_HERO[sector.id] || { noun:sector.tag, desc:sector.blurb };
  const samples = RESEARCH_DATA.filter(d => d.industry === sector.id);
  const availableTypes = STUDY_TYPES.filter(st => samples.some(s => s.studyType === st.id));

  // Start with first available type selected (strip is always shown)
  const [activeType, setActiveType] = useState(availableTypes[0]?.id || null);
  useEffect(() => {
    setActiveType(availableTypes[0]?.id || null);
    window.scrollTo({ top:0, behavior:"smooth" });
  }, [industryId]);

  const activeStudy = STUDY_TYPES.find(s => s.id === activeType);
  const shown       = activeStudy ? samples.filter(d => d.studyType === activeType) : [];

  return (
    <div style={{ background:NS.paper, minHeight:"100vh" }}>
      <style>{`
        html { scroll-behavior:smooth; }
        body { background:#F5F1EA; font-family:'DM Sans',system-ui,sans-serif; color:#0F1B27; -webkit-font-smoothing:antialiased; }
        button, a, input, select, textarea { font-family:'DM Sans',system-ui,sans-serif; }
        @keyframes rc-pop { from{opacity:0;transform:scale(0.97) translateY(10px);} to{opacity:1;transform:none;} }
        @media (max-width:860px){ .hero-row{ grid-template-columns:1fr !important; align-items:start !important; } }
        @media (max-width:700px){ .strip-grid{ grid-template-columns:repeat(2,1fr) !important; } }
        @media (max-width:420px){ .strip-grid{ grid-template-columns:1fr !important; } }
        @media (pointer:coarse){ .casetile-summary-btn{ display:inline-block !important; } }
      `}</style>

      <IndustryNav sector={sector} />
      <IndustryHero sector={sector} hero={hero} />

      {/* Capability strip — always visible */}
      <CapabilityStrip types={availableTypes} active={activeType} onSelect={setActiveType} />

      {/* Section banner + samples */}
      {activeStudy && (
        <>
          <SectionBanner st={activeStudy} />
          <SamplesSection studyType={activeStudy} sector={sector} items={shown} />
        </>
      )}

      <footer style={{ borderTop:`1px solid ${NS.rule}`,maxWidth:1160,margin:"clamp(44px,6vw,80px) auto 0",
        padding:"22px clamp(20px,4vw,44px) 40px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10 }}>
        <Logo height={17} opacity={0.55} />
        <span style={{ fontSize:11,color:NS.muted,letterSpacing:"0.12em",textTransform:"uppercase" }}>Research · {sector.label}</span>
      </footer>
    </div>
  );
}
