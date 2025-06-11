import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createSettings as createSettingsApi } from "../../services/apiSettings";

export function useCreateSetting() {
  const queryClient = useQueryClient();

  const { mutate: createSetting, isLoading: isCreating } = useMutation({
    mutationFn: createSettingsApi,
    onSuccess: () => {
      toast.success("Configuração criada com sucesso");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) =>
      toast.error(
        err?.response?.data?.error ||
          err?.message ||
          "Ocorreu um erro ao criar a configuração",
      ),
  });

  return { isCreating, createSetting };
}
