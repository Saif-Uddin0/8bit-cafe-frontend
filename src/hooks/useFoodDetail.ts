import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "@/hooks/useAxiosSecure";
import type { ApiFood, ApiFoodDetailResponse } from "@/types/api";

const fetchFoodDetail = async (foodId: string): Promise<ApiFood | null> => {
  const res = await axiosSecure.get<ApiFoodDetailResponse>(
    `/api/foods/foodDetails/${foodId}`
  );

  // Shape 1 (confirmed from Postman): { data: ApiFood, success, message }
  if (res.data?.data && !Array.isArray(res.data.data)) {
    return res.data.data as ApiFood;
  }

  // Shape 2 fallback: array [ ApiFood ]
  if (Array.isArray(res.data)) {
    const arr = res.data as unknown as ApiFood[];
    return arr.length > 0 ? arr[0] : null;
  }

  return null;
};

export function useFoodDetail(foodId: string) {
  return useQuery<ApiFood | null>({
    queryKey: ["food", foodId],
    queryFn: () => fetchFoodDetail(foodId),
    enabled: !!foodId,
    staleTime: 1000 * 60 * 5,
  });
}
