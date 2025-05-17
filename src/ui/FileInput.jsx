function FileInput({ className = "", ...props }) {
  return (
    <input
      type="file"
      className={`text-base rounded-sm file:font-inherit file:font-medium file:px-3 file:py-2 file:mr-3 file:rounded-sm file:border-none file:text-brand-50 file:bg-brand-600 file:cursor-pointer file:transition-colors file:duration-200 hover:file:bg-brand-700 ${className}`}
      {...props}
    />
  );
}

export default FileInput;
