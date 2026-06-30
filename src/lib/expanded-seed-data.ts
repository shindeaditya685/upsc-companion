// =============== EXPANDED Seed Data for all subjects/topics ===============
// Augments seed-data.ts with comprehensive coverage across all GS subjects + Sociology

import type { PYQ, KnowledgeTopic, NoteTopic, RevisionEntry, TestEntry, CAItem, ChatMessage } from "./types";

// =============== PYQs for ALL major subjects (last 5 years) ===============
// Agriculture cluster is already in seed-data.ts; this adds all other subjects
export const expandedPYQs: PYQ[] = [
  // ─── GS1 Modern History ───
  { id: "p-gs1-h1", year: 2023, paper: "GS1", question: "Throw light on the significance of thoughts of Mahatma Gandhi in the present times.", theme: "Modern History — Gandhi", marks: 15, attempted: true, evaluated: true, inMistakeBook: false },
  { id: "p-gs1-h2", year: 2022, paper: "GS1", question: "Why did the moderates fail to articulate the demands of the masses? Critically examine.", theme: "Modern History — Moderates vs Extremists", marks: 15, attempted: true, evaluated: false, inMistakeBook: false },
  { id: "p-gs1-h3", year: 2021, paper: "GS1", question: "The Revolt of 1857 was a culmination of accumulating grievances. Critically examine.", theme: "Modern History — 1857 Revolt", marks: 15, attempted: true, evaluated: true, inMistakeBook: true },
  { id: "p-gs1-h4", year: 2020, paper: "GS1", question: "Evaluate the contributions of Lord Dalhousie to the modernisation of India.", theme: "Modern History — Dalhousie", marks: 10, attempted: false, evaluated: false, inMistakeBook: false },
  { id: "p-gs1-h5", year: 2019, paper: "GS1", question: "Examine the significance of Non-Cooperation Movement in India's freedom struggle.", theme: "Modern History — Gandhi phase", marks: 15, attempted: true, evaluated: true, inMistakeBook: false },
  { id: "p-gs1-h6", year: 2023, paper: "GS1", question: "Discuss the main contributions of the Moderates to the Indian national movement.", theme: "Modern History — Moderates", marks: 15, attempted: false, evaluated: false, inMistakeBook: false },

  // ─── GS1 Art & Culture ───
  { id: "p-gs1-ac1", year: 2023, paper: "GS1", question: "Explain the significance of Lion Capital of Ashoka in Indian art and its relevance today.", theme: "Art & Culture — Architecture", marks: 10, attempted: true, evaluated: true, inMistakeBook: false },
  { id: "p-gs1-ac2", year: 2022, paper: "GS1", question: "Discuss the contributions of Buddhism to Indian art and architecture.", theme: "Art & Culture — Buddhist", marks: 15, attempted: true, evaluated: false, inMistakeBook: false },
  { id: "p-gs1-ac3", year: 2021, paper: "GS1", question: "Trace the evolution of temple architecture in South India.", theme: "Art & Culture — Temple Architecture", marks: 15, attempted: false, evaluated: false, inMistakeBook: false },
  { id: "p-gs1-ac4", year: 2020, paper: "GS1", question: "Highlight the Central Asian and Greco-Bactrian elements in the Gandhara art.", theme: "Art & Culture — Gandhara", marks: 10, attempted: true, evaluated: true, inMistakeBook: true },

  // ─── GS1 Indian Society ───
  { id: "p-gs1-is1", year: 2023, paper: "GS1", question: "Discuss the impact of globalization on Indian society and culture.", theme: "Indian Society — Globalization", marks: 15, attempted: true, evaluated: true, inMistakeBook: false },
  { id: "p-gs1-is2", year: 2022, paper: "GS1", question: "Why is the phenomenon of secularization weak in India? Critically examine.", theme: "Indian Society — Secularism", marks: 15, attempted: false, evaluated: false, inMistakeBook: false },
  { id: "p-gs1-is3", year: 2021, paper: "GS1", question: "Discuss the main contributions of the Bhakti and Sufi movements to Indian culture.", theme: "Indian Society — Bhakti/Sufi", marks: 15, attempted: true, evaluated: false, inMistakeBook: false },
  { id: "p-gs1-is4", year: 2020, paper: "GS1", question: "Discuss the factors responsible for the regional disparity in women's empowerment in India.", theme: "Indian Society — Women", marks: 15, attempted: false, evaluated: false, inMistakeBook: false },
  { id: "p-gs1-is5", year: 2019, paper: "GS1", question: "Empowering women is the key to population control. Critically examine.", theme: "Indian Society — Population", marks: 10, attempted: true, evaluated: true, inMistakeBook: true },

  // ─── GS1 Geography ───
  { id: "p-gs1-g1", year: 2023, paper: "GS1", question: "Explain the formation of tropical cyclones and the conditions favourable for their formation.", theme: "Geography — Climatology", marks: 15, attempted: true, evaluated: true, inMistakeBook: false },
  { id: "p-gs1-g2", year: 2022, paper: "GS1", question: "Discuss the causes of depletion of mangrove vegetation in India.", theme: "Geography — Biogeography", marks: 10, attempted: false, evaluated: false, inMistakeBook: false },
  { id: "p-gs1-g3", year: 2021, paper: "GS1", question: "Explain the meaning of the term 'climate refugees'. Suggest measures to rehabilitate them.", theme: "Geography — Climate Change", marks: 15, attempted: true, evaluated: false, inMistakeBook: false },
  { id: "p-gs1-g4", year: 2020, paper: "GS1", question: "Discuss the geophysical characteristics of the Circum-Pacific Zone.", theme: "Geography — Geomorphology", marks: 15, attempted: false, evaluated: false, inMistakeBook: false },

  // ─── GS2 Polity ───
  { id: "p-gs2-po1", year: 2023, paper: "GS2", question: "Explain the significance of the 73rd and 74th Constitutional Amendments in Indian polity.", theme: "Polity — Local Govt", marks: 15, attempted: true, evaluated: true, inMistakeBook: false },
  { id: "p-gs2-po2", year: 2022, paper: "GS2", question: "Discuss the role of the Vice-President of India as the Chairman of Rajya Sabha.", theme: "Polity — Parliament", marks: 10, attempted: true, evaluated: false, inMistakeBook: false },
  { id: "p-gs2-po3", year: 2021, paper: "GS2", question: "How far do you think the doctrine of basic structure has been useful in preserving the Constitution?", theme: "Polity — Basic Structure", marks: 15, attempted: true, evaluated: true, inMistakeBook: true },
  { id: "p-gs2-po4", year: 2020, paper: "GS2", question: "'The Parliament is increasingly becoming an ineffective institution.' Critically examine.", theme: "Polity — Parliament", marks: 15, attempted: false, evaluated: false, inMistakeBook: false },
  { id: "p-gs2-po5", year: 2019, paper: "GS2", question: "What are the methods used by Farmers' organisations to influence the policymakers in India?", theme: "Polity — Pressure Groups", marks: 10, attempted: true, evaluated: true, inMistakeBook: false },

  // ─── GS2 Governance / Federalism ───
  { id: "p-gs2-go1", year: 2023, paper: "GS2", question: "Discuss the role of the Governor in the Indian federal system. Has the office been a source of tension?", theme: "Governance — Governor", marks: 15, attempted: true, evaluated: true, inMistakeBook: true },
  { id: "p-gs2-go2", year: 2022, paper: "GS2", question: "Examine the role of NITI Aayog in cooperative federalism.", theme: "Governance — Federalism", marks: 15, attempted: true, evaluated: false, inMistakeBook: false },
  { id: "p-gs2-go3", year: 2021, paper: "GS2", question: "Critically examine the functioning of the Inter-State Council.", theme: "Governance — Federalism", marks: 10, attempted: false, evaluated: false, inMistakeBook: false },
  { id: "p-gs2-go4", year: 2020, paper: "GS2", question: "The strength and sustenance of local institutions of governance depend on devolution of funds. Examine.", theme: "Governance — Decentralisation", marks: 15, attempted: true, evaluated: true, inMistakeBook: false },

  // ─── GS2 Social Justice ───
  { id: "p-gs2-sj1", year: 2023, paper: "GS2", question: "Discuss the performance of SHGs in women's empowerment in India.", theme: "Social Justice — Women", marks: 15, attempted: false, evaluated: false, inMistakeBook: false },
  { id: "p-gs2-sj2", year: 2022, paper: "GS2", question: "Critically examine the implementation of the National Food Security Act, 2013.", theme: "Social Justice — Food Security", marks: 15, attempted: true, evaluated: true, inMistakeBook: true },
  { id: "p-gs2-sj3", year: 2021, paper: "GS2", question: "Can civil society play a role in good governance? Comment.", theme: "Social Justice — Civil Society", marks: 10, attempted: true, evaluated: false, inMistakeBook: false },
  { id: "p-gs2-sj4", year: 2020, paper: "GS2", question: "The focal point of welfare schemes for the elderly has been pension. Discuss.", theme: "Social Justice — Elderly", marks: 10, attempted: false, evaluated: false, inMistakeBook: false },

  // ─── GS2 International Relations ───
  { id: "p-gs2-ir1", year: 2023, paper: "GS2", question: "Discuss the strategic significance of Quad in the Indo-Pacific.", theme: "IR — Quad", marks: 15, attempted: true, evaluated: true, inMistakeBook: false },
  { id: "p-gs2-ir2", year: 2022, paper: "GS2", question: "Critically examine India's engagement with SCO.", theme: "IR — SCO", marks: 15, attempted: false, evaluated: false, inMistakeBook: false },
  { id: "p-gs2-ir3", year: 2021, paper: "GS2", question: "Discuss the major areas of cooperation between India and Bangladesh.", theme: "IR — Bangladesh", marks: 10, attempted: true, evaluated: false, inMistakeBook: false },
  { id: "p-gs2-ir4", year: 2020, paper: "GS2", question: "Indo-Russian strategic partnership has stood the test of time. Comment.", theme: "IR — Russia", marks: 10, attempted: true, evaluated: true, inMistakeBook: false },

  // ─── GS3 Indian Economy ───
  { id: "p-gs3-ec1", year: 2023, paper: "GS3", question: "Discuss the rationale of disinvestment in PSUs in India.", theme: "Economy — Disinvestment", marks: 15, attempted: false, evaluated: false, inMistakeBook: false },
  { id: "p-gs3-ec2", year: 2022, paper: "GS3", question: "What are the reasons for the declining trend in bank credit growth in India?", theme: "Economy — Banking", marks: 15, attempted: true, evaluated: true, inMistakeBook: false },
  { id: "p-gs3-ec3", year: 2021, paper: "GS3", question: "Critically examine the role of RBI in managing inflation in India.", theme: "Economy — Monetary Policy", marks: 15, attempted: true, evaluated: false, inMistakeBook: false },
  { id: "p-gs3-ec4", year: 2020, paper: "GS3", question: "Explain the interlinkages between GDP growth and employment generation in India.", theme: "Economy — Growth & Employment", marks: 15, attempted: false, evaluated: false, inMistakeBook: false },
  { id: "p-gs3-ec5", year: 2019, paper: "GS3", question: "Discuss the role of GST in bringing about economic unification of India.", theme: "Economy — GST", marks: 10, attempted: true, evaluated: true, inMistakeBook: true },

  // ─── GS3 Science & Technology ───
  { id: "p-gs3-st1", year: 2023, paper: "GS3", question: "What is the significance of Gaganyaan mission for India's space programme?", theme: "S&T — Space", marks: 15, attempted: false, evaluated: false, inMistakeBook: false },
  { id: "p-gs3-st2", year: 2022, paper: "GS3", question: "Discuss the applications of CRISPR-Cas9 technology. What are the ethical concerns?", theme: "S&T — Biotech", marks: 15, attempted: true, evaluated: false, inMistakeBook: false },
  { id: "p-gs3-st3", year: 2021, paper: "GS3", question: "How can AI be used in public service delivery in India? Examine.", theme: "S&T — AI", marks: 15, attempted: true, evaluated: true, inMistakeBook: true },
  { id: "p-gs3-st4", year: 2020, paper: "GS3", question: "What is India's National IPR Policy? Critically examine its implementation.", theme: "S&T — IPR", marks: 10, attempted: false, evaluated: false, inMistakeBook: false },

  // ─── GS3 Environment ───
  { id: "p-gs3-en1", year: 2023, paper: "GS3", question: "Discuss the significance of biodiversity hotspots in conservation.", theme: "Environment — Biodiversity", marks: 15, attempted: true, evaluated: true, inMistakeBook: false },
  { id: "p-gs3-en2", year: 2022, paper: "GS3", question: "Critically examine the performance of National Action Plan on Climate Change (NAPCC).", theme: "Environment — Climate Change", marks: 15, attempted: false, evaluated: false, inMistakeBook: false },
  { id: "p-gs3-en3", year: 2021, paper: "GS3", question: "Discuss the role of EIA in environmental governance in India.", theme: "Environment — EIA", marks: 10, attempted: true, evaluated: false, inMistakeBook: false },
  { id: "p-gs3-en4", year: 2020, paper: "GS3", question: "Explain the significance of Paris Agreement. Has India met its commitments?", theme: "Environment — Paris Agreement", marks: 15, attempted: true, evaluated: true, inMistakeBook: true },

  // ─── GS3 Internal Security ───
  { id: "p-gs3-sec1", year: 2023, paper: "GS3", question: "Discuss the challenges of border management in India.", theme: "Security — Border", marks: 15, attempted: false, evaluated: false, inMistakeBook: false },
  { id: "p-gs3-sec2", year: 2022, paper: "GS3", question: "Examine the role of technology in countering cyber security threats.", theme: "Security — Cyber", marks: 15, attempted: true, evaluated: false, inMistakeBook: false },
  { id: "p-gs3-sec3", year: 2021, paper: "GS3", question: "Discuss the linkages between drug trafficking and terrorism in India.", theme: "Security — Narco-terrorism", marks: 10, attempted: false, evaluated: false, inMistakeBook: false },

  // ─── GS3 Disaster Management ───
  { id: "p-gs3-dm1", year: 2023, paper: "GS3", question: "Discuss the role of NDMA in disaster preparedness in India.", theme: "Disaster Mgmt — NDMA", marks: 15, attempted: false, evaluated: false, inMistakeBook: false },
  { id: "p-gs3-dm2", year: 2022, paper: "GS3", question: "Explain the Sendai Framework. How can India implement it?", theme: "Disaster Mgmt — Sendai", marks: 10, attempted: true, evaluated: true, inMistakeBook: false },
  { id: "p-gs3-dm3", year: 2021, paper: "GS3", question: "Discuss the institutional framework for flood management in India.", theme: "Disaster Mgmt — Floods", marks: 15, attempted: false, evaluated: false, inMistakeBook: false },

  // ─── GS4 Ethics ───
  { id: "p-gs4-e1", year: 2023, paper: "GS4", question: "Explain the significance of emotional intelligence in administration.", theme: "Ethics — EI", marks: 10, attempted: false, evaluated: false, inMistakeBook: false },
  { id: "p-gs4-e2", year: 2022, paper: "GS4", question: "What does Aristotle's virtue ethics teach us? Apply to civil services.", theme: "Ethics — Thinkers", marks: 10, attempted: false, evaluated: false, inMistakeBook: false },
  { id: "p-gs4-e3", year: 2021, paper: "GS4", question: "Critically examine Gandhi's idea of tolerance in present times.", theme: "Ethics — Gandhi", marks: 10, attempted: true, evaluated: true, inMistakeBook: false },
  { id: "p-gs4-e4", year: 2020, paper: "GS4", question: "Discuss the role of family in inculcating values in children.", theme: "Ethics — Family", marks: 10, attempted: false, evaluated: false, inMistakeBook: false },

  // ─── GS4 Case Studies ───
  { id: "p-gs4-c1", year: 2023, paper: "GS4", question: "Case study: A junior officer asked to bypass procedure by a powerful minister. What are the options and consequences?", theme: "Case Study — Workplace Dilemma", marks: 20, attempted: false, evaluated: false, inMistakeBook: false },
  { id: "p-gs4-c2", year: 2022, paper: "GS4", question: "Case study: RTI reveals corrupt practices of a senior — whistleblowing risk.", theme: "Case Study — Whistleblowing", marks: 20, attempted: false, evaluated: false, inMistakeBook: false },

  // ─── Sociology P1 — Thinkers & Themes ───
  { id: "p-soc-p1-1", year: 2023, paper: "Sociology P1", question: "Examine Marx's concept of alienation. Is it relevant in the era of globalisation?", theme: "Sociology P1 — Marx", marks: 15, attempted: true, evaluated: true, inMistakeBook: false },
  { id: "p-soc-p1-2", year: 2022, paper: "Sociology P1", question: "Discuss Durkheim's theory of division of labour.", theme: "Sociology P1 — Durkheim", marks: 15, attempted: true, evaluated: false, inMistakeBook: false },
  { id: "p-soc-p1-3", year: 2021, paper: "Sociology P1", question: "Weber's rationalization thesis — examine in light of modern bureaucracy.", theme: "Sociology P1 — Weber", marks: 15, attempted: true, evaluated: true, inMistakeBook: true },
  { id: "p-soc-p1-4", year: 2020, paper: "Sociology P1", question: "Discuss the contributions of Parsons to structural-functionalism.", theme: "Sociology P1 — Parsons", marks: 15, attempted: false, evaluated: false, inMistakeBook: false },

  // ─── Sociology P2 — Indian Society ───
  { id: "p-soc-p2-1", year: 2023, paper: "Sociology P2", question: "Examine Srinivas's concept of sanskritisation. Is it still relevant?", theme: "Sociology P2 — Caste", marks: 15, attempted: false, evaluated: false, inMistakeBook: false },
  { id: "p-soc-p2-2", year: 2022, paper: "Sociology P2", question: "Discuss the impact of globalisation on Indian tribes.", theme: "Sociology P2 — Tribes", marks: 15, attempted: false, evaluated: false, inMistakeBook: false },
  { id: "p-soc-p2-3", year: 2021, paper: "Sociology P2", question: "Examine the politicisation of caste in post-independence India.", theme: "Sociology P2 — Politicisation", marks: 15, attempted: false, evaluated: false, inMistakeBook: false },
  { id: "p-soc-p2-4", year: 2020, paper: "Sociology P2", question: "Discuss the challenges of communalism in Indian society.", theme: "Sociology P2 — Communalism", marks: 15, attempted: false, evaluated: false, inMistakeBook: false },

  // ─── Essay topics (mix) ───
  { id: "p-essay-1", year: 2023, paper: "Essay", question: "Education is what remains after one has forgotten what one has learned in school.", theme: "Essay — Education", marks: 125, attempted: false, evaluated: false, inMistakeBook: false },
  { id: "p-essay-2", year: 2023, paper: "Essay", question: "A society that has more justice is a society that needs less charity.", theme: "Essay — Justice", marks: 125, attempted: false, evaluated: false, inMistakeBook: false },
];

// =============== Knowledge Bank — 15 topics across all papers ===============
const L0_L6_BLANK = [
  { level: 0, name: "Source Reading", status: false, deliverable: "" },
  { level: 1, name: "Level-1 Notes", status: false, deliverable: "" },
  { level: 2, name: "Value Add (thinkers/data)", status: false, deliverable: "" },
  { level: 3, name: "PYQ Mapping", status: false, deliverable: "" },
  { level: 4, name: "Answer Writing (3+)", status: false, deliverable: "" },
  { level: 5, name: "R1 + R2 Revision", status: false, deliverable: "" },
  { level: 6, name: "Mains-Ready", status: false, deliverable: "" },
];

export const expandedKnowledgeBank: KnowledgeTopic[] = [
  // ─── GS1 topics ───
  {
    id: "kb-gs1-1857",
    topic: "Modern History — Revolt of 1857",
    paper: "GS1",
    targetDateL6: "2026-09-15",
    levels: [
      { level: 0, name: "Source Reading", status: true, deliverable: "Spectrum + Bipan Chandra + Eric Stokes" },
      { level: 1, name: "Level-1 Notes", status: true, deliverable: "Causes (political, economic, social, military), events, leaders, aftermath" },
      { level: 2, name: "Value Add (thinkers/data)", status: true, deliverable: "Eric Stokes (peasant rootedness), Sekhar Bandyopadhyay (subaltern), 1857 anniversary CA" },
      { level: 3, name: "PYQ Mapping", status: true, deliverable: "3 PYQs mapped (2019, 2021)" },
      { level: 4, name: "Answer Writing (3+)", status: true, deliverable: "3 evaluated answers, avg 9/15" },
      { level: 5, name: "R1 + R2 Revision", status: true, deliverable: "R1 + R2 done; recall 90%" },
      { level: 6, name: "Mains-Ready", status: true, deliverable: "Mentor certified Mains-ready" },
    ],
  },
  {
    id: "kb-gs1-gandhi",
    topic: "Modern History — Gandhian Phase (1915-1948)",
    paper: "GS1",
    targetDateL6: "2026-09-20",
    levels: [
      { level: 0, name: "Source Reading", status: true, deliverable: "Spectrum + Bipan Chandra + David Hardiman" },
      { level: 1, name: "Level-1 Notes", status: true, deliverable: "Satyagraha, NCM, CDM, Quit India, partition" },
      { level: 2, name: "Value Add (thinkers/data)", status: true, deliverable: "Hardiman, Judith Brown, recent reinterpretations" },
      { level: 3, name: "PYQ Mapping", status: true, deliverable: "4 PYQs mapped (2019, 2023)" },
      { level: 4, name: "Answer Writing (3+)", status: true, deliverable: "2 evaluated answers, need 1 more" },
      { level: 5, name: "R1 + R2 Revision", status: false, deliverable: "R1 done; R2 pending" },
      { level: 6, name: "Mains-Ready", status: false, deliverable: "" },
    ],
  },
  {
    id: "kb-gs1-bhakti",
    topic: "Art & Culture — Bhakti & Sufi Movements",
    paper: "GS1",
    targetDateL6: "2026-09-25",
    levels: [
      { level: 0, name: "Source Reading", status: true, deliverable: "NCERT + Nitin Singhania" },
      { level: 1, name: "Level-1 Notes", status: true, deliverable: "Saguna vs Nirguna, Kabir, Mirabai, Sufi silsila" },
      { level: 2, name: "Value Add (thinkers/data)", status: false, deliverable: "" },
      { level: 3, name: "PYQ Mapping", status: true, deliverable: "1 PYQ mapped (2021)" },
      { level: 4, name: "Answer Writing (3+)", status: false, deliverable: "" },
      { level: 5, name: "R1 + R2 Revision", status: false, deliverable: "" },
      { level: 6, name: "Mains-Ready", status: false, deliverable: "" },
    ],
  },
  {
    id: "kb-gs1-cyclones",
    topic: "Geography — Tropical Cyclones",
    paper: "GS1",
    targetDateL6: "2026-10-05",
    levels: [
      { level: 0, name: "Source Reading", status: true, deliverable: "GC Leong + NCERT Class 11" },
      { level: 1, name: "Level-1 Notes", status: true, deliverable: "Formation conditions, naming, Fani/Asani case studies" },
      { level: 2, name: "Value Add (thinkers/data)", status: true, deliverable: "IMD data, RSMC New Delhi, recent cyclones data" },
      { level: 3, name: "PYQ Mapping", status: true, deliverable: "1 PYQ (2023)" },
      { level: 4, name: "Answer Writing (3+)", status: false, deliverable: "Need 3 answers" },
      { level: 5, name: "R1 + R2 Revision", status: false, deliverable: "" },
      { level: 6, name: "Mains-Ready", status: false, deliverable: "" },
    ],
  },
  {
    id: "kb-gs1-secularism",
    topic: "Indian Society — Secularism",
    paper: "GS1",
    targetDateL6: "2026-10-10",
    levels: [
      { level: 0, name: "Source Reading", status: true, deliverable: "NCERT + Bipan Chandra" },
      { level: 1, name: "Level-1 Notes", status: true, deliverable: "Indian vs Western secularism, communalism, constitutional provisions" },
      { level: 2, name: "Value Add (thinkers/data)", status: false, deliverable: "" },
      { level: 3, name: "PYQ Mapping", status: true, deliverable: "1 PYQ (2022)" },
      { level: 4, name: "Answer Writing (3+)", status: false, deliverable: "" },
      { level: 5, name: "R1 + R2 Revision", status: false, deliverable: "" },
      { level: 6, name: "Mains-Ready", status: false, deliverable: "" },
    ],
  },

  // ─── GS2 topics ───
  {
    id: "kb-gs2-fed",
    topic: "Federalism — Centre-State Relations",
    paper: "GS2",
    targetDateL6: "2026-10-10",
    levels: [
      { level: 0, name: "Source Reading", status: true, deliverable: "Laxmikanth + D.D. Basu" },
      { level: 1, name: "Level-1 Notes", status: true, deliverable: "Cooperative vs competitive, NITI Aayog, Inter-State Council" },
      { level: 2, name: "Value Add (thinkers/data)", status: true, deliverable: "ARC II, Sarkaria, Punchhi Commission" },
      { level: 3, name: "PYQ Mapping", status: true, deliverable: "5 PYQs mapped (2014-2022)" },
      { level: 4, name: "Answer Writing (3+)", status: true, deliverable: "3 answers evaluated, avg 8/15" },
      { level: 5, name: "R1 + R2 Revision", status: true, deliverable: "R1 done 21 Aug; R2 done 11 Sep" },
      { level: 6, name: "Mains-Ready", status: false, deliverable: "Pending — 1 more test + mentor sign-off" },
    ],
  },
  {
    id: "kb-gs2-governor",
    topic: "Governor — Office & Role",
    paper: "GS2",
    targetDateL6: "2026-10-15",
    levels: [
      { level: 0, name: "Source Reading", status: true, deliverable: "Laxmikanth ch. on Governor" },
      { level: 1, name: "Level-1 Notes", status: true, deliverable: "Constitutional provisions, discretionary powers, recent controversies" },
      { level: 2, name: "Value Add (thinkers/data)", status: true, deliverable: "Punchhi Commission recommendations, recent Tamil Nadu/Maharashtra cases" },
      { level: 3, name: "PYQ Mapping", status: true, deliverable: "1 PYQ (2023)" },
      { level: 4, name: "Answer Writing (3+)", status: false, deliverable: "Need 2 more answers" },
      { level: 5, name: "R1 + R2 Revision", status: false, deliverable: "" },
      { level: 6, name: "Mains-Ready", status: false, deliverable: "" },
    ],
  },
  {
    id: "kb-gs2-73-74",
    topic: "73rd & 74th Amendments — Local Self-Govt",
    paper: "GS2",
    targetDateL6: "2026-10-20",
    levels: [
      { level: 0, name: "Source Reading", status: true, deliverable: "Laxmikanth local gov chapters" },
      { level: 1, name: "Level-1 Notes", status: true, deliverable: "PRI/ULB structure, reservation for women/SC/ST, State Election Commission" },
      { level: 2, name: "Value Add (thinkers/data)", status: true, deliverable: "2nd ARC, Sadiq Ali case, recent SC rulings on PRIs" },
      { level: 3, name: "PYQ Mapping", status: true, deliverable: "1 PYQ (2023)" },
      { level: 4, name: "Answer Writing (3+)", status: true, deliverable: "2 answers evaluated" },
      { level: 5, name: "R1 + R2 Revision", status: false, deliverable: "" },
      { level: 6, name: "Mains-Ready", status: false, deliverable: "" },
    ],
  },
  {
    id: "kb-gs2-quad",
    topic: "International Relations — Indo-Pacific & Quad",
    paper: "GS2",
    targetDateL6: "2026-11-01",
    levels: [
      { level: 0, name: "Source Reading", status: true, deliverable: "MEA briefings + IDSA articles" },
      { level: 1, name: "Level-1 Notes", status: true, deliverable: "Quad origins, revival 2017, AUKUS, IPS" },
      { level: 2, name: "Value Add (thinkers/data)", status: true, deliverable: "Recent Quad summits, vaccine initiative, critical tech" },
      { level: 3, name: "PYQ Mapping", status: true, deliverable: "1 PYQ (2023)" },
      { level: 4, name: "Answer Writing (3+)", status: false, deliverable: "" },
      { level: 5, name: "R1 + R2 Revision", status: false, deliverable: "" },
      { level: 6, name: "Mains-Ready", status: false, deliverable: "" },
    ],
  },
  {
    id: "kb-gs2-pressure",
    topic: "Pressure Groups & Civil Society",
    paper: "GS2",
    targetDateL6: "2026-11-01",
    levels: [
      { level: 0, name: "Source Reading", status: true, deliverable: "Laxmikanth + newspaper" },
      { level: 1, name: "Level-1 Notes", status: false, deliverable: "" },
      { level: 2, name: "Value Add (thinkers/data)", status: false, deliverable: "" },
      { level: 3, name: "PYQ Mapping", status: false, deliverable: "" },
      { level: 4, name: "Answer Writing (3+)", status: false, deliverable: "" },
      { level: 5, name: "R1 + R2 Revision", status: false, deliverable: "" },
      { level: 6, name: "Mains-Ready", status: false, deliverable: "" },
    ],
  },

  // ─── GS3 topics ───
  {
    id: "kb-gs3-msp",
    topic: "Agriculture — MSP & Procurement",
    paper: "GS3",
    targetDateL6: "2026-10-15",
    levels: [
      { level: 0, name: "Source Reading", status: true, deliverable: "Spectrum Economy + Ramesh Singh + NCERT Class 10 Geo" },
      { level: 1, name: "Level-1 Notes", status: true, deliverable: "MSP formula, CACP, 23 crops, procurement system, Swaminathan formula gap" },
      { level: 2, name: "Value Add (thinkers/data)", status: true, deliverable: "MSP 2026 rabi data (₹2,297/quintal paddy), NCRB 11,290 suicides, Swaminathan C2+50%, Dalwai DFI Committee" },
      { level: 3, name: "PYQ Mapping", status: true, deliverable: "3 PYQs mapped (2018, 2020, 2023)" },
      { level: 4, name: "Answer Writing (3+)", status: true, deliverable: "3 evaluated answers, avg 7.5/15" },
      { level: 5, name: "R1 + R2 Revision", status: true, deliverable: "R1 28 Sep; R2 18 Oct; recall 85%" },
      { level: 6, name: "Mains-Ready", status: true, deliverable: "Self-test 18/20 questions in 2.5 hr; mentor flagged Mains-ready" },
    ],
  },
  {
    id: "kb-gs3-foodsec",
    topic: "Food Security + PDS + FCI",
    paper: "GS3",
    targetDateL6: "2026-10-15",
    levels: [
      { level: 0, name: "Source Reading", status: true, deliverable: "Economic Survey + Shunya IAS" },
      { level: 1, name: "Level-1 Notes", status: true, deliverable: "NFSA 2013, PDS architecture, FCI reforms, Shanta Kumar Committee" },
      { level: 2, name: "Value Add (thinkers/data)", status: true, deliverable: "FCI procurement 75mt wheat + 60mt rice, end-to-end computerisation" },
      { level: 3, name: "PYQ Mapping", status: true, deliverable: "4 PYQs (2021, 2022, 2023)" },
      { level: 4, name: "Answer Writing (3+)", status: true, deliverable: "1 evaluated answer" },
      { level: 5, name: "R1 + R2 Revision", status: false, deliverable: "R1 done, R2 pending" },
      { level: 6, name: "Mains-Ready", status: false, deliverable: "" },
    ],
  },
  {
    id: "kb-gs3-rbi",
    topic: "RBI & Monetary Policy",
    paper: "GS3",
    targetDateL6: "2026-11-15",
    levels: [
      { level: 0, name: "Source Reading", status: false, deliverable: "" },
      { level: 1, name: "Level-1 Notes", status: false, deliverable: "" },
      { level: 2, name: "Value Add (thinkers/data)", status: false, deliverable: "" },
      { level: 3, name: "PYQ Mapping", status: false, deliverable: "" },
      { level: 4, name: "Answer Writing (3+)", status: false, deliverable: "" },
      { level: 5, name: "R1 + R2 Revision", status: false, deliverable: "" },
      { level: 6, name: "Mains-Ready", status: false, deliverable: "" },
    ],
  },
  {
    id: "kb-gs3-eia",
    topic: "Environment — EIA & Climate Change",
    paper: "GS3",
    targetDateL6: "2026-11-10",
    levels: [
      { level: 0, name: "Source Reading", status: false, deliverable: "" },
      { level: 1, name: "Level-1 Notes", status: false, deliverable: "" },
      { level: 2, name: "Value Add (thinkers/data)", status: false, deliverable: "" },
      { level: 3, name: "PYQ Mapping", status: false, deliverable: "" },
      { level: 4, name: "Answer Writing (3+)", status: false, deliverable: "" },
      { level: 5, name: "R1 + R2 Revision", status: false, deliverable: "" },
      { level: 6, name: "Mains-Ready", status: false, deliverable: "" },
    ],
  },

  // ─── GS4 topics ───
  {
    id: "kb-gs4-ei",
    topic: "Emotional Intelligence in Administration",
    paper: "GS4",
    targetDateL6: "2026-11-20",
    levels: [
      { level: 0, name: "Source Reading", status: false, deliverable: "" },
      { level: 1, name: "Level-1 Notes", status: false, deliverable: "" },
      { level: 2, name: "Value Add (thinkers/data)", status: false, deliverable: "" },
      { level: 3, name: "PYQ Mapping", status: false, deliverable: "" },
      { level: 4, name: "Answer Writing (3+)", status: false, deliverable: "" },
      { level: 5, name: "R1 + R2 Revision", status: false, deliverable: "" },
      { level: 6, name: "Mains-Ready", status: false, deliverable: "" },
    ],
  },
  {
    id: "kb-gs4-casestudy",
    topic: "Ethics Case Studies — Framework",
    paper: "GS4",
    targetDateL6: "2026-11-20",
    levels: [
      { level: 0, name: "Source Reading", status: false, deliverable: "" },
      { level: 1, name: "Level-1 Notes", status: false, deliverable: "" },
      { level: 2, name: "Value Add (thinkers/data)", status: false, deliverable: "" },
      { level: 3, name: "PYQ Mapping", status: false, deliverable: "" },
      { level: 4, name: "Answer Writing (3+)", status: false, deliverable: "" },
      { level: 5, name: "R1 + R2 Revision", status: false, deliverable: "" },
      { level: 6, name: "Mains-Ready", status: false, deliverable: "" },
    ],
  },

  // ─── Sociology topics ───
  {
    id: "kb-soc-marx",
    topic: "Sociology — Marx (Thinker)",
    paper: "Sociology P1",
    targetDateL6: "2026-10-20",
    levels: [
      { level: 0, name: "Source Reading", status: true, deliverable: "Upendra Singh + Ignou material" },
      { level: 1, name: "Level-1 Notes", status: true, deliverable: "Historical materialism, base-superstructure, alienation, class struggle" },
      { level: 2, name: "Value Add (thinkers/data)", status: true, deliverable: "Durkheim's critique of Marx, A.R. Desai (Indian Marxist), recent inequality data" },
      { level: 3, name: "PYQ Mapping", status: true, deliverable: "4 PYQs mapped" },
      { level: 4, name: "Answer Writing (3+)", status: true, deliverable: "2 answers evaluated, need 1 more" },
      { level: 5, name: "R1 + R2 Revision", status: false, deliverable: "R1 done 20 Sep; R2 pending" },
      { level: 6, name: "Mains-Ready", status: false, deliverable: "" },
    ],
  },
  {
    id: "kb-soc-caste",
    topic: "Sociology P2 — Caste System",
    paper: "Sociology P2",
    targetDateL6: "2026-11-30",
    levels: [
      { level: 0, name: "Source Reading", status: false, deliverable: "" },
      { level: 1, name: "Level-1 Notes", status: false, deliverable: "" },
      { level: 2, name: "Value Add (thinkers/data)", status: false, deliverable: "" },
      { level: 3, name: "PYQ Mapping", status: false, deliverable: "" },
      { level: 4, name: "Answer Writing (3+)", status: false, deliverable: "" },
      { level: 5, name: "R1 + R2 Revision", status: false, deliverable: "" },
      { level: 6, name: "Mains-Ready", status: false, deliverable: "" },
    ],
  },
];

// =============== Notes Tracker — 20 topics across all papers ===============
export const expandedNotes: NoteTopic[] = [
  // GS1
  { id: "n-gs1-1857", topic: "Modern History — 1857 Revolt", read: true, notes: true, data: true, reports: false, committees: false, cases: true, diagram: true, ca: true, r1: true, r2: true, awCount: 3, mastered: true },
  { id: "n-gs1-gandhi", topic: "Modern History — Gandhi Phase", read: true, notes: true, data: false, reports: false, committees: false, cases: false, diagram: false, ca: true, r1: true, r2: false, awCount: 2, mastered: false },
  { id: "n-gs1-mod", topic: "Modern History — Moderates vs Extremists", read: true, notes: true, data: false, reports: false, committees: false, cases: false, diagram: false, ca: false, r1: true, r2: false, awCount: 1, mastered: false },
  { id: "n-gs1-arch", topic: "Art & Culture — Temple Architecture", read: true, notes: true, data: false, reports: false, committees: false, cases: false, diagram: true, ca: false, r1: true, r2: false, awCount: 1, mastered: false },
  { id: "n-gs1-bhakti", topic: "Art & Culture — Bhakti/Sufi", read: true, notes: true, data: false, reports: false, committees: false, cases: false, diagram: false, ca: false, r1: false, r2: false, awCount: 0, mastered: false },
  { id: "n-gs1-cyclone", topic: "Geography — Tropical Cyclones", read: true, notes: true, data: true, reports: false, committees: false, cases: true, diagram: true, ca: true, r1: true, r2: false, awCount: 0, mastered: false },
  { id: "n-gs1-sec", topic: "Indian Society — Secularism", read: true, notes: true, data: false, reports: false, committees: false, cases: false, diagram: false, ca: false, r1: false, r2: false, awCount: 0, mastered: false },
  // GS2
  { id: "n-gs2-fed", topic: "Federalism", read: true, notes: true, data: true, reports: true, committees: true, cases: true, diagram: true, ca: true, r1: true, r2: true, awCount: 3, mastered: true },
  { id: "n-gs2-gov", topic: "Governor's Office", read: true, notes: true, data: true, reports: false, committees: true, cases: true, diagram: false, ca: true, r1: true, r2: false, awCount: 1, mastered: false },
  { id: "n-gs2-pris", topic: "73rd & 74th Amendments", read: true, notes: true, data: false, reports: true, committees: false, cases: true, diagram: false, ca: false, r1: true, r2: false, awCount: 2, mastered: false },
  { id: "n-gs2-pressure", topic: "Pressure Groups", read: true, notes: false, data: false, reports: false, committees: false, cases: false, diagram: false, ca: false, r1: false, r2: false, awCount: 0, mastered: false },
  { id: "n-gs2-quad", topic: "IR — Quad & Indo-Pacific", read: true, notes: true, data: true, reports: false, committees: false, cases: false, diagram: false, ca: true, r1: false, r2: false, awCount: 0, mastered: false },
  // GS3
  { id: "n-gs3-msp", topic: "Agriculture MSP", read: true, notes: true, data: true, reports: true, committees: true, cases: false, diagram: true, ca: true, r1: true, r2: false, awCount: 2, mastered: false },
  { id: "n-gs3-distress", topic: "Agrarian distress", read: true, notes: true, data: true, reports: false, committees: false, cases: true, diagram: false, ca: true, r1: true, r2: false, awCount: 1, mastered: false },
  { id: "n-gs3-food", topic: "Food Security + PDS + FCI", read: true, notes: true, data: false, reports: false, committees: false, cases: false, diagram: false, ca: true, r1: false, r2: false, awCount: 0, mastered: false },
  // Sociology
  { id: "n-soc-marx", topic: "Marx (Thinker)", read: true, notes: true, data: false, reports: false, committees: false, cases: false, diagram: false, ca: false, r1: true, r2: false, awCount: 2, mastered: false },
  { id: "n-soc-durkheim", topic: "Durkheim (Thinker)", read: true, notes: true, data: false, reports: false, committees: false, cases: false, diagram: false, ca: false, r1: true, r2: false, awCount: 1, mastered: false },
  { id: "n-soc-weber", topic: "Weber (Thinker)", read: true, notes: false, data: false, reports: false, committees: false, cases: false, diagram: false, ca: false, r1: false, r2: false, awCount: 0, mastered: false },
  { id: "n-soc-strat", topic: "Sociology P1 — Stratification", read: true, notes: true, data: false, reports: false, committees: false, cases: false, diagram: false, ca: false, r1: true, r2: false, awCount: 2, mastered: false },
  // GS4
  { id: "n-gs4-ei", topic: "Ethics — Emotional Intelligence", read: false, notes: false, data: false, reports: false, committees: false, cases: false, diagram: false, ca: false, r1: false, r2: false, awCount: 0, mastered: false },
];

// =============== Revision Tracker — 20+ entries ===============
export const expandedRevisions: RevisionEntry[] = [
  { id: "r-gs1-1857", topic: "GS1 Modern History — 1857 Revolt", noteDate: "2026-07-01", r1Done: true, r2Done: true, r3Done: false, r4Done: false },
  { id: "r-gs1-gandhi", topic: "GS1 Modern History — Gandhi Phase", noteDate: "2026-07-03", r1Done: true, r2Done: true, r3Done: false, r4Done: false },
  { id: "r-gs1-arch", topic: "GS1 Art & Culture — Temple Architecture", noteDate: "2026-07-08", r1Done: true, r2Done: false, r3Done: false, r4Done: false },
  { id: "r-gs1-bhakti", topic: "GS1 Art & Culture — Bhakti/Sufi", noteDate: "2026-07-10", r1Done: true, r2Done: false, r3Done: false, r4Done: false },
  { id: "r-gs1-soc", topic: "GS1 Indian Society — Secularism", noteDate: "2026-07-15", r1Done: true, r2Done: false, r3Done: false, r4Done: false },
  { id: "r-gs1-cyclone", topic: "GS1 Geography — Tropical Cyclones", noteDate: "2026-08-01", r1Done: true, r2Done: false, r3Done: false, r4Done: false },
  { id: "r-gs1-geo", topic: "GS1 Geography — Physical features", noteDate: "2026-08-05", r1Done: true, r2Done: true, r3Done: false, r4Done: false },
  { id: "r-gs2-polity", topic: "GS2 Polity — Parliament", noteDate: "2026-08-12", r1Done: true, r2Done: false, r3Done: false, r4Done: false },
  { id: "r-gs2-fed", topic: "GS2 Federalism", noteDate: "2026-08-14", r1Done: false, r2Done: false, r3Done: false, r4Done: false }, // OVERDUE
  { id: "r-gs2-gov", topic: "GS2 Governor's Office", noteDate: "2026-08-19", r1Done: true, r2Done: false, r3Done: false, r4Done: false },
  { id: "r-gs2-pris", topic: "GS2 PRIs/ULBs", noteDate: "2026-08-22", r1Done: true, r2Done: false, r3Done: false, r4Done: false },
  { id: "r-gs2-sj", topic: "GS2 Social Justice", noteDate: "2026-08-26", r1Done: true, r2Done: false, r3Done: false, r4Done: false },
  { id: "r-gs2-ir", topic: "GS2 International Relations", noteDate: "2026-09-05", r1Done: true, r2Done: false, r3Done: false, r4Done: false },
  { id: "r-gs3-msp", topic: "GS3 Agriculture MSP", noteDate: "2026-09-23", r1Done: true, r2Done: false, r3Done: false, r4Done: false },
  { id: "r-gs3-food", topic: "GS3 Food Security", noteDate: "2026-09-24", r1Done: false, r2Done: false, r3Done: false, r4Done: false },
  { id: "r-gs3-land", topic: "GS3 Land Reforms", noteDate: "2026-09-24", r1Done: false, r2Done: false, r3Done: false, r4Done: false },
  { id: "r-gs3-sustain", topic: "GS3 Sustainable Agriculture", noteDate: "2026-09-25", r1Done: false, r2Done: false, r3Done: false, r4Done: false },
  { id: "r-soc-marx", topic: "Sociology P1 — Marx", noteDate: "2026-09-20", r1Done: true, r2Done: false, r3Done: false, r4Done: false },
  { id: "r-soc-thinkers", topic: "Sociology P1 — Thinkers", noteDate: "2026-09-22", r1Done: true, r2Done: false, r3Done: false, r4Done: false },
  { id: "r-soc-caste", topic: "Sociology P2 — Caste", noteDate: "2026-09-23", r1Done: false, r2Done: false, r3Done: false, r4Done: false },
];

// =============== Test Analysis — 5 entries (one per major test) ===============
export const expandedTests: TestEntry[] = [
  {
    id: "te-gs1-mod",
    date: "2026-07-07",
    subject: "GS1 Modern History",
    type: "Sectional test",
    score: 72,
    weakDimensions: ["Poor introductions", "Weak multidimensional"],
    dimensions: {
      weakDimensions: 3, weakContent: 3, poorIntros: 2, poorConclusions: 3, lackOfData: 3, multiDimensional: 2, timeManagement: 4,
    },
    diagnosis: {
      weakDimensions: "Missed economic dimension in 1857 question",
      weakContent: "Limited Eric Stokes / subaltern perspective",
      poorIntros: "Generic intros — no data or hook",
      poorConclusions: "Repetitive, no forward-looking",
      lackOfData: "Only 2 data points used",
      multiDimensional: "Mostly political lens; missed social/economic",
      timeManagement: "17/20 questions completed",
    },
    correctiveActions: [
      "Practice 5 alternative intros for 1857 question",
      "Add Eric Stokes perspective to notes",
      "Build Modern History data card (1857 casualties, INC founding year, etc.)",
    ],
  },
  {
    id: "te-gs2-polity",
    date: "2026-08-18",
    subject: "GS2 Polity + Governance",
    type: "Sectional test",
    score: 75,
    weakDimensions: ["Lack of data", "Poor conclusions"],
    dimensions: {
      weakDimensions: 4, weakContent: 3, poorIntros: 3, poorConclusions: 2, lackOfData: 2, multiDimensional: 3, timeManagement: 4,
    },
    diagnosis: {
      weakDimensions: "Missed ARC II recommendations in governance Q",
      weakContent: "No Punchhi Commission data",
      poorIntros: "Decent but lacked constitutional hook",
      poorConclusions: "Generic recommendations",
      lackOfData: "Only 1 committee cited",
      multiDimensional: "Political + administrative but missed comparative",
      timeManagement: "19/20 questions",
    },
    correctiveActions: [
      "Add Punchhi + Sarkaria + 2nd ARC recommendations to notes",
      "Practice 5 constitutional-hook intros",
      "Build governance schemes data card",
    ],
  },
  {
    id: "te-gs3-agri",
    date: "2026-09-27",
    subject: "GS3 Agriculture",
    type: "Sectional test",
    score: 78,
    weakDimensions: ["Sustainable agriculture angle missed", "Lack of data"],
    dimensions: {
      weakDimensions: 3, weakContent: 2, poorIntros: 2, poorConclusions: 3, lackOfData: 2, multiDimensional: 3, timeManagement: 4,
    },
    diagnosis: {
      weakDimensions: "Missed sustainable agriculture angle in MSP question",
      weakContent: "No MSP paddy 2026 data; should cite Cabinet decision",
      poorIntros: "Generic intro — define MSP but no context",
      poorConclusions: "Repeated intro wording in conclusion",
      lackOfData: "Only 1 data point (NCRB); add ENSAM, NITI data",
      multiDimensional: "Missed ecological + gender dimensions",
      timeManagement: "Completed 18/20 questions — good pace",
    },
    correctiveActions: [
      "Re-read sustainable agriculture theme + add 3 data points to notes",
      "Practice 5 introductions with scheme/data hook",
      "Build a data sheet: MSP, PDS, FCI procurement numbers",
      "Add ecological + gender angle checklist to answer-writing template",
    ],
  },
  {
    id: "te-full1",
    date: "2026-11-22",
    subject: "Full Mock 1 — GS1+GS2+GS3+GS4 + Essay",
    type: "Full mock",
    score: 68,
    weakDimensions: ["Time management", "GS4 case studies"],
    dimensions: {
      weakDimensions: 3, weakContent: 3, poorIntros: 3, poorConclusions: 3, lackOfData: 3, multiDimensional: 3, timeManagement: 2,
    },
    diagnosis: {
      weakDimensions: "GS4 case study structure weak — options not exhaustive",
      weakContent: "GS3 Economy questions lacked RBI data",
      poorIntros: "Mixed — some good, some generic",
      poorConclusions: "GS1 conclusions weaker than GS2/GS3",
      lackOfData: "Adequate in GS2/GS3, weak in GS4",
      multiDimensional: "GS1 multi-dim weakest",
      timeManagement: "Left 4 questions in GS3, 2 in GS4",
    },
    correctiveActions: [
      "Practice GS4 case-study template: stakeholders → ethical issues → options → consequences → recommendation",
      "Time discipline: 7 min per 10-marker, 11 min per 15-marker",
      "Build GS4 thinker quotes bank (Gandhi, Kant, Rawls, Aristotle)",
    ],
  },
  {
    id: "te-soc-p1",
    date: "2026-10-05",
    subject: "Sociology P1 — Thinkers & Stratification",
    type: "Optional sectional",
    score: 71,
    weakDimensions: ["Thinker quotes underused", "Indian application weak"],
    dimensions: {
      weakDimensions: 3, weakContent: 3, poorIntros: 3, poorConclusions: 2, lackOfData: 4, multiDimensional: 3, timeManagement: 4,
    },
    diagnosis: {
      weakDimensions: "Marx question lacked Indian case study",
      weakContent: "Weber's rationalisation — no Indian bureaucracy example",
      poorIntros: "Decent but could use thinker quotes",
      poorConclusions: "Generic — no synthesis",
      lackOfData: "Good — used NSSO + Mandal data",
      multiDimensional: "Theoretical + Indian but missed gender",
      timeManagement: "On time",
    },
    correctiveActions: [
      "Build thinker quote bank: Marx (5), Durkheim (5), Weber (5), Parsons (3)",
      "Indian case studies for each thinker: A.R. Desai (Marx), Veena Das (Durkheim?), Dipankar Gupta (Weber)",
      "Practice 5 Sociology answers with thesis-led structure",
    ],
  },
];

// =============== Expanded CA Tracker — across all themes ===============
export const expandedCA: CAItem[] = [
  // Agriculture (existing)
  { id: "c-agri-1", source: "The Hindu", date: "2026-09-20", headline: "Cabinet approves increase in MSP for rabi crops", primaryTheme: "Agriculture — MSP", integratedInto: "Agriculture MSP" },
  { id: "c-agri-2", source: "Indian Express", date: "2026-09-18", headline: "FCI procurement crosses 50MT — food security cushion", primaryTheme: "Agriculture — Food Security", integratedInto: "Food Security + PDS + FCI" },
  { id: "c-agri-3", source: "PIB", date: "2026-09-15", headline: "PM-AASHA scheme expanded for oilseeds", primaryTheme: "Agriculture — MSP", integratedInto: "Agriculture MSP" },
  { id: "c-agri-4", source: "Down to Earth", date: "2026-09-10", headline: "Agrarian distress in Marathwada — crop failure data", primaryTheme: "Agriculture — Distress", integratedInto: "Agrarian distress" },
  { id: "c-agri-5", source: "The Hindu", date: "2026-09-05", headline: "Land reform stalemate — revenue records digitalisation", primaryTheme: "Agriculture — Land Reforms", integratedInto: "— pending" },

  // Federalism / Governance
  { id: "c-gov-1", source: "The Hindu", date: "2026-08-20", headline: "Governor-President's Rule controversy in State X", primaryTheme: "Governance — Governor", integratedInto: "Governor's Office" },
  { id: "c-gov-2", source: "Indian Express", date: "2026-08-22", headline: "GST Council meeting — compensation extension debate", primaryTheme: "Governance — Federalism", integratedInto: "Federalism" },
  { id: "c-gov-3", source: "PIB", date: "2026-08-25", headline: "Inter-State Council meeting — 12 recommendations", primaryTheme: "Governance — Federalism", integratedInto: "— pending" },

  // Polity
  { id: "c-pol-1", source: "The Hindu", date: "2026-08-15", headline: "SC Collegium recommends 5 new judges — pending", primaryTheme: "Polity — Judiciary", integratedInto: "— pending" },
  { id: "c-pol-2", source: "Indian Express", date: "2026-08-17", headline: "Anti-defection law — Tenth Schedule reform debate", primaryTheme: "Polity — Parliament", integratedInto: "— pending" },

  // IR
  { id: "c-ir-1", source: "The Hindu", date: "2026-09-08", headline: "Quad foreign ministers' meeting — joint statement", primaryTheme: "IR — Quad", integratedInto: "IR — Quad & Indo-Pacific" },
  { id: "c-ir-2", source: "Indian Express", date: "2026-09-06", headline: "India-China border talks — 21st round of corps commander", primaryTheme: "IR — China", integratedInto: "— pending" },

  // Environment
  { id: "c-env-1", source: "Down to Earth", date: "2026-10-12", headline: "COP 29 — India's climate finance demands", primaryTheme: "Environment — Climate Change", integratedInto: "— pending" },
  { id: "c-env-2", source: "The Hindu", date: "2026-10-10", headline: "EIA Notification 2026 — draft amendments", primaryTheme: "Environment — EIA", integratedInto: "— pending" },

  // Economy
  { id: "c-eco-1", source: "The Hindu", date: "2026-09-12", headline: "RBI keeps repo rate unchanged at 6.5%", primaryTheme: "Economy — Monetary Policy", integratedInto: "— pending" },
  { id: "c-eco-2", source: "Indian Express", date: "2026-09-14", headline: "Q1 GDP growth at 7.8% — manufacturing leads", primaryTheme: "Economy — Growth", integratedInto: "— pending" },

  // Sociology
  { id: "c-soc-1", source: "The Hindu", date: "2026-09-22", headline: "Caste census demand — Bihar precedent", primaryTheme: "Sociology P2 — Caste", integratedInto: "— pending" },
  { id: "c-soc-2", source: "Indian Express", date: "2026-09-25", headline: "NFHS-6 findings — fertility decline among SC/ST", primaryTheme: "Sociology P2 — Population", integratedInto: "— pending" },
];

// =============== Richer Mentor Conversation History ===============
// Realistic exchanges that show the system working
export const expandedMentorSessions: ChatMessage[] = [
  {
    id: "m-onboard",
    role: "assistant",
    content:
      "**Welcome to your AI UPSC Mentor.**\n\nEach evening, share a 3-5 line input:\n- tasks completed / skipped\n- hours studied\n- energy (1-10)\n- one specific doubt or blocker\n\nI'll respond with assessment, what's tight, what's loose, and an adjusted plan for tomorrow. I follow 6 decision rules in strict priority order — Rule 1 (protect revision) always wins. Let's keep this disciplined.",
    timestamp: Date.now() - 86400000 * 7,
    sessionLabel: "Onboarding",
  },
  {
    id: "m-day1",
    role: "user",
    content:
      "Day 1 (1 Jul) complete. Did 8/9 tasks. Set up planner, did PYQ analysis for GS1 Modern History (extracted 5 PYQs across 2019-2023), started Theme 1 (1857 Revolt) notes, did Sociology P1 U1 read. Energy 8/10. Skipped newspaper scan — will catch up tomorrow AM.",
    timestamp: Date.now() - 86400000 * 6,
    sessionLabel: "Day 1 — Modern History start",
  },
  {
    id: "m-day1-resp",
    role: "assistant",
    content:
      "**Assessment: Strong Day 1.** Setting up the system + starting Week 1 with PYQ analysis is exactly the right move.\n\n**What you understood well:** PYQ-first approach — you extracted 5 PYQs before reading any source. This is the template for every future week.\n\n**What can be tightened:** Skipping newspaper is fine on Day 1 but becomes a habit by Day 5. Tomorrow AM, do 30-min scan focused only on Modern History references (1857 commemorations, freedom fighter events, sovereignty debates).\n\n**Tomorrow's plan:**\n- 06:30 R1 revision of today's notes (1857 + Sociology U1)\n- 07:30 Theme 2: Moderates vs Extremists (Spectrum + Bipan Chandra)\n- 09:30 Theme 3: Indian National Congress formation (1885)\n- 11:30 Optional: Sociology P1 U2 — Marx (read + compress)\n- 14:00 Theme 4: Partition of Bengal (1905) + Swadeshi\n- 16:00 Optional value addition: Marx thinker quotes\n- 18:00 Newspaper scan (30 min)\n\n**One mentor observation:** You've scheduled R1 for today's notes on 8 July. Don't let that slip — Rule 1.",
    timestamp: Date.now() - 86400000 * 6 + 600000,
  },
  {
    id: "m-badday",
    role: "user",
    content:
      "Bad day. Only 4/8 tasks. Theme 4 (Partition of Bengal) took 3 hours — source was dense. Skipped Optional. Skipped answer writing. Skipped newspaper. Energy 3/10. Should I do an all-nighter tomorrow?",
    timestamp: Date.now() - 86400000 * 3,
    sessionLabel: "Bad day",
  },
  {
    id: "m-badday-resp",
    role: "assistant",
    content:
      "**Assessment: Difficult day, but recoverable. No all-nighter.**\n\n**What I see:** You skipped Optional, answer writing, AND newspaper in one day. That is a triage failure — the daily rhythm must protect at minimum (a) 2 hr Optional, (b) 1 answer, (c) R1 of yesterday's notes. When you skip all three, the system breaks.\n\n**What I understand:** Theme 4 was denser than estimated. That is not your failure — it's a planning failure of mine. I allocated 2 hr to a theme that needed 3. Logging this.\n\n**What's postponed:** Tomorrow's Theme 5 (Non-Cooperation Movement) is moved to Sunday buffer. The freed 2 hr goes to catch-up.\n\n**Tomorrow's priority (Fri):**\n- 06:30 R1 of yesterday's notes (non-negotiable, Rule 1)\n- 07:30 1 GS1 answer on 1857 (15 min) + 2 review\n- 09:00 Optional P1 Marx — 2 hr (the skipped block)\n- 14:00 Theme 4 completion (1.5 hr — the dense source)\n- 16:00 R1 of today's notes\n- 18:00 Newspaper (20 min, compressed)\n\n**Burnout guard (Rule 6):** Tomorrow's load is 7 hr (not 8.5). I am deliberately under-loading. Sleep 7 hr. The marginal hour of sleep deprivation costs you 2 hr of next-day cognitive capacity. The math is unambiguous.",
    timestamp: Date.now() - 86400000 * 3 + 600000,
  },
  {
    id: "m-weekly",
    role: "user",
    content:
      "Sunday weekly review. Week 11 done. Completed 38/52 planned tasks (73%). Took sectional test on Agriculture (78/100). 8 R1 revisions done on time. Optional Sociology P2 Caste — 3 hours this week. 2 CA items integrated into notes. Energy avg 7/10. Weak intro quality flagged in test analysis.",
    timestamp: Date.now() - 86400000,
    sessionLabel: "Weekly review — Week 11",
  },
  {
    id: "m-weekly-resp",
    role: "assistant",
    content:
      "**Assessment: Solid week. 73% completion is sustainable pace. Test score 78/100 is in the 'above average' band for Week 11 of a 26-week sprint.**\n\n**What worked:**\n- Agriculture week executed correctly — PYQ-first, 5 themes covered, sectional test taken on schedule\n- Optional got its 25% share (no Rule 3 violation)\n- 2 CA items integrated into notes (above the 0-integration baseline)\n\n**What's tight:**\n- Intro quality flagged 2 tests in a row now (Week 10 GS2 + Week 11 GS3). This is a persistent weak dimension — Rule: 3+ consecutive tests below 3 = corrective programme. Triggered.\n- R1 revisions: 8/8 done is excellent. But 4 R2 revisions now overdue from Week 9-10. Rule 1 (protect revision) — these become top priority next week.\n\n**Week 12 plan adjustments (Rule 4: adapt to slippage):**\n- Drop 1 lower-priority task this week (Theme 6 — Allied sectors) to absorb R2 backlog\n- Add 30-min R2 block daily: Tue (Modern Hist R2), Wed (Art & Culture R2), Thu (Geography R2), Fri (Polity R2)\n\n**Corrective programme — 5-day intro drill:**\nStarting Monday, before any other work, write 3 alternative intros for one question (10 min). Use structure: Hook (data/quote/committee) + Context + Thesis + Scope. End of Friday, you'll have 15 intros. Saturday: pick the 3 best, expand to full answers.\n\n**Next Sunday's mentor review:** Will measure if intro score crossed 3.5/5 in Week 12 test. If yes, drill continues but lighter. If no, escalate to 2-week intensive.",
    timestamp: Date.now() - 86400000 + 600000,
  },
];
