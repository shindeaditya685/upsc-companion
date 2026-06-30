"use client";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export function SectionHeader({ title, subtitle, icon, actions, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-5", className)}>
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-start gap-3">
          {icon ? (
            <div className="mt-1 size-9 rounded-md bg-[#0f2d4a] text-[#d4a85a] grid place-items-center shrink-0">
              {icon}
            </div>
          ) : null}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0f2d4a]">{title}</h1>
            {subtitle ? (
              <p className="text-sm text-[#5a5a5a] mt-0.5 max-w-2xl">{subtitle}</p>
            ) : null}
          </div>
        </div>
        {actions ? <div className="flex items-center gap-2 flex-wrap">{actions}</div> : null}
      </div>
      <div className="gold-rule mt-3 max-w-md" />
    </div>
  );
}
