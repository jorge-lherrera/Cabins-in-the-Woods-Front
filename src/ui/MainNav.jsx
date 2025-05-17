import { NavLink } from "react-router-dom";
import { navItems } from "../utils/NavItems";

function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-[0.8rem]">
        {navItems.map(({ to, icon, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 text-[1.6rem] font-medium px-6 py-3 transition-colors
                 ${
                   isActive
                     ? "bg-grey-50 text-grey-800 rounded-md"
                     : "text-grey-600 hover:text-gray-800 hover:bg-grey-50 rounded-md"
                 }
                `
              }
            >
              <span className="w-6 h-6 text-grey-400 transition-colors group-hover:text-brand-600">
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
