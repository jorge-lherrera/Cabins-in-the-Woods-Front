import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createGuest as createGuestApi } from "../../services/apiGuests";

export function useCreateGuest() {
  const queryClient = useQueryClient();

  const { mutate: createGuest, isLoading: isCreating } = useMutation({
    mutationFn: createGuestApi,
    onSuccess: (data) => {
      const guest = data?.resource;
      toast.success(
        guest?.name
          ? `Hóspede "${guest.name}" criado com sucesso`
          : "Hóspede criado com sucesso"
      );
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: (err) =>
      toast.error(
        err?.response?.data?.message || "Ocorreu um erro ao criar o hóspede"
      ),
  });

  return { isCreating, createGuest };
}
