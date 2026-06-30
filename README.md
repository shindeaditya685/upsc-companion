# UPSC Mains Sprint Dashboard — AI Mentor System v1.0

A comprehensive Next.js 16 single-page web app for UPSC CSE Mains December 2026 preparation, with a personalized 6-month sprint plan, 16 fully-functional views, and a pre-loaded AI mentor conversation history.

## Personalized For This Aspirant

Based on the user's preferences:
- **Timeline**: 6-month sprint (Jul-Dec 2026)
- **Optional**: Sociology (both papers full)
- **Weak subjects**: GS1 + GS2 (sequenced first per weak-first approach)
- **Daily hours**: 8-9 hrs/day, 6 days/week
- **Must-cover worked example**: Agriculture (Level 0-6 pre-loaded in Knowledge Bank)

The dashboard opens to a **"My Strategy" view** showing:
- Personalized profile (weak-first sequencing, Sociology focus, Agriculture must-cover)
- Day 1 starter plan for Wednesday 1 July 2026 (10 timed tasks, 8.5 hrs total)
- 3-phase architecture (Foundation / Consolidation / Simulation)
- 6 mentor principles
- 9-step Level-1 note-making pipeline
- 6 AI mentor decision rules (priority order, Rule 1 always wins)
- Weekly hour allocation table
- "Why this plan works for you" — 6 personalized rationale notes

## Tech Stack
- Next.js 16 (App Router, Turbopack) + TypeScript 5
- Tailwind CSS 4 with shadcn/ui (New York style)
- Zustand with persist middleware (localStorage — no DB needed)
- z-ai-web-dev-sdk via /api/mentor backend route for AI mentor chat
- Recharts via shadcn chart component for analytics
- Lucide icons

## Quick Start

```bash
bun install   # or: npm install
bun run dev   # or: npm run dev
# Open http://localhost:3000
```

## 16 Views

**Overview**
1. **My Strategy** — Personalized landing view with profile, Day 1 starter plan, 3-phase architecture, 6 principles, 9-step pipeline, 6 decision rules, weekly hours, "why this works"
2. **Dashboard** — Today's command center: stat cards, today's plan preview, 7-day study hours chart

**Planners**
3. **Six-Month Planner** — 26-week calendar (Jul-Dec 2026), color-coded by Phase 1/2/3
4. **Monthly Planner** — Calendar grid with editable day cells
5. **Weekly Planner** — 7-day × 3-slot template (PYQ → Themes → CA → Test)
6. **Daily Planner** — 8 pre-populated task cards for Week 11 Day 3 (Agriculture week)

**Subject Trackers**
7. **GS Tracker** — 16 subjects across GS1/GS2/GS3/GS4, maturity % with red highlight for <60%
8. **Sociology Tracker** — Paper 1 (10 units) + Paper 2 (10 units), full syllabus
9. **Notes Tracker** — 20 topics across all papers, 13-column per-topic checklist

**Practice Trackers**
10. **Revision Tracker** — 20+ entries with auto-calculated R1/R2/R3/R4 due dates, OVERDUE flagging
11. **PYQ Tracker** — 50+ PYQs across all subjects (GS1 History/Art&Culture/Society/Geo, GS2 Polity/Gov/SJ/IR, GS3 Economy/Agriculture/S&T/Env/Security/DM, GS4 Ethics/Cases, Sociology P1+P2, Essay)
12. **Current Affairs Tracker** — 18+ CA items across Agriculture, Federalism, Polity, IR, Environment, Economy, Sociology themes

**AI · Analysis · Bank**
13. **Test Analysis** — 5 test entries (GS1 Modern History, GS2 Polity, GS3 Agriculture, Full Mock 1, Sociology P1) with 7-dimension scoring + radar chart
14. **AI Mentor** — Chat interface calling /api/mentor; pre-loaded with 4 realistic mentor exchanges (Day 1, Bad day, Weekly review); system prompt encodes 6 decision rules
15. **Analytics** — 5 read-only charts (heatmap, completion trend, revision gap, weak-subject radar, KB distribution)
16. **Knowledge Bank** — 18 topics at various levels (L0-L6) across all GS + Sociology, with Agriculture at L6 (Mains-Ready) as the worked example

## Pre-Loaded Seed Data (Built For The Aspirant)

### PYQs (50+)
- Agriculture (6) — full cluster
- GS1 Modern History (6), Art & Culture (4), Indian Society (5), Geography (4)
- GS2 Polity (5), Governance (4), Social Justice (4), IR (4)
- GS3 Economy (5), S&T (4), Environment (4), Security (3), Disaster Mgmt (3)
- GS4 Ethics (4), Case Studies (2)
- Sociology P1 (4), P2 (4)
- Essay (2)

### Knowledge Bank (18 topics)
- Agriculture MSP (L6 — Mains-Ready, full worked example)
- Modern History 1857 Revolt (L6 — Mains-Ready)
- Modern History Gandhi Phase (L4)
- Art & Culture Bhakti/Sufi (L3)
- Geography Tropical Cyclones (L3)
- Indian Society Secularism (L3)
- Federalism (L5 — almost ready)
- Governor's Office (L3)
- 73rd & 74th Amendments (L4)
- IR Quad (L3)
- Pressure Groups (L0)
- Agriculture Food Security (L4)
- RBI Monetary Policy (L0)
- Environment EIA (L0)
- Ethics EI (L0)
- Ethics Case Studies (L0)
- Sociology Marx Thinker (L4)
- Sociology P2 Caste (L0)

### Notes Tracker (20 topics)
All major themes pre-loaded with checkbox state showing realistic progress.

### Revision Tracker (20+ entries)
Includes 1 OVERDUE entry (GS2 Federalism, R1 due 21 Aug) to demonstrate the system.

### Test Analysis (5 tests)
- GS1 Modern History sectional (Jul 7, score 72)
- GS2 Polity sectional (Aug 18, score 75)
- GS3 Agriculture sectional (Sep 27, score 78)
- Full Mock 1 (Nov 22, score 68)
- Sociology P1 Optional sectional (Oct 5, score 71)

### AI Mentor Conversation History (4 realistic exchanges)
1. Onboarding message
2. Day 1 input (1 Jul) → mentor response with tomorrow's plan
3. Bad day input → mentor's burnout guard response (Rule 6, no all-nighter)
4. Weekly review (Week 11) → mentor aggregates 7 days + triggers corrective programme

## AI Mentor — 6 Decision Rules (priority order)

1. **Protect revision windows** — Never move a revision slot for new content
2. **Prevent over-planning** — Auto-prune if daily planned hours > 9 or > 5 tasks
3. **Balance GS + Optional** — Block 90 min for Optional if weekly Optional hours < 25%
4. **Adapt to slippage** — Drop 1 lower-priority task to absorb pending > 2 days
5. **High-yield priority** — Prefer themes with higher PYQ frequency
6. **Burnout guard** — Halve tomorrow's load if fatigue reported or 3 consecutive <6hr days

## Visual Style — Mentor Navy + Gold

- Primary deep navy: `#0f2d4a`
- Warm gold accent: `#b8893a`
- Warm cream body: `#fafaf7`
- Serif headings (Playfair Display) + sans-serif body (Geist)

## Data Persistence

All user edits persist to browser localStorage via Zustand's persist middleware. Storage key: `upsc-mentor-store-v2`. The app works fully offline after first load.

If you've used an earlier version (v1), the v2 store migrates automatically — your edits are preserved, and new seed entries (PYQs, Knowledge Bank topics) are merged in.

## File Structure

```
src/
├── app/
│   ├── page.tsx              # Main entry — renders <AppShell />
│   ├── layout.tsx            # Root layout with theme + fonts
│   ├── globals.css           # Tailwind + navy/gold theme variables
│   └── api/mentor/route.ts   # AI mentor chat endpoint
├── components/
│   ├── app-shell.tsx         # Sidebar + main content layout
│   ├── app-sidebar.tsx       # 16 nav items grouped by section
│   ├── ui/                   # shadcn/ui components (pre-installed)
│   ├── shared/               # Reusable stat-card, section-header, progress-bar
│   └── views/                # 16 view files (one per nav item)
│       ├── strategy-view.tsx             # NEW: personalized landing view
│       ├── dashboard-view.tsx
│       ├── six-month-planner-view.tsx
│       ├── monthly-planner-view.tsx
│       ├── weekly-planner-view.tsx
│       ├── daily-planner-view.tsx
│       ├── gs-tracker-view.tsx
│       ├── sociology-tracker-view.tsx
│       ├── notes-tracker-view.tsx
│       ├── revision-tracker-view.tsx
│       ├── pyq-tracker-view.tsx
│       ├── ca-tracker-view.tsx
│       ├── test-analysis-view.tsx
│       ├── ai-mentor-view.tsx
│       ├── analytics-view.tsx
│       └── knowledge-bank-view.tsx
└── lib/
    ├── store.ts              # Zustand store with persist (v2)
    ├── types.ts              # All TypeScript interfaces
    ├── nav.ts                # 16 nav items config
    ├── seed-data.ts          # Base seed data (original)
    ├── expanded-seed-data.ts # NEW: 50+ PYQs, 18 KB topics, 20 notes, 20 revisions, 5 tests, 18 CA items, 4 mentor exchanges
    ├── strategy-data.ts      # NEW: User profile, principles, phases, decision rules, pipeline, Day 1 plan
    └── utils.ts              # cn() helper
```

## Verification

- `bun run lint` → exit 0, clean
- All 16 views render with rich seed data on first load
- AI Mentor chat works end-to-end (POST /api/mentor → 200)
- Mobile responsive (sidebar collapses to Sheet)
- No console errors

## License

Personal use — built for a UPSC CSE aspirant preparing for Mains December 2026.
