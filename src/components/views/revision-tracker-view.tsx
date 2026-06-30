"use client";

import { useMemo, useState } from "react";
import { Repeat, Plus, AlertTriangle, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAppStore, addDays, isOverdue } from "@/lib/store";
import type { RevisionEntry } from "@/lib/types";
import { cn } from "@/lib/utils";

const INTERVALS = [7, 21, 45, 90];

export function RevisionTrackerView() {
  const revisionTracker = useAppStore((s) => s.revisionTracker);
  const updateRevisionEntry = useAppStore((s) => s.updateRevisionEntry);
  const addRevisionEntry = useAppStore((s) => s.addRevisionEntry);
  const [adding, setAdding] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  const sorted = useMemo(
    () => [...revisionTracker].sort((a, b) => a.noteDate.localeCompare(b.noteDate)),
    [revisionTracker]
  );

  const overdueCount = useMemo(
    () =>
      revisionTracker.filter((r) => {
        const r1Due = addDays(r.noteDate, INTERVALS[0]);
        return !r.r1Done && isOverdue(r1Due);
      }).length,
    [revisionTracker]
  );

  return (
    <div>
      <SectionHeader
        title="Revision Tracker"
        subtitle="Spaced-repetition schedule: R1 (+7d) · R2 (+21d) · R3 (+45d) · R4 (+90d). Overdue rows highlight red. Rule 1 (Protect Revision Windows) — never move these for new content."
        icon={<Repeat className="size-5" />}
        actions={
          <>
            <Badge variant={overdueCount > 0 ? "destructive" : "secondary"}>
              {overdueCount} Overdue
            </Badge>
            <Button onClick={() => setAdding(true)} size="sm" className="bg-[#0f2d4a] hover:bg-[#1a3d5e] text-[#fafaf7]">
              <Plus className="size-4 mr-1" /> Add Revision Entry
            </Button>
          </>
        }
      />

      {revisionTracker.length === 0 ? (
        <Card className="p-8 text-center text-[#5a5a5a]">
          No revision entries yet. Click <strong>Add Revision Entry</strong> to start your spaced-repetition schedule.
        </Card>
      ) : (
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto scroll-thin">
          <table className="w-full text-sm">
            <thead className="bg-[#0f2d4a] text-[#fafaf7]">
              <tr>
                <th className="text-left px-3 py-3 font-semibold min-w-[200px]">Topic</th>
                <th className="text-left px-2 py-3 font-semibold w-32">Note Date</th>
                <th className="text-left px-2 py-3 font-semibold w-32">R1 Due</th>
                <th className="text-center px-2 py-3 font-semibold w-20">R1 Done</th>
                <th className="text-left px-2 py-3 font-semibold w-32">R2 Due</th>
                <th className="text-center px-2 py-3 font-semibold w-20">R2 Done</th>
                <th className="text-left px-2 py-3 font-semibold w-32">R3 Due</th>
                <th className="text-center px-2 py-3 font-semibold w-20">R3 Done</th>
                <th className="text-left px-2 py-3 font-semibold w-32">R4 Due</th>
                <th className="text-center px-2 py-3 font-semibold w-20">R4 Done</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((r) => {
                const dues = INTERVALS.map((d) => addDays(r.noteDate, d));
                const r1Overdue = !r.r1Done && isOverdue(dues[0]);
                const r2Overdue = !r.r2Done && r.r1Done && isOverdue(dues[1]);
                const r3Overdue = !r.r3Done && r.r2Done && isOverdue(dues[2]);
                const r4Overdue = !r.r4Done && r.r3Done && isOverdue(dues[3]);
                const anyOverdue = r1Overdue || r2Overdue || r3Overdue || r4Overdue;
                return (
                  <tr
                    key={r.id}
                    className={cn(
                      "border-b border-border/60 last:border-b-0",
                      anyOverdue ? "row-overdue" : "bg-white"
                    )}
                  >
                    <td className="px-3 py-2.5 font-medium text-[#0f2d4a]">
                      {r.topic}
                      {anyOverdue ? (
                        <div className="text-[10px] text-[#b91c1c] flex items-center gap-1 mt-0.5">
                          <AlertTriangle className="size-3" />
                          Overdue — reschedule today
                        </div>
                      ) : null}
                    </td>
                    <td className="px-2 py-2.5 font-mono text-xs text-[#5a5a5a]">{r.noteDate}</td>
                    <td className={cn("px-2 py-2.5 font-mono text-xs", r1Overdue ? "text-[#b91c1c] font-bold" : "text-[#5a5a5a]")}>
                      {dues[0]}
                    </td>
                    <td className="px-2 py-2.5 text-center">
                      <Checkbox
                        checked={r.r1Done}
                        onCheckedChange={(v) => updateRevisionEntry(r.id, { r1Done: !!v })}
                      />
                    </td>
                    <td className={cn("px-2 py-2.5 font-mono text-xs", r2Overdue ? "text-[#b91c1c] font-bold" : "text-[#5a5a5a]")}>
                      {dues[1]}
                    </td>
                    <td className="px-2 py-2.5 text-center">
                      <Checkbox
                        checked={r.r2Done}
                        onCheckedChange={(v) => updateRevisionEntry(r.id, { r2Done: !!v })}
                      />
                    </td>
                    <td className={cn("px-2 py-2.5 font-mono text-xs", r3Overdue ? "text-[#b91c1c] font-bold" : "text-[#5a5a5a]")}>
                      {dues[2]}
                    </td>
                    <td className="px-2 py-2.5 text-center">
                      <Checkbox
                        checked={r.r3Done}
                        onCheckedChange={(v) => updateRevisionEntry(r.id, { r3Done: !!v })}
                      />
                    </td>
                    <td className={cn("px-2 py-2.5 font-mono text-xs", r4Overdue ? "text-[#b91c1c] font-bold" : "text-[#5a5a5a]")}>
                      {dues[3]}
                    </td>
                    <td className="px-2 py-2.5 text-center">
                      <Checkbox
                        checked={r.r4Done}
                        onCheckedChange={(v) => updateRevisionEntry(r.id, { r4Done: !!v })}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      )}

      <p className="text-xs text-[#5a5a5a] mt-3 flex items-start gap-1.5">
        <CheckCircle2 className="size-3.5 mt-0.5 text-[#1f4d3a]" />
        <span>
          <strong>GS2 Federalism</strong> (Note 14 Aug) is intentionally seeded as OVERDUE — R1 was due 21 Aug. This is the worked example for Rule 4 (Adapt to Slippage). Tick R1 Done to clear it.
        </span>
      </p>

      <AddRevisionDialog
        open={adding}
        onOpenChange={setAdding}
        onAdd={addRevisionEntry}
        defaultDate={today}
      />
    </div>
  );
}

function AddRevisionDialog({
  open,
  onOpenChange,
  onAdd,
  defaultDate,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAdd: (r: RevisionEntry) => void;
  defaultDate: string;
}) {
  const [topic, setTopic] = useState("");
  const [noteDate, setNoteDate] = useState(defaultDate);
  const submit = () => {
    if (!topic.trim()) return;
    onAdd({
      id: `r${Date.now()}`,
      topic,
      noteDate,
      r1Done: false, r2Done: false, r3Done: false, r4Done: false,
    });
    setTopic("");
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Revision Entry</DialogTitle>
          <DialogDescription>R1-R4 due dates auto-calculated (+7/+21/+45/+90 days).</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <div>
            <label className="text-xs">Topic</label>
            <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. GS2 Federalism" />
          </div>
          <div>
            <label className="text-xs">Note date</label>
            <Input type="date" value={noteDate} onChange={(e) => setNoteDate(e.target.value)} />
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
