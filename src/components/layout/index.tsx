import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
export const Layout = () => {
  return (
    <div className="grid grid-cols-12 gap-5 min-h-screen   p-3 ">
      <Sidebar />
      <main className="col-span-9 md:col-span-10 bg-gray-100 p-2 shadow-md rounded-sm">
        <Outlet />
      </main>
    </div>
  );
};
