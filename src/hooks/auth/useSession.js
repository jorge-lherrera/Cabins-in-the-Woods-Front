import { useQuery } from "@tanstack/react-query";
import { getSession } from "../../services/apiAuth";

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: getSession,
    retry: false,
  });
}
