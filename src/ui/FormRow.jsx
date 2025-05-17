function FormRow({ label, error, children, className = "" }) {
  const isButtonRow = Array.isArray(children)
    ? children.some(
        (child) =>
          child?.type === "button" || child?.type?.displayName === "Button"
      )
    : children?.type === "button" || children?.type?.displayName === "Button";

  return (
    <div
      className={
        isButtonRow
          ? `flex justify-end gap-3 py-3 border-b border-grey-100 last:border-b-0 last:pb-0 first:pt-0 ${className}`
          : `grid items-center grid-cols-[24rem_1fr_1.2fr] gap-6 py-3 border-b border-grey-100 last:border-b-0 last:pb-0 first:pt-0 ${className}`
      }
    >
      {label && (
        <label htmlFor={children.props?.id} className="font-medium">
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-red-700 text-sm">{error}</span>}
    </div>
  );
}

export default FormRow;
