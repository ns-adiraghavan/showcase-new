// ─── /research/:industry — shared industry research layout (alt) ───
// Same insight carousel on top for every industry; samples below are
// filtered to the active industry. Accepts industryId prop.

import { useState, useEffect, useRef } from "react";
import logoSrc from "./assets/netscribes-logo.png";
import {
  NS, SECTORS, STUDY_TYPES, RESEARCH_DATA, GEO_REGIONS, INDUSTRY_HERO,
} from "./researchData";

const CAROUSEL = NS.blue; // carousel chrome stays NS-blue (images are blue-themed)

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

// ─── Typewriter ───────────────────────────────────────────────────
// Types out `bold` then `rest`. Retypes whenever the combined text
// changes (i.e. on slide change). Bold portion styled distinctly.
function Typewriter({ bold, rest = "", boldStyle, restStyle, speed = 18, showCursor = true }) {
  const full    = bold + rest;
  const boldLen = bold.length;
  const [n, setN] = useState(0);

  useEffect(() => {
    setN(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= full.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [full, speed]);

  const visBold = full.slice(0, Math.min(n, boldLen));
  const visRest = n > boldLen ? full.slice(boldLen, n) : "";
  const done    = n >= full.length;

  return (
    <span>
      <strong style={boldStyle}>{visBold}</strong>
      <span style={restStyle}>{visRest}</span>
      {showCursor && !done && <span className="tw-cursor" aria-hidden="true">|</span>}
    </span>
  );
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
  const bg     = active ? color : NS.surface;
  const border = active ? color : (hov ? color : NS.rule);
  const col    = active ? "#fff" : (hov ? color : NS.inkSoft);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontSize:11.5, fontWeight:active?700:500,
        color:col, background:bg,
        border:`1.5px solid ${border}`,
        borderRadius:3, padding:"5px 13px", cursor:"pointer",
        transition:"all 0.15s ease",
        fontFamily:"'DM Sans',sans-serif", whiteSpace:"nowrap",
        letterSpacing:"0.01em",
      }}>
      {label}
    </button>
  );
}

// ─── Case Tile ────────────────────────────────────────────────────
function CaseTile({ item, accent, onOpen }) {
  const [hov, setHov] = useState(false);
  const sector       = SECTORS.find(s => s.id === item.industry);
  const sectorAccent = sector?.accent || accent;
  const sectorLabel  = sector?.label || item.industry;
  const indBg   = hov ? "rgba(255,255,255,0.14)" : `${sectorAccent}12`;
  const indCol  = hov ? "rgba(255,255,255,0.85)" : sectorAccent;
  const muteBg  = hov ? "rgba(255,255,255,0.14)" : NS.paperDeep;
  const muteCol = hov ? "rgba(255,255,255,0.75)" : NS.muted;
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
    </div>
  );
}

// ─── Slide icons (one per slide, themed) ──────────────────────────
const SLIDE_ICONS = [
  // 1 · technology / chip
  (<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>),
  // 2 · market entry / compass
  (<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>),
  // 3 · competitive / bar chart
  (<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>),
  // 4 · IP / innovation / lightbulb
  (<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.3 6H8.3A7 7 0 0 1 5 9a7 7 0 0 1 7-7z"/></svg>),
];

// ─── Slide data ───────────────────────────────────────────────────
const SLIDES = [
  {
    bottleneckImg: "/tech-slides/illus-01.png",
    solutionImg:   "/tech-slides/illus-02.png",
    bottleneckBold: "Unclear technology adoption and governance requirements",
    bottleneckRest: " across AI, IoT, cloud, and other emerging digital ecosystems",
    solutionBold:   "Expert interviews and technology readiness assessments",
    solutionRest:   " to validate market demand and guide technology investments",
  },
  {
    bottleneckImg: "/tech-slides/illus-03.png",
    solutionImg:   "/tech-slides/illus-04.png",
    bottleneckBold: "Limited visibility into market-entry opportunities,",
    bottleneckRest: " target accounts, strategic partners, and ecosystem dynamics",
    solutionBold:   "Ecosystem mapping and customer profiling",
    solutionRest:   " to identify growth opportunities, target accounts, and partnership strategies",
  },
  {
    bottleneckImg: "/tech-slides/illus-05.png",
    solutionImg:   "/tech-slides/illus-06.png",
    bottleneckBold: "Rapidly evolving competitive landscape",
    bottleneckRest: " with insufficient intelligence on pricing, differentiation, customer preferences, and brand positioning",
    solutionBold:   "Competitive intelligence and pricing analysis",
    solutionRest:   " to strengthen positioning and improve go-to-market effectiveness",
  },
  {
    bottleneckImg: "/tech-slides/illus-07.png",
    solutionImg:   "/tech-slides/illus-08.png",
    bottleneckBold: "Fragmented innovation and IP ecosystem,",
    bottleneckRest: " making whitespace identification, patentability assessment, and competitive benchmarking challenging",
    solutionBold:   "Patent landscaping and IP intelligence",
    solutionRest:   " to uncover innovation white spaces, and mitigate risks",
  },
];

// ─── Panel header label ───────────────────────────────────────────
function PanelHeader({ text, dark }) {
  const col  = dark ? "#fff" : NS.ink;
  const bar  = dark ? "#fff" : CAROUSEL;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:9 }}>
      <span style={{ display:"inline-block", width:18, height:2, background:bar, borderRadius:2, flexShrink:0, opacity:dark?0.9:0.85 }} />
      <span style={{ fontSize:12, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:col }}>
        <Typewriter bold={text} boldStyle={{ fontWeight:700 }} speed={26} showCursor={false} />
      </span>
    </div>
  );
}

// ─── Single carousel panel ─────────────────────────────────────────
function SlidePanel({ src, header, bold, rest, dark, visible }) {
  const bg      = dark ? "#096388" : "#ffffff";
  const textCol = dark ? "#ffffff" : NS.ink;
  const restCol = dark ? "rgba(255,255,255,0.88)" : NS.inkSoft;
  const ruleCol = dark ? "rgba(255,255,255,0.22)" : `${CAROUSEL}25`;

  return (
    <div style={{ background:bg, display:"flex", flexDirection:"column" }}>
      {/* Header */}
      <div style={{ padding:"18px 26px 14px", flexShrink:0 }}>
        <PanelHeader text={header} dark={dark} />
      </div>

      {/* Illustration */}
      <div style={{
        width:"100%", aspectRatio:"2.2/1", overflow:"hidden", flexShrink:0,
        opacity: visible ? 1 : 0, transition:"opacity 0.5s ease",
      }}>
        <img src={src} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", display:"block" }} />
      </div>

      {/* Caption (typewriter) */}
      <div style={{ padding:"20px 26px 24px", flex:1, opacity: visible ? 1 : 0, transition:"opacity 0.5s ease" }}>
        <p style={{ fontSize:13.5, lineHeight:1.6, margin:0, minHeight:"3.2em" }}>
          {visible && (
            <Typewriter
              bold={bold}
              rest={rest}
              boldStyle={{ color:textCol, fontWeight:700 }}
              restStyle={{ color:restCol, fontWeight:400 }}
              speed={15}
            />
          )}
        </p>
        <div style={{ height:1, background:ruleCol, marginTop:16 }} />
      </div>
    </div>
  );
}

// ─── Center pulsing icon nav ──────────────────────────────────────
function IconNav({ idx, goTo, orientation }) {
  const vertical = orientation === "vertical";
  return (
    <div style={{
      display:"flex",
      flexDirection: vertical ? "column" : "row",
      gap: vertical ? 14 : 12,
      alignItems:"center",
    }}>
      {SLIDES.map((_, i) => {
        const active = i === idx;
        return (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: active ? 38 : 32,
              height: active ? 38 : 32,
              borderRadius:"50%",
              border: active ? "none" : `1.5px solid ${CAROUSEL}22`,
              background: active ? CAROUSEL : "rgba(255,255,255,0.92)",
              color: active ? "#fff" : CAROUSEL,
              display:"flex", alignItems:"center", justifyContent:"center",
              cursor:"pointer",
              boxShadow: active ? "0 4px 14px rgba(0,95,134,0.32)" : "0 2px 8px rgba(0,0,0,0.10)",
              transition:"all 0.32s cubic-bezier(0.4,0,0.2,1)",
              animation: active ? "icon-pulse 2.2s ease-in-out infinite" : "none",
              opacity: active ? 1 : 0.78,
              padding:0,
              WebkitTapHighlightColor:"transparent",
            }}
          >
            {SLIDE_ICONS[i]}
          </button>
        );
      })}
    </div>
  );
}

// ─── Insight carousel ─────────────────────────────────────────────
function InsightBoxes() {
  const total  = SLIDES.length;
  const [idx, setIdx]         = useState(0);
  const [visible, setVisible] = useState(true);
  const paused = useRef(false);
  const timer  = useRef(null);

  const goTo = (i) => {
    if (i === idx) return;
    setVisible(false);
    setTimeout(() => { setIdx(i); setVisible(true); }, 260);
  };
  const next = () => goTo((idx + 1) % total);
  const prev = () => goTo((idx - 1 + total) % total);

  useEffect(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => { if (!paused.current) next(); }, 6500);
    return () => clearInterval(timer.current);
  }, [idx]);

  const slide = SLIDES[idx];

  return (
    <div
      style={{ maxWidth:1160, margin:"0 auto", padding:"0 clamp(16px,4vw,44px)", marginBottom:36 }}
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      <div style={{
        borderRadius:4, overflow:"hidden",
        boxShadow:"0 4px 28px rgba(0,95,134,0.13)",
        border:`1px solid ${NS.rule}`,
      }}>
        {/* Panels + floating center icon strip */}
        <div style={{ position:"relative" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }} className="ta-insight-grid">
            <SlidePanel src={slide.bottleneckImg} header="Industry Bottlenecks"
              bold={slide.bottleneckBold} rest={slide.bottleneckRest} dark={true} visible={visible} />
            <SlidePanel src={slide.solutionImg} header="How Netscribes Solves This"
              bold={slide.solutionBold} rest={slide.solutionRest} dark={false} visible={visible} />
          </div>

          {/* Vertical icon strip — centred on the seam (desktop only) */}
          <div className="ta-iconstrip-vert" style={{
            position:"absolute", left:"50%", top:"50%",
            transform:"translate(-50%, -50%)", zIndex:5,
          }}>
            <IconNav idx={idx} goTo={goTo} orientation="vertical" />
          </div>
        </div>

        {/* Controls bar */}
        <div style={{
          background: NS.paperDeep,
          padding: "12px 24px",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          borderTop: `1px solid ${CAROUSEL}18`,
        }}>
          <div />
          {/* Horizontal icon strip — mobile only (centre column) */}
          <div className="ta-iconstrip-horz" style={{ justifyContent:"center" }}>
            <IconNav idx={idx} goTo={goTo} orientation="horizontal" />
          </div>
          {/* Counter + arrows */}
          <div style={{ display:"flex", alignItems:"center", gap:7, justifyContent:"flex-end" }}>
            <span style={{ fontSize:11, fontWeight:500, color:NS.muted, letterSpacing:"0.04em", fontFamily:"'DM Sans',sans-serif", minWidth:32, textAlign:"right" }}>
              {idx+1} / {total}
            </span>
            <button onClick={prev}
              onMouseEnter={e => e.currentTarget.style.background=`${CAROUSEL}20`}
              onMouseLeave={e => e.currentTarget.style.background=`${CAROUSEL}0c`}
              style={{ width:30, height:30, borderRadius:3, border:"none", background:`${CAROUSEL}0c`,
                color:CAROUSEL, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
                transition:"background 0.15s", WebkitTapHighlightColor:"transparent" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button onClick={next}
              onMouseEnter={e => e.currentTarget.style.background=`${CAROUSEL}20`}
              onMouseLeave={e => e.currentTarget.style.background=`${CAROUSEL}0c`}
              style={{ width:30, height:30, borderRadius:3, border:"none", background:`${CAROUSEL}0c`,
                color:CAROUSEL, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
                transition:"background 0.15s", WebkitTapHighlightColor:"transparent" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────
export default function TechAlt({ industryId = "tech" }) {
  const sector  = SECTORS.find(s => s.id === industryId) || SECTORS[0];
  const hero    = INDUSTRY_HERO[sector.id];
  const accent  = sector.accent;

  const allItems = RESEARCH_DATA.filter(d => d.industry === sector.id);

  const availableStudyTypes = STUDY_TYPES.filter(st => allItems.some(d => d.studyType === st.id));
  const [activeStudyType, setActiveStudyType] = useState(null);

  const availableRegions = GEO_REGIONS.filter(g => allItems.some(d => d.geo.includes(g.id)));
  const [activeRegion, setActiveRegion] = useState(null);

  const [viewer, setViewer] = useState(null);

  // reset filters when industry changes
  useEffect(() => { setActiveStudyType(null); setActiveRegion(null); }, [sector.id]);

  let filtered = activeStudyType ? allItems.filter(d => d.studyType === activeStudyType) : allItems;
  filtered = activeRegion ? filtered.filter(d => d.geo.includes(activeRegion)) : filtered;

  return (
    <div style={{ background:NS.paper, minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');
        html { scroll-behavior:smooth; }
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { background:#F5F1EA; font-family:'DM Sans',system-ui,sans-serif; color:#0F1B27; -webkit-font-smoothing:antialiased; }
        button, a { font-family:'DM Sans',system-ui,sans-serif; }
        @keyframes rc-pop { from{opacity:0;transform:scale(0.97) translateY(10px);}to{opacity:1;transform:none;} }
        @keyframes icon-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(0,95,134,0.45), 0 4px 14px rgba(0,95,134,0.32); }
          65%  { box-shadow: 0 0 0 9px rgba(0,95,134,0),   0 4px 14px rgba(0,95,134,0.32); }
          100% { box-shadow: 0 0 0 0 rgba(0,95,134,0),     0 4px 14px rgba(0,95,134,0.32); }
        }
        @keyframes tw-blink { 0%,49%{opacity:1;} 50%,100%{opacity:0;} }
        .tw-cursor { display:inline-block; margin-left:1px; font-weight:400; animation:tw-blink 0.9s steps(1) infinite; opacity:0.7; }

        /* icon strip: vertical on desktop, horizontal in control bar on mobile */
        .ta-iconstrip-vert { display:block; }
        .ta-iconstrip-horz { display:none; }
        @media (max-width:640px) {
          .ta-insight-grid { grid-template-columns:1fr !important; }
          .ta-iconstrip-vert { display:none; }
          .ta-iconstrip-horz { display:flex; }
          .ta-filter-bar { grid-template-columns:1fr !important; }
          .ta-filter-bar > div:first-child { border-right:none !important; border-bottom:1px solid rgba(0,95,134,0.13) !important; }
        }
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
        padding:"clamp(36px,6vw,72px) clamp(16px,4vw,44px) 28px" }}>
        <p style={{ fontSize:11,fontWeight:700,letterSpacing:"0.26em",textTransform:"uppercase",color:NS.red,marginBottom:20,display:"flex",alignItems:"center",gap:10 }}>
          <span style={{ display:"inline-block",width:22,height:1,background:NS.red,flexShrink:0 }} />
          Research · {sector.label}
        </p>
        <h1 style={{ fontWeight:400,fontSize:"clamp(36px,6.4vw,76px)",lineHeight:1.02,letterSpacing:"-0.025em",color:NS.ink,textWrap:"balance",marginBottom:14 }}>
          {hero.noun} <em style={{ fontStyle:"normal",color:accent }}>Insights</em>
        </h1>
        <p style={{ color:NS.inkSoft,fontSize:14,lineHeight:1.6,fontWeight:400,maxWidth:680 }}>
          {hero.desc}
        </p>
      </div>

      {/* Insight carousel — identical across industries */}
      <InsightBoxes />

      {/* Filter bar */}
      <div style={{ maxWidth:1160,margin:"0 auto",padding:"0 clamp(16px,4vw,44px)" }}>
        <div className="ta-filter-bar" style={{
          display:"grid", gridTemplateColumns:"1fr 1fr",
          background:NS.surface, border:`1px solid ${NS.rule}`,
          borderRadius:4, marginBottom:28, overflow:"hidden",
        }}>
          <div style={{ padding:"16px 22px", borderRight:`1px solid ${NS.rule}` }}>
            <span style={{ display:"block", marginBottom:11, fontSize:9, fontWeight:700, letterSpacing:"0.20em", textTransform:"uppercase", color:NS.muted }}>Study Type</span>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              <PillBtn label="All" active={!activeStudyType} color={accent} onClick={() => setActiveStudyType(null)} />
              {availableStudyTypes.map(st => (
                <PillBtn key={st.id} label={st.label} active={activeStudyType === st.id} color={st.accent}
                  onClick={() => setActiveStudyType(activeStudyType === st.id ? null : st.id)} />
              ))}
            </div>
          </div>
          <div style={{ padding:"16px 22px" }}>
            <span style={{ display:"block", marginBottom:11, fontSize:9, fontWeight:700, letterSpacing:"0.20em", textTransform:"uppercase", color:NS.muted }}>Region</span>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
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

      {viewer && <CaseViewer item={viewer} accent={accent} onClose={() => setViewer(null)} />}
    </div>
  );
}
