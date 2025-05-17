import { useMoveBack } from "../hooks/useMoveBack";
import Heading from "../ui/Heading";
import Button from "../ui/Button";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <main className="h-screen bg-grey-50 flex items-center justify-center p-12">
      <div className="bg-grey-0 border border-grey-100 rounded-md p-12 max-w-4xl text-center">
        <Heading as="h1" className="mb-8">
          The page you are looking for could not be found 😢
        </Heading>
        <Button size="large" onClick={moveBack}>
          &larr; Go back
        </Button>
      </div>
    </main>
  );
}

export default PageNotFound;
