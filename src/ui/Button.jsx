function Button({
  children,
  variation = "primary",
  size = "medium",
  className = "",
  ...props
}) {
  const sizeClasses = {
    small: "text-xs px-2 py-1 uppercase font-semibold text-center",
    medium: "text-sm px-4 py-3 font-medium",
    large: "text-base px-6 py-3 font-medium",
  };

  const variationClasses = {
    primary: "text-brand-50 bg-brand-600 hover:bg-brand-700",
    secondary:
      "text-grey-600 bg-grey-0 border border-grey-200 hover:bg-grey-50",
    danger: "text-red-100 bg-red-700 hover:bg-red-800",
  };

  return (
    <button
      className={
        `border-none rounded shadow-sm focus:outline-none transition-colors duration-200 ` +
        sizeClasses[size] +
        " " +
        variationClasses[variation] +
        " " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
