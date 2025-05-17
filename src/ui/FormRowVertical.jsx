function FormRowVertical({ label, error, children }) {
  return (
    <div className="flex flex-col gap-2 py-3">
      {label && (
        <label htmlFor={children.props.id} className="font-medium">
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-red-700 text-sm">{error}</span>}
    </div>
  );
}

export default FormRowVertical;
