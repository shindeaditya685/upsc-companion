"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { BookOpen, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

type AuthUser = { id: string; name: string; email: string };

type AuthContextType = {
  user: AuthUser | null;
  token: string | null;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  logout: () => {},
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("auth-token");
    if (!storedToken) {
      setIsLoading(false);
      return;
    }
    fetch("/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: storedToken }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.valid) {
          setToken(storedToken);
          setUser(data.user);
        } else {
          localStorage.removeItem("auth-token");
        }
      })
      .catch(() => console.error("[Auth] Token verification failed"))
      .finally(() => setIsLoading(false));
  }, []);

  const handleAuth = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "register" ? { name, email, password } : { email, password }
        ),
      });
      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || "Something went wrong");
        return;
      }

      if (!data || typeof data.token !== "string" || !data.user) {
        setFormError("Invalid server response. Please try again.");
        return;
      }

      localStorage.setItem("auth-token", data.token);
      setToken(data.token);
      setUser(data.user);
    } catch {
      setFormError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [mode]);

  const logout = useCallback(() => {
    localStorage.removeItem("auth-token");
    setToken(null);
    setUser(null);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafaf7] grid place-items-center">
        <Loader2 className="size-8 animate-spin text-[#0f2d4a]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#fafaf7] grid place-items-center p-4">
        <Card className="w-full max-w-md p-8 shadow-lg border-border/60">
          <div className="text-center mb-6">
            <div className="size-14 rounded-xl bg-[#0f2d4a] grid place-items-center mx-auto mb-4">
              <BookOpen className="size-7 text-[#d4a85a]" />
            </div>
            <h1 className="text-2xl font-bold font-serif text-[#0f2d4a]">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-sm text-[#5a5a5a] mt-1">
              {mode === "login"
                ? "Sign in to your UPSC Mains preparation dashboard"
                : "Start your 6-month Mains sprint journey"}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {mode === "register" && (
              <div>
                <label htmlFor="name" className="text-sm font-medium text-[#0f2d4a] block mb-1">
                  Name
                </label>
                <Input id="name" name="name" required placeholder="Your name" className="w-full" />
              </div>
            )}

            <div>
              <label htmlFor="email" className="text-sm font-medium text-[#0f2d4a] block mb-1">
                Email
              </label>
              <Input id="email" name="email" type="email" required placeholder="you@example.com" className="w-full" />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-[#0f2d4a] block mb-1">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                placeholder={mode === "register" ? "At least 8 characters" : "Your password"}
                className="w-full"
              />
            </div>

            {formError && (
              <div className="text-sm text-[#b91c1c] bg-[#fef2f2] p-2 rounded">{formError}</div>
            )}

            <Button type="submit" disabled={submitting} className="w-full bg-[#0f2d4a] hover:bg-[#1a3d5e] text-[#fafaf7]">
              {submitting ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-[#5a5a5a]">
            {mode === "login" ? (
              <span>
                Don't have an account?{" "}
                <button onClick={() => { setMode("register"); setFormError(""); }} className="text-[#0f2d4a] font-semibold underline underline-offset-2">
                  Register
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <button onClick={() => { setMode("login"); setFormError(""); }} className="text-[#0f2d4a] font-semibold underline underline-offset-2">
                  Sign In
                </button>
              </span>
            )}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, token, logout, isLoading: false }}>
      {children}
    </AuthContext.Provider>
  );
}
