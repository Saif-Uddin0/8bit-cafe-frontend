"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading, isError } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Avoid redirect loops if already on login page
    if (pathname === "/login") return;

    // Only redirect when auth initialization is complete, user is absent, and no network/server error occurred
    if (!loading && !user && !isError) {
      const searchStr = searchParams.toString();
      const currentUrl = searchStr ? `${pathname}?${searchStr}` : pathname;
      router.replace(`/login?redirect=${encodeURIComponent(currentUrl)}`);
    }
  }, [user, loading, isError, router, pathname, searchParams]);

  // Show loading indicator while auth status is being determined
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0612] flex items-center justify-center pt-24 pb-12">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#CD4ECD] animate-spin" />
          <p className="text-white/40 text-xs font-medium uppercase tracking-wider">
            Verifying Authentication...
          </p>
        </div>
      </div>
    );
  }

  // Handle server / network errors without redirecting or treating user as logged out
  if (isError && !user) {
    return (
      <div className="min-h-screen bg-[#0A0612] flex items-center justify-center pt-24 pb-12 px-4">
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 max-w-md text-center">
          <p className="text-red-400 font-bold text-base mb-2">Authentication Error</p>
          <p className="text-white/60 text-xs mb-4">
            Unable to connect to the authentication server. Please check your connection and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-xl bg-[#6C04D7] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#6C04D7]/80 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Prevent flash of protected content while redirecting unauthenticated users
  if (!user) {
    return null;
  }

  return <>{children}</>;
}

