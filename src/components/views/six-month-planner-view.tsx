"use client";

import { useState } from "react";
import { CalendarRange, Info } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import type { WeekPlan, Phase } from "@/lib/types";

const phaseClass: Record<Phase, string> = {
  "Phase 1": "phase-1",
  "Phase 2": "phase-2",
  "Phase 3": "phase-3",
  Buffer: "phase-buffer",
};

const phaseBadge: Record<Phase, string> = {
  "Phase 1": "bg-[#0f2d4a] text-[#fafaf7]",
  "Phase 2": "bg-[#b8893a] text-[#1a1a1a]",
  "Phase 3": "bg-[#1f4d3a] text-[#fafaf7]",
  Buffer: "bg-[#8a8a8a] text-[#fafaf7]",
};

export function SixMonthPlannerView() {
  const plan = useAppStore((s) => s.sixMonthPlan);
  const [selectedWeek, setSelectedWeek] = useState<WeekPlan | null>(null);

  const phase1Count = plan.filter((w) => w.phase === "Phase 1").length;
  const phase2Count = plan.filter((w) => w.phase === "Phase 2").length;
  const phase3Count = plan.filter((w) => w.phase === "Phase 3").length;
  const bufferCount = plan.filter((w) => w.phase === "Buffer").length;

  return (
    <div>
      <SectionHeader
        title="Six-Month Sprint Planner"
        subtitle="26-week sprint from 1 July 2026 to 14 December 2026 — GS1→GS2→GS3→GS4 weak-first sequencing with Sociology optional parallel."
        icon={<CalendarRange className="size-5" />}
      />

      {plan.length === 0 ? (
        <Card className="p-8 text-center text-[#5a5a5a]">
          No weeks planned yet. Use the Daily/Weekly planners to build your six-month sprint.
        </Card>
      ) : (
        <>
      {/* Phase legend */}
      <div className="flex flex-wrap gap-2 mb-4 text-xs">
        <span className="phase-1 px-3 py-1 rounded">Phase 1 · Foundation ({phase1Count} wks)</span>
        <span className="phase-2 px-3 py-1 rounded">Phase 2 · Intensive ({phase2Count} wks)</span>
        <span className="phase-3 px-3 py-1 rounded">Phase 3 · Mocks ({phase3Count} wks)</span>
        <span className="phase-buffer border border-border px-3 py-1 rounded">
          Buffer ({bufferCount} wks)
        </span>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto scroll-thin">
          <table className="w-full text-sm">
            <thead className="bg-[#0f2d4a] text-[#fafaf7]">
              <tr>
                <th className="text-left px-3 py-3 font-semibold w-20">Week #</th>
                <th className="text-left px-3 py-3 font-semibold w-32">Dates</th>
                <th className="text-left px-3 py-3 font-semibold w-24">Phase</th>
                <th className="text-left px-3 py-3 font-semibold">GS Subject Focus</th>
                <th className="text-left px-3 py-3 font-semibold">Optional Parallel Topic</th>
              </tr>
            </thead>
            <tbody>
              {plan.map((w, idx) => (
                <tr
                  key={w.id}
                  onClick={() => setSelectedWeek(w)}
                  className={cn(
                    "cursor-pointer border-b border-border/60 last:border-b-0 hover:ring-2 hover:ring-inset hover:ring-[#b8893a]/50 transition-all",
                    idx % 2 === 1 ? "bg-[#fafaf7]" : "bg-white"
                  )}
                >
                  <td className="px-3 py-3">
                    <span className="font-semibold text-[#0f2d4a]">{w.label}</span>
                  </td>
                  <td className="px-3 py-3 text-[#5a5a5a] font-mono text-xs">{w.dates}</td>
                  <td className="px-3 py-3">
                    <span className={cn("text-[10px] px-2 py-0.5 rounded font-semibold", phaseBadge[w.phase])}>
                      {w.phase}
                    </span>
                  </td>
                  <td className="px-3 py-3">{w.gsFocus}</td>
                  <td className="px-3 py-3 text-[#5a5a5a]">{w.optionalTopic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="text-xs text-[#5a5a5a] mt-3 flex items-start gap-1.5">
        <Info className="size-3.5 mt-0.5 shrink-0" />
        Click any week to see its detail. Buffer weeks are catch-up / consolidation windows — R2 of notes, first full mocks, etc. The sprint ends 14 Dec 2026 with a light revision-only Week 21 to sync sleep cycle.
      </p>

      <Dialog open={!!selectedWeek} onOpenChange={() => setSelectedWeek(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span>{selectedWeek?.label}</span>
              <span className="text-xs font-normal text-[#5a5a5a]">· {selectedWeek?.dates}</span>
              <Badge className={phaseBadge[selectedWeek?.phase ?? "Buffer"]}>
                {selectedWeek?.phase}
              </Badge>
            </DialogTitle>
            <DialogDescription>
              Week detail — adjust the plan in your Daily / Weekly planners.
            </DialogDescription>
          </DialogHeader>
          {selectedWeek ? (
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#5a5a5a] mb-1">
                  GS Subject Focus
                </div>
                <div className={cn("rounded-md p-3", phaseClass[selectedWeek.phase])}>
                  {selectedWeek.gsFocus}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#5a5a5a] mb-1">
                  Optional Parallel Topic
                </div>
                <div className="rounded-md p-3 bg-[#f5f1e6] border border-border">
                  {selectedWeek.optionalTopic}
                </div>
              </div>
              {selectedWeek.phase === "Buffer" ? (
                <div className="text-xs text-[#5a5a5a] bg-[#f5f1e6] border border-border rounded p-2">
                  <strong>Buffer week:</strong> Use for R2 of last phase's notes, catch-up on slipped themes, and the first full mock test.
                </div>
              ) : null}
              {selectedWeek.phase === "Phase 3" ? (
                <div className="text-xs text-[#fafaf7] bg-[#1f4d3a] rounded p-2">
                  <strong>Phase 3:</strong> Mock marathon — full GS set + Essay + Optional mocks. No new content.
                </div>
              ) : null}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
    )}
    </div>
  );
}
