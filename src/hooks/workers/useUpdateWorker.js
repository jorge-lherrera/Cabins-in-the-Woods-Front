import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateWorker } from "../../services/apiWorkers";

export function useUpdateWorker() {
  const queryClient = useQueryClient();

  const { mutate: updateWorkerMutate, isLoading: isUpdating } = useMutation({
    mutationFn: updateWorker,
    onSuccess: (worker, _variables, context) => {
      toast.success("Conta atualizada com sucesso!");
      queryClient.invalidateQueries(["session"]);
      if (context?.onSuccess) context.onSuccess();
    },
    onError: (err, _variables, context) => {
      if (context?.setError && err?.response?.data?.message) {
        context.setError("currentPassword", {
          type: "manual",
          message: err.response.data.message,
        });
      }
      toast.error(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Erro ao atualizar a conta"
      );
    },
  });

  function updateWorkerWithContext(data, context) {
    updateWorkerMutate(data, context);
  }

  return { updateWorker: updateWorkerWithContext, isUpdating };
}
