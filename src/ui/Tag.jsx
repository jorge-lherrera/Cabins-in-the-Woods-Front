function Tag({ children, type = "brand", className = "", ...props }) {
  return (
    <span
      className={`
        w-fit uppercase text-xs font-semibold px-3 py-1 rounded-full
        text-${type}-700 bg-${type}-100
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
}

export default Tag;
