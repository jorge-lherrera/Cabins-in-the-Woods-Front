import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="grid grid-cols-[26rem_1fr] grid-rows-[auto_1fr] h-screen">
      <Header />
      <Sidebar />
      <main className="bg-grey-50 p-16 pr-20 pb-28 overflow-auto">
        <div className="max-w-[120rem] mx-auto flex flex-col gap-[3.2rem]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
