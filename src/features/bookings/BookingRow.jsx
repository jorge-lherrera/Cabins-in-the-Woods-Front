import PropTypes from "prop-types";
import styled from "styled-components";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

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
    startDateFormatted,
    endDateFormatted,
    stayDescription, // Ejemplo: "Today → 3 night stay"
    status,
    totalPriceFormatted,
    ["guest.fullName"]: guestName,
    ["guest.email"]: email,
  } = booking;

  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Booking>{cabinId}</Booking>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>{stayDescription}</span>
        <span>
          {startDateFormatted} &mdash; {endDateFormatted}
        </span>
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
    startDateFormatted: PropTypes.string.isRequired,
    endDateFormatted: PropTypes.string.isRequired,
    stayDescription: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    totalPriceFormatted: PropTypes.string.isRequired,
    "guest.fullName": PropTypes.string.isRequired,
    "guest.email": PropTypes.string.isRequired,
  }).isRequired,
};

export default BookingRow;
