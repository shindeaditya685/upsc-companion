"use client";

import { useMemo, useState } from "react";
import { Library, ChevronDown, ChevronRight, Trophy, Target, Plus } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppStore, computeKnowledgeLevel } from "@/lib/store";
import { ProgressBar } from "@/components/shared/progress-bar";
import { cn } from "@/lib/utils";
import type { KnowledgeTopic, LevelDeliverable } from "@/lib/types";

const LEVEL_NAMES = [
  "L0 · Source Reading",
  "L1 · Level-1 Notes",
  "L2 · Value Add (thinkers/data)",
  "L3 · PYQ Mapping",
  "L4 · Answer Writing (3+)",
  "L5 · R1 + R2 Revision",
  "L6 · Mains-Ready",
];

export function KnowledgeBankView() {
  const knowledgeBank = useAppStore((s) => s.knowledgeBank);
  const updateKnowledgeTopic = useAppStore((s) => s.updateKnowledgeTopic);
  const addKnowledgeTopic = useAppStore((s) => s.addKnowledgeTopic);
  const [expandedId, setExpandedId] = useState<string | null>(knowledgeBank[0]?.id ?? null);
  const [adding, setAdding] = useState(false);

  const stats = useMemo(() => {
    const total = knowledgeBank.length;
    const mastered = knowledgeBank.filter((k) => computeKnowledgeLevel(k.levels) === 6).length;
    const inProgress = knowledgeBank.filter((k) => {
      const lvl = computeKnowledgeLevel(k.levels);
      return lvl > 0 && lvl < 6;
    }).length;
    const notStarted = knowledgeBank.filter((k) => computeKnowledgeLevel(k.levels) === 0).length;
    return { total, mastered, inProgress, notStarted };
  }, [knowledgeBank]);

  const toggleLevel = (topicId: string, levelIdx: number, value: boolean) => {
    const topic = knowledgeBank.find((k) => k.id === topicId);
    if (!topic) return;
    const newLevels = topic.levels.map((l, i) =>
      i === levelIdx ? { ...l, status: value } : l
    );
    updateKnowledgeTopic(topicId, { levels: newLevels });
  };

  const updateDeliverable = (topicId: string, levelIdx: number, value: string) => {
    const topic = knowledgeBank.find((k) => k.id === topicId);
    if (!topic) return;
    const newLevels = topic.levels.map((l, i) =>
      i === levelIdx ? { ...l, deliverable: value } : l
    );
    updateKnowledgeTopic(topicId, { levels: newLevels });
  };

  return (
    <div>
      <SectionHeader
        title="Knowledge Bank"
        subtitle="Topic progression through 7 levels (L0 → L6 Mains-Ready). Each level has a deliverable note. Click a row to expand and see/edit deliverables."
        icon={<Library className="size-5" />}
        actions={
          <div className="flex flex-wrap gap-2 text-xs">
            <Badge className="bg-[#1f4d3a] text-[#fafaf7] hover:bg-[#1f4d3a]">
              <Trophy className="size-3 mr-1" /> {stats.mastered} Mains-ready
            </Badge>
            <Badge className="bg-[#b8893a] text-[#1a1a1a] hover:bg-[#b8893a]">
              {stats.inProgress} In progress
            </Badge>
            <Badge variant="outline">{stats.notStarted} Not started</Badge>
            <Button variant="outline" size="sm" onClick={() => setAdding(true)}>
              <Plus className="size-3.5 mr-1" /> Add Topic
            </Button>
          </div>
        }
      />

      {knowledgeBank.length === 0 ? (
        <Card className="p-8 text-center text-[#5a5a5a]">
          No topics in your Knowledge Bank yet. Add topics and progress them through levels L0→L6.
        </Card>
      ) : (
      <div className="space-y-2">
        {knowledgeBank.map((topic) => {
          const level = computeKnowledgeLevel(topic.levels);
          const isExpanded = expandedId === topic.id;
          const isMastered = level === 6;
          return (
            <Card
              key={topic.id}
              className={cn(
                "p-0 overflow-hidden transition-all",
                isMastered ? "border-[#1f4d3a]/50 bg-[#1f4d3a]/3" : "bg-white"
              )}
            >
              {/* Header row */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : topic.id)}
                className="w-full text-left p-4 flex items-center gap-3 hover:bg-[#f5f1e6]/40 transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="size-4 text-[#0f2d4a]" />
                ) : (
                  <ChevronRight className="size-4 text-[#0f2d4a]" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-[#0f2d4a]">{topic.topic}</span>
                    <Badge variant="outline" className="font-mono text-[10px]">{topic.paper}</Badge>
                    {isMastered ? (
                      <Badge className="bg-[#1f4d3a] text-[#fafaf7] hover:bg-[#1f4d3a]">
                        <Trophy className="size-3 mr-1" /> L6 · Mains-Ready
                      </Badge>
                    ) : null}
                  </div>
                  <div className="mt-2 max-w-md">
                    <ProgressBar
                      value={(level / 6) * 100}
                      variant={isMastered ? "green" : "gold"}
                      size="sm"
                      showLabel
                      label={`L${level}/L6`}
                    />
                  </div>
                </div>
                {topic.targetDateL6 ? (
                  <div className="text-right shrink-0">
                    <div className="text-[10px] uppercase tracking-wider text-[#5a5a5a]">Target L6</div>
                    <div className="text-xs font-mono text-[#0f2d4a]">{topic.targetDateL6}</div>
                  </div>
                ) : null}
              </button>

              {/* Expanded detail */}
              {isExpanded ? (
                <div className="px-4 pb-4 pt-1 border-t border-border/60 bg-[#fafaf7]/50">
                  <div className="space-y-2 mt-2">
                    {topic.levels.map((lvl, idx) => (
                      <LevelRow
                        key={lvl.level}
                        level={lvl}
                        idx={idx}
                        onToggleStatus={(v) => toggleLevel(topic.id, idx, v)}
                        onUpdateDeliverable={(v) => updateDeliverable(topic.id, idx, v)}
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Target className="size-3.5 text-[#b8893a]" />
                    <span className="text-xs text-[#5a5a5a]">Target L6 date:</span>
                    <Input
                      type="date"
                      value={topic.targetDateL6 ?? ""}
                      onChange={(e) => updateKnowledgeTopic(topic.id, { targetDateL6: e.target.value })}
                      className="h-7 w-[140px] text-xs"
                    />
                  </div>
                </div>
              ) : null}
            </Card>
          );
        })}
      </div>
      )}

      <p className="text-xs text-[#5a5a5a] mt-3">
        <strong>Agriculture (MSP, PDS, FCI, Land Reforms, Sustainable Agri)</strong> is the worked example at Level 6 — every level has a deliverable note showing what was produced. Use it as the template for other topics.
      </p>

      <AddTopicDialog
        open={adding}
        onOpenChange={setAdding}
        onAdd={addKnowledgeTopic}
        nextId={knowledgeBank.length + 1}
      />
    </div>
  );
}

function AddTopicDialog({
  open,
  onOpenChange,
  onAdd,
  nextId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAdd: (topic: KnowledgeTopic) => void;
  nextId: number;
}) {
  const [topic, setTopic] = useState("");
  const [paper, setPaper] = useState<KnowledgeTopic["paper"]>("GS1");

  const handleAdd = () => {
    if (!topic.trim()) return;
    const levels: LevelDeliverable[] = Array.from({ length: 7 }, (_, i) => ({
      level: i,
      name: LEVEL_NAMES[i],
      status: false,
      deliverable: "",
    }));
    onAdd({
      id: `kb-${nextId}-${Date.now()}`,
      topic: topic.trim(),
      paper,
      levels,
    });
    setTopic("");
    setPaper("GS1");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Topic</DialogTitle>
          <DialogDescription>Add a new topic to your Knowledge Bank. You can set level deliverables after creation.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div>
            <label className="text-xs font-medium text-[#5a5a5a] mb-1 block">Topic name</label>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Minimum Support Price"
              autoFocus
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[#5a5a5a] mb-1 block">Paper</label>
            <Select value={paper} onValueChange={(v) => setPaper(v as KnowledgeTopic["paper"])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GS1">GS1</SelectItem>
                <SelectItem value="GS2">GS2</SelectItem>
                <SelectItem value="GS3">GS3</SelectItem>
                <SelectItem value="GS4">GS4</SelectItem>
                <SelectItem value="Sociology P1">Sociology P1</SelectItem>
                <SelectItem value="Sociology P2">Sociology P2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleAdd} disabled={!topic.trim()}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function LevelRow({
  level,
  idx,
  onToggleStatus,
  onUpdateDeliverable,
}: {
  level: KnowledgeTopic["levels"][number];
  idx: number;
  onToggleStatus: (v: boolean) => void;
  onUpdateDeliverable: (v: string) => void;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-2.5 rounded border",
        level.status
          ? idx === 6
            ? "border-[#1f4d3a]/50 bg-[#1f4d3a]/5"
            : "border-[#b8893a]/40 bg-[#fef9ec]/50"
          : "border-border bg-white"
      )}
    >
      <Checkbox checked={level.status} onCheckedChange={(v) => onToggleStatus(!!v)} className="mt-1" />
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-[#0f2d4a]">{LEVEL_NAMES[idx]}</div>
        <Textarea
          defaultValue={level.deliverable}
          rows={level.deliverable ? 2 : 1}
          placeholder="Deliverable note — what did you produce at this level?"
          className={cn(
            "text-xs mt-1 resize-y min-h-[28px]",
            level.status ? "bg-white" : "bg-[#fafaf7]/40"
          )}
          onBlur={(e) => onUpdateDeliverable(e.target.value)}
        />
      </div>
    </div>
  );
}
