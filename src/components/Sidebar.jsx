import React from "react";

const Sidebar = () => {
  return (
    <aside className="border border-gray-300 fixed left-0 top-18 w-64 h-screen text-black ">
      <h1 className="bg-green-200 p-5 text-xl font-bold text-black">
        Sidebar
      </h1>
      <ul className="space-y-4 font-bold">
        <li className="hover:bg-gray-200 py-3 px-5 cursor-pointer bg-gray-100">
          Details
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
