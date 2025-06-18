import { useQuery } from "@tanstack/react-query";
import { getSession } from "../../services/apiAuth";

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const data = await getSession();

      return data.resource || null;
    },
    retry: false,
  });
}
