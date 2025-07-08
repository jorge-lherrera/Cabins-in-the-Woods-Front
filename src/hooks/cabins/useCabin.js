import { useQuery } from "@tanstack/react-query";
import { getCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

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
        err?.response?.data?.message || "Error al cargar las cabañas"
      );
    },
  });

  return { isLoading, error, cabin };
}
