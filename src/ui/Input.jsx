import React from "react";

const Input = React.forwardRef(function Input(
  { className = "", ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={`border border-grey-300 bg-grey-0 rounded-sm px-3 py-2 shadow-sm ${className}`}
      {...props}
    />
  );
});

export default Input;
