import {
  cloneElement,
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import PropTypes from "prop-types";

import { useOutsideClick } from "../hooks/useOutsideClick";
import ConfirmDialog from "./ConfirmDialog"; // Cambiado aquí

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

Open.propTypes = {
  children: PropTypes.element.isRequired,
  opens: PropTypes.string.isRequired,
};

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleTryClose = useCallback(() => {
    setShowConfirm(true);
  }, []);

  const handleConfirmClose = useCallback(() => {
    setShowConfirm(false);
    close();
  }, [close]);

  const handleCancelClose = useCallback(() => {
    setShowConfirm(false);
  }, []);

  const ref = useOutsideClick(handleTryClose);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={handleTryClose}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: handleTryClose })}</div>
        {showConfirm && (
          <ConfirmDialog
            open={showConfirm}
            title="Confirmação"
            message="Tem certeza que deseja fechar?"
            confirmLabel="Sim, fechar"
            cancelLabel="Cancelar"
            onConfirm={handleConfirmClose}
            onCancel={handleCancelClose}
            confirmVariant="danger"
          />
        )}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Window.propTypes = {
  children: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
