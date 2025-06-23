import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { getBookingsDashboard } from "../../services/apiBookings";

export function useDashboardBookings({ days }) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["dashboard-bookings", days],
    queryFn: () => getBookingsDashboard({ days }),
    onError: (err) => {
      toast.error(
        err?.response?.data?.error ||
          err?.message ||
          "Erro ao carregar os dados do dashboard"
      );
    },
  });

  const dashboardData = data?.resource || {};

  return { isLoading, error, dashboardData };
}
