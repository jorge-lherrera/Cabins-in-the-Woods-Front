import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

export const navItems = [
  { to: "/dashboard", icon: <HiOutlineHome />, label: "Home" },
  { to: "/bookings", icon: <HiOutlineCalendarDays />, label: "Bookings" },
  { to: "/cabins", icon: <HiOutlineHomeModern />, label: "Cabins" },
  { to: "/users", icon: <HiOutlineUsers />, label: "Users" },
  { to: "/settings", icon: <HiOutlineCog6Tooth />, label: "Settings" },
];
