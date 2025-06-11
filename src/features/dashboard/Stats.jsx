import PropTypes from "prop-types";

import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={bookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(numDays)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={confirmedStays}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={
          typeof cabinCount === "number" ? `${cabinCount}%` : cabinCount || "0%"
        }
      />
    </>
  );
}

Stats.propTypes = {
  bookings: PropTypes.number.isRequired,
  confirmedStays: PropTypes.number.isRequired,
  numDays: PropTypes.number.isRequired,
  cabinCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
};

export default Stats;
