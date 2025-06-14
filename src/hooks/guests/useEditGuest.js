import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateGuest } from "../../services/apiGuests";

export function useEditGuest() {
  const queryClient = useQueryClient();

  const { mutate: editGuest, isLoading: isEditing } = useMutation({
    mutationFn: ({ id, newGuestData }) => updateGuest(id, newGuestData),
    onSuccess: (data) => {
      const guest = data?.resource;
      toast.success(
        guest?.name
          ? `Hóspede "${guest.name}" editado com sucesso`
          : "Hóspede editado com sucesso",
      );
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: (err) =>
      toast.error(
        err?.response?.data?.error ||
          err?.message ||
          "Ocorreu um erro ao editar o hóspede",
      ),
  });

  return { isEditing, editGuest };
}
