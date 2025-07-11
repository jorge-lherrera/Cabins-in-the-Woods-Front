import { useQuery } from "@tanstack/react-query";

import { getSession } from "../../services/apiAuth";

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      return await getSession();
    },
    retry: false,
  });
}
