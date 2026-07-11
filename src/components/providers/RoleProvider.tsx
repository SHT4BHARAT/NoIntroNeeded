"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ROLE_COOKIE_NAME, isValidRole } from "@/lib/role/cookie";
import { track } from "@/lib/analytics";

interface RoleContextValue {
  currentRole: string | null;
  selectRole: (role: string | null) => void;
  showSelector: boolean;
  dismissSelector: () => void;
}

const RoleContext = createContext<RoleContextValue | null>(null);

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : undefined;
}

function setCookie(name: string, value: string, days: number) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function removeCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentRole, setCurrentRole] = useState<string | null>(() => {
    if (typeof document === "undefined") return null;
    const cookie = getCookie(ROLE_COOKIE_NAME);
    return cookie && isValidRole(cookie) ? cookie : null;
  });
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    const cookie = getCookie(ROLE_COOKIE_NAME);
    const onRolePage = isValidRole(pathname.split("/")[1]);
    if (!cookie && !onRolePage && pathname === "/") {
      const timer = setTimeout(() => setShowSelector(true), 500);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const selectRole = useCallback(
    (role: string | null) => {
      setShowSelector(false);
      track("role_select", { role: role ?? "all" });
      if (role && isValidRole(role)) {
        setCookie(ROLE_COOKIE_NAME, role, 365);
        setCurrentRole(role);
      } else {
        removeCookie(ROLE_COOKIE_NAME);
        setCurrentRole(null);
      }
      if (pathname !== "/") {
        router.push("/");
      }
    },
    [router, pathname]
  );

  const dismissSelector = useCallback(() => {
    setShowSelector(false);
  }, []);

  return (
    <RoleContext.Provider
      value={{ currentRole, selectRole, showSelector, dismissSelector }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole(): RoleContextValue {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
}
