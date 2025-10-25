import React, { useState } from 'react';
import { User, LogOut, ChevronDown, Shield, Menu } from 'lucide-react';
import { supabase } from '../lib/supabase';
import AccountModal from './AccountModal';

interface HeaderProps {
  user?: any;
  onUserUpdate?: (user: any) => void;
  isAdmin?: boolean;
  onAdminClick?: () => void;
  onToggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onUserUpdate, isAdmin, onAdminClick, onToggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error: any) {
      // If session doesn't exist, user is effectively logged out
      // The onAuthStateChange listener will handle the state update
      if (error?.message?.includes('Session from session_id claim in JWT does not exist')) {
        // Suppress this error as it's expected when session is already invalid
        console.log('Session already invalid, user logged out');
      } else {
        // Log other unexpected errors
        console.error('Logout error:', error);
      }
    } finally {
      setShowDropdown(false);
    }
  };

  const handleAccountClick = () => {
    setShowAccountModal(true);
    setShowDropdown(false);
  };

  const handleAdminPanelClick = () => {
    if (onAdminClick) {
      onAdminClick();
    }
    setShowDropdown(false);
  };

  const handleProfileUpdate = (updatedUser: any) => {
    if (onUserUpdate) {
      onUserUpdate(updatedUser);
    }
  };

  const getAvatarUrl = () => {
    return user?.user_metadata?.avatar_url || null;
  };

  const renderAvatar = () => {
    const avatarUrl = getAvatarUrl();
    
    if (avatarUrl) {
      return (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      );
    }
    
    return (
      <div className="w-full h-full bg-[#FFD166] flex items-center justify-center">
        <User className="w-5 h-5 text-black" />
      </div>
    );
  };

  return (
    <>
      <header className="bg-black/40 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              {onToggleSidebar && (
                <button
                  onClick={onToggleSidebar}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
                  aria-label="Toggle menu"
                >
                  <Menu className="w-5 h-5 text-[#FFD166]" />
                </button>
              )}
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#FFD166] rounded-xl flex items-center justify-center">
                <img
                  src="https://i.ibb.co/RtzWx4q/logo-andressa.png"
                  alt="Logo"
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg object-cover"
                />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                  <span className="text-[#FFD166]">F</span>requência da Alma
                </h1>
                <p className="text-gray-400 text-xs sm:text-sm">Área de Membros</p>
              </div>
            </div>

            {user && (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 sm:space-x-3 bg-white/10 hover:bg-white/20 rounded-lg px-2 sm:px-4 py-2 transition-all duration-300"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden">
                    {renderAvatar()}
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-white text-xs sm:text-sm font-medium">
                      {user.user_metadata?.name || user.email?.split('@')[0]}
                    </p>
                    <p className="text-gray-400 text-xs hidden md:block">{user.email}</p>
                  </div>
                  <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-black/90 backdrop-blur-lg rounded-lg border border-white/20 shadow-xl z-50">
                    <div className="py-2">
                      {isAdmin && (
                        <button
                          onClick={handleAdminPanelClick}
                          className="w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 text-[#FFD166] hover:bg-white/10 transition-all duration-300"
                        >
                          <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-sm">Admin Panel</span>
                        </button>
                      )}
                      <button
                        onClick={handleAccountClick}
                        className="w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 text-white hover:bg-white/10 transition-all duration-300"
                      >
                        <User className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-sm">Minha Conta</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 text-red-400 hover:bg-white/10 transition-all duration-300"
                      >
                        <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-sm">Sair</span>
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