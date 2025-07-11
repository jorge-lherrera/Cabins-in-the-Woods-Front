import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateBooking } from "../../services/apiBookings";

export function useEditBooking() {
  const queryClient = useQueryClient();

  const { mutate: editBooking, isLoading: isEditing } = useMutation({
    mutationFn: ({ id, newBookingData }) => updateBooking(id, newBookingData),
    onSuccess: (data) => {
      const booking = data?.resource;
      toast.success(
        booking?.name
          ? `Reserva "${booking.name}" editada com sucesso`
          : "Reserva editada com sucesso"
      );
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Erro ao editar as reservas");
    },
  });

  return { isEditing, editBooking };
}
