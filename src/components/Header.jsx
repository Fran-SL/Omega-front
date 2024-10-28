import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import logo from '../assets/logo.svg';
import { AuthContext } from '../services/authContext';
import NavigationLinks from '../components/NavigationLinks';
import UserMenu from '../components/UserMenu';

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(`Searching for: ${searchQuery}`);
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  useEffect(() => {
    const protectedRoutes = ['/profile'];
    if (!user && protectedRoutes.includes(location.pathname)) {
      navigate('/login');
    }
  }, [user, navigate, location.pathname]);

  return (
    <>
      <header className="bg-white border-b-2 border-gray-200 font-playfair">
        <div className="container mx-auto flex justify-between items-center h-20 px-4">
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center w-1/3">
            <div className="relative w-60">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Buscar..."
                className="w-full py-2 px-10 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sgreen text-black"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </form>

          <div className="flex justify-center w-1/3">
            <img src={logo} alt="Logo" className="w-32 h-auto" />
          </div>

          <div className="hidden md:flex items-center space-x-4 w-1/3 justify-end">
            {user ? (
              <UserMenu user={user} handleLogout={handleLogout} />
            ) : (
              <>
                <Link to="/login" className="text-gray-400 border border-gray-400 py-2 px-5 rounded-2xl hover:border-sgreen hover:text-sgreen transition">
                  Iniciar sesión
                </Link>
                <Link to="/register" className="bg-sgreen text-white py-2 px-5 rounded-2xl hover:bg-bgreen transition">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <nav className="bg-white border-b-2 border-gray-200 font-playfair">
        <div className="container mx-auto flex justify-center">
          <NavigationLinks />
        </div>
      </nav>
    </>
  );
};

export default Header;
