import { useQuery } from "@tanstack/react-query";
import { getSession } from "../../services/apiAuth";

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const data = await getSession();
      if (data.resource) {
        return { loggedIn: true, user: data.resource };
      }
      return { loggedIn: false };
    },
    retry: false,
  });
}
