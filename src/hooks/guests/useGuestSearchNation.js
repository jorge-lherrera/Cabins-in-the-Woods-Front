import { api } from "../../services/apiUrl";
import { toast } from "react-hot-toast";

export function useGuestSearchNation() {
  const loadGuestOptions = async (inputValue) => {
    if (!inputValue) return [];

    try {
      const response = await api.get("/guests", {
        params: { searchNation: inputValue },
      });

      const guests = response.data.resource?.guests || [];
      const uniqueNations = [
        ...new Set(guests.map((guest) => guest.nationality)),
      ];

      return uniqueNations.map((nation) => ({
        value: nation,
        label: nation,
      }));
    } catch (error) {
      toast.error("Erro ao carregar as nacionalidades");
      return [];
    }
  };

  return { loadGuestOptions, isLoading: false, error: null };
}
