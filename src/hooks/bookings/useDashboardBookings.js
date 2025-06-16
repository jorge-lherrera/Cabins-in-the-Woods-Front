import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useDashboardBookings() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["dashboard-bookings"],
    queryFn: () => getBookings(),
    onError: (err) => {
      toast.error(
        err?.response?.data?.error ||
          err?.message ||
          "Erro ao carregar os dados do dashboard",
      );
    },
  });

  const dashboardData = data?.resource || {};
  return { isLoading, error, dashboardData };
}
