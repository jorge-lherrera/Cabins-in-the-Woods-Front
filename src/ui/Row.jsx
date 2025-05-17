function Row({ children, type = "vertical", className = "", ...props }) {
  const base = "flex";
  const horizontal = "justify-between items-center";
  const vertical = "flex-col gap-4";

  return (
    <div
      className={`${base} ${type === "horizontal" ? horizontal : ""} ${
        type === "vertical" ? vertical : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Row;
