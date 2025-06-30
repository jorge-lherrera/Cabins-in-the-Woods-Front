import UpdateWorkerForm from "../features/workers/UpdateWorkerForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update user data</Heading>
        <UpdateWorkerForm />
      </Row>
    </>
  );
}

export default Account;
