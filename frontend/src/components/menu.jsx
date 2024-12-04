import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'unset';
  };

  const adminCredentials = {
    username: 'admin',
    password: 'admin123',
  };

  const handleLogin = () => {
    if (username === adminCredentials.username && password === adminCredentials.password) {
      setIsAdminLoggedIn(true);
      setErrorMessage('');
      toggleMenu();
    } else {
      setErrorMessage('Invalid username or password!');
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setUsername('');
    setPassword('');
    toggleMenu();
  };

  const menuItems = isAdminLoggedIn
    ? [
        { title: 'Trang chủ', path: '/' },
        { title: 'Quản lý nội dung', path: '/edit' },
      ]
    : [
        { title: 'Trang chủ', path: '/' },
        { title: 'Giới thiệu', path: '/about' },
        { title: 'Liên hệ', path: '/contact' },
      ];

  return (
    <nav className="relative">
      {/* Menu desktop */}
      <div className="hidden md:flex items-center space-x-6 p-2 bg-gray-50 rounded-md">
        <div className="flex items-center space-x-6 ml-4"> {/* Dời menu qua trái */}
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className="relative text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 
              py-2 px-3 rounded-xl
              hover:bg-blue-50 
              hover:shadow-sm 
              hover:-translate-y-0.5
              before:content-['']
              before:absolute
              before:bottom-0
              before:left-0
              before:w-full
              before:h-0.5
              before:bg-blue-600
              before:transform
              before:scale-x-0
              before:transition-transform
              before:duration-200
              hover:before:scale-x-100"
            >
              {item.title}
            </Link>
          ))}
        </div>
        {isAdminLoggedIn && (
          <Button label="Logout" className="p-button-danger ml-auto" onClick={handleLogout} />
        )}
      </div>

      {/* Nút menu hamburger - mobile */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="p-1.5 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
        >
          {isOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Overlay làm mờ */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Menu mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-56 bg-white shadow-lg transform transition-transform duration-200 ease-in-out md:hidden
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col p-4 space-y-2">
          {!isAdminLoggedIn ? (
            <>
              <h3 className="text-lg font-semibold">Admin Login</h3>
              <div className="flex flex-col gap-2">
                <InputText
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
                <InputText
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}
              </div>
              <Button label="Login" className="w-full" onClick={handleLogin} />
            </>
          ) : (
            <>
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-md
                  hover:bg-blue-50 transition-all duration-200
                  hover:shadow-sm
                  hover:-translate-x-0.5
                  relative
                  overflow-hidden
                  before:content-['']
                  before:absolute
                  before:bottom-0
                  before:left-0
                  before:w-full
                  before:h-0.5
                  before:bg-blue-600
                  before:transform
                  before:scale-x-0
                  before:transition-transform
                  before:duration-200
                  hover:before:scale-x-100"
                  onClick={toggleMenu}
                >
                  {item.title}
                </Link>
              ))}
              <Button
                label="Logout"
                className="p-button-danger w-full mt-4"
                onClick={handleLogout}
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default HamburgerMenu;