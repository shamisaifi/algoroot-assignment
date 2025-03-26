import React, { useState, useContext } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    try {
      const storedUserData = JSON.parse(localStorage.getItem("userData")) || [];

      if (!storedUserData) {
        return alert("no user found");
      }

      const user = storedUserData.find((user) => user.email === email);

      if (!user) {
        return alert(`no user found with this email try to Sign Up`);
      }

      if (user.password !== password) {
        return alert("invalid credentials!");
      }

      setEmail("");
      setPassword("");

      dispatch({ type: "LOGIN", payload: user });
      navigate("/dashboard");
    } catch (error) {}
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Algo Root - Sign In
        </h2>
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
