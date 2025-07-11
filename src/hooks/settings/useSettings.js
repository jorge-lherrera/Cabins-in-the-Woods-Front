import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "Erro ao carregar as configurações"
      );
    },
  });

  const settings = data?.resource || [];

  return { isLoading, error, settings };
}
