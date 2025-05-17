function ButtonGroup({ children, className = "" }) {
  return (
    <div className={`flex gap-5 justify-end ${className}`}>{children}</div>
  );
}

export default ButtonGroup;
