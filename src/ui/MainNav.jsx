import { NavLink } from "react-router-dom";
import { navItems } from "../utils/NavItems";

function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        {navItems.map(({ to, icon, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 text-[1.6rem] font-medium px-6 py-3 transition-colors
                 ${
                   isActive
                     ? "bg-gray-50 text-gray-800 rounded-md"
                     : "text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md"
                 }
                `
              }
            >
              <span className="w-6 h-6 text-gray-400 transition-colors group-hover:text-brand-600">
                {icon}
              </span>
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MainNav;
