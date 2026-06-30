"use client";

import { useMemo } from "react";
import { BarChart3, Flame, Activity, TrendingUp } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { useAppStore, computeGSMaturity, computeSociologyMaturity, computeKnowledgeLevel } from "@/lib/store";
import { cn } from "@/lib/utils";

export function AnalyticsView() {
  const studyLogs = useAppStore((s) => s.studyLogs);
  const gsTracker = useAppStore((s) => s.gsTracker);
  const sociologyTracker = useAppStore((s) => s.sociologyTracker);
  const knowledgeBank = useAppStore((s) => s.knowledgeBank);
  const revisionTracker = useAppStore((s) => s.revisionTracker);
  const pyqTracker = useAppStore((s) => s.pyqTracker);

  // ============== Study hours heatmap (last 30 days) ==============
  const heatmapData = useMemo(() => {
    const today = new Date();
    const cells: { date: string; hours: number; intensity: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      const log = studyLogs.find((l) => l.date === iso);
      const hours = log?.hours ?? 0;
      const intensity = Math.min(1, hours / 9);
      cells.push({ date: iso, hours, intensity });
    }
    return cells;
  }, [studyLogs]);

  // ============== Completion trend (last 14 days) ==============
  const completionTrend = useMemo(
    () =>
      studyLogs.slice(-14).map((l) => ({
        day: new Date(l.date + "T00:00:00").toLocaleDateString("en", { month: "short", day: "numeric" }),
        completion: l.completionPct,
      })),
    [studyLogs]
  );

  // ============== Revision gap (overdue by subject) ==============
  const revisionGaps = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const map: Record<string, number> = {};
    for (const r of revisionTracker) {
      const r1Due = new Date(r.noteDate);
      r1Due.setDate(r1Due.getDate() + 7);
      const isOverdue = !r.r1Done && r1Due.toISOString().slice(0, 10) < today;
      if (isOverdue) {
        // extract paper prefix (e.g. "GS2" or "Sociology")
        const paper = r.topic.split(" ")[0];
        map[paper] = (map[paper] ?? 0) + 1;
      }
    }
    return Object.entries(map).map(([paper, count]) => ({ paper, overdue: count }));
  }, [revisionTracker]);

  // ============== Consistency score (rolling 7-day) ==============
  const consistency = useMemo(() => {
    const last7 = studyLogs.slice(-7);
    const daysStudied = last7.filter((l) => l.hours >= 6).length;
    const avg = last7.reduce((s, l) => s + l.hours, 0) / Math.max(last7.length, 1);
    return Math.round((daysStudied / 7) * 60 + Math.min(avg / 9, 1) * 40);
  }, [studyLogs]);

  // ============== Weak subject radar (6 axes) ==============
  const radarData = useMemo(() => {
    const gs1 = gsTracker.filter((g) => g.paper === "GS1");
    const gs2 = gsTracker.filter((g) => g.paper === "GS2");
    const gs3 = gsTracker.filter((g) => g.paper === "GS3");
    const gs4 = gsTracker.filter((g) => g.paper === "GS4");
    const p1 = sociologyTracker.filter((u) => u.paper === "P1");
    const p2 = sociologyTracker.filter((u) => u.paper === "P2");
    const avg = (arr: typeof gs1) => (arr.length === 0 ? 0 : Math.round(arr.reduce((s, x) => s + (computeGSMaturity as (x: typeof gs1[number]) => number)(x) as number, 0) / arr.length));
    const avgSoc = (arr: typeof p1) => (arr.length === 0 ? 0 : Math.round(arr.reduce((s, x) => s + (computeSociologyMaturity as (x: typeof p1[number]) => number)(x) as number, 0) / arr.length));
    return [
      { subject: "GS1", score: avg(gs1) },
      { subject: "GS2", score: avg(gs2) },
      { subject: "GS3", score: avg(gs3) },
      { subject: "GS4", score: avg(gs4) },
      { subject: "Sociology P1", score: avgSoc(p1) },
      { subject: "Sociology P2", score: avgSoc(p2) },
    ];
  }, [gsTracker, sociologyTracker]);

  // ============== Knowledge Bank distribution (donut) ==============
  const knowledgeDist = useMemo(() => {
    const buckets = [0, 0, 0, 0, 0, 0, 0]; // L0..L6
    for (const k of knowledgeBank) {
      const lvl = computeKnowledgeLevel(k.levels);
      buckets[lvl]++;
    }
    return buckets.map((count, level) => ({ level: `L${level}`, count })).filter((d) => d.count > 0);
  }, [knowledgeBank]);

  const COLORS = ["#e5e5e5", "#c8b988", "#d4a85a", "#b8893a", "#8b4513", "#0f2d4a", "#1f4d3a"];

  const lineConfig: ChartConfig = {
    completion: { label: "Completion %", color: "#0f2d4a" },
  };
  const barConfig: ChartConfig = {
    overdue: { label: "Overdue", color: "#b91c1c" },
  };
  const radarConfig: ChartConfig = {
    score: { label: "Maturity", color: "#b8893a" },
  };
  const pieConfig: ChartConfig = {
    count: { label: "Topics", color: "#b8893a" },
  };

  const totalHours30 = heatmapData.reduce((s, c) => s + c.hours, 0);
  const avgDaily = totalHours30 / 30;

  return (
    <div>
      <SectionHeader
        title="Analytics"
        subtitle="Read-only dashboard — study hours heatmap, completion trend, revision gaps, consistency score, weak-subject radar, and Knowledge Bank distribution."
        icon={<BarChart3 className="size-5" />}
      />

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <StatCard
          label="30-Day Hours"
          value={totalHours30.toFixed(0)}
          sub={`Avg ${avgDaily.toFixed(1)}h/day`}
          icon={<Activity className="size-4" />}
          accent="navy"
        />
        <StatCard
          label="Consistency Score"
          value={`${consistency}%`}
          sub="Rolling 7-day composite"
          icon={<Flame className="size-4" />}
          accent="gold"
        />
        <StatCard
          label="Overdue Revisions"
          value={revisionGaps.reduce((s, r) => s + r.overdue, 0)}
          sub="Across all subjects"
          icon={<TrendingUp className="size-4" />}
          accent="red"
        />
        <StatCard
          label="PYQs in Mistake Book"
          value={pyqTracker.filter((p) => p.inMistakeBook).length}
          sub={`of ${pyqTracker.length} tracked`}
          icon={<BarChart3 className="size-4" />}
          accent="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Study hours heatmap */}
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-[#0f2d4a] mb-3">Study Hours Heatmap (Last 30 Days)</h3>
          <div className="grid grid-cols-10 gap-1">
            {heatmapData.map((c) => {
              const opacity = c.hours === 0 ? 0.08 : Math.max(0.2, c.intensity);
              return (
                <div
                  key={c.date}
                  title={`${c.date}: ${c.hours.toFixed(1)}h`}
                  className="aspect-square rounded-sm border border-border/40"
                  style={{
                    backgroundColor: c.hours === 0 ? "#e5e5e5" : `rgba(184, 137, 58, ${opacity})`,
                  }}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#5a5a5a] mt-2">
            <span>30 days ago</span>
            <div className="flex items-center gap-1">
              <span>0h</span>
              <div className="w-16 h-2 rounded-sm" style={{ background: "linear-gradient(90deg, #e5e5e5, #b8893a)" }} />
              <span>9h+</span>
            </div>
            <span>Today</span>
          </div>
        </Card>

        {/* Completion trend */}
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-[#0f2d4a] mb-3">Completion % Trend (14 Days)</h3>
          <ChartContainer config={lineConfig} className="h-[200px] w-full">
            <LineChart data={completionTrend} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#e5e5e5" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line dataKey="completion" stroke="#0f2d4a" strokeWidth={2} dot={{ fill: "#b8893a", r: 3 }} />
            </LineChart>
          </ChartContainer>
        </Card>

        {/* Revision gap bar */}
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-[#0f2d4a] mb-3">Revision Gap by Subject (Overdue Count)</h3>
          {revisionGaps.length === 0 ? (
            <div className="text-xs text-[#5a5a5a] py-12 text-center">
              No overdue revisions — great discipline!
            </div>
          ) : (
            <ChartContainer config={barConfig} className="h-[200px] w-full">
              <BarChart data={revisionGaps} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#e5e5e5" />
                <XAxis dataKey="paper" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="overdue" fill="#b91c1c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          )}
        </Card>

        {/* Weak subject radar */}
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-[#0f2d4a] mb-3">Weak Subject Radar (6 Axes)</h3>
          <ChartContainer config={radarConfig} className="h-[220px] w-full">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#c8b988" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#5a5a5a" }} />
              <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9 }} />
              <Radar dataKey="score" stroke="#0f2d4a" fill="#b8893a" fillOpacity={0.4} />
              <ChartTooltip content={<ChartTooltipContent />} />
            </RadarChart>
          </ChartContainer>
        </Card>

        {/* Knowledge Bank donut */}
        <Card className="p-5 lg:col-span-2">
          <h3 className="text-sm font-semibold text-[#0f2d4a] mb-3">Knowledge Bank Distribution by Level</h3>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <ChartContainer config={pieConfig} className="h-[200px] w-full md:w-1/2">
              <PieChart>
                <Pie
                  data={knowledgeDist}
                  dataKey="count"
                  nameKey="level"
                  innerRadius={45}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {knowledgeDist.map((entry, idx) => (
                    <Cell key={entry.level} fill={COLORS[Number(entry.level.replace("L", ""))] ?? COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
            <div className="space-y-1.5 flex-1 w-full">
              {knowledgeDist.map((d) => {
                const level = Number(d.level.replace("L", ""));
                return (
                  <div key={d.level} className="flex items-center gap-2 text-sm">
                    <div
                      className={cn("size-3 rounded-sm")}
                      style={{ backgroundColor: COLORS[level] ?? "#888" }}
                    />
                    <span className="font-mono text-xs">{d.level}</span>
                    <Badge variant="outline" className="ml-auto">{d.count}</Badge>
                  </div>
                );
              })}
              <div className="text-[10px] text-[#5a5a5a] pt-2 border-t border-border/60 mt-2">
                Total topics: {knowledgeBank.length} · Mains-ready (L6):{" "}
                <strong className="text-[#1f4d3a]">
                  {knowledgeBank.filter((k) => computeKnowledgeLevel(k.levels) === 6).length}
                </strong>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
