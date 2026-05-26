
import { useState, useEffect, useRef } from "react";
import logoSrc from "./assets/netscribes-logo.png";

const THUMBNAILS = {
  content: {
    "Whitepapers": "/thumbnails/content/thought_leadership/Whitepaper.jpg",
    "POVs": "/thumbnails/content/thought_leadership/POV.jpg",
    "Blogs": "/thumbnails/content/thought_leadership/TL_Blog.jpg",
    "eBooks": "/thumbnails/content/thought_leadership/ebook.jpg",
    "Case Studies": "/thumbnails/content/short-form/Case_Study.jpg",
    "Emailers": "/thumbnails/content/short-form/Emailer.jpg",
    "Video Scripts": "/thumbnails/content/short-form/Video_Script.jpg",
    "Brochures": "/thumbnails/content/short-form/brochure.jpg",
  },
  gtm: {
    "GTM": "/thumbnails/GTM/GTM.jpg",
    "Industry Analysis": "/thumbnails/GTM/Industry Analysis.jpg",
    "Competitive Benchmarking and Account Intelligence": "/thumbnails/GTM/Competitive Intelligence & Benchmarking.jpg",
    "Consumer Research": "/thumbnails/GTM/Consumer Research.jpg",
    "AI Readiness Assessment": "/thumbnails/GTM/AI Readiness Assessment.jpg",
  },
  design: {
    "Infographics": "/thumbnails/design/Infographics.jpg",
    "PPT": "/thumbnails/design/PPT.jpg",
    "Report Designs": "/thumbnails/design/Report design.jpg",
    "Event Based Assets": "/thumbnails/design/Event based assets.jpg",
    "Print Publications": "/thumbnails/design/Print publications.jpg",
    "Web Banners": "/thumbnails/design/web-banner.jpg",
  },
  videos: {
    "Motion Graphics": "/thumbnails/video/Motion graphics.jpg",
    "Motion Graphics with Character Animation": "/thumbnails/video/Motion graphics.jpg",
    "Footage / Image-Based": "/thumbnails/video/Footage-Image based.jpg",
    "Reels & Shorts": "/thumbnails/video/Reels and shorts.jpg",
    "Podcasts": "/thumbnails/video/Podcast.jpg",
    "Podcast / Thought Leadership Interviews": "/thumbnails/video/Podcast.jpg",
    "Training Videos": "/thumbnails/video/Training videos.jpg",
    "Whiteboard Animations": "/thumbnails/video/Whiteboard animation.jpg",
    "Character Animations": "/thumbnails/video/character_animation.jpg",
  },
  social: {
    "Static Posts": "/thumbnails/social/Static post.jpg",
    "Carousels": "/thumbnails/social/Carousel.jpg",
    "GIFs": "/thumbnails/social/GIFs.jpg",
    "Teasers": "/thumbnails/social/Teaser.jpg",
    "Memes": "/thumbnails/social/Memes.jpg",
    "Corporate Comics": "/thumbnails/social/Corporate comics.jpg",
  },
};

function getThumbnail(category, format) {
  return THUMBNAILS[category]?.[format];
}


/* ──────────────────────────────────────────────────────────────────
   Netscribes Showcase — tile-based microsite
   ────────────────────────────────────────────────────────────────── */

// ─── Brand tokens ────────────────────────────────────────────────
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

// ─── Data ─────────────────────────────────────────────────────────

const CATS = [
  { id: "content", num: "01", label: "Content",         color: NS.blue,     tag: "Editorial",   blurb: "Whitepaper | Blogs | PoV | eBooks | Emailers | Case Studies | Brochures | Scripts" },
  { id: "gtm",     num: "02", label: "Insights",        color: NS.blueSoft, tag: "Strategy",    blurb: "GTM | Competitive & Account Intelligence | Brand & Consumer Insights | AI Readiness" },
  { id: "design",  num: "03", label: "Design",          color: NS.red,      tag: "Visual",      blurb: "Infographics | PPT | Report | Banners | Events Creatives | Print Publications" },
  { id: "videos",  num: "04", label: "Videos",          color: NS.redDeep,  tag: "Motion",      blurb: "Motion Graphics | Stock Footage | Reels & Shorts | Podcasts | Training | Animation" },
  { id: "social",  num: "05", label: "Social Media",    color: NS.blueDeep, tag: "Distributed", blurb: "Static Posts | GIFs | Teasers | Memes | Carousels | Corporate Comics" },
];

const CAT_BY_ID = Object.fromEntries(CATS.map(c => [c.id, c]));

const INDUSTRIES = [
  { id: "tech",    label: "Technology & Software" },
  { id: "auto",    label: "Automotive" },
  { id: "telecom", label: "Telecommunication" },
  { id: "bfsi",    label: "BFSI" },
  { id: "mfg",     label: "Manufacturing" },
  { id: "health",  label: "Healthcare" },
  { id: "retail",  label: "Retail & E-commerce" },
];

function driveFile(id) {
  return {
    driveEmbedUrl: `https://drive.google.com/file/d/${id}/preview`,
    driveViewUrl:  `https://drive.google.com/file/d/${id}/view`,
  };
}

const CURATED = {
  content: {
    "Whitepapers": [
      { title: "Augmented Analytics & the Digital Automotive Space", desc: "Thought leadership paper on how augmented analytics is reshaping OEM strategy and the connected-car ecosystem.", industry: "auto", ...driveFile("1fKIm4sSLQWWu2dyL9He0GVrGobBmuWUj") },
      { title: "New Cybersecurity Requirements for Supply Chains", desc: "Deep-dive whitepaper on post-COVID cybersecurity mandates across global supply chain verticals.", industry: "tech", ...driveFile("1FXF1JK7xJyaAUp2aR7kpdjWEhxKfqwkB") },
      { title: "Building Cyber Resilience and Data Integrity into Supply Chains", desc: "Enterprise whitepaper examining third-party breach vectors and frameworks for supply chain cyber resilience.", industry: "mfg", ...driveFile("1TARJXanFpUGcNOFOemRLSe_KOKy7y7fH") },
      { title: "Custodians of Digital Experience: Communications Service Providers", desc: "Whitepaper on how telcos can own the end-to-end digital customer experience in a 5G world.", industry: "telecom", ...driveFile("1kDd-Ad9Rg2CuLJ0DbRyzTO9cuVhiEcU2") },
      { title: "The Quantum Leap in Automotive Simulation", desc: "Whitepaper on how quantum computing is transforming automotive simulation — crash testing, aerodynamics, and EV battery optimisation at scale.", industry: "auto", ...driveFile("1pmW2AT2Uo4LLK_FC_CjCJtts-n0_4w8e") },
      { title: "ESG vs EHS: A Modern Supply Chain Conundrum", desc: "Whitepaper examining the tension between ESG reporting requirements and EHS compliance across global supply chains — frameworks, risks, and reconciliation strategies.", industry: "mfg", ...driveFile("1YbBQqNzudAzitKDZxcrUxXCAgxDr9clp") },
      { title: "Digital Life Insurance: The Blockchain Opportunity", desc: "Whitepaper exploring how blockchain technology is reshaping digital life insurance — smart contracts, fraud reduction, and transparent claims processing.", industry: "bfsi", ...driveFile("1NXky9U-mFMvxL2lik85imBSEHGVFokJn") },
      { title: "Commercial Payer Marketplace: A Strategic Overview", desc: "Whitepaper analysing the commercial health insurance payer landscape — competitive dynamics, member retention, and digital-first service models.", industry: "health", ...driveFile("1G9AS3bBaN782JOD4BKyEwI-kKWpYqdVE") },
      { title: "Women in Supply Chain: Closing the Leadership Gap", desc: "Whitepaper on gender diversity in supply chain leadership — benchmarks, barriers, and best practices for building inclusive procurement and logistics organisations.", industry: "mfg", ...driveFile("19tiDSgMGxnaAI97JHFA3wkJUARxLp-po") },
      { title: "Structuring Unstructured Data", desc: "Whitepaper on enterprise strategies for extracting value from unstructured data — NLP, AI classification, and governance frameworks.", industry: "tech", ...driveFile("1ZKW4NFsDJRIyxL2W0b49tRDuATuP81L7") },
      { title: "Addressing Labor Shortage in Manufacturing", desc: "Whitepaper on workforce scarcity challenges in manufacturing — automation strategies, upskilling pathways, and workforce planning frameworks.", industry: "mfg", ...driveFile("1uy2fcTWeHc1sap1bi0blrVfgN5c2VLpQ") },
      { title: "Cyber Security: Threat Hunting Strategies", desc: "Whitepaper on proactive threat hunting — methodology, tooling, and SOC integration for enterprise cybersecurity teams.", industry: "tech", ...driveFile("189_O1vqAIG-hLgGPT9XnJce6-KLU-bny") },
      { title: "Innovation and Cost-Effectiveness with CMMS", desc: "Whitepaper on computerised maintenance management systems — cost reduction, asset lifecycle optimisation, and ROI benchmarks.", industry: "mfg", ...driveFile("1PcVDjFpYB7kVM_MwkMBPKjeSxRwxfkhn") },
      { title: "AI in Life Sciences: Transforming Drug Discovery and Care", desc: "Whitepaper on artificial intelligence applications across life sciences — accelerating R&D, clinical trials, and personalised medicine.", industry: "health", ...driveFile("1gS7PXgSAt1k-nm2USK-8fK5GbAp80x8w") },
      { title: "Conflicting Jurisdictions in Global Supply Chains", desc: "Whitepaper on managing cross-border regulatory conflicts — compliance frameworks, risk mitigation, and international trade law considerations.", industry: "mfg", ...driveFile("1nemRetP3y3D7ZxlWXgoscZewDyap0h6q") },
      { title: "Power of Analytics to Minimise Supply Chain Risks", desc: "Whitepaper on analytics-driven supply chain risk management — predictive models, scenario planning, and resilience metrics.", industry: "mfg", ...driveFile("1ppIvfxNtDP5JOqFeLgdN1xnbQH8SKqgv") },
      { title: "Minimise Incidents and Injuries at the Workplace", desc: "Whitepaper on workplace safety improvement programmes — IoT monitoring, incident analytics, and zero-harm culture frameworks.", industry: "mfg", ...driveFile("1kDd-Ad9Rg2CuLJ0DbRyzTO9cuVhiEcU2") },
      { title: "Trade Tariffs and Global Supply Chain Strategy", desc: "Whitepaper on navigating tariff volatility — sourcing diversification, nearshoring options, and cost modelling for procurement leaders.", industry: "mfg", ...driveFile("1TbcE1kQ2-iHFEYq_0TQJ9-pXlL4vwH3V") },
      { title: "Parenting in the Digital Age", desc: "Whitepaper on digital wellbeing for families — screen time research, parental controls, and raising digitally responsible children.", industry: "tech", ...driveFile("1zUlORAKnGQwuROzNfUhIt7EBMkjYiIpL") },
      { title: "Teaching in the Digital Age", desc: "Whitepaper on edtech-driven pedagogical transformation — hybrid learning, digital literacy, and outcomes-based assessment frameworks.", industry: "tech", ...driveFile("1JT7ekgezmLvcSosGlWjHDdaf62GfBpd7") },
      { title: "Preparing Your Workplace for the Opioid Crisis", desc: "Whitepaper on workplace opioid policies — employee assistance programs, safe return-to-work frameworks, and employer legal obligations.", industry: "health", ...driveFile("1kcaukWujSkxdpc07iHzopJPlTjYhWzL2") },
      { title: "The Future of Customer Onboarding", desc: "Whitepaper on digital-first customer onboarding — identity verification, KYC automation, and omnichannel journey design.", industry: "bfsi", ...driveFile("1M44TNZ4xikUr46Nr_NJU0XOqJqJAXT3p") },
    ],
    "POVs": [
      { title: "Over The Top Services: New Business Models", desc: "Executive POV on OTT's impact on telecom revenue, cord-cutting culture, and emerging commercial models.", industry: "telecom", ...driveFile("1KdrrjLwsAXJ0caKmlZk6BWVHeVjILqxg") },
      { title: "Smart Plants: Transforming Your Plant with Optimal ROI", desc: "POV on the Industry 4.0 journey to smart manufacturing — IIoT, cyber-physical systems, and phased ROI.", industry: "mfg", ...driveFile("1D7OVQhk3Jn9E6cE6Jgi-W_E6Llb2Yxgk") },
      { title: "The Market of One: Involving Customers to Deliver Unique Value", desc: "Manufacturing POV on mass customisation strategies, from engineer-to-order to AI-driven recommendation systems.", industry: "mfg", ...driveFile("1pgiZMxTdSTEdbXQ78cIOfi4F9WrrQMbm") },
      { title: "Shaping Retail of the Future", desc: "POV on how data, experience design, and omnichannel strategies are redefining retail for the next decade.", industry: "retail", ...driveFile("1AMlejZaIGxORHa_7yImz9JmmE1KQy1sc") },
      { title: "Enabling Condition Monitoring at Scale", desc: "POV on deploying IoT-based condition monitoring across industrial assets — reducing unplanned downtime and shifting to predictive maintenance models.", industry: "mfg", ...driveFile("1Tjokdxr4l9g5UcfgbF_BdoezOIkh19al") },
      { title: "Cloud Smart: A Strategic Framework for Enterprise Cloud Adoption", desc: "POV on moving beyond lift-and-shift to cloud-native architecture — governance, FinOps, and value realisation for enterprise IT leaders.", industry: "tech", ...driveFile("1JqbY38OBamxJMPjU3GXUrv_mhKXdtFcE") },
    ],
    "Blogs": [
      { title: "Towards Green Mobility: How COVID Accelerated EV Adoption", desc: "1,000-word blog on OEM investment case for EVs — incentives, shifting consumer behaviour, and engineering services.", industry: "auto", ...driveFile("1fi50I848zvgZjNgwgPEnC2-Zb-LkTSZ9") },
      { title: "Telecom: OpEx vs CapEx Considerations for FinOps", desc: "Thought leadership blog for telco cloud leaders on governing cloud spend through FinOps and CoE models.", industry: "telecom", ...driveFile("1J18THPkenCv12jJugm4faKGiD3geLq8M") },
      { title: "The IoT Powerhouse: A Game Changer for Retail and CPG", desc: "Blog exploring IoT use cases in retail — smart inventory, supply chain transparency, and the connected store.", industry: "retail", ...driveFile("15crBWTOsoAiVB8YdpreDMORets0hHvN_") },
      { title: "Evolution of Engineering Services and Outsourcing in Europe", desc: "Analysis of pandemic-driven digitalisation reshaping ESP roles and OEM outsourcing in European auto and aerospace.", industry: "auto", ...driveFile("1No-QXoFm-Txma2v2IQM17Ztl32I3uP3l") },
      { title: "Value-First Transformation: Blueprint for P&L Impact", desc: "Sanitised article on aligning ERP transformations to business outcomes from day one.", industry: "tech", ...driveFile("1G9GhIj_lll_j7RQ-t_yNkAKoQU7l2Ry5") },
      { title: "SD-WAN in Public Healthcare: A Connected Future", desc: "Blog on SD-WAN adoption across public health networks — improving clinical connectivity, telemedicine delivery, and network resilience.", industry: "health", ...driveFile("1yxIHpXKC0o6T6fSUYHt7-gbq-t2Y5HKi") },
      { title: "Autonomous Cars and the Consumer Trust Challenge", desc: "Blog exploring consumer attitudes toward self-driving vehicles — safety perceptions, adoption barriers, and OEM communication strategy.", industry: "auto", ...driveFile("16u7Ywi7R7Hkefmrncx5EwM2F4lC7WkW_") },
      { title: "IoT Transforming Retail and CPG Operations", desc: "Blog on IoT-driven transformation in retail and consumer goods — smart shelves, demand sensing, and connected supply chain visibility.", industry: "retail", ...driveFile("1jt1d9RB35ixAyQxz8EWbpDtOcZUuBPP8") },
      { title: "ABC Leveraging Blockchain for Supply Chain Transparency", desc: "Article on blockchain deployment for end-to-end supply chain traceability — provenance verification, smart contracts, and regulatory compliance.", industry: "mfg", ...driveFile("12aEzWzQmSsBCYrZ4oNh4DydJdra13Qt8") },
      { title: "IoT for Smart Cities and Happy Citizens", desc: "Blog on how IoT infrastructure is enabling smarter urban environments — mobility, utilities, public safety, and citizen experience.", industry: "tech", ...driveFile("1m5Dz3BX7ksbA0usZG03mrrtDSDg0I9c4") },
      { title: "Multi-Currency Forex Travel Cards: The Smart Way to Travel", desc: "Article on multi-currency travel cards — fee structures, currency conversion rates, and best-use scenarios for frequent travellers.", industry: "bfsi", ...driveFile("18mz9CxdSPwjGR8jW96ogFkCN8j1JhIHi") },
      { title: "Women in Leadership: Stories That Inspire", desc: "Article featuring women leadership narratives — career journeys, challenges overcome, and strategies for building inclusive organisations.", industry: "tech", ...driveFile("1gaaaFzYehIuRTKFEvwks8dKUou2QtbZ6") },
      { title: "Why Leadership Training Programs Matter", desc: "Blog on the business case for structured leadership development — ROI, retention impact, and programme design principles.", industry: "tech", ...driveFile("1nlS3NKu6THP8iZRjv6n4Lv6TIyvIJTw8") },
      { title: "IoT and Measurement of ROI", desc: "Blog on building ROI frameworks for enterprise IoT deployments — metrics, payback periods, and value realisation strategies.", industry: "tech", ...driveFile("1Pz9ca6xFYFhjy63FKJBHmhg5ZskbnG0d") },
      { title: "AI in Filmmaking: The Creative Frontier", desc: "Blog on how AI is entering media production — generative visuals, script analysis, and editorial automation in film and media.", industry: "tech", ...driveFile("1JqS613YxsxYtVaT2nEnULeDJiJZJchOk") },
      { title: "Archiving and Storing Data: Best Practices", desc: "Blog on enterprise data archival strategies — tiered storage, cloud archiving, compliance, and retrieval performance.", industry: "tech", ...driveFile("109UzyyF35zn_n-a9Ax8tV8AsUNY19Rpe") },
      { title: "Apparel & Fashion Manufacturers: Embracing Industry 4.0", desc: "Blog on how fashion and footwear manufacturers are adopting smart factory technologies — PLM, automation, and sustainable production.", industry: "mfg", ...driveFile("1u4DduF-JVcZDu5kYzmx_NOAaGdEdZobl") },
      { title: "Cannabis in the Workplace: Policy and Compliance", desc: "Blog on navigating cannabis legalisation for employers — policy frameworks, impairment testing, and duty-of-care obligations.", industry: "health", ...driveFile("16yRInstQEu7CaI3rIEnDUFt_5YTyGqc8") },
      { title: "Mentors and the Future Workforce: A Guide", desc: "Blog on structured mentoring programmes — matching strategies, outcome measurement, and building mentoring cultures.", industry: "tech", ...driveFile("1UfXzUpZmnZSc5lCVqMCvKnhEZU2pPIFc") },
      { title: "Career Success Through Diversity: A Story", desc: "Article on diversity-driven career progression — inclusive hiring, sponsorship programmes, and workplace belonging.", industry: "tech", ...driveFile("1mklm-XYLtt8OC9Y1eb4IU6GQgM0nmMvu") },
      { title: "Introduction to Trading Psychology", desc: "Blog on behavioural finance for traders — cognitive biases, emotional discipline, and decision-making frameworks for investors.", industry: "bfsi", ...driveFile("1emoKjlqMgk1zkerTAT_f9TTobKNjCScN") },
      { title: "How to Buy Gold Bonds Online", desc: "Blog on sovereign gold bond investments — purchase process, tax implications, and comparison with physical gold for retail investors.", industry: "bfsi", ...driveFile("171vo-e1ryPadAWueZirbovin6T59SDhW") },
      { title: "Intraday Trading Strategies for Active Investors", desc: "Blog on intraday trading approaches — technical analysis, risk management, and tools for short-term equity market participants.", industry: "bfsi", ...driveFile("179zA5Q6ExnBRcomvM8w6-HE6O0Wawhay") },
      { title: "How to Invest in Direct Mutual Funds", desc: "Blog on direct plan mutual fund investing — cost savings over regular plans, platform options, and portfolio construction tips.", industry: "bfsi", ...driveFile("1AA_dWL7efMCQMpnF0ki5vUPgZBOILTY1") },
      { title: "How to File ITR as a Freelancer", desc: "Blog on income tax return filing for freelancers — deduction claims, advance tax obligations, and step-by-step filing guidance.", industry: "bfsi", ...driveFile("1_ukR8RECof1GFfxbtoq9K33SuqYAfS7o") },
      { title: "Old vs New Tax Regime: Which Is Better?", desc: "Blog comparing India's old and new tax regimes — slab differences, deduction eligibility, and break-even analysis for different income levels.", industry: "bfsi", ...driveFile("1VPCNBbxa-Cw6oYdAEjV0XqNc_OIkRtgZ") },
      { title: "Automotive Top Hat Engineering: Trends and Insights", desc: "Blog on body-in-white and top hat design trends in automotive engineering — lightweighting, platform sharing, and EV body architecture.", industry: "auto", ...driveFile("1kK6Rqv_RV7pAkxmPI6hFVXcSqeSYfrqo") },
      { title: "Intelligent Interactions: The Future of Customer Engagement", desc: "Article on AI-powered customer interaction platforms — conversational AI, sentiment analysis, and omnichannel experience design.", industry: "tech", ...driveFile("163KKaSN5vnzqrPscBz5qXhfSKL58GG-9") },
      { title: "What to Sell Online: A Strategic Guide", desc: "Blog on profitable e-commerce product selection — demand research, margin analysis, and category trends for online sellers.", industry: "retail", ...driveFile("1Zxoc79rPkPf7yTUhLEq9YNzU_SF3vxUc") },
      { title: "Music Concerts: A Guide to Attending Live Events", desc: "Article on the live events and concerts landscape — booking strategies, artist trends, and fan experience insights.", industry: "retail", ...driveFile("1NdC-bkIwRFIO3YOI1dZU2l2ZC042HOaw") },
      { title: "Cinema, Bollywood and the Lifestyle Economy", desc: "Article exploring Bollywood's cultural and commercial influence — content trends, digital platforms, and lifestyle crossovers.", industry: "retail", ...driveFile("17tXROqO7LpS7sD4yhTKXzECqvK-Xw4h-") },
      { title: "Comic Con, Whisky and the Pop Culture Economy", desc: "Article on the intersection of pop culture events and premium consumer categories — fandom, brand activations, and experiential marketing.", industry: "retail", ...driveFile("1jygUA1hE464QoVXOSsSjA0KIRocXfeP3") },
    ],
    "eBooks": [
      { title: "Thought Leadership eBook: The Future of Healthcare", desc: "Full-length designed eBook on digital health, precision medicine, and the next decade of healthcare delivery.", industry: "health", ...driveFile("1wdUpR8X9YZ2Dd4bhL56Veyph8l3evcKj") },
      { title: "Thought Leadership eBook: IoT and Logistics", desc: "eBook exploring IoT-enabled visibility, predictive maintenance, and last-mile optimisation across logistics networks.", industry: "mfg", ...driveFile("1Vvuq80dY3_P0G9yH1fRDtGluQeTVNJeH") },
      { title: "Thought Leadership eBook: Digital Twins", desc: "Comprehensive guide on deploying digital twin technology in manufacturing and smart infrastructure.", industry: "tech", ...driveFile("1mov4NqP0_DC8jOr6JygM5fn8ObkPS_7F") },
      { title: "Thought Leadership E-Book: Intelligent Process Automation", desc: "Strategic eBook on combining RPA, AI, and analytics for end-to-end intelligent automation programs.", industry: "tech", ...driveFile("1KLIRrMmpPgoIyoC2m5f3GCFxT-KoAp0z") },
      { title: "Engineering Innovation at Scale", desc: "eBook exploring how engineering-led companies are scaling innovation — digital engineering, product lifecycle management, and platform-based development.", industry: "mfg", ...driveFile("1p-J_vSqcOCQAJ322rbn6_JY-6emSAPwl") },
      { title: "The Connected Worker: eBook for Manufacturing Leaders", desc: "eBook on connected worker platforms — wearables, AR-assisted maintenance, and digital skills development for the factory floor.", industry: "mfg", ...driveFile("1OYzkQWx6-xlTXkw5_z88_uaQJBNDgpnW") },
      { title: "Elevating Virtual Event Experiences in Life Sciences", desc: "eBook on next-level webinar and virtual event strategies for pharma and life sciences — engagement models, compliance considerations, and HCP outreach.", industry: "health", ...driveFile("1KnWkQ7Z16RSYmHRZkTGK93Z3BoqTSQEx") },
      { title: "Edge Computing: The Next Frontier", desc: "eBook on the business case for edge computing — latency-sensitive applications, industrial IoT deployments, and the convergence of edge and cloud architectures.", industry: "tech", ...driveFile("1Pchu-UbCarVbDnXMSq7IwPDuTT7TyUX7") },
      { title: "Connecting the Shop Floor to the Top Floor", desc: "eBook bridging operational and executive perspectives on smart manufacturing and real-time data flows.", industry: "mfg", ...driveFile("1z2DS31jqES8p_URmR2n2XkMDS5cu7Aqg") },
    ],
    "Emailers": [
      { title: "Fintech Email Newsletter: Life Insurance Market Intelligence", desc: "Monthly competitive intelligence newsletter for insurance — premium data, bancassurance rankings, and IRDAI updates.", industry: "bfsi", ...driveFile("1b7S2waOKatMYZPElkgRrc7eSuV1CaSXP") },
      { title: "Banking E-mailer: Sustainability Report Launch", desc: "HTML emailer announcing a bank's annual sustainability report — hero section, data highlights, and CTA.", industry: "bfsi", ...driveFile("1Me5JfZFCXKIdn-Hid_-uwCbZJ5NeCpSr") },
      { title: "Newsletter: 5G Connected Ambulance & Telecom Partnership Updates", desc: "Internal newsletter covering 5G healthcare pilots, NaaS partnerships, and data centre research for a telco.", industry: "telecom", ...driveFile("18yT7QcDTNaLPDC3Q09k5Ux-237H13XDw") },
      { title: "Mailer: Discover Total Supply Chain Visibility", desc: "Demand-gen mailer for a supply chain SaaS — bold hero stat, value proposition, and video CTA.", industry: "mfg", ...driveFile("1sfSJ8ywW4D8ol8tw8tVaeGdwMm4K5Hns") },
      { title: "Newsletter: Workload Automation Quarterly", desc: "Branded newsletter covering workload automation trends, product updates, and industry adoption insights for enterprise IT audiences.", industry: "tech", ...driveFile("1r0EzsXp-OHBDyRbcM7C893Kpnfs9hzC2") },
      { title: "Emailer: Career Insights for Job Seekers", desc: "Multi-design-option emailer presenting career insights and job search strategies — clean layout with strong visual hierarchy.", industry: "tech", ...driveFile("1zvrGAVKbQt4ZuJiTRE6gAAtzaQeRPyZY") },
      { title: "Mailer: Terra's New Age Supply Chain Solution", desc: "Promotional mailer for Terra's next-gen supply chain platform — benefit-forward messaging with bold CTA for logistics and manufacturing audiences.", industry: "mfg", ...driveFile("1lniEkWckjP9WDJH_RUg2S3mJ5EofzeIo") },
      { title: "Newsletter: India Market Intelligence", desc: "Market intelligence newsletter covering business and economic developments across India — structured for investor and analyst audiences.", industry: "bfsi", ...driveFile("1lrpbmhEVVwGlQO8EQrgur1d7K3jsDBPC") },
      { title: "Mailer: CX Customer Success Story", desc: "Client-facing success story mailer highlighting measurable outcomes from a CX transformation engagement.", industry: "tech", ...driveFile("1Q_H-73ozUrkWYAeS76-NXT-UK8QE9JTB") },
      { title: "Emailer: Downloads and Resource Promotion", desc: "Clean demand-gen emailer for promoting gated content downloads — structured layout with clear value proposition and CTA.", industry: "tech", ...driveFile("1qf2W0XDuiMiHwtveNcORGVIXLh2_lHsX") },
      { title: "Emailer: Seller Service Platform", desc: "Retail-focused emailer promoting a seller services platform — feature highlights, onboarding CTA, and marketplace positioning.", industry: "retail", ...driveFile("1lgX2SI2icFhs2YPtaPzgHYCOriHiNfXa") },
      { title: "Emailer: Strong Bond Investment Campaign", desc: "Financial services emailer for a bond investment product — trust messaging, yield highlights, and compliance-friendly CTA.", industry: "bfsi", ...driveFile("10pxLwB9iU3QvwUShpR6bPv2SorLZCaVS") },
      { title: "Emailer: Partnership Forum Registration", desc: "Event-driven emailer driving registrations for a business partnership forum — agenda highlights, speaker teaser, and registration CTA.", industry: "tech", ...driveFile("1wXU78qrPn-Nv0CiDHWH_8pAnUeAJcsCn") },
      { title: "Press Release: Bank Account Conversion Campaign", desc: "Press release-style emailer announcing a bank's account conversion programme — clear customer action required and benefit messaging.", industry: "bfsi", ...driveFile("1MsIqWzf1voYqFt049x7sEb4aKnsxBduN") },
    ],
    "Case Studies": [
      { title: "Terra Helps Scottish Compressed Air Specialist Standardise H&S", desc: "4-page case study on how a compressed air company achieved supply chain compliance and H&S certification.", industry: "mfg", ...driveFile("18mcP0jQts8BWgKbZwJiSUwHD0OHR9L6h") },
      { title: "French Oil & Gas Major Enables Real-Time Business Flow Observability", desc: "Case study on deploying iControl to eliminate manual monitoring gaps and proactively flag pipeline outages.", industry: "mfg", ...driveFile("1B2KCM9XCBvo9GG-IXBhepgHWtyGHPa1A") },
      { title: "Oil & Gas — Operational Intelligence Case Study", desc: "Detailed case study on real-time business flow observability for a major French oil and gas operator — full delivery narrative with outcomes.", industry: "mfg", ...driveFile("1g2ISgHiZB9WTh4frL5M5J7UrPf_utDj5") },
      { title: "Europe's Largest Airport Improves Operational Efficiency with IoT", desc: "Smart bin monitoring, check-in desk occupancy sensing, and water management at a 44M-passenger airport.", industry: "tech", ...driveFile("1agrcgo_D7Bo5FyjMZ7qbwd8eEX0StdP7") },
      { title: "Digital Transformation: Consumer Goods Case Study", desc: "Delivering immersive consumer experiences across 850+ brand touchpoints in 58 locales.", industry: "retail", ...driveFile("1sRxqlFbCSZn2fZtQs36XBTmUrDbhB_zD") },
      { title: "Workday HR-IT Governance: A Case Study", desc: "Case study on implementing Workday for HR-IT governance — streamlining people operations, payroll compliance, and workforce analytics.", industry: "tech", ...driveFile("1xQdr1fSfxl-FCftHy5CRloUxpAscAwJe") },
      { title: "Airport Facility Management Transformation", desc: "Case study on end-to-end facility management transformation at a major international airport — vendor consolidation, SLA governance, and cost optimisation.", industry: "tech", ...driveFile("1iPwlUMWIWU4Pg40Z1yM0V8eJZxlFC7sF") },
      { title: "Adapting KPIs for Organisational Change", desc: "Case study on how a large enterprise redesigned its KPI framework during a major transformation — aligning metrics to new strategic priorities.", industry: "tech", ...driveFile("1a0NEDWlbV2rjvwyAr84ZmLv2wgm8GPam") },
      { title: "Simplifying Performance Management at Scale", desc: "Case study on rolling out a simplified performance management system across a global workforce — adoption strategy and outcomes.", industry: "tech", ...driveFile("1LtUyHvFhWwF3tyd0ibEZez8_8QYd-vJN") },
      { title: "Performance Management in a Changing Environment", desc: "Case study on adapting performance management frameworks amid rapid organisational change — goal flexibility, continuous feedback, and manager enablement.", industry: "tech", ...driveFile("1qd1Cja2eGDZadre0i8oQ6D8NWp6aHXZY") },
      { title: "Cure-alls for Problematic CRM: Boosting Sales and Profitability", desc: "Case study on CRM optimisation for a sales organisation — data cleansing, adoption improvement, and pipeline visibility gains.", industry: "tech", ...driveFile("18kqLrD6cc76dTkehh4e3qhlLD9ylt-am") },
      { title: "Synchronising Objectives Across Business Units", desc: "Case study on aligning OKRs across a complex enterprise — cross-functional goal cascading and accountability frameworks.", industry: "tech", ...driveFile("1NErRww2i_7wLgHb_kKMV07gfqv6ke0N1") },
      { title: "Cushman & Wakefield: Customer Success Story", desc: "Customer success story on real estate and facilities management transformation — workspace analytics, lease optimisation, and portfolio intelligence.", industry: "retail", ...driveFile("1OAJq8hipceRHPdTx4Dd8lJNkuO7WTtTQ") },
      { title: "Cohesive Planning Boosting Profitability", desc: "Case study on integrated business planning implementation — connecting finance, supply chain, and commercial teams for margin improvement.", industry: "mfg", ...driveFile("1o1dyM4zRXNTi8CC4aiQPR0kiLkUYPCGZ") },
      { title: "Improving Customer Care for Automotive Manufacturer", desc: "Case study on overhauling customer care and ticket lifecycle management for an OEM — SLA reduction, CSAT improvement, and workflow automation.", industry: "auto", ...driveFile("1gosp2P8rdIkWs5i7HaibesIuhjT7cKx5") },
      { title: "Customer Success Story: IoT for EV Fleet Management", desc: "IoT-enabled EV fleet monitoring case study — battery health analytics, remote diagnostics, and predictive maintenance outcomes.", industry: "auto", ...driveFile("1BmdtOF-qEXSRO75TxIOuPe6qpQVNXU5T") },
      { title: "XYZ Gas: Customer Success Story", desc: "Utility sector case study on operational transformation for a gas distribution company — field force automation, safety compliance, and network optimisation.", industry: "mfg", ...driveFile("11mgiAnFBOU6JhQVyN9NFBxC8OOckOoXQ") },
    ],
    "Video Scripts": [
      { title: "Video Script: RPA Testimonial — CFO Office", desc: "Fully blocked 60s testimonial script for an RPA deployment in a global technology firm's finance function.", industry: "tech", ...driveFile("1lxr04nr7GJKnj_lJ_wWzP8RhNIcCDNLR") },
      { title: "Video Script: Explainer for Cognitive Process Automation", desc: "Animated explainer script with scene-level visualization directions for a CPA / AI+RPA product.", industry: "tech", ...driveFile("1J6lm-WcCzp4GCKSheO-4j3k2-U9cIXpj") },
      { title: "Video Script & Visualization: Procurement", desc: "Motion-graphic script with detailed visual directions for a supply chain procurement explainer.", industry: "mfg", ...driveFile("1fZ03ybEle3yfzXmY6jByO3Eklrbd7S9T") },
    ],
    "Brochures": [
      { title: "Brochure: IT Services Delivery Center", desc: "Corporate brochure for an IT services delivery centre — capabilities overview, engagement models, and value proposition for enterprise clients.", industry: "tech", ...driveFile("1N-b6nxkdTi4-bPEAGP1VOoQd4HOY4Wg5") },
      { title: "Brochure: Netscribes Intelligence Store — Premium Technology Analysis (A)", desc: "Product brochure for the Netscribes Intelligence Store — positioning, coverage areas, and subscription tiers for technology research buyers.", industry: "tech", ...driveFile("1zgM_qZXSagPFyR4NsZuUWMr9-NjdXrnN") },
      { title: "Brochure: Netscribes Intelligence Store — Premium Technology Analysis (B)", desc: "Alternate design variant for the Netscribes Intelligence Store brochure — updated layout with expanded use case sections.", industry: "tech", ...driveFile("1OUvBWShOq3w4Am4Pn9MiMUL_72JpBUXE") },
      { title: "Brochure: Automotive Engineering Services", desc: "Capabilities brochure for an automotive engineering services provider — ADAS, electrification, and embedded systems service lines.", industry: "auto", ...driveFile("1aB9ZDrNnDgBLivesN4qcBi8wfX3UoWYT") },
      { title: "Brochure: eMobility Twin Architecture", desc: "Technical brochure on a digital twin platform for eMobility — real-time vehicle simulation, battery modelling, and fleet analytics.", industry: "auto", ...driveFile("1up-cZulF6lA27isdnrCZZbXnFe4KbFE7") },
      { title: "Brochure: V2V Solution", desc: "Product brochure for a vehicle-to-vehicle communication solution — safety use cases, connectivity architecture, and OEM integration.", industry: "auto", ...driveFile("1ZmJPM6V87rMIMPPznMSZHA3eYMqixJEi") },
      { title: "Brochure: Automotive Cybersecurity", desc: "Capabilities brochure on automotive cybersecurity services — threat modelling, ECU hardening, and ISO/SAE 21434 compliance.", industry: "auto", ...driveFile("1aRcPYFQL7H88k3XsXggk1GRemgrKHSug") },
      { title: "Brochure: Convenience Store Analytics", desc: "Solution brochure for a retail analytics platform targeting convenience store operators — footfall, basket size, and planogram optimisation.", industry: "retail", ...driveFile("1ij5BcfwjvCLcDDxj9SwJNFhwdTsN8XMe") },
      { title: "Brochure: Data De-Identification Service", desc: "Service brochure on data de-identification and privacy engineering — compliance with GDPR, HIPAA, and enterprise data governance frameworks.", industry: "health", ...driveFile("1Hu-DqNWYltwJrHrt99r_M-g-pxutNlub") },
      { title: "Brochure: Business Flow Observability Solution", desc: "Product brochure for an iControl-based business flow observability platform — real-time monitoring, anomaly detection, and ops integration.", industry: "mfg", ...driveFile("11hniIUaa9Ahr7I26ehBI8CKBKexLCfAS") },
      { title: "Employee Handbook: Digital Direct Life Insurance", desc: "Designed employee onboarding brochure for a digital life insurance company — product overview, benefits, and culture messaging.", industry: "bfsi", ...driveFile("1kF7O0qqS6ip7Gjy3YxAgXPO5CrjBozNp") },
      { title: "Product Brochure: Worker Competency Management", desc: "Brochure for a workforce competency management platform — skills tracking, certification compliance, and performance benchmarking.", industry: "mfg", ...driveFile("1FpQwUnAekd_lNNtX9CU6odR_tse5ZMp-") },
      { title: "A+ Content: Vya Naturals", desc: "Amazon A+ content brochure for a natural personal care brand — ingredient storytelling, visual hierarchy, and conversion-optimised copy.", industry: "retail", ...driveFile("13PuRaK_Us9Nck4ZBcT29eThe2IQRhZAY") },
      { title: "Investor Docket: Engineering Sector", desc: "Investor-facing brochure for an engineering company — financials snapshot, growth narrative, and sector positioning for capital raise.", industry: "mfg", ...driveFile("1YHwswMdRZ7jewdFSN1S7XrE7-42x0lIm") },
      { title: "eBrochure: Azure Apps Modernisation", desc: "Digital brochure on cloud application modernisation with Azure — migration pathways, service models, and ROI scenarios.", industry: "tech", ...driveFile("1uC9eFnu_eShnupbo3zpDflUaYKq55NLg") },
      { title: "Datasheet: Key Management Services", desc: "Technical datasheet on enterprise key management — encryption standards, compliance coverage, and integration architecture.", industry: "tech", ...driveFile("1QYG0c5zpw0QJ9-9_Wi3ufb9O7aWIFxFQ") },
      { title: "Report: Emerging Trends in Blockchain and Finance", desc: "Research brochure on blockchain applications in financial services — DeFi, CBDC, cross-border payments, and regulatory landscape.", industry: "bfsi", ...driveFile("1KbP0wy1jLSF5DTN00bFgvIDtzz6-NAfD") },
      { title: "Survey Report: Finance & Management Reporting", desc: "Research survey report on enterprise finance and management reporting practices — benchmarks, tooling, and process maturity across organisations.", industry: "bfsi", ...driveFile("1597R2c7j2uozhcZyrlTvVSuea5tkhW7X") },
      { title: "Survey Report: Finance Data & Analytics", desc: "Research survey report on the state of finance data and analytics — maturity assessment, key challenges, and technology adoption insights.", industry: "bfsi", ...driveFile("1EiGBG_7uXdLd8lRpgXfryMV-I2DZoUAs") },
      { title: "SlideShare: Multi-Modal Insurance", desc: "SlideShare-format presentation on multi-modal insurance delivery models — consumer trends, channel mix, and digital-first distribution.", industry: "bfsi", ...driveFile("15O5QlCaDiJLjm6VYQ1ldk7o7RiFk91JO") },
      { title: "PPT Template: Event Design", desc: "Branded PowerPoint event template design — layout versatility demonstrated across agenda, speaker, and data slides.", industry: "tech", ...driveFile("15UeBuvKK4Nxi-4Ia6SfQzcPLo6c5aQKx") },
    ],
  },
  design: {
    "Infographics": [
      { title: "Infographic: Building Next-Gen Enterprise Networks on SD-WAN", desc: "Single-page infographic mapping the architectural benefits of SD-WAN for enterprise telecom decision-makers.", industry: "telecom", ...driveFile("1EtXeb0gxJmHo_ntCPRgFN1-8wU763E9u") },
      { title: "Infographic: Cyber Attack Risk Reduction While Working from Home", desc: "Visually driven infographic on WFH cybersecurity best practices for enterprise IT and tech audiences.", industry: "tech", ...driveFile("1i6j6bkGbcr0DiP-2Mj4Y87Qr3FfWX2wR") },
      { title: "Infographic: Making SME Retailers Future-Ready", desc: "Retail-focused infographic on technology adoption pathways for SME retailers and CPG brands.", industry: "retail", ...driveFile("1r4dRv8NR3sz7ciE12Lh3RG1HbAWIuhL3") },
      { title: "Infographic: How Decision-Makers View KPI Information", desc: "Data-visualisation infographic on how senior leaders consume and act on KPI dashboards — research-backed design for enterprise audiences.", industry: "tech", ...driveFile("1a9EKSJ3OGHKMiOzv99NAyw2A6ch4RGht") },
      { title: "Infographic: KPI Reporting and Decision-Makers", desc: "Companion infographic on KPI reporting cadences and formats preferred by C-suite and operational leaders.", industry: "tech", ...driveFile("1rz2SkLg3fmE9cPfXqSw7KKfV1S8tFQs5") },
      { title: "Infographic: How to Reduce Cyber Attacks During Increased WFH", desc: "Practical cybersecurity infographic for remote-work environments — endpoint protection, phishing awareness, and zero-trust principles.", industry: "tech", ...driveFile("1qOdj1Ihusr6b0y7TDgZ3j2tK6vNWQ_KN") },
      { title: "Infographic: Global Leadership Study", desc: "Visual summary of a global leadership research study — leadership style benchmarks, regional differences, and development priorities.", industry: "tech", ...driveFile("1eg9Wsns9_H-XktJZZryEIEd6n5WKrCH4") },
      { title: "Infographic: EdTech — The Learning Transformation", desc: "Visual overview of the edtech landscape — adoption drivers, market size, and technology trends reshaping education delivery.", industry: "tech", ...driveFile("1xJ6xn-ElUWyhqpRlU0-qwgXKIlVcAQ42") },
      { title: "Infographic: Worker Management Solutions", desc: "Infographic on modern workforce management platforms — scheduling, compliance, and productivity tracking for distributed teams.", industry: "mfg", ...driveFile("14HN36SjSRfHnM3A7pltakBzQWQZKBAvt") },
      { title: "Infographic: Managed WiFi for Enterprise", desc: "Infographic on managed WiFi solutions — coverage architecture, SLA benchmarks, and enterprise deployment considerations.", industry: "telecom", ...driveFile("1Dt3CYW7O9-BUCVLS13zSRv5VeoH-XB3D") },
      { title: "Infographic: Digital Readiness Assessment", desc: "Infographic on enterprise digital readiness scoring — capability benchmarks, maturity levels, and transformation roadmap indicators.", industry: "tech", ...driveFile("1vItiWkEDbAfTfRDQvqhJzTDIl9gaoHRo") },
      { title: "Infographic: Collaboration Tools During COVID-19", desc: "Practical infographic on remote collaboration tooling — platform comparison, adoption tips, and security considerations for distributed teams.", industry: "tech", ...driveFile("12IdPv7VybtYZwpjtsUibwjNNf2sU7EiM") },
      { title: "Infographic: How Organisations Align KPIs to Value Propositions", desc: "Infographic on connecting business value propositions to measurable KPIs — frameworks for strategy execution and performance alignment.", industry: "tech", ...driveFile("1e8zLCt5VBPxMEBq4V45U4I59ZevBVT1j") },
      { title: "Infographic: Facilitating a Stress-Free Work Environment", desc: "Workplace wellbeing infographic — evidence-based strategies for reducing employee stress and building psychological safety.", industry: "tech", ...driveFile("1eaGKBPJE65Fx4-fn2MEI0LbQrqRMM8fz") },
      { title: "Infographic: Millennials and Insurance Survey", desc: "Survey-based infographic on millennial attitudes toward insurance — digital preferences, coverage gaps, and purchase triggers.", industry: "bfsi", ...driveFile("1PaIP5MaZKyjQYOv8j4bnimBUwhEPafWn") },
      { title: "Infographic: Health and Property & Casualty Insurance", desc: "Visual comparison of health vs. P&C insurance market dynamics — premium trends, claims patterns, and regulatory considerations.", industry: "bfsi", ...driveFile("1OGUM-9PuhcbmttoK7Ktg_8ev8ZnGUQHy") },
      { title: "Infographic: BFSI Sector Trends", desc: "Infographic on emerging trends across banking, financial services, and insurance — digital banking adoption, fintech disruption, and regulatory shifts.", industry: "bfsi", ...driveFile("1KlI87Wz8gzkUEPwUc0WiR6ub0KY374be") },
      { title: "Infographic: State of the Market", desc: "Market overview infographic — key industry metrics, competitive dynamics, and growth projections in a visually impactful format.", industry: "tech", ...driveFile("1IWq2TBPC8MLWlcdSUNVVHxVjP91Ln12D") },
      { title: "Infographic: On-Prem to SaaS Migration", desc: "Step-by-step infographic on migrating enterprise workloads from on-premises to SaaS — readiness assessment, migration phases, and success metrics.", industry: "tech", ...driveFile("10S9tunjWVn0dU16B8P7HVT7-_dG0IYZ0") },
      { title: "Infographic: Connected Future — How Cloud Drives Growth", desc: "Infographic on cloud-powered business growth — connectivity benefits, deployment models, and ROI indicators for telecom and enterprise.", industry: "telecom", ...driveFile("1RQl0S-4ww6qEr75e1i4rx6BdIK5t3I4Q") },
      { title: "Infographic: Cyberbullying Awareness", desc: "Educational infographic on online safety and anti-cyberbullying — statistics, warning signs, and intervention strategies.", industry: "tech", ...driveFile("1K9_NZ2s9dSkpmT7yplvvNPHdcp1AD7Fw") },
      { title: "Infographic: Emerging Trends in Blockchain and Finance", desc: "Infographic on blockchain's intersection with financial services — DeFi, asset tokenisation, and institutional adoption milestones.", industry: "bfsi", ...driveFile("1CXrZsKRuKV5elIjuJNLFOaY0Gyf4U2iS") },
      { title: "Infographic: Collectibles for Chinese New Year", desc: "Retail and luxury infographic on limited-edition collectibles tied to Chinese New Year — market sizing, buyer behaviour, and brand opportunities.", industry: "retail", ...driveFile("1_NBEoh6bRgvqzHVQ7SEIuErHX4PRlP4t") },
    ],
    "PPT": [
      { title: "SlideShare: Transforming to an Agile Supply Chain", desc: "Designed slide deck on supply chain agility — frameworks, KPIs, and case illustrations for manufacturing leaders.", industry: "mfg", ...driveFile("1W_MZkboku-S06z65gtOLpsLDmzpaG50n") },
      { title: "SlideShare: Multi-Modal Insurance", desc: "Presentation on multi-modal insurance product design and distribution strategy for BFSI decision-makers.", industry: "bfsi", ...driveFile("1eE4c4XanRb0b4SCmKrbk1jdlCcvsEZDH") },
      { title: "SlideShare: AI Across Industries", desc: "Broad-use thought leadership deck on cross-industry AI applications.", industry: "tech", ...driveFile("1SjDvHFFNFSKjcd7C3QlZrpA3T5PfayNq") },
      { title: "SlideShare: IT Capabilities Overview", desc: "Corporate capabilities deck for an IT services provider — service lines, delivery frameworks, and client success highlights.", industry: "tech", ...driveFile("1gKkKQkz1BZe00Uvy9PJx216Kk7PafLOd") },
      { title: "SlideShare: Obamacare and Healthcare Policy", desc: "Policy explainer deck on US healthcare reform — ACA provisions, market impact, and stakeholder implications.", industry: "health", ...driveFile("1E_ByZqDuXQUUsaAJ1R8FXeWum--DbYZB") },
      { title: "SlideShare: Eyesight Case Study", desc: "Visual case study deck on an eyecare brand's digital transformation — patient journey, technology adoption, and outcomes.", industry: "health", ...driveFile("1r6ILJ7X1sObejNem76V0agEG6gLxXjvj") },
      { title: "PPT Template Design: Event", desc: "Branded PowerPoint event template — flexible slide layouts, visual hierarchy, and identity-consistent design for large-format presentations.", industry: "tech", ...driveFile("15UeBuvKK4Nxi-4Ia6SfQzcPLo6c5aQKx") },
      { title: "Survey Summary Report: Financial and Management Reporting", desc: "Designed PPT report on finance function benchmarking — reporting automation, data quality, and CFO priorities.", industry: "bfsi", ...driveFile("1597R2c7j2uozhcZyrlTvVSuea5tkhW7X") },
    ],
    "Report Designs": [
      { title: "Survey Summary Report: Enterprise Content and Collaboration in the Cloud", desc: "Research report with designed data visualisation on cloud adoption patterns across enterprise content management.", industry: "tech", ...driveFile("1hkUIVi9f2vWqkW6wj3DqV2-xIqidRNYF") },
      { title: "Survey Summary Report: Supply Chain Analytics", desc: "Benchmarking report on supply chain analytics maturity and technology investment priorities.", industry: "mfg", ...driveFile("1DzgOtgBYFxOWT2s5VOBnT-NVLF9CXfrp") },
      { title: "Report: ConnEurope — Connected Future", desc: "Designed research report on connectivity trends and digital infrastructure development across Continental Europe.", industry: "telecom", ...driveFile("1hJp0NkK7TmaCZ9sq6MKb3-egI9MOEwUd") },
      { title: "Report: UKI — Connected Future", desc: "Research report on connectivity trends across UK and Ireland — 5G rollout, fibre penetration, and enterprise digital infrastructure.", industry: "telecom", ...driveFile("1qa18H1mlo54hyffZp0PKaVD9MnklcMdN") },
      { title: "Research Report: India PE-VC Funds", desc: "Structured research report on PE/VC fund activity, deals, and sector focus in India.", industry: "bfsi", ...driveFile("1_2bf9IXspRLFymyXkMkVZv21_k9WA5ox") },
      { title: "Report: Hospitality Industry Trends", desc: "Designed research report on post-pandemic hospitality recovery, guest experience innovation, and digital transformation across hotels and resorts.", industry: "retail", ...driveFile("11sr9XbLAX_7s_xkOylqMhGGjctwS0Ldq") },
      { title: "Report: CPG Market Dynamics", desc: "Designed report on consumer packaged goods market trends — private label growth, retail channel shifts, and D2C disruption.", industry: "retail", ...driveFile("1F6gJFYEgMxOXem25oan07DzJj38vsywH") },
      { title: "Survey Summary Report: Procurement Talent", desc: "Research report on procurement talent gaps, skills benchmarking, and workforce development strategies for supply chain leaders.", industry: "mfg", ...driveFile("1lNX_qlatl5tlzP7eN8ABDCNPBCUPmxbO") },
      { title: "Non-Traditional Data Use by Insurers", desc: "Research report on alternative data sources — telematics, social signals, IoT — being adopted by insurers for underwriting and pricing.", industry: "bfsi", ...driveFile("1RvJosTXos1MOVddwe7gmSDcVSYcJNT7d") },
      { title: "Survey Summary Report: Finance Data & Analytics", desc: "Benchmark report on data and analytics maturity in finance functions — tool adoption, talent gaps, and CFO priorities.", industry: "bfsi", ...driveFile("1l62b_71R93kdjHq8X9gEE-RIln3mARkH") },
      { title: "Report: Media and Entertainment Industry Trends", desc: "Designed research report on media and entertainment market dynamics — streaming economics, content investment, and audience behaviour shifts.", industry: "retail", ...driveFile("1xpJKOQeagXS-s5TlnU3uyxu9Gwr7PG4M") },
      { title: "Report: Cloud Technology Survey", desc: "Survey report on enterprise cloud technology adoption — vendor preferences, migration challenges, and hybrid/multi-cloud strategies.", industry: "tech", ...driveFile("1deP8my7qOe-DTZ4g2Iqiw7cj_cBWQv-r") },
      { title: "Theme Paper: A New Frontier in 360° Supply Visibility", desc: "Designed theme paper on end-to-end supply chain visibility — technology enablers, real-time tracking, and decision intelligence.", industry: "mfg", ...driveFile("1oAk5n5eUg2FMXm1jzopP5C6OvOSSlh6A") },
      { title: "Report: Women in Banking", desc: "Research report on gender diversity in the banking sector — leadership representation, pay equity, and inclusive culture programmes.", industry: "bfsi", ...driveFile("1rcaPIivp-_cpisgg4Hu6TY4Aew56BwhQ") },
      { title: "Sustainability Report Design", desc: "Designed corporate sustainability report — ESG metrics, stakeholder messaging, and visual data storytelling for annual reporting.", industry: "tech", ...driveFile("1ZT_jINi9eVEf7S8zrV-wAMz_ci1Mubro") },
      { title: "Report: Millennials and Insurance", desc: "Research report on millennial insurance buying behaviour — digital preferences, product gaps, and distribution channel insights.", industry: "bfsi", ...driveFile("1kFYoQbl99ay8dCMlT5KgeubgotS3mL_Z") },
      { title: "Foundation Report Design", desc: "Designed annual report for a non-profit foundation — programme impact, grant allocation, and stakeholder communication.", industry: "health", ...driveFile("1HC723YQg6IEhA2FslvA2EPLahPyawd2c") },
      { title: "Research Report: Entrepreneurship Landscape", desc: "Structured research report on startup and entrepreneurship ecosystems — funding trends, sector growth, and policy environment.", industry: "bfsi", ...driveFile("1ZdAIoA2yXtWMYPbursqrK7GNmLxNN5g-") },
    ],
    "Web Banners": [
      { title: "Web Banner: Robust Connectivity for Fleet Management", desc: "Digital web banner for a telecom connectivity solution targeting fleet operators — bold headline with clear CTA.", industry: "telecom", ...driveFile("187HBFR9ct1P9HRqAThNk0P-aVdC_7w8h") },
      { title: "Web Banner: Navigating IoT Connectivity Challenges", desc: "Banner for an IoT connectivity platform — industry insight messaging designed for enterprise tech audiences.", industry: "tech", ...driveFile("1fvZ3KkILb0cf-SeoP3OoQLyWRJBtuTdd") },
      { title: "Web Banner: Borderless Global Connectivity for Automobiles", desc: "Automotive connectivity web banner highlighting cross-border network coverage for connected vehicle platforms.", industry: "auto", ...driveFile("1ymv9SOJqgx8O2Z_9eFuP-m8Ye19N8_HM") },
      { title: "Web Banner: Hyperconnected Ecosystem (Variant A)", desc: "Web banner for a telecom/IoT brand promoting a hyperconnected enterprise ecosystem narrative.", industry: "telecom", ...driveFile("1wbcLn1aaK2HgGo_TTGkswi7Gs4lAFlQM") },
      { title: "Web Banner: Hyperconnected Ecosystem (Variant B)", desc: "Alternate web banner design for a telecom/IoT brand promoting a hyperconnected enterprise ecosystem narrative.", industry: "telecom", ...driveFile("1JpMdbAOLy6kooaxueMsi0FnG-Q3gWBBm") },
      { title: "Web Banner: Emailer Design Options", desc: "Multi-format banner and emailer design set demonstrating layout versatility across digital touchpoints.", industry: "tech", ...driveFile("1Ko5epJ-1hwuXwtBemAyujCmATK3kuhHR") },
      { title: "Web Banner: Industry 4.0 with 5G", desc: "Web banner promoting a 5G-enabled Industry 4.0 solution — bold industrial messaging for manufacturing and tech audiences.", industry: "telecom", ...driveFile("1JMscXv_OSgOuEfurX0IPQvu_tjEfUoO-") },
      { title: "Web Banner: Sustainability Meet Your Goals", desc: "Corporate sustainability web banner with bold ESG messaging designed for enterprise brand campaigns.", industry: "mfg", ...driveFile("1b2Y24aivxOKUe1Fp8qrqVM-eAQLei-Db") },
      { title: "Web Banner: ABC Building a Better Future Together", desc: "Brand web banner with partnership and CSR messaging for a manufacturing or tech enterprise client.", industry: "mfg", ...driveFile("1OGAlKztu23UZwRbN2XHlUEVEnvtj35my") },
      { title: "Web Banner: Unified Platform for Vehicle Management", desc: "Automotive sector web banner promoting a unified fleet management platform — clean design with strong CTA.", industry: "auto", ...driveFile("1oTk9SrCO3c1niH7eh_TiFP4TM60i78d0") },
      { title: "Web Banner: Style on the Go (Retail)", desc: "Retail-focused digital banner for a lifestyle/fashion brand — product-first creative with promotional messaging.", industry: "retail", ...driveFile("1_-2ZH5BTzoukQ4wdHgzxBjDkTp7nxEUF") },
      { title: "Web Banner: Fashion Knitted Tank Top", desc: "Fashion retail banner showcasing a summer essentials campaign — clean product visual with aspirational copy.", industry: "retail", ...driveFile("1eM4C5bJN8gTv-vRH4OA7unLZdqc05Ofv") },
      { title: "Web Banner: Designed to Flatter", desc: "Apparel web banner with conversion-focused messaging — body-positive campaign for a women's fashion brand.", industry: "retail", ...driveFile("1SmHljDO6prjYJmMTIardcCv62GfR-cfZ") },
      { title: "Web Banner: The Dress You Will Love Forever", desc: "Fashion banner for an evergreen product line — emotional copy with visual storytelling for a retail apparel brand.", industry: "retail", ...driveFile("1pFrWSJGVIDoeLVuQowmCpOhoP8isUeU4") },
    ],
    "Event Based Assets": [
      { title: "Standee: Hi-Tech Industry Event", desc: "Large-format pull-up standee design for a hi-tech trade event — brand identity applied to print at scale.", industry: "tech", ...driveFile("1eNfZ-Ev3nF5-HZSVA2aG6GdiA98sR59Z") },
    ],
    "Print Publications": [
      { title: "Water Pollution Awareness Poster Series", desc: "Multi-page designed poster series — bold environmental editorial design demonstrating print publication capabilities.", industry: "tech", ...driveFile("14XuWA1wZNUskNQwaHFz5_hF1WZc0scbn") },
      { title: "Air Pollution Awareness Poster", desc: "Bold environmental awareness poster on air pollution — striking visual design for print and display.", industry: "tech", ...driveFile("16f1ym89ngqV56semUaeFMjT14MWP4Hxc") },
      { title: "Flyer: Mission Statement", desc: "Single-page corporate flyer — clean editorial layout for print and digital distribution.", industry: "tech", ...driveFile("17daEsLFKwGzeQRmainib5LKaAxQI6iPD") },
      { title: "Brochure: Client Induction", desc: "Designed client induction print brochure — onboarding overview, relationship team introductions, and service standards.", industry: "tech", ...driveFile("1J8Le3Y2lnAiGpberIK4e4K3KBFnHdlDv") },
    ],
  },
  videos: {
    "Motion Graphics": [
      { title: "Infographic Video: ABC SD-WAN", desc: "90-second animated infographic explainer on SD-WAN architecture and enterprise network benefits.", industry: "telecom", ...driveFile("1l9uZ39A1r32kW0Pf1Xs-yFFJE00WG-KE") },
      { title: "Managing Large Workforce", desc: "Motion graphics video on workforce management platform capabilities — animated data flows and ROI highlights.", industry: "tech", ...driveFile("11CxwH0FbhJ0gf-qcLZkZUv8g8apofEms") },
      { title: "Managing Certificates of Insurance", desc: "Animated explainer on certificate of insurance management — workflow automation, compliance tracking, and risk reduction for enterprise procurement.", industry: "mfg", ...driveFile("183l25tAVM_ZRxmkyNuF-NSEWSDCese6f") },
    ],
    "Footage / Image-Based": [
      { title: "Terra OQSURE Brand Video", desc: "Footage and image-based brand video for OQSURE supply chain risk management platform.", industry: "mfg", ...driveFile("1TjpEuHa2c0TRsQon2ouGRUkbIhFmDIp_") },
      { title: "Sports Three Case Study Film", desc: "Case study brand film combining footage, testimonials, and motion graphics.", industry: "mfg", ...driveFile("1SgsXJIWO7SrnZuH2GcwY6_r-RQa9hWIz") },
      { title: "NSA × ABC Post-Event Highlight Film", desc: "Post-event brand film combining footage, keynote highlights, and motion graphic overlays for a B2B technology event.", industry: "tech", ...driveFile("1NJoBXRyqKS53J6Go4dI98yBiMsyfbowB") },
      { title: "ABC Arctic Expedition — Footage-Based Brand Film", desc: "Cinematic footage-based brand video for an Arctic expedition — environment-forward storytelling with brand narrative overlay.", industry: "tech", ...driveFile("1H5DuIoGMz3vEKk8mIEA60MruFS_U_83F") },
    ],
    "Reels & Shorts": [
      { title: "Minxie Fashion — Social Post Reel", desc: "Vertical-format social media reel for a fashion brand — product showcase with motion text and branded colour.", industry: "retail", ...driveFile("1Y8g-pIpkEtv8n5fktvJ2xiZxRo3DAEA3") },
      { title: "Minxie Fashion — Product Sample Reel", desc: "Short-form product reel for a fashion brand — close-up styling shots with fluid transitions and platform-native format.", industry: "retail", ...driveFile("1QYJPyb4np2u7hwYLFStLvMndLCp-SPHT") },
    ],
    "Podcasts": [
      { title: "Terra Supply Chain Podcast", desc: "Edited podcast interview on supply chain resilience and contractor management — captioned, with branded title cards.", industry: "mfg", ...driveFile("1toPnFOS2PQz-0Ck6xmLCm0uJjq3mB2YZ") },
    ],
    "Training Videos": [
      { title: "Training Video: Use Cases on Rule 9you", desc: "Internal training video on compliance rule-sets — screencast with motion title cards and structured module breaks.", industry: "bfsi", ...driveFile("17348wZOD4jTpso8YO8u6FBRYNxSlK3zl") },
    ],
    "Whiteboard Animations": [
      { title: "Whiteboard Animation: Mind the Gap", desc: "Whiteboard-style animated video bridging the gap between business expectations and technology delivery.", industry: "tech", ...driveFile("1q-19U7s37sc7B2SIZzNi0llUn_kNdvyt") },
      { title: "Whiteboard Training Video", desc: "Whiteboard animation for internal training — process walkthrough with illustrated scenes and voice-over.", industry: "tech", ...driveFile("1L2g6Mrl0C-UZE1zv10suFQjjVrbhrhMn") },
      { title: "Whiteboard Animation: Interview Promotion", desc: "Promotional whiteboard video driving registrations for an executive interview content series.", industry: "tech", ...driveFile("12d6Wu-_mJHDpAWf5EqZdsd6X3kdEG54C") },
    ],
    "Character Animations": [
      // ── BFSI ──
      { title: "Product Vignette: Capital Plan (Sanitize)", desc: "Character-animated product vignette showcasing a capital planning solution — clean 2D character narrative with branded motion.", industry: "bfsi", ...driveFile("1H2KKg5D-iK1tVhAZd1c7-C9TmtCP5pVy") },
      { title: "Product Vignette: Capital Plan (Sanitization)", desc: "Character-animated product vignette for a capital planning platform — storyline-driven 2D animation with enterprise messaging.", industry: "bfsi", ...driveFile("1nRBYnTc4MshqWDcOD5pLQ5Rws4jMm2Ma") },
      // ── Technology & Software ──
      { title: "2D Animation: Sales Enablement EHS", desc: "Character-driven 2D animated video for an EHS sales enablement programme — scenario-based storytelling with clear compliance messaging.", industry: "tech", ...driveFile("1JCffGKj0RMMsYug0MztRa2VhNCqhtoLP") },
      { title: "Facilities Downtime Management System", desc: "Character animation explaining a facilities downtime management system — workflow visualisation with 2D animated personas.", industry: "tech", ...driveFile("12YZskM1jq1acWiP6IefLwxbO3e_kFTMk") },
      { title: "Manage Decentralised Cloud Ecosystem by MyCloud", desc: "Character-led 2D animation on decentralised cloud ecosystem management — simplified architecture storytelling for a SaaS platform.", industry: "tech", ...driveFile("1tL5Ic1-VcV-AQBKtyfsGriVDSj6hXF3M") },
    ],
  },
  social: {
    "Static Posts": [
      { title: "Social Creative: Future of Digital Insurance", desc: "Static post design for an insurance brand — clean data-driven layout for LinkedIn.", industry: "bfsi", ...driveFile("1nE7QZz-qTENdWW6eWJxx15RhHLPCNktM") },
      { title: "Social Creative: AI Making Sci-Fi a Reality (WEF)", desc: "WEF Davos social static for a tech brand — editorial typography on AI futures for LinkedIn.", industry: "tech", ...driveFile("1k900f3w1unwbEw_FoSF286iXTHRT4Zti") },
      { title: "Social Creative: Internet of Everyone (WEF)", desc: "WEF-themed branded social static — bold statement format with editorial layout for tech brand LinkedIn.", industry: "tech", ...driveFile("1k7n8UW4fD7CuH3CH9vMJGWMSdn1KtSF2") },
      { title: "Social Creative: Amplify Human Intelligence with AI (WEF)", desc: "WEF Davos-themed branded social static — bold statement on human-AI collaboration for enterprise tech brand LinkedIn.", industry: "tech", ...driveFile("1wVw04XgH9eQIeM7pwI1x-3rj3D7Hh3aM") },
      { title: "Social Creative: Conversational AI (WEF)", desc: "WEF-themed social static highlighting conversational AI — editorial design with strong tech brand identity.", industry: "tech", ...driveFile("1ebyOYtmXtP-FiIdtZm-sbLJ8x9_lO7HV") },
      { title: "Social Creative: Power of Analytics (WEF)", desc: "WEF-themed branded social post on analytics-driven decision making — data-forward editorial design for LinkedIn.", industry: "tech", ...driveFile("1qcbJZk9Q8Yj3dw5azW7uQWcqYzL378bW") },
      { title: "Social Creative: Insurtech in Indian Insurance (Carousel)", desc: "Carousel-format social design on insurtech disruption in Indian insurance market.", industry: "bfsi", ...driveFile("1hKMk5qRnmHFLmvO5mQ8WJEJ5ITNxc9v_") },
      { title: "Social Creatives: VelocITy Rubrik Campaign", desc: "Multi-post social media creative set for a technology event campaign — bold branded design for LinkedIn and Twitter.", industry: "tech", ...driveFile("1m_F2OzJxPJQRjnA1NxSqTUe2Zrjl4cuX") },
      { title: "Social Creatives: Ready to Fast-Track Your Cloud Journey", desc: "Branded social post series for a cloud services provider — benefit-led messaging with consistent visual identity.", industry: "tech", ...driveFile("1Jm4430TRRdgKXddxXR9peD9Z-8Eo4e5A") },
      { title: "Social Creative: Drive Growth with Enhanced Performance", desc: "Static post design for a B2B tech brand — concise performance messaging with strong visual hierarchy for LinkedIn.", industry: "tech", ...driveFile("1dj--suAU8al-Y6v4bRQ-k278hHg6_fbh") },
      { title: "Social Creatives: Swiggy Campaign", desc: "Platform-native social media creative for a Swiggy campaign — bold colour, food-forward imagery, and engagement-led copy.", industry: "retail", ...driveFile("1_2IeRfuPjJObWRZ6gJg_HVcqCXoqvOiP") },
      { title: "Social Creative: Software Development Teams", desc: "Multi-format social creative set for a software services brand — benefit-led messaging and bold design for LinkedIn.", industry: "tech", ...driveFile("1Lb3FFvXcsoc700AumMK9BXzvkD9O-cQ5") },
      { title: "Social Creative: The Evolution of D2C Insurance", desc: "Static social post tracing direct-to-consumer insurance disruption — editorial design for BFSI LinkedIn audiences.", industry: "bfsi", ...driveFile("13i6Fyp7tjSrI_yaWz0E9s8L4I7kWji4w") },
      { title: "Social Creative: Digital Transformation", desc: "Clean branded static social post on enterprise digital transformation — concise messaging with strong typographic design.", industry: "tech", ...driveFile("1nfuzLJLsK3CrOoLtjvBtLbIO4QnWwWa-") },
      { title: "Social Creative: Step Into Digital Resilience", desc: "Branded social static for a cybersecurity or digital transformation brand — bold visual with resilience and innovation messaging.", industry: "tech", ...driveFile("1atRfclRSrlAMFuRRi9xu9cAD77XAl579") },
      { title: "Social Creative: Digital Engineering in Financial Services", desc: "Targeted social post for a digital engineering brand — financial services industry focus with strong B2B messaging.", industry: "bfsi", ...driveFile("1_ZUS_hZ2f6yeIG03VEa1JrRvmVSeqe6f") },
      { title: "Social Creative: Seeking a Smart Solution for Transition", desc: "Branded social post on digital transition — designed for enterprise tech or consulting brand LinkedIn campaigns.", industry: "tech", ...driveFile("1wwVnHxZmBGxcBMPFwso4zxz2aUvIGGMQ") },
      { title: "Social Creative: Hiring Dictionary — Java", desc: "Tech brand static post showcasing software hiring glossary content — engaging educational format for LinkedIn.", industry: "tech", ...driveFile("1pizR3L_6ogG2n3myZnJE8ORFVr2K2cV-") },
      { title: "Social Creative: Cannabis Awareness (A)", desc: "Health-sector social static on cannabis legalisation awareness — clean editorial design for regulated industry brands.", industry: "health", ...driveFile("1ekZYernICcRojvwSQYRlX4JBF0BXBF9w") },
      { title: "Social Creative: Cannabis Awareness (B)", desc: "Health-sector social static on cannabis legalisation — bold visual treatment for regulated healthcare brand social channels.", industry: "health", ...driveFile("1gypUOyOpgd-u7KCYfN216sKluC48nnE7") },
      { title: "Social Creative: Diwali Campaign", desc: "Festive social media creative for a Diwali brand campaign — vibrant visual identity with celebratory messaging.", industry: "retail", ...driveFile("1Ipskh--H7Wv7S_enkiMkP81-43rXExZZ") },
      { title: "Social Creative: Data Management Journey", desc: "Branded static social post for a data management platform — strong enterprise messaging with clean B2B visual design.", industry: "tech", ...driveFile("1haGDVxWNFOZnb8SdwOGPZQK9kArUJu6j") },
      { title: "Social Creative: All the Expertise You Need", desc: "Brand awareness static post highlighting service breadth and expertise — clean professional design for B2B LinkedIn.", industry: "tech", ...driveFile("1edSk9TVThVPZHCQHqnLsO1tLrs-Qgyyg") },
      { title: "Social Creative: Customer Success — eAuction Platform", desc: "Client success story static post for an eAuction platform — impact-led messaging with B2B social creative format.", industry: "tech", ...driveFile("1pFc2_rMHtENvFOHNYgAqE82nf0hKwdDr") },
    ],
    "GIFs": [
      { title: "GIF: Think Digital Transformation — Award Campaign", desc: "Looping animated GIF for a digital transformation award campaign — kinetic type, social-optimised.", industry: "tech", ...driveFile("1xvJlPDQdga9mIdaYPf0QklBTdYR8zrD0") },
      { title: "GIF: Into a Digital Future — Award Campaign", desc: "Award campaign GIF companion asset — animated logo reveal with motion-graphic data points.", industry: "tech", ...driveFile("1A8wcMznffneAjMmYEIxV0ANNg0U8WK2f") },
      { title: "GIF: Storage Water Heater — Product Features", desc: "Product feature GIF for a retail/manufacturing brand — animated benefit callouts for Instagram Stories.", industry: "retail", ...driveFile("1tLwrGAD1Y_jNdARiaY9W1ue95p3-iScN") },
      { title: "GIF: Voice Recognition Technology", desc: "Animated GIF demonstrating voice recognition capability — clean tech-forward motion design for social and digital channels.", industry: "tech", ...driveFile("1RP1JiK1xX368RKmLfzz5slWomRRwq8N7") },
      { title: "GIF: Autonomous Cars — Social Campaign", desc: "Looping animated social GIF for an automotive brand campaign on autonomous driving — kinetic typography and motion graphics.", industry: "auto", ...driveFile("1e6jKXGpBwUeGMj7j6aXtGnVgo-jE6Wlu") },
      { title: "GIF: Tech Award Campaign", desc: "Branded GIF for a technology award campaign — animated reveal with bold brand identity.", industry: "tech", ...driveFile("1ZRnstcoCXBT3l05WjeWMYU8luYvbp_6i") },
      { title: "GIF: Survey Promotional — Research Panel", desc: "Animated promotional GIF for a market research survey campaign — clear incentive messaging and CTA for panel recruitment.", industry: "tech", ...driveFile("1DtU84M3YcblOr2LWxd2mgxwZ953PxsRY") },
      { title: "GIF: Body Cream Features & Benefits", desc: "Animated product GIF showcasing body cream features and benefits — smooth motion design for retail and beauty brand social channels.", industry: "retail", ...driveFile("1LW2KeQWvB8GGp7pfRiM0cnfgjMiKkOEm") },
      { title: "GIF: Training & Skills Development", desc: "Animated GIF promoting training and skills development programmes — motion-graphic design for enterprise HR and L&D social channels.", industry: "tech", ...driveFile("1hmYFtnpW2p_16nEt10RbfhkQ7GXBshJm") },
      { title: "GIF: Survey Promotional — Korean Market", desc: "Localised animated promotional GIF for a market research survey in Korea — culturally adapted design for panel recruitment.", industry: "tech", ...driveFile("1tV3WO_yeW6Vmwz0BLhyJejcRGcOXExxg") },
      { title: "GIF: Survey Promotional — Incentive Campaign", desc: "Animated promotional GIF for a survey incentive campaign — clear offer messaging with motion-graphic CTA.", industry: "tech", ...driveFile("1JALLhF_pHaRmloBUK6gTIKobDBTXIh74") },
      { title: "GIF: COVID-19 Survey Promotion", desc: "Animated GIF promoting a COVID-19 research survey — urgent campaign messaging with motion design for social and digital distribution.", industry: "health", ...driveFile("1-Hgyx3kDubj2hHk4cTJQtfP7TeAqtshE") },
    ],
    "Teasers": [
      { title: "Video Teaser: Perspectives Volume", desc: "15-second social teaser driving views to a thought leadership content series — fast cuts with branded typography.", industry: "tech", ...driveFile("1PaTvYixFwW7u7rH1AaF2mLURYobn0bFN") },
    ],
    "Memes": [
      { title: "Meme Series: Trading — Part 1", desc: "Four-part branded meme series for a BFSI/fintech brand — platform-native humour with on-brand visual treatment.", industry: "bfsi", ...driveFile("11jPMfO7vVdN3OtHLb1P-8CsTJqXe1nNI") },
      { title: "Meme Series: Trading — Part 2", desc: "Four-part branded meme series for a BFSI/fintech brand — platform-native humour with on-brand visual treatment.", industry: "bfsi", ...driveFile("1_A81RWru1KbsmNOxOcHFQVGjrbvkEaRA") },
      { title: "Meme Series: Trading — Part 3", desc: "Four-part branded meme series for a BFSI/fintech brand — platform-native humour with on-brand visual treatment.", industry: "bfsi", ...driveFile("1El0FiSXLGAV_fhAR_6xf6MXzZ4OjHxOF") },
      { title: "Meme Series: Trading — Part 4", desc: "Four-part branded meme series for a BFSI/fintech brand — platform-native humour with on-brand visual treatment.", industry: "bfsi", ...driveFile("19jBuPumxzjS82asIHgWdrGPyA9HtgULI") },
    ],
    "Carousels": [
      { title: "Carousel: Tech Solutions Streamline Collaborations", desc: "5-slide LinkedIn carousel on enterprise tech benefits — each slide pairs a bold stat with a reason-to-believe visual.", industry: "tech", ...driveFile("1IJCyMq4oemXYN8g4rKi9N23o_96geyPN") },
      { title: "Carousel: The Future of Digital Insurance", desc: "Multi-slide BFSI carousel exploring digital insurance trends — visual storytelling format for LinkedIn.", industry: "bfsi", ...driveFile("1RQQIP7vqFYBCtBqrmkpki7RyNdkREWiu") },
      { title: "Carousel: Insurtech in Indian Insurance", desc: "Carousel deep-dive into insurtech innovation in the Indian insurance market — data-rich slides with branded visual treatment.", industry: "bfsi", ...driveFile("1hKMk5qRnmHFLmvO5mQ8WJEJ5ITNxc9v_") },
      { title: "Carousel: The Evolution of D2C Insurance", desc: "Carousel tracing the rise of direct-to-consumer insurance models — channel disruption, customer expectations, and digital-first providers.", industry: "bfsi", ...driveFile("13i6Fyp7tjSrI_yaWz0E9s8L4I7kWji4w") },
      { title: "Carousel: Whisky Girl — Lifestyle Brand", desc: "Lifestyle brand carousel for a premium whisky label — product storytelling, visual identity, and social engagement format.", industry: "retail", ...driveFile("1tijmTNyPfvpI7a4QCE8ywctDJFcu1Spm") },
    ],
    "Corporate Comics": [
      { title: "Corporate Comic: Worker Safety Solution", desc: "Single-panel branded comic on workplace safety automation — on-brand illustration style for LinkedIn.", industry: "mfg", ...driveFile("1z-m4dJZpouBMxNiUI9ektFBblL203Gp_") },
      { title: "Corporate Comic: Corporate Policies in the New Normal", desc: "Branded comic strip exploring evolving workplace policies post-pandemic — relatable storytelling for internal communications and LinkedIn.", industry: "tech", ...driveFile("1CLgH55QsG22gk4jnLCVY-7ApPTfUpvTq") },
      { title: "Corporate Comic Sample Series", desc: "Multi-panel corporate comic sample demonstrating branded storytelling across a variety of workplace scenarios — consistent character design and editorial tone.", industry: "tech", ...driveFile("1Fnq7_4GolWFVQIIojHndy24J8D1Vh65j") },
    ],
  },
  gtm: {
    "Industry Analysis": [
      // ── Telecommunication ──
      { title: "ISP Market Landscape Study", desc: "Market assessment and landscape study of the ISP ecosystem, regulatory frameworks, and key players across Nigeria and DRC to support strategic market entry decisions.", industry: "telecom", ...driveFile("1UcAgLoyYIWWv-KxXFLp9qkxHt_4Or96T") },
      // ── BFSI ──
      { title: "Enabling Growth Strategies for Cross-border Digital Payment Platforms in China", desc: "Industry analysis examining regulatory frameworks, competitive dynamics, and strategic growth levers for digital payment platforms expanding into China.", industry: "bfsi", ...driveFile("1I4v4ieFuClmru2jUSHfqRLi1sEUbjAD1") },
      { title: "Leave Management Solutions in the US Group Benefits Market", desc: "Market analysis of leave management solution providers and adoption trends within the US employer-sponsored group benefits landscape.", industry: "bfsi", ...driveFile("1qCnNYi_EropVruwNPyrB6TrwnyMTYnCf") },
      // ── Technology & Software ──
      { title: "Cloud Adoption and Innovation Impact Assessment in South Africa and UAE", desc: "Industry analysis of cloud adoption maturity, innovation impact, and market opportunity across South Africa and the UAE.", industry: "tech", ...driveFile("1x-oE6Nxr3d_I-wfdUGcfYOTzQfO_c8FH") },
      { title: "IoT Application Trends in Seaports and Airports", desc: "Landscape study of IoT deployment patterns and emerging use cases across seaport and airport infrastructure globally.", industry: "tech", ...driveFile("1xEEmufT_csgUIIqD16Qzl_KTyQ2wCEZ7") },
      { title: "Video Codec Technology Landscape Study", desc: "Technology landscape analysis of video codec standards, competitive positioning, and adoption trends across media and streaming verticals.", industry: "tech", ...driveFile("1IEC8o3xWa4SXILBaATS5hl0jXjOPyEbJ") },
      { title: "Captive Market Assessment and ICT Opportunity Analysis in India", desc: "Market assessment of India's captive centre ecosystem and ICT investment opportunities across key verticals.", industry: "tech", ...driveFile("1EWWod3hotQIQx66_PuNvjSP3qZrQWTVO") },
      // ── Retail & Ecommerce ──
      { title: "Market Assessment – Identified Category Growth Potential of Natural & Organic Hair Care", desc: "Category-level market assessment identifying growth opportunity pockets within the natural and organic hair care segment.", industry: "retail", ...driveFile("1tFNxKAhP8dNrR6gCK5GYu7WCp-4AdgZp") },
      // ── Healthcare ──
      { title: "Market Assessment of Key Business Practices in Healthcare", desc: "Analysis of market structure and prevailing business practices across key healthcare subsectors.", industry: "health", ...driveFile("1regWEZQBYVVgIOGRMl33vmYzQFnvk2pE") },
      { title: "Growth Opportunities in the Cleanroom Disposable PPE Market", desc: "Market sizing and opportunity analysis for cleanroom-grade disposable PPE across pharmaceutical, semiconductor, and biotech verticals.", industry: "health", ...driveFile("101AzajvFhcFnRL2Ha2noDp7UJnUDQl3y") },
      // ── Manufacturing ──
      { title: "Market Assessment Study on the Global Biosurfactant Industry", desc: "Comprehensive market assessment of the global biosurfactant industry — growth drivers, competitive landscape, and application segment analysis.", industry: "mfg", ...driveFile("1CcM44Ui5DzNOuCrbiiKwH2X2_CeToHZf") },
      { title: "Market Assessment Study on the Indian Plastic Circular Economy", desc: "Industry analysis examining circular economy maturity, regulatory tailwinds, and opportunity landscape within India's plastics sector.", industry: "mfg", ...driveFile("1k3pQg3-SHt_TRvSSq2WWiNix7anXbQ3s") },
    ],
    "GTM": [
      // ── BFSI ──
      { title: "GTM Strategy for a Personal Finance Management App", desc: "Go-to-market strategy defining target segments, channel mix, and launch sequencing for a personal finance management application.", industry: "bfsi", ...driveFile("1RaM068TLcSBPsf5pXviB7qotsd-M75BZ") },
      // ── Technology & Software ──
      { title: "GTM Strategy for a Cloud-Based Cybersecurity Startup", desc: "Go-to-market strategy covering ICP definition, competitive positioning, and sales motion design for a cloud-native cybersecurity startup.", industry: "tech", ...driveFile("1_d453HbhK36dZz5mJGzYbpQzLaIRV4mA") },
      { title: "GTM Strategy and Roadmap Building for a Tech Giant", desc: "Comprehensive GTM strategy and execution roadmap developed for a large technology company entering a new product category.", industry: "tech", ...driveFile("1_6Nb1kJih9sxT-1xAK1ZduqLstzQOrJG") },
      { title: "Smart Mobility Ecosystem Mapping and Opportunity Analysis Across Global Cities", desc: "GTM opportunity analysis mapping smart mobility players, investment flows, and entry points across major global urban markets.", industry: "tech", ...driveFile("1VpIqq8osbGThXLy7X_eGnNSSczYdQQ2d") },
      { title: "Global Esports Market Landscape Study", desc: "GTM landscape study of the global esports market — audience segmentation, monetisation models, and brand partnership opportunities.", industry: "tech", ...driveFile("1bDI_Zh2YckU933TtzDTjNJ7LXDS8dszP") },
      { title: "Impact of Campaign Effectiveness for a Business Management Software Provider", desc: "GTM effectiveness assessment measuring campaign reach, lead quality, and pipeline contribution for a B2B software provider.", industry: "tech", ...driveFile("12-mXJyFmbdEy3S4IpfS-wFKoC06zfTL6") },
      // ── Telecom ──
      { title: "IT and Emerging Tech Strategy for a Telecom Ecosystem Player", desc: "GTM and technology strategy study mapping IT modernisation priorities and emerging tech adoption pathways for a telecom ecosystem participant.", industry: "telecom", ...driveFile("1v_67mRI-JCVZj_R8q--7DVGU58FuQBSA") },
      { title: "GTM Strategy for a Telecom Network Provider", desc: "End-to-end go-to-market strategy for a telecom network provider — segment prioritisation, value proposition design, and channel activation.", industry: "telecom", ...driveFile("1gfWwabDqZAcfH5uXSkVjP4JQkoxUMk6n") },
      // ── Automotive ──
      { title: "Market Assessment for Automotive Semi-active Suspension Technologies", desc: "GTM market assessment sizing the semi-active suspension technology opportunity — OEM adoption trends, key suppliers, and regional demand signals.", industry: "auto", ...driveFile("1ntsutMQ_mA5KTicJ5-h7ez2sOzTyYi1c") },
      // ── Healthcare ──
      { title: "Product Concept Testing for CT and MRI Products", desc: "GTM concept validation study for diagnostic imaging products — clinician feedback, feature prioritisation, and market readiness assessment.", industry: "health", ...driveFile("1zT8HVukcH-ltFkI9BxFbwjxKuUXb78P4") },
      { title: "GTM & Market Potential for Flavoured Milk and Convergence Drinks", desc: "GTM study sizing market potential and identifying positioning opportunities for flavoured milk and convergence drink categories.", industry: "retail", ...driveFile("1dTowHuT15m6NhJOxniB5yHxastVd4MRL") },
      { title: "Concept Testing: Cider Category Innovation Pipeline", desc: "GTM concept testing identifying three winning flavour territories to fuel a cider brand's innovation pipeline.", industry: "retail", ...driveFile("1suEViXrD19MVg8qJXmWo-XbYuhkEM-hJ") },
      { title: "Concept Testing: Product Innovation for a QSR Chain", desc: "GTM concept validation delivering product innovation recommendations for a quick service restaurant chain.", industry: "retail", ...driveFile("1IM-SYWOE58legIiTah0m9CUby18X7B8f") },
      { title: "Concept Testing & Opportunity Assessment: Health Food Supplement Dispenser", desc: "GTM study evaluating concept appeal and market opportunity for a health food supplement and dispenser innovation.", industry: "retail", ...driveFile("1oHPqdb2m6C-9WkuvvIgaRUEbqYz4Yri7") },
      { title: "Go-to-Market Strategy for a Company Using AI to Revolutionise Drug Development", desc: "GTM strategy for an AI-powered drug development platform — target market identification, partnership model, and competitive differentiation.", industry: "health", ...driveFile("1yxjFqhdT3dqx7ov-DN0GsRX3D1o0uNXp") },
    ],
    "Competitive Benchmarking and Account Intelligence": [
      // ── Telecommunication ──
      { title: "Enterprise Connectivity Service Delivery Process for Indian SMEs", desc: "Competitors' benchmarking study analyzing end-to-end service delivery workflows to pinpoint timeline delays and optimize B2B telecom process efficiency.", industry: "telecom", ...driveFile("1S0d_-frzWrQJJ3pZ2ub8OSiYfkUGlq6I") },
      // ── BFSI ──
      { title: "Airline Loyalty Programs & Co-branded Credit Cards Benchmarking", desc: "Competitive benchmarking of airline co-branded credit card programmes — rewards architecture, partner economics, and cardholder acquisition strategies.", industry: "bfsi", ...driveFile("1VQHt0UZy5Q2FLhNmShUtLmIV_Ek3gswW") },
      { title: "Comparative Review of Cashback Credit Cards in the US", desc: "Side-by-side competitive analysis of leading cashback credit card products in the US market — earn rates, redemption mechanics, and fee structures.", industry: "bfsi", ...driveFile("1CEqhA2kNvql4_x0fDqn6_7eHp5ABic7d") },
      { title: "Brand Health & Competitive Benchmarking Study for a Health Insurance Company", desc: "Brand equity and competitive positioning benchmarking for a health insurance provider — awareness, NPS, and share-of-wallet analysis.", industry: "bfsi", ...driveFile("1bZQrQZUvjyOywOhzRs6X9ET-y5jGTHU3") },
      // ── Technology & Software ──
      { title: "Pricing Analysis for a Cloud-Based SCM Provider", desc: "Competitive pricing intelligence study for a cloud-based supply chain management provider — tier structures, discounting patterns, and value metric benchmarks.", industry: "tech", ...driveFile("19XFI2m0RxC4wJxviP17jRpj_LHdCHu8X") },
      { title: "Account Intelligence Report – Level 1: Netflix", desc: "Level 1 account intelligence profile for Netflix — firmographic overview, strategic priorities, and key buying signals for sales engagement.", industry: "tech", ...driveFile("1C82FObYTfQFAtKJMayW8FOspiTttbGBI") },
      { title: "Account Intelligence Report – Level 2: Home Depot", desc: "Level 2 account intelligence report for Home Depot — organisational mapping, technology landscape, and procurement signals.", industry: "tech", ...driveFile("1imHUtJa8JXcGgUqXPCv8q0FshFmcZqR2") },
      { title: "Account Intelligence Report – Level 3: Tesco", desc: "Level 3 account intelligence report for Tesco — deep-dive competitive positioning, initiative tracking, and stakeholder mapping.", industry: "tech", ...driveFile("1YH67vPO9frOLkqFDYzBoyYNQIw-D0bDu") },
      { title: "Account Intelligence Report – Level 4: DuPont", desc: "Level 4 account intelligence report for DuPont — comprehensive strategic intelligence covering M&A signals, innovation pipeline, and executive priorities.", industry: "tech", ...driveFile("1LVtwTga9Z8ZWoMn8vzx9epB09jk3aCU1") },
      // ── Retail & Ecommerce ──
      { title: "Brand & Product Performance Tracking Study for Cleaning Wipes", desc: "Ongoing competitive benchmarking of brand health and product performance metrics for a cleaning wipes brand across retail channels.", industry: "retail", ...driveFile("1a_RNWEMmh-BMaSQAfBipJlVOreO52Ajs") },
      { title: "Competitive Landscape Analysis for Juice Market", desc: "Competitive intelligence study mapping the juice market landscape — key players, share dynamics, innovation trends, and positioning white spaces.", industry: "retail", ...driveFile("1LZ9NgNpvyJ-VKqJAgALbZUK5AD9ADwI7") },
      // ── Manufacturing ──
      { title: "Middle East Portable Air Compressor and Hand-held Tool Market and Rivalry", desc: "Competitive intelligence on the Middle East market for portable air compressors and handheld power tools — rival capabilities and channel strategies.", industry: "mfg", ...driveFile("1-uxzXR3sRlI3sFlnvTeX2mWHRDRA0nvn") },
    ],
    "Consumer Research": [
      // ── BFSI ──
      { title: "Consumer Payments Trend Analysis & Declining Retail Credit Card Relevance", desc: "Consumer research study on shifting payment preferences and the declining relevance of retail credit cards among digitally-native consumers.", industry: "bfsi", ...driveFile("1I8YddJ9L5MH2H06H3kqHiFyqVWHAX_wr") },
      { title: "Engagement Perception for an International Bank", desc: "Primary research study measuring customer engagement perceptions, satisfaction drivers, and loyalty indicators for an international retail bank.", industry: "bfsi", ...driveFile("1ev3tJR6XmJ6DH3UuXBYZUQyZ-ScIdHHn") },
      // ── Technology & Software ──
      { title: "Customer Insights for 3D Printing Business", desc: "Consumer and B2B buyer research for a 3D printing company — use case discovery, willingness-to-pay, and purchase decision mapping.", industry: "tech", ...driveFile("1UVXsMr4jX7QLEAPrQ-kwpYR8IUPqrVER") },
      // ── Retail & Ecommerce ──
      { title: "Home Fitness Brand Performance Assessment", desc: "Consumer research assessing brand health, product satisfaction, and category engagement for a home fitness brand post-pandemic.", industry: "retail", ...driveFile("146-JQwHnYONXWyug_4TWuwZ6Wj2CHHEt") },
      { title: "Brand Track & Product Evaluation – Improved Product Satisfaction After Redesign", desc: "Brand tracking study documenting measurable improvements in consumer product satisfaction following a packaging and formula redesign.", industry: "retail", ...driveFile("1JYPFSSrSn7KFEoPhMPV1tJogEhoRqZOu") },
      { title: "Consumer Perception, Product Test & Campaign Feedback for Skincare Products", desc: "Integrated consumer research combining perception testing, in-home product trials, and campaign feedback for a skincare portfolio.", industry: "retail", ...driveFile("1SUsoqLcnfnVbAtdK1rNQXXNe0eMAa0LV") },
      { title: "Brand and Consumer Perception Analysis for AC", desc: "Consumer perception and brand health study for an air conditioner brand — awareness, consideration, and attribute-level satisfaction mapping.", industry: "retail", ...driveFile("1g9ab50htfS1gruMp0ZWHIJh2fTfjXDPM") },
      { title: "Premium Perception & High-End Customer Satisfaction for a Premium Apparel Brand", desc: "Luxury consumer research study exploring premium brand perception and satisfaction drivers for a high-end apparel label.", industry: "retail", ...driveFile("1eAeN76WhH-8c6mI4HThCjn-ebCqKHHuJ") },
      { title: "Online Shopping Patterns for Women's Apparel in the United States", desc: "Consumer behaviour research on women's apparel online shopping — discovery paths, brand switching, and purchase frequency patterns in the US.", industry: "retail", ...driveFile("1JZ0dVtxQriQHIQ6lcKsIO8KHwEhdt_Kh") },
      { title: "Consumer Behavior Analysis for an E-Commerce Company", desc: "Shopper behaviour research for an e-commerce platform — basket composition, session patterns, and churn risk indicators.", industry: "retail", ...driveFile("1xruBD853cPSImWzfEowVhkW5pxZGI--l") },
      { title: "User & Attitude Study for a Major Apparel Retailer", desc: "Quantitative U&A study for a large apparel retailer — category engagement, brand repertoire, and shopper attitude segmentation.", industry: "retail", ...driveFile("1AbS25qU1SW5BqdZ4bXI6E_eDAhmv1Kk2") },
      { title: "Consumer Persona Development – Enabled Growth in Online Sales for Premium Ayurvedic Skincare", desc: "Consumer persona development work that informed digital strategy and enabled online sales growth for a premium Ayurvedic skincare brand.", industry: "retail", ...driveFile("1L00_jh7PlE_2ewW5aip7W2wUZWHwgEyW") },
      { title: "Customer Segmentation for a Premium Organic Food Retailer", desc: "Consumer segmentation study identifying distinct buyer groups for a premium organic food brand — profiles, purchase drivers, and channel preferences.", industry: "retail", ...driveFile("1vaaUxA_aNScU5-UXXLbuzWxiLrcnmNQw") },
      { title: "Consumer Insights & Trend Mapping: Women's Adult Beverages", desc: "Consumer research study mapping trends, usage occasions, and purchase motivations in the women's adult beverage category.", industry: "retail", ...driveFile("1dc0qoUHqf4L_dF4gyOne-jgQ1vEHS8wS") },
      { title: "Product Positioning Study for Medjool Dates", desc: "Consumer research study identifying optimal positioning, messaging, and target segments for a premium Medjool dates brand.", industry: "retail", ...driveFile("1mZXYuwWBepz0g30gsGqMRGrbpUM6Rev8") },
      { title: "Brand Perception & Consumer Behaviour Study for Premium Alcohol", desc: "Qualitative and quantitative study on brand perception, purchase occasions, and loyalty drivers in the premium alcohol category.", industry: "retail", ...driveFile("1DirIDYg7Im9lEiYaBVQooA0wCB4vKWf8") },
      // ── Automotive ──
      { title: "Customer Perceptions on In-vehicle Health & Wellness Study", desc: "Primary research study on driver and passenger perceptions of in-vehicle health and wellness features — willingness-to-pay and feature prioritisation.", industry: "auto", ...driveFile("1yOAxwrMmQg6wOCrax1GELD9mfs7WUUun") },
      // ── Healthcare ──
      { title: "Consumer Journey Insights for a Health Supplements Retailer", desc: "Consumer journey research mapping touchpoints, decision triggers, and loyalty barriers for a health supplements retailer.", industry: "health", ...driveFile("1yH6nKKw9NJkGke1w3buqYRRpTajs1GBK") },
      // ── Manufacturing ──
      { title: "Customer Satisfaction for Petrochemical Products", desc: "B2B customer satisfaction research for a petrochemical products portfolio — supplier NPS, product performance ratings, and renewal intent.", industry: "mfg", ...driveFile("1vbaayaNvuL45j9SJTwKt77hh5PjBdD2I") },
    ],
    "AI Readiness Assessment": [
      // ── Telecommunication ──
      { title: "AI Adoption in Telecom Sector", desc: "Global benchmarking study evaluating regional AI maturity, high-impact operator use cases, and capability gaps to sharpen GTM positioning.", industry: "telecom", ...driveFile("10abj6wddyAktZvwSu3mt-S-kYHDh0fWU") },
      // ── Technology & Software ──
      { title: "AI Ethics and Transparency Impact Assessment", desc: "Assessment of enterprise AI ethics posture and transparency readiness — governance frameworks, bias risk, and regulatory alignment across tech deployments.", industry: "tech", ...driveFile("1ggtWzS3z5NkYro1QefJMT5oW9upYzPYV") },
    ],
  },
};


const CONTENT_SUBS = [
  { id: "tl",    name: "Thought Leadership", kind: "parent", formats: ["Whitepapers","POVs","Blogs","eBooks"] },
  { id: "short", name: "Short-form",         kind: "parent", formats: ["Emailers","Case Studies","Video Scripts","Brochures"] },
];

const DESIGN_FORMATS = Object.keys(CURATED.design);
const VIDEO_FORMATS  = Object.keys(CURATED.videos);
const SOCIAL_FORMATS = Object.keys(CURATED.social);
const GTM_FORMATS    = Object.keys(CURATED.gtm);

// ─── Hooks ────────────────────────────────────────────────────────

function useMedia(query) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const fn = () => setMatch(mql.matches);
    fn();
    mql.addEventListener("change", fn);
    return () => mql.removeEventListener("change", fn);
  }, [query]);
  return match;
}

// ─── Format Mocks (light surface) ────────────────────────────────

function FrameBase({ accent, children, label }) {
  return (
    <div style={{
      position:"relative", width:"100%", aspectRatio:"4/3",
      background:`linear-gradient(180deg, ${accent}10, ${accent}06)`,
      border:`1px solid ${accent}24`,
      borderRadius:14, overflow:"hidden",
    }}>
      <svg viewBox="0 0 200 150" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display:"block" }}>
        <defs>
          <pattern id={`grid-${accent.replace("#","")}`} width="14" height="14" patternUnits="userSpaceOnUse">
            <path d={`M 14 0 L 0 0 0 14`} fill="none" stroke={accent} strokeWidth="0.4" opacity="0.14"/>
          </pattern>
        </defs>
        <rect width="200" height="150" fill={`url(#grid-${accent.replace("#","")})`}/>
        {children}
      </svg>
      {label && (
        <div style={{
          position:"absolute", left:10, bottom:10,
          fontFamily:"'DM Sans', sans-serif",
          fontSize:9, fontWeight:600, letterSpacing:"0.14em",
          textTransform:"uppercase", color:`${accent}`,
          padding:"3px 8px", borderRadius:100,
          background:"rgba(255,255,255,0.92)",
          border:`1px solid ${accent}40`,
          backdropFilter:"blur(8px)",
        }}>{label}</div>
      )}
    </div>
  );
}

function WhitepaperMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Whitepapers">
      <g transform="translate(64 14)">
        <rect width="72" height="122" fill="#FFFFFF" stroke={accent} strokeOpacity="0.5" rx="2"/>
        <rect x="6" y="8" width="40" height="3" fill={accent} opacity="0.9"/>
        <rect x="6" y="14" width="30" height="2" fill={accent} opacity="0.5"/>
        <rect x="6" y="24" width="60" height="1" fill="#0F1B27" opacity="0.5"/>
        <rect x="6" y="28" width="60" height="1" fill="#0F1B27" opacity="0.4"/>
        <rect x="6" y="32" width="48" height="1" fill="#0F1B27" opacity="0.4"/>
        <rect x="6" y="40" width="28" height="20" fill={accent} opacity="0.18"/>
        <rect x="38" y="40" width="28" height="20" fill="none" stroke={accent} strokeOpacity="0.4" strokeWidth="0.5"/>
        {[64,68,72,76,80,84,88,92,96,100,104,108].map(y => (
          <rect key={y} x="6" y={y} width={y%8===0?60:42} height="1" fill="#0F1B27" opacity="0.35"/>
        ))}
        <rect x="6" y="114" width="14" height="3" fill={accent} opacity="0.7"/>
      </g>
    </FrameBase>
  );
}

function POVMock({ accent, label = "POVs" }) {
  return (
    <FrameBase accent={accent} label={label}>
      <text x="18" y="34" fill="#0F1B27" fontFamily="'DM Sans', sans-serif" fontSize="14"  opacity="0.95">"</text>
      <rect x="18" y="38" width="120" height="3" fill="#0F1B27" opacity="0.85"/>
      <rect x="18" y="44" width="160" height="3" fill="#0F1B27" opacity="0.85"/>
      <rect x="18" y="50" width="100" height="3" fill="#0F1B27" opacity="0.85"/>
      <rect x="18" y="62" width="3" height="22" fill={accent}/>
      <rect x="26" y="64" width="40" height="2" fill={accent} opacity="0.8"/>
      <rect x="26" y="70" width="60" height="1.5" fill="#0F1B27" opacity="0.4"/>
      <rect x="26" y="74" width="46" height="1.5" fill="#0F1B27" opacity="0.4"/>
      <rect x="26" y="78" width="56" height="1.5" fill="#0F1B27" opacity="0.4"/>
      <rect x="18" y="100" width="164" height="0.5" fill={accent} opacity="0.4"/>
      <text x="18" y="120" fill={accent} fontFamily="sans-serif" fontSize="6" letterSpacing="1.5" opacity="0.7">PERSPECTIVE</text>
    </FrameBase>
  );
}

function CaseMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Case Studies">
      <rect x="14" y="14" width="172" height="40" fill={accent} opacity="0.18" rx="2"/>
      <rect x="20" y="22" width="40" height="2" fill={accent}/>
      <rect x="20" y="28" width="60" height="3" fill="#0F1B27" opacity="0.9"/>
      <rect x="20" y="34" width="80" height="3" fill="#0F1B27" opacity="0.9"/>
      <g transform="translate(14 64)">
        {[0,1,2].map(i => (
          <g key={i} transform={`translate(${i*60} 0)`}>
            <text x="0" y="14" fill={accent} fontSize="14" fontWeight="700" fontFamily="sans-serif">{["3×","12M","42%"][i]}</text>
            <rect x="0" y="20" width="40" height="1.5" fill="#0F1B27" opacity="0.4"/>
            <rect x="0" y="24" width="32" height="1.5" fill="#0F1B27" opacity="0.4"/>
          </g>
        ))}
      </g>
      <rect x="14" y="104" width="60" height="1.5" fill="#0F1B27" opacity="0.4"/>
      <rect x="14" y="110" width="80" height="1.5" fill="#0F1B27" opacity="0.4"/>
      <rect x="14" y="116" width="50" height="1.5" fill="#0F1B27" opacity="0.4"/>
    </FrameBase>
  );
}

function EbookMock({ accent }) {
  return (
    <FrameBase accent={accent} label="eBooks">
      <g transform="translate(54 18)">
        <rect x="2" y="2" width="90" height="115" fill={accent} opacity="0.25" rx="2"/>
        <rect x="0" y="0" width="90" height="115" fill="#FFFFFF" stroke={accent} strokeOpacity="0.5" rx="2"/>
        <circle cx="20" cy="20" r="6" fill={accent} opacity="0.6"/>
        <rect x="10" y="36" width="60" height="3" fill="#0F1B27"/>
        <rect x="10" y="42" width="70" height="3" fill="#0F1B27" opacity="0.85"/>
        <rect x="10" y="48" width="48" height="3" fill="#0F1B27" opacity="0.85"/>
        <rect x="10" y="68" width="40" height="1.5" fill={accent} opacity="0.7"/>
        <rect x="10" y="72" width="50" height="1" fill="#0F1B27" opacity="0.4"/>
        <rect x="10" y="100" width="20" height="2" fill={accent}/>
      </g>
    </FrameBase>
  );
}

function EmailMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Emailers">
      <rect x="20" y="14" width="160" height="122" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="2"/>
      <rect x="20" y="14" width="160" height="20" fill={accent} opacity="0.22"/>
      <circle cx="32" cy="24" r="4" fill={accent}/>
      <rect x="42" y="22" width="30" height="2" fill="#0F1B27" opacity="0.9"/>
      <rect x="42" y="27" width="20" height="1.5" fill="#0F1B27" opacity="0.5"/>
      <rect x="28" y="42" width="60" height="3" fill="#0F1B27"/>
      <rect x="28" y="48" width="80" height="2" fill="#0F1B27" opacity="0.6"/>
      <rect x="28" y="60" width="144" height="32" fill={accent} opacity="0.1" rx="2"/>
      <rect x="36" y="68" width="40" height="2" fill={accent}/>
      <rect x="36" y="74" width="60" height="1.5" fill="#0F1B27" opacity="0.5"/>
      <rect x="36" y="78" width="48" height="1.5" fill="#0F1B27" opacity="0.5"/>
      <rect x="28" y="100" width="40" height="10" rx="5" fill={accent}/>
      <text x="48" y="107" fill="#FFFFFF" fontSize="5" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">READ MORE</text>
    </FrameBase>
  );
}

function BrochureMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Brochures">
      <g transform="translate(20 18)">
        <rect width="50" height="114" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="1"/>
        <rect x="0" y="0" width="50" height="40" fill={accent} opacity="0.3"/>
        <rect x="4" y="60" width="32" height="2" fill="#0F1B27"/>
        <rect x="4" y="66" width="40" height="1.5" fill="#0F1B27" opacity="0.5"/>
        <rect x="4" y="70" width="36" height="1.5" fill="#0F1B27" opacity="0.5"/>
      </g>
      <g transform="translate(74 18)">
        <rect width="50" height="114" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="1"/>
        <rect x="6" y="10" width="20" height="2" fill={accent}/>
        <rect x="6" y="16" width="38" height="1.5" fill="#0F1B27" opacity="0.5"/>
        <rect x="6" y="20" width="32" height="1.5" fill="#0F1B27" opacity="0.5"/>
        <rect x="6" y="38" width="38" height="20" fill={accent} opacity="0.18"/>
        <rect x="6" y="64" width="38" height="1.5" fill="#0F1B27" opacity="0.4"/>
        <rect x="6" y="68" width="30" height="1.5" fill="#0F1B27" opacity="0.4"/>
      </g>
      <g transform="translate(128 18)">
        <rect width="50" height="114" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="1"/>
        <rect x="6" y="10" width="20" height="2" fill={accent}/>
        <rect x="6" y="16" width="38" height="1.5" fill="#0F1B27" opacity="0.5"/>
        <rect x="6" y="20" width="28" height="1.5" fill="#0F1B27" opacity="0.5"/>
        <rect x="6" y="38" width="38" height="20" fill="none" stroke={accent} strokeOpacity="0.4"/>
        <rect x="6" y="100" width="14" height="6" rx="3" fill={accent}/>
      </g>
    </FrameBase>
  );
}

function ScriptMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Video Scripts">
      <g transform="translate(20 16)">
        <rect width="160" height="120" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="2"/>
        <rect x="8" y="10" width="40" height="2" fill={accent}/>
        <rect x="8" y="16" width="80" height="1.5" fill="#0F1B27" opacity="0.5"/>
        <rect x="8" y="24" width="20" height="6" rx="1" fill={accent} opacity="0.5"/>
        <rect x="32" y="26" width="80" height="1.5" fill="#0F1B27" opacity="0.8"/>
        <rect x="32" y="30" width="60" height="1.5" fill="#0F1B27" opacity="0.5"/>
        <rect x="8" y="42" width="20" height="6" rx="1" fill={accent} opacity="0.5"/>
        <rect x="32" y="44" width="100" height="1.5" fill="#0F1B27" opacity="0.8"/>
        <rect x="32" y="48" width="80" height="1.5" fill="#0F1B27" opacity="0.5"/>
        <rect x="32" y="52" width="50" height="1.5" fill="#0F1B27" opacity="0.5"/>
        <rect x="8" y="64" width="20" height="6" rx="1" fill={accent} opacity="0.5"/>
        <rect x="32" y="66" width="70" height="1.5" fill="#0F1B27" opacity="0.8"/>
        <rect x="32" y="70" width="100" height="1.5" fill="#0F1B27" opacity="0.5"/>
        <rect x="8" y="86" width="20" height="6" rx="1" fill={accent} opacity="0.5"/>
        <rect x="32" y="88" width="60" height="1.5" fill="#0F1B27" opacity="0.8"/>
        <rect x="32" y="92" width="80" height="1.5" fill="#0F1B27" opacity="0.5"/>
      </g>
    </FrameBase>
  );
}

function WebPageMock({ accent, label = "Web Page" }) {
  return (
    <FrameBase accent={accent} label={label}>
      <rect x="14" y="14" width="172" height="122" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="3"/>
      <rect x="14" y="14" width="172" height="8" fill={accent} opacity="0.18"/>
      <circle cx="20" cy="18" r="1" fill={accent}/>
      <circle cx="24" cy="18" r="1" fill={accent} opacity="0.6"/>
      <circle cx="28" cy="18" r="1" fill={accent} opacity="0.4"/>
      <rect x="20" y="30" width="80" height="3" fill="#0F1B27"/>
      <rect x="20" y="36" width="120" height="3" fill="#0F1B27"/>
      <rect x="20" y="42" width="60" height="3" fill="#0F1B27"/>
      <rect x="20" y="56" width="60" height="2" fill="#0F1B27" opacity="0.5"/>
      <rect x="20" y="60" width="80" height="2" fill="#0F1B27" opacity="0.5"/>
      <rect x="20" y="64" width="44" height="2" fill="#0F1B27" opacity="0.5"/>
      <rect x="20" y="76" width="24" height="8" rx="4" fill={accent}/>
      <rect x="120" y="30" width="60" height="80" fill={accent} opacity="0.18" rx="2"/>
      <rect x="14" y="116" width="172" height="20" fill={accent} opacity="0.06"/>
    </FrameBase>
  );
}

function PPTMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Deck">
      <rect x="40" y="20" width="120" height="68" fill="#FFFFFF" stroke={accent} strokeOpacity="0.5" rx="2"/>
      <rect x="48" y="30" width="40" height="3" fill={accent}/>
      <rect x="48" y="38" width="80" height="3" fill="#0F1B27"/>
      <rect x="48" y="44" width="60" height="3" fill="#0F1B27"/>
      <rect x="48" y="58" width="40" height="20" fill={accent} opacity="0.18"/>
      <rect x="92" y="58" width="40" height="20" fill="none" stroke={accent} strokeOpacity="0.4"/>
      {[0,1,2].map(i => (
        <rect key={i} x={20 + i*60} y={102} width="50" height="28" fill="#FFFFFF" stroke={accent} strokeOpacity="0.3" rx="1"/>
      ))}
    </FrameBase>
  );
}

function InfographicMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Infographic">
      <rect x="20" y="14" width="60" height="2" fill={accent}/>
      <rect x="20" y="18" width="40" height="2" fill="#0F1B27" opacity="0.6"/>
      <circle cx="60" cy="60" r="22" fill="none" stroke={accent} strokeWidth="6" opacity="0.4"/>
      <circle cx="60" cy="60" r="22" fill="none" stroke={accent} strokeWidth="6" strokeDasharray="60 200" transform="rotate(-90 60 60)"/>
      <text x="60" y="64" fill="#0F1B27" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">42%</text>
      <g transform="translate(100 38)">
        <rect width="6" height="40" fill={accent} opacity="0.4" y="20"/>
        <rect x="10" width="6" height="50" fill={accent} opacity="0.6" y="10"/>
        <rect x="20" width="6" height="32" fill={accent} opacity="0.5" y="28"/>
        <rect x="30" width="6" height="58" fill={accent} y="2"/>
        <rect x="40" width="6" height="44" fill={accent} opacity="0.7" y="16"/>
        <rect x="50" width="6" height="28" fill={accent} opacity="0.4" y="32"/>
      </g>
      <rect x="20" y="118" width="60" height="2" fill="#0F1B27" opacity="0.4"/>
      <rect x="20" y="124" width="80" height="2" fill="#0F1B27" opacity="0.4"/>
      <rect x="20" y="130" width="40" height="2" fill="#0F1B27" opacity="0.4"/>
    </FrameBase>
  );
}

function EventMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Event Asset">
      <rect x="20" y="14" width="160" height="122" fill={accent} opacity="0.1"/>
      <rect x="20" y="14" width="160" height="122" fill="none" stroke={accent} strokeOpacity="0.4"/>
      <text x="100" y="50" fill="#0F1B27" fontSize="10" fontWeight="800" textAnchor="middle" fontFamily="sans-serif" letterSpacing="2">SUMMIT 2024</text>
      <text x="100" y="78" fill={accent} fontSize="20" fontWeight="700" textAnchor="middle" fontFamily="'DM Sans', sans-serif" >Tomorrow,</text>
      <text x="100" y="96" fill={accent} fontSize="20" fontWeight="700" textAnchor="middle" fontFamily="'DM Sans', sans-serif" >today.</text>
      <rect x="80" y="108" width="40" height="2" fill={accent}/>
      <text x="100" y="124" fill="#0F1B27" opacity="0.6" fontSize="7" textAnchor="middle" fontFamily="sans-serif">28 NOV · MUMBAI</text>
    </FrameBase>
  );
}

function BannerMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Web Banner">
      <g transform="translate(20 28)">
        <rect width="160" height="32" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="2"/>
        <rect x="0" y="0" width="50" height="32" fill={accent} opacity="0.3"/>
        <rect x="58" y="8" width="50" height="3" fill="#0F1B27"/>
        <rect x="58" y="14" width="70" height="2" fill="#0F1B27" opacity="0.5"/>
        <rect x="58" y="18" width="40" height="2" fill="#0F1B27" opacity="0.5"/>
        <rect x="132" y="11" width="22" height="10" rx="5" fill={accent}/>
      </g>
      <g transform="translate(20 70)">
        <rect width="76" height="50" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="2"/>
        <rect x="0" y="0" width="76" height="22" fill={accent} opacity="0.3"/>
        <rect x="6" y="26" width="40" height="2" fill="#0F1B27"/>
        <rect x="6" y="30" width="60" height="2" fill="#0F1B27" opacity="0.5"/>
        <rect x="6" y="40" width="20" height="6" rx="3" fill={accent}/>
      </g>
      <g transform="translate(104 70)">
        <rect width="76" height="50" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="2"/>
        <rect x="6" y="6" width="50" height="3" fill={accent}/>
        <rect x="6" y="14" width="64" height="2" fill="#0F1B27" opacity="0.5"/>
        <rect x="6" y="18" width="50" height="2" fill="#0F1B27" opacity="0.5"/>
        <rect x="6" y="30" width="64" height="14" fill={accent} opacity="0.2"/>
      </g>
    </FrameBase>
  );
}

function PrintMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Print">
      <g transform="translate(40 12)">
        <rect width="120" height="126" fill="#F2EFE9" rx="1"/>
        <rect x="0" y="0" width="120" height="36" fill={accent} opacity="0.85"/>
        <text x="60" y="22" fill="#F2EFE9" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="'DM Sans', sans-serif" letterSpacing="1">REPORT 2024</text>
        <rect x="60" y="28" width="0.5" height="4" fill="#F2EFE9"/>
        <text x="60" y="34" fill="#F2EFE9" fontSize="5" textAnchor="middle" fontFamily="sans-serif" letterSpacing="1.5">QUARTERLY</text>
        <rect x="10" y="46" width="60" height="3" fill="#22222A"/>
        <rect x="10" y="52" width="100" height="2" fill="#22222A" opacity="0.6"/>
        <rect x="10" y="56" width="80" height="2" fill="#22222A" opacity="0.6"/>
        <rect x="10" y="68" width="48" height="50" fill={accent} opacity="0.25"/>
        <rect x="62" y="68" width="48" height="2" fill="#22222A" opacity="0.7"/>
        <rect x="62" y="72" width="48" height="1.5" fill="#22222A" opacity="0.4"/>
        <rect x="62" y="76" width="40" height="1.5" fill="#22222A" opacity="0.4"/>
        <rect x="62" y="80" width="44" height="1.5" fill="#22222A" opacity="0.4"/>
        <rect x="62" y="84" width="36" height="1.5" fill="#22222A" opacity="0.4"/>
        <rect x="62" y="96" width="20" height="2" fill={accent}/>
        <rect x="62" y="100" width="40" height="1.5" fill="#22222A" opacity="0.4"/>
        <rect x="62" y="104" width="44" height="1.5" fill="#22222A" opacity="0.4"/>
      </g>
    </FrameBase>
  );
}

function MotionMock({ accent, label = "Motion" }) {
  return (
    <FrameBase accent={accent} label={label}>
      <rect x="14" y="14" width="172" height="116" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="3"/>
      <rect x="14" y="14" width="172" height="116" fill={accent} opacity="0.06"/>
      <circle cx="100" cy="72" r="20" fill="rgba(10,13,18,0.8)" stroke={accent} strokeOpacity="0.9"/>
      <polygon points="94,62 94,82 112,72" fill={accent}/>
      <rect x="14" y="118" width="40" height="2" fill={accent}/>
      <rect x="14" y="118" width="172" height="2" fill={accent} opacity="0.18"/>
      <text x="20" y="110" fill="#0F1B27" opacity="0.5" fontSize="5" fontFamily="sans-serif" letterSpacing="1">00:00 / 01:24</text>
    </FrameBase>
  );
}

function ReelsMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Reels">
      {[0,1,2].map(i => (
        <g key={i} transform={`translate(${50 + i*36} ${24 - i*4})`}>
          <rect width="44" height="80" rx="4" fill="#FFFFFF" stroke={accent} strokeOpacity={0.4 + i*0.15}/>
          <rect width="44" height="80" rx="4" fill={accent} opacity={0.08 + i*0.04}/>
          <circle cx="22" cy="32" r="6" fill="rgba(10,13,18,0.8)" stroke={accent} strokeOpacity="0.8"/>
          <polygon points={`20,29 20,35 25,32`} fill={accent}/>
          <rect x="6" y="62" width="20" height="1.5" fill="#0F1B27" opacity="0.7"/>
          <rect x="6" y="66" width="28" height="1.5" fill="#0F1B27" opacity="0.4"/>
          <rect x="6" y="70" width="14" height="1.5" fill="#0F1B27" opacity="0.4"/>
        </g>
      ))}
    </FrameBase>
  );
}

function PodcastMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Podcast">
      <circle cx="60" cy="74" r="36" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4"/>
      <circle cx="60" cy="74" r="28" fill={accent} opacity="0.18"/>
      <circle cx="60" cy="74" r="18" fill={accent} opacity="0.3"/>
      <rect x="56" y="62" width="8" height="20" rx="4" fill={accent}/>
      <path d="M48 80 Q60 92 72 80" stroke={accent} strokeWidth="1.5" fill="none"/>
      <line x1="60" y1="92" x2="60" y2="98" stroke={accent} strokeWidth="1.5"/>
      <rect x="108" y="48" width="70" height="3" fill={accent}/>
      <rect x="108" y="56" width="60" height="2" fill="#0F1B27" opacity="0.5"/>
      <rect x="108" y="60" width="64" height="2" fill="#0F1B27" opacity="0.5"/>
      <rect x="108" y="78" width="50" height="1.5" fill="#0F1B27" opacity="0.4"/>
      <rect x="108" y="82" width="60" height="1.5" fill="#0F1B27" opacity="0.4"/>
      <g transform="translate(108 96)">
        {[0,1,2,3,4,5,6,7,8,9,10,11,12,13].map(i => (
          <rect key={i} x={i*5} width="2" height={6 + Math.sin(i*0.6)*4 + Math.abs(Math.sin(i*0.4))*6} y={4 - Math.abs(Math.sin(i*0.4))*3} fill={accent} opacity="0.7"/>
        ))}
      </g>
    </FrameBase>
  );
}

function TrainingMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Training">
      <rect x="14" y="14" width="172" height="100" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="3"/>
      <rect x="20" y="20" width="120" height="88" fill={accent} opacity="0.1"/>
      <rect x="146" y="20" width="34" height="88" fill={accent} opacity="0.18"/>
      <rect x="150" y="26" width="26" height="2" fill="#0F1B27"/>
      <rect x="150" y="32" width="20" height="1.5" fill="#0F1B27" opacity="0.5"/>
      <rect x="150" y="36" width="22" height="1.5" fill="#0F1B27" opacity="0.5"/>
      <rect x="150" y="48" width="14" height="2" fill={accent}/>
      <rect x="150" y="52" width="26" height="1.5" fill="#0F1B27" opacity="0.5"/>
      <rect x="150" y="56" width="22" height="1.5" fill="#0F1B27" opacity="0.5"/>
      <circle cx="80" cy="64" r="14" fill="rgba(10,13,18,0.8)" stroke={accent} strokeOpacity="0.9"/>
      <polygon points="76,58 76,70 88,64" fill={accent}/>
      <rect x="14" y="118" width="172" height="14" fill="#FFFFFF" stroke={accent} strokeOpacity="0.3" rx="2"/>
      <rect x="18" y="122" width="60" height="6" rx="3" fill={accent} opacity="0.7"/>
      <rect x="18" y="122" width="80" height="6" rx="3" fill={accent} opacity="0.2"/>
    </FrameBase>
  );
}

function WhiteboardMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Whiteboard">
      <rect x="14" y="14" width="172" height="116" fill="#F4F1E8" rx="2"/>
      <path d="M30 50 Q50 30 80 45 T140 40" stroke="#22222A" strokeWidth="1.5" fill="none" opacity="0.8"/>
      <circle cx="40" cy="78" r="8" fill="none" stroke="#22222A" strokeWidth="1.5"/>
      <line x1="40" y1="86" x2="40" y2="102" stroke="#22222A" strokeWidth="1.5"/>
      <line x1="40" y1="92" x2="30" y2="98" stroke="#22222A" strokeWidth="1.5"/>
      <line x1="40" y1="92" x2="50" y2="98" stroke="#22222A" strokeWidth="1.5"/>
      <line x1="40" y1="102" x2="32" y2="114" stroke="#22222A" strokeWidth="1.5"/>
      <line x1="40" y1="102" x2="48" y2="114" stroke="#22222A" strokeWidth="1.5"/>
      <rect x="70" y="70" width="40" height="24" fill="none" stroke="#22222A" strokeWidth="1.5" rx="2"/>
      <line x1="76" y1="78" x2="104" y2="78" stroke="#22222A" strokeWidth="1"/>
      <line x1="76" y1="84" x2="100" y2="84" stroke="#22222A" strokeWidth="1"/>
      <line x1="76" y1="90" x2="96" y2="90" stroke="#22222A" strokeWidth="1"/>
      <path d="M120 70 L140 80 L120 90 Z" fill="none" stroke="#22222A" strokeWidth="1.5"/>
      <path d="M58 82 L70 82" stroke="#22222A" strokeWidth="1.5" fill="none"/>
      <path d="M110 82 L120 82" stroke="#22222A" strokeWidth="1.5" fill="none"/>
      <circle cx="160" cy="92" r="6" fill={accent} opacity="0.6"/>
    </FrameBase>
  );
}

function StaticPostMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Static Post">
      <rect x="50" y="14" width="100" height="122" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="3"/>
      <rect x="50" y="14" width="100" height="100" fill={accent} opacity="0.18"/>
      <text x="100" y="56" fill="#0F1B27" fontSize="9" fontWeight="800" textAnchor="middle" fontFamily="sans-serif" letterSpacing="1.5">THE FUTURE</text>
      <text x="100" y="72" fill={accent} fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="'DM Sans', sans-serif" >is now</text>
      <rect x="86" y="80" width="28" height="2" fill={accent}/>
      <text x="100" y="94" fill="#0F1B27" opacity="0.6" fontSize="5" textAnchor="middle" fontFamily="sans-serif" letterSpacing="1">#netscribes</text>
      <rect x="54" y="118" width="40" height="2" fill="#0F1B27" opacity="0.7"/>
      <rect x="54" y="124" width="60" height="1.5" fill="#0F1B27" opacity="0.4"/>
      <rect x="54" y="128" width="50" height="1.5" fill="#0F1B27" opacity="0.4"/>
    </FrameBase>
  );
}

function GifMock({ accent }) {
  return (
    <FrameBase accent={accent} label="GIF">
      <rect x="50" y="32" width="100" height="76" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="3"/>
      <rect x="50" y="32" width="100" height="76" fill={accent} opacity="0.1" rx="3"/>
      {[0,1,2].map(i => (
        <circle key={i} cx={84 + i*16} cy={70} r="5" fill={accent} opacity={0.4 + i*0.2}>
          <animate attributeName="opacity" values={`0.3;1;0.3`} dur="1.2s" begin={`${i*0.2}s`} repeatCount="indefinite"/>
        </circle>
      ))}
      <rect x="56" y="100" width="20" height="3" fill={accent}/>
      <rect x="56" y="116" width="40" height="2" fill="#0F1B27" opacity="0.5"/>
      <text x="148" y="42" fill={accent} fontSize="6" fontWeight="700" textAnchor="end" fontFamily="sans-serif" letterSpacing="1">GIF</text>
    </FrameBase>
  );
}

function TeaserMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Teaser">
      <rect x="14" y="14" width="172" height="116" fill="#FFFFFF" rx="3"/>
      <rect x="14" y="14" width="172" height="116" fill={accent} opacity="0.18" rx="3"/>
      <text x="100" y="60" fill="#0F1B27" fontSize="16" fontWeight="800" textAnchor="middle" fontFamily="'DM Sans', sans-serif" >Coming</text>
      <text x="100" y="84" fill={accent} fontSize="22" fontWeight="800" textAnchor="middle" fontFamily="'DM Sans', sans-serif" >Tomorrow.</text>
      <rect x="90" y="96" width="20" height="2" fill={accent}/>
      <text x="100" y="116" fill="#0F1B27" opacity="0.6" fontSize="6" textAnchor="middle" fontFamily="sans-serif" letterSpacing="2">15 SEC TEASER</text>
    </FrameBase>
  );
}

function MemeMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Meme">
      <rect x="50" y="20" width="100" height="100" fill="#1A1E26" stroke={accent} strokeOpacity="0.3" rx="2"/>
      <text x="100" y="42" fill="#FFFFFF" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="Impact, sans-serif" stroke="#000" strokeWidth="0.4">WHEN MARKETING</text>
      <text x="100" y="56" fill="#FFFFFF" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="Impact, sans-serif" stroke="#000" strokeWidth="0.4">SAYS "JUST POST"</text>
      <rect x="70" y="62" width="60" height="36" fill={accent} opacity="0.3"/>
      <circle cx="86" cy="78" r="4" fill="#FFF"/>
      <circle cx="114" cy="78" r="4" fill="#FFF"/>
      <path d="M85 90 Q100 96 115 90" stroke="#FFF" strokeWidth="1.5" fill="none"/>
      <text x="100" y="116" fill="#FFFFFF" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="Impact, sans-serif" stroke="#000" strokeWidth="0.4">ME, EXISTING</text>
    </FrameBase>
  );
}

function CarouselMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Carousels">
      {[0,1,2,3,4].map(i => (
        <g key={i} transform={`translate(${22 + i*32} ${30 + Math.abs(i-2)*4})`}>
          <rect width="42" height="72" fill="#FFFFFF" stroke={accent} strokeOpacity={i===2 ? 0.9 : 0.3} rx="3"/>
          <rect width="42" height="72" fill={accent} opacity={i===2 ? 0.2 : 0.06} rx="3"/>
          {i===2 && <>
            <rect x="6" y="10" width="14" height="2" fill={accent}/>
            <rect x="6" y="16" width="28" height="3" fill="#0F1B27"/>
            <rect x="6" y="22" width="20" height="3" fill="#0F1B27"/>
            <rect x="6" y="36" width="30" height="1.5" fill="#0F1B27" opacity="0.5"/>
            <rect x="6" y="40" width="26" height="1.5" fill="#0F1B27" opacity="0.5"/>
            <rect x="6" y="44" width="28" height="1.5" fill="#0F1B27" opacity="0.5"/>
            <rect x="6" y="60" width="14" height="6" rx="3" fill={accent}/>
          </>}
        </g>
      ))}
      <g transform="translate(86 124)">
        {[0,1,2,3,4].map(i => (
          <circle key={i} cx={i*6} cy="0" r="1.5" fill={accent} opacity={i===2 ? 1 : 0.3}/>
        ))}
      </g>
    </FrameBase>
  );
}

function CopyMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Copywriting">
      <text x="20" y="36" fill={accent} fontFamily="'DM Sans', sans-serif" fontSize="28" >"</text>
      <rect x="20" y="48" width="160" height="2" fill="#0F1B27" opacity="0.9"/>
      <rect x="20" y="56" width="140" height="2" fill="#0F1B27" opacity="0.9"/>
      <rect x="20" y="64" width="160" height="2" fill="#0F1B27" opacity="0.9"/>
      <rect x="20" y="72" width="100" height="2" fill="#0F1B27" opacity="0.9"/>
      <rect x="20" y="92" width="40" height="0.5" fill={accent}/>
      <rect x="20" y="100" width="50" height="2" fill={accent}/>
      <rect x="20" y="106" width="60" height="1.5" fill="#0F1B27" opacity="0.5"/>
    </FrameBase>
  );
}

function ComicMock({ accent }) {
  return (
    <FrameBase accent={accent} label="Comic">
      {[0,1,2,3].map(i => {
        const x = 20 + (i%2)*84;
        const y = 16 + Math.floor(i/2)*60;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <rect width="76" height="52" fill="#FFFFFF" stroke={accent} strokeOpacity="0.4" rx="2"/>
            <rect width="76" height="52" fill={accent} opacity="0.08" rx="2"/>
            <circle cx="22" cy="26" r="8" fill="none" stroke="#0F1B27" opacity="0.7"/>
            <line x1="22" y1="34" x2="22" y2="46" stroke="#0F1B27" opacity="0.7"/>
            <rect x="40" y="10" width="32" height="14" rx="6" fill="#0F1B27" opacity="0.85"/>
            <rect x="44" y="14" width="18" height="2" fill="#22222A"/>
            <rect x="44" y="18" width="22" height="2" fill="#22222A"/>
          </g>
        );
      })}
    </FrameBase>
  );
}

function GenericMock({ accent, label = "Sample" }) {
  return (
    <FrameBase accent={accent} label={label}>
      <rect x="30" y="30" width="60" height="90" fill={accent} opacity="0.18" rx="3"/>
      <rect x="100" y="30" width="70" height="40" fill={accent} opacity="0.1" rx="3"/>
      <rect x="100" y="78" width="70" height="42" fill="none" stroke={accent} strokeOpacity="0.4" rx="3"/>
    </FrameBase>
  );
}

const MOCK_BY_TYPE = {
  "Whitepapers": WhitepaperMock,
  "POVs": POVMock,
  "Blogs": (p) => <POVMock {...p} label="Blogs"/>, "Blog": (p) => <POVMock {...p} label="Blogs"/>,
  "Report": WhitepaperMock, "Reports": WhitepaperMock, "Report Designs": PrintMock,
  "eBooks": EbookMock,
  "Case Studies": CaseMock,
  "Emailers": EmailMock, "Emailer & Newsletters": EmailMock, "Emailer and Newsletters": EmailMock, "Newsletter": EmailMock,
  "Brochures": BrochureMock,
  "Video Scripts": ScriptMock,
  "Web Copies": (p) => <WebPageMock {...p} label="Web Copy"/>,
  "Landing Page": (p) => <WebPageMock {...p} label="Landing Page"/>,
  "Web Page": WebPageMock,
  "PPT / Deck": PPTMock, "PPT": PPTMock, "Deck": PPTMock,
  "Infographic": InfographicMock, "Infographics": InfographicMock,
  "Event Based Assets": EventMock,
  "Web Banners": BannerMock,
  "Print Publications": PrintMock,
  "Motion Graphics": MotionMock, "Motion Graphics with Character Animation": MotionMock,
  "Footage / Image-Based": (p) => <MotionMock {...p} label="Footage"/>,
  "Reels & Shorts": ReelsMock, "Reels": ReelsMock,
  "Podcasts": PodcastMock, "Podcast / Thought Leadership Interviews": PodcastMock, "Podcast": PodcastMock,
  "Training Videos": TrainingMock, "Training Video": TrainingMock,
  "Whiteboard Animations": WhiteboardMock,
  "Character Animations": MotionMock,
  "Copywriting": CopyMock,
  "Static Posts": StaticPostMock,
  "GIFs": GifMock, "GIF": GifMock, "GIFs + Posts": GifMock,
  "Teasers": TeaserMock,
  "Memes": MemeMock,
  "Carousels": CarouselMock,
  "Corporate Comics": ComicMock,
};

function FormatMock({ type, accent }) {
  const Comp = MOCK_BY_TYPE[type] || GenericMock;
  return <Comp accent={accent} label={type}/>;
}

// ─── Lead capture modals ──────────────────────────────────────────

function useLockScroll(onClose) {
  useEffect(() => {
    const h = e => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", h);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", h);
    };
  }, [onClose]);
}

function FormField({ label, type = "text", value, onChange, required, textarea, autoFocus }) {
  const shared = {
    value,
    onChange: e => onChange(e.target.value),
    required,
    autoFocus,
    style: {
      width: "100%",
      padding: "11px 13px",
      fontSize: 14,
      fontFamily: "'DM Sans', sans-serif",
      color: NS.ink,
      background: NS.paper,
      border: `1px solid ${NS.rule}`,
      borderRadius: 2,
      outline: "none",
      transition: "border-color 0.18s, background 0.18s",
      resize: textarea ? "vertical" : "none",
    },
    onFocus: e => { e.currentTarget.style.borderColor = NS.blue; e.currentTarget.style.background = NS.surface; },
    onBlur:  e => { e.currentTarget.style.borderColor = NS.rule; e.currentTarget.style.background = NS.paper; },
  };
  return (
    <label style={{ display: "block", marginBottom: 14 }}>
      <span style={{
        display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
        textTransform: "uppercase", color: NS.muted, marginBottom: 6,
      }}>{label}{required && " *"}</span>
      {textarea
        ? <textarea {...shared} rows={4}/>
        : <input type={type} {...shared}/>}
    </label>
  );
}

function LeadModal({ title, eyebrow, blurb, fields, submitLabel, accent = NS.blue, onClose, onSubmit }) {
  useLockScroll(onClose);
  const [values, setValues] = useState(() => Object.fromEntries(fields.map(f => [f.name, ""])));
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit?.(values);
    setSubmitted(true);
  };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1100,
      background: "rgba(15, 27, 39, 0.55)",
      backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20, animation: "ns-fade .25s ease", overflow: "auto",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: 440,
        background: NS.surface,
        border: `1px solid ${NS.rule}`,
        borderTop: `3px solid ${accent}`,
        animation: "ns-pop .35s cubic-bezier(0.22,1,0.36,1)",
        boxShadow: "0 30px 80px rgba(15,27,39,0.18)",
        position: "relative",
      }}>
        <button onClick={onClose} aria-label="Close" style={{
          position: "absolute", top: 14, right: 14, zIndex: 2,
          background: NS.surface, border: `1px solid ${NS.rule}`,
          color: NS.ink, cursor: "pointer", borderRadius: "50%",
          width: 30, height: 30, fontSize: 16,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>×</button>

        <div style={{ padding: "26px 28px 24px" }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "14px 0 8px" }}>
              <p style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.24em",
                textTransform: "uppercase", color: NS.red, marginBottom: 14,
              }}>You're in</p>
              <h2 style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                fontSize: 24, color: NS.ink, lineHeight: 1.15,
                letterSpacing: "-0.02em", marginBottom: 10,
              }}>Thank you, {values.name?.split(" ")[0] || "there"}.</h2>
              <p style={{
                color: NS.inkSoft, fontSize: 13.5, lineHeight: 1.6, marginBottom: 22,
              }}>We'll be in touch shortly with what you asked for.</p>
              <button onClick={onClose} style={{
                padding: "11px 22px", borderRadius: 2, background: accent,
                border: "none", color: "#FFFFFF", fontWeight: 600, fontSize: 13,
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.01em",
              }}>Close</button>
            </div>
          ) : (
            <>
              {eyebrow && <p style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.24em",
                textTransform: "uppercase", color: accent, marginBottom: 12,
              }}>{eyebrow}</p>}
              <h2 style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                fontSize: 24, color: NS.ink, lineHeight: 1.15,
                letterSpacing: "-0.02em", marginBottom: 8,
              }}>{title}</h2>
              {blurb && <p style={{
                color: NS.inkSoft, fontSize: 13.5, lineHeight: 1.6, marginBottom: 20,
              }}>{blurb}</p>}
              <form onSubmit={handleSubmit}>
                {fields.map((f, i) => (
                  <FormField
                    key={f.name}
                    label={f.label}
                    type={f.type}
                    textarea={f.textarea}
                    required={f.required}
                    autoFocus={i === 0}
                    value={values[f.name]}
                    onChange={v => setValues(s => ({ ...s, [f.name]: v }))}
                  />
                ))}
                <button type="submit" style={{
                  width: "100%", padding: "13px 0", borderRadius: 2,
                  background: accent, border: "none", color: "#FFFFFF",
                  fontWeight: 600, fontSize: 14, cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.01em",
                  marginTop: 4,
                }}>{submitLabel}</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


function StrategistModal({ onClose }) {
  return (
    <LeadModal
      eyebrow="Talk to a strategist"
      title="Let's scope it together."
      blurb="Share a few details and a strategist will reach out within one working day."
      submitLabel="Send message →"
      accent={NS.red}
      fields={[
        { name: "name",    label: "Full name",     required: true },
        { name: "email",   label: "Work email",    type: "email", required: true },
        { name: "phone",   label: "Phone number",  type: "tel" },
        { name: "message", label: "Message",       textarea: true, required: true },
      ]}
      onClose={onClose}
    />
  );
}

// ─── Header ───────────────────────────────────────────────────────

function Header({ onHome }) {
  return (
    <header style={{
      padding: "18px clamp(20px, 4vw, 44px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: `1px solid ${NS.rule}`,
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: "rgba(245, 241, 234, 0.88)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
    }}>
      <button onClick={onHome} style={{
        background: "none", border: "none", cursor: "pointer", padding: 0,
        display: "flex", alignItems: "center", gap: 12,
      }} aria-label="Home">
        <img src={logoSrc} alt="Netscribes" style={{ height: 28, width: "auto" }}/>
      </button>

      <nav style={{ display: "flex", alignItems: "center", gap: 24 }} className="ns-nav-links" />

    </header>
  );
}

// ─── Hero copy block ──────────────────────────────────────────────

function HeroIntro() {
  return (
    <div style={{
      maxWidth: 1160,
      margin: "0 auto",
      padding: "clamp(36px, 6vw, 72px) clamp(20px, 4vw, 44px) clamp(24px, 4vw, 40px)",
      borderBottom: `1px solid ${NS.rule}`,
    }}>
      <div style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 32,
        flexWrap: "wrap",
      }}>
        <div style={{ maxWidth: 720 }}>
          <p style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.26em",
            textTransform: "uppercase", color: NS.red,
            marginBottom: 24,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ display: "inline-block", width: 28, height: 1, background: NS.red }}/>
            {"\n"}
          </p>
          <h1 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(44px, 6.4vw, 76px)",
            lineHeight: 1.02,
            letterSpacing: "-0.025em",
            color: NS.ink,
            textWrap: "balance",
          }}>
            A partner for you,{" "}
            <em style={{ fontStyle: "normal", color: NS.blue }}>across every format.</em>
          </h1>
        </div>
        <p style={{
          color: NS.inkSoft,
          fontSize: 15,
          lineHeight: 1.65,
          maxWidth: 360,
          fontWeight: 400,
        }}>
          Pick a service — every tile opens onto real samples, filterable by industry.
        </p>
      </div>
    </div>
  );
}

// ─── Hero tile grid ───────────────────────────────────────────────

function HeroTiles({ onSelect, mobile }) {
  return (
    <div style={{
      maxWidth: 1160,
      margin: "0 auto",
      padding: "0 clamp(20px,4vw,44px)",
      display: "grid",
      gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
      borderLeft: `1px solid ${NS.rule}`,
      borderRight: `1px solid ${NS.rule}`,
    }}>
      {CATS.map((cat, i) => (
        <HeroTile key={cat.id} cat={cat} index={i} onClick={() => onSelect(cat.id)} mobile={mobile}/>
      ))}
    </div>
  );
}

function HeroTile({ cat, index, onClick, mobile }) {
  const [hov, setHov] = useState(false);
  const total = CATS.length;
  const cols = mobile ? 1 : 2;
  const lastRowStart = Math.floor((total - 1) / cols) * cols;
  const spanFull = !mobile && (index === total - 1) && (total % cols === 1);
  const isRight = !mobile && (spanFull || index % 2 === 1);
  const isBottom = index >= lastRowStart;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textAlign: "left",
        gridColumn: spanFull ? "1 / -1" : undefined,
        background: hov ? cat.color : NS.surface,
        border: "none",
        borderRight: !isRight ? `1px solid ${NS.rule}` : "none",
        borderBottom: !isBottom ? `1px solid ${NS.rule}` : "none",
        padding: mobile ? "32px 24px" : "44px 40px 36px",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        minHeight: mobile ? 220 : 280,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 24,
        transition: "background 0.32s cubic-bezier(0.22,1,0.36,1)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 12,
      }}>
        <span style={{
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.12em",
          color: hov ? "rgba(255,255,255,0.7)" : NS.muted,
          transition: "color 0.32s",
        }}>{cat.num} / {String(CATS.length).padStart(2, "0")}</span>
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: hov ? "rgba(255,255,255,0.78)" : cat.color,
          padding: "5px 10px",
          border: `1px solid ${hov ? "rgba(255,255,255,0.45)" : cat.color + "55"}`,
          transition: "color 0.32s, border-color 0.32s",
        }}>{cat.tag}</span>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 14 }}>
        <h2 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          fontSize: mobile ? 44 : "clamp(46px, 5.2vw, 64px)",
          letterSpacing: "-0.025em",
          lineHeight: 0.98,
          color: hov ? "#FFFFFF" : NS.ink,
          transition: "color 0.32s",
        }}>{cat.label}</h2>
        <p style={{
          fontSize: 14,
          color: hov ? "rgba(255,255,255,0.85)" : NS.inkSoft,
          lineHeight: 1.5,
          maxWidth: 320,
          wordBreak: "keep-all",
          overflowWrap: "normal",
          transition: "color 0.32s",
        }}>{cat.blurb}</p>
      </div>

      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        paddingTop: 16,
        borderTop: `1px solid ${hov ? "rgba(255,255,255,0.25)" : NS.ruleSoft}`,
        transition: "border-color 0.32s",
      }}>
        <span style={{
          fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase",
          color: hov ? "#FFFFFF" : cat.color,
          transition: "color 0.32s",
        }}>View samples</span>
        <span style={{
          fontSize: 18,
          color: hov ? "#FFFFFF" : cat.color,
          transition: "color 0.32s, transform 0.32s",
          transform: hov ? "translateX(4px)" : "none",
        }}>→</span>
      </div>
    </button>
  );
}

// ─── Category strip (selected state) ──────────────────────────────

function CategoryStrip({ selected, onSelect, mobile }) {
  return (
    <div style={{
      maxWidth: 1160,
      margin: "0 auto",
      padding: "0 clamp(20px,4vw,44px)",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: mobile ? "repeat(2, 1fr)" : `repeat(${CATS.length}, 1fr)`,
        border: `1px solid ${NS.rule}`,
        background: NS.surface,
      }}>
        {CATS.map((cat, i) => {
          const active = cat.id === selected;
          const isLast = i === CATS.length - 1;
          const mobileCols = 2;
          const mobileLastRowStart = Math.floor((CATS.length - 1) / mobileCols) * mobileCols;
          const isRightEdge = mobile ? (i % 2 === 1 || isLast) : isLast;
          const isBottomEdge = mobile ? (i >= mobileLastRowStart) : true;
          return (
            <StripTile
              key={cat.id}
              cat={cat}
              active={active}
              onClick={() => onSelect(cat.id)}
              borderRight={!isRightEdge}
              borderBottom={mobile && !isBottomEdge}
              mobile={mobile}
            />
          );
        })}
      </div>
    </div>
  );
}

function StripTile({ cat, active, onClick, borderRight, borderBottom, mobile }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textAlign: "left",
        background: active ? cat.color : (hov ? NS.paperDeep : NS.surface),
        borderRight: borderRight ? `1px solid ${NS.rule}` : "none",
        borderBottom: borderBottom ? `1px solid ${NS.rule}` : "none",
        borderTop: "none",
        borderLeft: "none",
        padding: mobile ? "18px 18px" : "22px 22px",
        cursor: "pointer",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        fontFamily: "'DM Sans', sans-serif",
        transition: "background 0.22s",
      }}
    >
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 12,
      }}>
        <span style={{
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.12em",
          color: active ? "rgba(255,255,255,0.75)" : NS.muted,
        }}>{cat.num}</span>
        {active && (
          <span style={{
            width: 6, height: 6, borderRadius: "50%", background: "#FFFFFF",
          }}/>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
        <h3 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          fontSize: mobile ? 24 : 30,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          color: active ? "#FFFFFF" : NS.ink,
          whiteSpace: "nowrap",
        }}>{cat.label}</h3>
      </div>
      <span style={{
        fontSize: 10, fontWeight: 700, letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: active ? "rgba(255,255,255,0.78)" : cat.color,
      }}>{cat.tag}</span>
    </button>
  );
}

// ─── Section banner ──────────────────────────────────────────────

function SectionBanner({ cat, mobile }) {
  return (
    <div style={{
      maxWidth: 1160,
      margin: "0 auto",
      padding: "0 clamp(20px,4vw,44px)",
      overflow: "hidden",
    }}>
      <div style={{
        borderLeft: `1px solid ${NS.rule}`,
        borderRight: `1px solid ${NS.rule}`,
        borderBottom: `1px solid ${NS.rule}`,
        background: NS.surface,
        padding: mobile ? "24px 20px" : "32px 32px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 24,
        flexWrap: "wrap",
      }}>
        <div style={{ flex: "1 1 320px" }}>
          <p style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.24em",
            textTransform: "uppercase", color: cat.color, marginBottom: 8,
          }}>Now showing · {cat.tag} samples</p>
          <h2 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: mobile ? 32 : 44,
            letterSpacing: "-0.02em",
            color: NS.ink,
            lineHeight: 1.02,
          }}>{cat.label}</h2>
          <p style={{
            marginTop: 8,
            color: NS.inkSoft,
            fontSize: mobile ? 13 : "clamp(10px, 1.1vw, 14px)",
            maxWidth: "100%",
            lineHeight: 1.55,
            whiteSpace: mobile ? "normal" : "nowrap",
            overflow: mobile ? "visible" : "hidden",
            wordBreak: "keep-all",
            overflowWrap: "normal",
          }}>{cat.blurb}</p>
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 11,
          color: NS.muted,
          letterSpacing: "0.08em",
        }}></div>
      </div>
    </div>
  );
}

// ─── Filter row ──────────────────────────────────────────────────

function FilterRow({ industry, setIndustry, accent, mobile }) {
  return (
    <div style={{
      maxWidth: 1160,
      margin: "0 auto",
      padding: "clamp(24px,4vw,40px) clamp(20px,4vw,44px) 20px",
      display: "flex",
      alignItems: "center",
      gap: 8,
      flexWrap: "wrap",
    }}>
      <span style={{
        fontSize: 10, fontWeight: 700, letterSpacing: "0.22em",
        textTransform: "uppercase", color: NS.muted,
        marginRight: 8,
      }}>Filter by industry</span>
      {[{ id: null, label: "All" }, ...INDUSTRIES].map(ind => {
        const active = industry === ind.id;
        return (
          <button
            key={ind.id || "all"}
            onClick={() => setIndustry(ind.id)}
            style={{
              padding: "7px 14px",
              borderRadius: 2,
              fontSize: 12,
              fontWeight: 500,
              border: `1px solid ${active ? accent : NS.rule}`,
              background: active ? accent : NS.surface,
              color: active ? "#FFFFFF" : NS.inkSoft,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.18s",
              whiteSpace: "nowrap",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = accent + "80"; e.currentTarget.style.color = NS.ink; } }}
            onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = NS.rule; e.currentTarget.style.color = NS.inkSoft; } }}
          >{ind.label}</button>
        );
      })}
    </div>
  );
}

// ─── Detail panels per category ──────────────────────────────────

function ContentDetail({ accent, industry, onPreview, mobile }) {
  const visibleSubs = CONTENT_SUBS
    .map(sub => {
      const formats = sub.formats.filter(fmt => {
        if (!industry) return true;
        const list = CURATED.content[fmt] || [];
        return list.some(s => s.industry === industry);
      });
      return { ...sub, formats };
    })
    .filter(sub => sub.formats.length > 0);

  const [openId, setOpenId] = useState(visibleSubs[0]?.id ?? null);
  useEffect(() => {
    if (!visibleSubs.find(s => s.id === openId)) {
      setOpenId(visibleSubs[0]?.id ?? null);
    }
  }, [industry]);

  if (visibleSubs.length === 0) {
    const indLabel = INDUSTRIES.find(i => i.id === industry)?.label;
    return (
      <p style={{ textAlign: "center", color: NS.muted, fontSize: 13, padding: "40px 0", fontFamily: "'DM Sans', sans-serif" }}>
        No Content samples for {indLabel} yet.
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: mobile ? 14 : 18 }}>
      {visibleSubs.map(sub => (
        <ParentCard
          key={sub.id}
          sub={sub}
          accent={accent}
          industry={industry}
          onPreview={onPreview}
          open={openId === sub.id}
          onToggle={() => setOpenId(prev => prev === sub.id ? null : sub.id)}
          mobile={mobile}
        />
      ))}
    </div>
  );
}

function ParentCard({ sub, accent, industry, onPreview, open, onToggle, mobile }) {
  return (
    <div style={{
      background: NS.surface,
      border: `1px solid ${NS.rule}`,
      borderLeft: `3px solid ${accent}`,
      overflow: "hidden",
    }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          textAlign: "left",
          background: "transparent",
          border: "none",
          padding: mobile ? "22px 22px" : "26px 28px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div>
          <p style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.22em",
            textTransform: "uppercase", color: accent, marginBottom: 8,
          }}>{sub.formats.length} formats</p>
          <h3 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: mobile ? 26 : 30, lineHeight: 1.05,
            letterSpacing: "-0.015em",
            color: NS.ink,
          }}>{sub.name}</h3>
        </div>
        <span style={{
          width: 38, height: 38, borderRadius: "50%",
          background: accent + "14", color: accent,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, flexShrink: 0,
          transition: "transform 0.25s",
          transform: open ? "rotate(45deg)" : "none",
        }}>+</span>
      </button>
      {open && (
        <div style={{
          padding: mobile ? "0 16px 20px" : "0 24px 26px",
          borderTop: `1px solid ${NS.ruleSoft}`,
          paddingTop: mobile ? 16 : 22,
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
            gap: mobile ? 12 : 16,
          }}>
            {sub.formats.map(fmt => {
              const list = CURATED.content[fmt] || [];
              const disabled = !!industry && !list.some(s => s.industry === industry);
              return (
                <FormatCard
                  key={fmt}
                  format={fmt}
                  category="content"
                  accent={accent}
                  disabled={disabled}
                  onClick={() => !disabled && onPreview({ format: fmt, category: "content", industry, parent: sub.name })}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function FormatGrid({ formats, category, accent, industry, onPreview, mobile }) {
  const visible = industry
    ? formats.filter(fmt => {
        const list = (CURATED[category] && CURATED[category][fmt]) || [];
        return list.some(s => s.industry === industry);
      })
    : formats;

  if (visible.length === 0) {
    const indLabel = INDUSTRIES.find(i => i.id === industry)?.label;
    const catLabel = CAT_BY_ID[category]?.label;
    return (
      <p style={{ textAlign: "center", color: NS.muted, fontSize: 13, padding: "40px 0", fontFamily: "'DM Sans', sans-serif" }}>
        No {catLabel} samples for {indLabel} yet.
      </p>
    );
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
      gap: mobile ? 12 : 16,
    }}>
      {visible.map(fmt => (
        <FormatCard key={fmt} format={fmt} category={category} accent={accent}
          onClick={() => onPreview({ format: fmt, category, industry })}/>
      ))}
    </div>
  );
}

function FormatCard({ format, category, accent, onClick, disabled }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => !disabled && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textAlign: "left",
        background: NS.surface,
        border: `1px solid ${hov && !disabled ? accent : NS.rule}`,
        padding: 0,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.35 : 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
        transition: "all 0.22s, transform 0.22s",
        transform: hov && !disabled ? "translateY(-3px)" : "none",
        boxShadow: hov && !disabled ? `0 14px 32px ${accent}1F` : "0 0 0 transparent",
      }}
    >
      <div style={{ padding: 10, background: NS.paper, borderBottom: `1px solid ${NS.ruleSoft}` }}>
        {getThumbnail(category, format) ? (
          <div style={{
            position: "relative", width: "100%", aspectRatio: "4/3",
            borderRadius: 14, overflow: "hidden",
            border: `1px solid ${accent}24`,
          }}>
            <img src={getThumbnail(category, format)} alt={format}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
            <div style={{
              position: "absolute", left: 10, bottom: 10,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 9, fontWeight: 600, letterSpacing: "0.14em",
              textTransform: "uppercase", color: accent,
              padding: "3px 8px", borderRadius: 100,
              background: "rgba(255,255,255,0.92)",
              border: `1px solid ${accent}40`,
              backdropFilter: "blur(8px)",
            }}>{format}</div>
          </div>
        ) : (
          <FormatMock type={format} accent={accent}/>
        )}
      </div>
      <div style={{ padding: "14px 16px 18px" }}>
        <h4 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          fontSize: 14, lineHeight: 1.3,
          color: NS.ink,
          letterSpacing: "-0.005em",
        }}>{format}</h4>
        <p style={{
          marginTop: 4,
          fontSize: 11,
          fontWeight: 600,
          color: hov ? accent : NS.muted,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          transition: "color 0.22s",
        }}>{hov ? "View sample →" : "Format"}</p>
      </div>
    </button>
  );
}

// ─── Sample Picker + Viewer ───────────────────────────────────────

function useEscClose(onClose) {
  useEffect(() => {
    const h = e => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", h);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", h);
    };
  }, [onClose]);
}

function SamplePicker({ payload, onClose, onPick }) {
  const { format, category, industry, parent } = payload;
  const accent = CAT_BY_ID[category].color;
  const samples = (CURATED[category] && CURATED[category][format]) || [];
  useEscClose(onClose);

  const INDUSTRY_ORDER = ["telecom", "tech"];
  const ordered = [...samples].sort((a, b) => {
    const ai = INDUSTRY_ORDER.indexOf(a.industry);
    const bi = INDUSTRY_ORDER.indexOf(b.industry);
    // If filtering by industry, prioritize matching
    if (industry) {
      const am = a.industry === industry ? -1 : 0;
      const bm = b.industry === industry ? -1 : 0;
      if (am !== bm) return am - bm;
    }
    // Then sort by priority order (telecom, tech first)
    const aOrder = ai === -1 ? 999 : ai;
    const bOrder = bi === -1 ? 999 : bi;
    return aOrder - bOrder;
  });

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(15, 27, 39, 0.55)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20,
      animation: "ns-fade .25s ease",
      overflow: "auto",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: 640,
        maxHeight: "calc(100vh - 40px)",
        background: NS.surface,
        border: `1px solid ${NS.rule}`,
        borderTop: `3px solid ${accent}`,
        display: "flex", flexDirection: "column",
        animation: "ns-pop .35s cubic-bezier(0.22,1,0.36,1)",
        boxShadow: "0 30px 80px rgba(15,27,39,0.18)",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 24px", borderBottom: `1px solid ${NS.ruleSoft}`,
          gap: 12,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "#FFFFFF",
              padding: "4px 10px", borderRadius: 2,
              background: accent,
            }}>{format}</span>
            {parent && (
              <span style={{
                fontSize: 10, fontWeight: 600, letterSpacing: "0.14em",
                textTransform: "uppercase", color: NS.muted,
              }}>{parent}</span>
            )}
          </div>
          <button onClick={onClose} aria-label="Close" style={{
            background: NS.surface, border: `1px solid ${NS.rule}`,
            color: NS.ink, cursor: "pointer", borderRadius: "50%",
            width: 30, height: 30, fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>×</button>
        </div>
        <div style={{ padding: "16px 24px 8px" }}>
          <p style={{ color: NS.inkSoft, fontSize: 13 }}>
            {ordered.length} samples — pick one to preview
          </p>
        </div>
        <div style={{ padding: "8px 16px 20px", overflow: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
          {ordered.map((s, i) => {
            const matches = !industry || s.industry === industry;
            const indLabel = INDUSTRIES.find(x => x.id === s.industry)?.label;
            return (
              <button
                key={i}
                onClick={() => onPick(s)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  gap: 14, textAlign: "left",
                  background: NS.surface,
                  border: `1px solid ${NS.rule}`,
                  padding: "14px 16px",
                  cursor: "pointer",
                  opacity: matches ? 1 : 0.5,
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "border-color 0.18s, transform 0.18s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = accent; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = NS.rule; }}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p style={{
                    fontSize: 9, fontWeight: 700, letterSpacing: "0.2em",
                    textTransform: "uppercase", color: NS.muted, marginBottom: 6,
                  }}>{indLabel || s.industry}</p>
                  <p style={{
                    fontSize: 15, fontWeight: 500, color: NS.ink, lineHeight: 1.35,
                    letterSpacing: "-0.005em",
                  }}>{s.title}</p>
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 600, color: accent,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  flexShrink: 0,
                }}>Preview →</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SampleViewer({ payload, onClose, onBack }) {
  const { sample, format, category, parent } = payload;
  const accent = CAT_BY_ID[category].color;
  const indLabel = INDUSTRIES.find(i => i.id === sample.industry)?.label;
  const mobile = useMedia("(max-width: 720px)");
  useEscClose(onClose);

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(15, 27, 39, 0.55)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: mobile ? 12 : 20,
      animation: "ns-fade .25s ease",
      overflow: "auto",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: 1200,
        height: mobile ? "auto" : "fit-content",
        maxHeight: "calc(100vh - 40px)",
        background: NS.surface,
        border: `1px solid ${NS.rule}`,
        borderTop: `3px solid ${accent}`,
        display: "flex",
        flexDirection: mobile ? "column" : "row",
        animation: "ns-pop .35s cubic-bezier(0.22,1,0.36,1)",
        boxShadow: "0 30px 80px rgba(15,27,39,0.18)",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{
          flex: mobile ? "none" : 1,
          width: mobile ? "100%" : "auto",
          height: mobile ? "55vw" : "auto",
          minHeight: mobile ? undefined : "75vh",
          background: NS.paperDeep,
          position: "relative",
          overflow: "hidden",
        }}>
          {sample.driveEmbedUrl ? (
            (category === "videos" || category === "social") ? (
              <iframe
                src={sample.driveEmbedUrl}
                title={sample.title}
                style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                allow="autoplay"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            ) : (
              <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", paddingTop: 10, boxSizing: "border-box" }}>
                <iframe
                  src={sample.driveEmbedUrl}
                  title={sample.title}
                  style={{ position: "absolute", top: 10, left: 0, width: "100%", height: "calc(100% + 84px)", border: "none" }}
                  allow="autoplay"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </div>
            )
          ) : (
            <div style={{
              width: "100%", height: "100%",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 24,
            }}>
              <FormatMock type={format} accent={accent}/>
            </div>
          )}
        </div>
        <div style={{
          width: mobile ? "100%" : 300,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          padding: "28px 24px",
          background: NS.surface,
          borderLeft: mobile ? "none" : `1px solid ${NS.rule}`,
          borderTop: mobile ? `1px solid ${NS.rule}` : "none",
          position: "relative",
        }}>
          <button onClick={onClose} aria-label="Close" style={{
            position: "absolute", top: 14, right: 14, zIndex: 2,
            background: NS.surface, border: `1px solid ${NS.rule}`,
            color: NS.ink, cursor: "pointer", borderRadius: "50%",
            width: 30, height: 30, fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>×</button>
          <div>
            <span style={{
              display: "inline-block",
              fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "#FFFFFF",
              padding: "4px 10px", borderRadius: 2,
              background: accent,
            }}>{format}</span>
            {indLabel && (
              <p style={{
                fontSize: 10, fontWeight: 600, letterSpacing: "0.14em",
                textTransform: "uppercase", color: NS.muted, marginTop: 8,
              }}>{indLabel}</p>
            )}
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: 22, lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: NS.ink,
              marginTop: 16,
            }}>{sample.title}</h2>
            <p style={{
              fontSize: 13, color: NS.inkSoft, lineHeight: 1.6, marginTop: 10,
            }}>{sample.desc}</p>
            {parent && (
              <p style={{
                fontSize: 10, fontWeight: 600, letterSpacing: "0.14em",
                textTransform: "uppercase", color: NS.muted, marginTop: 12,
              }}>{parent}</p>
            )}
          </div>
          <div style={{ flex: 1 }}/>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
            {sample.driveViewUrl && (
              <a
                href={sample.driveViewUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  padding: "12px 0",
                  borderRadius: 2,
                  background: NS.blue,
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: 13,
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                }}
              >
                Open in Drive ↗
              </a>
            )}
            {onBack && (
              <button onClick={onBack} style={{
                background: "transparent", border: "none",
                color: NS.muted, fontSize: 12, cursor: "pointer",
                padding: "4px 0", textAlign: "center",
                fontFamily: "'DM Sans', sans-serif",
              }}>← Back to all samples</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Footer CTA ───────────────────────────────────────────────────

function FooterCTA({ onTalkStrategist }) {
  return (
    <section style={{
      maxWidth: 1160,
      margin: "0 auto",
      padding: "clamp(48px,7vw,80px) clamp(20px,4vw,44px)",
    }}>
      <div style={{
        background: NS.blue,
        padding: "clamp(36px, 5vw, 56px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 24,
      }}>
        <div style={{ flex: "1 1 360px" }}>
          <p style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.24em",
            textTransform: "uppercase", color: NS.redSoft,
            marginBottom: 14,
          }}>{"\n"}</p>
          <h3 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(30px, 3.4vw, 44px)",
            letterSpacing: "-0.022em",
            color: "#FFFFFF",
            lineHeight: 1.05,
            marginBottom: 12,
          }}>Have a brief in mind?</h3>
          <p style={{
            color: "rgba(255,255,255,0.78)", fontSize: 14, lineHeight: 1.6, maxWidth: 460,
          }}>
            Tell us the industry and format — we'll send the closest fits from our library within a working day.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            onClick={onTalkStrategist}
            style={{
            padding: "14px 24px",
            borderRadius: 2,
            background: NS.red,
            border: "none",
            color: "#FFFFFF", fontSize: 14, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            letterSpacing: "0.01em",
          }}>Talk to a strategist</button>
        </div>
      </div>
    </section>
  );
}

// ─── Root ─────────────────────────────────────────────────────────

function NetscribesShowcase() {
  const [selected, setSelected] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [pickerPayload, setPickerPayload] = useState(null);
  const [viewerPayload, setViewerPayload] = useState(null);

  const handlePreview = (payload) => {
    const { format, category } = payload;
    const samples = (CURATED[category] && CURATED[category][format]) || [];
    if (samples.length === 1) {
      setViewerPayload({ ...payload, sample: samples[0] });
    } else if (samples.length > 1) {
      setPickerPayload(payload);
    } else {
      setViewerPayload({
        ...payload,
        sample: { title: `${format} Sample`, desc: `Sample ${format} piece showcasing Netscribes capabilities.` },
      });
    }
  };
  const [strategistOpen, setStrategistOpen] = useState(false);
  const mobile = useMedia("(max-width: 720px)");

  const handleSelect = id => {
    setSelected(prev => prev === id ? null : id);
    setIndustry(null);
    if (selected !== id) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const detail = selected && (() => {
    const cat = CAT_BY_ID[selected];
    if (selected === "content")
      return <ContentDetail accent={cat.color} industry={industry} onPreview={handlePreview} mobile={mobile}/>;
    const formats =
      selected === "design" ? DESIGN_FORMATS :
      selected === "videos" ? VIDEO_FORMATS :
      selected === "gtm"    ? GTM_FORMATS :
                              SOCIAL_FORMATS;
    return <FormatGrid formats={formats} category={selected} accent={cat.color}
      industry={industry} onPreview={handlePreview} mobile={mobile}/>;
  })();

  return (
    <div style={{
      minHeight: "100vh",
      background: NS.paper,
      color: NS.ink,
      fontFamily: "'DM Sans', sans-serif",
      position: "relative",
    }}>
      <GlobalStyles/>

      <Header
        onHome={() => { setSelected(null); setIndustry(null); }}
      />

      <main>
        {!selected ? (
          <>
            <HeroIntro/>
            <HeroTiles onSelect={handleSelect} mobile={mobile}/>
          </>
        ) : (
          <div style={{
            paddingTop: "clamp(28px, 4vw, 48px)",
            animation: "ns-fade-up 0.4s both",
          }}>
            <CategoryStrip selected={selected} onSelect={handleSelect} mobile={mobile}/>
            <SectionBanner cat={CAT_BY_ID[selected]} mobile={mobile}/>
            <FilterRow
              industry={industry}
              setIndustry={setIndustry}
              accent={CAT_BY_ID[selected].color}
              mobile={mobile}
            />
            <div style={{
              maxWidth: 1160,
              margin: "0 auto",
              padding: "0 clamp(20px,4vw,44px) clamp(36px,5vw,56px)",
            }}>
              {detail}
            </div>
          </div>
        )}
      </main>

      <FooterCTA
        onTalkStrategist={() => setStrategistOpen(true)}
      />

      <div style={{
        borderTop: `1px solid ${NS.rule}`,
        padding: "28px 24px 36px",
        maxWidth: 1160,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
      }}>
        <span 
          className="text-zinc-950"
          style={{
            color: NS.muted, fontSize: 11, letterSpacing: "0.18em",
            textTransform: "uppercase", fontWeight: 600,
          }}>{"\n"}</span>
      </div>

      {pickerPayload && !viewerPayload && (
        <SamplePicker
          payload={pickerPayload}
          onClose={() => setPickerPayload(null)}
          onPick={(sample) => setViewerPayload({ ...pickerPayload, sample })}
        />
      )}

      {viewerPayload && (
        <SampleViewer
          payload={viewerPayload}
          onClose={() => { setViewerPayload(null); setPickerPayload(null); }}
          onBack={(() => {
            const { format, category } = viewerPayload;
            const list = (CURATED[category] && CURATED[category][format]) || [];
            return list.length > 1 ? () => setViewerPayload(null) : null;
          })()}
        />
      )}

      {strategistOpen && (
        <StrategistModal onClose={() => setStrategistOpen(false)}/>
      )}
    </div>
  );
}

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html, body, #root { margin: 0; padding: 0; background: ${NS.paper}; }
      body {
        font-family: 'DM Sans', system-ui, sans-serif;
        -webkit-font-smoothing: antialiased;
        color: ${NS.ink};
      }
      button { font-family: 'DM Sans', system-ui, sans-serif; }
      ::selection { background: ${NS.blue}; color: #fff; }
      @keyframes ns-fade { from { opacity:0 } to { opacity:1 } }
      @keyframes ns-pop { from { opacity:0; transform: translateY(12px) scale(0.97); } to { opacity:1; transform: none } }
      @keyframes ns-fade-up { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform: none } }
      @media (max-width: 720px) {
        .ns-nav-tag { display: none }
      }
    `}</style>
  );
}

export default NetscribesShowcase;

