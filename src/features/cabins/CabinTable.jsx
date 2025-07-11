import { useCabins } from "../../hooks/cabins/useCabins";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";

function CabinTable() {
  const { cabins, isLoading, count, pageCount, currentPage } = useCabins();

  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resourceName="cabanas" />;

  return (
    <Menus>
      <Table columns="0.9fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabana</div>
          <div>Capacidade</div>
          <div>Preço</div>
          <div>Desconto</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={cabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />

        <Table.Footer>
          <Pagination
            count={count}
            pageCount={pageCount}
            currentPage={currentPage}
          />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default CabinTable;
