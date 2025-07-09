import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi, login as loginApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup(onCloseModal) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: async ({ name, email, password, avatar }) => {
      await signupApi({ name, email, password, avatar });
      const loginResult = await loginApi({ email, password });
      return loginResult;
    },
    onSuccess: (loginResult) => {
      queryClient.setQueryData(["session"], {
        loggedIn: true,
        user: loginResult.user,
      });
      queryClient.invalidateQueries(["session"]);
      toast.success("Conta criada com sucesso!");
      if (onCloseModal) onCloseModal();
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Erro ao criar usuário.");
    },
  });

  return { signup, isLoading };
}
