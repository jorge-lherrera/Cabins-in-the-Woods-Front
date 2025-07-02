import { getGuests } from "../../services/apiGuests";

export function useGuestSearch() {
  return async function loadGuestOptions(inputValue) {
    if (!inputValue) return [];
    const data = await getGuests({ search: inputValue, limit: 10 });
    return (data.resource?.guests || []).map((guest) => ({
      value: guest.id,
      label: guest.fullName,
    }));
  };
}
