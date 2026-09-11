import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "@/hooks/useAxiosSecure";
import { useAuth } from "@/contexts/AuthContext";
import type {
  ApiTransaction,
  ApiTransactionsMeta,
  ApiTransactionsResponse,
} from "@/types/api";

// Shape returned by the hook
export interface MyTransactionsResult {
  transactions: ApiTransaction[];
  meta: ApiTransactionsMeta | null;
}

const fetchMyTransactions = async (
  page: number,
  limit: number
): Promise<MyTransactionsResult> => {
  const res = await axiosSecure.get<ApiTransactionsResponse>(
    `/api/payment/myTransection?page=${page}&limit=${limit}`
  );
  // Response shape: { data: { meta: {...}, data: [...] }, success, message }
  const inner = res.data?.data;
  return {
    transactions: inner?.data ?? [],
    meta: inner?.meta ?? null,
  };
};

export function useMyTransactions(page = 1, limit = 10) {
  const { user } = useAuth();

  return useQuery<MyTransactionsResult>({
    queryKey: ["myTransactions", page, limit],
    queryFn: () => fetchMyTransactions(page, limit),
    enabled: !!user,
    staleTime: 1000 * 30, // 30 seconds — transactions can change
    refetchOnWindowFocus: false,
  });
}
