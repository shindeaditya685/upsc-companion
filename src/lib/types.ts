// =============== Core types for the UPSC Mains Sprint AI Mentor System ===============

export type ViewId =
  | "strategy"
  | "dashboard"
  | "six-month"
  | "monthly"
  | "weekly"
  | "daily"
  | "gs-tracker"
  | "sociology-tracker"
  | "notes-tracker"
  | "revision-tracker"
  | "pyq-tracker"
  | "ca-tracker"
  | "test-analysis"
  | "ai-mentor"
  | "analytics"
  | "knowledge-bank";

export type Phase = "Phase 1" | "Phase 2" | "Phase 3" | "Buffer";

// =============== Six-Month Planner ===============
export interface WeekPlan {
  id: string;
  weekNumber: number; // 1-21 (with buffers as fractional)
  label: string; // "Week 1" or "BUFFER"
  dates: string;
  phase: Phase;
  gsFocus: string;
  optionalTopic: string;
  notes?: string;
}

// =============== Monthly Planner ===============
export interface DayPlan {
  date: string; // ISO date
  gsFocus?: string;
  optionalTopic?: string;
  revisionDue?: boolean;
  hasTest?: boolean;
  notes?: string;
}

// =============== Weekly Planner ===============
export type SlotKey = "morning" | "afternoon" | "evening";
export interface WeeklyDaySlot {
  label: string; // e.g. "Morning (3 hr)"
  content: string;
}
export interface WeeklyDay {
  dayName: string; // Mon, Tue, ...
  dayNumber: number; // 1-7
  slots: Record<SlotKey, WeeklyDaySlot>;
  revisionReminder?: string;
}
export interface WeeklyPlan {
  weekId: number; // matches WeekPlan.weekNumber
  days: WeeklyDay[]; // 7 entries
}

// =============== Daily Planner ===============
export type Priority = "P1" | "P2" | "P3";
export interface Task {
  id: string;
  date: string; // ISO date
  timeSlot: string;
  description: string;
  priority: Priority;
  difficulty: number; // 1-5
  completed: boolean;
  learningOutcome: string;
  revisionDate?: string; // ISO date for revision reminder
  hours?: number; // computed from timeSlot
}

// =============== GS Tracker ===============
export interface GSSubject {
  id: string;
  paper: "GS1" | "GS2" | "GS3" | "GS4";
  name: string;
  themesTotal: number;
  readingDone: number;
  notesDone: number;
  pyqMapped: number;
  answerWriting: number;
  // maturity is computed: (reading + notes + pyq + answerWriting) / (themesTotal*4) * 100
}

// =============== Sociology Tracker ===============
export interface SociologyUnit {
  id: string;
  paper: "P1" | "P2";
  unitNumber: number;
  unitName: string;
  notesDone: boolean;
  valueAdd: boolean;
  answerWritingCount: number;
  r1Done: boolean;
  r2Done: boolean;
  testDone: boolean;
}

// =============== Notes Tracker ===============
export interface NoteTopic {
  id: string;
  topic: string;
  read: boolean;
  notes: boolean;
  data: boolean;
  reports: boolean;
  committees: boolean;
  cases: boolean;
  diagram: boolean;
  ca: boolean;
  r1: boolean;
  r2: boolean;
  awCount: number;
  mastered: boolean; // auto-computed when all 12 done
}

// =============== Revision Tracker ===============
export interface RevisionEntry {
  id: string;
  topic: string;
  noteDate: string; // ISO date
  // computed: r1Due = noteDate + 7d, r2Due = +21d, r3Due = +45d, r4Due = +90d
  r1Done: boolean;
  r2Done: boolean;
  r3Done: boolean;
  r4Done: boolean;
}

// =============== PYQ Tracker ===============
export interface PYQ {
  id: string;
  year: number;
  paper: string;
  question: string;
  theme: string;
  marks: number;
  attempted: boolean;
  evaluated: boolean;
  inMistakeBook: boolean;
}

// =============== Current Affairs Tracker ===============
export interface CAItem {
  id: string;
  source: string;
  date: string; // ISO date
  headline: string;
  primaryTheme: string;
  integratedInto: string; // topic name or "— pending"
}

// =============== Test Analysis ===============
export interface TestEntry {
  id: string;
  date: string;
  subject: string;
  type: string; // Sectional / Full mock
  score: number; // out of 100 or marks
  weakDimensions: string[]; // tags
  // 7-dimension scoring (each 1-5)
  dimensions: {
    weakDimensions: number;
    weakContent: number;
    poorIntros: number;
    poorConclusions: number;
    lackOfData: number;
    multiDimensional: number;
    timeManagement: number;
  };
  diagnosis: {
    weakDimensions: string;
    weakContent: string;
    poorIntros: string;
    poorConclusions: string;
    lackOfData: string;
    multiDimensional: string;
    timeManagement: string;
  };
  correctiveActions: string[];
}

// =============== Knowledge Bank ===============
export interface LevelDeliverable {
  level: number; // 0-6
  name: string;
  status: boolean; // is complete
  deliverable: string; // what was produced
}

export interface KnowledgeTopic {
  id: string;
  topic: string;
  paper: "GS1" | "GS2" | "GS3" | "GS4" | "Sociology P1" | "Sociology P2";
  levels: LevelDeliverable[]; // 7 entries for L0..L6
  targetDateL6?: string; // ISO date
}

// =============== AI Mentor ===============
export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
  sessionLabel?: string; // e.g. "Good day summary"
}

// =============== Study log (for analytics) ===============
export interface StudyDayLog {
  date: string; // ISO date
  hours: number;
  completionPct: number; // 0-100
}

// =============== User Profile & Strategy (personalized per aspirant) ===============
export interface UserProfile {
  examDate: string; // 2026-12-XX (Mains start)
  sprintStart: string; // 2026-07-01
  sprintWeeks: number; // 26
  dailyHoursTarget: number; // 8.5
  weeklyHoursTarget: number; // 54.5
  optional: string; // "Sociology"
  weakPapers: string[]; // ["GS1", "GS2"]
  comfortablePapers: string[]; // ["Sociology"]
  sequencingApproach: string; // "weak-first"
  mustCoverTopics: string[]; // ["Agriculture"]
  focusOptionalPct: number; // 25
}

// =============== Strategy Constants (mentor philosophy) ===============
export interface Principle {
  id: number;
  principle: string;
  why: string;
  weeklyTouchpoint: string;
}

export interface DecisionRule {
  id: number;
  rule: string;
  trigger: string;
  action: string;
}

export interface PhaseInfo {
  phase: string;
  weeks: string;
  calendar: string;
  focus: string;
  deliverable: string;
}

export interface PipelineStep {
  step: number;
  action: string;
  deliverable: string;
  commonMistake: string;
}
