import { api } from "../../services/apiUrl";

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
      console.error("Error loading nationalities:", error);
      return [];
    }
  };

  return { loadGuestOptions, isLoading: false, error: null };
}
