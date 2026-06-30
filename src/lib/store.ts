"use client";

import { create } from "zustand";
import type {
  ViewId,
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

interface AppState {
  activeView: ViewId;
  setActiveView: (v: ViewId) => void;

  selectedDate: string;
  setSelectedDate: (d: string) => void;
  selectedWeek: number;
  setSelectedWeek: (w: number) => void;
  selectedMonth: string;
  setSelectedMonth: (m: string) => void;

  tasks: Task[];
  sixMonthPlan: WeekPlan[];
  weeklyPlans: WeeklyPlan[];
  monthlyPlans: Record<string, DayPlan[]>;
  gsTracker: GSSubject[];
  sociologyTracker: SociologyUnit[];
  notesTracker: NoteTopic[];
  revisionTracker: RevisionEntry[];
  pyqTracker: PYQ[];
  caTracker: CAItem[];
  testAnalysis: TestEntry[];
  knowledgeBank: KnowledgeTopic[];
  mentorSessions: ChatMessage[];
  studyLogs: StudyDayLog[];

  addTask: (task: Task) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  removeTask: (id: string) => void;

  updateWeeklySlot: (weekId: number, dayNum: number, slotKey: "morning" | "afternoon" | "evening", content: string) => void;
  updateWeeklyRevision: (weekId: number, dayNum: number, value: string) => void;

  updateDayPlan: (month: string, date: string, patch: Partial<DayPlan>) => void;

  updateGSSubject: (id: string, patch: Partial<GSSubject>) => void;

  updateSociologyUnit: (id: string, patch: Partial<SociologyUnit>) => void;

  updateNoteTopic: (id: string, patch: Partial<NoteTopic>) => void;
  addNoteTopic: (topic: NoteTopic) => void;

  updateRevisionEntry: (id: string, patch: Partial<RevisionEntry>) => void;
  addRevisionEntry: (entry: RevisionEntry) => void;

  updatePYQ: (id: string, patch: Partial<PYQ>) => void;
  addPYQ: (pyq: PYQ) => void;

  updateCAItem: (id: string, patch: Partial<CAItem>) => void;
  addCAItem: (item: CAItem) => void;

  updateTestEntry: (id: string, patch: Partial<TestEntry>) => void;
  addTestEntry: (entry: TestEntry) => void;

  updateKnowledgeTopic: (id: string, patch: Partial<KnowledgeTopic>) => void;
  addKnowledgeTopic: (topic: KnowledgeTopic) => void;

  addMentorMessage: (msg: ChatMessage) => void;
  clearMentorSessions: () => void;

  updateStudyLog: (date: string, patch: Partial<StudyDayLog>) => void;

}

const seedSixMonthPlan: WeekPlan[] = [
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

const seedGSTracker: GSSubject[] = [
  { id: "g1", paper: "GS1", name: "Modern History", themesTotal: 14, readingDone: 0, notesDone: 0, pyqMapped: 0, answerWriting: 0 },
  { id: "g2", paper: "GS1", name: "Art & Culture", themesTotal: 12, readingDone: 0, notesDone: 0, pyqMapped: 0, answerWriting: 0 },
  { id: "g3", paper: "GS1", name: "Indian Society", themesTotal: 11, readingDone: 0, notesDone: 0, pyqMapped: 0, answerWriting: 0 },
  { id: "g4", paper: "GS1", name: "Geography", themesTotal: 15, readingDone: 0, notesDone: 0, pyqMapped: 0, answerWriting: 0 },
  { id: "g5", paper: "GS2", name: "Polity", themesTotal: 18, readingDone: 0, notesDone: 0, pyqMapped: 0, answerWriting: 0 },
  { id: "g6", paper: "GS2", name: "Governance", themesTotal: 12, readingDone: 0, notesDone: 0, pyqMapped: 0, answerWriting: 0 },
  { id: "g7", paper: "GS2", name: "Social Justice", themesTotal: 10, readingDone: 0, notesDone: 0, pyqMapped: 0, answerWriting: 0 },
  { id: "g8", paper: "GS2", name: "International Relations", themesTotal: 12, readingDone: 0, notesDone: 0, pyqMapped: 0, answerWriting: 0 },
  { id: "g9", paper: "GS3", name: "Indian Economy", themesTotal: 18, readingDone: 0, notesDone: 0, pyqMapped: 0, answerWriting: 0 },
  { id: "g10", paper: "GS3", name: "Agriculture + Land Reforms + Food Security", themesTotal: 12, readingDone: 0, notesDone: 0, pyqMapped: 0, answerWriting: 0 },
  { id: "g11", paper: "GS3", name: "Science & Technology", themesTotal: 12, readingDone: 0, notesDone: 0, pyqMapped: 0, answerWriting: 0 },
  { id: "g12", paper: "GS3", name: "Environment + Biodiversity + Climate Change", themesTotal: 14, readingDone: 0, notesDone: 0, pyqMapped: 0, answerWriting: 0 },
  { id: "g13", paper: "GS3", name: "Internal Security + Disaster Management", themesTotal: 12, readingDone: 0, notesDone: 0, pyqMapped: 0, answerWriting: 0 },
  { id: "g14", paper: "GS4", name: "Ethics Theory + Thinkers + Attitude + Aptitude", themesTotal: 12, readingDone: 0, notesDone: 0, pyqMapped: 0, answerWriting: 0 },
  { id: "g15", paper: "GS4", name: "Public Admin / Governance Ethics", themesTotal: 8, readingDone: 0, notesDone: 0, pyqMapped: 0, answerWriting: 0 },
  { id: "g16", paper: "GS4", name: "Case Studies", themesTotal: 10, readingDone: 0, notesDone: 0, pyqMapped: 0, answerWriting: 0 },
];

const seedSociologyTracker: SociologyUnit[] = [
  { id: "s1", paper: "P1", unitNumber: 1, unitName: "Sociology — The Discipline", notesDone: false, valueAdd: false, answerWritingCount: 0, r1Done: false, r2Done: false, testDone: false },
  { id: "s2", paper: "P1", unitNumber: 2, unitName: "Sociological Thinkers (Marx, Durkheim, Weber, Parsons)", notesDone: false, valueAdd: false, answerWritingCount: 0, r1Done: false, r2Done: false, testDone: false },
  { id: "s3", paper: "P1", unitNumber: 3, unitName: "Research Methods and Analysis", notesDone: false, valueAdd: false, answerWritingCount: 0, r1Done: false, r2Done: false, testDone: false },
  { id: "s4", paper: "P1", unitNumber: 4, unitName: "Sociology — Stratification", notesDone: false, valueAdd: false, answerWritingCount: 0, r1Done: false, r2Done: false, testDone: false },
  { id: "s5", paper: "P1", unitNumber: 5, unitName: "Works and Economic Life", notesDone: false, valueAdd: false, answerWritingCount: 0, r1Done: false, r2Done: false, testDone: false },
  { id: "s6", paper: "P1", unitNumber: 6, unitName: "Family, Kinship and Marriage", notesDone: false, valueAdd: false, answerWritingCount: 0, r1Done: false, r2Done: false, testDone: false },
  { id: "s7", paper: "P1", unitNumber: 7, unitName: "Religion", notesDone: false, valueAdd: false, answerWritingCount: 0, r1Done: false, r2Done: false, testDone: false },
  { id: "s8", paper: "P1", unitNumber: 8, unitName: "Politics and Society", notesDone: false, valueAdd: false, answerWritingCount: 0, r1Done: false, r2Done: false, testDone: false },
  { id: "s9", paper: "P1", unitNumber: 9, unitName: "Education", notesDone: false, valueAdd: false, answerWritingCount: 0, r1Done: false, r2Done: false, testDone: false },
  { id: "s10", paper: "P1", unitNumber: 10, unitName: "Science, Technology & Society", notesDone: false, valueAdd: false, answerWritingCount: 0, r1Done: false, r2Done: false, testDone: false },
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

const L0_L6_DEFAULT = [
  { level: 0, name: "Source Reading", status: false, deliverable: "" },
  { level: 1, name: "Level-1 Notes", status: false, deliverable: "" },
  { level: 2, name: "Value Add (thinkers/data)", status: false, deliverable: "" },
  { level: 3, name: "PYQ Mapping", status: false, deliverable: "" },
  { level: 4, name: "Answer Writing (3+)", status: false, deliverable: "" },
  { level: 5, name: "R1 + R2 Revision", status: false, deliverable: "" },
  { level: 6, name: "Mains-Ready", status: false, deliverable: "" },
];

const seedKnowledgeBank: KnowledgeTopic[] = [
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
    levels: L0_L6_DEFAULT.map((l) => ({ ...l })),
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

const seedMentorSessions: ChatMessage[] = [
  {
    id: "m0",
    role: "assistant",
    content:
      "**Welcome to your AI UPSC Mentor.**\n\nEach evening, share a 3-5 line input:\n- tasks completed / skipped\n- hours studied\n- energy (1-10)\n- one specific doubt or blocker\n\nI'll respond with assessment, what's tight, what's loose, and an adjusted plan for tomorrow. Let's keep this disciplined.",
    timestamp: Date.now() - 86400000,
    sessionLabel: "Onboarding",
  },
];

const initialState = {
  activeView: "strategy" as ViewId,
  selectedDate: new Date().toISOString().slice(0, 10),
  selectedWeek: 11,
  selectedMonth: new Date().toISOString().slice(0, 7),
  tasks: [] as Task[],
  sixMonthPlan: seedSixMonthPlan,
  weeklyPlans: [] as WeeklyPlan[],
  monthlyPlans: {} as Record<string, DayPlan[]>,
  gsTracker: seedGSTracker,
  sociologyTracker: seedSociologyTracker,
  notesTracker: [] as NoteTopic[],
  revisionTracker: [] as RevisionEntry[],
  pyqTracker: [] as PYQ[],
  caTracker: [] as CAItem[],
  testAnalysis: [] as TestEntry[],
  knowledgeBank: seedKnowledgeBank,
  mentorSessions: seedMentorSessions,
  studyLogs: [] as StudyDayLog[],
};

export const useAppStore = create<AppState>()((set) => ({
  ...initialState,
  setActiveView: (v) => set({ activeView: v }),
  setSelectedDate: (d) => set({ selectedDate: d }),
  setSelectedWeek: (w) => set({ selectedWeek: w }),
  setSelectedMonth: (m) => set({ selectedMonth: m }),

  addTask: (task) => set((s) => ({ tasks: [...s.tasks, task] })),
  updateTask: (id, patch) =>
    set((s) => {
      const updatedTasks = s.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t));
      const affected = s.tasks.find((t) => t.id === id);
      if (affected && "completed" in patch) {
        const date = affected.date;
        const done = updatedTasks.filter((t) => t.date === date);
        const completedHours = done.filter((t) => t.completed).reduce((sum, t) => sum + parseHoursFromSlot(t.timeSlot), 0);
        const completionPct = done.length > 0 ? Math.round((done.filter((t) => t.completed).length / done.length) * 100) : 0;
        const existing = s.studyLogs.find((l) => l.date === date);
        if (existing) {
          return {
            tasks: updatedTasks,
            studyLogs: s.studyLogs.map((l) =>
              l.date === date ? { ...l, hours: completedHours, completionPct } : l
            ),
          };
        }
        return {
          tasks: updatedTasks,
          studyLogs: [...s.studyLogs, { date, hours: completedHours, completionPct }],
        };
      }
      return { tasks: updatedTasks };
    }),
  removeTask: (id) => set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),

  updateWeeklySlot: (weekId, dayNum, slotKey, content) =>
    set((s) => ({
      weeklyPlans: s.weeklyPlans.map((wp) =>
        wp.weekId !== weekId
          ? wp
          : {
              ...wp,
              days: wp.days.map((d) =>
                d.dayNumber !== dayNum
                  ? d
                  : { ...d, slots: { ...d.slots, [slotKey]: { ...d.slots[slotKey], content } } }
              ),
            }
      ),
    })),
  updateWeeklyRevision: (weekId, dayNum, value) =>
    set((s) => ({
      weeklyPlans: s.weeklyPlans.map((wp) =>
        wp.weekId !== weekId
          ? wp
          : { ...wp, days: wp.days.map((d) => (d.dayNumber !== dayNum ? d : { ...d, revisionReminder: value })) }
      ),
    })),

  updateDayPlan: (month, date, patch) =>
    set((s) => {
      const days = s.monthlyPlans[month] || [];
      const existing = days.find((d) => d.date === date);
      let nextDays: DayPlan[];
      if (existing) {
        nextDays = days.map((d) => (d.date === date ? { ...d, ...patch } : d));
      } else {
        nextDays = [...days, { date, ...patch }];
      }
      return { monthlyPlans: { ...s.monthlyPlans, [month]: nextDays } };
    }),

  updateGSSubject: (id, patch) =>
    set((s) => ({
      gsTracker: s.gsTracker.map((g) => (g.id === id ? { ...g, ...patch } : g)),
    })),

  updateSociologyUnit: (id, patch) =>
    set((s) => ({
      sociologyTracker: s.sociologyTracker.map((u) => (u.id === id ? { ...u, ...patch } : u)),
    })),

  updateNoteTopic: (id, patch) =>
    set((s) => ({
      notesTracker: s.notesTracker.map((n) => (n.id === id ? { ...n, ...patch } : n)),
    })),
  addNoteTopic: (topic) => set((s) => ({ notesTracker: [...s.notesTracker, topic] })),

  updateRevisionEntry: (id, patch) =>
    set((s) => ({
      revisionTracker: s.revisionTracker.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    })),
  addRevisionEntry: (entry) =>
    set((s) => ({ revisionTracker: [...s.revisionTracker, entry] })),

  updatePYQ: (id, patch) =>
    set((s) => ({
      pyqTracker: s.pyqTracker.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    })),
  addPYQ: (pyq) => set((s) => ({ pyqTracker: [...s.pyqTracker, pyq] })),

  updateCAItem: (id, patch) =>
    set((s) => ({
      caTracker: s.caTracker.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    })),
  addCAItem: (item) => set((s) => ({ caTracker: [...s.caTracker, item] })),

  updateTestEntry: (id, patch) =>
    set((s) => ({
      testAnalysis: s.testAnalysis.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    })),
  addTestEntry: (entry) => set((s) => ({ testAnalysis: [...s.testAnalysis, entry] })),

  updateKnowledgeTopic: (id, patch) =>
    set((s) => ({
      knowledgeBank: s.knowledgeBank.map((k) => (k.id === id ? { ...k, ...patch } : k)),
    })),
  addKnowledgeTopic: (topic) => set((s) => ({ knowledgeBank: [...s.knowledgeBank, topic] })),

  addMentorMessage: (msg) => set((s) => ({ mentorSessions: [...s.mentorSessions, msg] })),
  clearMentorSessions: () => set({ mentorSessions: [] }),

  updateStudyLog: (date, patch) =>
    set((s) => {
      const existing = s.studyLogs.find((l) => l.date === date);
      if (existing) {
        return {
          studyLogs: s.studyLogs.map((l) => (l.date === date ? { ...l, ...patch } : l)),
        };
      }
      return { studyLogs: [...s.studyLogs, { date, hours: 0, completionPct: 0, ...patch }] };
    }),

}));

// ============= Derived / helper functions =============
export function computeGSMaturity(g: GSSubject): number {
  const denom = g.themesTotal * 4;
  if (denom === 0) return 0;
  const total = g.readingDone + g.notesDone + g.pyqMapped + g.answerWriting;
  return Math.round((total / denom) * 100);
}

export function computeSociologyMaturity(u: SociologyUnit): number {
  // 6 binary indicators + answerWritingCount scaled to 6
  const binary = [u.notesDone, u.valueAdd, u.r1Done, u.r2Done, u.testDone].filter(Boolean).length;
  const awScore = Math.min(u.answerWritingCount, 3); // cap at 3
  return Math.round(((binary + awScore) / 8) * 100);
}

export function isNoteTopicMastered(n: NoteTopic): boolean {
  return (
    n.read &&
    n.notes &&
    n.data &&
    n.reports &&
    n.committees &&
    n.cases &&
    n.diagram &&
    n.ca &&
    n.r1 &&
    n.r2 &&
    n.awCount >= 3
  );
}

export function computeKnowledgeLevel(levels: { status: boolean }[]): number {
  // highest level that is true (L0..L6). If none true → 0
  let max = 0;
  for (let i = 0; i < levels.length; i++) {
    if (levels[i].status) max = i;
  }
  return max;
}

export function addDays(iso: string, days: number): string {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function isOverdue(iso: string): boolean {
  const today = new Date().toISOString().slice(0, 10);
  return iso < today;
}

// Parse a "HH:MM-HH:MM" slot into hours (decimal)
export function parseHoursFromSlot(slot: string): number {
  const m = slot.match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/);
  if (!m) return 0;
  const sh = parseInt(m[1], 10), sm = parseInt(m[2], 10);
  const eh = parseInt(m[3], 10), em = parseInt(m[4], 10);
  let mins = (eh * 60 + em) - (sh * 60 + sm);
  if (mins < 0) mins += 24 * 60;
  return Math.round((mins / 60) * 10) / 10;
}
