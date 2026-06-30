import type {
  WeekPlan,
  WeeklyPlan,
  Task,
  GSSubject,
  SociologyUnit,
  NoteTopic,
  RevisionEntry,
  PYQ,
  CAItem,
  TestEntry,
  KnowledgeTopic,
  ChatMessage,
  StudyDayLog,
  DayPlan,
} from "./types";

// Helper: today in ISO (we'll use the "current week 11" assumption per PDF — late Sep 2026)
// We use real "today" for daily planner so the dashboard feels live; seed tasks anchor to a fixed study day.
const ISO_TODAY = new Date().toISOString().slice(0, 10);

// =============== Six-Month Planner seed (26 weeks incl buffers) ===============
export const seedSixMonthPlan: WeekPlan[] = [
  { id: "w1", weekNumber: 1, label: "Week 1", dates: "1-7 Jul", phase: "Phase 1", gsFocus: "GS1 Modern History", optionalTopic: "Sociology P1 Unit 1: Discipline" },
  { id: "w2", weekNumber: 2, label: "Week 2", dates: "8-14 Jul", phase: "Phase 1", gsFocus: "GS1 Art & Culture", optionalTopic: "Sociology P1 Unit 2: Thinkers I (Marx, Durkheim)" },
  { id: "w3", weekNumber: 3, label: "Week 3", dates: "15-21 Jul", phase: "Phase 1", gsFocus: "GS1 Indian Society", optionalTopic: "Sociology P1 Unit 2: Thinkers II (Weber, Parsons)" },
  { id: "w4", weekNumber: 4, label: "Week 4", dates: "22-28 Jul", phase: "Phase 1", gsFocus: "GS1 World History + Post-Independence", optionalTopic: "Sociology P1 Unit 3: Research Methods" },
  { id: "w5", weekNumber: 5, label: "Week 5", dates: "29 Jul-4 Aug", phase: "Phase 1", gsFocus: "GS1 Geography", optionalTopic: "Sociology P1 Unit 4: Stratification" },
  { id: "w5b", weekNumber: 5.5, label: "BUFFER", dates: "5-11 Aug", phase: "Buffer", gsFocus: "R2 of GS1 notes + catch-up", optionalTopic: "Sociology P1 catch-up" },
  { id: "w6", weekNumber: 6, label: "Week 6", dates: "12-18 Aug", phase: "Phase 1", gsFocus: "GS2 Polity (Constitution, FR/FD, DPSP, Parliament, Judiciary)", optionalTopic: "Sociology P1 Unit 5: Works & Economic Life" },
  { id: "w7", weekNumber: 7, label: "Week 7", dates: "19-25 Aug", phase: "Phase 1", gsFocus: "GS2 Governance (Federalism, LG, Decentralisation, Civil Services)", optionalTopic: "Sociology P1 Unit 6: Family, Kinship, Marriage" },
  { id: "w8", weekNumber: 8, label: "Week 8", dates: "26 Aug-1 Sep", phase: "Phase 1", gsFocus: "GS2 Social Justice + Welfare Schemes + Pressure Groups", optionalTopic: "Sociology P1 Unit 7: Religion" },
  { id: "w9", weekNumber: 9, label: "Week 9", dates: "2-8 Sep", phase: "Phase 2", gsFocus: "GS2 International Relations", optionalTopic: "Sociology P1 Unit 8: Politics & Society" },
  { id: "w10", weekNumber: 10, label: "Week 10", dates: "9-15 Sep", phase: "Phase 2", gsFocus: "GS3 Indian Economy", optionalTopic: "Sociology P1 Units 9-10: Education, Science/Tech" },
  { id: "w10b", weekNumber: 10.5, label: "BUFFER", dates: "16-22 Sep", phase: "Buffer", gsFocus: "R2 of GS2 + first full GS mock", optionalTopic: "Sociology P2 Unit 1: Indian Society intro" },
  { id: "w11", weekNumber: 11, label: "Week 11", dates: "23-29 Sep", phase: "Phase 2", gsFocus: "GS3 Agriculture + Land Reforms + Food Security", optionalTopic: "Sociology P2 Unit 2: Caste" },
  { id: "w12", weekNumber: 12, label: "Week 12", dates: "30 Sep-6 Oct", phase: "Phase 2", gsFocus: "GS3 Science & Technology", optionalTopic: "Sociology P2 Unit 3: Tribes" },
  { id: "w13", weekNumber: 13, label: "Week 13", dates: "7-13 Oct", phase: "Phase 2", gsFocus: "GS3 Environment + Biodiversity + Climate Change", optionalTopic: "Sociology P2 Unit 4: Rural transformation" },
  { id: "w14", weekNumber: 14, label: "Week 14", dates: "14-20 Oct", phase: "Phase 2", gsFocus: "GS3 Internal Security + Disaster Management", optionalTopic: "Sociology P2 Unit 5: Population dynamics" },
  { id: "w15", weekNumber: 15, label: "Week 15", dates: "21-27 Oct", phase: "Phase 2", gsFocus: "GS4 Ethics Theory + Thinkers + Attitude + Aptitude", optionalTopic: "Sociology P2 Unit 6: Politicisation" },
  { id: "w16", weekNumber: 16, label: "Week 16", dates: "28 Oct-3 Nov", phase: "Phase 2", gsFocus: "GS4 EI + Moral Thinkers + Case Studies method", optionalTopic: "Sociology P2 Units 7-8: Religion, Secularism" },
  { id: "w17", weekNumber: 17, label: "Week 17", dates: "4-10 Nov", phase: "Phase 2", gsFocus: "GS4 Case Studies intensive + Ethics revision", optionalTopic: "Sociology P2 Units 9-10: Vision, Challenges" },
  { id: "w17b", weekNumber: 17.5, label: "BUFFER", dates: "11-17 Nov", phase: "Buffer", gsFocus: "first optional full mock + GS4 case-study set", optionalTopic: "Optional mock 1" },
  { id: "w18", weekNumber: 18, label: "Week 18", dates: "18-24 Nov", phase: "Phase 3", gsFocus: "FULL MOCK 1: GS1+GS2+GS3+GS4 set + Essay", optionalTopic: "Optional mock 2" },
  { id: "w19", weekNumber: 19, label: "Week 19", dates: "25 Nov-1 Dec", phase: "Phase 3", gsFocus: "FULL MOCK 2: GS1+GS2+GS3+GS4 set + Essay", optionalTopic: "Optional mock 3" },
  { id: "w20", weekNumber: 20, label: "Week 20", dates: "2-8 Dec", phase: "Phase 3", gsFocus: "R4 of all notes · Optional mock 4 · Essay mock", optionalTopic: "Optional mock 4" },
  { id: "w21", weekNumber: 21, label: "Week 21", dates: "9-14 Dec", phase: "Phase 3", gsFocus: "Light revision · sleep cycle sync · no new content", optionalTopic: "Light revision only" },
];

// =============== Weekly Planner seed (template-based; we generate for week 11 + adjacent) ===============
function buildWeekTemplate(weekId: number): WeeklyPlan {
  const base: WeeklyDay[] = [
    { dayName: "Mon", dayNumber: 1, slots: {
      morning: { label: "Morning (3 hr)", content: "PYQ analysis of new subject — last 5 yrs, theme tagging" },
      afternoon: { label: "Afternoon (3 hr)", content: "Theme-wise study + Level-1 notes" },
      evening: { label: "Evening (2 hr)", content: "Optional parallel topic — read + compress" },
    }, revisionReminder: "R1 of last week's notes" },
    { dayName: "Tue", dayNumber: 2, slots: {
      morning: { label: "Morning (3 hr)", content: "Theme-wise study + Level-1 notes" },
      afternoon: { label: "Afternoon (3 hr)", content: "Theme-wise study + Level-1 notes" },
      evening: { label: "Evening (2 hr)", content: "Optional parallel topic — read + compress" },
    }, revisionReminder: "R1 of yesterday's notes" },
    { dayName: "Wed", dayNumber: 3, slots: {
      morning: { label: "Morning (3 hr)", content: "R1 revision + theme-wise study + Level-1 notes" },
      afternoon: { label: "Afternoon (3 hr)", content: "Answer writing: 15-min Q + review" },
      evening: { label: "Evening (2 hr)", content: "Optional value addition" },
    }, revisionReminder: "R1 due today" },
    { dayName: "Thu", dayNumber: 4, slots: {
      morning: { label: "Morning (3 hr)", content: "Theme-wise study + Level-1 notes" },
      afternoon: { label: "Afternoon (3 hr)", content: "Theme-wise study + Level-1 notes" },
      evening: { label: "Evening (2 hr)", content: "Optional parallel topic — read + compress" },
    }, revisionReminder: "— " },
    { dayName: "Fri", dayNumber: 5, slots: {
      morning: { label: "Morning (3 hr)", content: "Theme-wise study + Level-1 notes" },
      afternoon: { label: "Afternoon (3 hr)", content: "CA integration into Level-1 notes" },
      evening: { label: "Evening (2 hr)", content: "Optional parallel topic — read + compress" },
    }, revisionReminder: "R2 of oldest due" },
    { dayName: "Sat", dayNumber: 6, slots: {
      morning: { label: "Morning (3 hr)", content: "Current affairs integration — newspaper + magazine" },
      afternoon: { label: "Afternoon (3 hr)", content: "CA → Level-2 notes (themes linkages)" },
      evening: { label: "Evening (2 hr)", content: "Optional: answer writing practice" },
    }, revisionReminder: "—" },
    { dayName: "Sun", dayNumber: 7, slots: {
      morning: { label: "Morning (2.5 hr)", content: "Sectional test (2.5 hr)" },
      afternoon: { label: "Afternoon (1 hr)", content: "Self-evaluation (1 hr)" },
      evening: { label: "Evening (1.5 hr)", content: "AI mentor review (1.5 hr)" },
    }, revisionReminder: "Weekly review" },
  ];
  return { weekId, days: base };
}

export const seedWeeklyPlans: WeeklyPlan[] = [
  buildWeekTemplate(10),
  buildWeekTemplate(11),
  buildWeekTemplate(12),
];

// =============== Daily Planner seed (Week 11 Wed — Day 3, per PDF Table 7.3) ===============
export const seedTasks: Task[] = [
  { id: "t1", date: ISO_TODAY, timeSlot: "06:30-07:00", description: "R1 revision: yesterday's GS3 Agriculture notes (themes 1-2)", priority: "P1", difficulty: 2, completed: false, learningOutcome: "Recall 80% of compressed notes", revisionDate: "2026-09-28" },
  { id: "t2", date: ISO_TODAY, timeSlot: "07:30-09:00", description: "Theme 3: Food security + PDS + FCI — read source + compress", priority: "P1", difficulty: 3, completed: false, learningOutcome: "Level-1 notes for food security", revisionDate: "2026-09-28" },
  { id: "t3", date: ISO_TODAY, timeSlot: "09:30-11:00", description: "Theme 4: Land reforms — read + compress", priority: "P1", difficulty: 3, completed: false, learningOutcome: "Level-1 notes for land reforms", revisionDate: "2026-09-28" },
  { id: "t4", date: ISO_TODAY, timeSlot: "11:30-12:30", description: "Optional: Sociology P2 · Caste — read Srinivas + notes", priority: "P1", difficulty: 3, completed: false, learningOutcome: "Level-1 notes for caste", revisionDate: "2026-09-28" },
  { id: "t5", date: ISO_TODAY, timeSlot: "14:00-15:30", description: "Answer writing: GS3 question on MSP (15 min) + 2 review", priority: "P1", difficulty: 4, completed: false, learningOutcome: "One evaluated GS3 answer" },
  { id: "t6", date: ISO_TODAY, timeSlot: "16:00-17:30", description: "Theme 5: Sustainable agriculture — read + compress", priority: "P2", difficulty: 3, completed: false, learningOutcome: "Level-1 notes for sustainable agri", revisionDate: "2026-09-29" },
  { id: "t7", date: ISO_TODAY, timeSlot: "18:00-19:00", description: "Optional: Sociology P2 · Caste — value addition", priority: "P1", difficulty: 3, completed: false, learningOutcome: "Notes enriched with thinkers + data", revisionDate: "2026-09-29" },
  { id: "t8", date: ISO_TODAY, timeSlot: "20:00-20:30", description: "Newspaper scan: 30 min, focused on agri + caste items", priority: "P3", difficulty: 1, completed: false, learningOutcome: "3 CA items captured" },
];

// =============== Monthly Planner seed (July 2026 with sample entries) ===============
export function buildMonthlySeed(month: string): DayPlan[] {
  // month is YYYY-MM; we generate sample entries for July 2026 only
  if (month !== "2026-07") return [];
  const entries: DayPlan[] = [
    { date: "2026-07-01", gsFocus: "Modern History — Revolt of 1857", optionalTopic: "Sociology P1 U1 — Discipline", notes: "Week 1 starts" },
    { date: "2026-07-02", gsFocus: "Modern History — Indian National Congress", optionalTopic: "Sociology P1 U1 — Discipline" },
    { date: "2026-07-03", gsFocus: "Modern History — Moderates vs Extremists", optionalTopic: "Sociology P1 U1 — Discipline" },
    { date: "2026-07-04", gsFocus: "Modern History — Partition of Bengal", optionalTopic: "Sociology P1 U1 — Discipline" },
    { date: "2026-07-05", gsFocus: "Modern History — Revise + CA integration", optionalTopic: "Sociology P1 U1 — Discipline", revisionDue: true },
    { date: "2026-07-06", gsFocus: "CA integration — Indian Express + PIB", optionalTopic: "Optional: P1 U1 catch-up" },
    { date: "2026-07-07", gsFocus: "Sectional test (2.5h) + eval", optionalTopic: "Optional: P1 U1 review", hasTest: true },
    { date: "2026-07-08", gsFocus: "Art & Culture — Architecture", optionalTopic: "Sociology P1 U2 — Marx" },
    { date: "2026-07-09", gsFocus: "Art & Culture — Dance forms", optionalTopic: "Sociology P1 U2 — Marx" },
    { date: "2026-07-10", gsFocus: "Art & Culture — Music traditions", optionalTopic: "Sociology P1 U2 — Durkheim" },
    { date: "2026-07-11", gsFocus: "Art & Culture — Painting schools", optionalTopic: "Sociology P1 U2 — Durkheim" },
    { date: "2026-07-12", gsFocus: "Art & Culture — Revise + CA", optionalTopic: "Optional catch-up", revisionDue: true },
    { date: "2026-07-13", gsFocus: "CA integration", optionalTopic: "Optional: Thinkers revision" },
    { date: "2026-07-14", gsFocus: "Sectional test + AI mentor review", optionalTopic: "Optional review", hasTest: true },
    { date: "2026-07-15", gsFocus: "Indian Society — Salient features", optionalTopic: "Sociology P1 U2 — Weber" },
    { date: "2026-07-22", gsFocus: "World History — Industrial Revolution", optionalTopic: "Sociology P1 U3 — Research Methods", revisionDue: true },
    { date: "2026-07-29", gsFocus: "Geography — Physical features", optionalTopic: "Sociology P1 U4 — Stratification" },
  ];
  return entries;
}

// =============== GS Tracker seed ===============
export const seedGSTracker: GSSubject[] = [
  { id: "g1", paper: "GS1", name: "Modern History", themesTotal: 14, readingDone: 14, notesDone: 14, pyqMapped: 14, answerWriting: 8 },
  { id: "g2", paper: "GS1", name: "Art & Culture", themesTotal: 12, readingDone: 12, notesDone: 12, pyqMapped: 10, answerWriting: 5 },
  { id: "g3", paper: "GS1", name: "Indian Society", themesTotal: 11, readingDone: 11, notesDone: 11, pyqMapped: 11, answerWriting: 6 },
  { id: "g4", paper: "GS1", name: "Geography", themesTotal: 15, readingDone: 15, notesDone: 12, pyqMapped: 15, answerWriting: 4 },
  { id: "g5", paper: "GS2", name: "Polity", themesTotal: 18, readingDone: 18, notesDone: 18, pyqMapped: 18, answerWriting: 9 },
  { id: "g6", paper: "GS2", name: "Governance", themesTotal: 12, readingDone: 12, notesDone: 10, pyqMapped: 12, answerWriting: 4 },
  { id: "g7", paper: "GS2", name: "Social Justice", themesTotal: 10, readingDone: 8, notesDone: 7, pyqMapped: 10, answerWriting: 2 },
  { id: "g8", paper: "GS2", name: "International Relations", themesTotal: 12, readingDone: 10, notesDone: 8, pyqMapped: 12, answerWriting: 2 },
  { id: "g9", paper: "GS3", name: "Indian Economy", themesTotal: 18, readingDone: 0, notesDone: 0, pyqMapped: 0, answerWriting: 0 },
  { id: "g10", paper: "GS3", name: "Agriculture + Land Reforms + Food Security", themesTotal: 12, readingDone: 0, notesDone: 0, pyqMapped: 0, answerWriting: 0 },
  { id: "g11", paper: "GS3", name: "Science & Technology", themesTotal: 12, readingDone: 0, notesDone: 0, pyqMapped: 0, answerWriting: 0 },
  { id: "g12", paper: "GS3", name: "Environment + Biodiversity + Climate Change", themesTotal: 14, readingDone: 0, notesDone: 0, pyqMapped: 0, answerWriting: 0 },
  { id: "g13", paper: "GS3", name: "Internal Security + Disaster Management", themesTotal: 12, readingDone: 0, notesDone: 0, pyqMapped: 0, answerWriting: 0 },
  { id: "g14", paper: "GS4", name: "Ethics Theory + Thinkers + Attitude + Aptitude", themesTotal: 12, readingDone: 0, notesDone: 0, pyqMapped: 0, answerWriting: 0 },
  { id: "g15", paper: "GS4", name: "Public Admin / Governance Ethics", themesTotal: 8, readingDone: 0, notesDone: 0, pyqMapped: 0, answerWriting: 0 },
  { id: "g16", paper: "GS4", name: "Case Studies", themesTotal: 10, readingDone: 0, notesDone: 0, pyqMapped: 0, answerWriting: 0 },
];

// =============== Sociology Tracker seed ===============
export const seedSociologyTracker: SociologyUnit[] = [
  // P1 — all 10 units
  { id: "s1", paper: "P1", unitNumber: 1, unitName: "Sociology — The Discipline", notesDone: true, valueAdd: true, answerWritingCount: 3, r1Done: true, r2Done: true, testDone: true },
  { id: "s2", paper: "P1", unitNumber: 2, unitName: "Sociological Thinkers (Marx, Durkheim, Weber, Parsons)", notesDone: true, valueAdd: true, answerWritingCount: 4, r1Done: true, r2Done: true, testDone: true },
  { id: "s3", paper: "P1", unitNumber: 3, unitName: "Research Methods and Analysis", notesDone: true, valueAdd: true, answerWritingCount: 2, r1Done: true, r2Done: false, testDone: false },
  { id: "s4", paper: "P1", unitNumber: 4, unitName: "Sociology — Stratification", notesDone: true, valueAdd: true, answerWritingCount: 2, r1Done: true, r2Done: false, testDone: false },
  { id: "s5", paper: "P1", unitNumber: 5, unitName: "Works and Economic Life", notesDone: true, valueAdd: false, answerWritingCount: 1, r1Done: true, r2Done: false, testDone: false },
  { id: "s6", paper: "P1", unitNumber: 6, unitName: "Family, Kinship and Marriage", notesDone: true, valueAdd: false, answerWritingCount: 1, r1Done: false, r2Done: false, testDone: false },
  { id: "s7", paper: "P1", unitNumber: 7, unitName: "Religion", notesDone: false, valueAdd: false, answerWritingCount: 0, r1Done: false, r2Done: false, testDone: false },
  { id: "s8", paper: "P1", unitNumber: 8, unitName: "Politics and Society", notesDone: false, valueAdd: false, answerWritingCount: 0, r1Done: false, r2Done: false, testDone: false },
  { id: "s9", paper: "P1", unitNumber: 9, unitName: "Education", notesDone: false, valueAdd: false, answerWritingCount: 0, r1Done: false, r2Done: false, testDone: false },
  { id: "s10", paper: "P1", unitNumber: 10, unitName: "Science, Technology & Society", notesDone: false, valueAdd: false, answerWritingCount: 0, r1Done: false, r2Done: false, testDone: false },
  // P2 — empty (begins Week 11)
  { id: "s11", paper: "P2", unitNumber: 1, unitName: "Indian Society — intro", notesDone: false, valueAdd: false, answerWritingCount: 0, r1Done: false, r2Done: false, testDone: false },
  { id: "s12", paper: "P2", unitNumber: 2, unitName: "Caste", notesDone: false, valueAdd: false, answerWritingCount: 0, r1Done: false, r2Done: false, testDone: false },
  { id: "s13", paper: "P2", unitNumber: 3, unitName: "Tribes", notesDone: false, valueAdd: false, answerWritingCount: 0, r1Done: false, r2Done: false, testDone: false },
  { id: "s14", paper: "P2", unitNumber: 4, unitName: "Rural transformation", notesDone: false, valueAdd: false, answerWritingCount: 0, r1Done: false, r2Done: false, testDone: false },
  { id: "s15", paper: "P2", unitNumber: 5, unitName: "Population dynamics", notesDone: false, valueAdd: false, answerWritingCount: 0, r1Done: false, r2Done: false, testDone: false },
  { id: "s16", paper: "P2", unitNumber: 6, unitName: "Politicisation", notesDone: false, valueAdd: false, answerWritingCount: 0, r1Done: false, r2Done: false, testDone: false },
  { id: "s17", paper: "P2", unitNumber: 7, unitName: "Religion (P2)", notesDone: false, valueAdd: false, answerWritingCount: 0, r1Done: false, r2Done: false, testDone: false },
  { id: "s18", paper: "P2", unitNumber: 8, unitName: "Secularism", notesDone: false, valueAdd: false, answerWritingCount: 0, r1Done: false, r2Done: false, testDone: false },
  { id: "s19", paper: "P2", unitNumber: 9, unitName: "Vision of Social Change", notesDone: false, valueAdd: false, answerWritingCount: 0, r1Done: false, r2Done: false, testDone: false },
  { id: "s20", paper: "P2", unitNumber: 10, unitName: "Challenges of Social Transformation", notesDone: false, valueAdd: false, answerWritingCount: 0, r1Done: false, r2Done: false, testDone: false },
];

// =============== Notes Tracker seed ===============
export const seedNotesTracker: NoteTopic[] = [
  { id: "n1", topic: "Federalism", read: true, notes: true, data: true, reports: true, committees: true, cases: true, diagram: true, ca: true, r1: true, r2: true, awCount: 3, mastered: true },
  { id: "n2", topic: "Agriculture MSP", read: true, notes: true, data: true, reports: true, committees: true, cases: false, diagram: true, ca: true, r1: true, r2: false, awCount: 2, mastered: false },
  { id: "n3", topic: "Agrarian distress", read: true, notes: true, data: true, reports: false, committees: false, cases: true, diagram: false, ca: true, r1: true, r2: false, awCount: 1, mastered: false },
  { id: "n4", topic: "Pressure Groups", read: true, notes: false, data: false, reports: false, committees: false, cases: false, diagram: false, ca: false, r1: false, r2: false, awCount: 0, mastered: false },
  { id: "n5", topic: "Marx thinker (Sociology)", read: true, notes: true, data: false, reports: false, committees: false, cases: false, diagram: false, ca: false, r1: true, r2: false, awCount: 2, mastered: false },
  { id: "n6", topic: "Food Security + PDS + FCI", read: true, notes: true, data: false, reports: false, committees: false, cases: false, diagram: false, ca: true, r1: false, r2: false, awCount: 0, mastered: false },
];

// =============== Revision Tracker seed ===============
export const seedRevisionTracker: RevisionEntry[] = [
  { id: "r1", topic: "GS2 Federalism", noteDate: "2026-08-14", r1Done: false, r2Done: false, r3Done: false, r4Done: false }, // OVERDUE
  { id: "r2", topic: "GS1 Modern History — Revolt of 1857", noteDate: "2026-09-22", r1Done: true, r2Done: false, r3Done: false, r4Done: false },
  { id: "r3", topic: "Sociology P1 Thinkers — Marx", noteDate: "2026-09-20", r1Done: true, r2Done: false, r3Done: false, r4Done: false },
  { id: "r4", topic: "GS2 Polity — Parliament", noteDate: "2026-09-25", r1Done: false, r2Done: false, r3Done: false, r4Done: false },
  { id: "r5", topic: "GS1 Geography — Physical features", noteDate: "2026-08-05", r1Done: true, r2Done: true, r3Done: false, r4Done: false },
];

// =============== PYQ Tracker seed (Agriculture cluster) ===============
export const seedPYQTracker: PYQ[] = [
  { id: "p1", year: 2023, paper: "GS3", question: "What is Minimum Support Price (MSP)? How will MSP rescue farmers from low-income trap?", theme: "Agriculture — MSP", marks: 15, attempted: true, evaluated: true, inMistakeBook: true },
  { id: "p2", year: 2022, paper: "GS3", question: "What are the reformative steps taken by Government to achieve food security?", theme: "Agriculture — Food Security", marks: 15, attempted: true, evaluated: true, inMistakeBook: false },
  { id: "p3", year: 2021, paper: "GS3", question: "What are the salient features of the Food Corporation of India? Comment on its functioning.", theme: "Agriculture — FCI", marks: 10, attempted: true, evaluated: false, inMistakeBook: false },
  { id: "p4", year: 2020, paper: "GS3", question: "What are the challenges faced by farmers in Doubling Farmers Income (DFI)? Suggest measures.", theme: "Agriculture — DFI", marks: 15, attempted: false, evaluated: false, inMistakeBook: false },
  { id: "p5", year: 2019, paper: "GS3", question: "How far is Integrated Farming System (IFS) helpful in sustaining agricultural production?", theme: "Agriculture — IFS", marks: 10, attempted: true, evaluated: true, inMistakeBook: true },
  { id: "p6", year: 2018, paper: "GS3", question: "What do you mean by Minimum Support Price? What is its significance?", theme: "Agriculture — MSP", marks: 10, attempted: false, evaluated: false, inMistakeBook: false },
];

// =============== CA Tracker seed ===============
export const seedCATracker: CAItem[] = [
  { id: "c1", source: "The Hindu", date: "2026-09-20", headline: "Cabinet approves increase in MSP for rabi crops", primaryTheme: "Agriculture — MSP", integratedInto: "Agriculture MSP" },
  { id: "c2", source: "Indian Express", date: "2026-09-18", headline: "FCI procurement crosses 50MT — food security cushion", primaryTheme: "Agriculture — Food Security", integratedInto: "Food Security + PDS + FCI" },
  { id: "c3", source: "PIB", date: "2026-09-15", headline: "PM-AASHA scheme expanded for oilseeds", primaryTheme: "Agriculture — MSP", integratedInto: "Agriculture MSP" },
  { id: "c4", source: "Down to Earth", date: "2026-09-10", headline: "Agrarian distress in Marathwada — crop failure data", primaryTheme: "Agriculture — Distress", integratedInto: "Agrarian distress" },
  { id: "c5", source: "The Hindu", date: "2026-09-05", headline: "Land reform stalemate — revenue records digitalisation", primaryTheme: "Agriculture — Land Reforms", integratedInto: "— pending" },
];

// =============== Test Analysis seed ===============
export const seedTestAnalysis: TestEntry[] = [
  {
    id: "te1",
    date: "2026-09-27",
    subject: "GS3 Agriculture",
    type: "Sectional test",
    score: 78,
    weakDimensions: ["Sustainable agriculture angle missed", "Lack of data"],
    dimensions: {
      weakDimensions: 3,
      weakContent: 2,
      poorIntros: 2,
      poorConclusions: 3,
      lackOfData: 2,
      multiDimensional: 3,
      timeManagement: 4,
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
];

// =============== Knowledge Bank seed (Agriculture L6 worked example + others) ===============
const L0_L6_DEFAULT = [
  { level: 0, name: "Source Reading", status: false, deliverable: "" },
  { level: 1, name: "Level-1 Notes", status: false, deliverable: "" },
  { level: 2, name: "Value Add (thinkers/data)", status: false, deliverable: "" },
  { level: 3, name: "PYQ Mapping", status: false, deliverable: "" },
  { level: 4, name: "Answer Writing (3+)", status: false, deliverable: "" },
  { level: 5, name: "R1 + R2 Revision", status: false, deliverable: "" },
  { level: 6, name: "Mains-Ready", status: false, deliverable: "" },
];

export const seedKnowledgeBank: KnowledgeTopic[] = [
  {
    id: "k1",
    topic: "Agriculture (MSP, PDS, FCI, Land Reforms, Sustainable Agri)",
    paper: "GS3",
    targetDateL6: "2026-10-15",
    levels: [
      { level: 0, name: "Source Reading", status: true, deliverable: "Read Spectrum Economy ch. on Agriculture + Ramesh Singh chapters + NCERT Class 10 Geography ch.4" },
      { level: 1, name: "Level-1 Notes", status: true, deliverable: "5 themes compressed: MSP, PDS+FCI, Land Reforms, Sustainable Agri, Agrarian Distress — each 2-3 pages" },
      { level: 2, name: "Value Add (thinkers/data)", status: true, deliverable: "Added: MSP 2026 rabi data, Swaminathan formula C2+50%, Ashok Dalwai Committee (DFI), NITI 2022 agri report" },
      { level: 3, name: "PYQ Mapping", status: true, deliverable: "Mapped 6 PYQs (2018-2023) to 5 themes; identified MSP + Food Security as high-frequency" },
      { level: 4, name: "Answer Writing (3+)", status: true, deliverable: "3 evaluated answers (MSP 2023, Food Security 2022, IFS 2019); avg score 7.5/15" },
      { level: 5, name: "R1 + R2 Revision", status: true, deliverable: "R1 done 28 Sep; R2 done 18 Oct — recall 85% on self-test" },
      { level: 6, name: "Mains-Ready", status: true, deliverable: "Self-test 18/20 questions in 2.5 hr; mentor flagged as Mains-ready" },
    ],
  },
  {
    id: "k2",
    topic: "Federalism",
    paper: "GS2",
    targetDateL6: "2026-10-10",
    levels: [
      { level: 0, name: "Source Reading", status: true, deliverable: "Laxmikanth ch. on Federalism + D.D. Basu" },
      { level: 1, name: "Level-1 Notes", status: true, deliverable: "Cooperative vs competitive federalism, NITI Aayog role" },
      { level: 2, name: "Value Add (thinkers/data)", status: true, deliverable: "ARC II reports, Sarkaria Commission, Punchhi Commission" },
      { level: 3, name: "PYQ Mapping", status: true, deliverable: "5 PYQs mapped (2014-2022)" },
      { level: 4, name: "Answer Writing (3+)", status: true, deliverable: "3 answers evaluated, avg 8/15" },
      { level: 5, name: "R1 + R2 Revision", status: true, deliverable: "R1 done 21 Aug; R2 done 11 Sep" },
      { level: 6, name: "Mains-Ready", status: false, deliverable: "Pending — needs 1 more test + mentor sign-off" },
    ],
  },
  {
    id: "k3",
    topic: "Pressure Groups",
    paper: "GS2",
    targetDateL6: "2026-11-01",
    levels: [
      { level: 0, name: "Source Reading", status: true, deliverable: "Read Laxmikanth + newspaper" },
      { level: 1, name: "Level-1 Notes", status: false, deliverable: "" },
      { level: 2, name: "Value Add (thinkers/data)", status: false, deliverable: "" },
      { level: 3, name: "PYQ Mapping", status: false, deliverable: "" },
      { level: 4, name: "Answer Writing (3+)", status: false, deliverable: "" },
      { level: 5, name: "R1 + R2 Revision", status: false, deliverable: "" },
      { level: 6, name: "Mains-Ready", status: false, deliverable: "" },
    ],
  },
  {
    id: "k4",
    topic: "Marx — Thinker",
    paper: "Sociology P1",
    targetDateL6: "2026-10-20",
    levels: [
      { level: 0, name: "Source Reading", status: true, deliverable: "Upendra Singh + Ignou material" },
      { level: 1, name: "Level-1 Notes", status: true, deliverable: "Historical materialism, base-superstructure, alienation" },
      { level: 2, name: "Value Add (thinkers/data)", status: true, deliverable: "Added critiques — Durkheim on Marx; Indian Marxists (A.R. Desai)" },
      { level: 3, name: "PYQ Mapping", status: true, deliverable: "4 PYQs mapped" },
      { level: 4, name: "Answer Writing (3+)", status: true, deliverable: "2 answers evaluated, need 1 more" },
      { level: 5, name: "R1 + R2 Revision", status: false, deliverable: "R1 done 20 Sep; R2 pending" },
      { level: 6, name: "Mains-Ready", status: false, deliverable: "" },
    ],
  },
  {
    id: "k5",
    topic: "Modern History — Revolt of 1857",
    paper: "GS1",
    targetDateL6: "2026-09-15",
    levels: [
      { level: 0, name: "Source Reading", status: true, deliverable: "Spectrum + Bipan Chandra" },
      { level: 1, name: "Level-1 Notes", status: true, deliverable: "Causes, events, leaders, aftermath" },
      { level: 2, name: "Value Add (thinkers/data)", status: true, deliverable: "Added: Eric Stokes, Sekhar Bandyopadhyay perspectives" },
      { level: 3, name: "PYQ Mapping", status: true, deliverable: "3 PYQs mapped" },
      { level: 4, name: "Answer Writing (3+)", status: true, deliverable: "3 evaluated, avg 9/15" },
      { level: 5, name: "R1 + R2 Revision", status: true, deliverable: "R1 + R2 done; recall 90%" },
      { level: 6, name: "Mains-Ready", status: true, deliverable: "Mentor certified Mains-ready" },
    ],
  },
];

// =============== Study Day Log seed (for analytics, last 30 days) ===============
export const seedStudyLogs: StudyDayLog[] = (() => {
  const logs: StudyDayLog[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    // Simulated data: 7-day pattern with some variability
    const dow = d.getDay();
    let hours = 0;
    if (dow === 0) {
      hours = 4.5; // Sunday — test day
    } else if (dow === 6) {
      hours = 7;
    } else {
      // simulate some fatigue mid-week
      const cycle = (i + dow) % 7;
      hours = cycle < 5 ? 8.2 : cycle < 6 ? 6.5 : 4;
    }
    // Sprinkle 2 low days to trigger burnout guard
    if (i === 5 || i === 12) hours = 5;
    const completion = Math.min(100, Math.round((hours / 8) * 100));
    logs.push({ date: iso, hours, completionPct: completion });
  }
  return logs;
})();

// =============== AI Mentor seed (initial system message + a sample session) ===============
export const seedMentorSessions: ChatMessage[] = [
  {
    id: "m0",
    role: "assistant",
    content:
      "**Welcome to your AI UPSC Mentor.**\n\nEach evening, share a 3-5 line input:\n- tasks completed / skipped\n- hours studied\n- energy (1-10)\n- one specific doubt or blocker\n\nI'll respond with assessment, what's tight, what's loose, and an adjusted plan for tomorrow. Let's keep this disciplined.",
    timestamp: Date.now() - 86400000,
    sessionLabel: "Onboarding",
  },
];
