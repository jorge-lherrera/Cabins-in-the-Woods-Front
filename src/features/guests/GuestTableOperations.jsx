import { useSearchParams } from "react-router-dom";

import { useGuestSearchNation } from "../../hooks/guests/useGuestSearchNation";

import TableOperations from "../../ui/TableOperations";
import SortBy from "../../ui/SortBy";
import SpinnerMini from "../../ui/SpinnerMini";
import AsyncSelectStyled from "../../ui/AsyncSelectStyled";

function GuestTableOperations() {
  const {
    loadGuestOptions,
    isLoading: isLoadingGuests,
    error: errorGuests,
  } = useGuestSearchNation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleGuestChange(option) {
    if (option) {
      searchParams.set("nationality", option.value);
    } else {
      searchParams.delete("nationality");
    }
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }
  return (
    <TableOperations>
      <AsyncSelectStyled
        cacheOptions
        defaultOptions
        loadOptions={loadGuestOptions}
        onChange={handleGuestChange}
        isClearable
        placeholder="Filtrar por nacionalidad..."
        isLoading={isLoadingGuests}
        noOptionsMessage={() =>
          errorGuests
            ? errorGuests.message || "Error al cargar las nacionalidades"
            : "No se encontraron nacionalidades"
        }
        components={{
          LoadingIndicator: SpinnerMini,
        }}
        instanceId="guest-nation-filter"
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "email-asc", label: "Sort by email (A-Z)" },
          { value: "email-desc", label: "Sort by email (Z-A)" },
        ]}
      />
    </TableOperations>
  );
}

export default GuestTableOperations;
