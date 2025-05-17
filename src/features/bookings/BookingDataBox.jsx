import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";
import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";

function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
    cabins: { name: cabinName },
  } = booking;

  return (
    <section className="bg-grey-0 border border-grey-100 rounded-md overflow-hidden">
      <header className="bg-brand-500 px-8 py-5 text-brand-50 text-lg font-medium flex items-center justify-between">
        <div className="flex items-center gap-4 font-semibold text-lg">
          <HiOutlineHomeModern className="w-8 h-8" />
          <p>
            {numNights} nights in Cabin{" "}
            <span className="font-mono text-2xl ml-1">{cabinName}</span>
          </p>
        </div>
        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </header>

      <section className="px-8 pt-8 pb-3">
        <div className="flex items-center gap-3 mb-4 text-grey-500">
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p className="font-medium text-grey-700">
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </div>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        <div
          className={`flex items-center justify-between px-8 py-4 rounded-sm mt-6 ${
            isPaid
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalPrice)}
            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice
              )} breakfast)`}
          </DataItem>
          <p className="uppercase text-sm font-semibold">
            {isPaid ? "Paid" : "Will pay at property"}
          </p>
        </div>
      </section>

      <footer className="px-8 py-4 text-xs text-grey-500 text-right">
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </footer>
    </section>
  );
}

export default BookingDataBox;
