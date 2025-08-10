import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";
import { HiMenu, HiX } from "react-icons/hi"; // using Heroicons from react-icons
import logo from "../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    doSignOut().then(() => navigate("/login"));
    setIsMenuOpen(false);
  };

  return (
    <nav className="flex justify-between items-center px-4 h-14 bg-gray-200 border-b fixed top-0 left-0 right-0 z-20">
      {/* Logo */}
      <Link to="/home" className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-25 w-25 object-contain" />
       
      </Link>

      {/* Desktop Menu */}
      {userLoggedIn ? (
        <div className="hidden md:flex items-center gap-4">
          <Link to="/home" className="nav-link">Dashboard</Link>
          <Link to="/customers" className="nav-link">Customers</Link>
          <Link to="/products" className="nav-link">Products</Link>
          <Link to="/invoice" className="nav-link">Invoices</Link>
          <button
            onClick={handleLogout}
            className="text-sm cursor-pointer text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="hidden md:flex gap-4">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </div>
      )}

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-700"
        >
          {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-gray-200 shadow-md flex flex-col items-center gap-4 py-4 md:hidden">
          {userLoggedIn ? (
            <>
              <Link to="/home" className="nav-link" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
              <Link to="/customers" className="nav-link" onClick={() => setIsMenuOpen(false)}>Customers</Link>
              <Link to="/products" className="nav-link" onClick={() => setIsMenuOpen(false)}>Products</Link>
              <Link to="/invoice" className="nav-link" onClick={() => setIsMenuOpen(false)}>Invoices</Link>
              <button onClick={handleLogout} className="text-sm cursor-pointer text-red-500 hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link to="/register" className="nav-link" onClick={() => setIsMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
