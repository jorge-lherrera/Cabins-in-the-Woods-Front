import { useGuests } from "../../hooks/cabins/useGuests";

import Spinner from "../../ui/Spinner";
import GuestRow from "./GuestRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

function GuestTable() {
  const { guests, isLoading } = useGuests();

  if (isLoading) return <Spinner />;

  if (!guests.length) return <Empty resourceName="guests" />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Guest</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={guests}
          render={(guest) => <GuestRow key={guest.id} guest={guest} />}
        />
      </Table>
    </Menus>
  );
}

export default GuestTable;
