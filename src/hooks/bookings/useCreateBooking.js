import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createBooking as createBookingApi } from "../../services/apiBookings";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  const { mutate: createBooking, isLoading: isCreating } = useMutation({
    mutationFn: createBookingApi,
    onSuccess: (data) => {
      const booking = data?.resource;
      console.log("Booking created successfully:", booking);
      toast.success(
        booking?.name
          ? `Reserva "${booking.name}" criada com sucesso`
          : "Reserva criada com sucesso",
      );
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) =>
      toast.error(
        err?.response?.data?.error ||
          err?.message ||
          "Ocorreu um erro ao criar a reserva",
      ),
  });

  return { isCreating, createBooking };
}
