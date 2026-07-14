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
  const { data: profile, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/api/auth/me");
        // console.log("GET profile:", res.data);
        // Adjust structure based on API response shape
        return res.data?.data || res.data;
      } catch (error: any) {
        if (error.response?.status === 404) {
          return null;
        }
        throw error;
      }
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    refetchOnWindowFocus: false,
    retry: 1,
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
      Cookies.set("accessToken", accessToken, { expires: 7 });
      setToken(accessToken);
    }

    if (refreshToken) {
      Cookies.set("refreshToken", refreshToken, { expires: 7 });
    }

    // Set temporary user if user object exists in response
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
    // Clear TanStack Query Cache
    queryClient.invalidateQueries({ queryKey: ["profile"] });
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
