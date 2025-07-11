import UpdateWorkerForm from "../features/workers/UpdateWorkerForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Heading as="h1">Atualize sua conta</Heading>

      <Row>
        <Heading as="h3">Atualizar dados do usuário</Heading>
        <UpdateWorkerForm />
      </Row>
    </>
  );
}

export default Account;
