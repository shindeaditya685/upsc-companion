// =============== Personalized Strategy Constants ===============
// Reflects user's preferences from the blueprint conversation:
// - 6-month sprint (Jul-Dec 2026)
// - Weak-first sequencing (GS1 + GS2 weak)
// - Sociology both papers (aspirant comfortable)
// - 8-9 hrs/day, 6 days/week
// - Agriculture as must-cover worked example

import type { UserProfile, Principle, DecisionRule, PhaseInfo, PipelineStep } from "./types";

export const USER_PROFILE: UserProfile = {
  examDate: "2026-12-05",
  sprintStart: "2026-07-01",
  sprintWeeks: 26,
  dailyHoursTarget: 8.5,
  weeklyHoursTarget: 54.5,
  optional: "Sociology",
  weakPapers: ["GS1", "GS2"],
  comfortablePapers: ["Sociology"],
  sequencingApproach: "weak-first (GS1 → GS2 → GS3 → GS4)",
  mustCoverTopics: ["Agriculture (full Level 0-6 worked example pre-loaded)"],
  focusOptionalPct: 25,
};

// =============== Six Core Principles (mentor philosophy) ===============
export const PRINCIPLES: Principle[] = [
  {
    id: 1,
    principle: "No bulky books cover-to-cover",
    why: "Reading 600-page textbooks steals time from PYQ-led revision and answer writing.",
    weeklyTouchpoint: "Audit reading list weekly",
  },
  {
    id: 2,
    principle: "One GS subject per week",
    why: "Sprint cadence prevents procrastination and forces theme-wise completion.",
    weeklyTouchpoint: "Sectional test every Sunday",
  },
  {
    id: 3,
    principle: "PYQ analysis opens every subject",
    why: "Last 5 years of UPSC Mains PYQs reveal the recurring themes UPSC actually tests.",
    weeklyTouchpoint: "Day 1 of every new subject",
  },
  {
    id: 4,
    principle: "2 days current-affairs integration",
    why: "CA prevents siloed knowledge and supplies live examples, data, and committee findings.",
    weeklyTouchpoint: "Days 6-7 of every week",
  },
  {
    id: 5,
    principle: "GS + Sociology balance",
    why: "Optional carries 500 marks — neglecting it for GS is a guaranteed rank-killer.",
    weeklyTouchpoint: "Daily 25% time to Optional",
  },
  {
    id: 6,
    principle: "Revision + answer writing non-negotiable",
    why: "Notes unread three times = notes effectively unwritten. Writing exposes gaps reading hides.",
    weeklyTouchpoint: "R1 within 7 days, R2 within 21, R3 within 45",
  },
];

// =============== Three-Phase Architecture ===============
export const PHASES: PhaseInfo[] = [
  {
    phase: "Phase 1 — Foundation",
    weeks: "Weeks 1-8 (8 weeks)",
    calendar: "1 Jul – 31 Aug 2026",
    focus:
      "GS1 weak areas (Modern History, Art & Culture, Society, Geography) + GS2 weak areas (Polity, Governance, Social Justice, IR) + Sociology Paper 1 bootstrapping. Build Level-1 notes for all GS1+GS2 themes.",
    deliverable:
      "8 sectional tests · Sociology Paper 1 syllabus covered · R1 of all notes done",
  },
  {
    phase: "Phase 2 — Consolidation",
    weeks: "Weeks 9-18 (10 weeks)",
    calendar: "1 Sep – 9 Nov 2026",
    focus:
      "GS3 (Economy, Agriculture, S&T, Environment, Security, Disaster Mgmt) + GS4 (Ethics incl. case studies) + Sociology Paper 2. Begin full-length GS papers (1 per fortnight) and Essay practice.",
    deliverable:
      "10 sectional tests · 2 full GS mocks · 2 essays · 2 optional mocks · R2 of Phase 1 notes done",
  },
  {
    phase: "Phase 3 — Simulation",
    weeks: "Weeks 19-26 (8 weeks)",
    calendar: "10 Nov – 14 Dec 2026",
    focus:
      "Full mock cycles (1 GS paper set per week + 1 essay + 1 optional paper). No new content after Week 23. Final 2 weeks: light revision only, sleep cycle synced to exam hours.",
    deliverable:
      "8 full mocks · 4 essays · 4 optional papers · R3 + R4 of all notes · Mains-ready by 14 Dec",
  },
];

// =============== 6 AI Mentor Decision Rules ===============
export const DECISION_RULES: DecisionRule[] = [
  {
    id: 1,
    rule: "Protect revision windows",
    trigger: "Any revision slot (R1/R2/R3) is within 48 hrs of due date",
    action: "Never move a revision slot for new content. If new content conflicts, the new content is postponed.",
  },
  {
    id: 2,
    rule: "Prevent over-planning",
    trigger: "Daily planned hours > 9 OR > 5 tasks queued",
    action: "Auto-prune lowest-priority task. Notify aspirant with reason.",
  },
  {
    id: 3,
    rule: "Balance GS + Optional",
    trigger: "Cumulative Optional hours this week < 25% of total",
    action: "Block 90 min for Optional tomorrow before any GS task.",
  },
  {
    id: 4,
    rule: "Adapt to slippage",
    trigger: "Task pending > 2 days past due",
    action: "Drop 1 lower-priority task this week to absorb slippage. Reschedule pending task in next 2 days.",
  },
  {
    id: 5,
    rule: "High-yield priority",
    trigger: "Choice between 2 themes of equal length",
    action: "Pick the theme with higher PYQ frequency in last 5 years.",
  },
  {
    id: 6,
    rule: "Burnout guard",
    trigger: "Aspirant reports fatigue OR 3 consecutive <6hr days",
    action: "Halve tomorrow's load. Insert a revision-only day within 48 hrs.",
  },
];

// =============== 9-Step Note-Making Pipeline ===============
export const PIPELINE_STEPS: PipelineStep[] = [
  {
    step: 1,
    action: "Syllabus",
    deliverable: "Print UPSC syllabus for the paper; mark every micro-topic.",
    commonMistake: "Skipping this — leads to theme-blind reading.",
  },
  {
    step: 2,
    action: "PYQ Analysis",
    deliverable: "List last 5-year questions; cluster into recurring themes.",
    commonMistake: "Reading PYQs without clustering — no pattern emerges.",
  },
  {
    step: 3,
    action: "Theme Identification",
    deliverable: "Rank themes by PYQ frequency; tag high-yield ones.",
    commonMistake: "Treating all themes equally — wastes time on low-yield ones.",
  },
  {
    step: 4,
    action: "Study Material (Shunya IAS)",
    deliverable: "Read the relevant theme portion only — not the whole book.",
    commonMistake: 'Reading cover-to-cover "for completeness".',
  },
  {
    step: 5,
    action: "Compress",
    deliverable: "Convert 5 pages of source into 1 page of notes — your words.",
    commonMistake: "Copying verbatim — passive, not retained.",
  },
  {
    step: 6,
    action: "Enrich",
    deliverable: "Add data, reports, committees, schemes, examples, CA, diagrams.",
    commonMistake: 'Skipping enrichment — notes lack "answer weapons".',
  },
  {
    step: 7,
    action: "Revision",
    deliverable: "R1 within 7 days, R2 within 21, R3 within 45, R4 within 90.",
    commonMistake: "No revision schedule — notes go stale.",
  },
  {
    step: 8,
    action: "Answer Writing",
    deliverable: "Write 2-3 answers per theme using the notes.",
    commonMistake: "Reading notes without writing — fake mastery.",
  },
  {
    step: 9,
    action: "Continuous Improvement",
    deliverable: "Update notes after every test with feedback received.",
    commonMistake: "Treating notes as frozen — they should evolve.",
  },
];

// =============== Day 1 Starter Plan (1 July 2026, Wednesday) ===============
// The exact first day the aspirant should execute
export const DAY_1_PLAN = {
  date: "2026-07-01",
  dayOfWeek: "Wednesday",
  weekNumber: 1,
  gsSubject: "GS1 — Modern History (1757-1947)",
  optionalTopic: "Sociology P1 — Unit 1: Sociology as a Discipline",
  pyqFocus: "Last 5 years of GS1 Modern History PYQs (2019-2023)",
  tasks: [
    { time: "06:30-07:00", task: "Setup: Print this strategy doc + Daily Planner template + Weekly Planner template. Pin to wall.", duration: "30 min" },
    { time: "07:00-08:30", task: "PYQ Analysis: Open last 5 years of GS1 Mains papers. Extract every Modern History question. List verbatim with year + marks.", duration: "90 min" },
    { time: "08:30-09:00", task: "Theme Clustering: Group PYQs into recurring themes (1857 revolt, Gandhian phase, Congress formation, partition, etc.). Rank by frequency.", duration: "30 min" },
    { time: "09:30-11:00", task: "Optional: Sociology P1 Unit 1 — Read Shunya IAS Sociology material on 'Sociology as a Discipline'. Compress into 2-page Level-1 notes.", duration: "90 min" },
    { time: "11:30-13:00", task: "Theme 1 (highest PYQ frequency): Modern History — Revolt of 1857. Read Spectrum + Bipan Chandra relevant chapter. Compress into 1-page Level-1 notes.", duration: "90 min" },
    { time: "14:00-15:30", task: "Theme 2: Modern History — Indian National Congress formation (1885) and early phase. Read + compress.", duration: "90 min" },
    { time: "16:00-17:00", task: "Enrichment: Add to today's notes — Eric Stokes perspective on 1857, Sekhar Bandyopadhyay, recent CA on 1857 anniversary discussions.", duration: "60 min" },
    { time: "18:00-19:00", task: "Optional value addition: Sociology P1 U1 — Add quotes from Auguste Comte, Emile Durkheim on sociology's scope. Add Indian context (G.S. Ghurye, D.P. Mukerji).", duration: "60 min" },
    { time: "20:00-20:30", task: "Newspaper scan: The Hindu + Indian Express — focus on Modern History references, sovereignty, freedom fighter commemorations.", duration: "30 min" },
    { time: "21:00-21:15", task: "AI Mentor review: Open AI Mentor view, paste today's input. Set up tomorrow's plan based on response.", duration: "15 min" },
  ],
  totalHours: 8.5,
  nonNegotiables: [
    "R1 revision of today's notes scheduled for 8 July (7-day rule)",
    "Sunday sectional test on Modern History (Week 1 wrap-up)",
    "Daily Planner view in app — fill in task completion as you go",
    "Tonight: send your first AI Mentor input at 9 PM",
  ],
};

// =============== Weekly Hour Allocation (8-9 hrs/day) ===============
export const WEEKLY_HOURS = [
  { block: "GS study (theme-wise reading + notes)", hoursPerDay: 3.5, percent: 42, weeklyHours: 21, notes: "Core sprint work" },
  { block: "Sociology Optional", hoursPerDay: 2.0, percent: 24, weeklyHours: 12, notes: "Daily — never skip" },
  { block: "Answer writing practice", hoursPerDay: 1.0, percent: 12, weeklyHours: 6, notes: "1 question/day, full eval" },
  { block: "Revision (R1/R2/R3 slots)", hoursPerDay: 1.0, percent: 12, weeklyHours: 6, notes: "Morning block preferred" },
  { block: "Current affairs (newspaper + magazine)", hoursPerDay: 0.75, percent: 9, weeklyHours: 4.5, notes: "Compressed on weekdays" },
  { block: "Sectional test (Sun AM)", hoursPerDay: 0, percent: 0, weeklyHours: 3.5, notes: "Weekly test + evaluation" },
  { block: "Mentor review + planning (Sun PM)", hoursPerDay: 0, percent: 0, weeklyHours: 1.5, notes: "Weekly AI session" },
  { block: "Total", hoursPerDay: 8.25, percent: 100, weeklyHours: 54.5, notes: "Sustainable 6-day week" },
];

// =============== Personalized Notes (the WHY behind user's plan) ===============
export const PERSONALIZED_NOTES = [
  {
    title: "Why weak-first sequencing?",
    body: "You flagged GS1 (Modern History, Art & Culture, Society, Geography) and GS2 (Polity, Governance, Social Justice, IR) as your weakest papers. They get the longest runway — full 8 weeks of Phase 1 plus the entire Phase 3 revision cycle. GS1 and GS2 are note-heavy, fact-dense, and demand wide reading — they cannot be crammed in October when you're juggling mocks.",
  },
  {
    title: "Why Sociology runs in parallel, not as a weekend catch-up",
    body: "You're comfortable with Sociology, so the sequencing is steady rather than aggressive — but both papers must be fully covered across 6 months. Even on the heaviest GS days, 2 hours go to Sociology. The 10-day test cycle for Optional alternates with GS sectional tests: GS test on Sunday Week N, Optional test on Sunday Week N+1.",
  },
  {
    title: "Why Agriculture as the worked example?",
    body: "You flagged Agriculture as a must-cover topic. The dashboard comes pre-loaded with a complete Level 0-6 Knowledge Bank worked example for Agriculture (GS3 Week 11) — 5 themes, 5 PYQs, 3 evaluated answers, R1+R2 done. Use this as the template for every other topic you prepare.",
  },
  {
    title: "Why 8-9 hours, not 10-12?",
    body: "Sprint endurance matters more than peak intensity. 8.5 hrs/day × 6 days × 26 weeks = 1,326 hrs. That's enough to cover GS1+GS2+GS3+GS4+Sociology P1+P2 with full revision cycles. Going to 10-12 hrs/day risks burnout by October — Rule 6 (burnout guard) will trigger and force you to halve the load.",
  },
  {
    title: "Why weekly sectional tests are non-negotiable",
    body: "Without weekly tests, your notes become a comfort blanket — they feel complete but break under exam pressure. The Sunday sectional test exposes gaps in your Level-1 notes within 7 days of writing them. If you skip 2 Sundays in a row, the AI mentor will flag this as a Rule 1 violation (revision windows protected).",
  },
  {
    title: "Why the Sunday AI mentor review is the single most important 90 min of your week",
    body: "The Sunday 6 PM mentor review aggregates the week's data — tasks completed, tests taken, weak dimensions surfaced — and recomputes the next week's plan. Miss this twice in a row, and the system drifts. Protect that 90 minutes like you would protect the exam itself.",
  },
];
