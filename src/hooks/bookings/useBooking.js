import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: apiResponse,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Error al cargar la reserva");
    },
  });

  const booking = apiResponse?.resource;

  return { isLoading, error, booking };
}
