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

export interface MyTransactionsFilters {
  method?: string;
  status?: string;
  paymentType?: string;
}

const fetchMyTransactions = async (
  page: number,
  limit: number,
  filters?: MyTransactionsFilters
): Promise<MyTransactionsResult> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (filters?.method && filters.method.toUpperCase() !== "ALL") {
    params.append("method", filters.method);
  }
  if (filters?.status && filters.status.toUpperCase() !== "ALL") {
    params.append("status", filters.status);
  }
  if (filters?.paymentType && filters.paymentType.toUpperCase() !== "ALL") {
    params.append("paymentType", filters.paymentType);
  }

  const res = await axiosSecure.get<ApiTransactionsResponse>(
    `/api/payment/myTransection?${params.toString()}`
  );
  // Response shape: { data: { meta: {...}, data: [...] }, success, message }
  const inner = res.data?.data;
  return {
    transactions: inner?.data ?? [],
    meta: inner?.meta ?? null,
  };
};

export function useMyTransactions(
  page = 1,
  limit = 10,
  filters?: MyTransactionsFilters
) {
  const { user } = useAuth();
  const method = filters?.method ?? "ALL";
  const status = filters?.status ?? "ALL";
  const paymentType = filters?.paymentType ?? "ALL";

  return useQuery<MyTransactionsResult>({
    queryKey: ["myTransactions", page, limit, method, status, paymentType],
    queryFn: () => fetchMyTransactions(page, limit, filters),
    enabled: !!user,
    staleTime: 1000 * 30, // 30 seconds — transactions can change
    refetchOnWindowFocus: false,
  });
}

