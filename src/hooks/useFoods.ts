import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "@/hooks/useAxiosSecure";
import type { ApiFood, ApiFoodsResponse } from "@/types/api";

export interface UseFoodsOptions {
  page?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

const fetchFoods = async (options: UseFoodsOptions): Promise<{ foods: ApiFood[]; total: number }> => {
  const { page = 1, sortBy = "price", sortOrder = "asc" } = options;
  const res = await axiosSecure.get<ApiFoodsResponse>("/api/foods/getFoods", {
    params: { page, sortBy, sortOrder },
  });
  const meta = res.data?.data?.meta;
  return {
    foods: res.data?.data?.data ?? [],
    total: meta?.total ?? 0,
  };
};

export function useFoods(options: UseFoodsOptions = {}) {
  return useQuery({
    queryKey: ["foods", options],
    queryFn: () => fetchFoods(options),
    staleTime: 1000 * 60 * 5,
  });
}
