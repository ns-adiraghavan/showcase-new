// ─── /research/[industry] — Industry Research page ───────────────
import { useState, useEffect, useRef } from "react";
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
        backdropFilter:"blur(10px)",display:"flex",alignItems:"center",
        justifyContent:"center",padding:24 }}>
      <div style={{ background:NS.surface,borderRadius:3,width:"100%",maxWidth:900,
        maxHeight:"92vh",display:"flex",flexDirection:"column",
        boxShadow:"0 40px 100px rgba(0,0,0,0.35)",animation:"rc-pop 0.2s ease both" }}>
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

// ─── Sticky Nav ───────────────────────────────────────────────────
function IndustryNav({ sector, industryPath }) {
  return (
    <div style={{ position:"sticky",top:0,zIndex:100,background:"rgba(245,241,234,0.95)",
      backdropFilter:"blur(14px)",borderBottom:`1px solid ${NS.rule}`,
      display:"flex",alignItems:"center",height:52,padding:"0 clamp(16px,4vw,44px)" }}>
      <div style={{ display:"flex",alignItems:"center",minWidth:0,overflow:"hidden" }}>
        <a href="/" style={{ display:"flex",alignItems:"center",textDecoration:"none",flexShrink:0 }}>
          <Logo height={19} opacity={0.85} />
        </a>
        <a href="/research"
          style={{ fontSize:10,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",
            color:NS.muted,whiteSpace:"nowrap",textDecoration:"none",paddingLeft:9 }}>
          {" / Research"}
        </a>
        <a href={industryPath}
          style={{ fontSize:10,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",
            color:sector.accent,whiteSpace:"nowrap",textDecoration:"none" }}>
          {" / "}{sector.tag}
        </a>
      </div>
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
      <div className="hero-row" style={{ display:"grid",gridTemplateColumns:"minmax(0,1fr) 320px",
        alignItems:"end",columnGap:40,rowGap:20 }}>
        <div style={{ minWidth:0 }}>
          <p style={{ fontSize:11,fontWeight:700,letterSpacing:"0.26em",textTransform:"uppercase",
            color:NS.red,marginBottom:20,display:"flex",alignItems:"center",gap:10 }}>
            <span style={{ display:"inline-block",width:22,height:1,background:NS.red,flexShrink:0 }} />
            Research · {sector.label}
          </p>
          <h1 style={{ fontWeight:400,fontSize:"clamp(36px,6.4vw,76px)",lineHeight:1.02,
            letterSpacing:"-0.025em",color:NS.ink,textWrap:"balance" }}>
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

// ─── Study Type Gateway ───────────────────────────────────────────
function StudyTypeGateway({ types, onSelect }) {
  return (
    <div style={{ maxWidth:1160,margin:"0 auto",
      padding:"clamp(36px,5vw,64px) clamp(16px,4vw,44px)" }}>
      <p style={{ fontSize:11,fontWeight:700,letterSpacing:"0.26em",textTransform:"uppercase",
        color:NS.muted,marginBottom:28,display:"flex",alignItems:"center",gap:10 }}>
        <span style={{ display:"inline-block",width:22,height:1,background:NS.muted,flexShrink:0 }} />
        Select a capability
      </p>
      <div className="gateway-grid" style={{ display:"grid",
        gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",
        borderTop:`1px solid ${NS.rule}`,borderLeft:`1px solid ${NS.rule}` }}>
        {types.map(st => <GatewayCard key={st.id} st={st} onSelect={onSelect} />)}
      </div>
    </div>
  );
}

function GatewayCard({ st, onSelect }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={() => onSelect(st.id)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ textAlign:"left",background:hov ? st.accent : NS.surface,border:"none",
        borderRight:`1px solid ${NS.rule}`,borderBottom:`1px solid ${NS.rule}`,
        padding:"clamp(24px,3vw,36px) clamp(20px,2.5vw,28px)",cursor:"pointer",
        display:"flex",flexDirection:"column",gap:14,minHeight:"clamp(200px,22vw,260px)",
        transition:"background 0.24s cubic-bezier(0.22,1,0.36,1)",
        fontFamily:"'DM Sans',sans-serif",width:"100%" }}>
      <div style={{ width:24,height:2,background:hov ? "rgba(255,255,255,0.6)" : st.accent,
        borderRadius:1,flexShrink:0,transition:"background 0.24s" }} />
      <div style={{ flex:1,display:"flex",flexDirection:"column",gap:10 }}>
        <h3 style={{ fontSize:"clamp(16px,1.7vw,20px)",fontWeight:700,letterSpacing:"-0.02em",
          lineHeight:1.15,color:hov ? "#fff" : NS.ink,transition:"color 0.24s",
          margin:0,textWrap:"balance" }}>
          {st.label}
        </h3>
        <p style={{ fontSize:13,lineHeight:1.65,color:hov ? "rgba(255,255,255,0.82)" : NS.muted,
          transition:"color 0.24s",margin:0 }}>
          {st.desc}
        </p>
      </div>
      <div style={{ display:"flex",justifyContent:"flex-end" }}>
        <span style={{ fontSize:18,color:hov ? "rgba(255,255,255,0.9)" : st.accent,
          transform:hov ? "translate(2px,-2px)" : "none",transition:"all 0.24s" }}>→</span>
      </div>
    </button>
  );
}

// ─── Region filter ────────────────────────────────────────────────
function RegionPill({ id, active, onToggle }) {
  const [hov, setHov] = useState(false);
  const geo   = GEO_REGIONS.find(g => g.id === id);
  const color = geo?.accent || NS.blue;
  return (
    <button onClick={() => onToggle(id)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ fontSize:11,fontWeight:active ? 700 : 500,
        color:active ? "#fff" : (hov ? color : NS.muted),
        background:active ? color : (hov ? `${color}10` : "transparent"),
        border:`1px solid ${active ? color : (hov ? color : NS.rule)}`,
        borderRadius:2,padding:"4px 11px",cursor:"pointer",
        transition:"all 0.15s",fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap" }}>
      {id}
    </button>
  );
}

function RegionFilter({ regions, active, onToggle }) {
  return (
    <div style={{ display:"flex",flexWrap:"wrap",gap:6,alignItems:"center" }}>
      <span style={{ fontSize:10,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",
        color:NS.muted,marginRight:2,whiteSpace:"nowrap" }}>Region</span>
      {regions.map(r => <RegionPill key={r} id={r} active={active.includes(r)} onToggle={onToggle} />)}
      {active.length > 0 && (
        <button onClick={() => onToggle(null)}
          style={{ fontSize:10,fontWeight:600,color:NS.muted,background:"none",border:"none",
            cursor:"pointer",padding:"2px 4px",fontFamily:"'DM Sans',sans-serif",
            textDecoration:"underline" }}>
          clear
        </button>
      )}
    </div>
  );
}

// ─── Sample card ──────────────────────────────────────────────────
function SampleCard({ item, accent, onOpen }) {
  const [hov, setHov] = useState(false);
  const study = STUDY_TYPES.find(s => s.id === item.studyType);
  const stCol = study?.accent || accent;
  const tagBg = hov ? "rgba(255,255,255,0.18)" : `${stCol}15`;
  const tagFg = hov ? "#fff" : stCol;
  const geoBg = hov ? "rgba(255,255,255,0.18)" : NS.paperDeep;
  const geoFg = hov ? "rgba(255,255,255,0.82)" : NS.muted;

  return (
    <button onClick={() => onOpen(item)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ textAlign:"left",background:hov ? accent : NS.surface,border:"none",
        borderRight:`1px solid ${NS.rule}`,borderBottom:`1px solid ${NS.rule}`,
        padding:"clamp(20px,2.5vw,28px) clamp(18px,2vw,24px)",cursor:"pointer",
        minHeight:"clamp(160px,18vw,210px)",display:"flex",flexDirection:"column",gap:12,
        transition:"background 0.22s ease",fontFamily:"'DM Sans',sans-serif",width:"100%" }}>
      <div style={{ display:"flex",gap:5,flexWrap:"wrap" }}>
        <span style={{ fontSize:9,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",
          background:tagBg,color:tagFg,padding:"2px 7px",borderRadius:2,transition:"all 0.22s" }}>
          {item.studyType}
        </span>
        {item.geo.map(g => (
          <span key={g} style={{ fontSize:9,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",
            background:geoBg,color:geoFg,padding:"2px 7px",borderRadius:2,transition:"all 0.22s" }}>
            {g}
          </span>
        ))}
      </div>
      <h3 style={{ fontSize:"clamp(14px,1.45vw,17px)",fontWeight:700,letterSpacing:"-0.015em",
        lineHeight:1.25,color:hov ? "#fff" : NS.ink,textWrap:"balance",
        transition:"color 0.22s",margin:0,flex:1 }}>
        {item.title}
      </h3>
      <div style={{ display:"flex",justifyContent:"flex-end" }}>
        <span style={{ fontSize:16,color:hov ? "rgba(255,255,255,0.85)" : accent,
          transform:hov ? "translate(2px,-2px)" : "none",transition:"all 0.22s" }}>↗</span>
      </div>
    </button>
  );
}

// ─── Sample view (drilled into a study type) ─────────────────────
function SampleView({ studyType, sector, items, onBack }) {
  const accent = studyType.accent;
  const availableRegions = [...new Set(items.flatMap(i => i.geo))].sort();
  const [activeRegions, setActiveRegions] = useState([]);
  const [viewer, setViewer] = useState(null);

  const toggleRegion = id => {
    if (id === null) { setActiveRegions([]); return; }
    setActiveRegions(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const shown = activeRegions.length === 0
    ? items
    : items.filter(i => i.geo.some(g => activeRegions.includes(g)));

  return (
    <>
      {/* Sub-nav bar: back + study type label + region filter */}
      <div style={{ borderBottom:`1px solid ${NS.rule}`,background:NS.paper,
        position:"sticky",top:52,zIndex:90 }}>
        <div style={{ maxWidth:1160,margin:"0 auto",
          padding:"0 clamp(16px,4vw,44px)",
          display:"flex",alignItems:"center",gap:16,minHeight:52,flexWrap:"wrap",
          paddingTop:8,paddingBottom:8 }}>
          <button onClick={onBack}
            style={{ display:"flex",alignItems:"center",gap:6,fontSize:11,fontWeight:700,
              letterSpacing:"0.1em",textTransform:"uppercase",color:NS.muted,background:"none",
              border:`1px solid ${NS.rule}`,borderRadius:2,padding:"5px 11px",cursor:"pointer",
              fontFamily:"'DM Sans',sans-serif",transition:"all 0.15s",flexShrink:0,whiteSpace:"nowrap" }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor=accent; e.currentTarget.style.color=accent; }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor=NS.rule; e.currentTarget.style.color=NS.muted; }}>
            ← All capabilities
          </button>
          <span style={{ width:1,height:18,background:NS.rule,flexShrink:0 }} />
          <span style={{ fontSize:12,fontWeight:700,color:accent,letterSpacing:"-0.01em",flexShrink:0 }}>
            {studyType.label}
          </span>
          <div style={{ flex:1 }} />
          {availableRegions.length > 1 && (
            <RegionFilter regions={availableRegions} active={activeRegions} onToggle={toggleRegion} />
          )}
        </div>
      </div>

      <div style={{ maxWidth:1160,margin:"0 auto",
        padding:"clamp(24px,3.5vw,40px) clamp(16px,4vw,44px) 0" }}>
        <div style={{ display:"flex",alignItems:"baseline",justifyContent:"space-between",
          gap:16,marginBottom:16,flexWrap:"wrap" }}>
          <h2 style={{ fontSize:"clamp(20px,2.4vw,28px)",fontWeight:700,
            letterSpacing:"-0.02em",color:NS.ink }}>
            {studyType.label}
          </h2>
          <span style={{ fontSize:11,fontWeight:700,letterSpacing:"0.1em",
            textTransform:"uppercase",color:NS.muted }}>
            {shown.length} {shown.length === 1 ? "sample" : "samples"}
            {activeRegions.length > 0 ? " · filtered" : ""}
          </span>
        </div>

        {shown.length === 0 ? (
          <div style={{ padding:"48px 0",textAlign:"center",color:NS.muted,fontSize:14 }}>
            No samples match the selected region{activeRegions.length > 1 ? "s" : ""}.
          </div>
        ) : (
          <div key={studyType.id + activeRegions.join()}
            className="sample-grid"
            style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",
              borderTop:`1px solid ${NS.rule}`,borderLeft:`1px solid ${NS.rule}`,
              animation:"rc-pop 0.22s ease both" }}>
            {shown.map((item, i) => (
              <SampleCard key={item.title+i} item={item} accent={accent} onOpen={setViewer} />
            ))}
          </div>
        )}
      </div>

      {viewer && (
        <CaseViewer
          item={viewer}
          accent={(STUDY_TYPES.find(s => s.id === viewer.studyType)?.accent) || sector.accent}
          onClose={() => setViewer(null)}
        />
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

  const [activeType, setActiveType] = useState(null);
  useEffect(() => { setActiveType(null); window.scrollTo({ top:0, behavior:"smooth" }); }, [industryId]);

  const activeStudy = STUDY_TYPES.find(s => s.id === activeType);
  const shown       = activeStudy ? samples.filter(d => d.studyType === activeType) : [];

  const INDUSTRY_PATHS = {
    tech:"technology", telecom:"telecom", retail:"retail",
    fnb:"food-and-beverage", auto:"automotive", bfsi:"finance",
    mfg:"manufacturing", health:"healthcare",
  };
  const industryPath = `/research/${INDUSTRY_PATHS[sector.id] || sector.id}`;

  return (
    <div style={{ background:NS.paper, minHeight:"100vh" }}>
      <style>{`
        html { scroll-behavior:smooth; }
        body { background:#F5F1EA; font-family:'DM Sans',system-ui,sans-serif; color:#0F1B27; -webkit-font-smoothing:antialiased; }
        button, a, input, select { font-family:'DM Sans',system-ui,sans-serif; }
        @keyframes rc-pop { from{opacity:0;transform:scale(0.97) translateY(10px);} to{opacity:1;transform:none;} }
        @media (max-width:860px){ .hero-row{ grid-template-columns:1fr !important; align-items:start !important; } }
        @media (max-width:760px){ .sample-grid,.gateway-grid{ grid-template-columns:1fr 1fr !important; } }
        @media (max-width:520px){ .sample-grid,.gateway-grid{ grid-template-columns:1fr !important; } }
      `}</style>

      <IndustryNav sector={sector} industryPath={industryPath} />
      <IndustryHero sector={sector} hero={hero} />

      {activeStudy ? (
        <SampleView
          studyType={activeStudy}
          sector={sector}
          items={shown}
          onBack={() => { setActiveType(null); window.scrollTo({ top:0, behavior:"smooth" }); }}
        />
      ) : (
        <StudyTypeGateway types={availableTypes} onSelect={setActiveType} />
      )}

      <footer style={{ borderTop:`1px solid ${NS.rule}`,maxWidth:1160,
        margin:"clamp(44px,6vw,80px) auto 0",
        padding:"22px clamp(20px,4vw,44px) 40px",
        display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10 }}>
        <Logo height={17} opacity={0.55} />
        <span style={{ fontSize:11,color:NS.muted,letterSpacing:"0.12em",textTransform:"uppercase" }}>
          Research · {sector.label}
        </span>
      </footer>
    </div>
  );
}
