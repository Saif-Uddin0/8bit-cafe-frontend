"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import notify from "@/lib/notify";

/**
 * Custom hook to guard interactive actions (e.g., Book Now, Checkout, Add to Cart).
 * If user is authenticated, executes the callback.
 * If user is not authenticated, shows a toast and redirects to /login preserving the return URL.
 */
export function useRequireAuth() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const requireAuth = useCallback(
    (actionCallback: () => void) => {
      if (user) {
        actionCallback();
      } else {
        const searchStr = searchParams.toString();
        const currentUrl = searchStr ? `${pathname}?${searchStr}` : pathname;
        notify.info(
          "Sign in required",
          "Please sign in to continue. Taking you to login…"
        );
        setTimeout(() => {
          router.push(`/login?redirect=${encodeURIComponent(currentUrl)}`);
        }, 1200);
      }
    },
    [user, router, pathname, searchParams]
  );

  return { requireAuth, isAuthenticated: !!user };
}

export default useRequireAuth;
