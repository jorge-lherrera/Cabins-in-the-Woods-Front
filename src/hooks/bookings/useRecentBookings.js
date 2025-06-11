import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", "recent", numDays],
    queryFn: () =>
      getBookings({
        startDate: queryDate,
        orderBy: "startDate",
        order: "DESC",
        page: 1,
      }),
    onError: (err) =>
      toast.error(
        err?.response?.data?.error ||
          err?.message ||
          "Ocorreu um erro ao carregar as reservas recentes",
      ),
  });

  const bookings = data?.resource?.bookings || [];

  return { isLoading, bookings, error };
}
