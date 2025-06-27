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
    stayText = `Today \u2192 ${numNights} night${numNights > 1 ? "s" : ""} stay`;
  } else {
    stayText = `In ${daysUntilStart} day${daysUntilStart > 1 ? "s" : ""} \u2192 ${numNights} night${numNights > 1 ? "s" : ""} stay`;
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
              See details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
                disabled={isCheckingOut}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDialog
            open={true}
            title="Excluir reserva"
            message="Tem certeza que deseja excluir esta reserva?"
            confirmLabel="Excluir"
            cancelLabel="Cancelar"
            onConfirm={() => deleteBooking(bookingId)}
            onCancel={() => {}}
            confirmVariant="danger"
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
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
