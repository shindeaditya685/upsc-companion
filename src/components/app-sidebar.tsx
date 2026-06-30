"use client";

import { useState } from "react";
import { Menu, X, BookOpen, ChevronRight, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import type { ViewId } from "@/lib/types";
import { NAV_ITEMS, type NavItem } from "@/lib/nav";
import { useAuth } from "@/components/providers/AuthProvider";

interface SidebarInnerProps {
  onNavigate?: () => void;
}

function SidebarInner({ onNavigate }: SidebarInnerProps) {
  const activeView = useAppStore((s) => s.activeView);
  const setActiveView = useAppStore((s) => s.setActiveView);
  const { user, logout } = useAuth();

  const handleSelect = (id: ViewId) => {
    setActiveView(id);
    onNavigate?.();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo / brand */}
      <div className="px-5 py-5 border-b border-[rgba(200,185,136,0.25)]">
        <div className="flex items-center gap-2.5">
          <div className="size-9 rounded-md bg-[#b8893a] grid place-items-center shrink-0">
            <BookOpen className="size-5 text-[#0f2d4a]" strokeWidth={2.2} />
          </div>
          <div>
            <div className="font-serif font-bold text-base text-[#fafaf7] leading-tight">
              UPSC Mentor
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#d4a85a]">
              Mains Sprint · Dec 2026
            </div>
          </div>
        </div>
      </div>

      {/* Nav list */}
      <nav className="flex-1 overflow-y-auto scroll-thin py-3 px-2">
        <div className="text-[10px] uppercase tracking-wider text-[#c8b988]/70 px-3 mb-1 mt-1">
          Overview
        </div>
        {NAV_ITEMS.slice(0, 2).map((item) => (
          <NavButton key={item.id} item={item} active={activeView === item.id} onSelect={handleSelect} />
        ))}

        <div className="text-[10px] uppercase tracking-wider text-[#c8b988]/70 px-3 mb-1 mt-3">
          Planners
        </div>
        {NAV_ITEMS.slice(2, 6).map((item) => (
          <NavButton key={item.id} item={item} active={activeView === item.id} onSelect={handleSelect} />
        ))}

        <div className="text-[10px] uppercase tracking-wider text-[#c8b988]/70 px-3 mb-1 mt-3">
          Subject Trackers
        </div>
        {NAV_ITEMS.slice(6, 9).map((item) => (
          <NavButton key={item.id} item={item} active={activeView === item.id} onSelect={handleSelect} />
        ))}

        <div className="text-[10px] uppercase tracking-wider text-[#c8b988]/70 px-3 mb-1 mt-3">
          Practice Trackers
        </div>
        {NAV_ITEMS.slice(9, 12).map((item) => (
          <NavButton key={item.id} item={item} active={activeView === item.id} onSelect={handleSelect} />
        ))}

        <div className="text-[10px] uppercase tracking-wider text-[#c8b988]/70 px-3 mb-1 mt-3">
          AI · Analysis · Bank
        </div>
        {NAV_ITEMS.slice(12).map((item) => (
          <NavButton key={item.id} item={item} active={activeView === item.id} onSelect={handleSelect} />
        ))}
      </nav>

      <div className="px-4 py-3 border-t border-[rgba(200,185,136,0.25)] text-[11px] text-[#c8b988]/80">
        <div className="flex items-center justify-between mb-2">
          <span>Week 11 · Phase 2</span>
          <span className="text-[#d4a85a]">23-29 Sep</span>
        </div>
        {user ? (
          <div className="flex items-center justify-between">
            <span className="truncate max-w-[140px]">{user.name}</span>
            <button
              onClick={logout}
              className="flex items-center gap-1 text-[#c8b988]/70 hover:text-[#d4a85a] transition-colors"
              title="Logout"
            >
              <LogOut className="size-3" />
              <span>Logout</span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function NavButton({
  item,
  active,
  onSelect,
}: {
  item: NavItem;
  active: boolean;
  onSelect: (id: ViewId) => void;
}) {
  const IconCmp = item.icon;
  return (
    <button
      onClick={() => onSelect(item.id)}
      className={cn(
        "nav-item w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2.5 mb-0.5 transition-colors",
        active
          ? "active bg-[#1a3d5e] text-[#fafaf7]"
          : "text-[#e8e0c8] hover:bg-[#1a3d5e]/60 hover:text-[#fafaf7]"
      )}
    >
      <span className={cn("shrink-0", active ? "text-[#d4a85a]" : "text-[#c8b988]")}>
        <IconCmp className="size-4" />
      </span>
      <span className="flex-1 truncate">{item.label}</span>
      {active ? <ChevronRight className="size-3.5 text-[#d4a85a]" /> : null}
    </button>
  );
}

export function AppSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar — fixed */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-[#0f2d4a] z-30">
        <SidebarInner />
      </aside>

      {/* Mobile sidebar via Sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <button
            className="lg:hidden fixed top-3 left-3 z-40 size-10 rounded-md bg-[#0f2d4a] text-[#fafaf7] grid place-items-center shadow-md"
            aria-label="Open navigation"
          >
            <Menu className="size-5" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0 bg-[#0f2d4a] border-r-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute right-3 top-3 size-8 rounded-md text-[#fafaf7] hover:bg-[#1a3d5e] grid place-items-center"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
          <SidebarInner onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
}
