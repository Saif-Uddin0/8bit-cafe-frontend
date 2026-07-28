import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "@/hooks/useAxiosSecure";
import type { ApiCategory, ApiCategoriesResponse } from "@/types/api";

const fetchCategories = async (): Promise<ApiCategory[]> => {
  const res = await axiosSecure.get<ApiCategoriesResponse>(
    "/api/category/getCategories"
  );
  return res.data?.data?.data ?? [];
};

export function useCategories() {
  return useQuery<ApiCategory[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10, // 10 min cache — categories rarely change
  });
}
