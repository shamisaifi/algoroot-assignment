import { createContext, useReducer } from "react";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Main";

const initialState = {
  user: JSON.parse(localStorage.getItem("loggedInUser")) || null,
  isAuthenticated: !!localStorage.getItem("loggedInUser"),
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("loggedInUser", JSON.stringify(action.payload));
      return { ...state, user: action.payload, isAuthenticated: true };
    case "LOGOUT":
      localStorage.removeItem("loggedInUser");
      return { ...state, user: null, isAuthenticated: false };
    case "DELETE_ACCOUNT":
      const user = JSON.parse(localStorage.getItem("userData"));
      const updatedUser = user.filter((u) => u.email !== state.user.email);
      localStorage.setItem("userData", JSON.stringify(updatedUser));
      localStorage.removeItem("loggedInUser");
      return { ...state, user: null, isAuthenticated: false };

    default:
      return state;
  }
};

export const AuthContext = createContext();

function App() {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <>
      <AuthContext.Provider value={{ state, dispatch }}>
        <Router>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                state.isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
