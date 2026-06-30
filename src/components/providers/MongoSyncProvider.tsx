"use client";

import { useEffect, useRef, useCallback, type ReactNode } from "react";
import { useAuth } from "./AuthProvider";
import { useAppStore } from "@/lib/store";

const DEBOUNCE_MS = 2000;

export function MongoSyncProvider({ children }: { children: ReactNode }) {
  const { user, token } = useAuth();
  const initialized = useRef(false);
  const loaded = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingState = useRef<Record<string, unknown> | null>(null);

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
          const current = useAppStore.getState();
          for (const [key, val] of Object.entries(rest)) {
            if (Array.isArray(val) && val.length === 0) {
              const cur = (current as Record<string, unknown>)[key];
              if (Array.isArray(cur) && cur.length > 0) continue;
            }
            useAppStore.setState({ [key]: val });
          }
        }
      } catch (err) {
        console.error("[Sync] Failed to load user data:", err);
      }
      loaded.current = true;
    };

    initialized.current = true;
    loadFromDB();
  }, [user, token]);

  const buildPayload = useCallback((state: Record<string, unknown>) => ({
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
  }), []);

  const save = useCallback((state: Record<string, unknown>) => {
    fetch("/api/user-data", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(buildPayload(state)),
    }).catch((err) => console.error("[Sync] Failed to save:", err));
  }, [token, buildPayload]);

  useEffect(() => {
    if (!user || !token) return;

    const unsub = useAppStore.subscribe((state) => {
      if (!loaded.current) return;
      pendingState.current = state;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        pendingState.current = null;
        save(state);
      }, DEBOUNCE_MS);
    });

    const onBeforeUnload = () => {
      if (timerRef.current && pendingState.current) {
        clearTimeout(timerRef.current);
        const blob = new Blob([JSON.stringify(buildPayload(pendingState.current))], { type: "application/json" });
        navigator.sendBeacon("/api/user-data", blob);
      }
    };

    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      unsub();
      window.removeEventListener("beforeunload", onBeforeUnload);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [user, token, save]);

  return <>{children}</>;
}
