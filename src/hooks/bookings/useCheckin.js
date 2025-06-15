// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { updateBooking } from "../../services/apiBookings";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// export function useCheckin() {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
//     mutationFn: ({ bookingId, breakfast }) =>
//       updateBooking(bookingId, {
//         status: "checked-in",
//         isPaid: true,
//         ...breakfast,
//       }),

//     onSuccess: (data) => {
//       const booking = data?.resource;
//       toast.success(
//         booking
//           ? `Booking #${booking.id} successfully checked in`
//           : "Check-in realizado com sucesso",
//       );

//       queryClient.invalidateQueries({ queryKey: ["bookings"] });
//       if (booking?.id)
//         queryClient.invalidateQueries({ queryKey: ["booking", booking.id] });
//       navigate("/");
//     },

//     onError: (err) => {
//       toast.error(
//         err?.response?.data?.error ||
//           err?.message ||
//           "Erro ao realizar check-in",
//       );
//     },
//   });

//   return { checkin, isCheckingIn };
// }
