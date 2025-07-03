import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import { getCabins } from "../../services/apiCabins";
import { PAGE_SIZE } from "../../utils/constants";

export function useCabins() {
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const limit = !searchParams.get("limit")
    ? PAGE_SIZE
    : Number(searchParams.get("limit"));
  const orderBy = searchParams.get("orderBy") || "name";
  const order = searchParams.get("order") || "ASC";
  const discountFilter = searchParams.get("discountFilter") || undefined;

  const { isLoading, data, error } = useQuery({
    queryKey: ["cabins", page, limit, orderBy, order, discountFilter],
    queryFn: () => getCabins({ page, limit, orderBy, order, discountFilter }),
    onError: (err) => {
      toast.error(
        err?.response?.data?.error ||
          err?.message ||
          "Erro ao carregar as cabanas"
      );
    },
    keepPreviousData: true,
  });

  const cabins = data?.resource?.cabins || [];
  const count = data?.resource?.total || 0;
  const pageCount = data?.resource?.pageCount || 0;

  return { isLoading, error, cabins, count, pageCount };
}
