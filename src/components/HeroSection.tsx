import React from 'react';
import { ChevronDown, Home, BookOpen, Users, Gift, Sparkles, TrendingUp, Zap, Star, Play } from 'lucide-react';

interface HeroSectionProps {
  onStartClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartClick }) => {
  const navigationItems = [
    { id: 'start', label: 'Comece Aqui', icon: Play, scrollTo: () => document.getElementById('start-here-section')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'modules', label: 'Módulos', icon: BookOpen, scrollTo: () => document.getElementById('modules-section')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'fad', label: 'FAD', icon: Zap, scrollTo: () => document.getElementById('fad-section')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'community', label: 'Comunidade', icon: Users, scrollTo: () => document.getElementById('community-section')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'bonus', label: 'Bônus', icon: Gift, scrollTo: () => document.getElementById('bonus-section')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'mentorship', label: 'Mentoria', icon: Sparkles, scrollTo: () => document.getElementById('mentorship-section')?.scrollIntoView({ behavior: 'smooth' }) },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-20">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://i.ibb.co/d4zNNxs9/Banner-Card-2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-4 sm:mb-6 animate-fade-in leading-tight">
          Desperte o <span className="text-[#FFD166]">Poder Interior</span> que Transforma Vidas
        </h2>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 animate-fade-in-delay px-4">
          Descubra os segredos para manifestar abundância e prosperidade
        </p>
        
        <button
          onClick={onStartClick}
          className="bg-[#FFD166] hover:bg-[#FFD166]/90 text-black font-bold px-6 sm:px-8 md:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-[#FFD166]/25 animate-bounce-subtle"
        >
          Começar agora
        </button>

        <div className="mt-8 sm:mt-10 max-w-3xl mx-auto">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 px-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.scrollTo}
                  className="group bg-black/20 backdrop-blur-sm border border-white/5 hover:border-[#d4250b]/30 rounded-lg p-2 sm:p-3 transition-all duration-300 hover:bg-black/30"
                >
                  <div className="flex flex-col items-center gap-1 sm:gap-1.5">
                    <div className="bg-[#d4250b]/20 p-1.5 sm:p-2 rounded-md group-hover:bg-[#d4250b]/30 transition-colors duration-300">
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4250b]" />
                    </div>
                    <span className="text-white/70 text-[10px] sm:text-xs font-medium text-center group-hover:text-white/90 transition-colors duration-300">
                      {item.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;