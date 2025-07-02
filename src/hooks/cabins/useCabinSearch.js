import { api } from "../../services/apiUrl";

export function useCabinSearch() {
  return async function loadCabinOptions(inputValue) {
    if (!inputValue) return [];
    const { data } = await api.get("/cabins", {
      params: { search: inputValue },
    });
    return (data.resource?.cabins || []).map((cabin) => ({
      value: cabin.id,
      label: cabin.name,
    }));
  };
}
