function Select({
  options,
  value,
  onChange,
  type = "default",
  className = "",
  ...props
}) {
  const base = "text-sm px-3 py-2 rounded-sm font-medium shadow-sm bg-grey-0";
  const border =
    type === "white" ? "border border-grey-100" : "border border-grey-300";

  return (
    <select
      value={value}
      onChange={onChange}
      className={`${base} ${border} ${className}`}
      {...props}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
