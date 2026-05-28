import { useState, useEffect, useRef } from "react";
import logoSrc from "./assets/netscribes-logo.png";

// ─── Tokens ───────────────────────────────────────────────────────
const NS = {
  blue:      "#005F86",
  blueDeep:  "#003A52",
  blueSoft:  "#1A8AB5",
  red:       "#C9252B",
  paper:     "#F5F1EA",
  paperDeep: "#EDE7DB",
  surface:   "#FFFFFF",
  ink:       "#0F1B27",
  inkSoft:   "#3C4754",
  muted:     "#6E7884",
  rule:      "rgba(0,95,134,0.13)",
};

const ACCENT = {
  teal:   "#0B7B6B",
  amber:  "#B85C00",
  plum:   "#5C3472",
  forest: "#2D6B4A",
  steel:  "#1E4976",
  rust:   "#A03020",
  slate:  "#3B5068",
  indigo: "#2D3A8C",
};

function driveFile(id) {
  return {
    driveEmbedUrl: `https://drive.google.com/file/d/${id}/preview`,
    driveViewUrl:  `https://drive.google.com/file/d/${id}/view`,
  };
}

// ─── Data ─────────────────────────────────────────────────────────
const RESEARCH_DATA = [
  { title:"ISP Market Landscape Study", desc:"Market assessment of the ISP ecosystem, regulatory frameworks, and key players across Nigeria and DRC.", industry:"telecom", studyType:"Industry Analysis", geo:["Africa"], primaryType:"B2B", ...driveFile("1UcAgLoyYIWWv-KxXFLp9qkxHt_4Or96T") },
  { title:"Enabling Growth Strategies for Cross-border Digital Payment Platforms in China", desc:"Industry analysis examining regulatory frameworks, competitive dynamics, and strategic growth levers for digital payment platforms expanding into China.", industry:"bfsi", studyType:"Industry Analysis", geo:["Asia"], primaryType:"B2B", ...driveFile("1I4v4ieFuClmru2jUSHfqRLi1sEUbjAD1") },
  { title:"Leave Management Solutions in the US Group Benefits Market", desc:"Market analysis of leave management solution providers and adoption trends within the US employer-sponsored group benefits landscape.", industry:"bfsi", studyType:"Industry Analysis", geo:["North America"], primaryType:null, ...driveFile("1qCnNYi_EropVruwNPyrB6TrwnyMTYnCf") },
  { title:"Cloud Adoption and Innovation Impact Assessment in South Africa and UAE", desc:"Industry analysis of cloud adoption maturity, innovation impact, and market opportunity across South Africa and the UAE.", industry:"tech", studyType:"Industry Analysis", geo:["Africa","Middle East"], primaryType:"B2B", ...driveFile("1x-oE6Nxr3d_I-wfdUGcfYOTzQfO_c8FH") },
  { title:"IoT Application Trends in Seaports and Airports", desc:"Landscape study of IoT deployment patterns and emerging use cases across seaport and airport infrastructure globally.", industry:"tech", studyType:"Industry Analysis", geo:["Global"], primaryType:"B2B", ...driveFile("1xEEmufT_csgUIIqD16Qzl_KTyQ2wCEZ7") },
  { title:"Video Codec Technology Landscape Study", desc:"Technology landscape analysis of video codec standards, competitive positioning, and adoption trends across media and streaming verticals.", industry:"tech", studyType:"Industry Analysis", geo:["Global"], primaryType:"B2B", ...driveFile("1IEC8o3xWa4SXILBaATS5hl0jXjOPyEbJ") },
  { title:"Captive Market Assessment and ICT Opportunity Analysis in India", desc:"Market assessment of India's captive centre ecosystem and ICT investment opportunities across key verticals.", industry:"tech", studyType:"Industry Analysis", geo:["South Asia"], primaryType:"B2B", ...driveFile("1EWWod3hotQIQx66_PuNvjSP3qZrQWTVO") },
  { title:"Market Assessment – Natural & Organic Hair Care Category Growth", desc:"Category-level market assessment identifying growth opportunity pockets within the natural and organic hair care segment.", industry:"retail", studyType:"Industry Analysis", geo:["Southeast Asia"], primaryType:"B2B", ...driveFile("1tFNxKAhP8dNrR6gCK5GYu7WCp-4AdgZp") },
  { title:"Market Assessment of Key Business Practices in Healthcare", desc:"Analysis of market structure and prevailing business practices across key healthcare subsectors.", industry:"health", studyType:"Industry Analysis", geo:["North America","Europe","South Asia"], primaryType:"B2B", ...driveFile("1regWEZQBYVVgIOGRMl33vmYzQFnvk2pE") },
  { title:"Growth Opportunities in the Cleanroom Disposable PPE Market", desc:"Market sizing and opportunity analysis for cleanroom-grade disposable PPE across pharmaceutical, semiconductor, and biotech verticals.", industry:"health", studyType:"Industry Analysis", geo:["Europe"], primaryType:"B2B", ...driveFile("101AzajvFhcFnRL2Ha2noDp7UJnUDQl3y") },
  { title:"Market Assessment Study on the Global Biosurfactant Industry", desc:"Comprehensive market assessment of the global biosurfactant industry — growth drivers, competitive landscape, and application segment analysis.", industry:"mfg", studyType:"Industry Analysis", geo:["Global"], primaryType:"B2B", ...driveFile("1CcM44Ui5DzNOuCrbiiKwH2X2_CeToHZf") },
  { title:"Market Assessment Study on the Indian Plastic Circular Economy", desc:"Industry analysis examining circular economy maturity, regulatory tailwinds, and opportunity landscape within India's plastics sector.", industry:"mfg", studyType:"Industry Analysis", geo:["South Asia"], primaryType:"B2B", ...driveFile("1k3pQg3-SHt_TRvSSq2WWiNix7anXbQ3s") },
  { title:"GTM Strategy for a Personal Finance Management App", desc:"Go-to-market strategy defining target segments, channel mix, and launch sequencing for a personal finance management application.", industry:"bfsi", studyType:"GTM", geo:["Europe"], primaryType:null, ...driveFile("1RaM068TLcSBPsf5pXviB7qotsd-M75BZ") },
  { title:"GTM Strategy for a Cloud-Based Cybersecurity Startup", desc:"Go-to-market strategy covering ICP definition, competitive positioning, and sales motion design for a cloud-native cybersecurity startup.", industry:"tech", studyType:"GTM", geo:["North America"], primaryType:"B2B", ...driveFile("1_d453HbhK36dZz5mJGzYbpQzLaIRV4mA") },
  { title:"GTM Strategy and Roadmap Building for a Tech Giant", desc:"Comprehensive GTM strategy and execution roadmap for a large technology company entering a new product category.", industry:"tech", studyType:"GTM", geo:["Africa"], primaryType:"B2B", ...driveFile("1_6Nb1kJih9sxT-1xAK1ZduqLstzQOrJG") },
  { title:"Smart Mobility Ecosystem Mapping and Opportunity Analysis Across Global Cities", desc:"GTM opportunity analysis mapping smart mobility players, investment flows, and entry points across major global urban markets.", industry:"tech", studyType:"GTM", geo:["Europe","Asia"], primaryType:"B2B", ...driveFile("1VpIqq8osbGThXLy7X_eGnNSSczYdQQ2d") },
  { title:"Global Esports Market Landscape Study", desc:"GTM landscape study of the global esports market — audience segmentation, monetisation models, and brand partnership opportunities.", industry:"tech", studyType:"GTM", geo:["Global"], primaryType:"B2B", ...driveFile("1bDI_Zh2YckU933TtzDTjNJ7LXDS8dszP") },
  { title:"Impact of Campaign Effectiveness for a Business Management Software Provider", desc:"GTM effectiveness assessment measuring campaign reach, lead quality, and pipeline contribution for a B2B software provider.", industry:"tech", studyType:"GTM", geo:["South Asia"], primaryType:"B2B", ...driveFile("12-mXJyFmbdEy3S4IpfS-wFKoC06zfTL6") },
  { title:"IT and Emerging Tech Strategy for a Telecom Ecosystem Player", desc:"GTM and technology strategy study mapping IT modernisation priorities and emerging tech adoption pathways for a telecom ecosystem participant.", industry:"telecom", studyType:"GTM", geo:["Global"], primaryType:"B2B", ...driveFile("1v_67mRI-JCVZj_R8q--7DVGU58FuQBSA") },
  { title:"GTM Strategy for a Telecom Network Provider", desc:"End-to-end go-to-market strategy for a telecom network provider — segment prioritisation, value proposition design, and channel activation.", industry:"telecom", studyType:"GTM", geo:["South Asia"], primaryType:"B2B", ...driveFile("1gfWwabDqZAcfH5uXSkVjP4JQkoxUMk6n") },
  { title:"Market Assessment for Automotive Semi-active Suspension Technologies", desc:"GTM market assessment sizing the semi-active suspension technology opportunity — OEM adoption trends, key suppliers, and regional demand signals.", industry:"auto", studyType:"GTM", geo:["North America","Europe","Asia"], primaryType:"B2B", ...driveFile("1ntsutMQ_mA5KTicJ5-h7ez2sOzTyYi1c") },
  { title:"Product Concept Testing for CT and MRI Products", desc:"GTM concept validation study for diagnostic imaging products — clinician feedback, feature prioritisation, and market readiness assessment.", industry:"health", studyType:"GTM", geo:["North America","Europe"], primaryType:"B2B", ...driveFile("1zT8HVukcH-ltFkI9BxFbwjxKuUXb78P4") },
  { title:"GTM & Market Potential for Flavoured Milk and Convergence Drinks", desc:"GTM study sizing market potential and identifying positioning opportunities for flavoured milk and convergence drink categories.", industry:"fnb", studyType:"GTM", geo:["Europe","North America"], primaryType:"B2B", ...driveFile("1dTowHuT15m6NhJOxniB5yHxastVd4MRL") },
  { title:"Concept Testing: Cider Category Innovation Pipeline", desc:"GTM concept testing identifying three winning flavour territories to fuel a cider brand's innovation pipeline.", industry:"fnb", studyType:"GTM", geo:["Europe","Asia","North America","Africa"], primaryType:"B2C", ...driveFile("1suEViXrD19MVg8qJXmWo-XbYuhkEM-hJ") },
  { title:"Concept Testing: Product Innovation for a QSR Chain", desc:"GTM concept validation delivering product innovation recommendations for a quick service restaurant chain.", industry:"fnb", studyType:"GTM", geo:["Europe"], primaryType:"B2B", ...driveFile("1IM-SYWOE58legIiTah0m9CUby18X7B8f") },
  { title:"Concept Testing & Opportunity Assessment: Health Food Supplement Dispenser", desc:"GTM study evaluating concept appeal and market opportunity for a health food supplement and dispenser innovation.", industry:"fnb", studyType:"GTM", geo:["North America","Europe"], primaryType:"B2B", ...driveFile("1oHPqdb2m6C-9WkuvvIgaRUEbqYz4Yri7") },
  { title:"Go-to-Market Strategy for a Company Using AI to Revolutionise Drug Development", desc:"GTM strategy for an AI-powered drug development platform — target market identification, partnership model, and competitive differentiation.", industry:"health", studyType:"GTM", geo:["Middle East"], primaryType:"B2B", ...driveFile("1yxjFqhdT3dqx7ov-DN0GsRX3D1o0uNXp") },
  { title:"Go-to-Market Study for iPSC Stem Cell Therapies", desc:"GTM concept validation and market readiness study for induced pluripotent stem cell therapy products.", industry:"health", studyType:"GTM", geo:["Middle East"], primaryType:"B2B", ...driveFile("15mnFz9OQofDnNnDk7HzHEt57lFYvcNfm") },
  { title:"Enterprise Connectivity Service Delivery Process for Indian SMEs", desc:"Competitors' benchmarking study analyzing end-to-end service delivery workflows to pinpoint timeline delays and optimize B2B telecom process efficiency.", industry:"telecom", studyType:"Competitive Benchmarking", geo:["South Asia"], primaryType:"B2B", ...driveFile("1S0d_-frzWrQJJ3pZ2ub8OSiYfkUGlq6I") },
  { title:"Airline Loyalty Programs & Co-branded Credit Cards Benchmarking", desc:"Competitive benchmarking of airline co-branded credit card programmes — rewards architecture, partner economics, and cardholder acquisition strategies.", industry:"bfsi", studyType:"Competitive Benchmarking", geo:["North America"], primaryType:null, ...driveFile("1VQHt0UZy5Q2FLhNmShUtLmIV_Ek3gswW") },
  { title:"Comparative Review of Cashback Credit Cards in the US", desc:"Side-by-side competitive analysis of leading cashback credit card products in the US market — earn rates, redemption mechanics, and fee structures.", industry:"bfsi", studyType:"Competitive Benchmarking", geo:["North America"], primaryType:null, ...driveFile("1CEqhA2kNvql4_x0fDqn6_7eHp5ABic7d") },
  { title:"Brand Health & Competitive Benchmarking Study for a Health Insurance Company", desc:"Brand equity and competitive positioning benchmarking for a health insurance provider — awareness, NPS, and share-of-wallet analysis.", industry:"bfsi", studyType:"Competitive Benchmarking", geo:["North America","Europe","Asia","Middle East","Africa"], primaryType:"B2B", ...driveFile("1bZQrQZUvjyOywOhzRs6X9ET-y5jGTHU3") },
  { title:"Pricing Analysis for a Cloud-Based SCM Provider", desc:"Competitive pricing intelligence study for a cloud-based supply chain management provider — tier structures, discounting patterns, and value metric benchmarks.", industry:"tech", studyType:"Competitive Benchmarking", geo:["Global"], primaryType:"B2B", ...driveFile("19XFI2m0RxC4wJxviP17jRpj_LHdCHu8X") },
  { title:"Account Intelligence Sample Report – Level 1: Netflix", desc:"Level 1 account intelligence profile for Netflix — firmographic overview, strategic priorities, and key buying signals for sales engagement.", industry:"tech", studyType:"Competitive Benchmarking", geo:["North America"], primaryType:null, ...driveFile("1C82FObYTfQFAtKJMayW8FOspiTttbGBI") },
  { title:"Account Intelligence Sample Report – Level 2: Home Depot", desc:"Level 2 account intelligence report for Home Depot — organisational mapping, technology landscape, and procurement signals.", industry:"tech", studyType:"Competitive Benchmarking", geo:["North America"], primaryType:null, ...driveFile("1imHUtJa8JXcGgUqXPCv8q0FshFmcZqR2") },
  { title:"Account Intelligence Sample Report – Level 3: Tesco", desc:"Level 3 account intelligence report for Tesco — deep-dive competitive positioning, initiative tracking, and stakeholder mapping.", industry:"tech", studyType:"Competitive Benchmarking", geo:["Europe"], primaryType:null, ...driveFile("1YH67vPO9frOLkqFDYzBoyYNQIw-D0bDu") },
  { title:"Account Intelligence Sample Report – Level 4: DuPont", desc:"Level 4 account intelligence report for DuPont — comprehensive strategic intelligence covering M&A signals, innovation pipeline, and executive priorities.", industry:"tech", studyType:"Competitive Benchmarking", geo:["North America"], primaryType:null, ...driveFile("1LVtwTga9Z8ZWoMn8vzx9epB09jk3aCU1") },
  { title:"Brand & Product Performance Tracking Study for Cleaning Wipes", desc:"Ongoing competitive benchmarking of brand health and product performance metrics for a cleaning wipes brand across retail channels.", industry:"retail", studyType:"Competitive Benchmarking", geo:["North America"], primaryType:"B2C", ...driveFile("1a_RNWEMmh-BMaSQAfBipJlVOreO52Ajs") },
  { title:"Competitive Landscape Analysis for Juice Market", desc:"Competitive intelligence study mapping the juice market landscape — key players, share dynamics, innovation trends, and positioning white spaces.", industry:"fnb", studyType:"Competitive Benchmarking", geo:["Middle East","Africa"], primaryType:"B2B", ...driveFile("1LZ9NgNpvyJ-VKqJAgALbZUK5AD9ADwI7") },
  { title:"Middle East Portable Air Compressor and Hand-held Tool Market", desc:"Competitive intelligence on the Middle East market for portable air compressors and handheld power tools — rival capabilities and channel strategies.", industry:"mfg", studyType:"Competitive Benchmarking", geo:["Middle East"], primaryType:"B2B", ...driveFile("1-uxzXR3sRlI3sFlnvTeX2mWHRDRA0nvn") },
  { title:"Consumer Payments Trend Analysis & Declining Retail Credit Card Relevance", desc:"Consumer research study on shifting payment preferences and the declining relevance of retail credit cards among digitally-native consumers.", industry:"bfsi", studyType:"Consumer Research", geo:["North America"], primaryType:"B2C", ...driveFile("1I8YddJ9L5MH2H06H3kqHiFyqVWHAX_wr") },
  { title:"Engagement Perception for an International Bank", desc:"Primary research study measuring customer engagement perceptions, satisfaction drivers, and loyalty indicators for an international retail bank.", industry:"bfsi", studyType:"Consumer Research", geo:["North America","Europe","Middle East","Asia"], primaryType:"B2B", ...driveFile("1ev3tJR6XmJ6DH3UuXBYZUQyZ-ScIdHHn") },
  { title:"Customer Insights for 3D Printing Business", desc:"Consumer and B2B buyer research for a 3D printing company — use case discovery, willingness-to-pay, and purchase decision mapping.", industry:"tech", studyType:"Consumer Research", geo:["North America","Europe","Asia"], primaryType:"B2B", ...driveFile("1UVXsMr4jX7QLEAPrQ-kwpYR8IUPqrVER") },
  { title:"Home Fitness Brand Performance Assessment", desc:"Consumer research assessing brand health, product satisfaction, and category engagement for a home fitness brand post-pandemic.", industry:"retail", studyType:"Consumer Research", geo:["Europe"], primaryType:"B2C", ...driveFile("146-JQwHnYONXWyug_4TWuwZ6Wj2CHHEt") },
  { title:"Brand Track & Product Evaluation – Improved Product Satisfaction After Redesign", desc:"Brand tracking study documenting measurable improvements in consumer product satisfaction following a packaging and formula redesign.", industry:"retail", studyType:"Consumer Research", geo:["South Asia","Southeast Asia"], primaryType:"B2C", ...driveFile("1JYPFSSrSn7KFEoPhMPV1tJogEhoRqZOu") },
  { title:"Consumer Perception, Product Test & Campaign Feedback for Skincare Products", desc:"Integrated consumer research combining perception testing, in-home product trials, and campaign feedback for a skincare portfolio.", industry:"retail", studyType:"Consumer Research", geo:["South Asia"], primaryType:"B2C", ...driveFile("1SUsoqLcnfnVbAtdK1rNQXXNe0eMAa0LV") },
  { title:"Brand and Consumer Perception Analysis for AC", desc:"Consumer perception and brand health study for an air conditioner brand — awareness, consideration, and attribute-level satisfaction mapping.", industry:"retail", studyType:"Consumer Research", geo:["North America","Asia","Middle East"], primaryType:"B2B", ...driveFile("1g9ab50htfS1gruMp0ZWHIJh2fTfjXDPM") },
  { title:"Premium Perception & High-End Customer Satisfaction for a Premium Apparel Brand", desc:"Luxury consumer research study exploring premium brand perception and satisfaction drivers for a high-end apparel label.", industry:"retail", studyType:"Consumer Research", geo:["Middle East"], primaryType:"B2C", ...driveFile("1eAeN76WhH-8c6mI4HThCjn-ebCqKHHuJ") },
  { title:"Online Shopping Patterns for Women's Apparel in the United States", desc:"Consumer behaviour research on women's apparel online shopping — discovery paths, brand switching, and purchase frequency patterns in the US.", industry:"retail", studyType:"Consumer Research", geo:["North America"], primaryType:"B2C", ...driveFile("1JZ0dVtxQriQHIQ6lcKsIO8KHwEhdt_Kh") },
  { title:"Consumer Behavior Analysis for an E-Commerce Company", desc:"Shopper behaviour research for an e-commerce platform — basket composition, session patterns, and churn risk indicators.", industry:"retail", studyType:"Consumer Research", geo:["South Asia"], primaryType:"B2C", ...driveFile("1xruBD853cPSImWzfEowVhkW5pxZGI--l") },
  { title:"User & Attitude Study for a Major Apparel Retailer", desc:"Quantitative U&A study for a large apparel retailer — category engagement, brand repertoire, and shopper attitude segmentation.", industry:"retail", studyType:"Consumer Research", geo:["South Asia"], primaryType:"B2C", ...driveFile("1AbS25qU1SW5BqdZ4bXI6E_eDAhmv1Kk2") },
  { title:"Consumer Persona Development – Premium Ayurvedic Skincare Online Sales Growth", desc:"Consumer persona development work that informed digital strategy and enabled online sales growth for a premium Ayurvedic skincare brand.", industry:"retail", studyType:"Consumer Research", geo:["South Asia"], primaryType:"B2C", ...driveFile("1L00_jh7PlE_2ewW5aip7W2wUZWHwgEyW") },
  { title:"Customer Segmentation for a Premium Organic Food Retailer", desc:"Consumer segmentation study identifying distinct buyer groups for a premium organic food brand — profiles, purchase drivers, and channel preferences.", industry:"fnb", studyType:"Consumer Research", geo:["Middle East"], primaryType:"B2C", ...driveFile("1vaaUxA_aNScU5-UXXLbuzWxiLrcnmNQw") },
  { title:"Consumer Insights & Trend Mapping: Women's Adult Beverages", desc:"Consumer research study mapping trends, usage occasions, and purchase motivations in the women's adult beverage category.", industry:"fnb", studyType:"Consumer Research", geo:["North America"], primaryType:"B2C", ...driveFile("1dc0qoUHqf4L_dF4gyOne-jgQ1vEHS8wS") },
  { title:"Product Positioning Study for Medjool Dates", desc:"Consumer research study identifying optimal positioning, messaging, and target segments for a premium Medjool dates brand.", industry:"fnb", studyType:"Consumer Research", geo:["South Asia"], primaryType:"B2B", ...driveFile("1mZXYuwWBepz0g30gsGqMRGrbpUM6Rev8") },
  { title:"Brand Perception & Consumer Behaviour Study for Premium Alcohol", desc:"Qualitative and quantitative study on brand perception, purchase occasions, and loyalty drivers in the premium alcohol category.", industry:"fnb", studyType:"Consumer Research", geo:["South Asia"], primaryType:"B2C", ...driveFile("1DirIDYg7Im9lEiYaBVQooA0wCB4vKWf8") },
  { title:"Customer Perceptions on In-vehicle Health & Wellness Study", desc:"Primary research study on driver and passenger perceptions of in-vehicle health and wellness features — willingness-to-pay and feature prioritisation.", industry:"auto", studyType:"Consumer Research", geo:["Global"], primaryType:"B2B", ...driveFile("1yOAxwrMmQg6wOCrax1GELD9mfs7WUUun") },
  { title:"Consumer Journey Insights for a Health Supplements Retailer", desc:"Consumer journey research mapping touchpoints, decision triggers, and loyalty barriers for a health supplements retailer.", industry:"health", studyType:"Consumer Research", geo:["Middle East"], primaryType:"B2C", ...driveFile("1yH6nKKw9NJkGke1w3buqYRRpTajs1GBK") },
  { title:"Customer Satisfaction for Petrochemical Products", desc:"B2B customer satisfaction research for a petrochemical products portfolio — supplier NPS, product performance ratings, and renewal intent.", industry:"mfg", studyType:"Consumer Research", geo:["Middle East","Asia","Europe","North America"], primaryType:"B2B", ...driveFile("1vbaayaNvuL45j9SJTwKt77hh5PjBdD2I") },
  { title:"AI Adoption in Telecom Sector", desc:"Global benchmarking study evaluating regional AI maturity, high-impact operator use cases, and capability gaps to sharpen GTM positioning.", industry:"telecom", studyType:"AI Readiness", geo:["North America","Europe","Asia","Middle East","Africa"], primaryType:"B2B", ...driveFile("10abj6wddyAktZvwSu3mt-S-kYHDh0fWU") },
  { title:"AI Ethics and Transparency Impact Assessment", desc:"Assessment of enterprise AI ethics posture and transparency readiness — governance frameworks, bias risk, and regulatory alignment across tech deployments.", industry:"tech", studyType:"AI Readiness", geo:["North America","Europe","Asia"], primaryType:"B2B", ...driveFile("1ggtWzS3z5NkYro1QefJMT5oW9upYzPYV") },
];

// ─── Sector + study config ────────────────────────────────────────
const SECTORS = [
  { id:"auto",    label:"Automotive",            accent:ACCENT.steel,  blurb:"EV transition, OEM strategy, ADAS and mobility.", spotlight:"Market Assessment for Automotive Semi-active Suspension Technologies" },
  { id:"bfsi",    label:"BFSI",                  accent:ACCENT.forest, blurb:"Fintech, embedded finance, payments and insurance.", spotlight:"Brand Health & Competitive Benchmarking Study for a Health Insurance Company" },
  { id:"tech",    label:"Technology & Software", accent:NS.blue,       blurb:"SaaS, AI adoption, cloud strategy and B2B GTM.", spotlight:"GTM Strategy for a Cloud-Based Cybersecurity Startup" },
  { id:"telecom", label:"Telecommunication",     accent:ACCENT.teal,   blurb:"5G, spectrum strategy and enterprise connectivity.", spotlight:"AI Adoption in Telecom Sector" },
  { id:"health",  label:"Healthcare",            accent:ACCENT.plum,   blurb:"Pharma CI, digital health and payer dynamics.", spotlight:"Product Concept Testing for CT and MRI Products" },
  { id:"mfg",     label:"Manufacturing",         accent:ACCENT.amber,  blurb:"Industry 4.0, automation ROI and supply chains.", spotlight:"Market Assessment Study on the Global Biosurfactant Industry" },
  { id:"retail",  label:"Retail & E-commerce",  accent:NS.red,        blurb:"Shopper insights, brand equity and channel strategy.", spotlight:"Online Shopping Patterns for Women's Apparel in the United States" },
  { id:"fnb",     label:"Food & Beverage",       accent:ACCENT.rust,   blurb:"Consumer preference, concept testing, beverage trends.", spotlight:"Consumer Insights & Trend Mapping: Women's Adult Beverages" },
];

const STUDY_TYPES = [
  { id:"Industry Analysis",      label:"Industry Analysis",       accent:NS.blue,        desc:"Market sizing, landscape studies, TAM modelling and demand forecasting." },
  { id:"GTM",                    label:"GTM Strategy",            accent:ACCENT.teal,    desc:"Market entry, beachhead identification, channel selection and launch sequencing." },
  { id:"Competitive Benchmarking", label:"Competitive Benchmarking", accent:ACCENT.amber, desc:"Rival profiling, win/loss analysis, account intelligence and pricing research." },
  { id:"Consumer Research",      label:"Consumer Research",       accent:ACCENT.plum,    desc:"Attitude & usage studies, segmentation, needs mapping and brand tracking." },
  { id:"AI Readiness",           label:"AI Readiness Assessment", accent:ACCENT.forest,  desc:"Enterprise maturity benchmarking across data, talent, infrastructure and deployment readiness." },
];

// Map dot positions — equirectangular 800×400
const GEO_DOTS = [
  { id:"North America",  label:"North America",       cx:175, cy:148 },
  { id:"Europe",         label:"Europe",              cx:455, cy:120 },
  { id:"Middle East",    label:"Middle East",         cx:537, cy:188 },
  { id:"Africa",         label:"Africa",              cx:462, cy:255 },
  { id:"South Asia",     label:"South Asia",          cx:600, cy:200 },
  { id:"Southeast Asia", label:"Southeast Asia",      cx:660, cy:242 },
  { id:"Asia",           label:"East & Central Asia", cx:672, cy:152 },
  { id:"Global",         label:"Global / Multi-region", cx:320, cy:305 },
];

// ─── Hooks ────────────────────────────────────────────────────────
function useFadeIn(threshold = 0.07) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function useLock(on) {
  useEffect(() => {
    document.body.style.overflow = on ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [on]);
}

// ─── Case viewer modal ────────────────────────────────────────────
function CaseViewer({ item, accent, onClose }) {
  useLock(true);
  useEffect(() => {
    const h = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{
      position:"fixed", inset:0, zIndex:4000,
      background:"rgba(15,27,39,0.72)", backdropFilter:"blur(8px)",
      display:"flex", alignItems:"center", justifyContent:"center", padding:24,
    }}>
      <div style={{
        background:NS.surface, borderRadius:3, width:"100%", maxWidth:900,
        maxHeight:"92vh", display:"flex", flexDirection:"column",
        boxShadow:"0 40px 100px rgba(0,0,0,0.32)",
        animation:"rc-pop 0.22s ease both",
      }}>
        {/* Coloured top bar */}
        <div style={{ height:4, background: accent || NS.blue, borderRadius:"3px 3px 0 0", flexShrink:0 }} />
        {/* Header */}
        <div style={{ padding:"20px 24px 16px", borderBottom:`1px solid ${NS.rule}`, flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"flex-start", gap:16, justifyContent:"space-between" }}>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", gap:6, marginBottom:9, flexWrap:"wrap" }}>
                <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.11em", textTransform:"uppercase", color: accent || NS.blue, background:`${accent || NS.blue}14`, padding:"2px 7px", borderRadius:2 }}>{item.studyType}</span>
                {item.primaryType && <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:NS.muted, background:NS.paperDeep, padding:"2px 7px", borderRadius:2 }}>{item.primaryType}</span>}
                {item.geo.slice(0,3).map(g => <span key={g} style={{ fontSize:10, fontWeight:500, color:NS.muted, background:NS.paperDeep, padding:"2px 7px", borderRadius:2 }}>{g}</span>)}
              </div>
              <h2 style={{ fontSize:"clamp(15px,1.8vw,19px)", fontWeight:600, color:NS.ink, lineHeight:1.35, letterSpacing:"-0.01em" }}>{item.title}</h2>
              <p style={{ marginTop:5, fontSize:13, color:NS.muted, lineHeight:1.6, maxWidth:600 }}>{item.desc}</p>
              <a href={item.driveViewUrl} target="_blank" rel="noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:5, marginTop:9, fontSize:11, fontWeight:700, letterSpacing:"0.07em", textTransform:"uppercase", color: accent || NS.blue, textDecoration:"none" }}>Open in Drive ↗</a>
            </div>
            <button onClick={onClose} style={{ flexShrink:0, width:30, height:30, borderRadius:"50%", border:`1px solid ${NS.rule}`, background:NS.paper, cursor:"pointer", fontSize:14, color:NS.muted, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans', sans-serif" }}>✕</button>
          </div>
        </div>
        <div style={{ flex:1, minHeight:0, background:NS.paperDeep }}>
          <iframe src={item.driveEmbedUrl} title={item.title} style={{ width:"100%", height:"100%", minHeight:460, border:"none" }} allow="autoplay" />
        </div>
      </div>
    </div>
  );
}

// ─── Items popup ──────────────────────────────────────────────────
function ItemsPopup({ title, accent, items, onClose, onOpen }) {
  useLock(true);
  useEffect(() => {
    const h = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{
      position:"fixed", inset:0, zIndex:3000,
      background:"rgba(15,27,39,0.62)", backdropFilter:"blur(6px)",
      display:"flex", alignItems:"center", justifyContent:"center", padding:24,
    }}>
      <div style={{
        background:NS.surface, borderRadius:3, width:"100%", maxWidth:640,
        maxHeight:"88vh", display:"flex", flexDirection:"column",
        boxShadow:"0 32px 80px rgba(0,0,0,0.24)",
        animation:"rc-pop 0.2s ease both",
      }}>
        <div style={{ height:4, background: accent, borderRadius:"3px 3px 0 0", flexShrink:0 }} />
        <div style={{ padding:"22px 24px 16px", borderBottom:`1px solid ${NS.rule}`, flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <h3 style={{ fontSize:20, fontWeight:700, color:NS.ink, letterSpacing:"-0.02em" }}>{title}</h3>
            <button onClick={onClose} style={{ width:30, height:30, borderRadius:"50%", border:`1px solid ${NS.rule}`, background:NS.paper, cursor:"pointer", fontSize:14, color:NS.muted, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans', sans-serif", flexShrink:0 }}>✕</button>
          </div>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"12px 16px 24px" }}>
          {items.map((item, i) => (
            <div key={i} onClick={() => onOpen(item)}
              style={{ padding:"13px 14px", borderRadius:2, border:`1px solid ${NS.rule}`, marginBottom:7, cursor:"pointer", transition:"all 0.14s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.background = `${accent}08`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = NS.rule; e.currentTarget.style.background = "transparent"; }}
            >
              <div style={{ display:"flex", justifyContent:"space-between", gap:10 }}>
                <p style={{ fontSize:13.5, fontWeight:600, color:NS.ink, lineHeight:1.4, marginBottom:3 }}>{item.title}</p>
                <span style={{ color:accent, fontSize:15, flexShrink:0 }}>↗</span>
              </div>
              <p style={{ fontSize:12, color:NS.muted, lineHeight:1.5 }}>{item.desc}</p>
              <div style={{ marginTop:8, display:"flex", gap:5, flexWrap:"wrap" }}>
                {item.primaryType && <span style={{ fontSize:10, padding:"1px 6px", borderRadius:2, background:`${accent}12`, color:accent, fontWeight:700, letterSpacing:"0.06em" }}>{item.primaryType}</span>}
                {item.geo.slice(0,3).map(g => <span key={g} style={{ fontSize:10, padding:"1px 6px", borderRadius:2, background:NS.paperDeep, color:NS.muted }}>{g}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SECTION 01 — Sectors ─────────────────────────────────────────
// 4×2 card grid. Each card is solid accent background on hover,
// shows a spotlight case study title as a preview snippet.
function SectorSection({ onOpen }) {
  const [ref, vis] = useFadeIn();
  return (
    <section id="sectors" ref={ref} style={{
      maxWidth:1160, margin:"0 auto", padding:"64px clamp(20px,4vw,56px)",
      opacity:vis?1:0, transform:vis?"none":"translateY(16px)", transition:"opacity 0.45s ease, transform 0.45s ease",
    }}>
      <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:32, flexWrap:"wrap", gap:12 }}>
        <div>
          <p style={EYEBROW(NS.blue)}>01 — Sector Expertise</p>
          <h2 style={H2}>Industries we know deeply</h2>
        </div>
        <p style={{ fontSize:14, color:NS.muted, maxWidth:320, textAlign:"right", lineHeight:1.65 }}>Eight high-impact sectors. Primary and secondary depth in each.</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
        {SECTORS.map((s, i) => <SectorCard key={s.id} sector={s} delay={i*30}
          onClick={() => onOpen(s.label, s.accent, RESEARCH_DATA.filter(d=>d.industry===s.id))} />)}
      </div>
    </section>
  );
}

function SectorCard({ sector, delay, onClick }) {
  const [hov, setHov] = useState(false);
  const spotlight = RESEARCH_DATA.find(d => d.title === sector.spotlight);

  return (
    <div onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? sector.accent : NS.surface,
        border:`1.5px solid ${hov ? sector.accent : NS.rule}`,
        borderRadius:3, padding:"22px 20px 18px", cursor:"pointer",
        transition:"all 0.2s ease",
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov ? `0 12px 32px ${sector.accent}28` : "none",
        display:"flex", flexDirection:"column", minHeight:200,
        animationDelay:`${delay}ms`,
      }}
    >
      {/* Accent top rule → switches to white on hover */}
      <div style={{ width:28, height:2.5, background: hov ? "rgba(255,255,255,0.5)" : sector.accent, borderRadius:1, marginBottom:16, transition:"background 0.2s" }} />

      <h3 style={{ fontSize:15, fontWeight:700, letterSpacing:"-0.01em", color: hov ? "#fff" : NS.ink, marginBottom:6, transition:"color 0.2s" }}>{sector.label}</h3>
      <p style={{ fontSize:12, color: hov ? "rgba(255,255,255,0.75)" : NS.muted, lineHeight:1.55, transition:"color 0.2s", marginBottom:"auto", paddingBottom:14 }}>{sector.blurb}</p>

      {/* Spotlight snippet — a teaser of one real case */}
      {spotlight && (
        <div style={{ borderTop:`1px solid ${hov ? "rgba(255,255,255,0.18)" : NS.rule}`, paddingTop:11, marginTop:4, transition:"border-color 0.2s" }}>
          <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color: hov ? "rgba(255,255,255,0.5)" : NS.muted, marginBottom:4 }}>Sample work</p>
          <p style={{ fontSize:11, color: hov ? "rgba(255,255,255,0.88)" : NS.inkSoft, lineHeight:1.45, fontWeight:500 }}>
            {spotlight.title.length > 60 ? spotlight.title.slice(0,58)+"…" : spotlight.title}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── SECTION 02 — Methodology ─────────────────────────────────────
// Full-bleed darker background, 5 tiles in one row (or wraps to 3/2)
function MethodologySection({ onOpen }) {
  const [ref, vis] = useFadeIn();
  return (
    <section id="methodology" ref={ref} style={{
      background:NS.paperDeep,
      opacity:vis?1:0, transform:vis?"none":"translateY(16px)", transition:"opacity 0.45s ease, transform 0.45s ease",
    }}>
      <div style={{ maxWidth:1160, margin:"0 auto", padding:"64px clamp(20px,4vw,56px)" }}>
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:32, flexWrap:"wrap", gap:12 }}>
          <div>
            <p style={EYEBROW(ACCENT.teal)}>02 — Research Methodology</p>
            <h2 style={H2}>Purpose-built frameworks</h2>
          </div>
          <p style={{ fontSize:14, color:NS.muted, maxWidth:320, textAlign:"right", lineHeight:1.65 }}>Five distinct study types, each with a rigorous methodology and a deep sample library.</p>
        </div>
        {/* Single row grid — wraps naturally to 3/2 on narrow screens */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10 }}>
          {STUDY_TYPES.map((st, i) => <MethodTile key={st.id} st={st} delay={i*40}
            onClick={() => onOpen(st.label, st.accent, RESEARCH_DATA.filter(d=>d.studyType===st.id))} />)}
        </div>
      </div>
    </section>
  );
}

function MethodTile({ st, delay, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? st.accent : NS.surface,
        border:`1.5px solid ${hov ? st.accent : "transparent"}`,
        borderRadius:3, padding:"20px 16px 16px", cursor:"pointer",
        transition:"all 0.2s ease",
        transform: hov ? "translateY(-2px)" : "none",
        boxShadow: hov ? `0 8px 24px ${st.accent}22` : "0 1px 3px rgba(0,0,0,0.06)",
        animationDelay:`${delay}ms`,
      }}
    >
      {/* Narrow accent bar */}
      <div style={{ width:"100%", height:2, background: hov ? "rgba(255,255,255,0.3)" : st.accent, borderRadius:1, marginBottom:14, transition:"background 0.2s" }} />
      <h3 style={{ fontSize:13, fontWeight:700, letterSpacing:"-0.005em", color: hov ? "#fff" : NS.ink, marginBottom:7, lineHeight:1.3, transition:"color 0.2s" }}>{st.label}</h3>
      <p style={{ fontSize:11.5, lineHeight:1.6, color: hov ? "rgba(255,255,255,0.78)" : NS.muted, transition:"color 0.2s" }}>{st.desc}</p>
      <div style={{ marginTop:12, fontSize:11, fontWeight:700, color: hov ? "rgba(255,255,255,0.6)" : st.accent, letterSpacing:"0.04em", transition:"color 0.2s" }}>Explore →</div>
    </div>
  );
}

// ─── SECTION 03 — Geography ───────────────────────────────────────
// Dark map panel, modelled after the reference image
function GeoSection({ onOpen }) {
  const [ref, vis] = useFadeIn();
  const [hov, setHov] = useState(null);

  const dots = GEO_DOTS.map(g => ({
    ...g,
    items: RESEARCH_DATA.filter(d => d.geo.includes(g.id)),
  })).filter(g => g.items.length > 0);

  return (
    <section id="geography" ref={ref} style={{
      opacity:vis?1:0, transform:vis?"none":"translateY(16px)", transition:"opacity 0.45s ease, transform 0.45s ease",
    }}>
      <div style={{ maxWidth:1160, margin:"0 auto", padding:"64px clamp(20px,4vw,56px)" }}>
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:28, flexWrap:"wrap", gap:12 }}>
          <div>
            <p style={EYEBROW(ACCENT.teal)}>03 — Global Reach</p>
            <h2 style={H2}>Research across every major region</h2>
          </div>
          <p style={{ fontSize:14, color:NS.muted, maxWidth:300, textAlign:"right", lineHeight:1.65 }}>Click any region to explore work from that geography.</p>
        </div>

        {/* Dark map container */}
        <div style={{ background:"#0D1B27", borderRadius:4, overflow:"hidden", position:"relative" }}>
          <WorldMap dots={dots} hov={hov} setHov={setHov}
            onDotClick={g => onOpen(g.label, NS.blue, g.items)} />
        </div>

        {/* Region pills below map */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginTop:14 }}>
          {dots.map(g => (
            <button key={g.id}
              onClick={() => onOpen(g.label, NS.blue, g.items)}
              onMouseEnter={e => e.currentTarget.style.borderColor = NS.blue}
              onMouseLeave={e => e.currentTarget.style.borderColor = NS.rule}
              style={{ fontSize:12, fontWeight:500, color:NS.inkSoft, background:NS.surface, border:`1px solid ${NS.rule}`, borderRadius:2, padding:"5px 11px", cursor:"pointer", transition:"border-color 0.15s", fontFamily:"'DM Sans', sans-serif" }}>
              {g.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// Dark-themed global SVG map with glowing dots — inspired by reference
function WorldMap({ dots, hov, setHov, onDotClick }) {
  const [tip, setTip] = useState(null);

  const LAND = [
    // North America
    "M 68 65 L 95 58 L 130 60 L 165 55 L 195 62 L 220 70 L 248 68 L 268 75 L 278 88 L 275 105 L 258 118 L 248 138 L 238 158 L 220 175 L 198 185 L 178 178 L 160 165 L 142 152 L 128 140 L 110 130 L 95 115 L 80 100 L 68 80 Z",
    // Greenland
    "M 248 32 L 285 22 L 315 28 L 325 45 L 315 62 L 290 68 L 268 60 L 252 48 Z",
    // Central America
    "M 195 185 L 210 188 L 220 200 L 208 210 L 195 205 Z",
    // South America
    "M 188 200 L 218 198 L 250 208 L 268 230 L 272 262 L 260 300 L 245 332 L 225 348 L 205 338 L 190 310 L 180 278 L 178 245 L 182 218 Z",
    // Iceland
    "M 342 55 L 362 50 L 372 58 L 365 68 L 348 70 L 338 62 Z",
    // UK
    "M 388 85 L 398 80 L 408 88 L 404 100 L 394 104 L 385 96 Z",
    // Scandinavia
    "M 415 60 L 448 50 L 465 55 L 470 70 L 460 88 L 440 98 L 420 92 L 408 78 Z",
    // Europe
    "M 395 95 L 430 90 L 468 92 L 498 98 L 515 108 L 518 122 L 505 138 L 480 148 L 455 152 L 428 145 L 408 132 L 398 115 Z",
    // Iberia
    "M 390 118 L 410 112 L 415 128 L 405 140 L 390 138 L 383 125 Z",
    // Russia/Eurasia
    "M 465 48 L 560 38 L 660 40 L 720 48 L 748 62 L 755 80 L 740 98 L 700 110 L 650 118 L 600 120 L 548 118 L 510 110 L 490 98 L 470 82 Z",
    // Central Asia
    "M 520 108 L 580 105 L 610 112 L 608 128 L 578 135 L 540 132 L 518 122 Z",
    // Turkey
    "M 480 130 L 520 125 L 535 132 L 532 145 L 510 150 L 488 148 L 478 138 Z",
    // Middle East/Arabia
    "M 520 145 L 558 140 L 582 148 L 590 168 L 585 192 L 568 210 L 545 218 L 525 208 L 512 188 L 510 165 Z",
    // Africa
    "M 398 148 L 438 142 L 472 148 L 498 158 L 510 172 L 512 195 L 508 225 L 498 258 L 480 295 L 455 322 L 428 330 L 405 320 L 385 295 L 375 262 L 372 228 L 378 198 L 388 172 Z",
    // Madagascar
    "M 498 270 L 508 265 L 515 278 L 510 292 L 500 288 Z",
    // Indian subcontinent
    "M 578 135 L 618 132 L 638 142 L 642 162 L 632 188 L 612 202 L 590 200 L 575 182 L 572 158 Z",
    // SE Asia mainland
    "M 638 128 L 672 120 L 695 128 L 698 148 L 685 162 L 665 168 L 645 160 L 635 145 Z",
    // SE Asia islands
    "M 648 162 L 678 158 L 695 168 L 698 185 L 685 198 L 662 202 L 648 190 Z",
    // Indonesia
    "M 650 195 L 690 190 L 718 195 L 722 208 L 705 218 L 672 220 L 648 212 Z",
    // China/East Asia
    "M 642 88 L 698 82 L 735 88 L 748 105 L 742 125 L 718 138 L 688 145 L 658 140 L 638 128 L 635 108 Z",
    // Japan
    "M 732 98 L 748 88 L 758 95 L 755 110 L 742 118 L 730 112 Z",
    // Australia
    "M 642 258 L 695 248 L 738 255 L 758 272 L 762 300 L 752 328 L 722 342 L 688 345 L 658 332 L 638 308 L 630 280 Z",
    // New Zealand
    "M 758 312 L 770 305 L 778 318 L 772 335 L 760 330 Z",
  ];

  return (
    <svg viewBox="0 0 800 390" style={{ width:"100%", height:"auto", display:"block" }}
      onMouseLeave={() => { setHov(null); setTip(null); }}>
      {/* Background */}
      <rect width="800" height="390" fill="#0D1B27" />

      {/* Grid lines — subtle, like reference */}
      {[65,130,195,260,325].map(y => <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />)}
      {[100,200,300,400,500,600,700].map(x => <line key={x} x1={x} y1="0" x2={x} y2="390" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />)}

      {/* Land masses */}
      {LAND.map((d, i) => (
        <path key={i} d={d} fill="#1C3045" stroke="rgba(255,255,255,0.08)" strokeWidth="0.7" />
      ))}

      {/* Dots */}
      {dots.map(g => {
        const isHov = hov === g.id;
        return (
          <g key={g.id} style={{ cursor:"pointer" }}
            onMouseEnter={e => { setHov(g.id); setTip({ id:g.id, x:g.cx, y:g.cy }); }}
            onMouseLeave={() => { setHov(null); setTip(null); }}
            onClick={() => onDotClick(g)}>
            {/* Glow */}
            <circle cx={g.cx} cy={g.cy} r="18" fill={isHov ? "rgba(26,138,181,0.18)" : "rgba(0,95,134,0.10)"} />
            {/* Outer ring */}
            <circle cx={g.cx} cy={g.cy} r={isHov ? 9 : 7} fill="none" stroke={isHov ? "#1A8AB5" : "#005F86"} strokeWidth="1.5" />
            {/* Inner fill */}
            <circle cx={g.cx} cy={g.cy} r={isHov ? 4.5 : 3.5} fill={isHov ? "#1A8AB5" : "#005F86"} />
            {/* Pulse on hover */}
            {isHov && (
              <circle cx={g.cx} cy={g.cy} r="9" fill="none" stroke="#1A8AB5" strokeWidth="1">
                <animate attributeName="r" from="9" to="22" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.6" to="0" dur="1.2s" repeatCount="indefinite" />
              </circle>
            )}
          </g>
        );
      })}

      {/* SVG tooltip */}
      {tip && (() => {
        const g = dots.find(d => d.id === tip.id);
        if (!g) return null;
        const tx = Math.min(tip.x + 14, 665);
        const ty = Math.max(tip.y - 42, 8);
        return (
          <g style={{ pointerEvents:"none" }}>
            <rect x={tx} y={ty} width={150} height={36} rx="2" fill="#1A3A52" />
            <text x={tx+9} y={ty+14} fontSize="10" fontWeight="700" fill="#fff" fontFamily="'DM Sans', sans-serif">{g.label}</text>
            <text x={tx+9} y={ty+27} fontSize="9" fill="rgba(255,255,255,0.55)" fontFamily="'DM Sans', sans-serif">Click to explore work</text>
          </g>
        );
      })()}
    </svg>
  );
}

// ─── SECTION 04 — Expertise ───────────────────────────────────────
function ExpertiseSection({ onOpen }) {
  const [ref, vis] = useFadeIn();

  const cards = [
    { label:"B2B Research", tag:"Decision-maker intelligence", accent:NS.blue,
      desc:"Executive interviews, expert panels, win/loss studies, buyer journey research and industrial surveys — reaching CxOs, procurement leaders and technical decision-makers across 40+ markets.",
      items: RESEARCH_DATA.filter(d => d.primaryType === "B2B"),
      featured:["Engagement Perception for an International Bank","AI Ethics and Transparency Impact Assessment","GTM Strategy for a Cloud-Based Cybersecurity Startup"] },
    { label:"B2C & Consumer Research", tag:"Consumer depth", accent:ACCENT.plum,
      desc:"Consumer surveys, ethnographic studies, focus groups, diary studies and online communities — with deep panel access across retail, FMCG, lifestyle and financial services segments.",
      items: RESEARCH_DATA.filter(d => d.primaryType === "B2C"),
      featured:["Online Shopping Patterns for Women's Apparel in the United States","Consumer Insights & Trend Mapping: Women's Adult Beverages","Home Fitness Brand Performance Assessment"] },
    { label:"Dual B2B / B2C", tag:"Mixed audience research", accent:ACCENT.forest,
      desc:"Complex programmes combining stakeholder and end-consumer perspectives — capturing the full market picture from manufacturer to final user across diverse geographies.",
      items: RESEARCH_DATA.filter(d => d.primaryType === null),
      featured:["Brand Health & Competitive Benchmarking Study for a Health Insurance Company","Concept Testing: Cider Category Innovation Pipeline"] },
  ];

  return (
    <section id="expertise" ref={ref} style={{
      background:NS.paperDeep,
      opacity:vis?1:0, transform:vis?"none":"translateY(16px)", transition:"opacity 0.45s ease, transform 0.45s ease",
    }}>
      <div style={{ maxWidth:1160, margin:"0 auto", padding:"64px clamp(20px,4vw,56px) 96px" }}>
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:32, flexWrap:"wrap", gap:12 }}>
          <div>
            <p style={EYEBROW(ACCENT.forest)}>04 — Research Expertise</p>
            <h2 style={H2}>How we engage respondents</h2>
          </div>
          <p style={{ fontSize:14, color:NS.muted, maxWidth:300, textAlign:"right", lineHeight:1.65 }}>First-hand intelligence structured across B2B decision-makers, consumers, and dual-audience programmes.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:14 }}>
          {cards.map((c, i) => <ExpertiseCard key={c.label} card={c} delay={i*60}
            onClick={() => onOpen(c.label, c.accent, c.items)} />)}
        </div>
      </div>
    </section>
  );
}

function ExpertiseCard({ card, delay, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:NS.surface, borderRadius:3,
        border:`1.5px solid ${hov ? card.accent : NS.rule}`,
        padding:"24px 22px", cursor:"pointer",
        transition:"all 0.2s ease",
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov ? `0 12px 32px ${card.accent}1C` : "none",
        display:"flex", flexDirection:"column", animationDelay:`${delay}ms`,
      }}
    >
      <div style={{ width: hov ? "100%" : "28px", height:2.5, background:card.accent, borderRadius:1, marginBottom:16, transition:"width 0.3s ease" }} />
      <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:card.accent, marginBottom:7 }}>{card.tag}</p>
      <h3 style={{ fontSize:18, fontWeight:700, color:NS.ink, letterSpacing:"-0.02em", lineHeight:1.2, marginBottom:10 }}>{card.label}</h3>
      <p style={{ fontSize:13, color:NS.muted, lineHeight:1.65, marginBottom:18, flex:1 }}>{card.desc}</p>
      <div style={{ borderTop:`1px solid ${NS.rule}`, paddingTop:14, marginBottom:14 }}>
        <p style={{ fontSize:9, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:NS.muted, marginBottom:9 }}>Featured work</p>
        {card.featured.map((t,i) => (
          <div key={i} style={{ display:"flex", gap:7, alignItems:"flex-start", marginBottom:5 }}>
            <span style={{ color:card.accent, fontSize:11, flexShrink:0, marginTop:1 }}>—</span>
            <span style={{ fontSize:12, color:NS.inkSoft, lineHeight:1.4 }}>{t}</span>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ fontSize:11, fontWeight:700, color: hov ? card.accent : NS.muted, transition:"color 0.18s" }}>Explore work →</span>
      </div>
    </div>
  );
}

// ─── Shared style helpers ─────────────────────────────────────────
const H2 = { fontSize:"clamp(26px,3vw,38px)", fontWeight:700, color:NS.ink, letterSpacing:"-0.025em", lineHeight:1.05 };
const EYEBROW = color => ({ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color, marginBottom:8, display:"block" });

// ─── Nav ──────────────────────────────────────────────────────────
function ResearchNav() {
  const [active, setActive] = useState("sectors");
  const IDS = ["sectors","methodology","geography","expertise"];
  const LABELS = { sectors:"Sectors", methodology:"Methodology", geography:"Geography", expertise:"Expertise" };

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold:0.25 });
    IDS.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{
      position:"sticky", top:0, zIndex:100,
      background:"rgba(245,241,234,0.95)", backdropFilter:"blur(14px)",
      borderBottom:`1px solid ${NS.rule}`,
      display:"flex", alignItems:"center", height:52,
      padding:"0 clamp(20px,4vw,56px)",
    }}>
      <a href="/" style={{ display:"flex", alignItems:"center", gap:9, textDecoration:"none", marginRight:"auto" }}>
        <img src={logoSrc} alt="Netscribes" style={{ height:19, objectFit:"contain", opacity:0.85 }} />
        <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:NS.muted }}> / Research</span>
      </a>
      <nav style={{ display:"flex", gap:2 }}>
        {IDS.map(id => (
          <a key={id} href={`#${id}`} style={{
            fontSize:12, fontWeight: active===id ? 700 : 400,
            color: active===id ? NS.ink : NS.muted,
            textDecoration:"none", padding:"5px 13px", borderRadius:2,
            background: active===id ? NS.surface : "transparent",
            border: active===id ? `1px solid ${NS.rule}` : "1px solid transparent",
            transition:"all 0.15s", whiteSpace:"nowrap",
          }}>{LABELS[id]}</a>
        ))}
      </nav>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────
function ResearchHero() {
  return (
    <div style={{ maxWidth:1160, margin:"0 auto", padding:"72px clamp(20px,4vw,56px) 60px" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:"clamp(32px,5vw,72px)", alignItems:"end" }}>
        <div>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:`${NS.blue}0f`, border:`1px solid ${NS.rule}`, borderRadius:2, padding:"4px 11px", marginBottom:20 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:NS.blue, display:"inline-block" }} />
            <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.16em", textTransform:"uppercase", color:NS.blue }}>Research Capabilities</span>
          </div>
          <h1 style={{ fontSize:"clamp(36px,5vw,60px)", fontWeight:700, color:NS.ink, letterSpacing:"-0.03em", lineHeight:1.03, marginBottom:18 }}>
            Intelligence that<br />
            <span style={{ color:NS.blue }}>shapes strategy.</span>
          </h1>
          <p style={{ fontSize:15, color:NS.muted, lineHeight:1.75, maxWidth:440 }}>
            A full-spectrum research practice spanning sectors, geographies, and methodologies — built for decisions, not decks.
          </p>
        </div>
        {/* Compact credential block — no counts */}
        <div style={{ display:"flex", flexDirection:"column", gap:10, minWidth:200 }}>
          {[
            { label:"Sectors covered", value:"8 industries" },
            { label:"Geographies",     value:"6 regions" },
            { label:"Study types",     value:"5 methodologies" },
            { label:"Audience reach",  value:"B2B · B2C" },
          ].map((s,i) => (
            <div key={i} style={{ background: i===1 ? NS.blue : NS.surface, border:`1px solid ${i===1 ? NS.blue : NS.rule}`, borderRadius:2, padding:"12px 14px", display:"flex", flexDirection:"column", gap:2 }}>
              <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color: i===1 ? "rgba(255,255,255,0.6)" : NS.muted }}>{s.label}</span>
              <span style={{ fontSize:14, fontWeight:700, color: i===1 ? "#fff" : NS.ink, letterSpacing:"-0.01em" }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────
export default function Research() {
  const [popup,  setPopup]  = useState(null);
  const [viewer, setViewer] = useState(null);

  const openPopup  = (title, accent, items) => setPopup({ title, accent, items });
  const closePopup = () => setPopup(null);
  const openViewer = (item) => { setViewer(item); };
  const closeViewer = () => setViewer(null);

  // Get the accent for the current popup, pass to viewer
  const popupAccent = popup?.accent;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { background:${NS.paper}; font-family:'DM Sans',system-ui,sans-serif; color:${NS.ink}; -webkit-font-smoothing:antialiased; }
        button, a { font-family:'DM Sans',system-ui,sans-serif; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-thumb { background:${NS.rule}; border-radius:3px; }
        @keyframes rc-pop { from { opacity:0; transform:scale(0.97) translateY(10px); } to { opacity:1; transform:none; } }
      `}</style>

      <div style={{ background:NS.paper, minHeight:"100vh" }}>
        <ResearchNav />
        <ResearchHero />
        <div style={{ borderTop:`1px solid ${NS.rule}` }} />
        <SectorSection     onOpen={openPopup} />
        <MethodologySection onOpen={openPopup} />
        <GeoSection        onOpen={openPopup} />
        <ExpertiseSection  onOpen={openPopup} />
        <footer style={{ borderTop:`1px solid ${NS.rule}`, maxWidth:1160, margin:"0 auto", padding:"22px clamp(20px,4vw,56px) 40px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
          <img src={logoSrc} alt="Netscribes" style={{ height:17, opacity:0.55 }} />
          <span style={{ fontSize:11, color:NS.muted, letterSpacing:"0.12em", textTransform:"uppercase" }}>Research Capabilities</span>
        </footer>
      </div>

      {popup && !viewer && (
        <ItemsPopup title={popup.title} accent={popup.accent} items={popup.items}
          onClose={closePopup} onOpen={openViewer} />
      )}
      {viewer && (
        <CaseViewer item={viewer} accent={popupAccent || NS.blue} onClose={closeViewer} />
      )}
    </>
  );
}
