import { useQuery } from "@tanstack/react-query";
import { getSession } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data } = useQuery({
    queryKey: ["user"],
    queryFn: getSession,
  });

  return { isLoading, user: data?.user, isAuthenticated: data?.loggedIn };
}
