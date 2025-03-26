import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Hero from "./Hero";

const Main = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />

        <div className="flex flex-1">
          <div className="hidden md:block w-64">
            <Sidebar />
          </div>

          <div className="flex-1 p-10 overflow-auto">
            <Hero />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
