"use client";

import { useMemo, useState } from "react";
import { NotebookPen, Plus, Trophy } from "lucide-react";
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
import { useAppStore, isNoteTopicMastered } from "@/lib/store";
import type { NoteTopic } from "@/lib/types";
import { cn } from "@/lib/utils";

const COLS: { key: keyof NoteTopic; label: string }[] = [
  { key: "read", label: "Read" },
  { key: "notes", label: "Notes" },
  { key: "data", label: "Data" },
  { key: "reports", label: "Reports" },
  { key: "committees", label: "Comm." },
  { key: "cases", label: "Case" },
  { key: "diagram", label: "Diagram" },
  { key: "ca", label: "CA" },
  { key: "r1", label: "R1" },
  { key: "r2", label: "R2" },
];

export function NotesTrackerView() {
  const notesTracker = useAppStore((s) => s.notesTracker);
  const updateNoteTopic = useAppStore((s) => s.updateNoteTopic);
  const addNoteTopic = useAppStore((s) => s.addNoteTopic);
  const [adding, setAdding] = useState(false);

  const masteredCount = useMemo(
    () => notesTracker.filter((n) => isNoteTopicMastered(n)).length,
    [notesTracker]
  );

  const toggle = (id: string, field: keyof NoteTopic, value: boolean) => {
    const topic = notesTracker.find((n) => n.id === id);
    if (!topic) return;
    const patch: Partial<NoteTopic> = { [field]: value };
    // Auto-tick mastered when all 12 fields complete
    const updated = { ...topic, ...patch };
    patch.mastered = isNoteTopicMastered(updated);
    updateNoteTopic(id, patch);
  };

  return (
    <div>
      <SectionHeader
        title="Notes Tracker"
        subtitle="13-column per-topic checklist. 'Mastered = Yes' auto-ticks when all 12 fields (Read, Notes, Data, Reports, Committees, Cases, Diagram, CA, R1, R2 + AW count ≥ 3) are complete."
        icon={<NotebookPen className="size-5" />}
        actions={
          <>
            <Badge className="bg-[#1f4d3a] text-[#fafaf7] hover:bg-[#1f4d3a]">
              <Trophy className="size-3 mr-1" />
              {masteredCount} Mastered
            </Badge>
            <Button onClick={() => setAdding(true)} size="sm" className="bg-[#0f2d4a] hover:bg-[#1a3d5e] text-[#fafaf7]">
              <Plus className="size-4 mr-1" /> Add Topic
            </Button>
          </>
        }
      />

      {notesTracker.length === 0 ? (
        <Card className="p-8 text-center text-[#5a5a5a]">
          No topics yet. Click <strong>Add Topic</strong> to start building your notes checklist.
        </Card>
      ) : (
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto scroll-thin">
          <table className="w-full text-sm">
            <thead className="bg-[#0f2d4a] text-[#fafaf7]">
              <tr>
                <th className="text-left px-3 py-3 font-semibold min-w-[180px] sticky left-0 bg-[#0f2d4a]">Topic</th>
                {COLS.map((c) => (
                  <th key={c.key} className="text-center px-2 py-3 font-semibold w-16">{c.label}</th>
                ))}
                <th className="text-center px-2 py-3 font-semibold w-20">AW Count</th>
                <th className="text-center px-3 py-3 font-semibold w-24">Mastered</th>
              </tr>
            </thead>
            <tbody>
              {notesTracker.map((n, idx) => {
                const mastered = isNoteTopicMastered(n);
                return (
                  <tr
                    key={n.id}
                    className={cn(
                      "border-b border-border/60 last:border-b-0",
                      mastered ? "bg-[#1f4d3a]/8" : idx % 2 ? "bg-[#fafaf7]" : "bg-white"
                    )}
                  >
                    <td className={cn("px-3 py-2.5 font-medium sticky left-0", mastered ? "bg-[#1f4d3a]/8 text-[#1f4d3a]" : "bg-inherit text-[#0f2d4a]")}>
                      {n.topic}
                    </td>
                    {COLS.map((c) => (
                      <td key={c.key} className="px-2 py-2.5 text-center">
                        <Checkbox
                          checked={Boolean(n[c.key])}
                          onCheckedChange={(v) => toggle(n.id, c.key, !!v)}
                        />
                      </td>
                    ))}
                    <td className="px-2 py-2.5 text-center">
                      <Input
                        type="number"
                        min={0}
                        value={n.awCount}
                        onChange={(e) => {
                          const next = { ...n, awCount: Number(e.target.value) };
                          updateNoteTopic(n.id, { awCount: next.awCount, mastered: isNoteTopicMastered(next) });
                        }}
                        className="h-7 w-14 text-center mx-auto"
                      />
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      {mastered ? (
                        <Badge className="bg-[#1f4d3a] text-[#fafaf7] hover:bg-[#1f4d3a]">
                          <Trophy className="size-3 mr-1" /> Yes
                        </Badge>
                      ) : (
                        <span className="text-xs text-[#5a5a5a]">No</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      )}

      <p className="text-xs text-[#5a5a5a] mt-3">
        Build each topic through 10 binary checkpoints + Answer Writing count. Only topics with all 12 complete qualify as "Mastered" — the gate for the Knowledge Bank L6 (Mains-ready) level.
      </p>

      <AddTopicDialog open={adding} onOpenChange={setAdding} onAdd={addNoteTopic} />
    </div>
  );
}

function AddTopicDialog({
  open,
  onOpenChange,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAdd: (n: NoteTopic) => void;
}) {
  const [topic, setTopic] = useState("");
  const submit = () => {
    if (!topic.trim()) return;
    onAdd({
      id: `n${Date.now()}`,
      topic,
      read: false, notes: false, data: false, reports: false,
      committees: false, cases: false, diagram: false, ca: false,
      r1: false, r2: false, awCount: 0, mastered: false,
    });
    setTopic("");
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Notes Topic</DialogTitle>
          <DialogDescription>Start a new topic with all 12 fields blank.</DialogDescription>
        </DialogHeader>
        <div>
          <label className="text-xs">Topic name</label>
          <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Cooperative Federalism" />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={submit} className="bg-[#0f2d4a] hover:bg-[#1a3d5e] text-[#fafaf7]">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
