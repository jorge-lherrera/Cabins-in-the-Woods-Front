function Flag({ src, alt = "", className = "", ...props }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`max-w-[2rem] rounded-[var(--border-radius-tiny)] block border border-grey-100 ${className}`}
      {...props}
    />
  );
}

export default Flag;
