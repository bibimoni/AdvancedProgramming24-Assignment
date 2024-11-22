import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'unset';
  };

  const menuItems = [
    { title: 'Trang chủ', href: '#' },
    { title: 'Giới thiệu', href: '#' },
    { title: 'Liên hệ', href: '#' },
  ];

  return (
    <div className="relative">
      {/* Menu desktop */}
      <ul className="hidden md:flex space-x-6">
        {menuItems.map((item) => (
          <li key={item.title}>
            <a href={item.href} className="text-gray-700 hover:text-gray-900 hover:underline">
              {item.title}
            </a>
          </li>
        ))}
      </ul>

      {/* Nút menu hamburger - mobile */}
      <button 
        onClick={toggleMenu}
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg hover:bg-gray-100"
        aria-label={isOpen ? "Đóng menu" : "Mở menu"}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Overlay làm mờ */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />

      {/* Menu mobile */}
      <nav 
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col p-6 space-y-4 mt-16">
          {menuItems.map((item) => (
            <a 
              key={item.title}
              href={item.href}
              className="text-lg font-medium hover:text-blue-600 transition-colors"
              onClick={toggleMenu}
            >
              {item.title}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default HamburgerMenu;