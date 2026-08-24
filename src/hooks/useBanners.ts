import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "@/hooks/useAxiosSecure";
import type { ApiBanner } from "@/types/api";

// GET /api/banners/true  →  returns only published (isPublished=true) banners
const fetchPublishedBanners = async (): Promise<ApiBanner[]> => {
  const res = await axiosSecure.get("/api/banners/true");
  return res.data?.data ?? [];
};

export function useBanners() {
  return useQuery<ApiBanner[]>({
    queryKey: ["banners", "published"],
    queryFn: fetchPublishedBanners,
    staleTime: 1000 * 60 * 10, // 10 min cache
  });
}
