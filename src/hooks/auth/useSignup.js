import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi, login as loginApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: async ({ name, email, password, avatar }) => {
      try {
        const signupResult = await signupApi({ name, email, password, avatar });
        console.log("Signup result:", signupResult); // test

        const loginResult = await loginApi({ email, password });
        console.log("Login successful after signup:", loginResult); // test
        return loginResult;
      } catch (error) {
        console.error("Error in signup mutationFn:", error);
        throw error;
      }
    },
    onSuccess: (loginResult) => {
      queryClient.setQueryData(["session"], {
        loggedIn: true,
        user: loginResult.user,
      });
      queryClient.invalidateQueries(["session"]);
      toast.success("Conta criada com sucesso!");
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao criar usuário.");
    },
  });

  return { signup, isLoading };
}
