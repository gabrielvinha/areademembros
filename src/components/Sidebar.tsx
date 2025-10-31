import React, { useState } from 'react';
import { Menu, X, Home, BookOpen, Users, Gift, Sparkles, TrendingUp, Zap, Star } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const menuItems = [
    { id: 'home', label: 'Início', icon: Home, scrollTo: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { id: 'modules', label: 'Módulos', icon: BookOpen, scrollTo: () => document.getElementById('modules-section')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'fad', label: 'FAD', icon: Zap, scrollTo: () => document.getElementById('fad-section')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'community', label: 'Comunidade', icon: Users, scrollTo: () => document.getElementById('community-section')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'bonus', label: 'Bônus', icon: Gift, scrollTo: () => document.getElementById('bonus-section')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'mentorship', label: 'Mentoria', icon: Sparkles, scrollTo: () => document.getElementById('mentorship-section')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'recommended', label: 'Indicados pra você', icon: Star, scrollTo: () => document.getElementById('recommended-section')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'prosperity', label: 'Prosperidade', icon: TrendingUp, scrollTo: () => document.getElementById('prosperity-section')?.scrollIntoView({ behavior: 'smooth' }) },
  ];

  const handleItemClick = (item: typeof menuItems[0]) => {
    item.scrollTo();
    onToggle();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={onToggle}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-black/95 backdrop-blur-xl border-r border-white/10 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#d4250b] rounded-xl flex items-center justify-center">
                <img
                  src="https://i.ibb.co/RtzWx4q/logo-andressa.png"
                  alt="Logo"
                  className="w-10 h-10 rounded-lg object-cover"
                />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Navegação</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto py-6">
            <ul className="space-y-2 px-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleItemClick(item)}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all duration-300 group"
                    >
                      <Icon className="w-5 h-5 text-[#d4250b] group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-6 border-t border-white/10">
            <div className="bg-gradient-to-r from-[#d4250b]/20 to-[#d4250b]/40 rounded-lg p-4">
              <p className="text-xs text-gray-300 text-center">
                Explore todas as seções e desbloqueie seu potencial
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
