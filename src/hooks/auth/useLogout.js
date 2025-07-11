import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { logout as logoutApi } from "../../services/apiAuth";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success("Logout realizado com sucesso");
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Erro ao sair da conta");
    },
  });

  return { logout, isLoading };
}
