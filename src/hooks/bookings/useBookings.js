import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useBookings() {
  const [searchParams] = useSearchParams();

  const DEFAULTS = {
    page: 1,
    orderBy: "startDate",
    order: "desc",
  };

  const status = searchParams.get("status") || "all";
  const orderBy = searchParams.get("orderBy") || DEFAULTS.orderBy;
  const order = searchParams.get("order") || DEFAULTS.order;
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const limit = !searchParams.get("limit")
    ? 10
    : Number(searchParams.get("limit"));

  const filters = {
    status,
    orderBy,
    order,
    page,
    limit,
  };

  const queryKey = ["bookings", filters];

  const { isLoading, data, error } = useQuery({
    queryKey,
    queryFn: () => getBookings(filters),
    onError: (err) => {
      toast.error(
        err?.response?.data?.error ||
          err?.message ||
          "Erro ao carregar as reservas"
      );
    },
    keepPreviousData: true,
  });

  const bookings = data?.resource?.bookings || [];
  const currentPage = data?.resource?.page || 1;
  const pageCount = data?.resource?.pageCount || 0;
  const totalCount = pageCount * 10;

  // if (currentPage < pageCount) {
  //   const nextPageFilters = { ...filters, page: currentPage + 1 };
  //   queryClient.prefetchQuery({
  //     queryKey: ["bookings", nextPageFilters],
  //     queryFn: () => getBookings(nextPageFilters),
  //   });
  // }

  // if (currentPage > 1) {
  //   const prevPageFilters = { ...filters, page: currentPage - 1 };
  //   queryClient.prefetchQuery({
  //     queryKey: ["bookings", prevPageFilters],
  //     queryFn: () => getBookings(prevPageFilters),
  //   });
  // }

  return {
    isLoading,
    error,
    bookings,
    count: totalCount,
    pageCount,
    currentPage,
  };
}
