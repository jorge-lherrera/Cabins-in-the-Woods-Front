import PropTypes from "prop-types";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

import { formatCurrency } from "../../utils/helpers";

import Stat from "./Stat";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = Array.isArray(bookings) ? bookings.length : 0;

  const sales = Array.isArray(bookings)
    ? bookings.reduce((acc, cur) => acc + cur.totalPrice, 0)
    : 0;

  const checkins = Array.isArray(confirmedStays) ? confirmedStays.length : 0;

  const occupation =
    (Array.isArray(confirmedStays)
      ? confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0)
      : 0) / (numDays * cabinCount || 1); // evita división por cero

  return (
    <div className="grid grid-cols-4 gap-6">
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </div>
  );
}

Stats.propTypes = {
  bookings: PropTypes.array.isRequired,
  confirmedStays: PropTypes.array.isRequired,
  numDays: PropTypes.number.isRequired,
  cabinCount: PropTypes.number.isRequired,
};

export default Stats;
