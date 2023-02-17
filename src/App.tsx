import { FC, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Layout } from "./components/layout";
import { Routes as Router, Route } from "react-router-dom";
import { Routes } from "./config/routes";
import { Dashboard } from "./components/pages/Dashboard";
import { Invoices } from "./components/pages/Invoices";
import { Customers } from "./components/pages/Customers";
import { Logout } from "./components/pages/Logout";
import { Products } from "./components/pages/Products";

const routes: Record<Routes, FC> = {
  [Routes.Dashboard]: Dashboard,
  [Routes.Invoices]: Invoices,
  [Routes.Customers]: Customers,
  [Routes.Products]: Products,
  [Routes.Logout]: Logout,
};
function App() {
  return (
    <Router>
      <Route element={<Layout />}>
        {Object.entries(routes).map(([path, Component]) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Route>
    </Router>
  );
}

export default App;
