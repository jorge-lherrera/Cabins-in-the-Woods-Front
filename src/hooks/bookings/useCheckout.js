import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      const booking = data?.resource;
      toast.success(
        booking
          ? `Reserva #${booking.id} finalizada com sucesso`
          : "Check-out realizado com sucesso"
      );
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      if (booking?.id)
        queryClient.invalidateQueries({ queryKey: ["booking", booking.id] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-bookings"] });
    },

    onError: (err) =>
      toast.error(
        err?.response?.data?.error ||
          err?.message ||
          "Ocorreu um erro ao finalizar o check-out"
      ),
  });

  return { checkout, isCheckingOut };
}
