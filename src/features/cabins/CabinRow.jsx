import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash, HiXMark } from "react-icons/hi2";
import { useState, useEffect } from "react";

import { useCreateCabin } from "../../hooks/cabins/useCreateCabin";
import { useDeleteCabin } from "../../hooks/cabins/useDeleteCabin";
import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import ConfirmDialog from "../../ui/ConfirmDialog";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 10rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }

  background: var(--color-grey-100);
  border-radius: var(--border-radius-sm);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const zoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const zoomOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
`;

const AnimatedImage = styled.img`
  animation: ${({ closing }) => (closing ? zoomOut : zoomIn)} 0.5s ease-in-out;
  width: 100%;
  height: auto;
  max-width: 100%;
`;

const ImageModal = styled.div`
  .image-modal-content {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 65%;
    transform: translate(-50%, -50%);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
    padding: 3.6rem;
    max-width: 1000px;
    overflow: hidden;
  }

  .image-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--backdrop-color);
    z-index: 1000;
    backdrop-filter: blur(4px);
  }

  .close-button {
    position: absolute;
    top: 0.5rem;
    right: 0.7rem;
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    z-index: 1001;

    &:hover {
      background-color: var(--color-grey-100);
    }

    & svg {
      width: 2.4rem;
      height: 2.4rem;
      color: var(--color-grey-500);
    }
  }
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const [showFullImage, setShowFullImage] = useState(false);
  const [closingAnimation, setClosingAnimation] = useState(false);

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  const isValidImage =
    typeof image === "string" &&
    image.trim() !== "" &&
    image.trim().toLowerCase() !== "null" &&
    image.trim().toLowerCase() !== "undefined";

  const imageUrl = isValidImage ? image : "/image-unavailable.png";

  useEffect(() => {
    const handleClose = (event) => {
      if (event.key === "Escape" || event.target === event.currentTarget) {
        setClosingAnimation(true);
        setTimeout(() => {
          setShowFullImage(false);

          setClosingAnimation(false);
        }, 300);
      }
    };

    window.addEventListener("keydown", handleClose);

    return () => {
      window.removeEventListener("keydown", handleClose);
    };
  }, []);

  const handleCloseImage = () => {
    setClosingAnimation(true);
    setTimeout(() => {
      setShowFullImage(false);
      setClosingAnimation(false);
    }, 300);
  };

  const handleModalClick = (event) => {
    if (
      event.target === event.currentTarget ||
      event.target.tagName.toLowerCase() === "button"
    ) {
      handleCloseImage();
    }
  };

  const handleXMarkClick = () => {
    handleCloseImage();
  };

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <Table.Row>
      <Img
        src={imageUrl}
        alt={name}
        onClick={() => setShowFullImage(true)}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/image-unavailable.png";
        }}
      />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleDuplicate}
                disabled={isCreating}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDialog
                open={true}
                title="Excluir cabana"
                message="Tem certeza que deseja excluir esta cabana?"
                confirmLabel="Excluir"
                cancelLabel="Cancelar"
                onConfirm={() => deleteCabin(cabinId)}
                onCancel={() => {}}
                confirmVariant="danger"
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
        {showFullImage && (
          <ImageModal>
            <div className="image-modal-overlay" onClick={handleModalClick}>
              <div className="image-modal-content">
                <button className="close-button" onClick={handleXMarkClick}>
                  <HiXMark />
                </button>
                <AnimatedImage
                  src={imageUrl}
                  alt={`Full size of ${name}`}
                  closing={closingAnimation}
                />
              </div>
            </div>
          </ImageModal>
        )}
      </div>
    </Table.Row>
  );
}

CabinRow.propTypes = {
  cabin: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    maxCapacity: PropTypes.number.isRequired,
    regularPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    discount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    image: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default CabinRow;
