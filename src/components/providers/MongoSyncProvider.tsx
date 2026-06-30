"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useAuth } from "./AuthProvider";
import { useAppStore } from "@/lib/store";

const DEBOUNCE_MS = 2000;

export function MongoSyncProvider({ children }: { children: ReactNode }) {
  const { user, token } = useAuth();
  const initialized = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!user || !token || initialized.current) return;

    const loadFromDB = async () => {
      try {
        const res = await fetch("/api/user-data", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();

        if (json.data) {
          const { _id, userId, updatedAt, ...rest } = json.data;
          useAppStore.setState({ ...rest });
        }
      } catch (err) {
        console.error("[Sync] Failed to load user data:", err);
      }
    };

    initialized.current = true;
    loadFromDB();
  }, [user, token]);

  // Subscribe to store changes and sync to MongoDB
  useEffect(() => {
    if (!user || !token) return;

    const unsub = useAppStore.subscribe((state) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        fetch("/api/user-data", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            tasks: state.tasks,
            sixMonthPlan: state.sixMonthPlan,
            weeklyPlans: state.weeklyPlans,
            monthlyPlans: state.monthlyPlans,
            gsTracker: state.gsTracker,
            sociologyTracker: state.sociologyTracker,
            notesTracker: state.notesTracker,
            revisionTracker: state.revisionTracker,
            pyqTracker: state.pyqTracker,
            caTracker: state.caTracker,
            testAnalysis: state.testAnalysis,
            knowledgeBank: state.knowledgeBank,
            mentorSessions: state.mentorSessions,
            studyLogs: state.studyLogs,
          }),
        }).catch((err) => console.error("[Sync] Failed to save:", err));
      }, DEBOUNCE_MS);
    });

    return () => {
      unsub();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [user, token]);

  return <>{children}</>;
}
