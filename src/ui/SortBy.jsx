import PropTypes from "prop-types";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const orderBy = searchParams.get("orderBy") || "name";
  const order = searchParams.get("order") || "ASC";
  const currentValue = `${orderBy}-${order.toLowerCase()}`;

  function handleChange(e) {
    const [field, dir] = e.target.value.split("-");
    searchParams.set("orderBy", field);
    searchParams.set("order", dir.toUpperCase());
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      value={currentValue}
      onChange={handleChange}
    />
  );
}

SortBy.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SortBy;
