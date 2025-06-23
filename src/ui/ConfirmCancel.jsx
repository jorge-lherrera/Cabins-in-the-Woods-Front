import PropTypes from "prop-types";
import styled from "styled-components";

import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmCancel = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmCancel({ resourceName = "action", onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmCancel>
      <Heading as="h3">Cancel {resourceName}?</Heading>
      <p>
        Are you sure you want to cancel this {resourceName}? Any unsaved changes will be lost.
      </p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Go back
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          Yes, cancel
        </Button>
      </div>
    </StyledConfirmCancel>
  );
}

ConfirmCancel.propTypes = {
  resourceName: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

export default ConfirmCancel;
