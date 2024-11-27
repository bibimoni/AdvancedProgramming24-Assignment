import React from 'react';
import HamburgerMenu from './menu.jsx';

function Header() {
  return (
    <header className="py-4">
      <div className="flex items-center justify-between">
        {/* Logo và tiêu đề bên trái */}
        <div className="flex items-start space-x-4">
          <img
            src="https://www.mattrancantho.vn/files/images/Logo%20-%20Icon/Logo%20MTTQ.png"
            className="w-16 h-16"
            alt="Logo Mặt trận tổ quốc"
          />
          <div className="text-xl font-bold">
            <a href="/" className="text-red-600 text-2xl hover:text-orange-500">
              MẶT TRẬN TỔ QUỐC VIỆT NAM
            </a>
            <span className="text-gray-400 mx-2">|</span>
            <a className="text-blue-700 hover:text-purple-700 block md:inline">
            Website tra cứu
              <br></br>
            thông tin ủng hộ đồng bào bị thiệt hại do bão lũ
            </a>
          </div>
        </div>
        <HamburgerMenu />
      </div>
    </header>
  );
}

export default Header;