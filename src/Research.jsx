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
  { title:"Market Assessment – Natural & Organic Hair Care Category Growth", desc:"Category-level market assessment identifying growth opportunity pockets within the natural and organic hair care segment.", industry:"retail", studyType:"Industry Analysis", geo:["Southeast Asia"], primaryType:"Both", ...driveFile("1tFNxKAhP8dNrR6gCK5GYu7WCp-4AdgZp") },
  { title:"Market Assessment of Key Business Practices in Healthcare", desc:"Analysis of market structure and prevailing business practices across key healthcare subsectors.", industry:"health", studyType:"Industry Analysis", geo:["North America","Europe","South Asia"], primaryType:"B2B", ...driveFile("1regWEZQBYVVgIOGRMl33vmYzQFnvk2pE") },
  { title:"Growth Opportunities in the Cleanroom Disposable PPE Market", desc:"Market sizing and opportunity analysis for cleanroom-grade disposable PPE across pharmaceutical, semiconductor, and biotech verticals.", industry:"health", studyType:"Industry Analysis", geo:["Europe"], primaryType:"Both", ...driveFile("101AzajvFhcFnRL2Ha2noDp7UJnUDQl3y") },
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
  { title:"GTM & Market Potential for Flavoured Milk and Convergence Drinks", desc:"GTM study sizing market potential and identifying positioning opportunities for flavoured milk and convergence drink categories.", industry:"fnb", studyType:"GTM", geo:["Europe","North America"], primaryType:"Both", ...driveFile("1dTowHuT15m6NhJOxniB5yHxastVd4MRL") },
  { title:"Concept Testing: Cider Category Innovation Pipeline", desc:"GTM concept testing identifying three winning flavour territories to fuel a cider brand's innovation pipeline.", industry:"fnb", studyType:"GTM", geo:["Europe","Asia","North America","Africa"], primaryType:"B2C", ...driveFile("1suEViXrD19MVg8qJXmWo-XbYuhkEM-hJ") },
  { title:"Concept Testing: Product Innovation for a QSR Chain", desc:"GTM concept validation delivering product innovation recommendations for a quick service restaurant chain.", industry:"fnb", studyType:"GTM", geo:["Europe"], primaryType:"Both", ...driveFile("1IM-SYWOE58legIiTah0m9CUby18X7B8f") },
  { title:"Concept Testing & Opportunity Assessment: Health Food Supplement Dispenser", desc:"GTM study evaluating concept appeal and market opportunity for a health food supplement and dispenser innovation.", industry:"fnb", studyType:"GTM", geo:["North America","Europe"], primaryType:"B2B", ...driveFile("1oHPqdb2m6C-9WkuvvIgaRUEbqYz4Yri7") },
  { title:"Go-to-Market Strategy for a Company Using AI to Revolutionise Drug Development", desc:"GTM strategy for an AI-powered drug development platform — target market identification, partnership model, and competitive differentiation.", industry:"health", studyType:"GTM", geo:["Middle East"], primaryType:"B2B", ...driveFile("1yxjFqhdT3dqx7ov-DN0GsRX3D1o0uNXp") },
  { title:"Go-to-Market Study for iPSC Stem Cell Therapies", desc:"GTM concept validation and market readiness study for induced pluripotent stem cell therapy products.", industry:"health", studyType:"GTM", geo:["Middle East"], primaryType:"B2B", ...driveFile("15mnFz9OQofDnNnDk7HzHEt57lFYvcNfm") },
  { title:"Enterprise Connectivity Service Delivery Process for Indian SMEs", desc:"Competitors' benchmarking study analyzing end-to-end service delivery workflows to pinpoint timeline delays and optimize B2B telecom process efficiency.", industry:"telecom", studyType:"Competitive Benchmarking", geo:["South Asia"], primaryType:"B2B", ...driveFile("1S0d_-frzWrQJJ3pZ2ub8OSiYfkUGlq6I") },
  { title:"Airline Loyalty Programs & Co-branded Credit Cards Benchmarking", desc:"Competitive benchmarking of airline co-branded credit card programmes — rewards architecture, partner economics, and cardholder acquisition strategies.", industry:"bfsi", studyType:"Competitive Benchmarking", geo:["North America"], primaryType:null, ...driveFile("1VQHt0UZy5Q2FLhNmShUtLmIV_Ek3gswW") },
  { title:"Comparative Review of Cashback Credit Cards in the US", desc:"Side-by-side competitive analysis of leading cashback credit card products in the US market — earn rates, redemption mechanics, and fee structures.", industry:"bfsi", studyType:"Competitive Benchmarking", geo:["North America"], primaryType:null, ...driveFile("1CEqhA2kNvql4_x0fDqn6_7eHp5ABic7d") },
  { title:"Brand Health & Competitive Benchmarking Study for a Health Insurance Company", desc:"Brand equity and competitive positioning benchmarking for a health insurance provider — awareness, NPS, and share-of-wallet analysis.", industry:"bfsi", studyType:"Competitive Benchmarking", geo:["North America","Europe","Asia","Middle East","Africa"], primaryType:"Both", ...driveFile("1bZQrQZUvjyOywOhzRs6X9ET-y5jGTHU3") },
  { title:"Pricing Analysis for a Cloud-Based SCM Provider", desc:"Competitive pricing intelligence study for a cloud-based supply chain management provider — tier structures, discounting patterns, and value metric benchmarks.", industry:"tech", studyType:"Competitive Benchmarking", geo:["Global"], primaryType:"B2B", ...driveFile("19XFI2m0RxC4wJxviP17jRpj_LHdCHu8X") },
  { title:"Account Intelligence Sample Report – Level 1: Netflix", desc:"Level 1 account intelligence profile for Netflix — firmographic overview, strategic priorities, and key buying signals for sales engagement.", industry:"tech", studyType:"Sales Enablement", geo:["North America"], primaryType:null, ...driveFile("1C82FObYTfQFAtKJMayW8FOspiTttbGBI") },
  { title:"Account Intelligence Sample Report – Level 2: Home Depot", desc:"Level 2 account intelligence report for Home Depot — organisational mapping, technology landscape, and procurement signals.", industry:"tech", studyType:"Sales Enablement", geo:["North America"], primaryType:null, ...driveFile("1imHUtJa8JXcGgUqXPCv8q0FshFmcZqR2") },
  { title:"Account Intelligence Sample Report – Level 3: Tesco", desc:"Level 3 account intelligence report for Tesco — deep-dive competitive positioning, initiative tracking, and stakeholder mapping.", industry:"tech", studyType:"Sales Enablement", geo:["Europe"], primaryType:null, ...driveFile("1YH67vPO9frOLkqFDYzBoyYNQIw-D0bDu") },
  { title:"Account Intelligence Sample Report – Level 4: DuPont", desc:"Level 4 account intelligence report for DuPont — comprehensive strategic intelligence covering M&A signals, innovation pipeline, and executive priorities.", industry:"tech", studyType:"Sales Enablement", geo:["North America"], primaryType:null, ...driveFile("1LVtwTga9Z8ZWoMn8vzx9epB09jk3aCU1") },
  { title:"Scalable Data Augmentation through Synthetic Record Generation", desc:"A detailed case study on how Netscribes transformed a 50-record survey into a 500-record, ML-ready synthetic dataset in under two weeks.", industry:"tech", studyType:"Synthetic Data", geo:["Global"], primaryType:"B2B", ...driveFile("1uSBvuSAJ3w0zSVowREbkzCZPRttVuFw2") },
  { title:"Brand & Product Performance Tracking Study for Cleaning Wipes", desc:"Ongoing competitive benchmarking of brand health and product performance metrics for a cleaning wipes brand across retail channels.", industry:"retail", studyType:"Competitive Benchmarking", geo:["North America"], primaryType:"B2C", ...driveFile("1a_RNWEMmh-BMaSQAfBipJlVOreO52Ajs") },
  { title:"Competitive Landscape Analysis for Juice Market", desc:"Competitive intelligence study mapping the juice market landscape — key players, share dynamics, innovation trends, and positioning white spaces.", industry:"fnb", studyType:"Competitive Benchmarking", geo:["Middle East","Africa"], primaryType:"B2B", ...driveFile("1LZ9NgNpvyJ-VKqJAgALbZUK5AD9ADwI7") },
  { title:"Middle East Portable Air Compressor and Hand-held Tool Market", desc:"Competitive intelligence on the Middle East market for portable air compressors and handheld power tools — rival capabilities and channel strategies.", industry:"mfg", studyType:"Competitive Benchmarking", geo:["Middle East"], primaryType:"B2B", ...driveFile("1-uxzXR3sRlI3sFlnvTeX2mWHRDRA0nvn") },
  { title:"Consumer Payments Trend Analysis & Declining Retail Credit Card Relevance", desc:"Consumer research study on shifting payment preferences and the declining relevance of retail credit cards among digitally-native consumers.", industry:"bfsi", studyType:"Consumer Research", geo:["North America"], primaryType:"B2C", ...driveFile("1I8YddJ9L5MH2H06H3kqHiFyqVWHAX_wr") },
  { title:"Engagement Perception for an International Bank", desc:"Primary research study measuring customer engagement perceptions, satisfaction drivers, and loyalty indicators for an international retail bank.", industry:"bfsi", studyType:"Consumer Research", geo:["North America","Europe","Middle East","Asia"], primaryType:"B2B", ...driveFile("1ev3tJR6XmJ6DH3UuXBYZUQyZ-ScIdHHn") },
  { title:"Customer Insights for 3D Printing Business", desc:"Consumer and B2B buyer research for a 3D printing company — use case discovery, willingness-to-pay, and purchase decision mapping.", industry:"tech", studyType:"Consumer Research", geo:["North America","Europe","Asia"], primaryType:"B2B", ...driveFile("1UVXsMr4jX7QLEAPrQ-kwpYR8IUPqrVER") },
  { title:"Home Fitness Brand Performance Assessment", desc:"Consumer research assessing brand health, product satisfaction, and category engagement for a home fitness brand post-pandemic.", industry:"retail", studyType:"Consumer Research", geo:["Europe"], primaryType:"B2C", ...driveFile("146-JQwHnYONXWyug_4TWuwZ6Wj2CHHEt") },
  { title:"Brand Track & Product Evaluation – Improved Product Satisfaction After Redesign", desc:"Brand tracking study documenting measurable improvements in consumer product satisfaction following a packaging and formula redesign.", industry:"retail", studyType:"Consumer Research", geo:["South Asia","Southeast Asia"], primaryType:"B2C", ...driveFile("1JYPFSSrSn7KFEoPhMPV1tJogEhoRqZOu") },
  { title:"Consumer Perception, Product Test & Campaign Feedback for Skincare Products", desc:"Integrated consumer research combining perception testing, in-home product trials, and campaign feedback for a skincare portfolio.", industry:"retail", studyType:"Consumer Research", geo:["South Asia"], primaryType:"B2C", ...driveFile("1SUsoqLcnfnVbAtdK1rNQXXNe0eMAa0LV") },
  { title:"Brand and Consumer Perception Analysis for AC", desc:"Consumer perception and brand health study for an air conditioner brand — awareness, consideration, and attribute-level satisfaction mapping.", industry:"retail", studyType:"Consumer Research", geo:["North America","Asia","Middle East"], primaryType:"Both", ...driveFile("1g9ab50htfS1gruMp0ZWHIJh2fTfjXDPM") },
  { title:"Premium Perception & High-End Customer Satisfaction for a Premium Apparel Brand", desc:"Luxury consumer research study exploring premium brand perception and satisfaction drivers for a high-end apparel label.", industry:"retail", studyType:"Consumer Research", geo:["Middle East"], primaryType:"B2C", ...driveFile("1eAeN76WhH-8c6mI4HThCjn-ebCqKHHuJ") },
  { title:"Online Shopping Patterns for Women's Apparel in the United States", desc:"Consumer behaviour research on women's apparel online shopping — discovery paths, brand switching, and purchase frequency patterns in the US.", industry:"retail", studyType:"Consumer Research", geo:["North America"], primaryType:"B2C", ...driveFile("1JZ0dVtxQriQHIQ6lcKsIO8KHwEhdt_Kh") },
  { title:"Consumer Behavior Analysis for an E-Commerce Company", desc:"Shopper behaviour research for an e-commerce platform — basket composition, session patterns, and churn risk indicators.", industry:"retail", studyType:"Consumer Research", geo:["South Asia"], primaryType:"B2C", ...driveFile("1xruBD853cPSImWzfEowVhkW5pxZGI--l") },
  { title:"User & Attitude Study for a Major Apparel Retailer", desc:"Quantitative U&A study for a large apparel retailer — category engagement, brand repertoire, and shopper attitude segmentation.", industry:"retail", studyType:"Consumer Research", geo:["South Asia"], primaryType:"B2C", ...driveFile("1AbS25qU1SW5BqdZ4bXI6E_eDAhmv1Kk2") },
  { title:"Consumer Persona Development – Premium Ayurvedic Skincare Online Sales Growth", desc:"Consumer persona development work that informed digital strategy and enabled online sales growth for a premium Ayurvedic skincare brand.", industry:"retail", studyType:"Consumer Research", geo:["South Asia"], primaryType:"B2C", ...driveFile("1L00_jh7PlE_2ewW5aip7W2wUZWHwgEyW") },
  { title:"Customer Segmentation for a Premium Organic Food Retailer", desc:"Consumer segmentation study identifying distinct buyer groups for a premium organic food brand — profiles, purchase drivers, and channel preferences.", industry:"fnb", studyType:"Consumer Research", geo:["Middle East"], primaryType:"B2C", ...driveFile("1vaaUxA_aNScU5-UXXLbuzWxiLrcnmNQw") },
  { title:"Consumer Insights & Trend Mapping: Women's Adult Beverages", desc:"Consumer research study mapping trends, usage occasions, and purchase motivations in the women's adult beverage category.", industry:"fnb", studyType:"Consumer Research", geo:["North America"], primaryType:"B2C", ...driveFile("1dc0qoUHqf4L_dF4gyOne-jgQ1vEHS8wS") },
  { title:"Product Positioning Study for Medjool Dates", desc:"Consumer research study identifying optimal positioning, messaging, and target segments for a premium Medjool dates brand.", industry:"fnb", studyType:"Consumer Research", geo:["South Asia"], primaryType:"B2B", ...driveFile("1mZXYuwWBepz0g30gsGqMRGrbpUM6Rev8") },
  { title:"Brand Perception & Consumer Behaviour Study for Premium Alcohol", desc:"Qualitative and quantitative study on brand perception, purchase occasions, and loyalty drivers in the premium alcohol category.", industry:"fnb", studyType:"Consumer Research", geo:["South Asia"], primaryType:"B2C", ...driveFile("1DirIDYg7Im9lEiYaBVQooA0wCB4vKWf8") },
  { title:"Customer Perceptions on In-vehicle Health & Wellness Study", desc:"Primary research study on driver and passenger perceptions of in-vehicle health and wellness features — willingness-to-pay and feature prioritisation.", industry:"auto", studyType:"Consumer Research", geo:["Global"], primaryType:"Both", ...driveFile("1yOAxwrMmQg6wOCrax1GELD9mfs7WUUun") },
  { title:"Consumer Journey Insights for a Health Supplements Retailer", desc:"Consumer journey research mapping touchpoints, decision triggers, and loyalty barriers for a health supplements retailer.", industry:"health", studyType:"Consumer Research", geo:["Middle East"], primaryType:"B2C", ...driveFile("1yH6nKKw9NJkGke1w3buqYRRpTajs1GBK") },
  { title:"Customer Satisfaction for Petrochemical Products", desc:"B2B customer satisfaction research for a petrochemical products portfolio — supplier NPS, product performance ratings, and renewal intent.", industry:"mfg", studyType:"Consumer Research", geo:["Middle East","Asia","Europe","North America"], primaryType:"B2B", ...driveFile("1vbaayaNvuL45j9SJTwKt77hh5PjBdD2I") },
  { title:"AI Adoption in Telecom Sector", desc:"Global benchmarking study evaluating regional AI maturity, high-impact operator use cases, and capability gaps to sharpen GTM positioning.", industry:"telecom", studyType:"AI Readiness", geo:["North America","Europe","Asia","Middle East","Africa"], primaryType:"B2B", ...driveFile("10abj6wddyAktZvwSu3mt-S-kYHDh0fWU") },
  { title:"AI Ethics and Transparency Impact Assessment", desc:"Assessment of enterprise AI ethics posture and transparency readiness — governance frameworks, bias risk, and regulatory alignment across tech deployments.", industry:"tech", studyType:"AI Readiness", geo:["North America","Europe","Asia"], primaryType:"B2B", ...driveFile("1ggtWzS3z5NkYro1QefJMT5oW9upYzPYV") },
];

const SECTOR_ORDER = ["tech","telecom","retail","fnb","auto","bfsi","mfg","health"];

const SECTORS = [
  { id:"tech",    label:"Technology & Software", accent:NS.blue,       tag:"Technology", blurb:"GTM roadmaps, cloud & cyber intelligence, IoT trends, and mobility ecosystems",        spotlight:"GTM Strategy for a Cloud-Based Cybersecurity Startup" },
  { id:"telecom", label:"Telecommunication",     accent:ACCENT.teal,   tag:"Telecom",    blurb:"Market entry, network provider strategy, AI adoption, and benchmarking",               spotlight:"AI Adoption in Telecom Sector" },
  { id:"retail",  label:"Retail & E-commerce",  accent:NS.red,        tag:"Retail",     blurb:"Shopper insights, brand performance, U&A and concept testing",                         spotlight:"Online Shopping Patterns for Women's Apparel in the United States" },
  { id:"fnb",     label:"Food & Beverage",       accent:ACCENT.rust,   tag:"F&B",        blurb:"Concept testing, competitive landscape, consumer preferences and product positioning",  spotlight:"Consumer Insights & Trend Mapping: Women's Adult Beverages" },
  { id:"auto",    label:"Automotive",            accent:ACCENT.steel,  tag:"Mobility",   blurb:"EV transition, OEM strategy, ADAS and mobility.",                                      spotlight:"Market Assessment for Automotive Semi-active Suspension Technologies" },
  { id:"bfsi",    label:"BFSI",                  accent:ACCENT.forest, tag:"Finance",    blurb:"Fintech, embedded finance, payments and insurance.",                                    spotlight:"Brand Health & Competitive Benchmarking Study for a Health Insurance Company" },
  { id:"mfg",     label:"Manufacturing",         accent:ACCENT.amber,  tag:"Industrial", blurb:"Opportunity assessment, circular economy, equipment demand, and customer satisfaction intelligence", spotlight:"Market Assessment Study on the Global Biosurfactant Industry" },
  { id:"health",  label:"Healthcare",            accent:ACCENT.plum,   tag:"Health",     blurb:"Medtech GTM, AI drug development, stem cell therapies, and consumer health insights",  spotlight:"Product Concept Testing for CT and MRI Products" },
];

const STUDY_TYPES = [
  { id:"Industry Analysis",        label:"Industry Analysis",       accent:NS.blue,        tag:"Landscape", desc:"In-depth landscape studies, market sizing, TAM modelling, and demand forecasting to guide strategic decisions." },
  { id:"GTM",                      label:"GTM Strategy",            accent:ACCENT.teal,    tag:"DRIVE",     desc:"End-to-end go-to-market strategy, spanning new market entry, geographic expansion, and product innovation." },
  { id:"Competitive Benchmarking", label:"Competitive Benchmarking",accent:ACCENT.amber,   tag:"RIVALS",    desc:"Competitor landscape mapping, pricing and product benchmarking, brand positioning, channel strategy, and customer experience analysis." },
  { id:"Consumer Research",        label:"Consumer Research",       accent:ACCENT.plum,    tag:"Consumer",  desc:"Attitude & usage studies, consumer segmentation, needs mapping, brand tracking, and purchase behaviour analysis." },
  { id:"Sales Enablement",         label:"Sales Enablement",        accent:ACCENT.steel,   tag:"INTEL",     desc:"Multi-level account intelligence coverage designed to align insight depth with sales objectives and deal maturity." },
  { id:"AI Readiness",             label:"AI Readiness Assessment", accent:ACCENT.forest,  tag:"MATURITY",  desc:"AI adoption evaluation, competitive benchmarking, use case identification, and best practice analysis to position your organisation ahead of the curve." },
];

const GEO_REGIONS = [
  { id:"North America",  label:"North America",         accent:NS.blue       },
  { id:"Europe",         label:"Europe",                accent:ACCENT.steel   },
  { id:"Middle East",    label:"Middle East",           accent:ACCENT.amber   },
  { id:"Africa",         label:"Africa",                accent:ACCENT.rust    },
  { id:"South Asia",     label:"South Asia",            accent:ACCENT.plum    },
  { id:"Southeast Asia", label:"Southeast Asia",        accent:ACCENT.teal    },
  { id:"Asia",           label:"East & Central Asia",   accent:ACCENT.forest  },
  { id:"Global",         label:"Global / Multi-region", accent:NS.blue        },
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

// ─── Pill Button ──────────────────────────────────────────────────
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

// ─── Case Tile (inline grid card) ────────────────────────────────
function CaseTile({ item, accent, onOpen }) {
  const [hov, setHov] = useState(false);
  const sector    = SECTORS.find(s=>s.id===item.industry);
  const sectorLabel = sector?.label || item.industry;
  const sectorAccent = sector?.accent || accent;
  const indBg   = hov ? "rgba(255,255,255,0.14)" : `${sectorAccent}12`;
  const indCol  = hov ? "rgba(255,255,255,0.85)" : sectorAccent;
  const muteBg  = hov ? "rgba(255,255,255,0.14)" : NS.paperDeep;
  const muteCol = hov ? "rgba(255,255,255,0.75)" : NS.muted;
  return (
    <div onClick={()=>onOpen(item)}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        background: hov ? accent : NS.surface,
        border:`1.5px solid ${hov ? accent : NS.rule}`,
        borderRadius:3, padding:"16px 18px",
        cursor:"pointer", transition:"all 0.18s ease",
        transform: hov ? "translateY(-2px)" : "none",
        boxShadow: hov ? `0 8px 24px ${accent}22` : "none",
      }}
    >
      <div style={{ display:"flex",justifyContent:"space-between",gap:8,marginBottom:8 }}>
        <p style={{ fontSize:13,fontWeight:700,color:hov?"#fff":NS.ink,lineHeight:1.35,flex:1,transition:"color 0.18s" }}>{item.title}</p>
        <span style={{ color:hov?"rgba(255,255,255,0.8)":accent,fontSize:15,flexShrink:0,transition:"color 0.18s" }}>↗</span>
      </div>
      <div style={{ display:"flex",gap:4,flexWrap:"wrap",marginTop:4 }}>
        {(() => { const st = STUDY_TYPES.find(s=>s.id===item.studyType); const stCol = st?.accent || accent; const stBg = hov ? "rgba(255,255,255,0.18)" : `${stCol}15`; const stFg = hov ? "#fff" : stCol; return <span style={{ fontSize:9,padding:"2px 6px",borderRadius:2,background:stBg,color:stFg,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",transition:"all 0.18s" }}>{item.studyType}</span>; })()}
        <span style={{ fontSize:9,padding:"2px 6px",borderRadius:2,background:indBg,color:indCol,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",transition:"all 0.18s" }}>{sectorLabel}</span>
        {item.primaryType && <span style={{ fontSize:9,padding:"2px 6px",borderRadius:2,background:muteBg,color:muteCol,fontWeight:600,transition:"all 0.18s" }}>{item.primaryType}</span>}
        {item.geo.map(g=><span key={g} style={{ fontSize:9,padding:"2px 6px",borderRadius:2,background:muteBg,color:muteCol,transition:"all 0.18s" }}>{g}</span>)}
      </div>
    </div>
  );
}

// ─── Inline Case Panel — replaces page content when a card is clicked ──
// Two-column 50/50 filter bar, then cases grid.
// filterDim1 / filterDim2 = "sector" | "studyType" | "geo"
function InlineCasePanel({ title, accent, items, filterDim1, filterDim2, onClose, onOpenCase }) {
  const [f1, setF1] = useState(null); // active pill for left filter
  const [f2, setF2] = useState(null); // active pill for right filter

  // Build pill list for a given dimension, scoped to items present
  function buildPills(dim, baseItems) {
    if (dim === "sector")    return SECTORS.filter(s => baseItems.some(d=>d.industry===s.id)).map(s=>({ id:s.id, label:s.label, accent:s.accent }));
    if (dim === "studyType") return STUDY_TYPES.filter(st => baseItems.some(d=>d.studyType===st.id)).map(st=>({ id:st.id, label:st.label, accent:st.accent }));
    if (dim === "geo")       return GEO_REGIONS.filter(g => baseItems.some(d=>d.geo.includes(g.id))).map(g=>({ id:g.id, label:g.label, accent:g.accent }));
    return [];
  }

  function filterByDim(dim, val, list) {
    if (!val) return list;
    if (dim === "sector")    return list.filter(d=>d.industry===val);
    if (dim === "studyType") return list.filter(d=>d.studyType===val);
    if (dim === "geo")       return list.filter(d=>d.geo.includes(val));
    return list;
  }

  function dimLabel(dim) {
    if (dim === "sector")    return "Industry";
    if (dim === "studyType") return "Methodology";
    if (dim === "geo")       return "Region";
    return "";
  }

  const pills1 = buildPills(filterDim1, items);
  const pills2 = buildPills(filterDim2, items);

  // Apply both filters
  let filtered = filterByDim(filterDim1, f1, items);
  filtered = filterByDim(filterDim2, f2, filtered);

  const activeAccent = (f1 && pills1.find(p=>p.id===f1)?.accent) || accent;

  return (
    <div style={{ animation:"rc-pop 0.22s ease both" }}>
      {/* Panel header */}
      <div style={{ display:"flex",alignItems:"center",gap:14,padding:"18px 0 16px",borderBottom:`1px solid ${NS.rule}`,marginBottom:0 }}>
        <button onClick={onClose}
          style={{ display:"flex",alignItems:"center",gap:6,fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:NS.muted,background:"none",border:`1px solid ${NS.rule}`,borderRadius:2,padding:"5px 11px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.15s",flexShrink:0 }}
          onMouseEnter={e=>{e.currentTarget.style.color=NS.ink;e.currentTarget.style.borderColor=NS.ink;}}
          onMouseLeave={e=>{e.currentTarget.style.color=NS.muted;e.currentTarget.style.borderColor=NS.rule;}}>
          ← Back
        </button>
        <div style={{ width:3,height:22,background:accent,borderRadius:1,flexShrink:0 }} />
        <h3 className="panel-header-title" style={{ fontSize:"clamp(16px,1.8vw,20px)",fontWeight:700,color:accent,letterSpacing:"-0.02em",flex:1,minWidth:0 }}>{title}</h3>
        <span className="panel-header-count" style={{ fontSize:12,color:NS.muted,flexShrink:0 }}>{filtered.length} {filtered.length===1?"study":"studies"}</span>
      </div>

      {/* 50/50 filter bar */}
      <div className="filter-bar" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",border:`1px solid ${NS.rule}`,borderTop:"none",marginBottom:24 }}>
        <div style={{ padding:"14px 18px",borderRight:`1px solid ${NS.rule}` }}>
          <span style={{ fontSize:9,fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:NS.muted,display:"block",marginBottom:8 }}>{dimLabel(filterDim1)}</span>
          <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
            <PillBtn label="All" active={!f1} color={accent} onClick={()=>setF1(null)} />
            {pills1.map(p=>(
              <PillBtn key={p.id} label={p.label} active={f1===p.id} color={p.accent}
                onClick={()=>setF1(f1===p.id?null:p.id)} />
            ))}
          </div>
        </div>
        <div style={{ padding:"14px 18px" }}>
          <span style={{ fontSize:9,fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:NS.muted,display:"block",marginBottom:8 }}>{dimLabel(filterDim2)}</span>
          <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
            <PillBtn label="All" active={!f2} color={accent} onClick={()=>setF2(null)} />
            {pills2.map(p=>(
              <PillBtn key={p.id} label={p.label} active={f2===p.id} color={p.accent}
                onClick={()=>setF2(f2===p.id?null:p.id)} />
            ))}
          </div>
        </div>
      </div>

      {/* Cases grid */}
      {filtered.length === 0 ? (
        <div style={{ padding:"48px 0",textAlign:"center",color:NS.muted,fontSize:14 }}>No studies match these filters.</div>
      ) : (
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:10 }}>
          {filtered.map((item,i)=>(
            <CaseTile key={i} item={item} accent={activeAccent} onOpen={onOpenCase} />
          ))}
        </div>
      )}
      <div style={{ height:40 }} />
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────
function ResearchHero() {
  return (
    <div style={{ maxWidth:1160,margin:"0 auto",padding:"clamp(36px,6vw,72px) clamp(16px,4vw,44px) clamp(24px,4vw,40px)",borderBottom:`1px solid ${NS.rule}` }}>
      <div style={{ display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:24,flexWrap:"wrap" }}>
        <div style={{ maxWidth:720,minWidth:0 }}>
          <p style={{ fontSize:11,fontWeight:700,letterSpacing:"0.26em",textTransform:"uppercase",color:NS.red,marginBottom:20,display:"flex",alignItems:"center",gap:10 }}>
            <span style={{ display:"inline-block",width:22,height:1,background:NS.red,flexShrink:0 }} />
            Research Capabilities
          </p>
          <h1 style={{ fontWeight:400,fontSize:"clamp(36px,6.4vw,76px)",lineHeight:1.02,letterSpacing:"-0.025em",color:NS.ink,textWrap:"balance" }}>
            Intelligence that{" "}
            <em style={{ fontStyle:"normal",color:NS.blue }}>drives decisions.</em>
          </h1>
        </div>
        <p style={{ color:NS.inkSoft,fontSize:14,lineHeight:1.65,maxWidth:360,fontWeight:400,minWidth:0 }}>
          A full-spectrum research practice spanning diverse industries, geographies, and methodologies, delivering insights that power strategy, growth, and innovation.
        </p>
      </div>
    </div>
  );
}

// ─── NAV — updated for 2 sections ─────────────────────────────────
function ResearchNav() {
  const [active, setActive] = useState("explore");
  const IDS    = ["explore","expertise"];
  const LABELS = { explore:"Explore Work", expertise:"Expertise" };

  useEffect(() => {
    const obs = new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.id)});},{threshold:0.2});
    IDS.forEach(id=>{const el=document.getElementById(id);if(el)obs.observe(el)});
    return ()=>obs.disconnect();
  }, []);

  return (
    <div style={{ position:"sticky",top:0,zIndex:100,background:"rgba(245,241,234,0.95)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${NS.rule}`,display:"flex",alignItems:"center",height:52,padding:"0 clamp(16px,4vw,44px)" }}>
      <a href="/research" style={{ display:"flex",alignItems:"center",gap:9,textDecoration:"none",marginRight:"auto",minWidth:0,overflow:"hidden" }}>
        <img src={logoSrc} alt="Netscribes" style={{ height:19,objectFit:"contain",opacity:0.85,flexShrink:0 }} />
        <span className="nav-label" style={{ fontSize:10,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:NS.muted,whiteSpace:"nowrap" }}> / Research</span>
      </a>
      <nav style={{ display:"flex",gap:1,flexShrink:0 }}>
        {IDS.map(id=>(
          <a key={id} href={`#${id}`} style={{ fontSize:11,fontWeight:active===id?700:400,color:active===id?NS.ink:NS.muted,textDecoration:"none",padding:"5px 9px",borderRadius:2,background:active===id?NS.surface:"transparent",border:active===id?`1px solid ${NS.rule}`:"1px solid transparent",transition:"all 0.15s",whiteSpace:"nowrap" }}>{LABELS[id]}</a>
        ))}
      </nav>
    </div>
  );
}

// ─── SECTION 01 — Explore Work ────────────────────────────────────
// Three-way toggle: Industry / Study Type / Region
// Clicking a card expands inline below (page hides)
function ExploreSection({ onOpenCase, onPanelChange }) {
  const [ref, vis] = useFadeIn();
  // mode: "industry" | "studyType" | "region"
  const [mode, setMode] = useState("industry");
  // openPanel: null | { title, accent, items, mode (source mode), filterDim1, filterDim2 }
  const [openPanel, setOpenPanel] = useState(null);

  const handleCardClick = (title, accent, items, filterDim1, filterDim2) => {
    const panel = { title, accent, items, filterDim1, filterDim2 };
    setOpenPanel(panel);
    onPanelChange(true);
    setTimeout(() => {
      document.getElementById("explore")?.scrollIntoView({ behavior:"smooth", block:"start" });
    }, 60);
  };

  const handleClose = () => { setOpenPanel(null); onPanelChange(false); };

  const MODES = [
    { id:"industry",  label:"Industry" },
    { id:"studyType", label:"Study Type" },
    { id:"region",    label:"Region" },
  ];

  return (
    <section id="explore" ref={ref} style={{ opacity:vis?1:0, transform:vis?"none":"translateY(14px)", transition:"opacity 0.4s ease,transform 0.4s ease", minHeight:"60vh" }}>
      <div style={{ maxWidth:1160, margin:"0 auto", padding:"clamp(36px,5vw,64px) clamp(16px,4vw,44px) 0" }}>
        <p style={EYE(NS.blue)}>01 — Work samples</p>

        {!openPanel && (
          <>
            <div className="explore-header" style={{ display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:20,flexWrap:"wrap",marginBottom:28 }}>
              <h2 style={H2}>Explore our research work.</h2>
              {/* Toggle */}
              <div className="mode-toggle" style={{ display:"flex",border:`1px solid ${NS.rule}`,borderRadius:3,overflow:"hidden",flexShrink:0 }}>
                {MODES.map((m,i)=>(
                  <ModeTab key={m.id} label={m.label} active={mode===m.id}
                    borderRight={i<MODES.length-1}
                    onClick={()=>{ setMode(m.id); setOpenPanel(null); }} />
                ))}
              </div>
            </div>

            {mode === "industry" && (
              <IndustryView onCardClick={(title, accent, items) =>
                handleCardClick(title, accent, items, "studyType", "geo")
              } />
            )}
            {mode === "studyType" && (
              <StudyTypeView onCardClick={(title, accent, items) =>
                handleCardClick(title, accent, items, "sector", "geo")
              } />
            )}
            {mode === "region" && (
              <RegionView onCardClick={(title, accent, items) =>
                handleCardClick(title, accent, items, "sector", "studyType")
              } />
            )}
          </>
        )}

        {openPanel && (
          <>
            <div className="explore-header" style={{ display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:20,flexWrap:"wrap",marginBottom:4 }}>
              <h2 style={H2}>Explore our research work.</h2>
              {/* Toggle visible but non-interactive while panel open — clicking a mode closes panel too */}
              <div className="mode-toggle" style={{ display:"flex",border:`1px solid ${NS.rule}`,borderRadius:3,overflow:"hidden",flexShrink:0 }}>
                {MODES.map((m,i)=>(
                  <ModeTab key={m.id} label={m.label} active={mode===m.id}
                    borderRight={i<MODES.length-1}
                    onClick={()=>{ setMode(m.id); setOpenPanel(null); onPanelChange(false); }} />
                ))}
              </div>
            </div>
            <InlineCasePanel
              title={openPanel.title}
              accent={openPanel.accent}
              items={openPanel.items}
              filterDim1={openPanel.filterDim1}
              filterDim2={openPanel.filterDim2}
              onClose={handleClose}
              onOpenCase={onOpenCase}
            />
          </>
        )}
      </div>
      {!openPanel && <div style={{ height:"clamp(36px,5vw,64px)" }} />}
    </section>
  );
}

function ModeTab({ label, active, borderRight, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{ fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:active?700:500,color:active?NS.surface:(hov?NS.ink:NS.muted),background:active?NS.blue:(hov?NS.paperDeep:NS.surface),border:"none",borderRight:borderRight?`1px solid ${NS.rule}`:"none",padding:"9px 20px",cursor:"pointer",transition:"all 0.18s",whiteSpace:"nowrap" }}>
      {label}
    </button>
  );
}

// Industry view — 4-column grid of sector tiles
function IndustryView({ onCardClick }) {
  return (
    <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",borderLeft:`1px solid ${NS.rule}`,borderRight:`1px solid ${NS.rule}` }} className="sectors-grid">
      {SECTORS.map((s,i) => {
        const items = RESEARCH_DATA.filter(d=>d.industry===s.id).sort((a,b)=>SECTOR_ORDER.indexOf(a.industry)-SECTOR_ORDER.indexOf(b.industry));
        const spotlight = items.find(d=>d.title===s.spotlight) || items[0];
        const total = SECTORS.length;
        const COLS = 4;
        const isRight  = (i % COLS) === COLS-1 || i === total-1;
        const isBottom = i >= total-COLS;
        return (
          <SectorTile key={s.id} sector={s} index={i} total={total}
            spotlight={spotlight}
            onClick={()=>onCardClick(s.label, s.accent, items)} />
        );
      })}
    </div>
  );
}

function SectorTile({ sector, index, total, spotlight, onClick }) {
  const [hov, setHov] = useState(false);
  const COLS = 4;
  const isRight  = (index % COLS) === COLS-1 || index === total-1;
  const isBottom = index >= total-COLS;
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
        padding:"clamp(18px,2.5vw,28px) clamp(16px,2vw,24px) clamp(16px,2vw,22px)",
        cursor:"pointer", position:"relative", overflow:"hidden",
        minHeight:"clamp(160px,20vw,220px)", display:"flex", flexDirection:"column", justifyContent:"space-between", gap:16,
        transition:"background 0.32s cubic-bezier(0.22,1,0.36,1)",
        fontFamily:"'DM Sans',sans-serif", width:"100%",
      }}
    >
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:8 }}>
        <span style={{ fontSize:10,fontWeight:600,letterSpacing:"0.14em",color:hov?"rgba(255,255,255,0.55)":NS.muted,transition:"color 0.32s",fontVariantNumeric:"tabular-nums" }}>
          {String(index+1).padStart(2,"0")} / {String(total).padStart(2,"0")}
        </span>
        <span style={{ fontSize:9,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:hov?"rgba(255,255,255,0.78)":sector.accent,padding:"3px 8px",border:`1px solid ${hov?"rgba(255,255,255,0.35)":sector.accent+"50"}`,transition:"color 0.32s,border-color 0.32s",whiteSpace:"nowrap",lineHeight:"16px" }}>{sector.tag}</span>
      </div>
      <h2 style={{ fontWeight:700,fontSize:"clamp(15px,1.8vw,22px)",letterSpacing:"-0.02em",lineHeight:1.15,color:hov?"#FFFFFF":NS.ink,transition:"color 0.32s" }}>{sector.label}</h2>
      <div style={{ flex:1 }} />
      {spotlight && (
        <div style={{ borderTop:`1px solid ${hov?"rgba(255,255,255,0.22)":NS.ruleSoft}`,paddingTop:12,transition:"border-color 0.32s" }}>
          <p style={{ fontSize:9,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:hov?"rgba(255,255,255,0.45)":NS.muted,marginBottom:4 }}>Sample work</p>
          <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8 }}>
            <p style={{ fontSize:11,fontWeight:500,color:hov?"rgba(255,255,255,0.88)":NS.inkSoft,lineHeight:1.4,flex:1,transition:"color 0.32s",minWidth:0,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",minHeight:"calc(1.4em * 2)" }}>{spotlight.title}</p>
            <span style={{ color:hov?"rgba(255,255,255,0.7)":sector.accent,fontSize:15,transform:hov?"translateX(3px)":"none",transition:"all 0.32s",flexShrink:0 }}>→</span>
          </div>
        </div>
      )}
    </button>
  );
}

// Study Type view — 3-column grid
function StudyTypeView({ onCardClick }) {
  return (
    <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",borderLeft:`1px solid ${NS.rule}`,borderRight:`1px solid ${NS.rule}` }} className="method-grid">
      {STUDY_TYPES.map((st,i) => {
        const items = RESEARCH_DATA.filter(d=>d.studyType===st.id).sort((a,b)=>SECTOR_ORDER.indexOf(a.industry)-SECTOR_ORDER.indexOf(b.industry));
        const COLS = 3;
        const isRightEdge = (i + 1) % COLS === 0 || i === STUDY_TYPES.length - 1;
        return (
          <StudyTypeTile key={st.id} st={st} index={i} total={STUDY_TYPES.length}
            onClick={()=>onCardClick(st.label, st.accent, items)} />
        );
      })}
    </div>
  );
}

function StudyTypeTile({ st, index, total, onClick }) {
  const [hov, setHov] = useState(false);
  const COLS = 3;
  const isRightEdge = (index + 1) % COLS === 0 || index === total - 1;
  const count = RESEARCH_DATA.filter(d=>d.studyType===st.id).length;
  return (
    <button onClick={onClick}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{ textAlign:"left",background:hov?st.accent:NS.surface,border:"none",borderRight:!isRightEdge?`1px solid ${NS.rule}`:"none",borderBottom:`1px solid ${NS.rule}`,padding:CARD.padding,cursor:"pointer",minHeight:"clamp(220px,24vw,280px)",display:"flex",flexDirection:"column",justifyContent:"space-between",gap:12,transition:"background 0.28s cubic-bezier(0.22,1,0.36,1)",fontFamily:"'DM Sans',sans-serif",width:"100%" }}>
      <div>
        <div style={{ width:24,height:2,background:hov?"rgba(255,255,255,0.4)":st.accent,borderRadius:1,marginBottom:18,transition:"background 0.28s" }} />
        <h3 style={{ fontSize:CARD.headSize,fontWeight:CARD.headWeight,letterSpacing:CARD.headSpacing,color:hov?"#fff":NS.ink,lineHeight:CARD.headLine,marginBottom:10,transition:"color 0.28s" }}>{st.label}</h3>
        <p style={{ fontSize:CARD.bodySize,lineHeight:CARD.bodyLine,color:hov?"rgba(255,255,255,0.75)":NS.muted,transition:"color 0.28s" }}>{st.desc}</p>
      </div>
      <div style={{ borderTop:`1px solid ${hov?"rgba(255,255,255,0.2)":NS.ruleSoft}`,paddingTop:12,display:"flex",justifyContent:"space-between",alignItems:"center",transition:"border-color 0.28s" }}>
        <span style={{ fontSize:11,fontWeight:600,color:hov?"rgba(255,255,255,0.65)":NS.muted }}>{count} {count===1?"study":"studies"}</span>
        <span style={{ fontSize:16,color:hov?"rgba(255,255,255,0.8)":st.accent,transform:hov?"translateX(3px)":"none",transition:"all 0.28s" }}>→</span>
      </div>
    </button>
  );
}

// Region view — chips/tiles for each region
function RegionView({ onCardClick }) {
  const regionsWithData = GEO_REGIONS.map(g => ({
    ...g,
    items: RESEARCH_DATA.filter(d=>d.geo.includes(g.id)).sort((a,b)=>SECTOR_ORDER.indexOf(a.industry)-SECTOR_ORDER.indexOf(b.industry)),
  })).filter(g=>g.items.length>0);

  return (
    <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",borderLeft:`1px solid ${NS.rule}`,borderRight:`1px solid ${NS.rule}` }} className="sectors-grid">
      {regionsWithData.map((g,i) => {
        const total = regionsWithData.length;
        const COLS = 4;
        const isRight  = (i % COLS) === COLS-1 || i === total-1;
        const isBottom = i >= total - Math.ceil(total/COLS)*1; // rough last row
        return (
          <RegionTile key={g.id} region={g} index={i} total={total}
            onClick={()=>onCardClick(g.label, g.accent, g.items)} />
        );
      })}
    </div>
  );
}

function RegionTile({ region, index, total, onClick }) {
  const [hov, setHov] = useState(false);
  const COLS = 4;
  const isRight  = (index % COLS) === COLS-1 || index === total-1;
  const isBottom = index >= total - (total % COLS === 0 ? COLS : total % COLS);
  const count = region.items.length;
  const sample = region.items[0];
  return (
    <button onClick={onClick}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        textAlign:"left",
        background: hov ? region.accent : NS.surface,
        border:"none",
        borderRight: !isRight ? `1px solid ${NS.rule}` : "none",
        borderBottom: !isBottom ? `1px solid ${NS.rule}` : "none",
        padding:"clamp(18px,2.5vw,28px) clamp(16px,2vw,24px) clamp(16px,2vw,22px)",
        cursor:"pointer",
        minHeight:"clamp(160px,20vw,220px)", display:"flex", flexDirection:"column", justifyContent:"space-between", gap:16,
        transition:"background 0.32s cubic-bezier(0.22,1,0.36,1)",
        fontFamily:"'DM Sans',sans-serif", width:"100%",
      }}
    >
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:8 }}>
        <span style={{ fontSize:10,fontWeight:600,letterSpacing:"0.14em",color:hov?"rgba(255,255,255,0.55)":NS.muted,transition:"color 0.32s",fontVariantNumeric:"tabular-nums" }}>
          {String(index+1).padStart(2,"0")} / {String(total).padStart(2,"0")}
        </span>
        <span style={{ fontSize:9,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:hov?"rgba(255,255,255,0.78)":region.accent,padding:"3px 8px",border:`1px solid ${hov?"rgba(255,255,255,0.35)":region.accent+"50"}`,transition:"color 0.32s,border-color 0.32s",whiteSpace:"nowrap",lineHeight:"16px" }}>Region</span>
      </div>
      <h2 style={{ fontWeight:700,fontSize:"clamp(15px,1.8vw,20px)",letterSpacing:"-0.02em",lineHeight:1.15,color:hov?"#FFFFFF":NS.ink,transition:"color 0.32s" }}>{region.label}</h2>
      <div style={{ flex:1 }} />
      {sample && (
        <div style={{ borderTop:`1px solid ${hov?"rgba(255,255,255,0.22)":NS.ruleSoft}`,paddingTop:12,transition:"border-color 0.32s" }}>
          <p style={{ fontSize:9,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:hov?"rgba(255,255,255,0.45)":NS.muted,marginBottom:4 }}>Sample work</p>
          <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8 }}>
            <p style={{ fontSize:11,fontWeight:500,color:hov?"rgba(255,255,255,0.88)":NS.inkSoft,lineHeight:1.4,flex:1,transition:"color 0.32s",minWidth:0,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",minHeight:"calc(1.4em * 2)" }}>{sample.title}</p>
            <span style={{ color:hov?"rgba(255,255,255,0.7)":region.accent,fontSize:15,transform:hov?"translateX(3px)":"none",transition:"all 0.32s",flexShrink:0 }}>→</span>
          </div>
        </div>
      )}
    </button>
  );
}

// ─── Panel Profile (Expertise stats) ─────────────────────────────
const PANEL_STATS = [
  { value:"20.2M", label:"Total panelists (proprietary)" },
  { value:"8M",    label:"B2B panelists globally" },
  { value:"12.2M", label:"B2C panelists globally" },
  { value:"90+",   label:"Countries covered" },
];

const PANEL_CAPABILITIES = [
  { title:"Qualitative Research",   body:"In-Depth Interviews (IDIs), Focus Group Discussions (FGDs), Expert Consultations — moderated in local languages across global markets." },
  { title:"Quantitative Research",  body:"CATI, CAWI, CAPI, online panel surveys, large-scale quantitative studies — with SPSS analysis and cross-tabulation deliverables." },
  { title:"Niche B2B Recruitment",  body:"LinkedIn & professional network outreach, industry event sourcing, client databases & referrals — filtered by job title, industry, experience & geography." },
  { title:"Six-Fold QC Process",    body:"Geo-tag per panelist, time-stamping, Lat/Long monitoring, regular panel cleaning, quarterly quality surveys, double opt-in OTP verification." },
];

const B2B_PROFILE = {
  sectors: [
    { label:"IT",                  pct:26 },
    { label:"Financial Services",  pct:20 },
    { label:"Telecommunication",   pct:15 },
    { label:"Automobile",          pct:13 },
    { label:"Governmental Orgs",   pct:5  },
    { label:"FMCG",                pct:5  },
    { label:"Manufacturing",       pct:5  },
    { label:"Others",              pct:10 },
  ],
  roles: [
    { label:"C-Level Executives",       pct:27 },
    { label:"High-Level Executives",    pct:18 },
    { label:"Mid-Level Executives",     pct:45 },
    { label:"Business Owners/Partners", pct:10 },
  ],
  companySize: [
    { label:"Large",    pct:26 },
    { label:"Medium",   pct:36 },
    { label:"Small",    pct:19 },
    { label:"Startups", pct:19 },
  ],
  regions:"Americas (25%), Europe (20%), APAC (40%), MEA (15%)",
};

const B2C_PROFILE = {
  age: [
    { label:"13–17", pct:1  },
    { label:"18–24", pct:21 },
    { label:"25–34", pct:35 },
    { label:"35–44", pct:22 },
    { label:"45–54", pct:12 },
    { label:"55–64", pct:7  },
    { label:"65+",   pct:2  },
  ],
  jobStatus: [
    { label:"Full-Time",     pct:58 },
    { label:"Part-Time",     pct:8  },
    { label:"Self-Employed", pct:11 },
    { label:"Homemaker",     pct:4  },
    { label:"Student",       pct:9  },
    { label:"Retired",       pct:5  },
    { label:"Unemployed",    pct:4  },
    { label:"Others",        pct:1  },
  ],
  income: [
    { label:"<$20K",       pct:19 },
    { label:"$20K–30K",    pct:17 },
    { label:"$30K–50K",    pct:19 },
    { label:"$50K–70K",    pct:15 },
    { label:"$70K–100K",   pct:9  },
    { label:"$100K–150K",  pct:9  },
    { label:"$150K–200K",  pct:6  },
    { label:"$200K+",      pct:3  },
    { label:"Prefer not",  pct:1  },
  ],
  gender:  [{ label:"Male", pct:55 }, { label:"Female", pct:45 }],
  regions: "Americas (25%), Europe (20%), APAC (40%), MEA (15%)",
};

function HBar({ label, pct, accent, delay=0 }) {
  const [go, setGo] = useState(false);
  useEffect(() => { const t = setTimeout(()=>setGo(true), delay); return ()=>clearTimeout(t); }, [delay]);
  return (
    <div style={{ marginBottom:9 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:4 }}>
        <span style={{ fontSize:12, color:NS.inkSoft, lineHeight:1.3 }}>{label}</span>
        <span style={{ fontSize:11, fontWeight:700, color:accent, fontFamily:"'JetBrains Mono',monospace", flexShrink:0, marginLeft:8 }}>{pct}%</span>
      </div>
      <div style={{ height:4, background:NS.ruleSoft, borderRadius:2, overflow:"hidden" }}>
        <div style={{ height:"100%", width:go?`${pct}%`:"0%", background:accent, borderRadius:2, transition:`width 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms` }} />
      </div>
    </div>
  );
}

function MiniDonut({ segments, size=120 }) {
  const cx = size / 2, cy = size / 2, r = size * 0.38, stroke = size * 0.14;
  let cum = 0;
  const slices = segments.map(s => {
    const start = cum;
    cum += s.pct / 100;
    return { ...s, start, end: cum };
  });
  function arc(start, end) {
    const a1 = start * 2 * Math.PI - Math.PI / 2;
    const a2 = end   * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
    const lg = end - start > 0.5 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${lg} 1 ${x2} ${y2}`;
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display:"block" }}>
      {slices.map((s,i) => (
        <path key={i} d={arc(s.start, s.end)}
          fill="none" stroke={s.color} strokeWidth={stroke}
          strokeLinecap="butt" />
      ))}
    </svg>
  );
}

const B2B_REGIONS = [
  { label:"APAC",     pct:40, color:ACCENT.amber },
  { label:"Americas", pct:25, color:NS.blue      },
  { label:"Europe",   pct:20, color:ACCENT.teal  },
  { label:"MEA",      pct:15, color:ACCENT.plum  },
];
const B2C_REGIONS = B2B_REGIONS;

function RegionDonut({ segments }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:18 }}>
      <MiniDonut segments={segments} size={100} />
      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
        {segments.map(s=>(
          <div key={s.label} style={{ display:"flex", alignItems:"center", gap:7 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:s.color, flexShrink:0 }} />
            <span style={{ fontSize:12, color:NS.inkSoft }}>{s.label}</span>
            <span style={{ fontSize:11, fontWeight:700, color:s.color, fontFamily:"'JetBrains Mono',monospace", marginLeft:"auto", paddingLeft:8 }}>{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const B2B_SECTOR_COLORS = [NS.blue, ACCENT.teal, ACCENT.steel, ACCENT.amber, ACCENT.plum, ACCENT.rust, ACCENT.forest, NS.blue];
const B2B_ROLE_COLORS   = [NS.blue, ACCENT.teal, ACCENT.steel, ACCENT.amber];
const B2B_SIZE_COLORS   = [NS.blue, ACCENT.teal, ACCENT.amber, ACCENT.plum];
const B2C_AGE_COLORS    = [ACCENT.plum, ACCENT.steel, NS.blue, ACCENT.teal, ACCENT.amber, ACCENT.rust, ACCENT.forest];
const B2C_JOB_COLORS    = [ACCENT.plum, ACCENT.teal, NS.blue, ACCENT.steel, ACCENT.amber, ACCENT.rust, ACCENT.forest, ACCENT.plum];
const B2C_INC_COLORS    = [NS.blue, ACCENT.teal, ACCENT.steel, ACCENT.amber, ACCENT.plum, ACCENT.rust, ACCENT.forest, NS.blue, ACCENT.teal];

function PanelProfileSection() {
  const [ref, vis] = useFadeIn();
  const [tab, setTab] = useState("b2b");
  return (
    <div ref={ref} style={{ opacity:vis?1:0, transform:vis?"none":"translateY(14px)", transition:"opacity 0.5s ease, transform 0.5s ease", maxWidth:1160, margin:"0 auto", padding:"0 clamp(16px,4vw,44px)" }}>
      <div style={{ display:"flex", borderBottom:`1px solid ${NS.rule}`, marginBottom:32 }}>
        {[{id:"b2b",label:"B2B Panel Profile",accent:NS.blue},{id:"b2c",label:"B2C Panel Profile",accent:ACCENT.plum}].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)}
            style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase",
              color: tab===t.id ? t.accent : NS.muted,
              background:"none", border:"none", borderBottom:`2px solid ${tab===t.id ? t.accent : "transparent"}`,
              padding:"10px 24px 10px 0", cursor:"pointer", marginBottom:-1, transition:"color 0.2s, border-color 0.2s" }}>
            {t.label}
          </button>
        ))}
      </div>
      {tab === "b2b" && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"32px 48px" }} className="panel-grid">
          <div>
            <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:NS.muted, marginBottom:16 }}>Dedicated Sector-wise Panel</p>
            {B2B_PROFILE.sectors.map((s,i)=><HBar key={s.label} label={s.label} pct={s.pct} accent={B2B_SECTOR_COLORS[i]||NS.blue} delay={i*40} />)}
          </div>
          <div>
            <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:NS.muted, marginBottom:16 }}>Job Roles</p>
            {B2B_PROFILE.roles.map((s,i)=><HBar key={s.label} label={s.label} pct={s.pct} accent={B2B_ROLE_COLORS[i]||NS.blue} delay={i*40+80} />)}
          </div>
          <div style={{ borderTop:`1px solid ${NS.ruleSoft}`, paddingTop:28 }}>
            <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:NS.muted, marginBottom:16 }}>Company Size</p>
            {B2B_PROFILE.companySize.map((s,i)=><HBar key={s.label} label={s.label} pct={s.pct} accent={B2B_SIZE_COLORS[i]||NS.blue} delay={i*40+160} />)}
          </div>
          <div style={{ borderTop:`1px solid ${NS.ruleSoft}`, paddingTop:28 }}>
            <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:NS.muted, marginBottom:20 }}>Regions</p>
            <RegionDonut segments={B2B_REGIONS} />
          </div>
        </div>
      )}
      {tab === "b2c" && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"32px 48px" }} className="panel-grid">
          <div>
            <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:NS.muted, marginBottom:16 }}>Age Brackets</p>
            {B2C_PROFILE.age.map((s,i)=><HBar key={s.label} label={s.label} pct={s.pct} accent={B2C_AGE_COLORS[i]||ACCENT.plum} delay={i*35} />)}
          </div>
          <div>
            <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:NS.muted, marginBottom:16 }}>Job Status</p>
            {B2C_PROFILE.jobStatus.map((s,i)=><HBar key={s.label} label={s.label} pct={s.pct} accent={B2C_JOB_COLORS[i]||ACCENT.plum} delay={i*35+100} />)}
          </div>
          <div>
            <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:NS.muted, marginBottom:16 }}>Household Income</p>
            {B2C_PROFILE.income.map((s,i)=><HBar key={s.label} label={s.label} pct={s.pct} accent={B2C_INC_COLORS[i]||ACCENT.plum} delay={i*35+200} />)}
          </div>
          <div style={{ borderTop:`1px solid ${NS.ruleSoft}`, paddingTop:28 }}>
            <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:NS.muted, marginBottom:16 }}>Gender</p>
            {B2C_PROFILE.gender.map((s,i)=><HBar key={s.label} label={s.label} pct={s.pct} accent={i===0?NS.blue:ACCENT.plum} delay={i*40} />)}
          </div>
          <div style={{ gridColumn:"2 / 4", borderTop:`1px solid ${NS.ruleSoft}`, paddingTop:28 }}>
            <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:NS.muted, marginBottom:20 }}>Regions</p>
            <RegionDonut segments={B2C_REGIONS} />
          </div>
        </div>
      )}
      <div style={{ height:"clamp(36px,4vw,52px)" }} />
    </div>
  );
}

// ─── SECTION 02 — Expertise ───────────────────────────────────────
function ExpertiseSection({ onOpenCase, onPanelChange }) {
  const [ref, vis] = useFadeIn();
  const [openCard, setOpenCard] = useState(null);

  const EXPERTISE_CARDS = [
    { id:"B2B",  label:"B2B Research",            tag:"Decision-maker intelligence", accent:NS.blue,
      desc:"In-depth interviews with CXOs, executives, industry experts/key stakeholders, and industrial surveys, reaching decision-makers and technical leads across global markets.",
      items:RESEARCH_DATA.filter(d=>d.primaryType==="B2B"),
      featured:["Engagement Perception for an International Bank","AI Ethics and Transparency Impact Assessment","GTM Strategy for a Cloud-Based Cybersecurity Startup"] },
    { id:"B2C",  label:"B2C & Consumer Research",  tag:"Consumer depth",              accent:ACCENT.plum,
      desc:"Consumer surveys (CAPI/CATI/CAWI), focus groups, face-to-face interviews, home use tests, central location tests with deep panel access across sector.",
      items:RESEARCH_DATA.filter(d=>d.primaryType==="B2C"),
      featured:["Online Shopping Patterns for Women's Apparel in the United States","Consumer Insights & Trend Mapping: Women's Adult Beverages","Home Fitness Brand Performance Assessment"] },
    { id:"Dual", label:"Dual B2B / B2C",           tag:"Mixed audience research",     accent:ACCENT.forest,
      desc:"Research programmes combining stakeholder and end-consumer perspectives — category managers, procurement heads, executives through to everyday consumers.",
      items:RESEARCH_DATA.filter(d=>d.primaryType==="Both"),
      featured:["Brand Health & Competitive Benchmarking Study for a Health Insurance Company","GTM & Market Potential for Flavoured Milk and Convergence Drinks","Customer Perceptions on In-vehicle Health & Wellness Study"] },
    { id:"Synthetic Data", label:"Synthetic Data",  tag:"Data augmentation",           accent:ACCENT.steel,
      desc:"ML-ready synthetic dataset generation, enabling rapid data augmentation for AI/ML workflows without compromising privacy or requiring new data collection.",
      items:RESEARCH_DATA.filter(d=>d.studyType==="Synthetic Data"),
      featured:["Scalable Data Augmentation through Synthetic Record Generation"] },
  ];

  const activeCard = openCard ? EXPERTISE_CARDS.find(c=>c.id===openCard) : null;

  const handleCardClick = (card) => {
    setOpenCard(card.id);
    onPanelChange(true);
    // Scroll to top of nav — page is now cleared, panel starts right below nav
    setTimeout(() => window.scrollTo({ top: 0, behavior:"smooth" }), 60);
  };

  const handleClose = () => { setOpenCard(null); onPanelChange(false); };

  return (
    <section id="expertise" ref={ref} style={{ opacity:vis?1:0, transform:vis?"none":"translateY(14px)", transition:"opacity 0.4s ease,transform 0.4s ease" }}>

      {/* ── All top content: only shown when no card is open ── */}
      {!activeCard && (
        <>
          <div style={{ maxWidth:1160, margin:"0 auto", padding:"clamp(36px,5vw,64px) clamp(16px,4vw,44px) 0" }}>
            <p style={EYE(ACCENT.forest)}>02 — Primary Research Expertise</p>
            <h2 style={{ ...H2 }} className="expertise-h2">Global Data Collection. Local Market Intelligence.</h2>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", marginTop:32, borderTop:`1px solid ${NS.rule}`, borderLeft:`1px solid ${NS.rule}`, borderRight:`1px solid ${NS.rule}` }} className="stats-bar">
              {PANEL_STATS.map((s,i)=>(
                <div key={i} style={{ padding:"24px 28px", borderRight: i<3 ? `1px solid ${NS.rule}` : "none", borderBottom:`1px solid ${NS.rule}` }}>
                  <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(24px,2.8vw,36px)", fontWeight:700, color:ACCENT.forest, letterSpacing:"-0.02em", lineHeight:1.1 }}>{s.value}</div>
                  <div style={{ fontSize:12, color:NS.muted, marginTop:6, lineHeight:1.3, whiteSpace:"nowrap" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"0", marginTop:32, borderTop:`1px solid ${NS.rule}`, borderLeft:`1px solid ${NS.rule}`, borderRight:`1px solid ${NS.rule}` }} className="caps-grid">
              {PANEL_CAPABILITIES.map((c,i)=>(
                <div key={i} style={{ background:NS.surface, padding:"20px 22px", borderRight: i<3 ? `1px solid ${NS.rule}` : "none", borderBottom:`1px solid ${NS.rule}` }}>
                  <div style={{ width:20, height:2, background:ACCENT.forest, borderRadius:1, marginBottom:12 }} />
                  <p style={{ fontSize:12, fontWeight:700, color:NS.ink, marginBottom:6, lineHeight:1.3 }}>{c.title}</p>
                  <p style={{ fontSize:12, color:NS.muted, lineHeight:1.6 }}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ maxWidth:1160, margin:"40px auto 0", padding:"0 clamp(16px,4vw,44px)" }}>
            <PanelProfileSection />
          </div>

          {/* ── Expertise tiles ── */}
          <div id="expertise-tiles" style={{ maxWidth:1160, margin:"0 auto", padding:"0 clamp(16px,4vw,44px)" }}>
            <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:NS.muted, marginBottom:16 }}>How we engage respondents</p>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",borderLeft:`1px solid ${NS.rule}`,borderRight:`1px solid ${NS.rule}` }} className="expertise-grid">
              {EXPERTISE_CARDS.map((c,i)=>(
                <ExpertiseTile key={c.id} card={c} isLast={i===EXPERTISE_CARDS.length-1}
                  onClick={()=>handleCardClick(c)} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── Case panel: shown alone when a tile is selected ── */}
      {activeCard && (
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"clamp(24px,4vw,44px) clamp(16px,4vw,44px) 0" }}>
          <p style={EYE(ACCENT.forest)}>02 — Primary Research Expertise</p>
          <InlineCasePanel
            title={activeCard.label}
            accent={activeCard.accent}
            items={[...activeCard.items].sort((a,b)=>SECTOR_ORDER.indexOf(a.industry)-SECTOR_ORDER.indexOf(b.industry))}
            filterDim1="sector"
            filterDim2="geo"
            onClose={handleClose}
            onOpenCase={onOpenCase}
          />
        </div>
      )}

      <div style={{ height:"clamp(36px,5vw,64px)" }} />
    </section>
  );
}

function ExpertiseTile({ card, isLast, onClick }) {
  const [hov,setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{ textAlign:"left",background:hov?card.accent:NS.surface,border:"none",borderRight:!isLast?`1px solid ${NS.rule}`:"none",borderBottom:`1px solid ${NS.rule}`,padding:CARD.padding,cursor:"pointer",minHeight:"clamp(220px,24vw,300px)",display:"flex",flexDirection:"column",gap:0,transition:"background 0.32s cubic-bezier(0.22,1,0.36,1)",fontFamily:"'DM Sans',sans-serif",width:"100%" }}>
      <div style={{ width:hov?"100%":"28px",height:2,background:hov?"rgba(255,255,255,0.35)":card.accent,borderRadius:1,marginBottom:20,transition:"width 0.35s ease,background 0.32s" }} />
      <h3 style={{ fontSize:CARD.headSize,fontWeight:CARD.headWeight,letterSpacing:CARD.headSpacing,color:hov?"#fff":NS.ink,lineHeight:CARD.headLine,marginBottom:12,transition:"color 0.32s" }}>{card.label}</h3>
      <p style={{ fontSize:CARD.bodySize,color:hov?"rgba(255,255,255,0.78)":NS.muted,lineHeight:CARD.bodyLine,marginBottom:20,flex:1,transition:"color 0.32s" }}>{card.desc}</p>
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

// ─── Shared style tokens ──────────────────────────────────────────
const H2  = { fontSize:"clamp(28px,3.2vw,40px)",fontWeight:700,color:NS.ink,letterSpacing:"-0.025em",lineHeight:1.05,marginBottom:0 };
const EYE = c => ({ fontSize:11,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:c,marginBottom:10,display:"block" });

const CARD = {
  tagSize:    9,
  tagWeight:  700,
  tagSpacing: "0.15em",
  headSize:   "clamp(15px,1.55vw,19px)",
  headWeight: 700,
  headSpacing:"-0.015em",
  headLine:   1.2,
  bodySize:   13,
  bodyLine:   1.6,
  padding:    "clamp(20px,2.5vw,28px) clamp(18px,2vw,24px)",
  padBody:    "clamp(14px,1.8vw,18px) clamp(18px,2vw,24px) clamp(16px,2vw,22px)",
};

// ─── Root ─────────────────────────────────────────────────────────
export default function Research() {
  const [viewer,       setViewer]       = useState(null);
  // "explore" | "expertise" | false — tracks which section has a panel open
  const [anyPanelOpen, setAnyPanelOpen] = useState(false);

  const openCase  = item => setViewer(item);
  const closeCase = ()   => setViewer(null);

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

        @media (max-width: 700px) {
          .sectors-grid   { grid-template-columns: 1fr 1fr !important; }
          .method-grid    { grid-template-columns: 1fr 1fr !important; }
          .expertise-grid { grid-template-columns: 1fr 1fr !important; }
          .sectors-grid button { border-right: none !important; }
          .panel-grid     { grid-template-columns: 1fr 1fr !important; }
          .stats-bar      { grid-template-columns: 1fr 1fr !important; }
          .caps-grid      { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .sectors-grid   { grid-template-columns: 1fr !important; }
          .method-grid    { grid-template-columns: 1fr !important; }
          .expertise-grid { grid-template-columns: 1fr !important; }
          .panel-grid     { grid-template-columns: 1fr !important; }
          .stats-bar      { grid-template-columns: 1fr 1fr !important; }
          .caps-grid      { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 900px) {
          .expertise-h2 { white-space: nowrap; }
        }

        /* ── New elements: toggle row, filter bar, panel header ── */

        /* Toggle sits below heading on narrow screens */
        @media (max-width: 600px) {
          .explore-header { flex-direction: column !important; align-items: flex-start !important; gap: 14px !important; }
          .mode-toggle    { width: 100% !important; }
          .mode-toggle button { flex: 1 !important; text-align: center !important; }
        }

        /* Filter bar stacks to single column on mobile */
        @media (max-width: 580px) {
          .filter-bar { grid-template-columns: 1fr !important; }
          .filter-bar > div:first-child { border-right: none !important; border-bottom: 1px solid rgba(0,95,134,0.13); }
        }

        /* Panel header: hide count, allow title to wrap */
        @media (max-width: 480px) {
          .panel-header-count { display: none !important; }
          .panel-header-title { font-size: 15px !important; }
        }

        /* Nav: shrink "/ Research" label on very small screens */
        @media (max-width: 380px) {
          .nav-label { display: none !important; }
        }
      `}</style>

      <div style={{ background:NS.paper, minHeight:"100vh" }}>
        <ResearchNav />
        {/* Hero hides when any panel open */}
        {!anyPanelOpen && <ResearchHero />}
        {/* Explore section: hidden when expertise panel is open */}
        {anyPanelOpen !== "expertise" && (
          <ExploreSection
            onOpenCase={openCase}
            onPanelChange={open => setAnyPanelOpen(open ? "explore" : false)}
          />
        )}
        {/* Expertise section: hidden when explore panel is open */}
        {anyPanelOpen !== "explore" && (
          <ExpertiseSection
            onOpenCase={openCase}
            onPanelChange={open => setAnyPanelOpen(open ? "expertise" : false)}
          />
        )}
        {/* Footer hides when any panel open */}
        {!anyPanelOpen && (
          <footer style={{ borderTop:`1px solid ${NS.rule}`,maxWidth:1160,margin:"0 auto",padding:"22px clamp(20px,4vw,44px) 40px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10 }}>
            <img src={logoSrc} alt="Netscribes" style={{ height:17,opacity:0.55 }} />
            <span style={{ fontSize:11,color:NS.muted,letterSpacing:"0.12em",textTransform:"uppercase" }}>Research Capabilities</span>
          </footer>
        )}
      </div>

      {viewer && (
        <CaseViewer item={viewer} accent={SECTORS.find(s=>s.id===viewer.industry)?.accent||NS.blue} onClose={closeCase} />
      )}
    </>
  );
}
