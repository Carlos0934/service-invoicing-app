import {
  NewspaperIcon,
  UserGroupIcon,
  Squares2X2Icon,
  ChevronLeftIcon,
  WrenchScrewdriverIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Routes } from "../../config/routes";
const items = [
  { name: "Dashboard", icon: Squares2X2Icon, link: Routes.Dashboard },
  { name: "Facturas", icon: NewspaperIcon, link: Routes.Invoices },
  { name: "Clientes", icon: UserGroupIcon, link: Routes.Customers },
  { name: "Productos", icon: WrenchScrewdriverIcon, link: Routes.Products },
];

export const Sidebar = () => {
  return (
    <header className="col-span-3 md:col-span-2 bg-gray-50 p-2 shadow-md rounded-sm ">
      <div className="flex flex-col h-full  ">
        <div className="flex">
          <h1 className="text-xl font-semibold text-gray-700 ">Logo</h1>
        </div>

        <div className="flex flex-col mt-4 flex-1">
          {items.map((item) => (
            <Link
              to={item.link}
              key={item.name}
              className="flex items-center p-2 cursor-pointer rounded-md hover:bg-gray-100"
            >
              <item.icon className="w-6 h-6 text-gray-500" />
              <span className="ml-2 text-gray-600 font-semibold">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};
