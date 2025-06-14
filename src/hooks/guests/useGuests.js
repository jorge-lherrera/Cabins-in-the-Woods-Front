import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import { getGuests } from "../../services/apiGuests";

export function useGuests() {
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const limit = !searchParams.get("limit")
    ? 10
    : Number(searchParams.get("limit"));
  const orderBy = searchParams.get("orderBy") || "name";
  const order = searchParams.get("order") || "ASC";
  const nationality = searchParams.get("nationality") || undefined;

  const { isLoading, data, error } = useQuery({
    queryKey: ["guests", page, limit, orderBy, order, nationality],
    queryFn: () => getGuests({ page, limit, orderBy, order, nationality }),
    onError: (err) => {
      toast.error(
        err?.response?.data?.error ||
          err?.message ||
          "Erro ao carregar os hóspedes",
      );
    },
    keepPreviousData: true,
  });

  const guests = data?.resource?.guests || [];
  const count = data?.resource?.total || 0;
  const pageCount = data?.resource?.pageCount || 0;

  return { isLoading, error, guests, count, pageCount };
}
