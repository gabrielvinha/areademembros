import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-black/40 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-[#FFD166] rounded-xl flex items-center justify-center">
            <img 
              src="https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
              alt="Logo" 
              className="w-8 h-8 rounded-lg object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              <span className="text-[#FFD166]">F</span>requência da Alma
            </h1>
            <p className="text-gray-400 text-sm">Área de Membros</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;