import { BiLoaderAlt } from "react-icons/bi";

function SpinnerMini({ className = "" }) {
  return (
    <BiLoaderAlt
      className={`w-6 h-6 animate-spin ${className}`}
      style={{ animationDuration: "1.5s" }}
    />
  );
}

export default SpinnerMini;
