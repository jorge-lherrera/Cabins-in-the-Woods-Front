import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: result } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  // Manejo seguro de datos según el status de la respuesta
  const stays = result?.status === "success" ? result.data : [];
  const confirmedStays = stays.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out",
  );
  const notFoundMessage =
    result?.status === "not_found" ? result.message : null;
  const errorMessage = result?.status === "error" ? result.message : null;

  return {
    isLoading,
    stays,
    confirmedStays,
    numDays,
    notFoundMessage,
    errorMessage,
  };
}
