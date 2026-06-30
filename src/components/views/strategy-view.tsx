"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useAppStore } from "@/lib/store";
import {
  USER_PROFILE,
  PRINCIPLES,
  PHASES,
  DECISION_RULES,
  PIPELINE_STEPS,
  DAY_1_PLAN,
  WEEKLY_HOURS,
  PERSONALIZED_NOTES,
} from "@/lib/strategy-data";
import {
  Compass,
  Calendar,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle2,
  Brain,
  ArrowRight,
  Sparkles,
  BookOpen,
  TrendingUp,
} from "lucide-react";

export function StrategyView() {
  const setActiveView = useAppStore((s) => s.setActiveView);
  const today = new Date();
  const sprintStart = new Date(USER_PROFILE.sprintStart);
  const examDate = new Date(USER_PROFILE.examDate);
  const daysToSprint = Math.ceil((sprintStart.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const daysToExam = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-8">
      {/* HERO — Personalised greeting */}
      <Card className="border-mentor-navy/20 bg-gradient-to-br from-mentor-navy to-mentor-navy-light text-mentor-cream">
        <CardContent className="p-8">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div className="space-y-2 flex-1 min-w-[280px]">
              <div className="flex items-center gap-2 text-mentor-gold-light text-xs uppercase tracking-widest">
                <Sparkles className="h-4 w-4" />
                <span>Your Personalised Sprint Plan</span>
              </div>
              <h1 className="font-serif text-4xl font-bold leading-tight">
                UPSC Mains 2026 · 6-Month Sprint
              </h1>
              <p className="text-mentor-cream/80 text-sm leading-relaxed max-w-2xl">
                Built around your specific profile: <strong className="text-mentor-gold-light">weak GS1 + GS2</strong>,
                comfortable <strong className="text-mentor-gold-light">Sociology</strong> (both papers),
                <strong className="text-mentor-gold-light"> 8-9 hrs/day</strong>, weak-first sequencing,
                with <strong className="text-mentor-gold-light">Agriculture</strong> as the worked example
                pre-loaded through Level 0-6. This is not a template — every choice below was made for you.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Badge variant="secondary" className="bg-mentor-gold/20 text-mentor-gold-light border-mentor-gold/40">
                  <Calendar className="h-3 w-3 mr-1" /> Sprint: 1 Jul – 14 Dec 2026
                </Badge>
                <Badge variant="secondary" className="bg-mentor-gold/20 text-mentor-gold-light border-mentor-gold/40">
                  <Target className="h-3 w-3 mr-1" /> Exam: 5 Dec 2026
                </Badge>
                <Badge variant="secondary" className="bg-mentor-gold/20 text-mentor-gold-light border-mentor-gold/40">
                  <Clock className="h-3 w-3 mr-1" /> {USER_PROFILE.dailyHoursTarget} hrs/day · 6 days/week
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 min-w-[280px]">
              <StatBlock
                label={daysToSprint > 0 ? "Days to Sprint Start" : "Days since Sprint Started"}
                value={Math.abs(daysToSprint).toString()}
                tone="gold"
              />
              <StatBlock
                label="Days to Mains 2026"
                value={daysToExam.toString()}
                tone="cream"
              />
              <StatBlock
                label="Sprint Weeks"
                value={USER_PROFILE.sprintWeeks.toString()}
                tone="cream"
              />
              <StatBlock
                label="Optional Focus"
                value={`${USER_PROFILE.focusOptionalPct}%`}
                tone="gold"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* USER PROFILE — at a glance */}
      <section>
        <SectionHeading
          icon={<Compass className="h-5 w-5" />}
          title="Your Profile"
          subtitle="The parameters that drove every sequencing decision"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <ProfileCard label="Optional Subject" value={USER_PROFILE.optional} tone="navy" />
          <ProfileCard label="Weak Papers" value={USER_PROFILE.weakPapers.join(", ")} tone="red" />
          <ProfileCard label="Comfortable With" value={USER_PROFILE.comfortablePapers.join(", ")} tone="green" />
          <ProfileCard label="Sequencing Approach" value={USER_PROFILE.sequencingApproach} tone="navy" />
          <ProfileCard label="Must-Cover Topics" value={USER_PROFILE.mustCoverTopics.join("; ")} tone="gold" />
          <ProfileCard label="Weekly Hours Target" value={`${USER_PROFILE.weeklyHoursTarget} hrs`} tone="navy" />
        </div>
      </section>

      {/* DAY 1 STARTER PLAN — most important section */}
      <section>
        <SectionHeading
          icon={<ArrowRight className="h-5 w-5" />}
          title="Day 1 Starter Plan — Wednesday, 1 July 2026"
          subtitle="Open this on your first day. Execute it. Don't overthink."
          accent="gold"
        />
        <Card className="border-mentor-gold/30 mt-4">
          <CardHeader className="bg-mentor-gold/5 border-b border-mentor-gold/20">
            <CardTitle className="text-mentor-navy font-serif text-xl">
              Week 1 Day 1 — GS1 Modern History + Sociology P1 Unit 1
            </CardTitle>
            <CardDescription className="text-mentor-navy/70">
              PYQ-first entry into the entire 6-month sprint. Total load: {DAY_1_PLAN.totalHours} hrs.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-mentor-tan/30">
              {DAY_1_PLAN.tasks.map((task, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 hover:bg-mentor-cream/50 transition-colors">
                  <div className="font-mono text-xs text-mentor-navy/70 font-semibold min-w-[100px] pt-0.5">
                    {task.time}
                  </div>
                  <div className="flex-1 text-sm text-mentor-navy">{task.task}</div>
                  <Badge variant="outline" className="text-xs border-mentor-tan text-mentor-navy/60 shrink-0">
                    {task.duration}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="p-4 bg-mentor-navy/5 border-t border-mentor-navy/10">
              <div className="text-xs font-semibold uppercase tracking-wider text-mentor-navy mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-mentor-gold" />
                Non-Negotiables for Day 1
              </div>
              <ul className="space-y-1.5">
                {DAY_1_PLAN.nonNegotiables.map((item, i) => (
                  <li key={i} className="text-sm text-mentor-navy/80 flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-mentor-gold mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 3-PHASE ARCHITECTURE */}
      <section>
        <SectionHeading
          icon={<Calendar className="h-5 w-5" />}
          title="Three-Phase Architecture"
          subtitle="Your 26 weeks, split by cognitive purpose"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          {PHASES.map((phase, idx) => (
            <Card key={idx} className="border-mentor-navy/20">
              <CardHeader className={`
                border-b
                ${idx === 0 ? "bg-mentor-navy/5" : idx === 1 ? "bg-mentor-gold/10" : "bg-mentor-green/5"}
              `}>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={`
                    ${idx === 0 ? "border-mentor-navy text-mentor-navy" : ""}
                    ${idx === 1 ? "border-mentor-gold text-mentor-gold" : ""}
                    ${idx === 2 ? "border-mentor-green text-mentor-green" : ""}
                  `}>
                    Phase {idx + 1}
                  </Badge>
                  <span className="text-xs text-mentor-navy/60 font-mono">{phase.weeks}</span>
                </div>
                <CardTitle className="font-serif text-lg text-mentor-navy mt-2">{phase.phase}</CardTitle>
                <CardDescription className="text-mentor-navy/70 font-medium">{phase.calendar}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <div>
                  <div className="text-xs uppercase tracking-wider text-mentor-navy/50 font-semibold mb-1">Focus</div>
                  <p className="text-sm text-mentor-navy/90 leading-relaxed">{phase.focus}</p>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-mentor-navy/50 font-semibold mb-1">Deliverable</div>
                  <p className="text-sm text-mentor-navy/90 leading-relaxed">{phase.deliverable}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SIX PRINCIPLES */}
      <section>
        <SectionHeading
          icon={<Target className="h-5 w-5" />}
          title="The Six Core Principles"
          subtitle="Mentor's non-negotiable rules. Violating one compounds in 2 weeks."
        />
        <Card className="mt-4">
          <CardContent className="p-0">
            <div className="divide-y divide-mentor-tan/30">
              {PRINCIPLES.map((p) => (
                <div key={p.id} className="p-4 hover:bg-mentor-cream/40 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-mentor-navy text-mentor-cream flex items-center justify-center font-bold text-sm">
                      {p.id}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="font-serif font-semibold text-mentor-navy text-base">{p.principle}</div>
                      <div className="text-sm text-mentor-navy/70 leading-relaxed">
                        <span className="font-semibold text-mentor-navy/80">Why: </span>
                        {p.why}
                      </div>
                      <div className="text-xs text-mentor-gold font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="h-3 w-3" />
                        <span className="uppercase tracking-wider">Weekly Touchpoint: {p.weeklyTouchpoint}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 9-STEP PIPELINE */}
      <section>
        <SectionHeading
          icon={<BookOpen className="h-5 w-5" />}
          title="The 9-Step Level-1 Note-Making Pipeline"
          subtitle="From syllabus to answer-writing. Skip any step = fake mastery."
        />
        <Card className="mt-4">
          <CardContent className="p-0">
            <div className="divide-y divide-mentor-tan/30">
              {PIPELINE_STEPS.map((step) => (
                <div key={step.step} className="p-4 grid grid-cols-12 gap-3 items-start hover:bg-mentor-cream/40 transition-colors">
                  <div className="col-span-2 sm:col-span-1">
                    <div className="w-8 h-8 rounded-md bg-mentor-gold/15 text-mentor-gold flex items-center justify-center font-bold text-sm">
                      {step.step}
                    </div>
                  </div>
                  <div className="col-span-10 sm:col-span-3">
                    <div className="font-serif font-semibold text-mentor-navy text-base">{step.action}</div>
                  </div>
                  <div className="col-span-12 sm:col-span-4 text-sm text-mentor-navy/80">
                    <span className="text-xs uppercase tracking-wider text-mentor-navy/50 font-semibold block mb-1">Deliverable</span>
                    {step.deliverable}
                  </div>
                  <div className="col-span-12 sm:col-span-4 text-sm text-mentor-navy/70">
                    <span className="text-xs uppercase tracking-wider text-mentor-gold/80 font-semibold block mb-1 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" /> Common Mistake
                    </span>
                    {step.commonMistake}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* AI MENTOR DECISION RULES */}
      <section>
        <SectionHeading
          icon={<Brain className="h-5 w-5" />}
          title="6 Decision Rules The AI Mentor Follows"
          subtitle="Priority order — Rule 1 always wins. The mentor is not a chatbot."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {DECISION_RULES.map((rule) => (
            <Card key={rule.id} className="border-mentor-navy/15">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-md bg-mentor-navy text-mentor-gold-light flex items-center justify-center font-bold text-sm">
                    {rule.id}
                  </div>
                  <div className="font-serif font-bold text-mentor-navy">{rule.rule}</div>
                </div>
                <div className="space-y-1.5 pl-11">
                  <div className="text-xs">
                    <span className="uppercase tracking-wider text-mentor-navy/50 font-semibold">Trigger: </span>
                    <span className="text-mentor-navy/80 text-sm">{rule.trigger}</span>
                  </div>
                  <div className="text-xs">
                    <span className="uppercase tracking-wider text-mentor-gold font-semibold">Action: </span>
                    <span className="text-mentor-navy/80 text-sm">{rule.action}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* WEEKLY HOUR ALLOCATION */}
      <section>
        <SectionHeading
          icon={<Clock className="h-5 w-5" />}
          title="Weekly Hour Allocation — Sustainable 8-9 hrs/day"
          subtitle="Built for endurance, not peak intensity"
        />
        <Card className="mt-4">
          <CardContent className="p-0">
            <div className="divide-y divide-mentor-tan/30">
              {WEEKLY_HOURS.map((row, idx) => (
                <div key={idx} className={`p-3 grid grid-cols-12 gap-3 items-center ${row.block === "Total" ? "bg-mentor-navy/5 font-bold" : ""}`}>
                  <div className="col-span-12 sm:col-span-5 text-sm text-mentor-navy">{row.block}</div>
                  <div className="col-span-4 sm:col-span-2 text-sm text-mentor-navy/70 font-mono">{row.hoursPerDay > 0 ? `${row.hoursPerDay} hr/day` : "—"}</div>
                  <div className="col-span-4 sm:col-span-2 text-sm text-mentor-navy/70 font-mono">{row.percent > 0 ? `${row.percent}%` : "—"}</div>
                  <div className="col-span-4 sm:col-span-1 text-sm text-mentor-navy font-mono">{row.weeklyHours}h</div>
                  <div className="col-span-12 sm:col-span-2 text-xs text-mentor-navy/60 italic">{row.notes}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* PERSONALIZED NOTES — the WHY */}
      <section>
        <SectionHeading
          icon={<TrendingUp className="h-5 w-5" />}
          title="Why This Plan Works For You"
          subtitle="Each decision below was driven by your specific answers"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {PERSONALIZED_NOTES.map((note, idx) => (
            <Card key={idx} className="border-mentor-navy/15 bg-mentor-cream/30">
              <CardContent className="p-4 space-y-2">
                <div className="font-serif font-bold text-mentor-navy text-base">{note.title}</div>
                <p className="text-sm text-mentor-navy/80 leading-relaxed">{note.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA — Where to go next */}
      <Card className="border-mentor-gold/30 bg-gradient-to-br from-mentor-gold/5 to-mentor-cream/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-mentor-gold font-semibold mb-1">Start Here</div>
              <h3 className="font-serif text-xl text-mentor-navy font-bold">Ready to begin?</h3>
              <p className="text-sm text-mentor-navy/70 mt-1 max-w-xl">
                Jump to the Daily Planner to see your first set of tasks, or open the AI Mentor
                to introduce yourself and get your first mentor response.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={() => setActiveView("daily")}
                className="bg-mentor-navy hover:bg-mentor-navy-light text-mentor-cream"
              >
                Open Daily Planner
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button
                onClick={() => setActiveView("ai-mentor")}
                variant="outline"
                className="border-mentor-navy text-mentor-navy hover:bg-mentor-navy hover:text-mentor-cream"
              >
                Meet AI Mentor
                <Brain className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatBlock({ label, value, tone }: { label: string; value: string; tone: "gold" | "cream" }) {
  return (
    <div className={`rounded-md p-4 ${tone === "gold" ? "bg-mentor-gold/15 border border-mentor-gold/30" : "bg-mentor-cream/10 border border-mentor-cream/20"}`}>
      <div className={`text-2xl font-bold font-serif ${tone === "gold" ? "text-mentor-gold-light" : "text-mentor-cream"}`}>
        {value}
      </div>
      <div className="text-xs text-mentor-cream/70 uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}

function ProfileCard({ label, value, tone }: { label: string; value: string; tone: "navy" | "red" | "green" | "gold" }) {
  const toneClass = {
    navy: "border-mentor-navy/30 bg-mentor-navy/5 text-mentor-navy",
    red: "border-red-300 bg-red-50 text-red-900",
    green: "border-mentor-green/30 bg-mentor-green/5 text-mentor-green",
    gold: "border-mentor-gold/30 bg-mentor-gold/5 text-mentor-gold",
  }[tone];
  return (
    <div className={`rounded-md border p-4 ${toneClass}`}>
      <div className="text-xs uppercase tracking-wider opacity-70 font-semibold mb-1">{label}</div>
      <div className="font-serif font-bold text-base leading-snug">{value}</div>
    </div>
  );
}

function SectionHeading({
  icon,
  title,
  subtitle,
  accent = "navy",
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  accent?: "navy" | "gold";
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2.5">
        <div className={`shrink-0 w-9 h-9 rounded-md flex items-center justify-center ${accent === "gold" ? "bg-mentor-gold/15 text-mentor-gold" : "bg-mentor-navy/10 text-mentor-navy"}`}>
          {icon}
        </div>
        <h2 className="font-serif text-2xl font-bold text-mentor-navy leading-tight">{title}</h2>
      </div>
      {subtitle && <p className="text-sm text-mentor-navy/60 ml-11">{subtitle}</p>}
    </div>
  );
}
