import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "@/hooks/useAxiosSecure";
import { useAuth } from "@/contexts/AuthContext";
import type { ApiBooking, ApiMyBookingsResponse } from "@/types/api";

const fetchMyBookings = async (): Promise<ApiBooking[]> => {
  const res = await axiosSecure.get<ApiMyBookingsResponse>("/api/booking/myGamesBooking");
  return res.data?.data ?? [];
};

interface UseMyBookingsOptions {
  /** Pass enabled override if needed; automatically checks !!user from useAuth() */
  enabled?: boolean;
}

export function useMyBookings({ enabled = true }: UseMyBookingsOptions = {}) {
  const { user } = useAuth();

  return useQuery<ApiBooking[]>({
    queryKey: ["myBookings"],
    queryFn: fetchMyBookings,
    enabled: enabled && !!user,
    staleTime: 1000 * 10, // 10 seconds — bookings change frequently
  });
}

