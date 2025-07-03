import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { api } from "../../services/apiUrl";

export function useGuestSearch() {
  const lastInput = useRef("");

  const { isLoading, error, refetch } = useQuery({
    queryKey: ["guests-search", lastInput.current],
    queryFn: async () => {
      if (!lastInput.current) return [];
      const response = await api.get("/guests", {
        params: { search: lastInput.current },
      });
      return (response.data.resource?.guests || []).map((guest) => ({
        value: guest.id,
        label: guest.fullName,
      }));
    },
    enabled: false,
  });

  const loadGuestOptions = async (inputValue) => {
    lastInput.current = inputValue;
    const result = await refetch();
    return result.data || [];
  };

  return { loadGuestOptions, isLoading, error };
}
