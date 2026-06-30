"use client";

import { useMemo } from "react";
import { CalendarClock, Sun, CloudSun, Moon, Repeat } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from "@/lib/store";
import type { SlotKey } from "@/lib/types";
import { cn } from "@/lib/utils";

const slotIcon: Record<SlotKey, React.ReactNode> = {
  morning: <Sun className="size-3.5 text-[#b8893a]" />,
  afternoon: <CloudSun className="size-3.5 text-[#b8893a]" />,
  evening: <Moon className="size-3.5 text-[#0f2d4a]" />,
};

const slotLabel: Record<SlotKey, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
};

export function WeeklyPlannerView() {
  const weeklyPlans = useAppStore((s) => s.weeklyPlans);
  const sixMonthPlan = useAppStore((s) => s.sixMonthPlan);
  const selectedWeek = useAppStore((s) => s.selectedWeek);
  const setSelectedWeek = useAppStore((s) => s.setSelectedWeek);
  const updateWeeklySlot = useAppStore((s) => s.updateWeeklySlot);
  const updateWeeklyRevision = useAppStore((s) => s.updateWeeklyRevision);

  const plan = useMemo(
    () => weeklyPlans.find((w) => w.weekId === selectedWeek) ?? weeklyPlans[0],
    [weeklyPlans, selectedWeek]
  );

  const weekMeta = useMemo(
    () => sixMonthPlan.find((w) => w.weekNumber === plan?.weekId),
    [sixMonthPlan, plan]
  );

  // Options for week selector — only standard weeks (not buffer)
  const weekOptions = useMemo(
    () => sixMonthPlan.filter((w) => !w.label.includes("BUFFER")),
    [sixMonthPlan]
  );

  if (!plan) {
    return (
      <div>
        <SectionHeader title="Weekly Planner" icon={<CalendarClock className="size-5" />} />
        <Card className="p-6">No weekly plan available.</Card>
      </div>
    );
  }

  return (
    <div>
      <SectionHeader
        title="Weekly Planner"
        subtitle="7-day template with Morning (3h), Afternoon (3h) and Evening (2h) slots. Revision reminder column on the right. Edit any field — changes save automatically."
        icon={<CalendarClock className="size-5" />}
        actions={
          <Select value={String(plan.weekId)} onValueChange={(v) => setSelectedWeek(Number(v))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {weekOptions.map((w) => (
                <SelectItem key={w.id} value={String(w.weekNumber)}>
                  {w.label} · {w.dates}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
      />

      {weekMeta ? (
        <Card className="p-4 mb-4 bg-[#0f2d4a] text-[#fafaf7] border-0">
          <div className="flex flex-wrap gap-x-8 gap-y-1 text-xs">
            <div>
              <span className="text-[#c8b988]">Dates:</span>{" "}
              <span className="font-mono">{weekMeta.dates}</span>
            </div>
            <div>
              <span className="text-[#c8b988]">Phase:</span>{" "}
              <span className="font-semibold">{weekMeta.phase}</span>
            </div>
            <div>
              <span className="text-[#c8b988]">GS focus:</span>{" "}
              <span>{weekMeta.gsFocus}</span>
            </div>
            <div>
              <span className="text-[#c8b988]">Optional:</span>{" "}
              <span>{weekMeta.optionalTopic}</span>
            </div>
          </div>
        </Card>
      ) : null}

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto scroll-thin">
          <table className="w-full text-sm">
            <thead className="bg-[#f5f1e6] text-[#0f2d4a]">
              <tr>
                <th className="text-left px-3 py-3 font-semibold w-24">Day</th>
                <th className="text-left px-3 py-3 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Sun className="size-3.5 text-[#b8893a]" /> Morning (3 hr)
                  </span>
                </th>
                <th className="text-left px-3 py-3 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <CloudSun className="size-3.5 text-[#b8893a]" /> Afternoon (3 hr)
                  </span>
                </th>
                <th className="text-left px-3 py-3 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Moon className="size-3.5 text-[#0f2d4a]" /> Evening (2 hr)
                  </span>
                </th>
                <th className="text-left px-3 py-3 font-semibold w-48">
                  <span className="flex items-center gap-1.5">
                    <Repeat className="size-3.5 text-[#b91c1c]" /> Revision Reminder
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {plan.days.map((d) => (
                <tr key={d.dayNumber} className="border-b border-border/60 last:border-b-0">
                  <td className="px-3 py-2 align-top">
                    <div className="font-semibold text-[#0f2d4a]">{d.dayName}</div>
                    <div className="text-[10px] text-[#5a5a5a]">Day {d.dayNumber}</div>
                  </td>
                  {(["morning", "afternoon", "evening"] as SlotKey[]).map((sk) => (
                    <td key={sk} className="px-3 py-2 align-top">
                      <div className="flex items-center gap-1 text-[10px] text-[#5a5a5a] mb-1">
                        {slotIcon[sk]}
                        <span>{slotLabel[sk]} · {d.slots[sk].label.replace(/.*\((.+)\)/, "$1")}</span>
                      </div>
                      <Textarea
                        defaultValue={d.slots[sk].content}
                        rows={2}
                        className="text-xs min-h-[60px] resize-y border-border/70 focus-visible:ring-[#b8893a]"
                        onBlur={(e) =>
                          updateWeeklySlot(plan.weekId, d.dayNumber, sk, e.target.value)
                        }
                      />
                    </td>
                  ))}
                  <td className="px-3 py-2 align-top">
                    <Input
                      defaultValue={d.revisionReminder ?? ""}
                      placeholder="—"
                      className={cn(
                        "text-xs",
                        d.revisionReminder && d.revisionReminder !== "—" && d.revisionReminder !== ""
                          ? "border-[#b91c1c]/40 bg-[#fef2f2]"
                          : ""
                      )}
                      onBlur={(e) => updateWeeklyRevision(plan.weekId, d.dayNumber, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="text-xs text-[#5a5a5a] mt-3">
        <strong>Weekly template:</strong> Day 1 (Mon) = PYQ analysis · Days 2-5 (Tue-Fri) = theme-wise study + Level-1 notes · Day 6 (Sat) = current affairs integration · Day 7 (Sun) = sectional test (2.5h) + evaluation (1h) + AI mentor review (1.5h).
      </p>
    </div>
  );
}
