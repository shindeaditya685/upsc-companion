import {
  Compass,
  LayoutDashboard,
  CalendarRange,
  CalendarDays,
  CalendarClock,
  CalendarCheck,
  BookOpenCheck,
  GraduationCap,
  NotebookPen,
  Repeat,
  FileQuestion,
  Newspaper,
  ClipboardList,
  Brain,
  BarChart3,
  Library,
  type LucideIcon,
} from "lucide-react";
import type { ViewId } from "./types";

export interface NavItem {
  id: ViewId;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "strategy", label: "My Strategy", icon: Compass },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "six-month", label: "Six-Month Planner", icon: CalendarRange },
  { id: "monthly", label: "Monthly Planner", icon: CalendarDays },
  { id: "weekly", label: "Weekly Planner", icon: CalendarClock },
  { id: "daily", label: "Daily Planner", icon: CalendarCheck },
  { id: "gs-tracker", label: "GS Tracker", icon: BookOpenCheck },
  { id: "sociology-tracker", label: "Sociology Tracker", icon: GraduationCap },
  { id: "notes-tracker", label: "Notes Tracker", icon: NotebookPen },
  { id: "revision-tracker", label: "Revision Tracker", icon: Repeat },
  { id: "pyq-tracker", label: "PYQ Tracker", icon: FileQuestion },
  { id: "ca-tracker", label: "Current Affairs Tracker", icon: Newspaper },
  { id: "test-analysis", label: "Test Analysis", icon: ClipboardList },
  { id: "ai-mentor", label: "AI Mentor", icon: Brain },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "knowledge-bank", label: "Knowledge Bank", icon: Library },
];
