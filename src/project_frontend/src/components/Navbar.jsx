import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { Home, Building, FileText, DollarSign, User, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { isAuth, principal, logout, backend} = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      if (backend?.logout) {
        await backend.logout();
      }
    } catch (err) {
      console.error("Backend logout failed:", err);
    } finally {
      await logout(); 
      setIsMenuOpen(false);
      navigate('/login');
      setLoading(false);
    }
  };


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // helper to shorten principal
  const shortPrincipal = (principal) => {
    if (!principal) return "Unknown";
    let text = typeof principal.toText === "function"
      ? principal.toText()
      : principal.toString();
    return `${text.slice(0, 5)}...${text.slice(-3)}`;
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Building className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">RealEstate Co-own</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuth ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/properties"
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Building className="h-4 w-4" />
                  <span>Properties</span>
                </Link>
                <Link
                  to="/leases"
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  <span>Leases</span>
                </Link>
                <Link
                  to="/portfolio"
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <DollarSign className="h-4 w-4" />
                  <span>Portfolio</span>
                </Link>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      {shortPrincipal(principal)}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    disabled={loading}
                    className={`flex items-center space-x-1 transition-colors ${
                      loading ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:text-red-600"
                    }`}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{loading ? "Logging out..." : "Logout"}</span>
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {isAuth ? (
              <div className="space-y-4">
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={closeMenu}
                >
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/properties"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={closeMenu}
                >
                  <Building className="h-4 w-4" />
                  <span>Properties</span>
                </Link>
                <Link
                  to="/leases"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={closeMenu}
                >
                  <FileText className="h-4 w-4" />
                  <span>Leases</span>
                </Link>
                <Link
                  to="/portfolio"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={closeMenu}
                >
                  <DollarSign className="h-4 w-4" />
                  <span>Portfolio</span>
                </Link>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 mb-4">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      {shortPrincipal(principal)}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    disabled={loading}
                    className={`flex items-center space-x-2 transition-colors ${
                      loading ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:text-red-600"
                    }`}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{loading ? "Logging out..." : "Logout"}</span>
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
                onClick={closeMenu}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
