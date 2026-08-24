import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ApiAvailableSlot, ApiAvailableSlotsResponse } from "@/types/api";

interface UseAvailableSlotsParams {
  gameId: string;
  date: Date | null;
  durationMin: number; // 30 | 60 | 90
}

const fetchAvailableSlots = async (
  gameId: string,
  date: Date,
  durationMin: number
): Promise<ApiAvailableSlot[]> => {
  // Normalize to midnight UTC for the selected date
  const isoDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  ).toISOString();

  const res = await axios.get<ApiAvailableSlotsResponse>(
    "/api/proxy/available-slots",
    {
      params: { gameId, date: isoDate, durationMin },
    }
  );

  const slots: ApiAvailableSlot[] = res.data?.data ?? [];

  return slots;
};

export function useAvailableSlots({ gameId, date, durationMin }: UseAvailableSlotsParams) {
  return useQuery<ApiAvailableSlot[]>({
    queryKey: ["availableSlots", gameId, date?.toDateString(), durationMin],
    queryFn: () => fetchAvailableSlots(gameId, date!, durationMin),
    enabled: !!gameId && !!date && !!durationMin,
    staleTime: 1000 * 60,      // 60 s — manual invalidate on slot expire handles freshness
    gcTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false, // don't re-hit the API every time user alt-tabs
  });
}

