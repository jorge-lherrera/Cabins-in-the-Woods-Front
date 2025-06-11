import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
    onError: (err) => {
      toast.error(
        err?.response?.data?.error ||
          err?.message ||
          "Error al cargar la reserva",
      );
    },
  });

  return { isLoading, error, booking };
}
