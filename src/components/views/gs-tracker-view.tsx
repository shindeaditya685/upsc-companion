"use client";

import { useMemo, Fragment } from "react";
import { BookOpenCheck, AlertTriangle } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore, computeGSMaturity } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ProgressBar } from "@/components/shared/progress-bar";

export function GSTrackerView() {
  const gsTracker = useAppStore((s) => s.gsTracker);
  const updateGSSubject = useAppStore((s) => s.updateGSSubject);

  const grouped = useMemo(() => {
    const out: Record<string, typeof gsTracker> = {};
    for (const g of gsTracker) {
      out[g.paper] = out[g.paper] ?? [];
      out[g.paper].push(g);
    }
    return out;
  }, [gsTracker]);

  const avgMaturity = useMemo(() => {
    if (gsTracker.length === 0) return 0;
    return Math.round(gsTracker.reduce((s, g) => s + computeGSMaturity(g), 0) / gsTracker.length);
  }, [gsTracker]);

  const redCount = useMemo(
    () => gsTracker.filter((g) => computeGSMaturity(g) < 60).length,
    [gsTracker]
  );

  const updateField = (id: string, field: "readingDone" | "notesDone" | "pyqMapped" | "answerWriting", value: number) => {
    updateGSSubject(id, { [field]: value });
  };

  return (
    <div>
      <SectionHeader
        title="GS Tracker"
        subtitle="Per-subject maturity across Reading · Notes · PYQ Mapping · Answer Writing. Maturity = (sum ÷ themesTotal×4) × 100. Rows below 60% highlight red."
        icon={<BookOpenCheck className="size-5" />}
        actions={
          <div className="flex items-center gap-3 text-xs">
            <div className="text-[#5a5a5a]">
              Avg: <span className="font-bold text-[#0f2d4a]">{avgMaturity}%</span>
            </div>
            <div className="text-[#5a5a5a]">
              Red: <span className="font-bold text-[#b91c1c]">{redCount}</span>
            </div>
          </div>
        }
      />

      {gsTracker.length === 0 ? (
        <Card className="p-8 text-center text-[#5a5a5a]">
          No GS subjects tracked yet. Add subjects to start tracking your maturity.
        </Card>
      ) : (
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto scroll-thin">
          <table className="w-full text-sm">
            <thead className="bg-[#0f2d4a] text-[#fafaf7]">
              <tr>
                <th className="text-left px-3 py-3 font-semibold min-w-[180px]">GS Paper / Subject</th>
                <th className="text-center px-2 py-3 font-semibold w-20">Themes Total</th>
                <th className="text-center px-2 py-3 font-semibold w-24">Reading Done</th>
                <th className="text-center px-2 py-3 font-semibold w-24">Notes Done</th>
                <th className="text-center px-2 py-3 font-semibold w-24">PYQ Mapped</th>
                <th className="text-center px-2 py-3 font-semibold w-28">Answer Writing</th>
                <th className="text-left px-3 py-3 font-semibold min-w-[180px]">Maturity %</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(grouped).map(([paper, subjects]) => (
                <Fragment key={paper}>
                  <tr className="bg-[#f5f1e6]">
                    <td colSpan={7} className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0f2d4a]">
                      {paper}
                    </td>
                  </tr>
                  {subjects.map((g) => {
                    const m = computeGSMaturity(g);
                    const red = m < 60;
                    return (
                      <tr
                        key={g.id}
                        className={cn(
                          "border-b border-border/60 last:border-b-0",
                          red ? "row-red" : "bg-white"
                        )}
                      >
                        <td className="px-3 py-2.5">
                          <div className="font-medium text-[#0f2d4a]">{g.name}</div>
                          {red ? (
                            <div className="text-[10px] text-[#b91c1c] flex items-center gap-1 mt-0.5">
                              <AlertTriangle className="size-3" />
                              Below 60% — prioritise this week
                            </div>
                          ) : null}
                        </td>
                        <td className="px-2 py-2.5 text-center">
                          <Input
                            type="number"
                            min={0}
                            value={g.themesTotal}
                            onChange={(e) => updateGSSubject(g.id, { themesTotal: Number(e.target.value) })}
                            className="h-7 w-14 text-center mx-auto"
                          />
                        </td>
                        <td className="px-2 py-2.5 text-center">
                          <Input
                            type="number"
                            min={0}
                            max={g.themesTotal}
                            value={g.readingDone}
                            onChange={(e) => updateField(g.id, "readingDone", Number(e.target.value))}
                            className="h-7 w-16 text-center mx-auto"
                          />
                        </td>
                        <td className="px-2 py-2.5 text-center">
                          <Input
                            type="number"
                            min={0}
                            max={g.themesTotal}
                            value={g.notesDone}
                            onChange={(e) => updateField(g.id, "notesDone", Number(e.target.value))}
                            className="h-7 w-16 text-center mx-auto"
                          />
                        </td>
                        <td className="px-2 py-2.5 text-center">
                          <Input
                            type="number"
                            min={0}
                            max={g.themesTotal}
                            value={g.pyqMapped}
                            onChange={(e) => updateField(g.id, "pyqMapped", Number(e.target.value))}
                            className="h-7 w-16 text-center mx-auto"
                          />
                        </td>
                        <td className="px-2 py-2.5 text-center">
                          <Input
                            type="number"
                            min={0}
                            max={g.themesTotal}
                            value={g.answerWriting}
                            onChange={(e) => updateField(g.id, "answerWriting", Number(e.target.value))}
                            className="h-7 w-16 text-center mx-auto"
                          />
                        </td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <ProgressBar
                              value={m}
                              variant={red ? "red" : m >= 75 ? "green" : "gold"}
                              size="sm"
                            />
                            <span className={cn("text-xs font-bold min-w-[2.5rem] text-right", red ? "text-[#b91c1c]" : "text-[#0f2d4a]")}>
                              {m}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      )}

      <p className="text-xs text-[#5a5a5a] mt-3">
        Red-highlighted rows (maturity &lt; 60%) are your priority next-week targets. Sociology P2 (caste onward) starts in Week 11.
      </p>
    </div>
  );
}
