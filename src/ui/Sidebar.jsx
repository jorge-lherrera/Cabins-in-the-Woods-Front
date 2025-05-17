import Logo from "./Logo";
import MainNav from "./MainNav";

function Sidebar() {
  return (
    <aside className="bg-gray-50 p-8 pr-6 border-r border-gray-100 row-span-full flex flex-col gap-[3.2rem]">
      <Logo />
      <MainNav />
    </aside>
  );
}

export default Sidebar;
