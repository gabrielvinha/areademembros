import React, { useState } from 'react';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface HeaderProps {
  user?: any;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowDropdown(false);
  };

  return (
    <header className="bg-black/40 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
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

          {user && (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2 transition-all duration-300"
              >
                <div className="w-8 h-8 bg-[#FFD166] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-black" />
                </div>
                <div className="text-left">
                  <p className="text-white text-sm font-medium">
                    {user.user_metadata?.name || user.email?.split('@')[0]}
                  </p>
                  <p className="text-gray-400 text-xs">{user.email}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-lg rounded-lg border border-white/20 shadow-xl z-50">
                  <div className="py-2">
                    <button
                      onClick={() => setShowDropdown(false)}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-white hover:bg-white/10 transition-all duration-300"
                    >
                      <User className="w-4 h-4" />
                      <span>Minha Conta</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-red-400 hover:bg-white/10 transition-all duration-300"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sair</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;