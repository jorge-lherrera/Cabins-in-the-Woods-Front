import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "Todas" },
          { value: "checked-out", label: "Check-out realizado" },
          { value: "checked-in", label: "Check-in realizado" },
          { value: "unconfirmed", label: "Não confirmado" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "Ordenar por data (mais recente)" },
          { value: "startDate-asc", label: "Ordenar por data (mais antiga)" },
          {
            value: "totalPrice-desc",
            label: "Ordenar por valor (maior primeiro)",
          },
          {
            value: "totalPrice-asc",
            label: "Ordenar por valor (menor primeiro)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
