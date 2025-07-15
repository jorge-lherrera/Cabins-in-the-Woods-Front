import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createBooking as createBookingApi } from "../../services/apiBookings";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  const { mutate: createBooking, isLoading: isCreating } = useMutation({
    mutationFn: createBookingApi,
    onSuccess: (data) => {
      const booking = data?.resource;

      toast.success(
        booking?.name
          ? `Reserva "${booking.name}" criada com sucesso`
          : "Reserva criada com sucesso"
      );
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-bookings"] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Erro ao criar a reserva");
    },
  });

  return { isCreating, createBooking };
}
