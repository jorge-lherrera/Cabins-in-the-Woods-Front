import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { api } from "../../services/apiUrl";

export function useCabinSearch() {
  const lastInput = useRef("");

  const { isLoading, error, refetch } = useQuery({
    queryKey: ["cabins-search", lastInput.current],
    queryFn: async () => {
      if (!lastInput.current) return [];
      const response = await api.get("/cabins", {
        params: { search: lastInput.current },
      });
      return (response.data.resource?.cabins || []).map((cabin) => ({
        value: cabin.id,
        label: cabin.name,
      }));
    },
    enabled: false,
  });

  const loadCabinOptions = async (inputValue) => {
    lastInput.current = inputValue;
    const result = await refetch();
    return result.data || [];
  };

  return { loadCabinOptions, isLoading, error };
}
