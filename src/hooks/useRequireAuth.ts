"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { toast } from "react-toastify";

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
        toast.info("Please sign in to continue. Redirecting you to login…", {
          theme: "dark",
          autoClose: 3000,
          position: "top-right",
        });
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
