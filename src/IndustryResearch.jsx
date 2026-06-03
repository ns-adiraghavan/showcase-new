// ─── /research/[industry] — Industry Research page ───────────────
// Mirrors the Research page design system exactly. Accepts an
// `industryId` prop ("auto","bfsi","tech",…) and derives everything
// from the shared researchData arrays.
import { useState, useEffect } from "react";
import logoSrc from "./assets/netscribes-logo.png";
import {
  NS, SECTORS, STUDY_TYPES, RESEARCH_DATA, INDUSTRY_HERO,
} from "./researchData";

// Drive thumbnail — same sharing auth as /preview, returns JPEG ~480px wide
function driveThumbnail(id) {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w480`;
}

// Pull the file ID out of the stored driveEmbedUrl
function fileIdFrom(item) {
  const m = item.driveEmbedUrl.match(/\/d\/([^/]+)\//);
  return m ? m[1] : null;
}

// ─── Logo ─────────────────────────────────────────────────────────
function Logo({ height = 19, opacity = 0.85 }) {
  return <img src={logoSrc} alt="Netscribes" style={{ height, opacity, objectFit:"contain", display:"block" }} />;
}

// ─── Hooks ────────────────────────────────────────────────────────
function useLock(on) {
  useEffect(() => { document.body.style.overflow = on ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [on]);
}

// ─── Case Viewer (full-screen overlay) ───────────────────────────
function CaseViewer({ item, accent, onClose }) {
  useLock(true);
  useEffect(() => { const h = e => e.key==="Escape"&&onClose(); window.addEventListener("keydown",h); return ()=>window.removeEventListener("keydown",h); }, [onClose]);
  const sector = SECTORS.find(s=>s.id===item.industry);
  const study  = STUDY_TYPES.find(s=>s.id===item.studyType);
  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()} style={{ position:"fixed",inset:0,zIndex:4000,background:"rgba(15,27,39,0.82)",backdropFilter:"blur(10px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24 }}>
      <div style={{ background:NS.surface,borderRadius:3,width:"100%",maxWidth:900,maxHeight:"92vh",display:"flex",flexDirection:"column",boxShadow:"0 40px 100px rgba(0,0,0,0.35)",animation:"rc-pop 0.2s ease both" }}>
        <div style={{ height:4,background:accent,borderRadius:"3px 3px 0 0",flexShrink:0 }} />
        <div style={{ padding:"20px 24px 16px",borderBottom:`1px solid ${NS.rule}`,flexShrink:0 }}>
          <div style={{ display:"flex",alignItems:"flex-start",gap:16,justifyContent:"space-between" }}>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex",gap:6,marginBottom:9,flexWrap:"wrap" }}>
                {study   && <span style={{ fontSize:10,fontWeight:700,letterSpacing:"0.11em",textTransform:"uppercase",color:study.accent,background:`${study.accent}14`,padding:"2px 7px",borderRadius:2 }}>{study.label}</span>}
                {sector  && <span style={{ fontSize:10,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:sector.accent,background:`${sector.accent}12`,padding:"2px 7px",borderRadius:2 }}>{sector.label}</span>}
                {item.primaryType && <span style={{ fontSize:10,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:NS.muted,background:NS.paperDeep,padding:"2px 7px",borderRadius:2 }}>{item.primaryType}</span>}
                {item.geo.slice(0,3).map(g=><span key={g} style={{ fontSize:10,fontWeight:500,color:NS.muted,background:NS.paperDeep,padding:"2px 7px",borderRadius:2 }}>{g}</span>)}
              </div>
              <h2 style={{ fontSize:"clamp(15px,1.8vw,19px)",fontWeight:700,color:NS.ink,lineHeight:1.35,letterSpacing:"-0.015em",textWrap:"balance" }}>{item.title}</h2>
              <p style={{ marginTop:5,fontSize:13,color:NS.muted,lineHeight:1.6,maxWidth:600 }}>{item.desc}</p>
              <a href={item.driveViewUrl} target="_blank" rel="noreferrer" style={{ display:"inline-flex",alignItems:"center",gap:5,marginTop:9,fontSize:11,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:accent,textDecoration:"none" }}>Open in Drive ↗</a>
            </div>
            <button onClick={onClose} style={{ flexShrink:0,width:30,height:30,borderRadius:"50%",border:`1px solid ${NS.rule}`,background:NS.paper,cursor:"pointer",fontSize:14,color:NS.muted,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif" }}>✕</button>
          </div>
        </div>
        <div style={{ flex:1,minHeight:0,background:NS.paperDeep }}>
          <iframe src={item.driveEmbedUrl} title={item.title} style={{ width:"100%",height:"100%",minHeight:460,border:"none" }} allow="autoplay" />
        </div>
      </div>
    </div>
  );
}

// ─── Sticky Nav ───────────────────────────────────────────────────
function IndustryNav({ sector }) {
  return (
    <div style={{ position:"sticky",top:0,zIndex:100,background:"rgba(245,241,234,0.95)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${NS.rule}`,display:"flex",alignItems:"center",height:52,padding:"0 clamp(16px,4vw,44px)" }}>
      <a href="/research" style={{ display:"flex",alignItems:"center",gap:9,textDecoration:"none",marginRight:"auto",minWidth:0,overflow:"hidden" }}>
        <Logo height={19} opacity={0.85} />
        <span className="nav-sep" style={{ fontSize:10,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:NS.muted,whiteSpace:"nowrap" }}> / Research</span>
        <span className="nav-ind" style={{ fontSize:10,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:sector.accent,whiteSpace:"nowrap" }}> / {sector.tag}</span>
      </a>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────
function IndustryHero({ sector, hero }) {
  return (
    <div style={{ maxWidth:1160,margin:"0 auto",padding:"clamp(36px,6vw,72px) clamp(16px,4vw,44px) clamp(24px,4vw,40px)",borderBottom:`1px solid ${NS.rule}`,position:"relative" }}>
      <span style={{ position:"absolute",top:"clamp(20px,3.5vw,32px)",right:"clamp(16px,4vw,44px)",fontSize:9,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",border:`1px solid ${sector.accent}50`,color:sector.accent,padding:"3px 8px",borderRadius:2,whiteSpace:"nowrap" }}>{sector.tag}</span>
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

// ─── Study-type filter bar ────────────────────────────────────────
function FilterBar({ types, active, onSelect }) {
  return (
    <div className="filter-strip" style={{ display:"flex",flexWrap:"wrap",borderBottom:`1px solid ${NS.rule}`,background:NS.paper }}>
      {types.map((st,i)=>(
        <FilterTab key={st.id} st={st} active={active===st.id} last={i===types.length-1} onClick={()=>onSelect(st.id)} />
      ))}
    </div>
  );
}

function FilterTab({ st, active, last, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{ fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:active?700:500,color:active?NS.surface:(hov?NS.ink:NS.muted),background:active?NS.blue:(hov?NS.paperDeep:NS.surface),border:"none",borderRight:!last?`1px solid ${NS.rule}`:"none",padding:"9px 20px",cursor:"pointer",transition:"all 0.18s",whiteSpace:"nowrap" }}>
      {st.label}
    </button>
  );
}

// ─── Sample card ──────────────────────────────────────────────────
function SampleCard({ item, accent, onOpen }) {
  const [hov, setHov] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const study    = STUDY_TYPES.find(s=>s.id===item.studyType);
  const tagBg    = hov ? "rgba(255,255,255,0.18)" : `${(study?.accent)||accent}15`;
  const tagFg    = hov ? "#fff" : (study?.accent || accent);
  const geoBg    = hov ? "rgba(255,255,255,0.18)" : NS.paperDeep;
  const geoFg    = hov ? "rgba(255,255,255,0.9)" : NS.muted;

  const fileId   = fileIdFrom(item);
  const thumbSrc = fileId ? driveThumbnail(fileId) : null;
  const showThumb = thumbSrc && !imgError;

  return (
    <button onClick={()=>onOpen(item)}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{ textAlign:"left",background:hov?accent:NS.surface,border:"none",borderRight:`1px solid ${NS.rule}`,borderBottom:`1px solid ${NS.rule}`,
        padding:0,cursor:"pointer",display:"flex",flexDirection:"column",
        transition:"background 0.22s ease",fontFamily:"'DM Sans',sans-serif",width:"100%" }}>

      {/* Thumbnail strip */}
      {showThumb && (
        <div style={{ width:"100%",height:148,overflow:"hidden",flexShrink:0,position:"relative",background:NS.paperDeep }}>
          {!imgLoaded && (
            <div style={{ position:"absolute",inset:0,background:`${accent}08`,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <div style={{ width:28,height:28,borderRadius:"50%",border:`2px solid ${accent}30`,borderTopColor:accent,animation:"spin 0.8s linear infinite" }} />
            </div>
          )}
          <img
            src={thumbSrc}
            alt=""
            onLoad={()=>setImgLoaded(true)}
            onError={()=>setImgError(true)}
            style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"top",
              opacity:imgLoaded?1:0,
              filter:hov?"brightness(0.7)":"none",
              transition:"opacity 0.3s ease, filter 0.22s ease" }}
          />
          {hov && (
            <div style={{ position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <span style={{ fontSize:28,color:"rgba(255,255,255,0.9)" }}>↗</span>
            </div>
          )}
        </div>
      )}

      {/* Text content */}
      <div style={{ padding:"clamp(16px,2vw,22px) clamp(18px,2vw,24px) clamp(16px,2vw,20px)",display:"flex",flexDirection:"column",gap:10,flex:1 }}>
        <div style={{ display:"flex",gap:5,flexWrap:"wrap" }}>
          <span style={{ fontSize:9,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",background:tagBg,color:tagFg,padding:"2px 7px",borderRadius:2,transition:"all 0.22s" }}>{item.studyType}</span>
          {item.geo.map(g=><span key={g} style={{ fontSize:9,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",background:geoBg,color:geoFg,padding:"2px 7px",borderRadius:2,transition:"all 0.22s" }}>{g}</span>)}
        </div>
        <h3 style={{ fontSize:"clamp(14px,1.45vw,17px)",fontWeight:700,letterSpacing:"-0.015em",lineHeight:1.25,color:hov?"#fff":NS.ink,textWrap:"balance",transition:"color 0.22s",margin:0 }}>{item.title}</h3>
        {!showThumb && (
          <div style={{ display:"flex",justifyContent:"flex-end",marginTop:"auto" }}>
            <span style={{ fontSize:16,color:hov?"rgba(255,255,255,0.85)":accent,transform:hov?"translate(2px,-2px)":"none",transition:"all 0.22s" }}>↗</span>
          </div>
        )}
      </div>
    </button>
  );
}

// ─── Sample grid ──────────────────────────────────────────────────
function SampleGrid({ items, accent, onOpen }) {
  if (items.length === 0) return (
    <div style={{ padding:"56px 0",textAlign:"center",color:NS.muted,fontSize:14 }}>No samples published for this study type yet.</div>
  );
  return (
    <div key={accent+items.length} className="sample-grid" style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",borderLeft:`1px solid ${NS.rule}`,animation:"rc-pop 0.22s ease both" }}>
      {items.map((item,i)=>(
        <SampleCard key={item.title+i} item={item} accent={accent} onOpen={onOpen} />
      ))}
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────
export default function IndustryResearch({ industryId = "auto" }) {
  const sector = SECTORS.find(s=>s.id===industryId) || SECTORS[0];
  const hero   = INDUSTRY_HERO[sector.id] || { noun:sector.tag, desc:sector.blurb };

  const samples        = RESEARCH_DATA.filter(d=>d.industry===sector.id);
  const availableTypes = STUDY_TYPES.filter(st => samples.some(s=>s.studyType===st.id));

  const [activeType, setActiveType] = useState(availableTypes[0]?.id || null);
  const [viewer, setViewer]         = useState(null);

  useEffect(() => { setActiveType(availableTypes[0]?.id || null); }, [industryId]);

  const activeStudy = STUDY_TYPES.find(s=>s.id===activeType);
  const gridAccent  = activeStudy?.accent || sector.accent;
  const shown       = samples.filter(d=>d.studyType===activeType);

  return (
    <div style={{ background:NS.paper, minHeight:"100vh" }}>
      <style>{`
        html { scroll-behavior:smooth; }
        body { background:#F5F1EA; font-family:'DM Sans',system-ui,sans-serif; color:#0F1B27; -webkit-font-smoothing:antialiased; }
        button, a { font-family:'DM Sans',system-ui,sans-serif; }
        @keyframes rc-pop { from{opacity:0;transform:scale(0.97) translateY(10px);} to{opacity:1;transform:none;} }
        @keyframes spin   { to { transform: rotate(360deg); } }
        @media (max-width:860px){ .hero-row{ grid-template-columns:1fr !important; align-items:start !important; } }
        @media (max-width:760px){ .sample-grid{ grid-template-columns:1fr 1fr !important; } }
        @media (max-width:520px){ .sample-grid{ grid-template-columns:1fr !important; } }
        @media (max-width:420px){ .nav-sep,.nav-ind{ display:none !important; } }
      `}</style>

      <IndustryNav sector={sector} />
      <IndustryHero sector={sector} hero={hero} />

      <section id="samples">
        <FilterBar types={availableTypes} active={activeType} onSelect={setActiveType} />
        <div style={{ maxWidth:1160,margin:"0 auto",padding:"clamp(28px,4vw,44px) clamp(16px,4vw,44px) 0" }}>
          <div style={{ display:"flex",alignItems:"baseline",justifyContent:"space-between",gap:16,marginBottom:18,flexWrap:"wrap" }}>
            <h2 style={{ fontSize:"clamp(20px,2.4vw,28px)",fontWeight:700,letterSpacing:"-0.02em",color:NS.ink }}>
              {activeStudy?.label}
            </h2>
            <span style={{ fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:NS.muted }}>
              {shown.length} {shown.length===1?"sample":"samples"}
            </span>
          </div>
          <SampleGrid items={shown} accent={gridAccent} onOpen={setViewer} />
        </div>
      </section>

      <footer style={{ borderTop:`1px solid ${NS.rule}`,maxWidth:1160,margin:"clamp(44px,6vw,80px) auto 0",padding:"22px clamp(20px,4vw,44px) 40px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10 }}>
        <Logo height={17} opacity={0.55} />
        <span style={{ fontSize:11,color:NS.muted,letterSpacing:"0.12em",textTransform:"uppercase" }}>Research · {sector.label}</span>
      </footer>

      {viewer && (
        <CaseViewer item={viewer} accent={(STUDY_TYPES.find(s=>s.id===viewer.studyType)?.accent)||sector.accent} onClose={()=>setViewer(null)} />
      )}
    </div>
  );
}
