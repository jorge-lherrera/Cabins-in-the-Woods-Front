import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function GuestTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="nationality"
        options={[
          { value: "all", label: "All" },
          { value: "nationality", label: "Nationality" },
        ]}
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
