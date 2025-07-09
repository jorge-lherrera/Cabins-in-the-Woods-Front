import AsyncSelect from "react-select/async";

const customSelectStyles = {
  container: (base) => ({
    ...base,
    minWidth: 220,
  }),
  control: (base) => ({
    ...base,
    backgroundColor: "var(--color-grey-0)",
    color: "var(--color-grey-700)",
    borderColor: "var(--color-grey-300)",
  }),
  input: (base) => ({
    ...base,
    color: "var(--color-grey-700)",
  }),
  placeholder: (base) => ({
    ...base,
    color: "var(--color-grey-500)",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "var(--color-grey-0)",
    color: "var(--color-grey-700)",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused
      ? document.documentElement.classList.contains("dark-mode")
        ? "var(--color-brand-600)"
        : "var(--color-brand-200)"
      : "var(--color-grey-0)",
    color: "var(--color-grey-700)",
  }),
  singleValue: (base) => ({
    ...base,
    color: "var(--color-grey-700)",
  }),
};

function AsyncSelectStyled(props) {
  return <AsyncSelect styles={customSelectStyles} {...props} />;
}

export default AsyncSelectStyled;
