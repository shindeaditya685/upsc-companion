"use client";

import { AppSidebar } from "./app-sidebar";
import { useAppStore } from "@/lib/store";
import { StrategyView } from "./views/strategy-view";
import { DashboardView } from "./views/dashboard-view";
import { SixMonthPlannerView } from "./views/six-month-planner-view";
import { MonthlyPlannerView } from "./views/monthly-planner-view";
import { WeeklyPlannerView } from "./views/weekly-planner-view";
import { DailyPlannerView } from "./views/daily-planner-view";
import { GSTrackerView } from "./views/gs-tracker-view";
import { SociologyTrackerView } from "./views/sociology-tracker-view";
import { NotesTrackerView } from "./views/notes-tracker-view";
import { RevisionTrackerView } from "./views/revision-tracker-view";
import { PYQTrackerView } from "./views/pyq-tracker-view";
import { CATrackerView } from "./views/ca-tracker-view";
import { TestAnalysisView } from "./views/test-analysis-view";
import { AIMentorView } from "./views/ai-mentor-view";
import { AnalyticsView } from "./views/analytics-view";
import { KnowledgeBankView } from "./views/knowledge-bank-view";

export function AppShell() {
  const activeView = useAppStore((s) => s.activeView);

  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#1a1a1a]">
      <AppSidebar />
      <main className="lg:pl-64 min-h-screen">
        <div className="px-4 sm:px-6 lg:px-10 pt-6 lg:pt-8 pb-12 max-w-[1600px] mx-auto">
          {activeView === "strategy" && <StrategyView />}
          {activeView === "dashboard" && <DashboardView />}
          {activeView === "six-month" && <SixMonthPlannerView />}
          {activeView === "monthly" && <MonthlyPlannerView />}
          {activeView === "weekly" && <WeeklyPlannerView />}
          {activeView === "daily" && <DailyPlannerView />}
          {activeView === "gs-tracker" && <GSTrackerView />}
          {activeView === "sociology-tracker" && <SociologyTrackerView />}
          {activeView === "notes-tracker" && <NotesTrackerView />}
          {activeView === "revision-tracker" && <RevisionTrackerView />}
          {activeView === "pyq-tracker" && <PYQTrackerView />}
          {activeView === "ca-tracker" && <CATrackerView />}
          {activeView === "test-analysis" && <TestAnalysisView />}
          {activeView === "ai-mentor" && <AIMentorView />}
          {activeView === "analytics" && <AnalyticsView />}
          {activeView === "knowledge-bank" && <KnowledgeBankView />}
        </div>
      </main>
    </div>
  );
}
