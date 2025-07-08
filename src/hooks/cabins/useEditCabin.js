import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCabin } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ id, newCabinData }) => updateCabin(id, newCabinData),
    onSuccess: (data) => {
      const cabin = data?.resource;
      toast.success(
        cabin?.name
          ? `Cabana "${cabin.name}" editada com sucesso`
          : "Cabana editada com sucesso"
      );
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "Ocorreu um erro ao editar a cabana"
      );
    },
  });

  return { isEditing, editCabin };
}
