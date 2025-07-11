import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: (data) => {
      const cabin = data?.resource;
      toast.success(
        cabin?.name
          ? `Cabana "${cabin.name}" excluída com sucesso`
          : "Cabana excluída com sucesso"
      );
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "Ocorreu um erro ao excluir a cabana"
      );
    },
  });

  return { isDeleting, deleteCabin };
}
