"use client";

import { useMemo, useState } from "react";
import { ClipboardList, ChevronRight, Activity, CheckCircle2, Plus } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { useAppStore } from "@/lib/store";
import type { TestEntry } from "@/lib/types";
import { cn } from "@/lib/utils";

const DIMENSION_LABELS: Record<keyof TestEntry["dimensions"], string> = {
  weakDimensions: "Weak Dimensions",
  weakContent: "Weak Content",
  poorIntros: "Poor Intros",
  poorConclusions: "Poor Conclusions",
  lackOfData: "Lack of Data",
  multiDimensional: "Multi-Dimensional",
  timeManagement: "Time Mgmt",
};

export function TestAnalysisView() {
  const testAnalysis = useAppStore((s) => s.testAnalysis);
  const updateTestEntry = useAppStore((s) => s.updateTestEntry);
  const [selectedId, setSelectedId] = useState<string | null>(
    testAnalysis[0]?.id ?? null
  );
  const [adding, setAdding] = useState(false);
  const addTestEntry = useAppStore((s) => s.addTestEntry);

  const selected = useMemo(
    () => testAnalysis.find((t) => t.id === selectedId) ?? null,
    [testAnalysis, selectedId]
  );

  const chartData = useMemo(() => {
    if (!selected) return [];
    return (Object.keys(DIMENSION_LABELS) as (keyof TestEntry["dimensions"])[]).map((k) => ({
      dimension: DIMENSION_LABELS[k],
      score: selected.dimensions[k],
    }));
  }, [selected]);

  const chartConfig: ChartConfig = {
    score: { label: "Score", color: "#b8893a" },
  };

  const aggregateScore = useMemo(() => {
    if (!selected) return 0;
    const sum = Object.values(selected.dimensions).reduce((a, b) => a + b, 0);
    return Math.round((sum / (7 * 5)) * 100);
  }, [selected]);

  const updateDim = (key: keyof TestEntry["dimensions"], value: number) => {
    if (!selected) return;
    updateTestEntry(selected.id, {
      dimensions: { ...selected.dimensions, [key]: value },
    });
  };
  const updateDiag = (key: keyof TestEntry["diagnosis"], value: string) => {
    if (!selected) return;
    updateTestEntry(selected.id, {
      diagnosis: { ...selected.diagnosis, [key]: value },
    });
  };

  return (
    <div>
      <SectionHeader
        title="Test Analysis"
        subtitle="Per-test 7-dimension scoring (1-5) with diagnosis and corrective actions. Radar chart shows your weakest dimensions — focus corrective actions there."
        icon={<ClipboardList className="size-5" />}
        actions={
          <Button onClick={() => setAdding(true)} size="sm" className="bg-[#0f2d4a] hover:bg-[#1a3d5e] text-[#fafaf7]">
            <Plus className="size-4 mr-1" /> Log Test
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Test list */}
        <Card className="p-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5a5a5a] mb-2 px-1">
            Tests Taken ({testAnalysis.length})
          </h3>
          <div className="space-y-1.5 max-h-[640px] overflow-y-auto scroll-thin pr-1">
            {testAnalysis.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedId(t.id)}
                className={cn(
                  "w-full text-left p-3 rounded-md border transition-all",
                  selectedId === t.id
                    ? "border-[#b8893a] bg-[#fef9ec]"
                    : "border-border bg-white hover:border-[#b8893a]/50"
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-[#0f2d4a]">{t.subject}</span>
                  <Badge className="bg-[#0f2d4a] text-[#fafaf7] hover:bg-[#0f2d4a]">{t.score}/100</Badge>
                </div>
                <div className="text-[10px] text-[#5a5a5a]">
                  {t.date} · {t.type}
                </div>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {t.weakDimensions.map((w) => (
                    <span key={w} className="text-[9px] bg-[#b91c1c]/10 text-[#b91c1c] px-1.5 py-0.5 rounded">
                      {w}
                    </span>
                  ))}
                </div>
              </button>
            ))}
            {testAnalysis.length === 0 ? (
              <div className="text-xs text-[#5a5a5a] p-4 text-center">No tests logged yet.</div>
            ) : null}
          </div>
        </Card>

        {/* Detail view */}
        <Card className="lg:col-span-2 p-5">
          {selected ? (
            <>
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <div>
                  <h2 className="text-xl font-bold font-serif text-[#0f2d4a]">{selected.subject}</h2>
                  <div className="text-xs text-[#5a5a5a]">{selected.date} · {selected.type}</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-[#0f2d4a] font-serif">{aggregateScore}%</div>
                  <div className="text-[10px] text-[#5a5a5a] uppercase tracking-wider">Aggregate</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Radar */}
                <div>
                  <h4 className="text-xs font-semibold text-[#0f2d4a] mb-2 flex items-center gap-1">
                    <Activity className="size-3.5" /> 7-Dimension Radar
                  </h4>
                  <ChartContainer config={chartConfig} className="h-[260px] w-full">
                    <RadarChart data={chartData}>
                      <PolarGrid stroke="#c8b988" />
                      <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 10, fill: "#5a5a5a" }} />
                      <PolarRadiusAxis domain={[0, 5]} tick={{ fontSize: 9 }} />
                      <Radar dataKey="score" stroke="#0f2d4a" fill="#b8893a" fillOpacity={0.4} />
                    </RadarChart>
                  </ChartContainer>
                </div>

                {/* Sliders + diagnosis */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-[#0f2d4a] mb-1 flex items-center gap-1">
                    <ChevronRight className="size-3.5" /> Score Each Dimension (1-5)
                  </h4>
                  {(Object.keys(DIMENSION_LABELS) as (keyof TestEntry["dimensions"])[]).map((k) => (
                    <div key={k} className="border-b border-border/60 pb-1.5">
                      <div className="flex items-center justify-between text-[11px] mb-0.5">
                        <span className="text-[#5a5a5a]">{DIMENSION_LABELS[k]}</span>
                        <span className="font-bold text-[#0f2d4a]">{selected.dimensions[k]}/5</span>
                      </div>
                      <Slider
                        value={[selected.dimensions[k]]}
                        min={1}
                        max={5}
                        step={1}
                        onValueChange={(v) => updateDim(k, v[0])}
                        className="mt-1"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Diagnosis textareas */}
              <div className="mt-4">
                <h4 className="text-xs font-semibold text-[#0f2d4a] mb-2">Diagnosis & Corrective Actions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {(Object.keys(DIMENSION_LABELS) as (keyof TestEntry["diagnosis"])[]).map((k) => (
                    <div key={k}>
                      <label className="text-[10px] uppercase tracking-wider text-[#5a5a5a]">
                        {DIMENSION_LABELS[k]}
                      </label>
                      <Textarea
                        defaultValue={selected.diagnosis[k]}
                        rows={2}
                        className="text-xs resize-y"
                        onBlur={(e) => updateDiag(k, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <label className="text-[10px] uppercase tracking-wider text-[#5a5a5a]">
                    Corrective Actions (one per line)
                  </label>
                  <Textarea
                    defaultValue={selected.correctiveActions.join("\n")}
                    rows={4}
                    className="text-xs resize-y"
                    onBlur={(e) => {
                      const actions = e.target.value.split("\n").filter(Boolean);
                      updateTestEntry(selected.id, { correctiveActions: actions });
                    }}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-[#5a5a5a] py-12">
              <CheckCircle2 className="size-10 mx-auto mb-3 opacity-50" />
              Select a test from the left to view its analysis.
            </div>
          )}
        </Card>
      </div>

      <AddTestDialog open={adding} onOpenChange={setAdding} onAdd={addTestEntry} />
    </div>
  );
}

function AddTestDialog({
  open,
  onOpenChange,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAdd: (t: TestEntry) => void;
}) {
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("Sectional test");
  const submit = () => {
    if (!subject.trim()) return;
    onAdd({
      id: `te${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      subject,
      type,
      score: 0,
      weakDimensions: [],
      dimensions: { weakDimensions: 3, weakContent: 3, poorIntros: 3, poorConclusions: 3, lackOfData: 3, multiDimensional: 3, timeManagement: 3 },
      diagnosis: { weakDimensions: "", weakContent: "", poorIntros: "", poorConclusions: "", lackOfData: "", multiDimensional: "", timeManagement: "" },
      correctiveActions: [],
    });
    setSubject("");
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Log Test</DialogTitle>
          <DialogDescription>Add a test result. Scores and diagnosis can be filled in the detail view.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <div>
            <Label className="text-xs">Subject / Paper</Label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. GS3 Agriculture" />
          </div>
          <div>
            <Label className="text-xs">Type</Label>
            <Input value={type} onChange={(e) => setType(e.target.value)} placeholder="e.g. Sectional test, Full mock" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={submit} className="bg-[#0f2d4a] hover:bg-[#1a3d5e] text-[#fafaf7]">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
