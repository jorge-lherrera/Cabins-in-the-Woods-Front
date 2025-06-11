import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createCabin as createCabinApi } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createCabinApi,
    onSuccess: (data) => {
      const cabin = data?.resource;
      toast.success(
        cabin?.name
          ? `Cabana "${cabin.name}" criada com sucesso`
          : "Cabana criada com sucesso",
      );
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) =>
      toast.error(
        err?.response?.data?.error ||
          err?.message ||
          "Ocorreu um erro ao criar a cabana",
      ),
  });

  return { isCreating, createCabin };
}
