import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "@/hooks/useAxiosSecure";
import { useAuth } from "@/contexts/AuthContext";
import type { ApiTransaction, ApiTransactionsResponse } from "@/types/api";

const fetchMyTransactions = async (): Promise<ApiTransaction[]> => {
  const res = await axiosSecure.get<ApiTransactionsResponse>(
    "/api/payment/myTransection"
  );
  return res.data?.data ?? [];
};

export function useMyTransactions() {
  const { user } = useAuth();

  return useQuery<ApiTransaction[]>({
    queryKey: ["myTransactions"],
    queryFn: fetchMyTransactions,
    enabled: !!user,
    staleTime: 1000 * 30, // 30 seconds — transactions can change
    refetchOnWindowFocus: false,
  });
}
