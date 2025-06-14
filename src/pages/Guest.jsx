import GuestTable from "../features/guests/GuestTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddGuest from "../features/guests/AddGuest";
import GuestTableOperations from "../features/guests/GuestTableOperations";

function Guests() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Guests</Heading>
        <GuestTableOperations />
      </Row>

      <Row>
        <GuestTable />
        <AddGuest />
      </Row>
    </>
  );
}

export default Guests;
