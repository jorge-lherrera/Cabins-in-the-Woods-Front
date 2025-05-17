function Heading({ as = "h1", children, className = "", ...props }) {
  const base = "leading-snug";
  const variants = {
    h1: "text-3xl font-semibold",
    h2: "text-2xl font-semibold",
    h3: "text-2xl font-medium",
    h4: "text-3xl font-semibold text-center",
  };

  const Tag = as;

  return (
    <Tag className={`${base} ${variants[as] || ""} ${className}`} {...props}>
      {children}
    </Tag>
  );
}

export default Heading;
