import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? "unset" : "hidden";
  };

  const menuItems = [
    { title: "Trang chủ", path: "/" },
    { title: "Giới thiệu", path: "/about" },
    { title: "Liên hệ", path: "/contact" },
  ];

  return (
    <nav className="relative">
      {/* Menu Desktop */}
      <div className="hidden md:flex items-center space-x-4 p-2 bg-gray-50 rounded-md">
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

      {/* Nút Menu Hamburger - Mobile */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="p-1.5 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Menu Mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-56 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden z-30 
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col p-4 space-y-2">
          {/* Nút đóng */}
          <div className="flex justify-end">
            <button
              onClick={toggleMenu}
              className="p-1.5 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          {/* Các mục menu */}
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
        </div>
      </div>
    </nav>
  );
};

export default HamburgerMenu;