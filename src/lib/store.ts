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

  updateWeekPlan: (id: string, patch: Partial<WeekPlan>) => void;

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

  resetAll: () => void;
}

const initialState = {
  activeView: "strategy" as ViewId,
  selectedDate: new Date().toISOString().slice(0, 10),
  selectedWeek: 11,
  selectedMonth: new Date().toISOString().slice(0, 7),
  tasks: [] as Task[],
  sixMonthPlan: [] as WeekPlan[],
  weeklyPlans: [] as WeeklyPlan[],
  monthlyPlans: {} as Record<string, DayPlan[]>,
  gsTracker: [] as GSSubject[],
  sociologyTracker: [] as SociologyUnit[],
  notesTracker: [] as NoteTopic[],
  revisionTracker: [] as RevisionEntry[],
  pyqTracker: [] as PYQ[],
  caTracker: [] as CAItem[],
  testAnalysis: [] as TestEntry[],
  knowledgeBank: [] as KnowledgeTopic[],
  mentorSessions: [] as ChatMessage[],
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
    set((s) => ({ tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)) })),
  removeTask: (id) => set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),

  updateWeekPlan: (id, patch) =>
    set((s) => ({
      sixMonthPlan: s.sixMonthPlan.map((w) => (w.id === id ? { ...w, ...patch } : w)),
    })),

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

  resetAll: () => set({ ...initialState }),
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
