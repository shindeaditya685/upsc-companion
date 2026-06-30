"use client";

import { useMemo, useState } from "react";
import { Newspaper, Plus, AlertCircle } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import type { CAItem } from "@/lib/types";
import { cn } from "@/lib/utils";

const SOURCE_BADGE: Record<string, string> = {
  "The Hindu": "bg-[#b91c1c] text-[#fafaf7]",
  "Indian Express": "bg-[#0f2d4a] text-[#fafaf7]",
  PIB: "bg-[#1f4d3a] text-[#fafaf7]",
  "Down to Earth": "bg-[#8b4513] text-[#fafaf7]",
};

export function CATrackerView() {
  const caTracker = useAppStore((s) => s.caTracker);
  const updateCAItem = useAppStore((s) => s.updateCAItem);
  const addCAItem = useAppStore((s) => s.addCAItem);
  const notesTracker = useAppStore((s) => s.notesTracker);
  const [adding, setAdding] = useState(false);

  const topicOptions = useMemo(
    () => ["— pending", ...notesTracker.map((n) => n.topic)],
    [notesTracker]
  );

  const today = new Date().toISOString().slice(0, 10);
  const sorted = useMemo(
    () => [...caTracker].sort((a, b) => b.date.localeCompare(a.date)),
    [caTracker]
  );

  const isStale = (date: string) => {
    const diff = (new Date(today).getTime() - new Date(date).getTime()) / 86400000;
    return diff > 14;
  };

  const pendingCount = caTracker.filter((c) => c.integratedInto === "— pending").length;

  return (
    <div>
      <SectionHeader
        title="Current Affairs Tracker"
        subtitle="Newspaper + magazine captures mapped to themes and integrated into your Level-1 notes. Items older than 14 days still pending integration are highlighted amber (Rule 4 — slippage signal)."
        icon={<Newspaper className="size-5" />}
        actions={
          <>
            <Badge variant={pendingCount > 0 ? "destructive" : "secondary"}>
              {pendingCount} Pending Integration
            </Badge>
            <Button onClick={() => setAdding(true)} size="sm" className="bg-[#b8893a] hover:bg-[#a07a30] text-[#1a1a1a]">
              <Plus className="size-4 mr-1" /> Add CA Item
            </Button>
          </>
        }
      />

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto scroll-thin">
          <table className="w-full text-sm">
            <thead className="bg-[#0f2d4a] text-[#fafaf7]">
              <tr>
                <th className="text-left px-3 py-3 font-semibold w-32">Source</th>
                <th className="text-left px-2 py-3 font-semibold w-32">Date</th>
                <th className="text-left px-3 py-3 font-semibold min-w-[280px]">Headline</th>
                <th className="text-left px-3 py-3 font-semibold min-w-[180px]">Primary Theme</th>
                <th className="text-left px-3 py-3 font-semibold min-w-[200px]">Integrated Into</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((c, idx) => {
                const stale = isStale(c.date) && c.integratedInto === "— pending";
                return (
                  <tr
                    key={c.id}
                    className={cn(
                      "border-b border-border/60 last:border-b-0",
                      stale ? "row-amber" : idx % 2 ? "bg-[#fafaf7]" : "bg-white"
                    )}
                  >
                    <td className="px-3 py-2.5">
                      <Badge className={SOURCE_BADGE[c.source] ?? "bg-[#5a5a5a] text-[#fafaf7] hover:bg-[#5a5a5a]"}>
                        {c.source}
                      </Badge>
                    </td>
                    <td className="px-2 py-2.5 font-mono text-xs text-[#5a5a5a]">{c.date}</td>
                    <td className="px-3 py-2.5">
                      <Textarea
                        defaultValue={c.headline}
                        rows={2}
                        className="text-xs resize-y border-0 px-0 focus-visible:ring-0"
                        onBlur={(e) => updateCAItem(c.id, { headline: e.target.value })}
                      />
                      {stale ? (
                        <div className="text-[10px] text-[#b8893a] flex items-center gap-1 mt-1">
                          <AlertCircle className="size-3" />
                          Stale (&gt;14d) &amp; pending integration
                        </div>
                      ) : null}
                    </td>
                    <td className="px-3 py-2.5 text-xs text-[#5a5a5a]">{c.primaryTheme}</td>
                    <td className="px-3 py-2.5">
                      <Select
                        value={c.integratedInto}
                        onValueChange={(v) => updateCAItem(c.id, { integratedInto: v })}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {topicOptions.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                );
              })}
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3 py-8 text-center text-[#5a5a5a]">
                    No CA items captured yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="text-xs text-[#5a5a5a] mt-3">
        5 sample items pre-populated from The Hindu, Indian Express, PIB and Down to Earth — all clustered around the Agriculture sprint. Use the "Integrated Into" dropdown to link a CA item into your Level-1 notes for a topic.
      </p>

      <AddCADialog open={adding} onOpenChange={setAdding} onAdd={addCAItem} topicOptions={topicOptions} defaultDate={today} />
    </div>
  );
}

function AddCADialog({
  open,
  onOpenChange,
  onAdd,
  topicOptions,
  defaultDate,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAdd: (c: CAItem) => void;
  topicOptions: string[];
  defaultDate: string;
}) {
  const [source, setSource] = useState("The Hindu");
  const [date, setDate] = useState(defaultDate);
  const [headline, setHeadline] = useState("");
  const [theme, setTheme] = useState("");
  const [integratedInto, setIntegratedInto] = useState("— pending");

  const submit = () => {
    if (!headline.trim()) return;
    onAdd({
      id: `c${Date.now()}`,
      source, date, headline,
      primaryTheme: theme || "—",
      integratedInto,
    });
    setHeadline("");
    setTheme("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add CA Item</DialogTitle>
          <DialogDescription>Capture a current-affairs item with source, date and theme mapping.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs">Source</label>
            <Select value={source} onValueChange={setSource}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["The Hindu", "Indian Express", "PIB", "Down to Earth", "LiveMint", "Other"].map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs">Date</label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="text-xs">Headline</label>
          <Textarea rows={2} value={headline} onChange={(e) => setHeadline(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs">Primary theme</label>
            <Input value={theme} onChange={(e) => setTheme(e.target.value)} placeholder="e.g. Agriculture — MSP" />
          </div>
          <div>
            <label className="text-xs">Integrated into</label>
            <Select value={integratedInto} onValueChange={setIntegratedInto}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {topicOptions.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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
