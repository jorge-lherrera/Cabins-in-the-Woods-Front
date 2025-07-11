import { useGuests } from "../../hooks/guests/useGuests";

import Spinner from "../../ui/Spinner";
import GuestRow from "./GuestRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";

function GuestTable() {
  const { guests, isLoading, count, pageCount, currentPage } = useGuests();

  if (isLoading) return <Spinner />;

  if (!guests.length) return <Empty resourceName="hóspedes" />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Nome</div>
          <div>Email</div>
          <div>Nacionalidade</div>
          <div>Identificação</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={guests}
          render={(guest) => <GuestRow key={guest.id} guest={guest} />}
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

export default GuestTable;
