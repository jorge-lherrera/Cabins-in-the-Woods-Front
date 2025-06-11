import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const status = (() => {
    const value = searchParams.get("status");
    return !value || value === "all" ? undefined : value;
  })();

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [orderBy, order] = sortByRaw.split("-");

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", status, orderBy, order, page],
    queryFn: () => getBookings({ status, orderBy, order, page }),
    onError: (err) => {
      toast.error(
        err?.response?.data?.error ||
          err?.message ||
          "Erro ao carregar as reservas",
      );
    },
    keepPreviousData: true,
  });

  const bookings = data?.resource || [];
  const count = data?.resource?.total || 0;
  const pageCount = data?.resource?.pageCount || 0;

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", status, orderBy, order, page + 1],
      queryFn: () => getBookings({ status, orderBy, order, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", status, orderBy, order, page - 1],
      queryFn: () => getBookings({ status, orderBy, order, page: page - 1 }),
    });

  return { isLoading, error, bookings, count, pageCount };
}
