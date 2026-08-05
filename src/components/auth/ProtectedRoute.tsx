"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Avoid redirect loops if already on login page
    if (pathname === "/login") return;

    if (!loading && !user) {
      const searchStr = searchParams.toString();
      const currentUrl = searchStr ? `${pathname}?${searchStr}` : pathname;
      router.replace(`/login?redirect=${encodeURIComponent(currentUrl)}`);
    }
  }, [user, loading, router, pathname, searchParams]);

  // Show loading indicator while auth status is being determined
  if (loading || !user) {
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

  return <>{children}</>;
}
