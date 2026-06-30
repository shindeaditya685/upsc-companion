"use client";

import { useMemo } from "react";
import { Clock, CheckCircle2, Flame, Trophy, Plus, Brain, ClipboardList, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { StatCard } from "@/components/shared/stat-card";
import { ProgressBar } from "@/components/shared/progress-bar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { USER_PROFILE } from "@/lib/strategy-data";
import { useAppStore, computeGSMaturity, parseHoursFromSlot, computeKnowledgeLevel } from "@/lib/store";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import type { Priority } from "@/lib/types";

const priorityVariant: Record<Priority, { bg: string; text: string }> = {
  P1: { bg: "bg-[#b91c1c]", text: "text-[#fafaf7]" },
  P2: { bg: "bg-[#b8893a]", text: "text-[#1a1a1a]" },
  P3: { bg: "bg-[#8a8a8a]", text: "text-[#fafaf7]" },
};

export function DashboardView() {
  const tasks = useAppStore((s) => s.tasks);
  const studyLogs = useAppStore((s) => s.studyLogs);
  const gsTracker = useAppStore((s) => s.gsTracker);
  const knowledgeBank = useAppStore((s) => s.knowledgeBank);
  const revisionTracker = useAppStore((s) => s.revisionTracker);
  const setActiveView = useAppStore((s) => s.setActiveView);
  const addTask = useAppStore((s) => s.addTask);
  const selectedDate = useAppStore((s) => s.selectedDate);

  // Today's tasks
  const todaysTasks = useMemo(() => tasks.filter((t) => t.date === selectedDate), [tasks, selectedDate]);

  // Weekly stats
  const last7 = useMemo(() => studyLogs.slice(-7), [studyLogs]);
  const weekHours = useMemo(
    () => last7.reduce((s, l) => s + l.hours, 0),
    [last7]
  );
  const todayHours = useMemo(() => {
    const today = studyLogs.find((l) => l.date === selectedDate);
    return today?.hours ?? todaysTasks.reduce((s, t) => s + parseHoursFromSlot(t.timeSlot), 0);
  }, [studyLogs, todaysTasks, selectedDate]);

  // Completion %
  const completion = useMemo(() => {
    if (todaysTasks.length === 0) return 0;
    const done = todaysTasks.filter((t) => t.completed).length;
    return Math.round((done / todaysTasks.length) * 100);
  }, [todaysTasks]);

  // Subjects mastered (L6)
  const masteredCount = useMemo(
    () => knowledgeBank.filter((k) => computeKnowledgeLevel(k.levels) === 6).length,
    [knowledgeBank]
  );

  // Revision streak (consecutive days with at least 1 hour of revision)
  const streak = useMemo(() => {
    let s = 0;
    for (let i = studyLogs.length - 1; i >= 0; i--) {
      if (studyLogs[i].hours > 0) s++;
      else break;
    }
    return s;
  }, [studyLogs]);

  // Mini 7-day bar chart
  const chartData = useMemo(
    () =>
      last7.map((l) => ({
        day: new Date(l.date + "T00:00:00").toLocaleDateString("en", { weekday: "short" }),
        hours: l.hours,
      })),
    [last7]
  );

  const overdueCount = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return revisionTracker.filter((r) => !r.r1Done && new Date(r.noteDate).getTime() + 7 * 86400000 < new Date(today).getTime()).length;
  }, [revisionTracker]);

  const avgMaturity = useMemo(() => {
    if (gsTracker.length === 0) return 0;
    const sum = gsTracker.reduce((s, g) => s + computeGSMaturity(g), 0);
    return Math.round(sum / gsTracker.length);
  }, [gsTracker]);

  const handleAddTask = () => {
    const newId = `t${Date.now()}`;
    addTask({
      id: newId,
      date: selectedDate,
      timeSlot: "21:00-21:30",
      description: "New task — edit me",
      priority: "P3",
      difficulty: 2,
      completed: false,
      learningOutcome: "",
    });
    setActiveView("daily");
  };

  const chartConfig: ChartConfig = {
    hours: { label: "Hours", color: "#b8893a" },
  };

  return (
    <div>
      <SectionHeader
        title="Today's Command Center"
        subtitle="Your UPSC Mains sprint — Dec 2026 · Sociology optional · Week 11 (Phase 2)"
        icon={<Flame className="size-5" />}
        actions={
          <>
            <Button onClick={handleAddTask} size="sm" variant="outline" className="border-[#b8893a] text-[#0f2d4a] hover:bg-[#b8893a]/10">
              <Plus className="size-4 mr-1.5" /> Add Task
            </Button>
            <Button onClick={() => setActiveView("ai-mentor")} size="sm" className="bg-[#0f2d4a] hover:bg-[#1a3d5e] text-[#fafaf7]">
              <Brain className="size-4 mr-1.5" /> AI Mentor Review
            </Button>
            <Button onClick={() => setActiveView("test-analysis")} size="sm" className="bg-[#b8893a] hover:bg-[#a07a30] text-[#1a1a1a]">
              <ClipboardList className="size-4 mr-1.5" /> Log Test
            </Button>
          </>
        }
      />

      {/* Top stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard
          label="Study Hours (7d)"
          value={weekHours.toFixed(1)}
          sub={`Today: ${todayHours.toFixed(1)}h of ${USER_PROFILE.dailyHoursTarget}h target`}
          icon={<Clock className="size-4" />}
          accent="navy"
        />
        <StatCard
          label="Today's Completion"
          value={`${completion}%`}
          sub={`${todaysTasks.filter((t) => t.completed).length}/${todaysTasks.length} tasks done`}
          icon={<CheckCircle2 className="size-4" />}
          accent="gold"
        />
        <StatCard
          label="Subjects Mastered (L6)"
          value={masteredCount}
          sub={`${knowledgeBank.length} topics tracked in Knowledge Bank`}
          icon={<Trophy className="size-4" />}
          accent="green"
        />
        <StatCard
          label="Revision Streak"
          value={`${streak}d`}
          sub={overdueCount > 0 ? `${overdueCount} revision overdue` : "No overdue revisions"}
          icon={<Flame className="size-4" />}
          accent={overdueCount > 0 ? "red" : "navy"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Today's plan preview */}
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold font-serif text-[#0f2d4a]">Today's Plan</h2>
            <button
              onClick={() => setActiveView("daily")}
              className="text-xs text-[#b8893a] hover:underline flex items-center"
            >
              Open Daily Planner <ArrowRight className="size-3 ml-1" />
            </button>
          </div>

          <div className="mb-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[#5a5a5a]">Daily load (auto-capped at {USER_PROFILE.dailyHoursTarget}h)</span>
              <span className="font-semibold text-[#0f2d4a]">
                {todayHours.toFixed(1)}h / {USER_PROFILE.dailyHoursTarget}h
              </span>
            </div>
            <ProgressBar
              value={(todayHours / USER_PROFILE.dailyHoursTarget) * 100}
              variant={todayHours > USER_PROFILE.dailyHoursTarget ? "red" : "gold"}
            />
            {todayHours > USER_PROFILE.dailyHoursTarget ? (
              <div className="mt-2 text-xs text-[#b91c1c] font-medium">
                ⚠ Over {USER_PROFILE.dailyHoursTarget}h cap — Rule 2 (Prevent Over-Planning) suggests pruning lowest-priority task.
              </div>
            ) : null}
          </div>

          <div className="space-y-2 max-h-[420px] overflow-y-auto scroll-thin pr-1">
            {todaysTasks.slice(0, 6).map((t) => {
              const pv = priorityVariant[t.priority];
              return (
                <div
                  key={t.id}
                  className="flex items-start gap-3 p-3 rounded-md border border-border/70 bg-white hover:border-[#b8893a]/60 transition-colors"
                >
                  <div className="text-xs font-mono text-[#0f2d4a] min-w-[90px] pt-0.5">
                    {t.timeSlot}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${pv.bg} ${pv.text}`}>
                        {t.priority}
                      </span>
                      <span className="text-xs text-[#5a5a5a]">
                        {"●".repeat(t.difficulty)}{"○".repeat(5 - t.difficulty)}
                      </span>
                    </div>
                    <div className="text-sm mt-1 line-clamp-2">{t.description}</div>
                    {t.learningOutcome ? (
                      <div className="text-[11px] text-[#5a5a5a] mt-1 italic">
                        → {t.learningOutcome}
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
            {todaysTasks.length === 0 ? (
              <div className="text-sm text-[#5a5a5a] py-8 text-center">
                No tasks for today. Add one or run the AI Mentor to generate a plan.
              </div>
            ) : null}
          </div>
        </Card>

        {/* Mini chart + side stats */}
        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-[#0f2d4a] mb-2">7-Day Study Hours</h3>
            <ChartContainer config={chartConfig} className="h-[160px] w-full">
              <BarChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#e5e5e5" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 10]} tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="hours" fill="#b8893a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </Card>

          <Card className="p-5">
            <h3 className="text-sm font-semibold text-[#0f2d4a] mb-3">Quick Snapshot</h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-[#5a5a5a]">Avg GS maturity</span>
                <span className="font-semibold text-[#0f2d4a]">{avgMaturity}%</span>
              </div>
              <ProgressBar value={avgMaturity} variant={avgMaturity < 60 ? "red" : "gold"} size="sm" />
              <div className="flex justify-between pt-1">
                <span className="text-[#5a5a5a]">Overdue revisions</span>
                <Badge variant={overdueCount > 0 ? "destructive" : "secondary"}>{overdueCount}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5a5a5a]">Tracked topics</span>
                <span className="font-semibold text-[#0f2d4a]">{knowledgeBank.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5a5a5a]">GS subjects tracked</span>
                <span className="font-semibold text-[#0f2d4a]">{gsTracker.length}</span>
              </div>
            </div>
            <Button
              onClick={() => setActiveView("analytics")}
              variant="ghost"
              size="sm"
              className="w-full mt-3 text-[#0f2d4a] hover:bg-[#b8893a]/10"
            >
              Full Analytics <ArrowRight className="size-3 ml-1" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
