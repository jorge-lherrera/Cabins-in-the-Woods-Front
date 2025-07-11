import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

import { getCabin } from "../../services/apiCabins";

export function useCabin() {
  const { cabinId } = useParams();
  const {
    isLoading,
    data: cabin,
    error,
  } = useQuery({
    queryKey: ["cabin", cabinId],
    queryFn: () => getCabin(cabinId),
    retry: false,
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "Erro ao carregar as cabanas"
      );
    },
  });

  return { isLoading, error, cabin };
}
