import { api } from "../../services/ApiUrl";
import { useQuery } from "@tanstack/react-query";

export const useSession = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const response = await api.get("/session", { withCredentials: true });
      return response.data;
    },
    retry: false,
  });
};
