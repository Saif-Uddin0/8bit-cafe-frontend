"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";

interface AuthContextType {
  user: any;
  profile: any;
  avatar: string;
  loading: boolean;
  isError?: boolean;
  error?: any;
  login: (data: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [tokenRestored, setTokenRestored] = useState(false);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  useEffect(() => {
    const savedToken = Cookies.get("accessToken");
    if (savedToken) {
      setToken(savedToken);
    }
    setTokenRestored(true);
  }, []);

  // Fetch profile when token is available
  const {
    data: profile,
    isLoading: isProfileLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/api/user/getMe");
        // Backend returns { data: { ...user }, success, message }
        return res.data?.data || res.data;
      } catch (err: any) {
        // Only treat 401 as a genuine "session expired" — clear cookies & reset token
        if (err.response?.status === 401) {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          setToken(null);
          return null;
        }
        // Throw network/500/403 errors so query enters isError state without wiping cookies
        throw err;
      }
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    refetchOnWindowFocus: false,
    retry: (failureCount, err: any) => {
      // Don't retry auth failures (401/403)
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        return false;
      }
      return failureCount < 2;
    },
  });

  // Derive user directly from profile to eliminate post-render useEffect race condition
  const user = profile ?? null;

  // Construct avatar URL
  const avatar = profile?.profile_image
    ? profile.profile_image.startsWith("http")
      ? profile.profile_image
      : `${process.env.NEXT_PUBLIC_BASE_URL || ""}${profile.profile_image}`
    : "https://i.ibb.co/2kRZ0y9/user.png";

  // Login handler
  const login = (responseData: any) => {
    const data = responseData?.data || responseData;
    const accessToken = data?.accessToken;
    const refreshToken = data?.refreshToken;

    if (accessToken) {
      Cookies.set("accessToken", accessToken, {
        expires: 7,
        secure: true,
        sameSite: "Lax",
      });
      setToken(accessToken);

      // Seed query cache if user object is provided in login response
      if (data?.user) {
        queryClient.setQueryData(["profile"], data.user);
      }

      // Invalidate profile and cart so they refetch immediately after login
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    }

    if (refreshToken) {
      Cookies.set("refreshToken", refreshToken, {
        expires: 7,
        secure: true,
        sameSite: "Lax",
      });
    }
  };

  // Logout handler
  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setToken(null);
    queryClient.setQueryData(["profile"], null);
    queryClient.removeQueries({ queryKey: ["profile"] });
    queryClient.removeQueries({ queryKey: ["cart"] });
  };

  // Auth is loading if cookie restoration is pending, or if token exists and /getMe is fetching initially
  const loading = !tokenRestored || (!!token && isProfileLoading);

  const value = {
    user,
    profile,
    avatar,
    loading,
    isError,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

