function TableOperations({ children, className = "", ...props }) {
  return (
    <div className={`flex items-center gap-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export default TableOperations;
