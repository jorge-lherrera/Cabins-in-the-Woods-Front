import { useSearchParams } from "react-router-dom";

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <div className="border border-grey-100 bg-grey-0 shadow-sm rounded-sm p-1 flex gap-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          disabled={option.value === currentFilter}
          className={`rounded-sm font-medium text-sm px-2 py-1.5 transition-all
            ${
              option.value === currentFilter
                ? "bg-brand-600 text-brand-50"
                : "bg-grey-0 text-inherit hover:bg-brand-600 hover:text-brand-50"
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
