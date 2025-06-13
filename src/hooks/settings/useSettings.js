import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import { toast } from "react-hot-toast";

export function useSettings() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
    onError: (err) => {
      toast.error(
        err?.response?.data?.error ||
          err?.message ||
          "Erro ao carregar as configurações",
      );
    },
  });

  if (data?.error) {
    toast.error(data.error);
  }

  const settings = data?.resource || [];

  return { isLoading, error, settings };
}
