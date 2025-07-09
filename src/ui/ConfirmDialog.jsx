import PropTypes from "prop-types";
import styled from "styled-components";
import Heading from "./Heading";
import Button from "./Button";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: var(--backdrop-color, rgba(0, 0, 0, 0.3));
  backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dialog = styled.div`
  width: 40rem;
  background: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: stretch;
  max-width: 90vw;
`;

const Message = styled.p`
  color: var(--color-grey-500);
  margin-bottom: 1.2rem;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`;

function ConfirmDialog({
  open,
  title = "Confirmação",
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  disabled = false,
  children,
}) {
  if (!open) return null;

  return (
    <Overlay>
      <Dialog>
        {title && <Heading as="h3">{title}</Heading>}
        <Message>{message}</Message>
        {children}
        <ButtonRow>
          <Button variation="secondary" disabled={disabled} onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variation="danger" disabled={disabled} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </ButtonRow>
      </Dialog>
    </Overlay>
  );
}

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmVariant: PropTypes.oneOf(["danger", "secondary"]),
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

export default ConfirmDialog;
