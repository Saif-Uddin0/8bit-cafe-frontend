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
  login: (data: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Load token from cookies on mount
  useEffect(() => {
    const savedToken = Cookies.get("accessToken");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Fetch profile when token is available
  // The correct endpoint is /api/user/getMe (returns 401 when unauth, 404 means route missing)
  const { data: profile, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/api/user/getMe");
        // Backend returns { data: { ...user }, success, message }
        return res.data?.data || res.data;
      } catch (error: any) {
        // 401 = expired/missing token, clear session
        if (error.response?.status === 401 || error.response?.status === 403) {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          return null;
        }
        // 404 = route may not exist in this environment, swallow silently
        if (error.response?.status === 404) {
          return null;
        }
        throw error;
      }
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    refetchOnWindowFocus: false,
    retry: 0, // Don't retry auth failures
  });

  // Sync user state with fetched profile query
  useEffect(() => {
    if (profile) {
      setUser(profile);
    } else if (isError) {
      // Clear credentials if token is invalid or expired
      logout();
    }
  }, [profile, isError]);

  // Construct avatar URL
  const avatar = profile?.profile_image
    ? (profile.profile_image.startsWith("http")
      ? profile.profile_image
      : `${process.env.NEXT_PUBLIC_BASE_URL || ""}${profile.profile_image}`)
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
      // Invalidate profile and cart so they refetch immediately after login
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    }

    if (refreshToken) {
      // Cookies.set("refreshToken", refreshToken, { expires: 7 });
      Cookies.set("refreshToken", refreshToken, {
        expires: 7,
        secure: true,
        sameSite: "Lax",
      });
    }

    // If the login response embeds the user object, set it immediately
    // so the UI can show name/avatar without waiting for the profile fetch
    if (data?.user) {
      setUser(data.user);
    }
  };

  // Logout handler
  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setToken(null);
    setUser(null);
    // Remove both profile and cart to prevent stale data from a previous user
    queryClient.removeQueries({ queryKey: ["profile"] });
    queryClient.removeQueries({ queryKey: ["cart"] });
  };

  const value = {
    user,
    profile,
    avatar,
    loading: isLoading && !!token,
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
