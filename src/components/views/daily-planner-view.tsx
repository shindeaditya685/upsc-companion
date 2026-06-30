"use client";

import { useMemo, useState } from "react";
import { CalendarCheck, Plus, Trash2, Brain, AlertTriangle } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAppStore, parseHoursFromSlot } from "@/lib/store";
import { USER_PROFILE } from "@/lib/strategy-data";
import type { Priority, Task } from "@/lib/types";
import { cn } from "@/lib/utils";

const priorityMeta: Record<Priority, { bg: string; text: string; label: string }> = {
  P1: { bg: "bg-[#b91c1c]", text: "text-[#fafaf7]", label: "P1 · Critical" },
  P2: { bg: "bg-[#b8893a]", text: "text-[#1a1a1a]", label: "P2 · Important" },
  P3: { bg: "bg-[#8a8a8a]", text: "text-[#fafaf7]", label: "P3 · Nice-to-have" },
};

const CAP_HOURS = USER_PROFILE.dailyHoursTarget;

export function DailyPlannerView() {
  const tasks = useAppStore((s) => s.tasks);
  const selectedDate = useAppStore((s) => s.selectedDate);
  const setSelectedDate = useAppStore((s) => s.setSelectedDate);
  const updateTask = useAppStore((s) => s.updateTask);
  const removeTask = useAppStore((s) => s.removeTask);
  const addTask = useAppStore((s) => s.addTask);
  const setActiveView = useAppStore((s) => s.setActiveView);
  const addMentorMessage = useAppStore((s) => s.addMentorMessage);

  const [adding, setAdding] = useState(false);
  const [generating, setGenerating] = useState(false);

  const dayTasks = useMemo(
    () => tasks.filter((t) => t.date === selectedDate).sort((a, b) => a.timeSlot.localeCompare(b.timeSlot)),
    [tasks, selectedDate]
  );

  const totalHours = useMemo(
    () => dayTasks.reduce((s, t) => s + parseHoursFromSlot(t.timeSlot), 0),
    [dayTasks]
  );

  const completedHours = useMemo(
    () => dayTasks.filter((t) => t.completed).reduce((s, t) => s + parseHoursFromSlot(t.timeSlot), 0),
    [dayTasks]
  );

  const overCap = totalHours > CAP_HOURS;

  const shiftDate = (delta: number) => {
    const d = new Date(selectedDate + "T00:00:00");
    d.setDate(d.getDate() + delta);
    setSelectedDate(d.toISOString().slice(0, 10));
  };

  const handleGenerateTomorrow = async () => {
    setGenerating(true);
    try {
      const summary = dayTasks
        .map((t) => `- ${t.timeSlot} ${t.priority}: ${t.description} (${t.completed ? "done" : "pending"})`)
        .join("\n");
      const energy = totalHours > 0 ? Math.round((completedHours / totalHours) * 5) + 5 : 7;
      const userInput = `Today (${selectedDate}) I completed ${dayTasks.filter((t) => t.completed).length}/${dayTasks.length} tasks (${completedHours.toFixed(1)}/${totalHours.toFixed(1)} hours). Here is my log:\n${summary}\n\nEnergy ${energy}/10. Please generate tomorrow's adjusted plan.`;
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput, conversationHistory: [] }),
      });
      const data = await res.json();
      addMentorMessage({
        id: `m${Date.now()}`,
        role: "user",
        content: userInput,
        timestamp: Date.now(),
        sessionLabel: "Generate Tomorrow",
      });
      addMentorMessage({
        id: `m${Date.now() + 1}`,
        role: "assistant",
        content: data.response ?? "Mentor unavailable. Please try again.",
        timestamp: Date.now() + 1000,
        sessionLabel: "Tomorrow's plan",
      });
      setActiveView("ai-mentor");
    } catch {
      // ignore — user can still use mentor view manually
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div>
      <SectionHeader
        title="Daily Planner"
        subtitle={`Task-level plan for the selected date. Each task has a time slot, priority, difficulty (1-5), learning outcome and revision date. Auto-capped at ${USER_PROFILE.dailyHoursTarget} hours.`}
        icon={<CalendarCheck className="size-5" />}
        actions={
          <>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-[150px]"
            />
            <Button variant="outline" size="sm" onClick={() => shiftDate(-1)}>
              Prev
            </Button>
            <Button variant="outline" size="sm" onClick={() => shiftDate(1)}>
              Next
            </Button>
            <Button onClick={() => setAdding(true)} size="sm" className="bg-[#0f2d4a] hover:bg-[#1a3d5e] text-[#fafaf7]">
              <Plus className="size-4 mr-1" /> Add Task
            </Button>
            <Button
              onClick={handleGenerateTomorrow}
              disabled={generating}
              size="sm"
              className="bg-[#b8893a] hover:bg-[#a07a30] text-[#1a1a1a]"
            >
              <Brain className="size-4 mr-1" />
              {generating ? "Generating..." : "Generate Tomorrow's Plan"}
            </Button>
          </>
        }
      />

      {/* Load summary */}
      <Card className={cn("p-4 mb-4", overCap ? "bg-[#fef2f2] border-[#b91c1c]/40" : "bg-[#0f2d4a] text-[#fafaf7]")}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div>
            <div className={cn("text-[10px] uppercase tracking-wider", overCap ? "text-[#b91c1c]" : "text-[#c8b988]")}>
              Total Load
            </div>
            <div className="font-bold text-lg">{totalHours.toFixed(1)}h / {CAP_HOURS}h</div>
          </div>
          <div>
            <div className={cn("text-[10px] uppercase tracking-wider", overCap ? "text-[#b91c1c]" : "text-[#c8b988]")}>
              Completed
            </div>
            <div className="font-bold text-lg">{completedHours.toFixed(1)}h</div>
          </div>
          <div>
            <div className={cn("text-[10px] uppercase tracking-wider", overCap ? "text-[#b91c1c]" : "text-[#c8b988]")}>
              Tasks Done
            </div>
            <div className="font-bold text-lg">
              {dayTasks.filter((t) => t.completed).length}/{dayTasks.length}
            </div>
          </div>
          <div>
            <div className={cn("text-[10px] uppercase tracking-wider", overCap ? "text-[#b91c1c]" : "text-[#c8b988]")}>
              P1 Tasks Pending
            </div>
            <div className="font-bold text-lg">
              {dayTasks.filter((t) => t.priority === "P1" && !t.completed).length}
            </div>
          </div>
        </div>
        {overCap ? (
          <div className="mt-2 text-xs flex items-center gap-1.5 text-[#b91c1c]">
            <AlertTriangle className="size-3.5" />
            <strong>Rule 2 — Prevent Over-Planning:</strong> Daily load exceeds {CAP_HOURS}h. Prune lowest-priority task before sleeping.
          </div>
        ) : null}
      </Card>

      {/* Task list */}
      <div className="space-y-2">
        {dayTasks.map((t) => (
          <TaskCard
            key={t.id}
            task={t}
            onUpdate={(patch) => updateTask(t.id, patch)}
            onRemove={() => removeTask(t.id)}
          />
        ))}
        {dayTasks.length === 0 ? (
          <Card className="p-8 text-center text-[#5a5a5a]">
            No tasks for this date. Click <strong>Add Task</strong> or <strong>Generate Tomorrow's Plan</strong> to get started.
          </Card>
        ) : null}
      </div>

      <AddTaskDialog
        open={adding}
        onOpenChange={setAdding}
        date={selectedDate}
        onAdd={(t) => addTask(t)}
      />
    </div>
  );
}

function TaskCard({
  task,
  onUpdate,
  onRemove,
}: {
  task: Task;
  onUpdate: (patch: Partial<Task>) => void;
  onRemove: () => void;
}) {
  const pm = priorityMeta[task.priority];
  const hours = parseHoursFromSlot(task.timeSlot);
  return (
    <Card
      className={cn(
        "p-3 transition-all",
        task.completed ? "opacity-60 bg-[#f5f1e6]/50" : "bg-white"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="pt-0.5">
          <Checkbox
            checked={task.completed}
            onCheckedChange={(v) => onUpdate({ completed: !!v })}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <Input
              value={task.timeSlot}
              onChange={(e) => onUpdate({ timeSlot: e.target.value })}
              className="h-7 w-[110px] font-mono text-xs"
            />
            <span className="text-[10px] text-[#5a5a5a]">·</span>
            <span className="text-[11px] text-[#5a5a5a]">{hours.toFixed(1)}h</span>
            <span className={cn("text-[10px] px-1.5 py-0.5 rounded font-semibold", pm.bg, pm.text)}>
              {pm.label}
            </span>
            <span className="text-xs text-[#b8893a]" title={`Difficulty ${task.difficulty}/5`}>
              {"●".repeat(task.difficulty)}
              <span className="text-[#c8b988]">{"○".repeat(5 - task.difficulty)}</span>
            </span>
            <button
              onClick={onRemove}
              className="ml-auto text-[#5a5a5a] hover:text-[#b91c1c] p-1"
              aria-label="Remove task"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
          <Textarea
            value={task.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            rows={1}
            className={cn(
              "text-sm resize-y min-h-[36px] border-0 px-0 focus-visible:ring-0",
              task.completed ? "line-through" : ""
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#5a5a5a] mb-0.5">
                Learning Outcome
              </div>
              <Input
                value={task.learningOutcome}
                onChange={(e) => onUpdate({ learningOutcome: e.target.value })}
                className="h-7 text-xs italic"
                placeholder="One line — what you'll be able to recall"
              />
            </div>
            <div className="flex items-end gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#5a5a5a] mb-0.5">
                  Priority
                </div>
                <Select
                  value={task.priority}
                  onValueChange={(v) => onUpdate({ priority: v as Priority })}
                >
                  <SelectTrigger className="h-7 w-[110px] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="P1">P1 · Critical</SelectItem>
                    <SelectItem value="P2">P2 · Important</SelectItem>
                    <SelectItem value="P3">P3 · Nice-to-have</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#5a5a5a] mb-0.5">
                  Diff
                </div>
                <Select
                  value={String(task.difficulty)}
                  onValueChange={(v) => onUpdate({ difficulty: Number(v) })}
                >
                  <SelectTrigger className="h-7 w-[60px] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#5a5a5a] mb-0.5">
                  Rev Date
                </div>
                <Input
                  type="date"
                  value={task.revisionDate ?? ""}
                  onChange={(e) => onUpdate({ revisionDate: e.target.value })}
                  className="h-7 w-[140px] text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function AddTaskDialog({
  open,
  onOpenChange,
  date,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  date: string;
  onAdd: (t: Task) => void;
}) {
  const [timeSlot, setTimeSlot] = useState("07:30-09:00");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("P1");
  const [difficulty, setDifficulty] = useState(3);
  const [learningOutcome, setLearningOutcome] = useState("");
  const [revisionDate, setRevisionDate] = useState("");

  const submit = () => {
    if (!description.trim()) return;
    onAdd({
      id: `t${Date.now()}`,
      date,
      timeSlot,
      description,
      priority,
      difficulty,
      completed: false,
      learningOutcome,
      revisionDate: revisionDate || undefined,
    });
    setDescription("");
    setLearningOutcome("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Task — {date}</DialogTitle>
          <DialogDescription>Fill in the task details. Time slot format: HH:MM-HH:MM (24hr).</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <label className="text-xs">Time slot</label>
            <Input value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} placeholder="07:30-09:00" />
          </div>
          <div>
            <label className="text-xs">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="e.g. Theme 3: Food security + PDS + FCI — read + compress"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs">Priority</label>
              <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="P1">P1 · Critical</SelectItem>
                  <SelectItem value="P2">P2 · Important</SelectItem>
                  <SelectItem value="P3">P3 · Nice-to-have</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs">Difficulty</label>
              <Select value={String(difficulty)} onValueChange={(v) => setDifficulty(Number(v))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label className="text-xs">Learning outcome</label>
            <Input
              value={learningOutcome}
              onChange={(e) => setLearningOutcome(e.target.value)}
              placeholder="e.g. Level-1 notes for food security"
            />
          </div>
          <div>
            <label className="text-xs">Revision date</label>
            <Input type="date" value={revisionDate} onChange={(e) => setRevisionDate(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={submit} className="bg-[#0f2d4a] hover:bg-[#1a3d5e] text-[#fafaf7]">
            Add Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
