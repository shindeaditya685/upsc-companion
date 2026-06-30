"use client";

import { useEffect, useRef, useState } from "react";
import {
  Brain,
  Send,
  Trash2,
  Sparkles,
  User,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Calendar,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAppStore, parseHoursFromSlot } from "@/lib/store";
import { cn } from "@/lib/utils";

const QUICK_PROMPTS = [
  {
    label: "Good day summary",
    text: "Today I completed 7/8 tasks (~7.5h). Hit the morning revision window, compressed Food Security + Land Reforms themes, and finished one evaluated GS3 answer on MSP. Energy 8/10. Optional Sociology P2 Caste value-add done. No slippage. Please generate tomorrow's plan.",
  },
  {
    label: "Bad day summary",
    text: "Today was rough. Skipped the morning revision slot (overslept). Only completed 3/8 tasks (~3h). Couldn't compress Land Reforms theme — felt foggy. Energy 4/10, low motivation. Missed the answer writing slot. What do I do tomorrow?",
  },
  {
    label: "Weekly review",
    text: "Weekly review for Week 11: Total study hours = 47h (target 48h). Completed 5/5 themes in GS3 Agriculture. Optional Sociology P2 Caste — only 2h invested (low — Rule 3 may apply). 1 sectional test done, scored 78/100. Revision overdue: GS2 Federalism (R1). Energy avg 6/10. Please assess the week and adjust next week's load.",
  },
];

export function AIMentorView() {
  const mentorSessions = useAppStore((s) => s.mentorSessions);
  const addMentorMessage = useAppStore((s) => s.addMentorMessage);
  const clearMentorSessions = useAppStore((s) => s.clearMentorSessions);
  const tasks = useAppStore((s) => s.tasks);
  const selectedDate = useAppStore((s) => s.selectedDate);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<"ai" | "fallback" | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mentorSessions, loading]);

  const todaysTasks = tasks.filter((t) => t.date === selectedDate);
  const completedHours = todaysTasks
    .filter((t) => t.completed)
    .reduce((s, t) => s + parseHoursFromSlot(t.timeSlot), 0);
  const totalHours = todaysTasks.reduce((s, t) => s + parseHoursFromSlot(t.timeSlot), 0);

  const buildAutoSummary = () => {
    const done = todaysTasks.filter((t) => t.completed).length;
    const summary = todaysTasks
      .map(
        (t) =>
          `  - ${t.timeSlot} ${t.priority}: ${t.description} — ${t.completed ? "done" : "pending"}`
      )
      .join("\n");
    const energy = totalHours > 0 ? Math.round((completedHours / totalHours) * 5) + 5 : 7;
    return `Today (${selectedDate}) I completed ${done}/${todaysTasks.length} tasks (${completedHours.toFixed(1)}/${totalHours.toFixed(1)} hours).\n\nTasks:\n${summary}\n\nEnergy ${energy}/10. Please review and generate tomorrow's adjusted plan.`;
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setError(null);
    const userMsg = {
      id: `m${Date.now()}`,
      role: "user" as const,
      content: text,
      timestamp: Date.now(),
      sessionLabel: "Daily input",
    };
    addMentorMessage(userMsg);
    setInput("");
    setLoading(true);

    try {
      const conversationHistory = mentorSessions
        .filter((m) => m.role !== "system")
        .slice(-8)
        .map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: text, conversationHistory }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSource(data.source ?? "fallback");
      addMentorMessage({
        id: `m${Date.now() + 1}`,
        role: "assistant",
        content: data.response ?? "Mentor unavailable. Please try again.",
        timestamp: Date.now() + 1000,
        sessionLabel: data.source === "ai" ? "AI Mentor" : "Rule-based fallback",
      });
    } catch (e) {
      setError("Mentor API call failed. Please retry — your message was logged.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const sessions = mentorSessions.filter((m) => m.role !== "system");

  return (
    <div>
      <SectionHeader
        title="AI Mentor"
        subtitle="Your evening review companion. Share today's input — tasks done/skipped, hours, energy (1-10), blockers. Mentor applies the 6 decision rules and returns assessment, gaps, and tomorrow's adjusted plan."
        icon={<Brain className="size-5" />}
        actions={
          <Button
            onClick={clearMentorSessions}
            variant="outline"
            size="sm"
            className="border-[#b91c1c]/40 text-[#b91c1c] hover:bg-[#b91c1c]/10"
          >
            <Trash2 className="size-3.5 mr-1" /> Reset
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Conversation history sidebar */}
        <Card className="p-3 lg:max-h-[640px] lg:overflow-y-auto scroll-thin">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5a5a5a] mb-2 px-1 flex items-center gap-1.5">
            <Calendar className="size-3.5" /> Conversation History
          </h3>
          <div className="space-y-1.5">
            {sessions.length === 0 ? (
              <div className="text-xs text-[#5a5a5a] p-3 text-center">
                No conversations yet. Use the chat to start.
              </div>
            ) : (
              sessions.map((m, idx) => (
                <div
                  key={m.id}
                  className={cn(
                    "text-xs p-2 rounded border-l-2",
                    m.role === "user"
                      ? "border-l-[#0f2d4a] bg-[#f5f1e6]/60"
                      : "border-l-[#b8893a] bg-[#fef9ec]/60"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#0f2d4a]">
                      {m.role === "user" ? "You" : "Mentor"}
                    </span>
                    <span className="text-[9px] text-[#5a5a5a]">#{Math.floor(idx / 2) + 1}</span>
                  </div>
                  <div className="text-[10px] text-[#5a5a5a] mt-0.5">
                    {new Date(m.timestamp).toLocaleString("en", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="line-clamp-2 text-[#5a5a5a] mt-1">
                    {m.content.slice(0, 80).replace(/[*#]/g, "")}
                    {m.content.length > 80 ? "..." : ""}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Chat */}
        <Card className="lg:col-span-3 p-0 flex flex-col h-[640px]">
          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto scroll-thin p-4 space-y-4">
            {sessions.map((m) => (
              <MessageBubble key={m.id} role={m.role} content={m.content} sessionLabel={m.sessionLabel} />
            ))}
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-[#5a5a5a]">
                <Sparkles className="size-4 animate-pulse text-[#b8893a]" />
                Mentor is reviewing your day...
              </div>
            ) : null}
            {error ? (
              <div className="flex items-start gap-2 text-sm text-[#b91c1c] bg-[#fef2f2] p-3 rounded">
                <AlertCircle className="size-4 mt-0.5 shrink-0" />
                <div>{error}</div>
              </div>
            ) : null}
          </div>

          {/* Quick prompts */}
          <div className="px-3 pt-2 border-t border-border/60">
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className="text-[10px] uppercase tracking-wider text-[#5a5a5a] mr-1 self-center">
                Quick prompts:
              </span>
              {QUICK_PROMPTS.map((qp) => (
                <Button
                  key={qp.label}
                  variant="outline"
                  size="sm"
                  onClick={() => sendMessage(qp.text)}
                  disabled={loading}
                  className="h-7 text-[11px] border-[#b8893a]/50 text-[#0f2d4a] hover:bg-[#b8893a]/10"
                >
                  {qp.label}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput(buildAutoSummary())}
                disabled={loading || todaysTasks.length === 0}
                className="h-7 text-[11px] border-[#0f2d4a]/50 text-[#0f2d4a] hover:bg-[#0f2d4a]/10"
              >
                Auto-summary from today's tasks
              </Button>
            </div>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border/60 bg-[#f5f1e6]/40">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Share your day — tasks completed/skipped, hours, energy (1-10), one specific blocker..."
              rows={3}
              className="resize-none bg-white"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  sendMessage(input);
                }
              }}
            />
            <div className="flex items-center justify-between mt-2">
              <div className="text-[10px] text-[#5a5a5a] flex items-center gap-2">
                <span>⌘ + Enter to send</span>
                {source ? (
                  <Badge
                    variant="outline"
                    className={
                      source === "ai"
                        ? "border-[#1f4d3a] text-[#1f4d3a]"
                        : "border-[#b8893a] text-[#b8893a]"
                    }
                  >
                    {source === "ai" ? "Groq AI" : "Rule-based fallback"}
                  </Badge>
                ) : null}
              </div>
              <Button
                onClick={() => sendMessage(input)}
                disabled={loading || !input.trim()}
                className="bg-[#0f2d4a] hover:bg-[#1a3d5e] text-[#fafaf7]"
                size="sm"
              >
                <Send className="size-3.5 mr-1" /> Send to Mentor
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Rule reference */}
      <Card className="p-4 mt-4 bg-[#0f2d4a] text-[#fafaf7] border-0">
        <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5 text-[#d4a85a]">
          <Brain className="size-4" /> 6 Decision Rules the Mentor Applies
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
          <div><strong className="text-[#d4a85a]">Rule 1.</strong> Protect Revision Windows — never move revision for new content.</div>
          <div><strong className="text-[#d4a85a]">Rule 2.</strong> Prevent Over-Planning — auto-prune if &gt; 9h or &gt; 5 tasks.</div>
          <div><strong className="text-[#d4a85a]">Rule 3.</strong> Balance GS + Optional — block 90 min Optional if weekly &lt; 25%.</div>
          <div><strong className="text-[#d4a85a]">Rule 4.</strong> Adapt to Slippage — drop 1 lower-priority task for &gt;2d overdue.</div>
          <div><strong className="text-[#d4a85a]">Rule 5.</strong> High-Yield Priority — higher PYQ frequency wins ties.</div>
          <div><strong className="text-[#d4a85a]">Rule 6.</strong> Burnout Guard — fatigue OR 3×&lt;6h days → halve load + revision-only day.</div>
        </div>
      </Card>
    </div>
  );
}

function MessageBubble({
  role,
  content,
  sessionLabel,
}: {
  role: "user" | "assistant";
  content: string;
  sessionLabel?: string;
}) {
  const isUser = role === "user";
  return (
    <div className={cn("flex gap-3", isUser ? "flex-row-reverse" : "")}>
      <div
        className={cn(
          "size-8 rounded-full grid place-items-center shrink-0",
          isUser ? "bg-[#0f2d4a] text-[#fafaf7]" : "bg-[#b8893a] text-[#1a1a1a]"
        )}
      >
        {isUser ? <User className="size-4" /> : <Brain className="size-4" />}
      </div>
      <div
        className={cn(
          "max-w-[80%] rounded-lg p-3 text-sm",
          isUser
            ? "bg-[#0f2d4a] text-[#fafaf7]"
            : "bg-white border border-border shadow-sm"
        )}
      >
        {sessionLabel && !isUser ? (
          <div className="text-[10px] uppercase tracking-wider text-[#b8893a] font-semibold mb-1.5">
            {sessionLabel}
          </div>
        ) : null}
        <div className="prose prose-sm max-w-none whitespace-pre-wrap leading-relaxed">
          {renderMarkdown(content)}
        </div>
      </div>
    </div>
  );
}

// Very small markdown renderer — handles **bold**, bullet lists, paragraphs
function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split("\n");
  const out: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];
  let key = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      out.push(
        <ul key={`ul-${key++}`} className="list-disc pl-5 my-1.5 space-y-0.5">
          {listItems}
        </ul>
      );
      listItems = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const content = trimmed.slice(2);
      listItems.push(<li key={`li-${key++}`}>{renderInline(content)}</li>);
    } else if (trimmed === "") {
      flushList();
    } else {
      flushList();
      out.push(<p key={`p-${key++}`} className="my-1">{renderInline(trimmed)}</p>);
    }
  }
  flushList();
  return out;
}

function renderInline(text: string): React.ReactNode {
  // Handle **bold** and *italic*
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let k = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const m = match[0];
    if (m.startsWith("**")) {
      parts.push(
        <strong key={`b-${k++}`} className="font-bold">
          {m.slice(2, -2)}
        </strong>
      );
    } else {
      parts.push(<em key={`i-${k++}`}>{m.slice(1, -1)}</em>);
    }
    lastIndex = match.index + m.length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}
