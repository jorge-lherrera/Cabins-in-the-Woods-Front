import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { updateBooking } from "../../services/apiBookings";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      const booking = data?.resource;
      toast.success(
        booking
          ? `Check-in da reserva #${booking.id} realizado com sucesso`
          : "Check-in realizado com sucesso"
      );

      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      if (booking?.id)
        queryClient.invalidateQueries({ queryKey: ["booking", booking.id] });
      navigate("/");
    },

    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "Erro ao realizar o check-in"
      );
    },
  });

  return { checkin, isCheckingIn };
}
