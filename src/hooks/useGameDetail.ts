import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "@/hooks/useAxiosSecure";
import type { ApiGame, ApiGameDetailResponse } from "@/types/api";

const fetchGameDetail = async (gameId: string): Promise<ApiGame | null> => {
  const res = await axiosSecure.get<ApiGameDetailResponse>(
    `/api/games/gameDetails/${gameId}`
  );
  
  return res.data?.data ?? null;
};

export function useGameDetail(gameId: string) {
  return useQuery<ApiGame | null>({
    queryKey: ["game", gameId],
    queryFn: () => fetchGameDetail(gameId),
    enabled: !!gameId,
    staleTime: 1000 * 60 * 5, // 5 min cache
  });
}
