"use client";

import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  showLabel?: boolean;
  label?: string;
  size?: "sm" | "md";
  variant?: "gold" | "navy" | "green" | "red";
}

const variantMap = {
  gold: "bg-[#b8893a]",
  navy: "bg-[#0f2d4a]",
  green: "bg-[#1f4d3a]",
  red: "bg-[#b91c1c]",
};

export function ProgressBar({
  value,
  className,
  showLabel,
  label,
  size = "md",
  variant = "gold",
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "flex-1 rounded-full bg-[#efe9d8] overflow-hidden",
          size === "sm" ? "h-1.5" : "h-2.5"
        )}
      >
        <div
          className={cn("h-full rounded-full transition-all", variantMap[variant])}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel ? (
        <span className="text-xs font-semibold text-[#0f2d4a] min-w-[3rem] text-right">
          {label ?? `${clamped}%`}
        </span>
      ) : null}
    </div>
  );
}
