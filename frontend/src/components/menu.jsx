import React, { useState } from "react";
import { Menu, X, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const adminCredentials = {
    username: "admin",
    password: "admin123",
  };

  const handleLogin = () => {
    if (username === adminCredentials.username && password === adminCredentials.password) {
      setIsAdminLoggedIn(true);
      setErrorMessage("");
      setIsDropdownOpen(false);
      setIsOpen(false); // Đóng menu sau khi đăng nhập
    } else {
      setErrorMessage("Invalid username or password!");
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setUsername("");
    setPassword("");
    setIsDropdownOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? "hidden" : "unset";
  };

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Ngăn chặn sự kiện đóng menu
    setIsDropdownOpen(!isDropdownOpen);
  };

  const menuItems = isAdminLoggedIn
    ? [
        { title: "Trang chủ", path: "/" },
        { title: "Quản lý nội dung", path: "/edit" },
      ]
    : [
        { title: "Trang chủ", path: "/" },
        { title: "Giới thiệu", path: "/about" },
        { title: "Liên hệ", path: "/contact" },
      ];

  return (
    <nav className="relative">
      {/* Menu desktop */}
      <div className="hidden md:flex items-center space-x-6 p-2 bg-gray-50 rounded-md">
        {menuItems.map((item) => (
          <Link
            key={item.title}
            to={item.path}
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            {item.title}
          </Link>
        ))}
        <div className="relative ml-auto">
          {!isAdminLoggedIn ? (
            <button
              className="p-button p-button-primary p-button-sm"
              onClick={toggleDropdown}
            >
              Log in
            </button>
          ) : (
            <Button label="Log out" className="p-button-danger p-button-sm" onClick={handleLogout} />
          )}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-md p-4 z-50">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Admin Login</h3>
              <InputText
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="p-inputtext-sm w-full mb-2"
              />
              <div className="relative">
                <InputText
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="p-inputtext-sm w-full pr-10 mb-2"
                />
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                  onMouseDown={() => setShowPassword(true)}
                  onMouseUp={() => setShowPassword(false)}
                  onMouseLeave={() => setShowPassword(false)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
              <Button
                label="Log in"
                className="p-button-primary p-button-sm w-full"
                onClick={handleLogin}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu toggle */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="p-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={toggleMenu}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Menu items */}
          <div className="flex flex-col items-start px-6 py-4 space-y-4 flex-grow">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className="w-full text-gray-700 hover:text-blue-600 font-medium py-2 border-b"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Login button */}
          <div className="px-6 py-4 border-t">
            {!isAdminLoggedIn ? (
              <div>
                <button
                  className="p-button p-button-primary p-button-sm w-full"
                  onClick={(e) => toggleDropdown(e)}
                >
                  Log in
                </button>
                {isDropdownOpen && (
                  <div className="mt-2 bg-gray-50 rounded-md shadow p-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Admin Login</h3>
                    <InputText
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                      className="p-inputtext-sm w-full mb-2"
                    />
                    <div className="relative">
                      <InputText
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="p-inputtext-sm w-full pr-10 mb-2"
                      />
                      <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                        onMouseDown={() => setShowPassword(true)}
                        onMouseUp={() => setShowPassword(false)}
                        onMouseLeave={() => setShowPassword(false)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
                    <Button
                      label="Log in"
                      className="p-button-primary p-button-sm w-full"
                      onClick={handleLogin}
                    />
                  </div>
                )}
              </div>
            ) : (
              <Button
                label="Log out"
                className="p-button-danger p-button-sm w-full"
                onClick={handleLogout}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HamburgerMenu;