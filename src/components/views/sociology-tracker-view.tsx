"use client";

import { useMemo } from "react";
import { GraduationCap } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppStore, computeSociologyMaturity } from "@/lib/store";
import { ProgressBar } from "@/components/shared/progress-bar";
import { cn } from "@/lib/utils";

export function SociologyTrackerView() {
  const sociologyTracker = useAppStore((s) => s.sociologyTracker);
  const updateSociologyUnit = useAppStore((s) => s.updateSociologyUnit);

  const p1 = useMemo(() => sociologyTracker.filter((u) => u.paper === "P1"), [sociologyTracker]);
  const p2 = useMemo(() => sociologyTracker.filter((u) => u.paper === "P2"), [sociologyTracker]);

  const avgMaturity = (arr: typeof sociologyTracker) =>
    arr.length === 0 ? 0 : Math.round(arr.reduce((s, u) => s + computeSociologyMaturity(u), 0) / arr.length);

  const renderTable = (units: typeof sociologyTracker) => (
    units.length === 0 ? (
      <Card className="p-8 text-center text-[#5a5a5a]">
        No units yet. Add Sociology units to track your optional preparation.
      </Card>
    ) : (
    <Card className="p-0 overflow-hidden">
      <div className="overflow-x-auto scroll-thin">
        <table className="w-full text-sm">
          <thead className="bg-[#0f2d4a] text-[#fafaf7]">
            <tr>
              <th className="text-left px-3 py-3 font-semibold min-w-[60px]">Unit</th>
              <th className="text-left px-3 py-3 font-semibold min-w-[220px]">Name</th>
              <th className="text-center px-2 py-3 font-semibold">Notes ✓</th>
              <th className="text-center px-2 py-3 font-semibold">Value Add ✓</th>
              <th className="text-center px-2 py-3 font-semibold w-24">AW Count</th>
              <th className="text-center px-2 py-3 font-semibold">R1 ✓</th>
              <th className="text-center px-2 py-3 font-semibold">R2 ✓</th>
              <th className="text-center px-2 py-3 font-semibold">Test ✓</th>
              <th className="text-left px-3 py-3 font-semibold min-w-[160px]">Maturity</th>
            </tr>
          </thead>
          <tbody>
            {units.map((u, idx) => {
              const m = computeSociologyMaturity(u);
              return (
                <tr key={u.id} className={cn("border-b border-border/60 last:border-b-0", idx % 2 ? "bg-[#fafaf7]" : "bg-white")}>
                  <td className="px-3 py-2.5 text-center font-mono font-bold text-[#0f2d4a]">
                    U{u.unitNumber}
                  </td>
                  <td className="px-3 py-2.5 font-medium text-[#0f2d4a]">{u.unitName}</td>
                  <td className="px-2 py-2.5 text-center">
                    <Checkbox
                      checked={u.notesDone}
                      onCheckedChange={(v) => updateSociologyUnit(u.id, { notesDone: !!v })}
                    />
                  </td>
                  <td className="px-2 py-2.5 text-center">
                    <Checkbox
                      checked={u.valueAdd}
                      onCheckedChange={(v) => updateSociologyUnit(u.id, { valueAdd: !!v })}
                    />
                  </td>
                  <td className="px-2 py-2.5 text-center">
                    <Input
                      type="number"
                      min={0}
                      value={u.answerWritingCount}
                      onChange={(e) => updateSociologyUnit(u.id, { answerWritingCount: Number(e.target.value) })}
                      className="h-7 w-16 text-center mx-auto"
                    />
                  </td>
                  <td className="px-2 py-2.5 text-center">
                    <Checkbox
                      checked={u.r1Done}
                      onCheckedChange={(v) => updateSociologyUnit(u.id, { r1Done: !!v })}
                    />
                  </td>
                  <td className="px-2 py-2.5 text-center">
                    <Checkbox
                      checked={u.r2Done}
                      onCheckedChange={(v) => updateSociologyUnit(u.id, { r2Done: !!v })}
                    />
                  </td>
                  <td className="px-2 py-2.5 text-center">
                    <Checkbox
                      checked={u.testDone}
                      onCheckedChange={(v) => updateSociologyUnit(u.id, { testDone: !!v })}
                    />
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <ProgressBar
                        value={m}
                        variant={m >= 80 ? "green" : m >= 50 ? "gold" : "red"}
                        size="sm"
                      />
                      <span className="text-xs font-bold text-[#0f2d4a] min-w-[2.5rem] text-right">{m}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
    )
  );

  return (
    <div>
      <SectionHeader
        title="Sociology Optional Tracker"
        subtitle="Paper 1 (Sociological Thinkers, Discipline, Stratification...) and Paper 2 (Indian Society — Caste, Tribes, Rural...). P2 begins Week 11."
        icon={<GraduationCap className="size-5" />}
      />

      <Tabs defaultValue="P1">
        <TabsList className="bg-[#f5f1e6]">
          <TabsTrigger value="P1">
            Paper 1 — Sociological Theory ({avgMaturity(p1)}%)
          </TabsTrigger>
          <TabsTrigger value="P2">
            Paper 2 — Indian Society ({avgMaturity(p2)}%)
          </TabsTrigger>
        </TabsList>
        <TabsContent value="P1" className="mt-4">
          {renderTable(p1)}
        </TabsContent>
        <TabsContent value="P2" className="mt-4">
          {renderTable(p2)}
        </TabsContent>
      </Tabs>

      <p className="text-xs text-[#5a5a5a] mt-3">
        Maturity is computed from 6 indicators (5 binary + Answer Writing count capped at 3). "Mastered" requires ≥80% plus R1, R2 and Test all ✓.
      </p>
    </div>
  );
}
