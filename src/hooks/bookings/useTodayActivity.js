import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export function useTodayActivity() {
  const { isLoading, data, error } = useQuery({
    queryFn: () => getBookings({ page: 1 }),
    queryKey: ["today-activity"],
  });

  const activities = data?.resource?.bookingsToday || [];

  return { activities, isLoading, error };
}
