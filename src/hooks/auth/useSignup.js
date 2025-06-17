import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success("Conta criada com sucesso! Faça login para continuar.");
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao criar usuário.");
    },
  });

  return { signup, isLoading };
}
