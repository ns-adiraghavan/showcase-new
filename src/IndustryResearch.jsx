// ─── /research/[industry] — unified industry research page ──────────
// Layout: Nav → Hero → Insight carousel (4 slides, seam icons) → filter bar → case tiles
// All 8 industries share this component via industryId prop.

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

// ─── Case Viewer modal ────────────────────────────────────────────
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
        display:"flex",flexDirection:"column",boxShadow:"0 40px 100px rgba(0,0,0,0.35)",animation:"ir-pop 0.2s ease both" }}>
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
      style={{
        fontSize: 11.5, fontWeight: active ? 700 : 500,
        color: active ? "#fff" : (hov ? color : NS.inkSoft),
        background: active ? color : NS.surface,
        border: `1.5px solid ${active ? color : (hov ? color : NS.rule)}`,
        borderRadius: 3, padding: "5px 13px", cursor: "pointer",
        transition: "all 0.15s ease",
        fontFamily: "'DM Sans',sans-serif", whiteSpace: "nowrap",
        letterSpacing: "0.01em",
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

// ─── Per-industry carousel slide content ──────────────────────────
// All industries reuse the same 8 tech illustrations (placeholder until
// design team delivers industry-specific assets). Captions are tailored.
const INDUSTRY_SLIDES = {
  tech: [
    {
      bottleneckImg: "/tech-slides/illus-01.png", solutionImg: "/tech-slides/illus-02.png",
      bottleneckBold: "Unclear technology adoption and governance requirements",
      bottleneckRest: " across AI, IoT, cloud, and other emerging digital ecosystems",
      solutionBold: "Expert interviews and technology readiness assessments",
      solutionRest: " to validate market demand and guide technology investments",
    },
    {
      bottleneckImg: "/tech-slides/illus-03.png", solutionImg: "/tech-slides/illus-04.png",
      bottleneckBold: "Limited visibility into market-entry opportunities,",
      bottleneckRest: " target accounts, strategic partners, and ecosystem dynamics",
      solutionBold: "Ecosystem mapping and customer profiling",
      solutionRest: " to identify growth opportunities, target accounts, and partnership strategies",
    },
    {
      bottleneckImg: "/tech-slides/illus-05.png", solutionImg: "/tech-slides/illus-06.png",
      bottleneckBold: "Rapidly evolving competitive landscape",
      bottleneckRest: " with insufficient intelligence on pricing, differentiation, customer preferences, and brand positioning",
      solutionBold: "Competitive intelligence and pricing analysis",
      solutionRest: " to strengthen positioning and improve go-to-market effectiveness",
    },
    {
      bottleneckImg: "/tech-slides/illus-07.png", solutionImg: "/tech-slides/illus-08.png",
      bottleneckBold: "Fragmented innovation and IP ecosystem,",
      bottleneckRest: " making whitespace identification, patentability assessment, and competitive benchmarking challenging",
      solutionBold: "Patent landscaping and IP intelligence",
      solutionRest: " to uncover innovation white spaces, and mitigate risks",
    },
  ],
  telecom: [
    {
      bottleneckImg: "/tech-slides/illus-01.png", solutionImg: "/tech-slides/illus-02.png",
      bottleneckBold: "Uncertainty around 5G monetisation models",
      bottleneckRest: " and which network segments offer defensible revenue opportunities",
      solutionBold: "Market sizing and operator benchmarking",
      solutionRest: " to identify high-value 5G use cases and prioritise infrastructure investment",
    },
    {
      bottleneckImg: "/tech-slides/illus-03.png", solutionImg: "/tech-slides/illus-04.png",
      bottleneckBold: "Difficulty mapping digital ecosystem adjacencies,",
      bottleneckRest: " OTT player strategies, and partnership opportunities across global telecom markets",
      solutionBold: "Ecosystem mapping and competitive intelligence",
      solutionRest: " to surface partnership plays and pre-empt competitive threats",
    },
    {
      bottleneckImg: "/tech-slides/illus-05.png", solutionImg: "/tech-slides/illus-06.png",
      bottleneckBold: "Unclear AI and automation maturity across operator segments",
      bottleneckRest: " limiting the ability to benchmark readiness and build targeted positioning",
      solutionBold: "AI readiness benchmarking and capability gap assessment",
      solutionRest: " to position solutions where digital transformation demand is highest",
    },
    {
      bottleneckImg: "/tech-slides/illus-07.png", solutionImg: "/tech-slides/illus-08.png",
      bottleneckBold: "Complex enterprise connectivity procurement cycles",
      bottleneckRest: " with limited visibility into buyer decision structures and service delivery benchmarks",
      solutionBold: "Sales enablement and process benchmarking",
      solutionRest: " to shorten sales cycles and sharpen competitive differentiation for B2B telecom teams",
    },
  ],
  retail: [
    {
      bottleneckImg: "/tech-slides/illus-01.png", solutionImg: "/tech-slides/illus-02.png",
      bottleneckBold: "Limited understanding of evolving shopper behaviour",
      bottleneckRest: " across digital and physical channels, especially in high-growth and emerging markets",
      solutionBold: "Consumer journey research and U&A studies",
      solutionRest: " to decode purchase triggers, channel preferences, and loyalty drivers",
    },
    {
      bottleneckImg: "/tech-slides/illus-03.png", solutionImg: "/tech-slides/illus-04.png",
      bottleneckBold: "Weak brand health signals and unclear category positioning",
      bottleneckRest: " against a rapidly shifting competitive set",
      solutionBold: "Brand tracking and competitive benchmarking",
      solutionRest: " to monitor equity, identify positioning gaps, and guide brand investment decisions",
    },
    {
      bottleneckImg: "/tech-slides/illus-05.png", solutionImg: "/tech-slides/illus-06.png",
      bottleneckBold: "Inconsistent product performance feedback",
      bottleneckRest: " and difficulty validating innovation concepts before full commercial launch",
      solutionBold: "Concept testing and product satisfaction research",
      solutionRest: " to de-risk innovation and align product development with real consumer needs",
    },
    {
      bottleneckImg: "/tech-slides/illus-07.png", solutionImg: "/tech-slides/illus-08.png",
      bottleneckBold: "IP vulnerabilities in materials and packaging innovation,",
      bottleneckRest: " with limited insight into competitor patent activity and whitespace opportunities",
      solutionBold: "Patent landscape and IP portfolio analysis",
      solutionRest: " to protect product innovations and identify defensible whitespace in retail and apparel",
    },
  ],
  fnb: [
    {
      bottleneckImg: "/tech-slides/illus-01.png", solutionImg: "/tech-slides/illus-02.png",
      bottleneckBold: "Low confidence in new product and flavour concepts",
      bottleneckRest: " before committing to full-scale launch across competitive food and beverage categories",
      solutionBold: "Concept testing and sensory consumer research",
      solutionRest: " to validate product ideas, identify winning territories, and reduce launch risk",
    },
    {
      bottleneckImg: "/tech-slides/illus-03.png", solutionImg: "/tech-slides/illus-04.png",
      bottleneckBold: "Fragmented competitive landscape intelligence",
      bottleneckRest: " with gaps in pricing, distribution, and brand positioning across global F&B markets",
      solutionBold: "Competitive landscape analysis and market entry studies",
      solutionRest: " to sharpen positioning and identify underserved segments before market entry",
    },
    {
      bottleneckImg: "/tech-slides/illus-05.png", solutionImg: "/tech-slides/illus-06.png",
      bottleneckBold: "Unclear consumer preference and occasion dynamics",
      bottleneckRest: " across premium, health, and indulgence segments in food and beverage",
      solutionBold: "Consumer segmentation and purchase behaviour research",
      solutionRest: " to reveal occasion triggers, segment nuances, and optimal positioning strategies",
    },
    {
      bottleneckImg: "/tech-slides/illus-07.png", solutionImg: "/tech-slides/illus-08.png",
      bottleneckBold: "Difficulty sizing new category opportunities",
      bottleneckRest: " such as functional beverages, premium ingredients, and health-focused product lines",
      solutionBold: "Market sizing and GTM strategy development",
      solutionRest: " to quantify opportunity, define ICPs, and design channel activation plans for F&B launches",
    },
  ],
  auto: [
    {
      bottleneckImg: "/tech-slides/illus-01.png", solutionImg: "/tech-slides/illus-02.png",
      bottleneckBold: "Uncertain EV transition timelines and OEM investment signals",
      bottleneckRest: " across global markets making demand forecasting and product planning difficult",
      solutionBold: "EV market sizing and OEM strategy intelligence",
      solutionRest: " to map adoption curves, identify demand pockets, and align product roadmaps",
    },
    {
      bottleneckImg: "/tech-slides/illus-03.png", solutionImg: "/tech-slides/illus-04.png",
      bottleneckBold: "Limited insight into ADAS and connected vehicle ecosystems,",
      bottleneckRest: " including supplier dynamics, regulatory requirements, and OEM integration pathways",
      solutionBold: "Technology landscape mapping and competitive benchmarking",
      solutionRest: " to navigate ADAS development, identify partners, and de-risk platform decisions",
    },
    {
      bottleneckImg: "/tech-slides/illus-05.png", solutionImg: "/tech-slides/illus-06.png",
      bottleneckBold: "Insufficient understanding of in-vehicle consumer preferences",
      bottleneckRest: " for emerging features like health monitoring, HUD systems, and wellness tech",
      solutionBold: "Primary consumer research and feature prioritisation studies",
      solutionRest: " to validate willingness-to-pay and prioritise product features for next-gen vehicles",
    },
    {
      bottleneckImg: "/tech-slides/illus-07.png", solutionImg: "/tech-slides/illus-08.png",
      bottleneckBold: "Fragmented automotive IP landscape",
      bottleneckRest: " with whitespace gaps in ADAS, EV systems, and cabin technology going unmapped",
      solutionBold: "Patent landscape studies and whitespace analysis",
      solutionRest: " to uncover innovation opportunities and protect IP in high-velocity automotive technology segments",
    },
  ],
  bfsi: [
    {
      bottleneckImg: "/tech-slides/illus-01.png", solutionImg: "/tech-slides/illus-02.png",
      bottleneckBold: "Lack of structured market intelligence on fintech and embedded finance,",
      bottleneckRest: " limiting the ability to anticipate competitive threats and size emerging opportunities",
      solutionBold: "Market landscape studies and opportunity sizing",
      solutionRest: " to map the fintech ecosystem, identify growth segments, and guide strategic investment",
    },
    {
      bottleneckImg: "/tech-slides/illus-03.png", solutionImg: "/tech-slides/illus-04.png",
      bottleneckBold: "Insufficient due diligence depth",
      bottleneckRest: " for M&A targets, PE deals, and fund investments in financial services",
      solutionBold: "Investment research and commercial due diligence",
      solutionRest: " to validate target attractiveness, assess competitive dynamics, and underwrite confident decisions",
    },
    {
      bottleneckImg: "/tech-slides/illus-05.png", solutionImg: "/tech-slides/illus-06.png",
      bottleneckBold: "Weak insight into customer engagement and brand perception",
      bottleneckRest: " across retail banking, insurance, and payments products",
      solutionBold: "Consumer research and brand benchmarking",
      solutionRest: " to measure NPS, track share-of-wallet, and reveal the drivers of loyalty and churn",
    },
    {
      bottleneckImg: "/tech-slides/illus-07.png", solutionImg: "/tech-slides/illus-08.png",
      bottleneckBold: "Competitive benchmarking gaps in product and pricing design,",
      bottleneckRest: " especially across cards, loyalty programmes, and wealth management propositions",
      solutionBold: "Competitive intelligence and product benchmarking",
      solutionRest: " to compare product features, pricing architecture, and customer experience across BFSI peers",
    },
  ],
  mfg: [
    {
      bottleneckImg: "/tech-slides/illus-01.png", solutionImg: "/tech-slides/illus-02.png",
      bottleneckBold: "Unclear market opportunity and demand signals",
      bottleneckRest: " across industrial segments including materials, equipment, and process chemicals",
      solutionBold: "Market assessment and demand forecasting",
      solutionRest: " to quantify addressable opportunity and prioritise entry into high-growth industrial verticals",
    },
    {
      bottleneckImg: "/tech-slides/illus-03.png", solutionImg: "/tech-slides/illus-04.png",
      bottleneckBold: "Limited visibility into circular economy maturity and regulatory pressure",
      bottleneckRest: " across plastics, chemicals, and materials supply chains",
      solutionBold: "Sustainability landscape analysis and regulatory intelligence",
      solutionRest: " to benchmark circular economy readiness and identify compliant growth opportunities",
    },
    {
      bottleneckImg: "/tech-slides/illus-05.png", solutionImg: "/tech-slides/illus-06.png",
      bottleneckBold: "Insufficient B2B customer satisfaction intelligence",
      bottleneckRest: " across manufacturing clients, limiting retention and upsell strategy",
      solutionBold: "B2B customer satisfaction and NPS research",
      solutionRest: " to identify satisfaction gaps, renewal risks, and upsell opportunities across industrial accounts",
    },
    {
      bottleneckImg: "/tech-slides/illus-07.png", solutionImg: "/tech-slides/illus-08.png",
      bottleneckBold: "Fragmented competitive intelligence on equipment providers",
      bottleneckRest: " and industrial tool markets across emerging regions",
      solutionBold: "Competitive benchmarking and market entry research",
      solutionRest: " to map rival capabilities, channel strategies, and pricing in target industrial markets",
    },
  ],
  health: [
    {
      bottleneckImg: "/tech-slides/illus-01.png", solutionImg: "/tech-slides/illus-02.png",
      bottleneckBold: "Uncertainty around medtech go-to-market readiness",
      bottleneckRest: " and the clinical, regulatory, and competitive landscape for new diagnostic and therapeutic products",
      solutionBold: "GTM strategy and market readiness studies",
      solutionRest: " to validate product-market fit, define ICP, and map the competitive landscape for medtech launches",
    },
    {
      bottleneckImg: "/tech-slides/illus-03.png", solutionImg: "/tech-slides/illus-04.png",
      bottleneckBold: "Limited intelligence on AI adoption in drug development",
      bottleneckRest: " and advanced therapies — slowing partnership and investment decisions",
      solutionBold: "AI readiness assessment and technology landscape mapping",
      solutionRest: " to benchmark AI maturity, identify high-impact use cases, and de-risk pharma innovation decisions",
    },
    {
      bottleneckImg: "/tech-slides/illus-05.png", solutionImg: "/tech-slides/illus-06.png",
      bottleneckBold: "Weak consumer insight into health supplement and wellness purchase behaviour,",
      bottleneckRest: " limiting the ability to design effective retail and digital engagement strategies",
      solutionBold: "Consumer journey research and shopper insight studies",
      solutionRest: " to decode purchase triggers, loyalty drivers, and channel preferences in health retail",
    },
    {
      bottleneckImg: "/tech-slides/illus-07.png", solutionImg: "/tech-slides/illus-08.png",
      bottleneckBold: "Fragmented business practice intelligence across key healthcare subsectors,",
      bottleneckRest: " making it difficult to benchmark performance and identify operational best practices",
      solutionBold: "Healthcare market assessment and business practice analysis",
      solutionRest: " to benchmark industry norms, identify efficiency gaps, and guide evidence-led strategic decisions",
    },
  ],
};

// ─── Per-industry seam icons ──────────────────────────────────────
// 4 icons per industry, one per carousel slide.
// Falls back to the tech set if an industry doesn't define its own.

const ICONS = {
  // shared primitives
  chip:       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="7" width="10" height="10" rx="1"/><path d="M9 7V4M12 7V4M15 7V4M9 17v3M12 17v3M15 17v3M7 9H4M7 12H4M7 15H4M17 9h3M17 12h3M17 15h3"/></svg>,
  compass:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>,
  barChart:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="3" y1="20" x2="21" y2="20"/></svg>,
  lightbulb:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21h6M12 3a6 6 0 0 1 6 6c0 2.4-1.4 4.5-3 5.7V17a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1v-2.3C7.4 13.5 6 11.4 6 9a6 6 0 0 1 6-6z"/></svg>,
  signal:     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h.01M7 20v-4M12 20v-8M17 20V4M22 20h.01"/></svg>,
  map:        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
  brain:      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></svg>,
  shoppingBag:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  star:       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  flask:      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6m-6 0v6l-3.87 6.97A1 1 0 0 0 6 18h12a1 1 0 0 0 .87-1.5L15 9V3"/></svg>,
  carFront:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1.95-2H4.95A2 2 0 0 0 3 8l-1 7h20l-1-7Z"/><path d="M8 15v2M16 15v2M2 15h20"/><circle cx="6.5" cy="10.5" r="0.5" fill="currentColor"/><circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/></svg>,
  zap:        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  trendUp:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  coins:      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>,
  factory:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>,
  recycle:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-2.163l2.9-12.1a1.83 1.83 0 0 1 1.57-1.412L9 3"/><path d="M17 19h2.185a1.83 1.83 0 0 0 1.57-2.163l-2.9-12.1a1.83 1.83 0 0 0-1.57-1.412L15 3"/><path d="M12 3H8.5a2 2 0 0 0 0 4H12"/><path d="M12 3h3.5a2 2 0 0 1 0 4H12"/><path d="M12 7v10"/><path d="m9 19 3 2 3-2"/></svg>,
  heart:      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  pill:       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>,
};

const INDUSTRY_ICONS = {
  tech:    [ICONS.chip, ICONS.compass, ICONS.barChart, ICONS.lightbulb],
  telecom: [ICONS.signal, ICONS.map, ICONS.brain, ICONS.barChart],
  retail:  [ICONS.shoppingBag, ICONS.star, ICONS.flask, ICONS.lightbulb],
  fnb:     [ICONS.flask, ICONS.compass, ICONS.star, ICONS.trendUp],
  auto:    [ICONS.zap, ICONS.carFront, ICONS.heart, ICONS.lightbulb],
  bfsi:    [ICONS.trendUp, ICONS.coins, ICONS.star, ICONS.barChart],
  mfg:     [ICONS.factory, ICONS.recycle, ICONS.heart, ICONS.compass],
  health:  [ICONS.heart, ICONS.brain, ICONS.pill, ICONS.barChart],
};

// ─── Single carousel panel ────────────────────────────────────────
function SlidePanel({ src, bold, rest, dark, visible }) {
  const bg      = dark ? "#096388" : "#ffffff";
  const textCol = dark ? "#ffffff" : NS.ink;
  const restCol = dark ? "rgba(255,255,255,0.88)" : NS.inkSoft;
  const ruleCol = dark ? "rgba(255,255,255,0.22)" : `${NS.blue}25`;
  return (
    <div style={{ background:bg, display:"flex", flexDirection:"column",
      opacity:visible?1:0, transition:"opacity 0.55s ease", position:"relative" }}>
      <div style={{ width:"100%", aspectRatio:"2.07/1", overflow:"hidden", flexShrink:0 }}>
        <img src={src} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", display:"block" }} />
      </div>
      <div style={{ padding:"22px 28px 26px" }}>
        <p style={{ fontSize:14, lineHeight:1.6, margin:0, color:restCol }}>
          <strong style={{ color:textCol, fontWeight:700 }}>{bold}</strong>{rest}
        </p>
        <div style={{ height:1, background:ruleCol, marginTop:18 }} />
      </div>
    </div>
  );
}

// ─── Insight carousel ─────────────────────────────────────────────
function InsightCarousel({ accent, industryId }) {
  const slides = INDUSTRY_SLIDES[industryId] || INDUSTRY_SLIDES.tech;
  const icons  = INDUSTRY_ICONS[industryId]  || INDUSTRY_ICONS.tech;
  const total  = slides.length;
  const [idx, setIdx]         = useState(0);
  const [visible, setVisible] = useState(true);
  const paused = useRef(false);
  const timer  = useRef(null);

  const goTo = i => {
    if (i === idx) return;
    setVisible(false);
    setTimeout(() => { setIdx(i); setVisible(true); }, 280);
  };
  const next = () => goTo((idx + 1) % total);
  const prev = () => goTo((idx - 1 + total) % total);

  useEffect(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => { if (!paused.current) next(); }, 6000);
    return () => clearInterval(timer.current);
  }, [idx]);

  // reset on industry change
  useEffect(() => { setIdx(0); setVisible(true); }, [industryId]);

  const slide = slides[idx];

  return (
    <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 clamp(16px,4vw,44px)", marginBottom:36 }}
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}>
      <div style={{ borderRadius:4, overflow:"hidden", boxShadow:"0 4px 28px rgba(0,95,134,0.13)", border:`1px solid ${NS.rule}` }}>

        {/* Two panels + vertical seam icon strip */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", position:"relative" }} className="ir-insight-grid">
          <SlidePanel src={slide.bottleneckImg} bold={slide.bottleneckBold} rest={slide.bottleneckRest} dark={true}  visible={visible} />
          <SlidePanel src={slide.solutionImg}   bold={slide.solutionBold}   rest={slide.solutionRest}   dark={false} visible={visible} />

          {/* Vertical icon strip — desktop only, hidden ≤640px */}
          <div className="ir-seam-icons" style={{
            position:"absolute", left:"50%", top:"50%",
            transform:"translate(-50%,-50%)",
            display:"flex", flexDirection:"column", gap:6, zIndex:10,
          }}>
            {slides.map((_, i) => {
              const isActive = i === idx;
              return (
                <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i+1}`}
                  style={{
                    width:38, height:38, borderRadius:"50%",
                    border:`2px solid ${isActive?"#fff":"rgba(255,255,255,0.35)"}`,
                    background: isActive ? accent : "rgba(9,99,136,0.72)",
                    backdropFilter:"blur(8px)",
                    color:"#fff", cursor:"pointer",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    padding:0, outline:"none", WebkitTapHighlightColor:"transparent",
                    transition:"all 0.3s ease",
                    boxShadow: isActive ? `0 0 0 0 ${accent}80,0 4px 14px rgba(0,0,0,0.28)` : "0 2px 8px rgba(0,0,0,0.22)",
                    animation: isActive ? "ir-seam-pulse 2.2s ease-in-out infinite" : "none",
                  }}>
                  {icons[i]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Controls bar */}
        <div style={{
          background:NS.paperDeep, padding:"13px 24px",
          display:"grid", gridTemplateColumns:"1fr auto 1fr",
          alignItems:"center", borderTop:`1px solid ${accent}18`,
        }}>
          {/* Left: mobile icon row (flex hidden on desktop, shown ≤640px) */}
          <div className="ir-mobile-icons" style={{ display:"none", gap:6, alignItems:"center" }}>
            {slides.map((_, i) => {
              const isActive = i === idx;
              return (
                <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i+1}`}
                  style={{
                    width:30, height:30, borderRadius:"50%",
                    border:`1.5px solid ${isActive?accent:NS.rule}`,
                    background: isActive ? accent : NS.surface,
                    color: isActive ? "#fff" : NS.muted,
                    cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
                    padding:0, outline:"none", flexShrink:0, transition:"all 0.25s ease",
                  }}>
                  {icons[i]}
                </button>
              );
            })}
          </div>

          {/* Centre: dot indicators */}
          <div style={{ display:"flex", gap:8, alignItems:"center", justifyContent:"center" }}>
            {slides.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i+1}`}
                style={{
                  width: i===idx?22:8, height:8, borderRadius:4,
                  background: i===idx?accent:`${accent}30`,
                  border:"none", padding:0, cursor:"pointer",
                  transition:"all 0.35s cubic-bezier(0.4,0,0.2,1)",
                  animation: i===idx?"ir-dot-pulse 2.2s ease-in-out infinite":"none",
                  outline:"none",
                }}
              />
            ))}
          </div>

          {/* Right: counter + arrows */}
          <div style={{ display:"flex", alignItems:"center", gap:7, justifyContent:"flex-end" }}>
            <span style={{ fontSize:11, fontWeight:500, color:NS.muted, letterSpacing:"0.04em", minWidth:32, textAlign:"right" }}>
              {idx+1} / {total}
            </span>
            <button onClick={prev}
              onMouseEnter={e => e.currentTarget.style.background=`${accent}20`}
              onMouseLeave={e => e.currentTarget.style.background=`${accent}0c`}
              style={{ width:30, height:30, borderRadius:3, border:"none", background:`${accent}0c`,
                color:accent, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
                transition:"background 0.15s", WebkitTapHighlightColor:"transparent" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button onClick={next}
              onMouseEnter={e => e.currentTarget.style.background=`${accent}20`}
              onMouseLeave={e => e.currentTarget.style.background=`${accent}0c`}
              style={{ width:30, height:30, borderRadius:3, border:"none", background:`${accent}0c`,
                color:accent, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
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
export default function IndustryResearch({ industryId = "tech" }) {
  const sector = SECTORS.find(s => s.id === industryId) || SECTORS[0];
  const hero   = INDUSTRY_HERO[sector.id] || { noun: sector.tag, desc: sector.blurb };
  const accent = sector.accent;

  const allItems = RESEARCH_DATA.filter(d => d.industry === sector.id);

  const availableStudyTypes = STUDY_TYPES.filter(st => allItems.some(d => d.studyType === st.id));
  const [activeStudyType, setActiveStudyType] = useState(null);

  const availableRegions = GEO_REGIONS.filter(g => allItems.some(d => d.geo.includes(g.id)));
  const [activeRegion, setActiveRegion] = useState(null);

  const [viewer, setViewer] = useState(null);

  // Reset filters when industry changes
  useEffect(() => {
    setActiveStudyType(null);
    setActiveRegion(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [industryId]);

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
        @keyframes ir-pop { from{opacity:0;transform:scale(0.97) translateY(10px);}to{opacity:1;transform:none;} }
        @keyframes ir-dot-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(0,95,134,0.5); }
          65%  { box-shadow: 0 0 0 6px rgba(0,95,134,0); }
          100% { box-shadow: 0 0 0 0 rgba(0,95,134,0); }
        }
        @keyframes ir-seam-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(0,95,134,0.55), 0 4px 14px rgba(0,0,0,0.28); }
          65%  { box-shadow: 0 0 0 7px rgba(0,95,134,0),  0 4px 14px rgba(0,0,0,0.28); }
          100% { box-shadow: 0 0 0 0 rgba(0,95,134,0),    0 4px 14px rgba(0,0,0,0.28); }
        }
        @media (max-width:640px) {
          .ir-insight-grid  { grid-template-columns:1fr !important; }
          .ir-filter-bar    { grid-template-columns:1fr !important; }
          .ir-filter-bar > div:first-child { border-right:none !important; border-bottom:1px solid rgba(0,95,134,0.13) !important; }
          .ir-seam-icons    { display:none !important; }
          .ir-mobile-icons  { display:flex !important; }
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

      {/* Insight carousel */}
      <InsightCarousel accent={accent} industryId={industryId} />

      {/* Filter bar */}
      <div style={{ maxWidth:1160,margin:"0 auto",padding:"0 clamp(16px,4vw,44px)" }}>
        <div className="ir-filter-bar" style={{
          display:"grid", gridTemplateColumns:"1fr 1fr",
          background:NS.surface, border:`1px solid ${NS.rule}`,
          borderRadius:4, marginBottom:28, overflow:"hidden",
        }}>
          {/* Study Type */}
          <div style={{ padding:"16px 22px", borderRight:`1px solid ${NS.rule}` }}>
            <span style={{ display:"block", marginBottom:11, fontSize:9, fontWeight:700,
              letterSpacing:"0.20em", textTransform:"uppercase", color:NS.muted }}>Study Type</span>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              <PillBtn label="All" active={!activeStudyType} color={accent} onClick={() => setActiveStudyType(null)} />
              {availableStudyTypes.map(st => (
                <PillBtn key={st.id} label={st.label} active={activeStudyType===st.id} color={st.accent}
                  onClick={() => setActiveStudyType(activeStudyType===st.id?null:st.id)} />
              ))}
            </div>
          </div>

          {/* Region */}
          <div style={{ padding:"16px 22px" }}>
            <span style={{ display:"block", marginBottom:11, fontSize:9, fontWeight:700,
              letterSpacing:"0.20em", textTransform:"uppercase", color:NS.muted }}>Region</span>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              <PillBtn label="All" active={!activeRegion} color={accent} onClick={() => setActiveRegion(null)} />
              {availableRegions.map(g => (
                <PillBtn key={g.id} label={g.label} active={activeRegion===g.id} color={g.accent}
                  onClick={() => setActiveRegion(activeRegion===g.id?null:g.id)} />
              ))}
            </div>
          </div>
        </div>

        {/* Cases grid */}
        {filtered.length === 0 ? (
          <div style={{ padding:"48px 0",textAlign:"center",color:NS.muted,fontSize:14 }}>
            No studies match these filters.
          </div>
        ) : (
          <div key={(activeStudyType||"all")+(activeRegion||"all")}
            style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:10, animation:"ir-pop 0.22s ease both" }}>
            {filtered.map((item,i) => (
              <CaseTile key={item.title+i} item={item} accent={accent} onOpen={setViewer} />
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
