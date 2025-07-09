import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/apiAuth";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      return await login(data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["session"], {
        loggedIn: true,
        user: data.user,
      });
      toast.success("Login realizado com sucesso!");
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message ||
          "Erro ao realizar o login. Verifique suas credenciais."
      );
    },
  });

  return {
    ...mutation,
    isLoading: mutation.isLoading,
  };
};
