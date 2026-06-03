// Shared research data — single source of truth for the Research microsite.
export const NS = {
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

export const ACCENT = {
  teal:   "#0B7B6B",
  amber:  "#B85C00",
  plum:   "#5C3472",
  forest: "#2D6B4A",
  steel:  "#1E4976",
  rust:   "#A03020",
};

export function driveFile(id) {
  return {
    driveEmbedUrl: `https://drive.google.com/file/d/${id}/preview`,
    driveViewUrl:  `https://drive.google.com/file/d/${id}/view`,
  };
}

export const RESEARCH_DATA = [
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
  { title:"Scalable Data Augmentation through Synthetic Record Generation", desc:"A detailed case study on how Netscribes transformed a 50-record survey into a 500-record, ML-ready synthetic dataset in under two weeks.", industry:"tech", studyType:"Synthetic Data", geo:["Global"], primaryType:null, ...driveFile("1uSBvuSAJ3w0zSVowREbkzCZPRttVuFw2") },
  { title:"Brand & Product Performance Tracking Study for Cleaning Wipes", desc:"Ongoing competitive benchmarking of brand health and product performance metrics for a cleaning wipes brand across retail channels.", industry:"retail", studyType:"Competitive Benchmarking", geo:["North America"], primaryType:"B2C", ...driveFile("1a_RNWEMmh-BMaSQAfBipJlVOreO52Ajs") },
  { title:"Competitive Landscape Analysis for Juice Market", desc:"Competitive intelligence study mapping the juice market landscape — key players, share dynamics, innovation trends, and positioning white spaces.", industry:"fnb", studyType:"Competitive Benchmarking", geo:["Middle East","Africa"], primaryType:"B2B", ...driveFile("1LZ9NgNpvyJ-VKqJAgALbZUK5AD9ADwI7") },
  { title:"Middle East Portable Air Compressor and Hand-held Tool Market", desc:"Competitive intelligence on the Middle East market for portable air compressors and handheld power tools — rival capabilities and channel strategies.", industry:"mfg", studyType:"Competitive Benchmarking", geo:["Middle East"], primaryType:"B2B", ...driveFile("1-uxzXR3sRlI3sFlnvTeX2mWHRDRA0nvn") },
  { title:"Consumer Payments Trend Analysis & Declining Retail Credit Card Relevance", desc:"Consumer research study on shifting payment preferences and the declining relevance of retail credit cards among digitally-native consumers.", industry:"bfsi", studyType:"Consumer Research", geo:["North America"], primaryType:null, ...driveFile("1I8YddJ9L5MH2H06H3kqHiFyqVWHAX_wr") },
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

  { title:"Analysis of Private Equity Deals", desc:"Deep-dive analysis of private equity deal flow, valuation trends, and sectoral investment patterns across global markets.", industry:"bfsi", studyType:"Investment Research", geo:["Global"], primaryType:null, ...driveFile("16fWaznLtKl_GfotKSGsElRw68lrBPyEz") },
  { title:"Dedicated Research Desk for a European PE Firm", desc:"Ongoing research desk support for a European private equity firm — market monitoring, company profiling, and deal intelligence.", industry:"bfsi", studyType:"Investment Research", geo:["Europe"], primaryType:null, ...driveFile("1b_BFFwMCEwmIOBM12jU4LKwtuzNugZHF") },
  { title:"Due Diligence of a Wealth Management Firm", desc:"Comprehensive due diligence covering competitive landscape, client retention risk, and strategic positioning for a wealth management acquisition target.", industry:"bfsi", studyType:"Investment Research", geo:["Europe","Asia"], primaryType:"B2B", ...driveFile("1NAuMGw_3VWTUbauM0Ptrou6rxb83v2kj") },
  { title:"M&A Deal Activity of Wealth and Asset Management Companies in the US and Europe", desc:"Structured analysis of M&A activity, deal rationale, and consolidation trends among wealth and asset managers across the US and European markets.", industry:"bfsi", studyType:"Investment Research", geo:["North America","Europe"], primaryType:null, ...driveFile("1MqsZL2buDFlWHr8RimygF-OeERrZAQT8") },
  { title:"Research and Modeling Support to a US Private Equity Client", desc:"Analytical and financial modelling support for a US-based private equity client — sector sizing, comparable analysis, and portfolio benchmarking.", industry:"bfsi", studyType:"Investment Research", geo:["Global"], primaryType:null, ...driveFile("1lyIMTflwaAJ6E67gvqAYw0lQyn-mlbM7") },

  { title:"In-vehicle Windscreen Display Systems — Landscape Study", desc:"Patent landscape study mapping IP activity, key assignees, and whitespace opportunities in automotive windscreen display and HUD systems.", industry:"auto", studyType:"Patent Research", geo:["Global"], primaryType:null, ...driveFile("1CpjK4oO4VWMgAfDXiSsmO8_RZSRT_cAo") },
  { title:"In-Cabin Sensing in the Automotive Industry — Landscape Study", desc:"Patent landscape analysis of in-cabin sensing technologies — occupant monitoring, gesture control, and driver alertness detection.", industry:"auto", studyType:"Patent Research", geo:["Global"], primaryType:null, ...driveFile("1rLaxR37L_fXvGG_HQioPE3BYxCtu-3yp") },
  { title:"AI in the Automotive Industry — Whitespace Analysis", desc:"IP whitespace analysis identifying underserved innovation areas in automotive AI — spanning ADAS, predictive maintenance, and autonomous systems.", industry:"auto", studyType:"Patent Research", geo:["Global"], primaryType:null, ...driveFile("1NSSLEiMKAl7uc6aVES6ppMuwldwHdDWK") },
  { title:"Patentability Search — AI Driven Radar Digital Twin", desc:"Patentability assessment examining prior art landscape for radar digital twin technology driven by artificial intelligence.", industry:"auto", studyType:"Patent Research", geo:["Global"], primaryType:null, ...driveFile("15nM1Dk649iJ3qpMJO-FzfiRU1uj0oKHI") },
  { title:"Patentability Search — Vehicle Sensor Calibration Devices", desc:"Prior art search and patentability analysis for novel vehicle sensor calibration device concepts.", industry:"auto", studyType:"Patent Research", geo:["Global"], primaryType:null, ...driveFile("1_ADgdczVG73D0V-lUF0ABATvQh9KTBNX") },
  { title:"Patent Portfolio Analysis in the Tobacco Industry", desc:"Strategic patent portfolio analysis covering IP holdings, citation networks, and competitive positioning across the tobacco and reduced-risk products sector.", industry:"retail", studyType:"Patent Research", geo:["Global"], primaryType:null, ...driveFile("1T8_p3cUk0fcMLEe55BOshl3LsZg92pvA") },
  { title:"Patentability Search — Smart Fibres", desc:"Patentability assessment examining prior art for advanced smart fibre technologies across wearable, medical, and performance textile applications.", industry:"retail", studyType:"Patent Research", geo:["Global"], primaryType:null, ...driveFile("1w_FxXe8iFOOwdWn1Ea6Pu8ouK2YJRfiQ") },
  { title:"Patentability Search — Advanced Transistors", desc:"Prior art landscape analysis for next-generation transistor architectures — covering FinFET, gate-all-around, and 2D material innovations.", industry:"tech", studyType:"Patent Research", geo:["Global"], primaryType:null, ...driveFile("1OS4ltVm4Yj3tc216WKXfRstSegxJASTC") },
  { title:"Nanomaterials — Technology and Market Assessment", desc:"Combined patent and market assessment of the nanomaterials space — innovation trajectories, key IP holders, and emerging application domains.", industry:"tech", studyType:"Patent Research", geo:["Global"], primaryType:null, ...driveFile("1UMs7b7GVn1qhV5Fu_PnX3p7Uz8Dao2gn") },
];

export const SECTOR_ORDER = ["tech","telecom","retail","fnb","auto","bfsi","mfg","health"];

export const SECTORS = [
  { id:"tech",    label:"Technology & Software", accent:NS.blue,       tag:"Technology", blurb:"GTM roadmaps, cloud & cyber intelligence, IoT trends, and mobility ecosystems",        spotlight:"GTM Strategy for a Cloud-Based Cybersecurity Startup" },
  { id:"telecom", label:"Telecommunication",     accent:ACCENT.teal,   tag:"Telecom",    blurb:"Market entry, network provider strategy, AI adoption, and benchmarking",               spotlight:"AI Adoption in Telecom Sector" },
  { id:"retail",  label:"Retail & E-commerce",  accent:NS.red,        tag:"Retail",     blurb:"Shopper insights, brand performance, U&A and concept testing",                         spotlight:"Online Shopping Patterns for Women's Apparel in the United States" },
  { id:"fnb",     label:"Food & Beverage",       accent:ACCENT.rust,   tag:"F&B",        blurb:"Concept testing, competitive landscape, consumer preferences and product positioning",  spotlight:"Consumer Insights & Trend Mapping: Women's Adult Beverages" },
  { id:"auto",    label:"Automotive",            accent:ACCENT.steel,  tag:"Mobility",   blurb:"EV transition, OEM strategy, ADAS and mobility.",                                      spotlight:"Market Assessment for Automotive Semi-active Suspension Technologies" },
  { id:"bfsi",    label:"BFSI",                  accent:ACCENT.forest, tag:"Finance",    blurb:"Fintech, embedded finance, payments and insurance.",                                    spotlight:"Brand Health & Competitive Benchmarking Study for a Health Insurance Company" },
  { id:"mfg",     label:"Manufacturing",         accent:ACCENT.amber,  tag:"Industrial", blurb:"Opportunity assessment, circular economy, equipment demand, and customer satisfaction intelligence", spotlight:"Market Assessment Study on the Global Biosurfactant Industry" },
  { id:"health",  label:"Healthcare",            accent:ACCENT.plum,   tag:"Health",     blurb:"Medtech GTM, AI drug development, stem cell therapies, and consumer health insights",  spotlight:"Product Concept Testing for CT and MRI Products" },
];

export const STUDY_TYPES = [
  { id:"Industry Analysis",        label:"Industry Analysis",       accent:NS.blue,        tag:"Landscape", desc:"In-depth landscape studies, market sizing, TAM modelling, and demand forecasting to guide strategic decisions." },
  { id:"GTM",                      label:"GTM Strategy",            accent:ACCENT.teal,    tag:"DRIVE",     desc:"End-to-end go-to-market strategy, spanning new market entry, geographic expansion, and product innovation." },
  { id:"Competitive Benchmarking", label:"Competitive Benchmarking",accent:ACCENT.amber,   tag:"RIVALS",    desc:"Competitor landscape mapping, pricing and product benchmarking, brand positioning, channel strategy, and customer experience analysis." },
  { id:"Consumer Research",        label:"Consumer Research",       accent:ACCENT.plum,    tag:"Consumer",  desc:"Attitude & usage studies, consumer segmentation, needs mapping, brand tracking, and purchase behaviour analysis." },
  { id:"Sales Enablement",         label:"Sales Enablement",        accent:ACCENT.steel,   tag:"INTEL",     desc:"Multi-level account intelligence coverage designed to align insight depth with sales objectives and deal maturity." },
  { id:"AI Readiness",             label:"AI Readiness Assessment", accent:ACCENT.forest,  tag:"MATURITY",  desc:"AI adoption evaluation, competitive benchmarking, use case identification, and best practice analysis to position your organisation ahead of the curve." },
  { id:"Investment Research",      label:"Investment Research",     accent:ACCENT.amber,   tag:"INVEST",    desc:"Private equity deal analysis, due diligence, M&A monitoring, and financial modelling support — enabling investment decisions with deep market and competitive intelligence." },
  { id:"Patent Research",          label:"Patent Research",         accent:ACCENT.plum,    tag:"IP",        desc:"Patent landscape studies, whitespace analysis, patentability searches, and IP portfolio assessments — mapping the innovation frontier across industries and technologies." },
  { id:"Synthetic Data",           label:"Synthetic Data",          accent:ACCENT.steel,   tag:"DATA",      desc:"ML-ready synthetic dataset generation for rapid data augmentation — without compromising privacy or requiring new data collection." },
];

export const GEO_REGIONS = [
  { id:"North America",  label:"North America",         accent:NS.blue       },
  { id:"Europe",         label:"Europe",                accent:ACCENT.steel   },
  { id:"Middle East",    label:"Middle East",           accent:ACCENT.amber   },
  { id:"Africa",         label:"Africa",                accent:ACCENT.rust    },
  { id:"South Asia",     label:"South Asia",            accent:ACCENT.plum    },
  { id:"Southeast Asia", label:"Southeast Asia",        accent:ACCENT.teal    },
  { id:"Asia",           label:"East & Central Asia",   accent:ACCENT.forest  },
  { id:"Global",         label:"Global / Multi-region", accent:NS.blue        },
];

// ─── Per-industry hero copy ───────────────────────────────────────
// noun → fills H1 "[noun] intelligence / that drives decisions."
// lead → accent-colored closing phrase.  desc → 2-sentence intro.
export const INDUSTRY_HERO = {
  tech: {
    noun:"Technology",
    desc:"We help technology and software companies size markets, sharpen go-to-market, and decode the competitive and IP frontier. From cloud and cybersecurity to IoT and emerging tech, our research turns signal into strategy.",
  },
  telecom: {
    noun:"Telecom",
    desc:"We map market entry, network strategy, and AI adoption across global telecom ecosystems. Benchmarking and operator intelligence that sharpen positioning and unlock growth.",
  },
  retail: {
    noun:"Retail",
    desc:"We decode shopper behaviour, brand health, and category dynamics across retail and e-commerce. Consumer depth that powers positioning, innovation, and growth.",
  },
  fnb: {
    noun:"Food & beverage",
    desc:"We test concepts, map competitive landscapes, and uncover consumer preferences across food and beverage categories. Insight that de-risks innovation and sharpens positioning.",
  },
  auto: {
    noun:"Mobility",
    desc:"We track the EV transition, OEM strategy, ADAS, and the automotive IP frontier. Mobility intelligence that informs product, partnership, and patent decisions.",
  },
  bfsi: {
    noun:"Financial",
    desc:"We cover fintech, embedded finance, payments, insurance, and investment research across BFSI. From due diligence to brand benchmarking, intelligence that underwrites confident decisions.",
  },
  mfg: {
    noun:"Industrial",
    desc:"We assess opportunity, circular-economy maturity, equipment demand, and customer satisfaction across manufacturing. Market intelligence that guides industrial growth and operations.",
  },
  health: {
    noun:"Healthcare",
    desc:"We support medtech go-to-market, AI drug development, advanced therapies, and consumer health insight. Research that accelerates evidence-led decisions across the care continuum.",
  },
};
