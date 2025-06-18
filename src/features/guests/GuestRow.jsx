import PropTypes from "prop-types";
import styled from "styled-components";
import ReactCountryFlag from "react-country-flag";
import { getCode } from "country-list";
import { HiPencil, HiTrash } from "react-icons/hi2";

import { useDeleteGuest } from "../../hooks/guests/useDeleteGuest";

import CreateGuestForm from "./CreateGuestForm";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const FlagImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6.4rem;
  aspect-ratio: 3 / 2;

  & > span {
    width: 100%;
    height: 100%;
    font-size: 2.5rem;
  }
`;

const GuestName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Email = styled.div`
  font-family: "Sono";
  color: var(--color-grey-700);
`;

const Nationality = styled.div`
  font-family: "Sono";
  color: var(--color-grey-700);
`;

const NationalId = styled.div`
  font-family: "Sono";
  color: var(--color-grey-700);
`;

function GuestRow({ guest }) {
  const { isDeleting, deleteGuest } = useDeleteGuest();
  const { id, fullName, email, nationality, nationalIdNumber } = guest;
  const countryCode = getCode(nationality);

  return (
    <Table.Row>
      <FlagImg>
        {countryCode && (
          <ReactCountryFlag
            countryCode={countryCode}
            svg
            style={{ width: "100%", height: "100%" }}
            title={nationality}
          />
        )}
      </FlagImg>
      <GuestName>{fullName}</GuestName>
      <Email>{email}</Email>
      <Nationality>{nationality}</Nationality>
      <NationalId>{nationalIdNumber}</NationalId>
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
    nationalIdNumber: PropTypes.string,
  }).isRequired,
};

export default GuestRow;
