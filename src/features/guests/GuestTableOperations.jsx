import AsyncSelect from "react-select/async";
import { useSearchParams } from "react-router-dom";

import { useGuestSearchNation } from "../../hooks/guests/useGuestSearchNation";

import TableOperations from "../../ui/TableOperations";
import SortBy from "../../ui/SortBy";
import SpinnerMini from "../../ui/SpinnerMini";

const customSelectStyles = {
  container: (base) => ({
    ...base,
    minWidth: 220,
  }),
  control: (base) => ({
    ...base,
    backgroundColor: "var(--color-grey-0)",
    color: "var(--color-grey-700)",
    borderColor: "var(--color-grey-300)",
  }),
  input: (base) => ({
    ...base,
    color: "var(--color-grey-700)",
  }),
  placeholder: (base) => ({
    ...base,
    color: "var(--color-grey-500)",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "var(--color-grey-0)",
    color: "var(--color-grey-700)",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused
      ? document.documentElement.classList.contains("dark-mode")
        ? "var(--color-brand-600)"
        : "var(--color-brand-200)"
      : "var(--color-grey-0)",
    color: "var(--color-grey-700)",
  }),
  singleValue: (base) => ({
    ...base,
    color: "var(--color-grey-700)",
  }),
};

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
      <AsyncSelect
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
        styles={customSelectStyles}
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
