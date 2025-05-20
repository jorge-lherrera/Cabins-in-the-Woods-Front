import { login } from "../../services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      // Llama a la función login de apiAuth.js
      return await login(data);
    },
    onSuccess: () => {
      toast.success("Login realizado com sucesso!");
      navigate("/dashboard");
    },
    onError: (error) => {
      if (error.response && error.response.status === 401) {
        toast.error(error.response.data?.mensagem || "Credenciais inválidas");
      } else {
        toast.error(error.response?.data?.mensagem || "Erro no servidor");
      }
    },
  });
};
