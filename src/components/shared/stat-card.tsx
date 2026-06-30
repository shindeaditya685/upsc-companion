"use client";

import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon?: React.ReactNode;
  accent?: "navy" | "gold" | "green" | "red";
  className?: string;
}

const accentMap = {
  navy: { bg: "bg-[#0f2d4a]", fg: "text-[#fafaf7]", accent: "text-[#d4a85a]" },
  gold: { bg: "bg-[#b8893a]", fg: "text-[#1a1a1a]", accent: "text-[#0f2d4a]" },
  green: { bg: "bg-[#1f4d3a]", fg: "text-[#fafaf7]", accent: "text-[#d4a85a]" },
  red: { bg: "bg-[#b91c1c]", fg: "text-[#fafaf7]", accent: "text-[#fafaf7]" },
};

export function StatCard({ label, value, sub, icon, accent = "navy", className }: StatCardProps) {
  const a = accentMap[accent];
  return (
    <div
      className={cn(
        "rounded-lg p-4 shadow-sm border border-border/60 flex flex-col gap-1",
        a.bg,
        a.fg,
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wider font-semibold opacity-80">{label}</span>
        {icon ? <span className="opacity-80">{icon}</span> : null}
      </div>
      <div className="text-3xl font-bold font-serif">{value}</div>
      {sub ? <div className={cn("text-xs mt-0.5", a.accent)}>{sub}</div> : null}
    </div>
  );
}
