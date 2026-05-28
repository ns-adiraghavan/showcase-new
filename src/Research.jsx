import { useState, useEffect, useRef } from "react";
import logoSrc from "./assets/netscribes-logo.png";

// ─── Brand tokens (mirror main showcase exactly) ─────────────────
const NS = {
  blue:      "#005F86",
  blueDeep:  "#003A52",
  blueSoft:  "#1A8AB5",
  red:       "#C9252B",
  redDeep:   "#8C1A1F",
  redSoft:   "#E55A60",
  paper:     "#F5F1EA",
  paperDeep: "#EDE7DB",
  surface:   "#FFFFFF",
  ink:       "#0F1B27",
  inkSoft:   "#3C4754",
  muted:     "#6E7884",
  rule:      "rgba(0, 95, 134, 0.14)",
  ruleSoft:  "rgba(0, 95, 134, 0.07)",
};

// ─── Helpers ─────────────────────────────────────────────────────
function driveFile(id) {
  return {
    driveEmbedUrl: `https://drive.google.com/file/d/${id}/preview`,
    driveViewUrl:  `https://drive.google.com/file/d/${id}/view`,
  };
}

// ─── All Research Case Studies ───────────────────────────────────
// Each entry: { title, desc, industry, studyType, geo, primaryType, driveEmbedUrl, driveViewUrl }

const RESEARCH_DATA = [
  // ── Industry Analysis ──────────────────────────────────────────
  { title:"ISP Market Landscape Study", desc:"Market assessment of the ISP ecosystem, regulatory frameworks, and key players across Nigeria and DRC to support strategic market entry decisions.", industry:"telecom", studyType:"Industry Analysis", geo:["Africa"], primaryType:"B2B", ...driveFile("1UcAgLoyYIWWv-KxXFLp9qkxHt_4Or96T") },
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

  // ── GTM ────────────────────────────────────────────────────────
  { title:"GTM Strategy for a Personal Finance Management App", desc:"Go-to-market strategy defining target segments, channel mix, and launch sequencing for a personal finance management application.", industry:"bfsi", studyType:"GTM", geo:["Europe"], primaryType:null, ...driveFile("1RaM068TLcSBPsf5pXviB7qotsd-M75BZ") },
  { title:"GTM Strategy for a Cloud-Based Cybersecurity Startup", desc:"Go-to-market strategy covering ICP definition, competitive positioning, and sales motion design for a cloud-native cybersecurity startup.", industry:"tech", studyType:"GTM", geo:["North America"], primaryType:"B2B", ...driveFile("1_d453HbhK36dZz5mJGzYbpQzLaIRV4mA") },
  { title:"GTM Strategy and Roadmap Building for a Tech Giant", desc:"Comprehensive GTM strategy and execution roadmap developed for a large technology company entering a new product category.", industry:"tech", studyType:"GTM", geo:["Africa"], primaryType:"B2B", ...driveFile("1_6Nb1kJih9sxT-1xAK1ZduqLstzQOrJG") },
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

  // ── Competitive Benchmarking & Account Intelligence ────────────
  { title:"Enterprise Connectivity Service Delivery Process for Indian SMEs", desc:"Competitors' benchmarking study analyzing end-to-end service delivery workflows to pinpoint timeline delays and optimize B2B telecom process efficiency.", industry:"telecom", studyType:"Competitive Benchmarking & Account Intelligence", geo:["South Asia"], primaryType:"B2B", ...driveFile("1S0d_-frzWrQJJ3pZ2ub8OSiYfkUGlq6I") },
  { title:"Airline Loyalty Programs & Co-branded Credit Cards Benchmarking", desc:"Competitive benchmarking of airline co-branded credit card programmes — rewards architecture, partner economics, and cardholder acquisition strategies.", industry:"bfsi", studyType:"Competitive Benchmarking & Account Intelligence", geo:["North America"], primaryType:null, ...driveFile("1VQHt0UZy5Q2FLhNmShUtLmIV_Ek3gswW") },
  { title:"Comparative Review of Cashback Credit Cards in the US", desc:"Side-by-side competitive analysis of leading cashback credit card products in the US market — earn rates, redemption mechanics, and fee structures.", industry:"bfsi", studyType:"Competitive Benchmarking & Account Intelligence", geo:["North America"], primaryType:null, ...driveFile("1CEqhA2kNvql4_x0fDqn6_7eHp5ABic7d") },
  { title:"Brand Health & Competitive Benchmarking Study for a Health Insurance Company", desc:"Brand equity and competitive positioning benchmarking for a health insurance provider — awareness, NPS, and share-of-wallet analysis.", industry:"bfsi", studyType:"Competitive Benchmarking & Account Intelligence", geo:["North America","Europe","Asia","Middle East","Africa"], primaryType:"B2B", ...driveFile("1bZQrQZUvjyOywOhzRs6X9ET-y5jGTHU3") },
  { title:"Pricing Analysis for a Cloud-Based SCM Provider", desc:"Competitive pricing intelligence study for a cloud-based supply chain management provider — tier structures, discounting patterns, and value metric benchmarks.", industry:"tech", studyType:"Competitive Benchmarking & Account Intelligence", geo:["Global"], primaryType:"B2B", ...driveFile("19XFI2m0RxC4wJxviP17jRpj_LHdCHu8X") },
  { title:"Account Intelligence Sample Report – Level 1: Netflix", desc:"Level 1 account intelligence profile for Netflix — firmographic overview, strategic priorities, and key buying signals for sales engagement.", industry:"tech", studyType:"Competitive Benchmarking & Account Intelligence", geo:["North America"], primaryType:null, ...driveFile("1C82FObYTfQFAtKJMayW8FOspiTttbGBI") },
  { title:"Account Intelligence Sample Report – Level 2: Home Depot", desc:"Level 2 account intelligence report for Home Depot — organisational mapping, technology landscape, and procurement signals.", industry:"tech", studyType:"Competitive Benchmarking & Account Intelligence", geo:["North America"], primaryType:null, ...driveFile("1imHUtJa8JXcGgUqXPCv8q0FshFmcZqR2") },
  { title:"Account Intelligence Sample Report – Level 3: Tesco", desc:"Level 3 account intelligence report for Tesco — deep-dive competitive positioning, initiative tracking, and stakeholder mapping.", industry:"tech", studyType:"Competitive Benchmarking & Account Intelligence", geo:["Europe"], primaryType:null, ...driveFile("1YH67vPO9frOLkqFDYzBoyYNQIw-D0bDu") },
  { title:"Account Intelligence Sample Report – Level 4: DuPont", desc:"Level 4 account intelligence report for DuPont — comprehensive strategic intelligence covering M&A signals, innovation pipeline, and executive priorities.", industry:"tech", studyType:"Competitive Benchmarking & Account Intelligence", geo:["North America"], primaryType:null, ...driveFile("1LVtwTga9Z8ZWoMn8vzx9epB09jk3aCU1") },
  { title:"Brand & Product Performance Tracking Study for Cleaning Wipes", desc:"Ongoing competitive benchmarking of brand health and product performance metrics for a cleaning wipes brand across retail channels.", industry:"retail", studyType:"Competitive Benchmarking & Account Intelligence", geo:["North America"], primaryType:"B2C", ...driveFile("1a_RNWEMmh-BMaSQAfBipJlVOreO52Ajs") },
  { title:"Competitive Landscape Analysis for Juice Market", desc:"Competitive intelligence study mapping the juice market landscape — key players, share dynamics, innovation trends, and positioning white spaces.", industry:"fnb", studyType:"Competitive Benchmarking & Account Intelligence", geo:["Middle East","Africa"], primaryType:"B2B", ...driveFile("1LZ9NgNpvyJ-VKqJAgALbZUK5AD9ADwI7") },
  { title:"Middle East Portable Air Compressor and Hand-held Tool Market", desc:"Competitive intelligence on the Middle East market for portable air compressors and handheld power tools — rival capabilities and channel strategies.", industry:"mfg", studyType:"Competitive Benchmarking & Account Intelligence", geo:["Middle East"], primaryType:"B2B", ...driveFile("1-uxzXR3sRlI3sFlnvTeX2mWHRDRA0nvn") },

  // ── Consumer Research ──────────────────────────────────────────
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

  // ── AI Readiness Assessment ────────────────────────────────────
  { title:"AI Adoption in Telecom Sector", desc:"Global benchmarking study evaluating regional AI maturity, high-impact operator use cases, and capability gaps to sharpen GTM positioning.", industry:"telecom", studyType:"AI Readiness Assessment", geo:["North America","Europe","Asia","Middle East","Africa"], primaryType:"B2B", ...driveFile("10abj6wddyAktZvwSu3mt-S-kYHDh0fWU") },
  { title:"AI Ethics and Transparency Impact Assessment", desc:"Assessment of enterprise AI ethics posture and transparency readiness — governance frameworks, bias risk, and regulatory alignment across tech deployments.", industry:"tech", studyType:"AI Readiness Assessment", geo:["North America","Europe","Asia"], primaryType:"B2B", ...driveFile("1ggtWzS3z5NkYro1QefJMT5oW9upYzPYV") },
];

// ─── Sector definitions ───────────────────────────────────────────
const SECTORS = [
  { id:"auto",    label:"Automotive",             icon:"🚗", color:NS.blue },
  { id:"bfsi",    label:"BFSI",                   icon:"🏦", color:NS.blueDeep },
  { id:"tech",    label:"Technology & Software",  icon:"💻", color:NS.blueSoft },
  { id:"telecom", label:"Telecommunication",      icon:"📡", color:NS.blue },
  { id:"health",  label:"Healthcare",             icon:"🏥", color:NS.blueDeep },
  { id:"mfg",     label:"Manufacturing",          icon:"🏭", color:NS.blueSoft },
  { id:"retail",  label:"Retail & E-commerce",   icon:"🛍️", color:NS.blue },
  { id:"fnb",     label:"Food & Beverage",        icon:"🍽️", color:NS.blueDeep },
];

// ─── Study type definitions ────────────────────────────────────────
const STUDY_TYPES = [
  { id:"Industry Analysis",                            label:"Industry Analysis",                            icon:"📈", desc:"Market sizing, landscape studies, TAM modelling, growth driver analysis and demand forecasting." },
  { id:"GTM",                                          label:"GTM Strategy",                                 icon:"🚀", desc:"Market entry, beachhead identification, channel selection, concept testing and launch sequencing." },
  { id:"Competitive Benchmarking & Account Intelligence", label:"Competitive Benchmarking",                  icon:"🔍", desc:"Rival profiling, win/loss analysis, account intelligence, product roadmap and pricing intelligence." },
  { id:"Consumer Research",                            label:"Consumer Research",                            icon:"🎯", desc:"Attitude & usage studies, segmentation, needs mapping, concept testing and brand tracking." },
  { id:"AI Readiness Assessment",                      label:"AI Readiness Assessment",                      icon:"🤖", desc:"Enterprise maturity benchmarking across data, talent, infrastructure and use-case deployment." },
];

// ─── Geography definitions for the SVG map ────────────────────────
const GEO_REGIONS = [
  { id:"North America",  cx:195, cy:155, label:"North America",  studies: RESEARCH_DATA.filter(d=>d.geo.includes("North America")) },
  { id:"Europe",         cx:460, cy:130, label:"Europe",         studies: RESEARCH_DATA.filter(d=>d.geo.includes("Europe")) },
  { id:"Middle East",    cx:540, cy:195, label:"Middle East",    studies: RESEARCH_DATA.filter(d=>d.geo.includes("Middle East")) },
  { id:"Africa",         cx:470, cy:255, label:"Africa",         studies: RESEARCH_DATA.filter(d=>d.geo.includes("Africa")) },
  { id:"South Asia",     cx:600, cy:205, label:"South Asia",     studies: RESEARCH_DATA.filter(d=>d.geo.includes("South Asia")) },
  { id:"Southeast Asia", cx:660, cy:245, label:"Southeast Asia", studies: RESEARCH_DATA.filter(d=>d.geo.includes("Southeast Asia")) },
  { id:"Asia",           cx:680, cy:165, label:"East & Central Asia", studies: RESEARCH_DATA.filter(d=>d.geo.includes("Asia")) },
  { id:"Global",         cx:350, cy:310, label:"Global / Multi-region", studies: RESEARCH_DATA.filter(d=>d.geo.includes("Global")) },
];

// ─── Scroll-fade hook ─────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.07 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── Case Study Viewer Modal ──────────────────────────────────────
function CaseViewer({ item, onClose }) {
  useEffect(() => {
    const h = e => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", h);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", h); };
  }, [onClose]);

  const sectorLabel = SECTORS.find(s => s.id === item.industry)?.label || item.industry;

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{
      position:"fixed", inset:0, background:"rgba(15,27,39,0.6)",
      backdropFilter:"blur(6px)", zIndex:2000,
      display:"flex", alignItems:"center", justifyContent:"center", padding:20,
    }}>
      <div style={{
        background:NS.surface, borderRadius:4, width:"100%", maxWidth:860,
        maxHeight:"90vh", display:"flex", flexDirection:"column",
        boxShadow:"0 32px 80px rgba(0,0,0,0.22)",
        animation:"ns-pop 0.25s both",
      }}>
        {/* Header */}
        <div style={{ padding:"24px 28px 20px", borderBottom:`1px solid ${NS.rule}`, flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16 }}>
            <div>
              <div style={{ display:"flex", gap:8, marginBottom:8, flexWrap:"wrap" }}>
                <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", color:NS.blue, background:`rgba(0,95,134,0.08)`, padding:"3px 8px", borderRadius:2 }}>{item.studyType}</span>
                <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", color:NS.muted, background:NS.paperDeep, padding:"3px 8px", borderRadius:2 }}>{sectorLabel}</span>
              </div>
              <h2 style={{ fontFamily:"'Instrument Serif', serif", fontSize:"clamp(17px,2vw,22px)", fontWeight:400, color:NS.ink, lineHeight:1.3, letterSpacing:"-0.01em", maxWidth:600 }}>{item.title}</h2>
              <p style={{ marginTop:6, fontSize:13, color:NS.muted, lineHeight:1.6, maxWidth:580 }}>{item.desc}</p>
            </div>
            <button onClick={onClose} style={{ flexShrink:0, width:32, height:32, borderRadius:"50%", border:`1px solid ${NS.rule}`, background:NS.paper, cursor:"pointer", fontSize:16, color:NS.muted, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
          </div>
          <a href={item.driveViewUrl} target="_blank" rel="noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:6, marginTop:14, fontSize:12, fontWeight:600, color:NS.blue, textDecoration:"none", letterSpacing:"0.04em" }}>
            Open in Google Drive ↗
          </a>
        </div>
        {/* Embed */}
        <div style={{ flex:1, minHeight:0, background:NS.paperDeep }}>
          <iframe
            src={item.driveEmbedUrl}
            title={item.title}
            style={{ width:"100%", height:"100%", minHeight:440, border:"none" }}
            allow="autoplay"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Drawer: list of case studies for a sector/study-type/geo ─────
function CaseDrawer({ title, subtitle, items, onClose, onOpen }) {
  useEffect(() => {
    const h = e => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", h);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", h); };
  }, [onClose]);

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{
      position:"fixed", inset:0, background:"rgba(15,27,39,0.5)",
      backdropFilter:"blur(4px)", zIndex:1800,
      display:"flex", justifyContent:"flex-end",
    }}>
      <div style={{
        width:"100%", maxWidth:520, height:"100%",
        background:NS.surface, display:"flex", flexDirection:"column",
        boxShadow:"-24px 0 64px rgba(0,0,0,0.14)",
        animation:"ns-drawer-in 0.28s cubic-bezier(0.4,0,0.2,1) both",
      }}>
        {/* Drawer header */}
        <div style={{ padding:"28px 28px 22px", borderBottom:`1px solid ${NS.rule}`, flexShrink:0, background:NS.paper }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
            <div>
              <p style={{ fontSize:10, fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", color:NS.blue, marginBottom:6 }}>Case Studies</p>
              <h3 style={{ fontFamily:"'Instrument Serif', serif", fontSize:22, fontWeight:400, color:NS.ink, letterSpacing:"-0.01em", marginBottom:4 }}>{title}</h3>
              {subtitle && <p style={{ fontSize:13, color:NS.muted }}>{subtitle}</p>}
            </div>
            <button onClick={onClose} style={{ flexShrink:0, width:32, height:32, borderRadius:"50%", border:`1px solid ${NS.rule}`, background:NS.surface, cursor:"pointer", fontSize:16, color:NS.muted, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
          </div>
          <div style={{ marginTop:12, fontSize:12, color:NS.muted, fontWeight:500 }}>{items.length} work sample{items.length !== 1 ? "s" : ""}</div>
        </div>
        {/* List */}
        <div style={{ flex:1, overflowY:"auto", padding:"16px 20px 32px" }}>
          {items.length === 0 && (
            <div style={{ textAlign:"center", padding:"60px 20px", color:NS.muted, fontSize:14 }}>No case studies in this category yet.</div>
          )}
          {items.map((item, i) => (
            <div key={i} onClick={() => onOpen(item)} style={{
              padding:"16px 18px", borderRadius:3, border:`1px solid ${NS.rule}`,
              marginBottom:10, cursor:"pointer", background:NS.surface,
              transition:"border-color 0.18s, box-shadow 0.18s, background 0.18s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = NS.blue; e.currentTarget.style.background = "#fafcff"; e.currentTarget.style.boxShadow = `0 4px 16px rgba(0,95,134,0.1)`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = NS.rule; e.currentTarget.style.background = NS.surface; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12 }}>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:13.5, fontWeight:500, color:NS.ink, lineHeight:1.4, marginBottom:5 }}>{item.title}</p>
                  <p style={{ fontSize:12, color:NS.muted, lineHeight:1.55 }}>{item.desc}</p>
                </div>
                <span style={{ flexShrink:0, color:NS.blue, fontSize:18, marginTop:1 }}>→</span>
              </div>
              <div style={{ marginTop:10, display:"flex", gap:6, flexWrap:"wrap" }}>
                <span style={{ fontSize:10, padding:"2px 7px", borderRadius:2, background:`rgba(0,95,134,0.07)`, color:NS.blue, fontWeight:600, letterSpacing:"0.08em" }}>{item.studyType}</span>
                {item.primaryType && <span style={{ fontSize:10, padding:"2px 7px", borderRadius:2, background:NS.paperDeep, color:NS.muted, fontWeight:500 }}>{item.primaryType}</span>}
                {item.geo.map(g => <span key={g} style={{ fontSize:10, padding:"2px 7px", borderRadius:2, background:NS.paperDeep, color:NS.muted, fontWeight:500 }}>{g}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Section: Sectoral Depth ──────────────────────────────────────
function SectorSection({ onDrawerOpen }) {
  const [ref, visible] = useFadeIn();
  return (
    <section id="sectors" ref={ref} style={{
      padding:"72px clamp(20px,4vw,56px)",
      maxWidth:1160, margin:"0 auto",
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(20px)",
      transition:"opacity 0.55s ease, transform 0.55s ease",
    }}>
      <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:40, flexWrap:"wrap", gap:16 }}>
        <div>
          <p style={{ fontSize:10, fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase", color:NS.blue, marginBottom:10 }}>01 — Sector Expertise</p>
          <h2 style={{ fontFamily:"'Instrument Serif', serif", fontSize:"clamp(28px,3vw,40px)", fontWeight:400, color:NS.ink, letterSpacing:"-0.02em", lineHeight:1.1 }}>Industries we know deeply</h2>
        </div>
        <p style={{ fontSize:14, color:NS.muted, maxWidth:360, lineHeight:1.65, textAlign:"right" }}>Sustained research relationships across eight high-impact sectors — each with primary and secondary depth.</p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:16 }}>
        {SECTORS.map((s, i) => {
          const count = RESEARCH_DATA.filter(d => d.industry === s.id).length;
          return (
            <SectorCard key={s.id} sector={s} count={count} delay={i * 40} onClick={() => onDrawerOpen(
              s.label,
              `${count} work samples across this sector`,
              RESEARCH_DATA.filter(d => d.industry === s.id)
            )} />
          );
        })}
      </div>
    </section>
  );
}

function SectorCard({ sector, count, delay, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? NS.surface : NS.surface,
        border:`1px solid ${hovered ? sector.color : NS.rule}`,
        borderRadius:3, padding:"26px 24px 22px", cursor:"pointer",
        transition:"all 0.2s ease",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? `0 12px 32px rgba(0,95,134,0.12)` : "none",
        animationDelay:`${delay}ms`,
      }}
    >
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <span style={{ fontSize:26 }}>{sector.icon}</span>
        <span style={{ fontSize:11, fontWeight:600, letterSpacing:"0.06em", color: hovered ? sector.color : NS.muted, background: hovered ? `rgba(0,95,134,0.07)` : NS.paperDeep, padding:"3px 9px", borderRadius:2, transition:"all 0.2s" }}>
          {count} samples
        </span>
      </div>
      <h3 style={{ fontFamily:"'Instrument Serif', serif", fontSize:17, fontWeight:400, color:NS.ink, letterSpacing:"-0.01em", lineHeight:1.3, marginBottom:6 }}>{sector.label}</h3>
      <p style={{ fontSize:12, color:NS.muted, lineHeight:1.55 }}>
        {({
          auto:"EV transition, OEM strategy, mobility and supply chain.",
          bfsi:"Fintech, embedded finance, payments and insurance dynamics.",
          tech:"SaaS, AI adoption, cloud strategy and platform ecosystems.",
          telecom:"5G monetisation, spectrum, enterprise connectivity.",
          health:"Clinical intelligence, pharma CI, digital health, payer dynamics.",
          mfg:"Industry 4.0, automation ROI, supply chain diversification.",
          retail:"Shopper insights, brand equity, channel strategy, D2C.",
          fnb:"Consumer preferences, concept testing, beverage trends.",
        })[sector.id]}
      </p>
      <div style={{ marginTop:14, display:"flex", alignItems:"center", gap:4, color: hovered ? NS.blue : NS.muted, fontSize:12, fontWeight:600, transition:"color 0.2s" }}>
        View work samples <span style={{ fontSize:15, marginLeft:2 }}>→</span>
      </div>
    </div>
  );
}

// ─── Section: Research Methodology ────────────────────────────────
function MethodologySection({ onDrawerOpen }) {
  const [ref, visible] = useFadeIn();
  return (
    <section id="methodology" ref={ref} style={{
      padding:"72px clamp(20px,4vw,56px)",
      maxWidth:1160, margin:"0 auto",
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(20px)",
      transition:"opacity 0.55s ease, transform 0.55s ease",
    }}>
      <div style={{ borderTop:`1px solid ${NS.rule}`, paddingTop:72 }}>
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:40, flexWrap:"wrap", gap:16 }}>
          <div>
            <p style={{ fontSize:10, fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase", color:NS.red, marginBottom:10 }}>02 — Research Methodology</p>
            <h2 style={{ fontFamily:"'Instrument Serif', serif", fontSize:"clamp(28px,3vw,40px)", fontWeight:400, color:NS.ink, letterSpacing:"-0.02em", lineHeight:1.1 }}>Purpose-built frameworks</h2>
          </div>
          <p style={{ fontSize:14, color:NS.muted, maxWidth:360, lineHeight:1.65, textAlign:"right" }}>Five distinct study types, each with a rigorous methodology and a deep sample library to draw from.</p>
        </div>

        {/* Study type — horizontal list with count bars */}
        <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
          {STUDY_TYPES.map((st, i) => {
            const items = RESEARCH_DATA.filter(d => d.studyType === st.id);
            const maxCount = 28;
            const pct = Math.min(100, (items.length / maxCount) * 100);
            return (
              <StudyTypeRow key={st.id} st={st} items={items} pct={pct} index={i}
                onClick={() => onDrawerOpen(st.label, st.desc, items)} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StudyTypeRow({ st, items, pct, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:"grid", gridTemplateColumns:"42px 1fr 80px 200px 48px",
        alignItems:"center", gap:24,
        padding:"20px 24px", cursor:"pointer",
        borderTop: index === 0 ? `1px solid ${NS.rule}` : "none",
        borderBottom:`1px solid ${NS.rule}`,
        background: hovered ? NS.paperDeep : "transparent",
        transition:"background 0.18s",
      }}
    >
      {/* Icon */}
      <span style={{ fontSize:22 }}>{st.icon}</span>
      {/* Label + desc */}
      <div>
        <h3 style={{ fontFamily:"'Instrument Serif', serif", fontSize:17, fontWeight:400, color:NS.ink, letterSpacing:"-0.01em", marginBottom:3 }}>{st.label}</h3>
        <p style={{ fontSize:12, color:NS.muted, lineHeight:1.5 }}>{st.desc}</p>
      </div>
      {/* Count */}
      <span style={{ fontSize:11, fontWeight:600, color:NS.muted, textAlign:"right" }}>{items.length} samples</span>
      {/* Bar */}
      <div style={{ height:3, background:NS.paperDeep, borderRadius:2, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${pct}%`, background: hovered ? NS.red : NS.blue, borderRadius:2, transition:"width 0.6s ease, background 0.2s" }} />
      </div>
      {/* Arrow */}
      <span style={{ color: hovered ? NS.blue : NS.muted, fontSize:18, transition:"color 0.18s", textAlign:"right" }}>→</span>
    </div>
  );
}

// ─── Section: Global Reach (SVG Map) ─────────────────────────────
function GeoSection({ onDrawerOpen }) {
  const [ref, visible] = useFadeIn();
  const [hovered, setHovered] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({x:0,y:0});

  // Unique geos with counts
  const geoStats = GEO_REGIONS.map(g => ({
    ...g,
    count: g.studies.length,
  }));

  return (
    <section id="geography" ref={ref} style={{
      padding:"0 clamp(20px,4vw,56px) 72px",
      maxWidth:1160, margin:"0 auto",
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(20px)",
      transition:"opacity 0.55s ease, transform 0.55s ease",
    }}>
      <div style={{ borderTop:`1px solid ${NS.rule}`, paddingTop:72 }}>
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:44, flexWrap:"wrap", gap:16 }}>
          <div>
            <p style={{ fontSize:10, fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase", color:NS.blueSoft, marginBottom:10 }}>03 — Global Reach</p>
            <h2 style={{ fontFamily:"'Instrument Serif', serif", fontSize:"clamp(28px,3vw,40px)", fontWeight:400, color:NS.ink, letterSpacing:"-0.02em", lineHeight:1.1 }}>Research across every major region</h2>
          </div>
          <p style={{ fontSize:14, color:NS.muted, maxWidth:360, lineHeight:1.65, textAlign:"right" }}>Primary and secondary research delivered across North America, Europe, Middle East, Africa, and Asia-Pacific.</p>
        </div>

        {/* Map container */}
        <div style={{ position:"relative", background:NS.paperDeep, borderRadius:4, padding:"8px 0", overflow:"visible" }}>
          <WorldMapSVG
            geos={geoStats}
            hovered={hovered}
            onEnter={(id, e) => {
              setHovered(id);
              const rect = e.currentTarget.closest("svg").getBoundingClientRect();
              setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }}
            onLeave={() => setHovered(null)}
            onClick={(geo) => onDrawerOpen(geo.label, `${geo.count} work samples from this region`, geo.studies)}
          />
          {/* Tooltip */}
          {hovered && (() => {
            const geo = geoStats.find(g => g.id === hovered);
            if (!geo) return null;
            return (
              <div style={{
                position:"absolute", left: tooltipPos.x + 14, top: tooltipPos.y - 10,
                background:NS.ink, color:"#fff", borderRadius:3, padding:"8px 12px",
                fontSize:12, fontWeight:500, pointerEvents:"none", zIndex:10,
                whiteSpace:"nowrap", boxShadow:"0 8px 24px rgba(0,0,0,0.2)",
              }}>
                <div style={{ fontWeight:700, marginBottom:2 }}>{geo.label}</div>
                <div style={{ opacity:0.75 }}>{geo.count} work samples</div>
              </div>
            );
          })()}
        </div>

        {/* Region chips below map */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginTop:20 }}>
          {geoStats.map(g => (
            <button key={g.id} onClick={() => onDrawerOpen(g.label, `${g.count} work samples from this region`, g.studies)}
              style={{ fontSize:12, fontWeight:500, color:NS.inkSoft, background:NS.surface, border:`1px solid ${NS.rule}`, borderRadius:2, padding:"6px 12px", cursor:"pointer", transition:"all 0.18s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = NS.blue; e.currentTarget.style.color = NS.blue; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = NS.rule; e.currentTarget.style.color = NS.inkSoft; }}
            >
              {g.label} <span style={{ opacity:0.5, marginLeft:4 }}>{g.count}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Simplified SVG world map with dot markers ────────────────────
function WorldMapSVG({ geos, hovered, onEnter, onLeave, onClick }) {
  // Simplified land mass paths at 800×400 viewbox
  const landPaths = [
    // North America
    "M 120 80 L 280 75 L 295 95 L 310 120 L 295 155 L 265 175 L 240 170 L 210 190 L 195 195 L 175 180 L 155 155 L 130 140 L 110 110 Z",
    // Greenland
    "M 280 50 L 320 40 L 340 55 L 325 75 L 295 80 Z",
    // South America
    "M 200 205 L 245 200 L 270 225 L 275 280 L 255 330 L 225 345 L 205 310 L 185 275 L 185 235 Z",
    // UK/Ireland
    "M 445 110 L 458 105 L 465 118 L 456 128 L 447 120 Z",
    // Europe
    "M 430 100 L 510 95 L 535 110 L 530 140 L 510 155 L 480 158 L 455 148 L 435 130 Z",
    // Scandinavia
    "M 460 68 L 490 60 L 510 75 L 505 98 L 480 105 L 460 90 Z",
    // Africa
    "M 440 165 L 510 160 L 540 180 L 545 235 L 525 295 L 490 320 L 458 310 L 435 270 L 430 215 Z",
    // Russia/Central Asia
    "M 510 60 L 700 50 L 730 80 L 720 130 L 680 145 L 610 150 L 545 140 L 520 110 Z",
    // Middle East
    "M 520 155 L 585 148 L 600 170 L 590 205 L 555 215 L 520 200 Z",
    // South Asia
    "M 580 160 L 640 158 L 660 180 L 650 215 L 620 228 L 595 220 L 580 195 Z",
    // Southeast Asia
    "M 640 195 L 700 188 L 720 210 L 705 245 L 670 255 L 645 235 Z",
    // East Asia / China
    "M 638 130 L 710 125 L 740 150 L 730 185 L 695 195 L 652 190 L 630 165 Z",
    // Japan
    "M 720 135 L 735 130 L 745 145 L 735 160 L 720 152 Z",
    // Australia
    "M 640 275 L 720 268 L 750 295 L 745 335 L 705 345 L 660 330 L 638 305 Z",
    // New Zealand
    "M 745 325 L 762 318 L 768 340 L 755 350 L 745 338 Z",
  ];

  return (
    <svg viewBox="0 0 870 400" style={{ width:"100%", height:"auto", display:"block" }}>
      {/* Ocean background */}
      <rect width="870" height="400" fill={NS.paperDeep} />
      {/* Grid lines (subtle) */}
      {[80,160,240,320].map(y => <line key={y} x1="0" y1={y} x2="870" y2={y} stroke={NS.rule} strokeWidth="0.5"/>)}
      {[145,290,435,580,725].map(x => <line key={x} x1={x} y1="0" x2={x} y2="400" stroke={NS.rule} strokeWidth="0.5"/>)}
      {/* Land masses */}
      {landPaths.map((d, i) => (
        <path key={i} d={d} fill={NS.surface} stroke={NS.rule} strokeWidth="1" />
      ))}
      {/* Geo dot markers */}
      {geos.map(geo => {
        const isHov = hovered === geo.id;
        const r = isHov ? 10 : 7;
        return (
          <g key={geo.id}
            style={{ cursor:"pointer" }}
            onMouseEnter={e => onEnter(geo.id, e)}
            onMouseLeave={onLeave}
            onClick={() => onClick(geo)}
          >
            {/* Pulse ring */}
            {isHov && (
              <circle cx={geo.cx} cy={geo.cy} r={18} fill="none" stroke={NS.red} strokeWidth="1.5" opacity="0.4">
                <animate attributeName="r" from="10" to="24" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={geo.cx} cy={geo.cy} r={r} fill={isHov ? NS.red : NS.blue} style={{ transition:"r 0.18s, fill 0.18s" }} />
            <circle cx={geo.cx} cy={geo.cy} r={r * 0.45} fill="rgba(255,255,255,0.6)" />
            {/* Count label */}
            <text x={geo.cx} y={geo.cy - r - 5} textAnchor="middle" fontSize="9" fontWeight="700"
              fill={isHov ? NS.red : NS.blue} fontFamily="'DM Sans', sans-serif">
              {geo.count}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Section: Research Expertise ─────────────────────────────────
function ExpertiseSection({ onDrawerOpen }) {
  const [ref, visible] = useFadeIn();

  const expertiseCards = [
    {
      id: "b2b",
      label: "B2B Research",
      tag: "Decision-maker intelligence",
      icon: "🤝",
      color: NS.blue,
      desc: "Executive interviews, expert panels, win/loss studies, buyer journey research and industrial surveys. We reach CxOs, procurement leaders, and technical decision-makers across 40+ markets.",
      stat: "B2B",
      statLabel: "Primary research",
      items: RESEARCH_DATA.filter(d => d.primaryType === "B2B"),
      sampleTitles: ["Engagement Perception for an International Bank", "AI Ethics and Transparency Impact Assessment", "GTM Strategy for a Cloud-Based Cybersecurity Startup"],
    },
    {
      id: "b2c",
      label: "B2C & Consumer Research",
      tag: "Consumer depth",
      icon: "👥",
      color: NS.red,
      desc: "Consumer surveys, ethnographic studies, focus groups, diary studies, and online communities. Deep access to consumer panels across retail, FMCG, lifestyle and financial services segments.",
      stat: "B2C",
      statLabel: "Primary research",
      items: RESEARCH_DATA.filter(d => d.primaryType === "B2C"),
      sampleTitles: ["Online Shopping Patterns for Women's Apparel in the United States", "Consumer Insights & Trend Mapping: Women's Adult Beverages", "Brand Perception & Consumer Behaviour Study for Premium Alcohol"],
    },
    {
      id: "both",
      label: "Dual B2B / B2C Studies",
      tag: "Mixed audience research",
      icon: "⚗️",
      color: NS.blueDeep,
      desc: "Complex research programmes combining stakeholder and end-consumer perspectives — capturing the full market picture from manufacturer to final user across diverse geographies.",
      stat: "Both",
      statLabel: "Primary research",
      items: RESEARCH_DATA.filter(d => d.primaryType === null),
      sampleTitles: ["Brand Health & Competitive Benchmarking Study for a Health Insurance Company", "Airline Loyalty Programs & Co-branded Credit Cards Benchmarking"],
    },
  ];

  return (
    <section id="expertise" ref={ref} style={{
      padding:"0 clamp(20px,4vw,56px) 96px",
      maxWidth:1160, margin:"0 auto",
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(20px)",
      transition:"opacity 0.55s ease, transform 0.55s ease",
    }}>
      <div style={{ borderTop:`1px solid ${NS.rule}`, paddingTop:72 }}>
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:44, flexWrap:"wrap", gap:16 }}>
          <div>
            <p style={{ fontSize:10, fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase", color:NS.blueDeep, marginBottom:10 }}>04 — Research Expertise</p>
            <h2 style={{ fontFamily:"'Instrument Serif', serif", fontSize:"clamp(28px,3vw,40px)", fontWeight:400, color:NS.ink, letterSpacing:"-0.02em", lineHeight:1.1 }}>How we engage respondents</h2>
          </div>
          <p style={{ fontSize:14, color:NS.muted, maxWidth:360, lineHeight:1.65, textAlign:"right" }}>First-hand intelligence through human respondents — structured across B2B decision-makers, B2C consumers, and complex dual-audience programmes.</p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:20 }}>
          {expertiseCards.map((card, i) => (
            <ExpertiseCard key={card.id} card={card} delay={i * 80}
              onClick={() => onDrawerOpen(card.label, card.tag, card.items)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpertiseCard({ card, delay, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: NS.surface, borderRadius:3, padding:"28px 26px",
        border:`1px solid ${hovered ? card.color : NS.rule}`,
        cursor:"pointer",
        transition:"all 0.22s ease",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? `0 16px 40px rgba(0,0,0,0.10)` : "none",
        animationDelay:`${delay}ms`,
        display:"flex", flexDirection:"column",
      }}
    >
      {/* Top bar */}
      <div style={{ height:3, width: hovered ? "100%" : "32px", background:card.color, borderRadius:2, marginBottom:22, transition:"width 0.35s ease" }} />
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
        <span style={{ fontSize:28 }}>{card.icon}</span>
        <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:card.color, background:`rgba(0,0,0,0.04)`, padding:"3px 8px", borderRadius:2 }}>{card.tag}</span>
      </div>
      <h3 style={{ fontFamily:"'Instrument Serif', serif", fontSize:20, fontWeight:400, color:NS.ink, letterSpacing:"-0.01em", lineHeight:1.25, marginBottom:10 }}>{card.label}</h3>
      <p style={{ fontSize:13, color:NS.muted, lineHeight:1.65, marginBottom:20, flex:1 }}>{card.desc}</p>

      {/* Sample titles */}
      <div style={{ borderTop:`1px solid ${NS.rule}`, paddingTop:16, marginBottom:18 }}>
        <p style={{ fontSize:10, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:NS.muted, marginBottom:10 }}>Featured work</p>
        {card.sampleTitles.slice(0,3).map((t,i) => (
          <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start", marginBottom:7 }}>
            <span style={{ color:card.color, fontSize:12, marginTop:1, flexShrink:0 }}>—</span>
            <span style={{ fontSize:12, color:NS.inkSoft, lineHeight:1.45 }}>{t}</span>
          </div>
        ))}
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:6, color: hovered ? card.color : NS.muted, fontSize:12, fontWeight:600, transition:"color 0.2s" }}>
        <span>{card.items.length} work samples</span>
        <span style={{ fontSize:16 }}>→</span>
      </div>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────
function ResearchNav() {
  const [activeSection, setActiveSection] = useState("sectors");
  const sections = ["sectors","methodology","geography","expertise"];

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActiveSection(e.target.id);
      });
    }, { threshold: 0.3 });
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const labels = { sectors:"Sectors", methodology:"Methodology", geography:"Geography", expertise:"Expertise" };

  return (
    <div style={{
      position:"sticky", top:0, zIndex:100,
      background:"rgba(245,241,234,0.92)", backdropFilter:"blur(12px)",
      borderBottom:`1px solid ${NS.rule}`,
      padding:"0 clamp(20px,4vw,56px)",
      display:"flex", alignItems:"center", height:52,
      gap:0,
    }}>
      <a href="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none", marginRight:"auto" }}>
        <img src={logoSrc} alt="Netscribes" style={{ height:20, objectFit:"contain", opacity:0.85 }} />
        <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.16em", textTransform:"uppercase", color:NS.muted }}>/ Research</span>
      </a>
      <nav style={{ display:"flex", gap:2 }}>
        {sections.map(id => (
          <a key={id} href={`#${id}`} style={{
            fontSize:12, fontWeight: activeSection === id ? 600 : 400,
            color: activeSection === id ? NS.ink : NS.muted,
            textDecoration:"none", padding:"6px 14px", borderRadius:2,
            background: activeSection === id ? NS.surface : "transparent",
            border: activeSection === id ? `1px solid ${NS.rule}` : "1px solid transparent",
            transition:"all 0.18s", whiteSpace:"nowrap",
          }}>{labels[id]}</a>
        ))}
      </nav>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────
function ResearchHero() {
  const sectorCount = SECTORS.length;
  const studyCount  = RESEARCH_DATA.length;
  const geoCount    = [...new Set(RESEARCH_DATA.flatMap(d => d.geo))].filter(g => g !== "Global").length;

  return (
    <div style={{
      padding:"72px clamp(20px,4vw,56px) 60px",
      maxWidth:1160, margin:"0 auto",
      display:"grid", gridTemplateColumns:"1fr auto",
      gap:"clamp(32px,5vw,80px)", alignItems:"end",
    }}>
      <div>
        <div style={{
          display:"inline-flex", alignItems:"center", gap:8,
          background:`rgba(0,95,134,0.07)`, border:`1px solid ${NS.rule}`,
          borderRadius:2, padding:"5px 12px", marginBottom:22,
        }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:NS.blue, display:"inline-block" }} />
          <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.16em", textTransform:"uppercase", color:NS.blue }}>Research Capabilities</span>
        </div>
        <h1 style={{
          fontFamily:"'Instrument Serif', serif",
          fontSize:"clamp(36px,4.5vw,60px)",
          fontWeight:400, color:NS.ink,
          letterSpacing:"-0.03em", lineHeight:1.05,
          marginBottom:18,
        }}>
          Intelligence that<br />
          <em style={{ fontStyle:"italic", color:NS.blue }}>shapes strategy.</em>
        </h1>
        <p style={{ fontSize:15, color:NS.muted, lineHeight:1.75, maxWidth:480 }}>
          A full-spectrum research practice spanning industries, geographies, and methodologies — delivering insight that powers decisions, not just reports.
        </p>
      </div>

      {/* Stat block */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, minWidth:240 }}>
        {[
          { num:`${sectorCount}`, label:"Industry sectors" },
          { num:`${studyCount}+`, label:"Work samples", accent:true },
          { num:`${geoCount}`, label:"Regions covered" },
          { num:"B2B · B2C", label:"Primary research" },
        ].map((s, i) => (
          <div key={i} style={{
            background: s.accent ? NS.blue : NS.surface,
            border:`1px solid ${s.accent ? NS.blue : NS.rule}`,
            borderRadius:3, padding:"18px 16px",
          }}>
            <div style={{ fontFamily:"'Instrument Serif', serif", fontSize:s.num.length > 3 ? 18 : 28, fontWeight:400, color: s.accent ? "#fff" : NS.ink, letterSpacing:"-0.02em", lineHeight:1, marginBottom:4 }}>{s.num}</div>
            <div style={{ fontSize:11, color: s.accent ? "rgba(255,255,255,0.75)" : NS.muted }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Root Research component ──────────────────────────────────────
export default function Research() {
  const [drawerState, setDrawerState]   = useState(null); // { title, subtitle, items }
  const [viewerState, setViewerState]   = useState(null); // single case study

  const openDrawer = (title, subtitle, items) => setDrawerState({ title, subtitle, items });
  const closeDrawer = () => setDrawerState(null);
  const openViewer  = (item) => setViewerState(item);
  const closeViewer = () => setViewerState(null);

  return (
    <>
      <style>{`
        @keyframes ns-drawer-in { from { transform: translateX(100%); opacity: 0 } to { transform: none; opacity: 1 } }
        @keyframes ns-pop { from { opacity:0; transform: translateY(14px) scale(0.98); } to { opacity:1; transform:none } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${NS.paper}; font-family: 'DM Sans', system-ui, sans-serif; color: ${NS.ink}; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${NS.rule}; border-radius: 3px; }
      `}</style>

      <div style={{ background:NS.paper, minHeight:"100vh" }}>
        <ResearchNav />
        <ResearchHero />
        <div style={{ borderTop:`1px solid ${NS.rule}` }} />
        <SectorSection     onDrawerOpen={openDrawer} />
        <MethodologySection onDrawerOpen={openDrawer} />
        <GeoSection        onDrawerOpen={openDrawer} />
        <ExpertiseSection  onDrawerOpen={openDrawer} />

        {/* Footer */}
        <div style={{ borderTop:`1px solid ${NS.rule}`, maxWidth:1160, margin:"0 auto", padding:"28px clamp(20px,4vw,56px) 40px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <img src={logoSrc} alt="Netscribes" style={{ height:18, opacity:0.6 }} />
          <span style={{ fontSize:11, color:NS.muted, letterSpacing:"0.12em", textTransform:"uppercase" }}>Research Capabilities Microsite</span>
        </div>
      </div>

      {/* Drawers & modals */}
      {drawerState && !viewerState && (
        <CaseDrawer
          title={drawerState.title}
          subtitle={drawerState.subtitle}
          items={drawerState.items}
          onClose={closeDrawer}
          onOpen={openViewer}
        />
      )}
      {viewerState && (
        <CaseViewer item={viewerState} onClose={closeViewer} />
      )}
    </>
  );
}
