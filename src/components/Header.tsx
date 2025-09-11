import React, { useState } from 'react';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import AccountModal from './AccountModal';

interface HeaderProps {
  user?: any;
  onUserUpdate?: (user: any) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onUserUpdate }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowDropdown(false);
  };

  const handleAccountClick = () => {
    setShowAccountModal(true);
    setShowDropdown(false);
  };

  const handleProfileUpdate = (updatedUser: any) => {
    if (onUserUpdate) {
      onUserUpdate(updatedUser);
    }
  };

  const getAvatarUrl = () => {
    const avatarId = user?.user_metadata?.avatar || 'avatar1';
    const avatarMap: Record<string, string> = {
      avatar1: 'https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      avatar2: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      avatar3: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      avatar4: 'https://images.pexels.com/photos/3820333/pexels-photo-3820333.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      avatar5: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      avatar6: 'https://images.pexels.com/photos/3747463/pexels-photo-3747463.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      avatar7: 'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      avatar8: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      avatar9: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      avatar10: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    };
    return avatarMap[avatarId] || avatarMap.avatar1;
  };
  return (
    <>
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
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src={getAvatarUrl()}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
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
                        onClick={handleAccountClick}
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

      {showAccountModal && (
        <AccountModal
          user={user}
          onClose={() => setShowAccountModal(false)}
          onProfileUpdate={handleProfileUpdate}
        />
      )}
    </>
  );
};

export default Header;