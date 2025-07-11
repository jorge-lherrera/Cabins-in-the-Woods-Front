import PropTypes from "prop-types";
import styled from "styled-components";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useState } from "react";

import { formatCurrency } from "../../utils/helpers";
import { useCheckout } from "../../hooks/bookings/useCheckout";
import { useDeleteBooking } from "../../hooks/bookings/useDeleteBooking";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ConfirmDialog from "../../ui/ConfirmDialog";

const Booking = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({ booking }) {
  const {
    id: bookingId,
    cabinId,
    startDate,
    endDate,
    stayDescription,
    status,
    totalPrice,
    ["guest.fullName"]: guestName,
    ["guest.email"]: email,
    numNights,
    daysUntilStart,
  } = booking;

  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const startDateFormatted = format(new Date(startDate), "MMM dd yyyy");
  const endDateFormatted = format(new Date(endDate), "MMM dd yyyy");

  const totalPriceFormatted = formatCurrency(Number(totalPrice));

  let stayText;
  if (daysUntilStart === 0) {
    stayText = `Hoje \u2192 ${numNights} noite${numNights > 1 ? "s" : ""}`;
  } else {
    stayText = `Em ${daysUntilStart} dia${daysUntilStart > 1 ? "s" : ""} \u2192 ${numNights} noite${numNights > 1 ? "s" : ""}`;
  }

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  function handleDeleteClick() {
    setShowDeleteConfirm(true);
  }

  function handleConfirmDelete() {
    deleteBooking(bookingId);
    setShowDeleteConfirm(false);
  }

  function handleCancelDelete() {
    setShowDeleteConfirm(false);
  }

  return (
    <Table.Row>
      <Booking>{cabinId}</Booking>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>{stayText}</span>
        <span>
          {startDateFormatted} &mdash; {endDateFormatted}
        </span>
        <span>{stayDescription}</span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{totalPriceFormatted}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              Ver detalhes
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Fazer check-in
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
                disabled={isCheckingOut}
              >
                Fazer check-out
              </Menus.Button>
            )}

            <Menus.Button icon={<HiTrash />} onClick={handleDeleteClick}>
              Excluir reserva
            </Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </Modal>

      {showDeleteConfirm && (
        <ConfirmDialog
          open={showDeleteConfirm}
          title="Excluir reserva"
          message="Tem certeza que deseja excluir esta reserva?"
          confirmLabel="Excluir"
          cancelLabel="Cancelar"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          confirmVariant="danger"
          disabled={isDeleting}
        />
      )}
    </Table.Row>
  );
}

BookingRow.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number,
    cabinId: PropTypes.number.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    stayDescription: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    totalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    "guest.fullName": PropTypes.string.isRequired,
    "guest.email": PropTypes.string.isRequired,
    numNights: PropTypes.number,
    daysUntilStart: PropTypes.number,
  }).isRequired,
};

export default BookingRow;
