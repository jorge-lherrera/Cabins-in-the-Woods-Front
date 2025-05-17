function Form({ children, type = "regular", className = "", ...props }) {
  const base = "overflow-hidden text-[1.4rem]";
  const regular = "p-6 md:p-10 bg-grey-0 border border-grey-100 rounded-md";
  const modal = "w-[80rem]";

  return (
    <form
      className={`${base} ${type === "regular" ? regular : ""} ${
        type === "modal" ? modal : ""
      } ${className}`}
      {...props}
    >
      {children}
    </form>
  );
}

export default Form;
