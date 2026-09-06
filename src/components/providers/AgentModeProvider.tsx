"use client";

/* eslint-disable react-hooks/set-state-in-effect -- intentional hydration/route sync pattern */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import {
  fetchMarkdownForPath,
  getCachedMarkdown,
  setCachedMarkdown,
} from "@/lib/agent-mode/fetch-markdown";

export type AgentMode = "human" | "agent";

interface AgentModeContextValue {
  mode: AgentMode;
  setMode: (mode: AgentMode) => void;
  toggleMode: () => void;
  markdownContent: string | null;
  isLoading: boolean;
  error: string | null;
  currentPath: string;
  refetchMarkdown: () => void;
}

const AgentModeContext = createContext<AgentModeContextValue | null>(null);

const STORAGE_KEY = "agent_view_mode";

export function AgentModeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";
  const [mode, setModeState] = useState<AgentMode>("human");
  const [markdownContent, setMarkdownContent] = useState<string | null>(() => getCachedMarkdown(pathname) ?? null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const isInitialMount = useRef(true);

  // Update URL search parameters without triggering hard navigation
  const syncUrlWithMode = useCallback((targetMode: AgentMode) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (targetMode === "agent") {
      url.searchParams.set("mode", "agent");
    } else {
      url.searchParams.delete("mode");
    }
    const searchStr = url.search ? url.search : "";
    const hashStr = url.hash ? url.hash : "";
    window.history.replaceState({}, "", url.pathname + searchStr + hashStr);
  }, []);

  // Initialize preference on client mount
  useEffect(() => {
    let initialMode: AgentMode = "human";
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("mode") === "agent") {
      initialMode = "agent";
    } else {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === "agent" || stored === "human") {
          initialMode = stored;
        }
      } catch {
        // ignore localStorage error
      }
    }
    setModeState(initialMode);
    if (initialMode === "agent") {
      syncUrlWithMode("agent");
      const cached = getCachedMarkdown(pathname);
      if (cached) {
        setMarkdownContent(cached);
      }
    }
    setHydrated(true);
  }, [pathname, syncUrlWithMode]);

  // Set mode handler with instant synchronous cache hydration
  const setMode = useCallback((newMode: AgentMode) => {
    setModeState(newMode);
    if (newMode === "agent") {
      const cached = getCachedMarkdown(pathname);
      if (cached) {
        setMarkdownContent(cached);
        setError(null);
      }
    }
    try {
      localStorage.setItem(STORAGE_KEY, newMode);
    } catch {
      // ignore storage errors
    }
    syncUrlWithMode(newMode);
  }, [pathname, syncUrlWithMode]);

  const toggleMode = useCallback(() => {
    setMode(mode === "human" ? "agent" : "human");
  }, [mode, setMode]);

  // Fetch or prefetch markdown for current pathname
  const loadMarkdown = useCallback(async (path: string, isForeground: boolean) => {
    const cached = getCachedMarkdown(path);
    if (cached) {
      if (isForeground) {
        setMarkdownContent(cached);
        setError(null);
        setIsLoading(false);
      }
      return;
    }

    if (isForeground) {
      setIsLoading(true);
      setError(null);
    }

    try {
      const text = await fetchMarkdownForPath(path);
      setCachedMarkdown(path, text);
      if (isForeground) {
        setMarkdownContent(text);
        setError(null);
      }
    } catch (err) {
      if (isForeground) {
        setError(err instanceof Error ? err.message : "Failed to load agent view.");
        setMarkdownContent(null);
      }
    } finally {
      if (isForeground) {
        setIsLoading(false);
      }
    }
  }, []);

  // Background prefetch and active route sync
  useEffect(() => {
    if (mode === "agent") {
      const cached = getCachedMarkdown(pathname);
      if (cached) {
        setMarkdownContent(cached);
        setError(null);
      } else {
        setMarkdownContent(null);
      }
    }

    // Always prefetch in background so toggle is instant
    loadMarkdown(pathname, mode === "agent");

    // Maintain URL param on route change if in agent mode
    if (hydrated && !isInitialMount.current && mode === "agent") {
      syncUrlWithMode("agent");
    }
    isInitialMount.current = false;
  }, [pathname, mode, hydrated, loadMarkdown, syncUrlWithMode]);

  const refetchMarkdown = useCallback(() => {
    loadMarkdown(pathname, true);
  }, [pathname, loadMarkdown]);

  return (
    <AgentModeContext.Provider
      value={{
        mode,
        setMode,
        toggleMode,
        markdownContent,
        isLoading,
        error,
        currentPath: pathname,
        refetchMarkdown,
      }}
    >
      {children}
    </AgentModeContext.Provider>
  );
}

export function useAgentMode(): AgentModeContextValue {
  const ctx = useContext(AgentModeContext);
  if (!ctx) {
    throw new Error("useAgentMode must be used within an AgentModeProvider");
  }
  return ctx;
}
