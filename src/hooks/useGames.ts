import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "@/hooks/useAxiosSecure";
import type { ApiGame, ApiGamesResponse } from "@/types/api";

const fetchGames = async (): Promise<ApiGame[]> => {
  const res = await axiosSecure.get<ApiGamesResponse>("/api/games?limit=10000");
  
  // Safely return the array from the backend response shape
  return res.data?.data?.data ?? [];
};

export function useGames() {
  return useQuery<ApiGame[]>({
    queryKey: ["games"],
    queryFn: fetchGames,
    staleTime: 1000 * 60 * 5, // 5 min cache
  });
}
