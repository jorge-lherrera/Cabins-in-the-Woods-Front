import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteGuest as deleteGuestApi } from "../../services/apiGuests";

export function useDeleteGuest() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteGuest } = useMutation({
    mutationFn: deleteGuestApi,
    onSuccess: (data) => {
      const guest = data?.resource;
      toast.success(
        guest?.name
          ? `Hóspede "${guest.name}" excluído com sucesso`
          : "Hóspede excluído com sucesso"
      );
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: (err) =>
      toast.error(
        err?.response?.data?.message || "Ocorreu um erro ao excluir o hóspede"
      ),
  });

  return { isDeleting, deleteGuest };
}
