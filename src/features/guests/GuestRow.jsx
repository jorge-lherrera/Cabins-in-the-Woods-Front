import PropTypes from "prop-types";
import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import { useCreateGuest } from "../../hooks/guests/useCreateGuest";
import { useDeleteGuest } from "../../hooks/guests/useDeleteGuest";

import CreateGuestForm from "./CreateGuestForm";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const GuestName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

function GuestRow({ guest }) {
  const { isDeleting, deleteGuest } = useDeleteGuest();

  const { id, fullName, email, nationality, countryFlag, nationalIdNumber } =
    guest;

  return (
    <Table.Row>
      <Img src={countryFlag} alt={nationality} />
      <GuestName>{fullName}</GuestName>
      <div>{email}</div>
      <div>{nationality}</div>
      <div>{nationalIdNumber}</div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />

            <Menus.List id={id}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateGuestForm guestToEdit={guest} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="guests"
                disabled={isDeleting}
                onConfirm={() => deleteGuest(id)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

GuestRow.propTypes = {
  guest: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    countryFlag: PropTypes.string,
    nationalIdNumber: PropTypes.string,
  }).isRequired,
};

export default GuestRow;
