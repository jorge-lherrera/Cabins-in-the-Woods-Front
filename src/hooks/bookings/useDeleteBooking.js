import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: (data) => {
      const booking = data?.resource;
      toast.success(
        booking
          ? `Reserva #${booking.id} excluída com sucesso`
          : "Reserva excluída com sucesso"
      );
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Erro ao excluir a reserva");
    },
  });

  return { isDeleting, deleteBooking };
}
