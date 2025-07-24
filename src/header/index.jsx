import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'
import { doSignOut } from '../firebase/auth'

const Header = () => {
  const navigate = useNavigate()
  const { userLoggedIn } = useAuth()

  return (
    <nav className="flex justify-between items-center px-4 h-14 bg-gray-200 border-b fixed top-0 left-0 right-0 z-20">
      <Link to="/home" className="text-lg font-bold text-indigo-600">
        InvoicePro
      </Link>

      {userLoggedIn ? (
        <div className="flex items-center gap-4">
          <Link to="/home" className="nav-link">Dashboard</Link>
          <Link to="/customers" className="nav-link">Customers</Link>
          <Link to="/products" className="nav-link">Products</Link>
          <Link to="/invoice" className="nav-link">Invoices</Link>
          <button
            onClick={() => doSignOut().then(() => navigate('/login'))}
            className="text-sm cursor-pointer text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </div>
      )}
    </nav>
  )
}

export default Header
