import { useState, useEffect, useRef } from "react";
import logoSrc from "./assets/netscribes-logo.png";

// ─── Tokens — exact match to main showcase ────────────────────────
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
  ruleSoft:  "rgba(0,95,134,0.07)",
};

const ACCENT = {
  teal:   "#0B7B6B",
  amber:  "#B85C00",
  plum:   "#5C3472",
  forest: "#2D6B4A",
  steel:  "#1E4976",
  rust:   "#A03020",
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

// Industry order: Tech → Telecom → Retail → F&B → Auto → BFSI → Mfg → Healthcare
const SECTOR_ORDER = ["tech","telecom","retail","fnb","auto","bfsi","mfg","health"];

const SECTORS = [
  { id:"tech",    label:"Technology & Software", accent:NS.blue,       tag:"Technology", blurb:"SaaS, AI adoption, cloud strategy and B2B GTM.",              spotlight:"GTM Strategy for a Cloud-Based Cybersecurity Startup" },
  { id:"telecom", label:"Telecommunication",     accent:ACCENT.teal,   tag:"Telecom",    blurb:"5G, spectrum strategy and enterprise connectivity.",          spotlight:"AI Adoption in Telecom Sector" },
  { id:"retail",  label:"Retail & E-commerce",  accent:NS.red,        tag:"Retail",     blurb:"Shopper insights, brand equity and channel strategy.",        spotlight:"Online Shopping Patterns for Women's Apparel in the United States" },
  { id:"fnb",     label:"Food & Beverage",       accent:ACCENT.rust,   tag:"F&B",        blurb:"Consumer preference, concept testing and beverage trends.",   spotlight:"Consumer Insights & Trend Mapping: Women's Adult Beverages" },
  { id:"auto",    label:"Automotive",            accent:ACCENT.steel,  tag:"Mobility",   blurb:"EV transition, OEM strategy, ADAS and mobility.",             spotlight:"Market Assessment for Automotive Semi-active Suspension Technologies" },
  { id:"bfsi",    label:"BFSI",                  accent:ACCENT.forest, tag:"Finance",    blurb:"Fintech, embedded finance, payments and insurance.",           spotlight:"Brand Health & Competitive Benchmarking Study for a Health Insurance Company" },
  { id:"mfg",     label:"Manufacturing",         accent:ACCENT.amber,  tag:"Industrial", blurb:"Industry 4.0, automation ROI and supply chains.",             spotlight:"Market Assessment Study on the Global Biosurfactant Industry" },
  { id:"health",  label:"Healthcare",            accent:ACCENT.plum,   tag:"Health",     blurb:"Pharma CI, digital health and payer dynamics.",               spotlight:"Product Concept Testing for CT and MRI Products" },
];

const STUDY_TYPES = [
  { id:"Industry Analysis",        label:"Industry Analysis",       accent:NS.blue,        tag:"Landscape", desc:"Market sizing, landscape studies, TAM modelling and demand forecasting." },
  { id:"GTM",                      label:"GTM Strategy",            accent:ACCENT.teal,    tag:"GTM",       desc:"Market entry, beachhead identification, channel selection and launch sequencing." },
  { id:"Competitive Benchmarking", label:"Competitive Benchmarking",accent:ACCENT.amber,   tag:"Intel",     desc:"Rival profiling, win/loss analysis, account intelligence and pricing research." },
  { id:"Consumer Research",        label:"Consumer Research",       accent:ACCENT.plum,    tag:"Consumer",  desc:"Attitude & usage studies, segmentation, needs mapping and brand tracking." },
  { id:"AI Readiness",             label:"AI Readiness Assessment", accent:ACCENT.forest,  tag:"AI",        desc:"Enterprise maturity benchmarking across data, talent, infrastructure and deployment." },
];

const GEO_DOTS = [
  { id:"North America",  label:"North America",         cx:175, cy:148, accent:NS.blue       },
  { id:"Europe",         label:"Europe",                cx:455, cy:120, accent:ACCENT.steel   },
  { id:"Middle East",    label:"Middle East",           cx:537, cy:188, accent:ACCENT.amber   },
  { id:"Africa",         label:"Africa",                cx:462, cy:255, accent:ACCENT.rust    },
  { id:"South Asia",     label:"South Asia",            cx:600, cy:200, accent:ACCENT.plum    },
  { id:"Southeast Asia", label:"Southeast Asia",        cx:660, cy:242, accent:ACCENT.teal    },
  { id:"Asia",           label:"East & Central Asia",   cx:672, cy:152, accent:ACCENT.forest  },
  { id:"Global",         label:"Global / Multi-region", cx:320, cy:305, accent:NS.blue        },
];

// ─── Hooks ────────────────────────────────────────────────────────
function useFadeIn(t=0.07) {
  const ref = useRef(null);
  const [v, sv] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { sv(true); o.disconnect(); } }, { threshold:t });
    o.observe(el); return () => o.disconnect();
  }, []);
  return [ref, v];
}
function useLock(on) {
  useEffect(() => { document.body.style.overflow = on ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [on]);
}

// ─── Case Viewer ──────────────────────────────────────────────────
function CaseViewer({ item, accent, onClose }) {
  useLock(true);
  useEffect(() => { const h = e => e.key==="Escape"&&onClose(); window.addEventListener("keydown",h); return ()=>window.removeEventListener("keydown",h); }, [onClose]);
  const sector = SECTORS.find(s=>s.id===item.industry);
  const study  = STUDY_TYPES.find(s=>s.id===item.studyType);
  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()} style={{ position:"fixed",inset:0,zIndex:4000,background:"rgba(15,27,39,0.75)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24 }}>
      <div style={{ background:NS.surface,borderRadius:3,width:"100%",maxWidth:900,maxHeight:"92vh",display:"flex",flexDirection:"column",boxShadow:"0 40px 100px rgba(0,0,0,0.35)",animation:"rc-pop 0.2s ease both" }}>
        <div style={{ height:4,background:accent,borderRadius:"3px 3px 0 0",flexShrink:0 }} />
        <div style={{ padding:"20px 24px 16px",borderBottom:`1px solid ${NS.rule}`,flexShrink:0 }}>
          <div style={{ display:"flex",alignItems:"flex-start",gap:16,justifyContent:"space-between" }}>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex",gap:6,marginBottom:9,flexWrap:"wrap" }}>
                {study   && <span style={{ fontSize:10,fontWeight:700,letterSpacing:"0.11em",textTransform:"uppercase",color:accent,background:`${accent}14`,padding:"2px 7px",borderRadius:2 }}>{study.label}</span>}
                {sector  && <span style={{ fontSize:10,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:NS.muted,background:NS.paperDeep,padding:"2px 7px",borderRadius:2 }}>{sector.label}</span>}
                {item.primaryType && <span style={{ fontSize:10,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:NS.muted,background:NS.paperDeep,padding:"2px 7px",borderRadius:2 }}>{item.primaryType}</span>}
                {item.geo.slice(0,3).map(g=><span key={g} style={{ fontSize:10,fontWeight:500,color:NS.muted,background:NS.paperDeep,padding:"2px 7px",borderRadius:2 }}>{g}</span>)}
              </div>
              <h2 style={{ fontSize:"clamp(15px,1.8vw,19px)",fontWeight:700,color:NS.ink,lineHeight:1.35,letterSpacing:"-0.015em" }}>{item.title}</h2>
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

// ─── Items Popup — uneven masonry tile layout ─────────────────────
function ItemsPopup({ title, accent, items, onClose, onOpen }) {
  useLock(true);
  useEffect(() => { const h = e => e.key==="Escape"&&onClose(); window.addEventListener("keydown",h); return ()=>window.removeEventListener("keydown",h); }, [onClose]);

  // Distribute items into 2 columns, alternating tall/short to create uneven feel
  const col1 = items.filter((_,i)=>i%2===0);
  const col2 = items.filter((_,i)=>i%2===1);

  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()} style={{ position:"fixed",inset:0,zIndex:3000,background:"rgba(15,27,39,0.65)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24 }}>
      <div style={{ background:NS.surface,borderRadius:3,width:"100%",maxWidth:780,maxHeight:"90vh",display:"flex",flexDirection:"column",boxShadow:"0 32px 80px rgba(0,0,0,0.28)",animation:"rc-pop 0.2s ease both" }}>
        {/* Accent header bar */}
        <div style={{ height:4,background:accent,borderRadius:"3px 3px 0 0",flexShrink:0 }} />
        <div style={{ padding:"20px 24px 14px",borderBottom:`1px solid ${NS.rule}`,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <h3 style={{ fontSize:20,fontWeight:700,color:NS.ink,letterSpacing:"-0.02em" }}>{title}</h3>
          <button onClick={onClose} style={{ width:30,height:30,borderRadius:"50%",border:`1px solid ${NS.rule}`,background:NS.paper,cursor:"pointer",fontSize:14,color:NS.muted,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",flexShrink:0 }}>✕</button>
        </div>
        {/* Masonry-style 2-col grid — 1-col on narrow screens */}
        <div style={{ flex:1,overflowY:"auto",padding:"16px 18px 24px" }}>
          <div className="popup-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,alignItems:"start" }}>
            <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
              {col1.map((item,i)=><CaseTile key={i} item={item} accent={accent} tall={i%3===0} onOpen={onOpen} />)}
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:10,marginTop:28 }}>
              {col2.map((item,i)=><CaseTile key={i} item={item} accent={accent} tall={i%3===1} onOpen={onOpen} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CaseTile({ item, accent, tall, onOpen }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={()=>onOpen(item)}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        background: hov ? accent : NS.surface,
        border:`1.5px solid ${hov ? accent : NS.rule}`,
        borderRadius:3, padding: tall ? "22px 18px" : "16px 18px",
        cursor:"pointer", transition:"all 0.18s ease",
        transform: hov ? "translateY(-2px)" : "none",
        boxShadow: hov ? `0 8px 24px ${accent}22` : "none",
      }}
    >
      <div style={{ display:"flex",justifyContent:"space-between",gap:8,marginBottom:tall?8:5 }}>
        <p style={{ fontSize:13,fontWeight:700,color:hov?"#fff":NS.ink,lineHeight:1.35,flex:1,transition:"color 0.18s" }}>{item.title}</p>
        <span style={{ color:hov?"rgba(255,255,255,0.8)":accent,fontSize:15,flexShrink:0,transition:"color 0.18s" }}>↗</span>
      </div>
      {tall && <p style={{ fontSize:12,color:hov?"rgba(255,255,255,0.72)":NS.muted,lineHeight:1.5,marginBottom:10,transition:"color 0.18s" }}>{item.desc}</p>}
      <div style={{ display:"flex",gap:5,flexWrap:"wrap",marginTop:tall?0:6 }}>
        {item.primaryType && <span style={{ fontSize:10,padding:"1px 6px",borderRadius:2,background:hov?"rgba(255,255,255,0.18)":`${accent}12`,color:hov?"#fff":accent,fontWeight:700,letterSpacing:"0.06em",transition:"all 0.18s" }}>{item.primaryType}</span>}
        {item.geo.slice(0,2).map(g=><span key={g} style={{ fontSize:10,padding:"1px 6px",borderRadius:2,background:hov?"rgba(255,255,255,0.14)":NS.paperDeep,color:hov?"rgba(255,255,255,0.75)":NS.muted,transition:"all 0.18s" }}>{g}</span>)}
      </div>
    </div>
  );
}

// ─── HERO — exact match to main showcase style ────────────────────
function ResearchHero() {
  return (
    <div style={{ maxWidth:1160,margin:"0 auto",padding:"clamp(36px,6vw,72px) clamp(16px,4vw,44px) clamp(24px,4vw,40px)",borderBottom:`1px solid ${NS.rule}` }}>
      <div style={{ display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:24,flexWrap:"wrap" }}>
        <div style={{ maxWidth:720,minWidth:0 }}>
          <p style={{ fontSize:11,fontWeight:700,letterSpacing:"0.26em",textTransform:"uppercase",color:NS.red,marginBottom:20,display:"flex",alignItems:"center",gap:10 }}>
            <span style={{ display:"inline-block",width:22,height:1,background:NS.red,flexShrink:0 }} />
            Research Capabilities
          </p>
          <h1 style={{ fontWeight:700,fontSize:"clamp(36px,6.4vw,76px)",lineHeight:1.02,letterSpacing:"-0.025em",color:NS.ink,textWrap:"balance" }}>
            Deep research,{" "}
            <em style={{ fontStyle:"normal",color:NS.blue }}>across every sector.</em>
          </h1>
        </div>
        <p style={{ color:NS.inkSoft,fontSize:14,lineHeight:1.65,maxWidth:360,fontWeight:400,minWidth:0 }}>
          Pick a sector or methodology — every tile opens onto real work, filterable by geography and audience.
        </p>
      </div>
    </div>
  );
}

// ─── NAV — exact match to main showcase ──────────────────────────
function ResearchNav() {
  const [active, setActive] = useState("sectors");
  const IDS    = ["sectors","methodology","geography","expertise"];
  const LABELS = { sectors:"Sectors", methodology:"Methodology", geography:"Geography", expertise:"Expertise" };

  useEffect(() => {
    const obs = new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.id)});},{threshold:0.25});
    IDS.forEach(id=>{const el=document.getElementById(id);if(el)obs.observe(el)});
    return ()=>obs.disconnect();
  }, []);

  return (
    <div style={{ position:"sticky",top:0,zIndex:100,background:"rgba(245,241,234,0.95)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${NS.rule}`,display:"flex",alignItems:"center",height:52,padding:"0 clamp(16px,4vw,44px)" }}>
      <a href="/research" style={{ display:"flex",alignItems:"center",gap:9,textDecoration:"none",marginRight:"auto",minWidth:0,overflow:"hidden" }}>
        <img src={logoSrc} alt="Netscribes" style={{ height:19,objectFit:"contain",opacity:0.85,flexShrink:0 }} />
        <span style={{ fontSize:10,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:NS.muted,whiteSpace:"nowrap" }}> / Research</span>
      </a>
      <nav style={{ display:"flex",gap:1,flexShrink:0 }}>
        {IDS.map(id=>(
          <a key={id} href={`#${id}`} style={{ fontSize:11,fontWeight:active===id?700:400,color:active===id?NS.ink:NS.muted,textDecoration:"none",padding:"5px 9px",borderRadius:2,background:active===id?NS.surface:"transparent",border:active===id?`1px solid ${NS.rule}`:"1px solid transparent",transition:"all 0.15s",whiteSpace:"nowrap" }}>{LABELS[id]}</a>
        ))}
      </nav>
    </div>
  );
}

// ─── SECTION 01 — Sectors ─────────────────────────────────────────
// Full grid → compact strip + inline filtered view (matches main showcase pattern)
function SectorSection({ onOpen }) {
  const [ref, vis] = useFadeIn();
  const [active, setActive] = useState(null);

  const activeSector = active ? SECTORS.find(s => s.id === active) : null;

  return (
    <section id="sectors" ref={ref} style={{ opacity:vis?1:0, transform:vis?"none":"translateY(14px)", transition:"opacity 0.4s ease,transform 0.4s ease" }}>
      <div style={{ maxWidth:1160, margin:"0 auto", padding:"clamp(36px,5vw,64px) clamp(16px,4vw,44px) 0" }}>
        <p style={EYE(NS.blue)}>01 — Our Industries of Expertise</p>
        <h2 style={H2}>{active ? activeSector.label : "Sectors we know deeply"}</h2>
      </div>

      {/* ── Full hero grid (no selection) ── */}
      {!active && (
        <div style={{ maxWidth:1160, margin:"32px auto 0", padding:"0 clamp(16px,4vw,44px)", display:"grid", gridTemplateColumns:"repeat(2,1fr)", borderLeft:`1px solid ${NS.rule}`, borderRight:`1px solid ${NS.rule}` }} className="sectors-grid">
          {SECTORS.map((s,i) => (
            <SectorTile key={s.id} sector={s} index={i} total={SECTORS.length}
              onClick={() => setActive(s.id)} />
          ))}
        </div>
      )}

      {/* ── Compact strip + content (selection made) ── */}
      {active && (
        <div style={{ maxWidth:1160, margin:"20px auto 0", padding:"0 clamp(16px,4vw,44px)" }}>
          {/* Compact strip */}
          <div style={{ display:"grid", gridTemplateColumns:`repeat(${SECTORS.length},1fr)`, border:`1px solid ${NS.rule}`, background:NS.surface }} className="sector-strip">
            {SECTORS.map((s, i) => (
              <StripTab key={s.id} label={s.label} tag={s.tag} num={String(i+1).padStart(2,"0")}
                active={s.id===active} color={s.accent}
                borderRight={i < SECTORS.length-1}
                onClick={() => setActive(s.id)} />
            ))}
          </div>
          {/* Inline filtered view */}
          <InlineFilteredView
            accent={activeSector.accent}
            baseItems={RESEARCH_DATA.filter(d => d.industry === active)}
            pill2Label="Framework"
            pill2Options={STUDY_TYPES.map(s => ({ id:s.id, label:s.label }))}
            pill2Filter={(items, val) => items.filter(d => d.studyType === val)}
            onOpen={onOpen}
            dimLabel="Region"
          />
        </div>
      )}
    </section>
  );
}

function SectorTile({ sector, index, total, onClick }) {
  const [hov, setHov] = useState(false);
  const isRight  = index%2===1;
  const isBottom = index >= total-2;
  const spotlight = RESEARCH_DATA.find(d=>d.title===sector.spotlight);
  return (
    <button onClick={onClick}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        textAlign:"left",
        background: hov ? sector.accent : NS.surface,
        border:"none",
        borderRight: !isRight ? `1px solid ${NS.rule}` : "none",
        borderBottom: !isBottom ? `1px solid ${NS.rule}` : "none",
        padding:"clamp(24px,4vw,44px) clamp(20px,3vw,40px) clamp(20px,3vw,36px)",
        cursor:"pointer", position:"relative", overflow:"hidden",
        minHeight:"clamp(200px,30vw,280px)", display:"flex", flexDirection:"column", justifyContent:"space-between", gap:16,
        transition:"background 0.32s cubic-bezier(0.22,1,0.36,1)",
        fontFamily:"'DM Sans',sans-serif", width:"100%",
      }}
    >
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,flexWrap:"wrap" }}>
        <span style={{ fontSize:11,fontWeight:500,letterSpacing:"0.12em",color:hov?"rgba(255,255,255,0.65)":NS.muted,transition:"color 0.32s" }}>
          {String(index+1).padStart(2,"0")} / {String(SECTORS.length).padStart(2,"0")}
        </span>
        <span style={{ fontSize:10,fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:hov?"rgba(255,255,255,0.78)":sector.accent,padding:"4px 8px",border:`1px solid ${hov?"rgba(255,255,255,0.45)":sector.accent+"55"}`,transition:"color 0.32s,border-color 0.32s",whiteSpace:"nowrap" }}>{sector.tag}</span>
      </div>

      <div style={{ flex:1,display:"flex",flexDirection:"column",justifyContent:"flex-end",gap:10 }}>
        <h2 style={{ fontWeight:700,fontSize:"clamp(24px,3.5vw,52px)",letterSpacing:"-0.025em",lineHeight:0.98,color:hov?"#FFFFFF":NS.ink,transition:"color 0.32s",wordBreak:"break-word" }}>{sector.label}</h2>
        <p style={{ fontSize:"clamp(12px,1.4vw,14px)",color:hov?"rgba(255,255,255,0.82)":NS.inkSoft,lineHeight:1.5,transition:"color 0.32s" }}>{sector.blurb}</p>
      </div>

      {/* Spotlight case */}
      {spotlight && (
        <div style={{ borderTop:`1px solid ${hov?"rgba(255,255,255,0.22)":NS.ruleSoft}`,paddingTop:12,transition:"border-color 0.32s" }}>
          <p style={{ fontSize:9,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:hov?"rgba(255,255,255,0.45)":NS.muted,marginBottom:4 }}>Sample work</p>
          <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8 }}>
            <p style={{ fontSize:11,fontWeight:500,color:hov?"rgba(255,255,255,0.88)":NS.inkSoft,lineHeight:1.4,flex:1,transition:"color 0.32s",minWidth:0 }}>{spotlight.title.length>62?spotlight.title.slice(0,60)+"…":spotlight.title}</p>
            <span style={{ color:hov?"rgba(255,255,255,0.7)":sector.accent,fontSize:15,transform:hov?"translateX(3px)":"none",transition:"all 0.32s",flexShrink:0 }}>→</span>
          </div>
        </div>
      )}
    </button>
  );
}

// ─── Compact strip tab (used by all sections when a selection is active) ──
function StripTab({ label, tag, num, active, color, borderRight, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textAlign:"left", background: active ? color : (hov ? NS.paperDeep : NS.surface),
        border:"none", borderRight: borderRight ? `1px solid ${NS.rule}` : "none",
        padding:"14px 16px", cursor:"pointer",
        display:"flex", flexDirection:"column", gap:4,
        transition:"background 0.2s", fontFamily:"'DM Sans',sans-serif",
      }}>
      <span style={{ fontSize:9, fontWeight:500, letterSpacing:"0.1em", color: active?"rgba(255,255,255,0.65)":NS.muted }}>{num}</span>
      <span style={{ fontSize:13, fontWeight:700, letterSpacing:"-0.01em", lineHeight:1.1, color: active?"#fff":(hov?NS.ink:NS.inkSoft), whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:"100%" }}>{label}</span>
      {active && <span style={{ fontSize:8, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(255,255,255,0.65)" }}>{tag}</span>}
    </button>
  );
}
// ─── SECTION 02 — Methodology ─────────────────────────────────────
function MethodologySection({ onOpen }) {
  const [ref, vis] = useFadeIn();
  const [active, setActive] = useState(null);
  const activeST = active ? STUDY_TYPES.find(s => s.id === active) : null;

  return (
    <section id="methodology" ref={ref} style={{ background:NS.paperDeep, opacity:vis?1:0, transform:vis?"none":"translateY(14px)", transition:"opacity 0.4s ease,transform 0.4s ease" }}>
      <div style={{ maxWidth:1160, margin:"0 auto", padding:"clamp(36px,5vw,64px) clamp(16px,4vw,44px) 0" }}>
        <p style={EYE(ACCENT.teal)}>02 — Research Methodology</p>
        <h2 style={H2}>{active ? activeST.label : "Purpose-built frameworks"}</h2>
      </div>

      {!active && (
        <>
          <div style={{ maxWidth:1160, margin:"32px auto 0", padding:"0 clamp(16px,4vw,44px)", display:"grid", gridTemplateColumns:"repeat(5,1fr)", borderLeft:`1px solid ${NS.rule}`, borderRight:`1px solid ${NS.rule}` }} className="method-grid">
            {STUDY_TYPES.map((st,i) => (
              <MethodTile key={st.id} st={st} index={i} total={STUDY_TYPES.length} onClick={() => setActive(st.id)} />
            ))}
          </div>
          <div style={{ height:"clamp(36px,5vw,64px)" }} />
        </>
      )}

      {active && activeST && (
        <div style={{ maxWidth:1160, margin:"20px auto 0", padding:"0 clamp(16px,4vw,44px) clamp(36px,5vw,64px)" }}>
          <div style={{ display:"grid", gridTemplateColumns:`repeat(${STUDY_TYPES.length},1fr)`, border:`1px solid ${NS.rule}`, background:NS.surface }} className="method-strip">
            {STUDY_TYPES.map((st,i) => (
              <StripTab key={st.id} label={st.label} tag={st.tag} num={String(i+1).padStart(2,"0")}
                active={st.id===active} color={st.accent} borderRight={i < STUDY_TYPES.length-1}
                onClick={() => setActive(st.id)} />
            ))}
          </div>
          <InlineFilteredView
            accent={activeST.accent}
            baseItems={RESEARCH_DATA.filter(d => d.studyType === active)}
            pill2Label="Audience"
            pill2Options={[
              { id:"B2B", label:"B2B" },
              { id:"B2C", label:"B2C" },
              { id:"Dual", label:"Dual / Secondary" },
            ]}
            pill2Filter={(items, val) => {
              if (val==="B2B")  return items.filter(d=>d.primaryType==="B2B");
              if (val==="B2C")  return items.filter(d=>d.primaryType==="B2C");
              if (val==="Dual") return items.filter(d=>d.primaryType===null);
              return items;
            }}
            onOpen={onOpen}
            dimLabel="Region"
          />
        </div>
      )}
    </section>
  );
}

function MethodTile({ st, index, total, onClick }) {
  const [hov, setHov] = useState(false);
  const isLast = index===total-1;
  return (
    <button onClick={onClick}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{ textAlign:"left",background:hov?st.accent:NS.surface,border:"none",borderRight:!isLast?`1px solid ${NS.rule}`:"none",borderBottom:`1px solid ${NS.rule}`,padding:"clamp(20px,3vw,36px) clamp(16px,2vw,24px) clamp(18px,2.5vw,28px)",cursor:"pointer",minHeight:"clamp(180px,22vw,240px)",display:"flex",flexDirection:"column",justifyContent:"space-between",gap:12,transition:"background 0.28s cubic-bezier(0.22,1,0.36,1)",fontFamily:"'DM Sans',sans-serif",width:"100%" }}>
      <div>
        <div style={{ width:24,height:2,background:hov?"rgba(255,255,255,0.4)":st.accent,borderRadius:1,marginBottom:18,transition:"background 0.28s" }} />
        <span style={{ fontSize:10,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:hov?"rgba(255,255,255,0.7)":st.accent,display:"block",marginBottom:10,transition:"color 0.28s" }}>{st.tag}</span>
        <h3 style={{ fontSize:15,fontWeight:700,letterSpacing:"-0.01em",color:hov?"#fff":NS.ink,lineHeight:1.25,marginBottom:10,transition:"color 0.28s" }}>{st.label}</h3>
        <p style={{ fontSize:12,lineHeight:1.6,color:hov?"rgba(255,255,255,0.75)":NS.muted,transition:"color 0.28s" }}>{st.desc}</p>
      </div>
      <div style={{ borderTop:`1px solid ${hov?"rgba(255,255,255,0.2)":NS.ruleSoft}`,paddingTop:12,display:"flex",justifyContent:"flex-end",transition:"border-color 0.28s" }}>
        <span style={{ fontSize:16,color:hov?"rgba(255,255,255,0.8)":st.accent,transform:hov?"translateX(3px)":"none",transition:"all 0.28s" }}>→</span>
      </div>
    </button>
  );
}

// ─── Shared inline filtered view (used by Methodology + Expertise) ──
// Shows industry cards for a given base set, with filter pills for
// region and a second dimension (audience or framework type).
// Clicking an industry card opens the masonry popup.
function InlineFilteredView({ accent, baseItems, pill2Label, pill2Options, pill2Filter, onOpen, dimLabel, dimOptions, dimFilter }) {
  const [geo,  setGeo]  = useState(null);
  const [pill2, setPill2] = useState(null);

  // Apply filters
  let filtered = baseItems;
  if (geo)    filtered = filtered.filter(d => d.geo.includes(geo));
  if (pill2)  filtered = pill2Filter(filtered, pill2);

  // Build industry cards — only sectors that have matching cases, in SECTOR_ORDER
  const industryCards = SECTORS.filter(s =>
    filtered.some(d => d.industry === s.id)
  );

  const GEO_OPTIONS = [...new Set(baseItems.flatMap(d => d.geo))].filter(g => g !== "Global").sort();

  return (
    <div style={{ maxWidth:1160, margin:"0 auto", padding:"28px clamp(16px,4vw,44px) clamp(36px,5vw,64px)", animation:"rc-pop 0.22s ease both" }}>

      {/* Filter pills — 50/50 split */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:0, marginBottom:28, border:`1px solid ${NS.rule}`, borderTop:"none" }}>
        <div style={{ padding:"14px 18px", borderRight:`1px solid ${NS.rule}` }}>
          <span style={{ fontSize:9,fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:NS.muted,display:"block",marginBottom:8 }}>Region</span>
          <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
            <PillBtn label="All" active={!geo} color={accent} onClick={()=>setGeo(null)} />
            {GEO_OPTIONS.map(g => (
              <PillBtn key={g} label={g} active={geo===g} color={accent} onClick={()=>setGeo(geo===g?null:g)} />
            ))}
          </div>
        </div>
        <div style={{ padding:"14px 18px" }}>
          <span style={{ fontSize:9,fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:NS.muted,display:"block",marginBottom:8 }}>{pill2Label}</span>
          <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
            <PillBtn label="All" active={!pill2} color={accent} onClick={()=>setPill2(null)} />
            {pill2Options.map(o => (
              <PillBtn key={o.id} label={o.label} active={pill2===o.id} color={accent} onClick={()=>setPill2(pill2===o.id?null:o.id)} />
            ))}
          </div>
        </div>
      </div>

      {/* Industry cards grid */}
      {industryCards.length === 0 ? (
        <div style={{ padding:"48px 0",textAlign:"center",color:NS.muted,fontSize:14 }}>No work samples match these filters.</div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:12 }} className="industry-cards-grid">
          {industryCards.map(sector => {
            const sectorItems = filtered.filter(d => d.industry === sector.id);
            return (
              <IndustryCard
                key={sector.id}
                sector={sector}
                items={sectorItems}
                onOpen={() => onOpen(sector.label, sector.accent, sectorItems)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function PillBtn({ label, active, color, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{ fontSize:11,fontWeight:active?700:500,color:active?"#fff":(hov?color:NS.muted),background:active?color:(hov?`${color}10`:"transparent"),border:`1px solid ${active?color:(hov?color:NS.rule)}`,borderRadius:2,padding:"4px 11px",cursor:"pointer",transition:"all 0.15s",fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap" }}>
      {label}
    </button>
  );
}

function IndustryCard({ sector, items, onOpen }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onOpen}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{ textAlign:"left",background:hov?sector.accent:NS.surface,border:`1.5px solid ${hov?sector.accent:NS.rule}`,borderRadius:3,padding:0,cursor:"pointer",overflow:"hidden",transition:"all 0.22s ease",transform:hov?"translateY(-3px)":"none",boxShadow:hov?`0 10px 28px ${sector.accent}22`:"none",fontFamily:"'DM Sans',sans-serif",width:"100%",display:"flex",flexDirection:"column" }}>
      {/* Accent colour header band */}
      <div style={{ background:sector.accent, padding:"22px 20px 18px", transition:"background 0.22s", position:"relative" }}>
        <span style={{ fontSize:9,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,0.65)",display:"block",marginBottom:6 }}>{sector.tag}</span>
        <h3 style={{ fontSize:16,fontWeight:700,color:"#fff",letterSpacing:"-0.01em",lineHeight:1.2 }}>{sector.label}</h3>
        <span style={{ position:"absolute",top:16,right:16,fontSize:18,color:"rgba(255,255,255,0.7)" }}>↗</span>
      </div>
      {/* Body */}
      <div style={{ padding:"14px 20px 18px",flex:1 }}>
        <p style={{ fontSize:12,color:hov?"rgba(255,255,255,0.78)":NS.muted,lineHeight:1.55,transition:"color 0.22s" }}>{sector.blurb}</p>
      </div>
    </button>
  );
}

// ─── SECTION 03 — Geography (D3 + TopoJSON real world map) ───────
// Loads d3 and topojson from CDN, fetches world-atlas countries-110m,
// renders via Natural Earth projection into a dark SVG panel.
// Dot positions are derived from the projection itself — no manual cx/cy.

// Lat/lng centroids for each research region — Global excluded from map
const GEO_CENTROIDS = {
  "North America":  [-100,  45],
  "Europe":         [  15,  50],
  "Middle East":    [  45,  25],
  "Africa":         [  20,   5],
  "South Asia":     [  78,  22],
  "Southeast Asia": [ 108,  13],
  "Asia":           [ 105,  38],
};

function GeoSection({ onOpen }) {
  const [ref, vis] = useFadeIn();
  const [active, setActive] = useState(null);

  const allDots = GEO_DOTS.map(g => ({
    ...g,
    items: RESEARCH_DATA.filter(d => d.geo.includes(g.id)),
    coords: GEO_CENTROIDS[g.id] || null,
  })).filter(g => g.items.length > 0);

  const mapDots   = allDots.filter(g => g.coords !== null);
  const globalDot = allDots.find(g => g.id === "Global");
  const activeDot = active ? allDots.find(g => g.id === active) : null;

  const handleDotClick = (g) => setActive(g.id);

  return (
    <section id="geography" ref={ref} style={{ opacity:vis?1:0, transform:vis?"none":"translateY(14px)", transition:"opacity 0.4s ease,transform 0.4s ease" }}>
      <div style={{ maxWidth:1160, margin:"0 auto", padding:"clamp(36px,5vw,64px) clamp(16px,4vw,44px) 0" }}>
        <p style={EYE(ACCENT.teal)}>03 — Global Reach</p>
        <h2 style={H2}>{active ? (activeDot?.label || "Region") : "Research across every major region"}</h2>
      </div>

      {/* Map always visible */}
      <div style={{ maxWidth:1160, margin:"20px auto 0", padding:"0 clamp(16px,4vw,44px)" }}>
        <D3WorldMap dots={mapDots} activeDot={active} onDotClick={handleDotClick} />
      </div>

      {/* No selection: show chip row */}
      {!active && (
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"12px clamp(16px,4vw,44px) clamp(36px,5vw,64px)" }}>
          <div style={{ display:"flex", alignItems:"center", flexWrap:"wrap", gap:7 }}>
            {mapDots.map(g => (
              <button key={g.id} onClick={() => setActive(g.id)}
                onMouseEnter={e => { e.currentTarget.style.borderColor=g.accent; e.currentTarget.style.color=g.accent; e.currentTarget.style.background=`${g.accent}0d`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=NS.rule; e.currentTarget.style.color=NS.inkSoft; e.currentTarget.style.background=NS.surface; }}
                style={{ fontSize:12,fontWeight:500,color:NS.inkSoft,background:NS.surface,border:`1px solid ${NS.rule}`,borderRadius:2,padding:"5px 11px",cursor:"pointer",transition:"all 0.15s",fontFamily:"'DM Sans',sans-serif" }}>
                {g.label}
              </button>
            ))}
            {globalDot && <span style={{ width:1,height:20,background:NS.rule,display:"inline-block",margin:"0 4px" }} />}
            {globalDot && <GlobalChip dot={globalDot} onOpen={(label,accent,items)=>setActive("Global")} />}
          </div>
        </div>
      )}

      {/* Selection: compact strip + inline view */}
      {active && activeDot && (
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"12px clamp(16px,4vw,44px) clamp(36px,5vw,64px)" }}>
          {/* Strip with all regions */}
          <div style={{ display:"grid", gridTemplateColumns:`repeat(${allDots.length},1fr)`, border:`1px solid ${NS.rule}`, background:NS.surface, marginBottom:0 }} className="geo-strip">
            {allDots.map((g,i) => (
              <StripTab key={g.id} label={g.label} tag="" num={String(i+1).padStart(2,"0")}
                active={g.id===active} color={g.accent} borderRight={i < allDots.length-1}
                onClick={() => setActive(g.id)} />
            ))}
          </div>
          {/* Industry cards for this region */}
          <InlineFilteredView
            accent={activeDot.accent}
            baseItems={activeDot.items}
            pill2Label="Framework"
            pill2Options={STUDY_TYPES.map(s=>({ id:s.id, label:s.label }))}
            pill2Filter={(items, val) => items.filter(d => d.studyType === val)}
            onOpen={onOpen}
            dimLabel="Audience"
            dimOptions={[
              { id:"B2B", label:"B2B" },
              { id:"B2C", label:"B2C" },
              { id:"Dual", label:"Dual / Secondary" },
            ]}
            dimFilter={(items, val) => {
              if (val==="B2B")  return items.filter(d=>d.primaryType==="B2B");
              if (val==="B2C")  return items.filter(d=>d.primaryType==="B2C");
              if (val==="Dual") return items.filter(d=>d.primaryType===null);
              return items;
            }}
          />
        </div>
      )}
    </section>
  );
}

function GlobalChip({ dot, onOpen }) {
  const [hov, setHov] = useState(false);
  const col = dot.accent || NS.blue;
  return (
    <button
      onClick={() => onOpen(dot.label, col, dot.items)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:"inline-flex", alignItems:"center", gap:7,
        fontSize:12, fontWeight:600,
        color: hov ? NS.surface : col,
        background: hov ? col : `${col}0f`,
        border:`1px solid ${hov ? col : `${col}30`}`,
        borderRadius:2, padding:"5px 13px",
        cursor:"pointer", transition:"all 0.18s",
        fontFamily:"'DM Sans',sans-serif",
      }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink:0 }}>
        <circle cx="6" cy="6" r="5" stroke={hov ? NS.surface : col} strokeWidth="1.1"/>
        <path d="M6 1 C4 3 4 9 6 11 M6 1 C8 3 8 9 6 11" stroke={hov ? NS.surface : col} strokeWidth="1.1" fill="none"/>
        <line x1="1" y1="6" x2="11" y2="6" stroke={hov ? NS.surface : col} strokeWidth="1.1"/>
      </svg>
      Global / Multi-region
    </button>
  );
}

// Loads D3 + TopoJSON from CDN, draws a real Natural Earth projection
function D3WorldMap({ dots, activeDot, onDotClick }) {
  const svgRef  = useRef(null);
  const [ready, setReady]   = useState(false);   // libs loaded
  const [paths, setPaths]   = useState([]);       // country path strings
  const [dotPos, setDotPos] = useState([]);       // projected {id,x,y,dot} for each region
  const [hov,   setHov]     = useState(null);
  const [tip,   setTip]     = useState(null);
  const W = 960, H = 480;

  // Step 1: inject CDN scripts once
  useEffect(() => {
    const load = (src) => new Promise((res, rej) => {
      if (document.querySelector(`script[src="${src}"]`)) { res(); return; }
      const s = document.createElement("script");
      s.src = src; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });

    Promise.all([
      load("https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js"),
      load("https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js"),
    ]).then(() => setReady(true)).catch(console.error);
  }, []);

  // Step 2: once libs ready, fetch world data and build paths + dot positions
  useEffect(() => {
    if (!ready) return;
    const d3  = window.d3;
    const topo = window.topojson;

    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then(r => r.json())
      .then(world => {
        // Natural Earth projection fitted to W×H
        const projection = d3.geoNaturalEarth1()
          .scale(W / (2 * Math.PI) * 1.25)
          .translate([W / 2, H / 2]);

        const pathGen = d3.geoPath().projection(projection);

        // All country features → SVG path strings
        const countries = topo.feature(world, world.objects.countries);
        const ps = countries.features.map((f, i) => ({
          id: i,
          d: pathGen(f),
        })).filter(p => p.d);

        setPaths(ps);

        // Project each dot's lat/lng → SVG pixel coordinates
        const dp = dots.map(dot => {
          const [lng, lat] = dot.coords;
          const [x, y] = projection([lng, lat]) || [0, 0];
          return { ...dot, x, y };
        });
        setDotPos(dp);
      })
      .catch(console.error);
  }, [ready, dots]);

  return (
    <div style={{ background:NS.paper, borderRadius:3, overflow:"hidden", position:"relative", border:`1px solid ${NS.rule}`, backgroundImage:"url(/world-dots.jpg)", backgroundSize:"cover", backgroundPosition:"center" }}>
      {!ready && (
        <div style={{ height:480, display:"flex", alignItems:"center", justifyContent:"center", background:NS.paper }}>
          <span style={{ color:NS.muted, fontSize:13, fontFamily:"'DM Sans',sans-serif" }}>Loading map…</span>
        </div>
      )}
      {ready && (
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`}
          style={{ width:"100%", height:"auto", display:"block" }}
          onMouseLeave={() => { setHov(null); setTip(null); }}>

          {/* Ocean — transparent so dotted image shows through */}
          <rect width={W} height={H} fill="rgba(245,241,234,0.08)" />

          {/* Graticule — subtle lat/lng grid lines */}
          {paths.length > 0 && (() => {
            const d3 = window.d3;
            const topo = window.topojson;
            const projection = d3.geoNaturalEarth1()
              .scale(W / (2 * Math.PI) * 1.25)
              .translate([W / 2, H / 2]);
            const pathGen = d3.geoPath().projection(projection);
            const graticule = d3.geoGraticule()();
            return <path d={pathGen(graticule)} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />;
          })()}

          {/* Country fills — semi-transparent over dotted image */}
          {paths.map(p => (
            <path key={p.id} d={p.d} fill="rgba(237,231,219,0.55)" stroke="rgba(0,0,0,0.12)" strokeWidth="0.5" />
          ))}

          {/* Region dots — accent colours, continuous pulse on all, faster on hover */}
          {dotPos.map(g => {
            const ih  = hov === g.id;
            const col = g.accent || NS.blue;
            return (
              <g key={g.id} style={{ cursor:"pointer" }}
                onMouseEnter={() => { setHov(g.id); setTip({ id:g.id, x:g.x, y:g.y }); }}
                onMouseLeave={() => { setHov(null); setTip(null); }}
                onClick={() => onDotClick(g)}>
                {/* Continuous pulse ring — always animating, faster on hover */}
                <circle cx={g.x} cy={g.y} r={ih?10:7} fill="none" stroke={col} strokeWidth="1">
                  <animate attributeName="r"       values={ih?"10;28":"7;20"} dur={ih?"1.1s":"2.8s"} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.55;0"            dur={ih?"1.1s":"2.8s"} repeatCount="indefinite" />
                </circle>
                {/* Outer ring */}
                <circle cx={g.x} cy={g.y} r={ih?10:7} fill="none" stroke={col} strokeWidth={ih?2:1.5} />
                {/* Inner fill */}
                <circle cx={g.x} cy={g.y} r={ih?5:3.5} fill={col} />
              </g>
            );
          })}

          {/* Tooltip — SVG native, never clips off edge */}
          {tip && (() => {
            const g = dotPos.find(d => d.id === tip.id);
            if (!g) return null;
            const col = g.accent || NS.blue;
            const TW = 160, TH = 38;
            const tx = Math.min(g.x + 14, W - TW - 4);
            const ty = Math.max(g.y - TH - 6, 4);
            return (
              <g style={{ pointerEvents:"none" }}>
                <rect x={tx} y={ty} width={TW} height={TH} rx="2" fill={col} />
                <text x={tx + 9} y={ty + 14} fontSize="10" fontWeight="700" fill="#fff" fontFamily="'DM Sans',sans-serif">{g.label}</text>
                <text x={tx + 9} y={ty + 28} fontSize="9" fill="rgba(255,255,255,0.65)" fontFamily="'DM Sans',sans-serif">Click to explore work</text>
              </g>
            );
          })()}
        </svg>
      )}
    </div>
  );
}

// ─── SECTION 04 — Expertise ───────────────────────────────────────
function ExpertiseSection({ onOpen }) {
  const [ref, vis] = useFadeIn();
  const [active, setActive] = useState(null); // "B2B" | "B2C" | "Dual"

  const EXPERTISE_CARDS = [
    { id:"B2B",  label:"B2B Research",         tag:"Decision-maker intelligence", accent:NS.blue,       desc:"Executive interviews, expert panels, win/loss studies, buyer journey research and industrial surveys — reaching CxOs, procurement leaders and technical decision-makers across 40+ markets.", featured:["Engagement Perception for an International Bank","AI Ethics and Transparency Impact Assessment","GTM Strategy for a Cloud-Based Cybersecurity Startup"] },
    { id:"B2C",  label:"B2C & Consumer Research", tag:"Consumer depth",           accent:ACCENT.plum,   desc:"Consumer surveys, ethnographic studies, focus groups, diary studies and online communities — with deep panel access across retail, FMCG, lifestyle and financial services segments.", featured:["Online Shopping Patterns for Women's Apparel in the United States","Consumer Insights & Trend Mapping: Women's Adult Beverages","Home Fitness Brand Performance Assessment"] },
    { id:"Dual", label:"Dual B2B / B2C",       tag:"Mixed audience research",     accent:ACCENT.forest, desc:"Complex programmes combining stakeholder and end-consumer perspectives — capturing the full market picture from manufacturer to final user across diverse geographies.", featured:["Brand Health & Competitive Benchmarking Study for a Health Insurance Company","Concept Testing: Cider Category Innovation Pipeline"] },
  ];

  const activeCard = active ? EXPERTISE_CARDS.find(c => c.id === active) : null;

  const baseItems = active === "B2B"  ? RESEARCH_DATA.filter(d=>d.primaryType==="B2B")
                  : active === "B2C"  ? RESEARCH_DATA.filter(d=>d.primaryType==="B2C")
                  : active === "Dual" ? RESEARCH_DATA.filter(d=>d.primaryType===null)
                  : [];

  return (
    <section id="expertise" ref={ref} style={{ opacity:vis?1:0, transform:vis?"none":"translateY(14px)", transition:"opacity 0.4s ease,transform 0.4s ease" }}>
      <div style={{ maxWidth:1160,margin:"0 auto",padding:"clamp(36px,5vw,64px) clamp(16px,4vw,44px) 0" }}>
        <p style={EYE(ACCENT.forest)}>04 — Research Expertise</p>
        <h2 style={H2}>{active ? activeCard.label : "How we engage respondents"}</h2>
      </div>

      {/* ── Tile grid ── */}
      {!active && (
        <>
          <div style={{ maxWidth:1160,margin:"32px auto 0",padding:"0 clamp(16px,4vw,44px)",display:"grid",gridTemplateColumns:"repeat(3,1fr)",borderLeft:`1px solid ${NS.rule}`,borderRight:`1px solid ${NS.rule}` }} className="expertise-grid">
            {EXPERTISE_CARDS.map((c,i)=>(
              <ExpertiseTile key={c.id} card={c} isLast={i===EXPERTISE_CARDS.length-1}
                onClick={()=>setActive(c.id)} />
            ))}
          </div>
          <div style={{ height:"clamp(36px,5vw,64px)" }} />
        </>
      )}

      {active && activeCard && (
        <div style={{ maxWidth:1160, margin:"20px auto 0", padding:"0 clamp(16px,4vw,44px) clamp(36px,5vw,64px)" }}>
          <div style={{ display:"grid", gridTemplateColumns:`repeat(${EXPERTISE_CARDS.length},1fr)`, border:`1px solid ${NS.rule}`, background:NS.surface }} className="expertise-strip">
            {EXPERTISE_CARDS.map((c,i) => (
              <StripTab key={c.id} label={c.label} tag={c.tag} num={String(i+1).padStart(2,"0")}
                active={c.id===active} color={c.accent} borderRight={i < EXPERTISE_CARDS.length-1}
                onClick={() => setActive(c.id)} />
            ))}
          </div>
          <InlineFilteredView
            accent={activeCard.accent}
            baseItems={baseItems}
            pill2Label="Framework"
            pill2Options={STUDY_TYPES.map(s=>({ id:s.id, label:s.label }))}
            pill2Filter={(items, val) => items.filter(d => d.studyType === val)}
            onOpen={onOpen}
            dimLabel="Region"
          />
        </div>
      )}
    </section>
  );
}

function ExpertiseTile({ card, isLast, onClick }) {
  const [hov,setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{ textAlign:"left",background:hov?card.accent:NS.surface,border:"none",borderRight:!isLast?`1px solid ${NS.rule}`:"none",borderBottom:`1px solid ${NS.rule}`,padding:"clamp(24px,4vw,44px) clamp(18px,3vw,36px) clamp(20px,3vw,36px)",cursor:"pointer",minHeight:"clamp(260px,30vw,340px)",display:"flex",flexDirection:"column",gap:0,transition:"background 0.32s cubic-bezier(0.22,1,0.36,1)",fontFamily:"'DM Sans',sans-serif",width:"100%" }}>
      <div style={{ width:hov?"100%":"28px",height:2,background:hov?"rgba(255,255,255,0.35)":card.accent,borderRadius:1,marginBottom:20,transition:"width 0.35s ease,background 0.32s" }} />
      <span style={{ fontSize:10,fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:hov?"rgba(255,255,255,0.65)":card.accent,marginBottom:10,display:"block",transition:"color 0.32s" }}>{card.tag}</span>
      <h3 style={{ fontSize:22,fontWeight:700,letterSpacing:"-0.02em",color:hov?"#fff":NS.ink,lineHeight:1.15,marginBottom:12,transition:"color 0.32s" }}>{card.label}</h3>
      <p style={{ fontSize:13,color:hov?"rgba(255,255,255,0.78)":NS.muted,lineHeight:1.65,marginBottom:20,flex:1,transition:"color 0.32s" }}>{card.desc}</p>
      <div style={{ borderTop:`1px solid ${hov?"rgba(255,255,255,0.2)":NS.ruleSoft}`,paddingTop:14,marginTop:"auto",transition:"border-color 0.32s" }}>
        <p style={{ fontSize:9,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:hov?"rgba(255,255,255,0.45)":NS.muted,marginBottom:9 }}>Featured work</p>
        {card.featured.map((t,i)=>(
          <div key={i} style={{ display:"flex",gap:7,alignItems:"flex-start",marginBottom:5 }}>
            <span style={{ color:hov?"rgba(255,255,255,0.5)":card.accent,fontSize:11,flexShrink:0,marginTop:1,transition:"color 0.32s" }}>—</span>
            <span style={{ fontSize:12,color:hov?"rgba(255,255,255,0.82)":NS.inkSoft,lineHeight:1.4,transition:"color 0.32s" }}>{t}</span>
          </div>
        ))}
      </div>
    </button>
  );
}

// ─── Shared ───────────────────────────────────────────────────────
const H2  = { fontSize:"clamp(28px,3.2vw,40px)",fontWeight:700,color:NS.ink,letterSpacing:"-0.025em",lineHeight:1.05,marginBottom:0 };
const EYE = c => ({ fontSize:11,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:c,marginBottom:10,display:"block" });

// ─── Root ─────────────────────────────────────────────────────────
export default function Research() {
  const [popup,  setPopup]  = useState(null);
  const [viewer, setViewer] = useState(null);

  const openPopup  = (title,accent,items) => setPopup({title,accent,items});
  const closePopup = () => setPopup(null);
  const openViewer = item  => setViewer(item);
  const closeViewer = ()  => setViewer(null);

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
        @keyframes rc-pop { from{opacity:0;transform:scale(0.97) translateY(10px);}to{opacity:1;transform:none;} }

        /* ── Mobile breakpoints ── */
        @media (max-width: 700px) {
          .sectors-grid   { grid-template-columns: 1fr !important; }
          .method-grid    { grid-template-columns: 1fr 1fr !important; }
          .expertise-grid { grid-template-columns: 1fr !important; }
          .popup-grid     { grid-template-columns: 1fr !important; }
          /* Reset offset on single-col masonry */
          .popup-grid > div:last-child { margin-top: 0 !important; }
          /* Sector right border gone when 1-col */
          .sectors-grid   button { border-right: none !important; }
          .expertise-grid button { border-right: none !important; }
        }
        @media (max-width: 480px) {
          .method-grid    { grid-template-columns: 1fr !important; }
          .method-grid    button { border-right: none !important; }
        }
        /* Strip overflow on mobile */
        .sector-strip, .method-strip, .expertise-strip, .geo-strip { overflow-x: auto; }
        .sector-strip button, .method-strip button, .expertise-strip button, .geo-strip button { min-width: 80px; }
      `}</style>

      <div style={{ background:NS.paper,minHeight:"100vh" }}>
        <ResearchNav />
        <ResearchHero />
        <SectorSection      onOpen={openPopup} />
        <MethodologySection onOpen={openPopup} />
        <GeoSection         onOpen={openPopup} />
        <ExpertiseSection   onOpen={openPopup} />
        <footer style={{ borderTop:`1px solid ${NS.rule}`,maxWidth:1160,margin:"0 auto",padding:"22px clamp(20px,4vw,44px) 40px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10 }}>
          <img src={logoSrc} alt="Netscribes" style={{ height:17,opacity:0.55 }} />
          <span style={{ fontSize:11,color:NS.muted,letterSpacing:"0.12em",textTransform:"uppercase" }}>Research Capabilities</span>
        </footer>
      </div>

      {popup&&!viewer&&(
        <ItemsPopup title={popup.title} accent={popup.accent} items={popup.items} onClose={closePopup} onOpen={openViewer} />
      )}
      {viewer&&(
        <CaseViewer item={viewer} accent={popup?.accent||NS.blue} onClose={closeViewer} />
      )}
    </>
  );
}
