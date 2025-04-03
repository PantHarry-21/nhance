import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ routes }) => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white h-screen shadow-lg p-4">
      <h2 className="text-xl font-bold mb-6 text-purple-700">NHance Admin</h2>
      <ul className="space-y-4">
        {routes.map((route) => (
          <li key={route.path}>
            <Link
              to={route.path}
              className={`block p-2 rounded-lg ${
                location.pathname === route.path
                  ? "bg-purple-100 text-purple-700"
                  : "hover:bg-gray-100"
              }`}
            >
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
