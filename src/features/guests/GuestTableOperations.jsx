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
        placeholder="Filtrar por nacionalidade..."
        isLoading={isLoadingGuests}
        noOptionsMessage={() =>
          errorGuests
            ? errorGuests.message || "Erro ao carregar as nacionalidades"
            : "Nenhuma nacionalidade encontrada"
        }
        components={{
          LoadingIndicator: SpinnerMini,
        }}
        instanceId="guest-nation-filter"
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Ordenar por nome (A-Z)" },
          { value: "name-desc", label: "Ordenar por nome (Z-A)" },
          { value: "email-asc", label: "Ordenar por email (A-Z)" },
          { value: "email-desc", label: "Ordenar por email (Z-A)" },
        ]}
      />
    </TableOperations>
  );
}

export default GuestTableOperations;
