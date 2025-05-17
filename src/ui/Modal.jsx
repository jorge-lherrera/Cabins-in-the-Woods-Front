import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";

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

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] bg-backdrop bg-opacity-80 backdrop-blur-sm transition-all duration-500 flex items-center justify-center">
      <div
        ref={ref}
        className="relative bg-grey-0 rounded-lg shadow-lg p-8 md:p-10 transition-all duration-500"
      >
        <button
          type="button"
          onClick={close}
          className="absolute top-3 right-5 bg-none border-none p-1 rounded-sm translate-x-2 transition-colors duration-200 hover:bg-grey-100"
        >
          <HiXMark className="w-6 h-6 text-grey-500" />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
