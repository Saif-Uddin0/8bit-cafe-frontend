import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "@/hooks/useAxiosSecure";
import type { ApiBooking, ApiMyBookingsResponse } from "@/types/api";

const fetchMyBookings = async (): Promise<ApiBooking[]> => {
  const res = await axiosSecure.get<ApiMyBookingsResponse>("/api/booking/myGamesBooking");
  return res.data?.data ?? [];
};

interface UseMyBookingsOptions {
  /** Pass !!user from useAuth() to prevent unauthenticated requests */
  enabled?: boolean;
}

export function useMyBookings({ enabled = true }: UseMyBookingsOptions = {}) {
  return useQuery<ApiBooking[]>({
    queryKey: ["myBookings"],
    queryFn: fetchMyBookings,
    enabled,
    staleTime: 1000 * 10, // 10 seconds — bookings change frequently
  });
}
