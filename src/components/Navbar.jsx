import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { FiUser, FiLogOut, FiTrash2 } from "react-icons/fi";

const Navbar = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const handleDeleteAccount = () => {
    dispatch({ type: "DELETE_ACCOUNT" });
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full border border-gray-300 backdrop-blur px-15 py-3 flex justify-between items-center z-50">
      <div className="flex items-center gap-3">
        <img
          src="/public/images/Screenshot_From_2025-03-26_13-52-21-removebg-preview.png"
          alt="Logo"
          className="w-12 h-12"
        />
        <h1 className="text-2xl font-bold text-gray-800">Algo Root</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            className="flex border-3 border-gray-400 cursor-pointer overflow-hidden w-10 h-10 rounded-full items-center focus:outline-none"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <FiUser size={40} className="text-gray-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden">
              <p className="px-4 py-2 border-b text-sm text-gray-700">
                Welcome, <span className="text-green-600 font-bold">{state.user?.username}</span>
              </p>
              <button
                className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 w-full"
                onClick={handleLogout}
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
              <button
                className="flex items-center px-4 py-2 text-red-600 hover:bg-gray-200 w-full"
                onClick={handleDeleteAccount}
              >
                <FiTrash2 className="mr-2" /> Delete Account
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
