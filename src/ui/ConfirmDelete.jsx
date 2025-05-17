import Button from "./Button";
import Heading from "./Heading";

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <div className="w-[40rem] flex flex-col gap-3">
      <Heading as="h3">Delete {resourceName}</Heading>
      <p className="text-grey-500 mb-3">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
