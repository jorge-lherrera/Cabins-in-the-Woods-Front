function Spinner({ className = "" }) {
  return (
    <div
      className={`mx-auto my-12 w-16 aspect-square rounded-full animate-spin border-4 border-t-brand-600 border-b-brand-600 border-l-transparent border-r-transparent ${className}`}
      style={{
        borderTopColor: "var(--color-brand-600)",
        borderBottomColor: "var(--color-brand-600)",
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
      }}
    />
  );
}

export default Spinner;
