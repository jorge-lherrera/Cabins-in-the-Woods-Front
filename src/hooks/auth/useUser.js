import { useQuery } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["login"],
    queryFn: login,
  });

  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
