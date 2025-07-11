import { format } from "date-fns";
import PropTypes from "prop-types";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import styled from "styled-components";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";
import { formatCurrency } from "../../utils/helpers";

const StyledBookingDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

function BookingDataBox({ booking }) {
  const {
    guest,
    cabin,
    numNights,
    numGuests,
    startDate,
    endDate,
    totalPrice,
    cabinPrice,
    extrasPrice,
    hasBreakfast,
    observations,
    isPaid,
    createdAt,
    daysUntilStart,
  } = booking;

  const guestName = guest?.fullName;
  const email = guest?.email;
  const nationality = guest?.nationality;
  const nationalID = guest?.nationalIdNumber;

  const countryFlag = null;

  const cabinName = cabin?.name;

  let daysText = "";
  if (typeof daysUntilStart === "number") {
    if (daysUntilStart === 0) daysText = "Hoje";
    else if (daysUntilStart > 0)
      daysText = `em ${daysUntilStart} dia${daysUntilStart > 1 ? "s" : ""}`;
    else
      daysText = `${Math.abs(daysUntilStart)} dia${Math.abs(daysUntilStart) > 1 ? "s" : ""} atrás`;
  }

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} ({daysText}) &mdash;{" "}
          {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Section>
        <Guest>
          {countryFlag && (
            <Flag src={countryFlag} alt={`Flag of ${nationality}`} />
          )}
          <p>
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>Documento {nationalID}</p>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observações"
          >
            {observations}
          </DataItem>
        )}

        <DataItem
          icon={<HiOutlineCheckCircle />}
          label="Café da manhã incluso?"
        >
          {hasBreakfast ? "Sim" : "Não"}
        </DataItem>

        <Price isPaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Preço total`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(Number(cabinPrice))} cabana + ${formatCurrency(
                Number(extrasPrice)
              )} café da manhã)`}
          </DataItem>

          <p>{isPaid ? "Pago" : "Pagará na entrada"}</p>
        </Price>
      </Section>

      <Footer>
        <p>Reservado em {format(new Date(createdAt), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

BookingDataBox.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number.isRequired,
    cabinId: PropTypes.number,
    guestId: PropTypes.number,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    numNights: PropTypes.number.isRequired,
    numGuests: PropTypes.number.isRequired,
    cabinPrice: PropTypes.string.isRequired,
    extrasPrice: PropTypes.string.isRequired,
    totalPrice: PropTypes.string.isRequired,
    hasBreakfast: PropTypes.bool.isRequired,
    observations: PropTypes.string,
    isPaid: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    daysUntilStart: PropTypes.number,
    cabin: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    guest: PropTypes.shape({
      id: PropTypes.number.isRequired,
      fullName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      nationality: PropTypes.string,
      nationalIdNumber: PropTypes.string,
    }),
  }).isRequired,
};

export default BookingDataBox;
