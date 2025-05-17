function DataItem({ icon, label, children }) {
  return (
    <div className="flex items-center gap-4 py-2">
      <span className="flex items-center gap-2 font-medium">
        {icon && typeof icon.type === "function" ? (
          <span className="w-5 h-5 text-brand-600">{icon}</span>
        ) : (
          icon
        )}
        <span>{label}</span>
      </span>
      {children}
    </div>
  );
}

export default DataItem;
