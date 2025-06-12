import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Valores por defecto
  const DEFAULTS = {
    page: 1,
    orderBy: "startDate",
    order: "desc",
  };

  // Obtener y validar parámetros
  const statusParam = searchParams.get("status");
  const status =
    !statusParam || statusParam === "all" ? undefined : statusParam;

  const sortBy =
    searchParams.get("sortBy") || `${DEFAULTS.orderBy}-${DEFAULTS.order}`;
  const [orderBy, order] = sortBy.split("-");

  const pageRaw = searchParams.get("page");
  const page = isNaN(Number(pageRaw)) ? DEFAULTS.page : Number(pageRaw);

  // Crear objeto de filtros válidos
  const filters = {
    ...(status && { status }),
    orderBy,
    order,
    page,
  };

  const queryKey = ["bookings", filters];

  const { isLoading, data, error } = useQuery({
    queryKey,
    queryFn: () => getBookings(filters),
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
  console.log("useBookings", bookings);

  // Prefetch siguiente página
  if (page < pageCount) {
    const nextPageFilters = { ...filters, page: page + 1 };
    queryClient.prefetchQuery({
      queryKey: ["bookings", nextPageFilters],
      queryFn: () => getBookings(nextPageFilters),
    });
  }

  // Prefetch página anterior
  if (page > 1) {
    const prevPageFilters = { ...filters, page: page - 1 };
    queryClient.prefetchQuery({
      queryKey: ["bookings", prevPageFilters],
      queryFn: () => getBookings(prevPageFilters),
    });
  }

  return { isLoading, error, bookings, count, pageCount };
}
