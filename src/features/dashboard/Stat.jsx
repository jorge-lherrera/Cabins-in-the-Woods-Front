function Stat({ icon, title, value, color = "brand", className = "" }) {
  // color: "brand", "green", "blue", "yellow", etc.
  return (
    <div
      className={`bg-grey-0 border border-grey-100 rounded-md p-4 grid grid-cols-[4rem_1fr] grid-rows-2 gap-x-4 gap-y-1 ${className}`}
    >
      <div
        className={`row-span-2 aspect-square rounded-full flex items-center justify-center bg-${color}-100`}
      >
        {icon && (
          // For icon color, wrap in a span to apply text color
          <span
            className={`w-8 h-8 text-${color}-700 flex items-center justify-center`}
          >
            {icon}
          </span>
        )}
      </div>
      <h5 className="self-end text-xs uppercase tracking-wide font-semibold text-grey-500">
        {title}
      </h5>
      <p className="text-2xl leading-none font-medium">{value}</p>
    </div>
  );
}

export default Stat;
