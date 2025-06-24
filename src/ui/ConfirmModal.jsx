import styled from "styled-components";
import Button from "./Button";
import PropTypes from "prop-types";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  background-color: var(--color-grey-0);
  color: var(--color-grey-900);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  min-width: 32rem;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: stretch;
  /* Centrado vertical y horizontal extra seguro */
  margin: auto;
`;

const Actions = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
`;

function ConfirmModal({
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Sim, fechar",
  cancelLabel = "Cancelar",
}) {
  return (
    <Overlay>
      <Box>
        <div>{message || "Tem certeza que deseja fechar?"}</div>
        <Actions>
          <Button variation="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variation="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </Actions>
      </Box>
    </Overlay>
  );
}

ConfirmModal.propTypes = {
  message: PropTypes.node,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
};

export default ConfirmModal;
