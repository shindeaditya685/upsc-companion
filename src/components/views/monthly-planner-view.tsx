"use client";

import { useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Star, Circle } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from "@/lib/store";
import { buildMonthlySeed } from "@/lib/seed-data";
import { cn } from "@/lib/utils";
import type { DayPlan } from "@/lib/types";

const DOW = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function monthLabel(ym: string): string {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("en", { month: "long", year: "numeric" });
}

function shiftMonth(ym: string, delta: number): string {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function daysInMonth(ym: string): number {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m, 0).getDate();
}

function firstDayDow(ym: string): number {
  // JS: 0 = Sun; we want Mon = 0
  const [y, m] = ym.split("-").map(Number);
  const jsDow = new Date(y, m - 1, 1).getDay();
  return (jsDow + 6) % 7;
}

export function MonthlyPlannerView() {
  const selectedMonth = useAppStore((s) => s.selectedMonth);
  const setSelectedMonth = useAppStore((s) => s.setSelectedMonth);
  const monthlyPlans = useAppStore((s) => s.monthlyPlans);
  const updateDayPlan = useAppStore((s) => s.updateDayPlan);

  // Seed July 2026 lazily on first view
  const effectiveDays = useMemo(() => {
    if (selectedMonth === "2026-07" && (!monthlyPlans["2026-07"] || monthlyPlans["2026-07"].length === 0)) {
      return buildMonthlySeed("2026-07");
    }
    return monthlyPlans[selectedMonth] || [];
  }, [selectedMonth, monthlyPlans]);

  const [editDay, setEditDay] = useState<string | null>(null);

  const total = daysInMonth(selectedMonth);
  const firstOffset = firstDayDow(selectedMonth);
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstOffset; i++) cells.push(null);
  for (let d = 1; d <= total; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const isoForDay = (d: number) =>
    `${selectedMonth}-${String(d).padStart(2, "0")}`;

  const getDay = (d: number): DayPlan | undefined =>
    effectiveDays.find((x) => x.date === isoForDay(d));

  const editingDay = editDay ? getDay(Number(editDay.split("-")[2])) : null;

  return (
    <div>
      <SectionHeader
        title="Monthly Planner"
        subtitle="Calendar grid view — GS focus (top), Optional topic (middle), revision flag (red dot) and test marker (gold star). Click any day to edit."
        icon={<CalendarDays className="size-5" />}
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedMonth(shiftMonth(selectedMonth, -1))}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span className="text-sm font-semibold text-[#0f2d4a] min-w-[140px] text-center">
              {monthLabel(selectedMonth)}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedMonth(shiftMonth(selectedMonth, 1))}
            >
              <ChevronRight className="size-4" />
            </Button>
          </>
        }
      />

      <Card className="p-3">
        {/* DOW header */}
        <div className="grid grid-cols-7 gap-1.5 mb-1.5">
          {DOW.map((d) => (
            <div
              key={d}
              className="text-center text-[11px] font-semibold uppercase tracking-wide text-[#5a5a5a] py-1"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7 gap-1.5">
          {cells.map((d, idx) => {
            if (d === null) {
              return <div key={idx} className="min-h-[88px] sm:min-h-[110px] rounded-md bg-[#f5f1e6]/40" />;
            }
            const day = getDay(d);
            const today = new Date().toISOString().slice(0, 10);
            const isToday = isoForDay(d) === today;
            return (
              <button
                key={idx}
                onClick={() => setEditDay(isoForDay(d))}
                className={cn(
                  "min-h-[88px] sm:min-h-[110px] rounded-md border text-left p-2 flex flex-col gap-1 transition-all hover:border-[#b8893a] hover:shadow-sm",
                  isToday
                    ? "border-[#b8893a] bg-[#fef9ec]"
                    : "border-border bg-white"
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "text-xs font-semibold",
                      isToday ? "text-[#b8893a]" : "text-[#0f2d4a]"
                    )}
                  >
                    {d}
                  </span>
                  <div className="flex gap-0.5">
                    {day?.revisionDue ? (
                      <span title="Revision due" className="text-[#b91c1c]">
                        <Circle className="size-2 fill-current" />
                      </span>
                    ) : null}
                    {day?.hasTest ? (
                      <span title="Test scheduled" className="text-[#b8893a]">
                        <Star className="size-3 fill-current" />
                      </span>
                    ) : null}
                  </div>
                </div>
                {day?.gsFocus ? (
                  <div className="text-[10px] leading-tight text-[#0f2d4a] line-clamp-2">
                    {day.gsFocus}
                  </div>
                ) : null}
                {day?.optionalTopic ? (
                  <div className="text-[10px] leading-tight text-[#5a5a5a] italic line-clamp-2">
                    {day.optionalTopic}
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>
      </Card>

      <p className="text-xs text-[#5a5a5a] mt-3 flex items-center gap-2 flex-wrap">
        <span className="flex items-center gap-1">
          <Star className="size-3 fill-[#b8893a] text-[#b8893a]" /> Test
        </span>
        <span className="flex items-center gap-1">
          <Circle className="size-2 fill-[#b91c1c] text-[#b91c1c]" /> Revision due
        </span>
        <span>· July 2026 pre-populated with sample entries matching the Six-Month Planner.</span>
      </p>

      <Dialog open={!!editDay} onOpenChange={() => setEditDay(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Day — {editDay}</DialogTitle>
            <DialogDescription>Update GS focus, optional topic, and flags for this day.</DialogDescription>
          </DialogHeader>
          {editDay ? (
            <div className="space-y-3">
              <div>
                <Label className="text-xs">GS Focus</Label>
                <Input
                  defaultValue={editingDay?.gsFocus ?? ""}
                  placeholder="e.g. GS3 Agriculture — MSP"
                  onBlur={(e) => updateDayPlan(selectedMonth, editDay, { gsFocus: e.target.value })}
                />
              </div>
              <div>
                <Label className="text-xs">Optional Topic</Label>
                <Input
                  defaultValue={editingDay?.optionalTopic ?? ""}
                  placeholder="e.g. Sociology P2 — Caste"
                  onBlur={(e) => updateDayPlan(selectedMonth, editDay, { optionalTopic: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={!!editingDay?.revisionDue}
                    onCheckedChange={(v) => updateDayPlan(selectedMonth, editDay, { revisionDue: !!v })}
                  />
                  Revision due
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={!!editingDay?.hasTest}
                    onCheckedChange={(v) => updateDayPlan(selectedMonth, editDay, { hasTest: !!v })}
                  />
                  Test scheduled
                </label>
              </div>
              <div>
                <Label className="text-xs">Notes</Label>
                <Textarea
                  defaultValue={editingDay?.notes ?? ""}
                  placeholder="Notes for this day..."
                  rows={3}
                  onBlur={(e) => updateDayPlan(selectedMonth, editDay, { notes: e.target.value })}
                />
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
