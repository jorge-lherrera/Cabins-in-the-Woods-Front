function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`px-3 py-2 border border-grey-300 rounded bg-grey-0 shadow-sm w-full h-32 ${className}`}
      {...props}
    />
  );
}

export default Textarea;
