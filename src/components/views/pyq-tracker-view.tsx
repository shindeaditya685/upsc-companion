"use client";

import { useMemo, useState } from "react";
import { FileQuestion, Plus, BookMarked } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAppStore } from "@/lib/store";
import type { PYQ } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PYQTrackerView() {
  const pyqTracker = useAppStore((s) => s.pyqTracker);
  const updatePYQ = useAppStore((s) => s.updatePYQ);
  const addPYQ = useAppStore((s) => s.addPYQ);
  const [adding, setAdding] = useState(false);
  const [filterTheme, setFilterTheme] = useState("all");
  const [filterYear, setFilterYear] = useState("all");
  const [filterPaper, setFilterPaper] = useState("all");

  const themes = useMemo(() => Array.from(new Set(pyqTracker.map((p) => p.theme))), [pyqTracker]);
  const years = useMemo(() => Array.from(new Set(pyqTracker.map((p) => p.year))).sort((a, b) => b - a), [pyqTracker]);
  const papers = useMemo(() => Array.from(new Set(pyqTracker.map((p) => p.paper))), [pyqTracker]);

  const filtered = useMemo(
    () =>
      pyqTracker.filter((p) => {
        if (filterTheme !== "all" && p.theme !== filterTheme) return false;
        if (filterYear !== "all" && String(p.year) !== filterYear) return false;
        if (filterPaper !== "all" && p.paper !== filterPaper) return false;
        return true;
      }),
    [pyqTracker, filterTheme, filterYear, filterPaper]
  );

  const stats = useMemo(() => {
    const total = pyqTracker.length;
    const attempted = pyqTracker.filter((p) => p.attempted).length;
    const evaluated = pyqTracker.filter((p) => p.evaluated).length;
    const inMistakeBook = pyqTracker.filter((p) => p.inMistakeBook).length;
    return { total, attempted, evaluated, inMistakeBook };
  }, [pyqTracker]);

  return (
    <div>
      <SectionHeader
        title="PYQ Tracker"
        subtitle="Previous Year Questions mapped to themes. Tick Attempted / Evaluated / Mistake Book. Filter by theme, year, paper to find patterns and weak areas."
        icon={<FileQuestion className="size-5" />}
        actions={
          <>
            <Badge className="bg-[#0f2d4a] text-[#fafaf7] hover:bg-[#0f2d4a]">
              {stats.attempted}/{stats.total} Attempted
            </Badge>
            <Badge className="bg-[#1f4d3a] text-[#fafaf7] hover:bg-[#1f4d3a]">
              {stats.evaluated} Evaluated
            </Badge>
            <Badge className="bg-[#b91c1c] text-[#fafaf7] hover:bg-[#b91c1c]">
              <BookMarked className="size-3 mr-1" />
              {stats.inMistakeBook} Mistake Book
            </Badge>
            <Button onClick={() => setAdding(true)} size="sm" className="bg-[#b8893a] hover:bg-[#a07a30] text-[#1a1a1a]">
              <Plus className="size-4 mr-1" /> Add PYQ
            </Button>
          </>
        }
      />

      {/* Filters */}
      <Card className="p-3 mb-3 flex flex-wrap gap-3 items-end bg-[#f5f1e6]">
        <div>
          <label className="text-[10px] uppercase tracking-wider text-[#5a5a5a]">Theme</label>
          <Select value={filterTheme} onValueChange={setFilterTheme}>
            <SelectTrigger className="w-[180px] h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All themes</SelectItem>
              {themes.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-wider text-[#5a5a5a]">Year</label>
          <Select value={filterYear} onValueChange={setFilterYear}>
            <SelectTrigger className="w-[100px] h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {years.map((y) => (
                <SelectItem key={y} value={String(y)}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-wider text-[#5a5a5a]">Paper</label>
          <Select value={filterPaper} onValueChange={setFilterPaper}>
            <SelectTrigger className="w-[100px] h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {papers.map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="text-xs text-[#5a5a5a] ml-auto">
          Showing <strong className="text-[#0f2d4a]">{filtered.length}</strong> of {pyqTracker.length}
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto scroll-thin">
          <table className="w-full text-sm">
            <thead className="bg-[#0f2d4a] text-[#fafaf7]">
              <tr>
                <th className="text-left px-3 py-3 font-semibold w-20">Year</th>
                <th className="text-left px-2 py-3 font-semibold w-20">Paper</th>
                <th className="text-left px-3 py-3 font-semibold min-w-[280px]">Question (abridged)</th>
                <th className="text-left px-3 py-3 font-semibold min-w-[180px]">Theme</th>
                <th className="text-center px-2 py-3 font-semibold w-20">Marks</th>
                <th className="text-center px-2 py-3 font-semibold w-24">Attempted</th>
                <th className="text-center px-2 py-3 font-semibold w-24">Evaluated</th>
                <th className="text-center px-3 py-3 font-semibold w-24">Mistake Book</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, idx) => (
                <tr key={p.id} className={cn("border-b border-border/60 last:border-b-0", idx % 2 ? "bg-[#fafaf7]" : "bg-white")}>
                  <td className="px-3 py-2.5 font-mono font-bold text-[#0f2d4a]">{p.year}</td>
                  <td className="px-2 py-2.5">
                    <Badge variant="outline" className="font-mono">{p.paper}</Badge>
                  </td>
                  <td className="px-3 py-2.5">
                    <Textarea
                      defaultValue={p.question}
                      rows={2}
                      className="text-xs resize-y border-0 px-0 focus-visible:ring-0"
                      onBlur={(e) => updatePYQ(p.id, { question: e.target.value })}
                    />
                  </td>
                  <td className="px-3 py-2.5 text-xs text-[#5a5a5a]">{p.theme}</td>
                  <td className="px-2 py-2.5 text-center">
                    <Input
                      type="number"
                      value={p.marks}
                      onChange={(e) => updatePYQ(p.id, { marks: Number(e.target.value) })}
                      className="h-7 w-14 text-center mx-auto"
                    />
                  </td>
                  <td className="px-2 py-2.5 text-center">
                    <Checkbox
                      checked={p.attempted}
                      onCheckedChange={(v) => updatePYQ(p.id, { attempted: !!v })}
                    />
                  </td>
                  <td className="px-2 py-2.5 text-center">
                    <Checkbox
                      checked={p.evaluated}
                      onCheckedChange={(v) => updatePYQ(p.id, { evaluated: !!v })}
                    />
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <Checkbox
                      checked={p.inMistakeBook}
                      onCheckedChange={(v) => updatePYQ(p.id, { inMistakeBook: !!v })}
                    />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-3 py-8 text-center text-[#5a5a5a]">
                    No PYQs match the current filters.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="text-xs text-[#5a5a5a] mt-3">
        The Agriculture cluster (2018-2023) is pre-populated as the worked example — MSP, Food Security, FCI, DFI, IFS. Filter by theme to spot high-frequency topics (Rule 5 — High-Yield Priority uses PYQ frequency to choose between equal-length themes).
      </p>

      <AddPYQDialog open={adding} onOpenChange={setAdding} onAdd={addPYQ} />
    </div>
  );
}

function AddPYQDialog({
  open,
  onOpenChange,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAdd: (p: PYQ) => void;
}) {
  const [year, setYear] = useState(2023);
  const [paper, setPaper] = useState("GS3");
  const [question, setQuestion] = useState("");
  const [theme, setTheme] = useState("");
  const [marks, setMarks] = useState(15);

  const submit = () => {
    if (!question.trim()) return;
    onAdd({
      id: `p${Date.now()}`,
      year, paper, question, theme, marks,
      attempted: false, evaluated: false, inMistakeBook: false,
    });
    setQuestion("");
    setTheme("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add PYQ</DialogTitle>
          <DialogDescription>Capture a previous year question with theme + marks.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs">Year</label>
            <Input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} />
          </div>
          <div>
            <label className="text-xs">Paper</label>
            <Select value={paper} onValueChange={setPaper}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["GS1", "GS2", "GS3", "GS4", "Essay", "Optional P1", "Optional P2"].map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs">Marks</label>
            <Input type="number" value={marks} onChange={(e) => setMarks(Number(e.target.value))} />
          </div>
        </div>
        <div>
          <label className="text-xs">Question (abridged)</label>
          <Textarea rows={3} value={question} onChange={(e) => setQuestion(e.target.value)} />
        </div>
        <div>
          <label className="text-xs">Theme</label>
          <Input value={theme} onChange={(e) => setTheme(e.target.value)} placeholder="e.g. Agriculture — MSP" />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={submit} className="bg-[#0f2d4a] hover:bg-[#1a3d5e] text-[#fafaf7]">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
