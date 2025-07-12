import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow">
      <Link to="/" className="text-xl font-bold text-blue-600">
        Skill Swap Platform
      </Link>
      <nav className="flex items-center gap-4">
        {user && (
          <>
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
            <Link to="/requests" className="hover:underline">
              Requests
            </Link>
            <button
              onClick={logout}
              className="text-sm text-red-600 hover:underline"
            >
              Logout
            </button>
          </>
        )}
        {!user && (
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
