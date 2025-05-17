function ButtonText({ children, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`text-brand-600 font-medium text-center transition-colors duration-300 bg-none border-none rounded-sm hover:text-brand-700 active:text-brand-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default ButtonText;
