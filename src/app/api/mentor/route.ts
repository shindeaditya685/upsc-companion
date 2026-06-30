import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are an experienced UPSC CSE mentor. The aspirant is preparing for Mains December 2026 with Sociology optional. They run a 6-month sprint (Jul-Dec 2026), 8-9 hours/day, 6 days/week, weak-first GS sequencing (GS1 -> GS2 -> GS3 -> GS4).

Your job: every evening, review their daily input and produce:
1. A 2-3 line assessment of the day
2. "What you understood well" — 1-2 specific observations
3. "What can be tightened" — 1-2 specific gaps
4. "Tomorrow's adjusted plan" — 4-6 prioritized tasks with time slots
5. "One mentor observation" — single most important insight

SIX DECISION RULES (priority order, Rule 1 always wins):
1. PROTECT REVISION WINDOWS — Never move a revision slot for new content. If conflict, postpone new content.
2. PREVENT OVER-PLANNING — If daily planned hours > 9 OR > 5 tasks, auto-prune lowest priority task.
3. BALANCE GS + OPTIONAL — If cumulative Optional hours this week < 25%, block 90 min for Optional tomorrow.
4. ADAPT TO SLIPPAGE — Task pending > 2 days past due: drop 1 lower-priority task to absorb; reschedule pending within 2 days.
5. HIGH-YIELD PRIORITY — When choosing between 2 themes of equal length, pick the one with higher PYQ frequency in last 5 years.
6. BURNOUT GUARD — If aspirant reports fatigue OR 3 consecutive <6hr days, halve tomorrow's load + insert revision-only day within 48 hrs.

Tone: warm but disciplined, specific not generic, never use motivational cliches. Reference specific topics/data/schemes when relevant. Match the user's energy level — if they're low, be supportive but firm about not pulling all-nighters.

Output format: plain markdown with bold labels for the 5 sections above. Keep under 300 words total.`;

interface ConversationMsg {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  let userInput = "";
  let conversationHistory: ConversationMsg[] = [];
  try {
    const body = await req.json();
    userInput = (body?.userInput ?? "").toString();
    conversationHistory = Array.isArray(body?.conversationHistory) ? body.conversationHistory : [];
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!userInput.trim()) {
    return NextResponse.json({ error: "Empty user input" }, { status: 400 });
  }

  try {
    const Groq = (await import("groq-sdk")).default;
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...conversationHistory.map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: userInput },
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const responseText = completion?.choices?.[0]?.message?.content;
    if (responseText) {
      return NextResponse.json({ response: responseText, source: "ai" });
    }
  } catch (err) {
    console.error("[Groq] Mentor API error:", err);
  }

  // Fallback rule-based mentor
  const fallback = fallbackMentor(userInput);
  return NextResponse.json({ response: fallback, source: "fallback" });
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "UPSC Mentor API. POST { userInput, conversationHistory } to receive a mentor response.",
  });
}

function fallbackMentor(userInput: string): string {
  const input = userInput.toLowerCase();
  const mentions = (kw: string[]) => kw.some((k) => input.includes(k));

  const energyMatch = userInput.match(/energy\s*[:\-]?\s*(\d{1,2})\s*\/\s*10/);
  const energy = energyMatch ? parseInt(energyMatch[1], 10) : 7;

  const isFatigue = mentions(["tired", "exhausted", "fatigue", "burnt out", "burnout", "low energy"]) || energy <= 4;
  const isGoodDay = mentions(["good day", "great day", "completed all", "on track"]) ||
    (mentions(["completed"]) && !mentions(["skipped", "missed"]));
  const isSlipped = mentions(["skipped", "missed", "did not", "didnt", "couldn't", "couldnt", "pending", "behind"]);

  if (isFatigue) {
    return `**Assessment of the day:**\nYour energy at ${energy}/10 with fatigue language triggers Rule 6 (Burnout Guard). Pulling an all-nighter will cost you 2-3 days of recovery. We're halving tomorrow's load.\n\n**What you understood well:**\n- You recognised the fatigue rather than pushing through — that's mentor-grade self-awareness.\n\n**What can be tightened:**\n- Don't add "catch-up" content tomorrow. Rule 6 inserts a revision-only day within 48 hrs — we'll use it tomorrow.\n\n**Tomorrow's adjusted plan:**\n- 06:30-07:00 | R1 revision of yesterday's notes (30 min) | P1\n- 07:30-09:00 | ONE theme reading only — no notes compression | P2\n- 16:00-17:00 | Optional Sociology P2 Caste — light read | P2\n- 20:00-20:20 | Newspaper scan (20 min) | P3\n\n**One mentor observation:**\n**Discipline is knowing when to rest.** A revision-only day tomorrow protects the GS3 Agriculture sprint you've already invested in. Don't break the streak by breaking yourself.`;
  }

  if (isSlipped) {
    return `**Assessment of the day:**\nSlippage detected. Rule 4 (Adapt to Slippage) kicks in: we drop one lower-priority task and absorb pending within 2 days. No panic-pile.\n\n**What you understood well:**\n- You reported the slippage honestly — that's the input I need to plan correctly.\n\n**What can be tightened:**\n- Identify the single lowest-priority task tomorrow and drop it. Reschedule the pending within 2 days max.\n\n**Tomorrow's adjusted plan:**\n- 06:30-07:00 | R1 revision (protected — Rule 1) | P1\n- 07:30-09:00 | Pending task from today (carry-over) | P1\n- 09:30-11:00 | Today's planned theme, compressed | P1\n- 14:00-15:00 | Answer writing: 1 question (15 min) + review | P1\n- 16:00-17:00 | Optional Sociology P2 — value addition | P2\n\n**One mentor observation:**\nSlippage isn't failure — unmanaged slippage is. Tomorrow's pruned plan absorbs today's gap without sacrificing revision or optional balance.`;
  }

  if (isGoodDay) {
    return `**Assessment of the day:**\nSolid day. Energy ${energy}/10 with completion reported — momentum is real. We protect it by not over-loading tomorrow (Rule 2 caps at 9 hrs / 5 tasks).\n\n**What you understood well:**\n- You hit the morning revision window and compressed themes on schedule — that's the Level-1 notes pipeline working.\n\n**What can be tightened:**\n- Watch the Optional balance (Rule 3): if cumulative Optional hours this week are <25%, we block 90 min for Sociology tomorrow.\n\n**Tomorrow's adjusted plan:**\n- 06:30-07:00 | R1 revision of today's notes | P1\n- 07:30-09:00 | Next theme read + Level-1 notes | P1\n- 09:30-11:00 | Next theme read + Level-1 notes | P1\n- 14:00-15:30 | Answer writing: 1 GS3 Q (15 min) + 2 review | P1\n- 18:00-19:00 | Optional Sociology P2 — Caste value addition | P1\n- 20:00-20:30 | Newspaper scan (30 min) | P3\n\n**One mentor observation:**\n**Momentum is compound interest.** Today's completion isn't the win — tomorrow's repeat is. Lock the rhythm, don't add tasks.`;
  }

  return `**Assessment of the day:**\nDay logged at energy ${energy}/10. Without specific completion/skip signals, I'm running the default plan with the 6 rules applied.\n\n**What you understood well:**\n- You showed up and logged — that's the discipline loop closing.\n\n**What can be tightened:**\n- Add concrete completion data tomorrow (tasks done vs skipped, hours, energy). Generic logs produce generic plans.\n\n**Tomorrow's adjusted plan:**\n- 06:30-07:00 | R1 revision of yesterday's notes (Rule 1 protected) | P1\n- 07:30-09:00 | Theme read + Level-1 notes | P1\n- 09:30-11:00 | Theme read + Level-1 notes | P1\n- 14:00-15:30 | Answer writing: 1 Q + review | P1\n- 18:00-19:00 | Optional Sociology P2 — value addition (Rule 3 balance) | P1\n\n**One mentor observation:**\n**Specificity scales.** The more precise your evening input (which task, what hour, what blocker), the tighter my Rule 1-6 application tomorrow.`;
}
