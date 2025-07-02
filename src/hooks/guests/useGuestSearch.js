import { api } from "../../services/apiUrl";

export function useGuestSearch() {
  return async function loadGuestOptions(inputValue) {
    if (!inputValue) return [];
    const { data } = await api.get("/guests", {
      params: { search: inputValue },
    });
    return (data.resource?.guests || []).map((guest) => ({
      value: guest.id,
      label: guest.fullName,
    }));
  };
}
