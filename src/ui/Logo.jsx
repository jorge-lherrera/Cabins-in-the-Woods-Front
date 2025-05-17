import { useDarkMode } from "../context/DarkModeContext";

function Logo() {
  const { isDarkMode } = useDarkMode();

  const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";
  return (
    <div className="text-center">
      <img src={src} alt="Logo" />
    </div>
  );
}

export default Logo;
