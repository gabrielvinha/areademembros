import React from 'react';
import { ChevronDown, Home, BookOpen, Users, Gift, Sparkles, TrendingUp, Zap, Star } from 'lucide-react';

interface HeroSectionProps {
  onStartClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartClick }) => {
  const navigationItems = [
    { id: 'home', label: 'Início', icon: Home, scrollTo: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { id: 'modules', label: 'Módulos', icon: BookOpen, scrollTo: () => document.getElementById('modules-section')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'fad', label: 'FAD', icon: Zap, scrollTo: () => document.getElementById('fad-section')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'community', label: 'Comunidade', icon: Users, scrollTo: () => document.getElementById('community-section')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'bonus', label: 'Bônus', icon: Gift, scrollTo: () => document.getElementById('bonus-section')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'mentorship', label: 'Mentoria', icon: Sparkles, scrollTo: () => document.getElementById('mentorship-section')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'recommended', label: 'Indicados', icon: Star, scrollTo: () => document.getElementById('recommended-section')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'prosperity', label: 'Prosperidade', icon: TrendingUp, scrollTo: () => document.getElementById('prosperity-section')?.scrollIntoView({ behavior: 'smooth' }) },
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

        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 px-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.scrollTo}
                  className="group bg-black/40 backdrop-blur-md border border-white/10 hover:border-[#d4250b]/50 rounded-xl p-4 sm:p-5 transition-all duration-300 hover:bg-black/60 hover:scale-105 hover:shadow-lg hover:shadow-[#d4250b]/20"
                >
                  <div className="flex flex-col items-center gap-2 sm:gap-3">
                    <div className="bg-gradient-to-br from-[#d4250b] to-red-600 p-2.5 sm:p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <span className="text-white text-xs sm:text-sm font-semibold text-center group-hover:text-[#FFD166] transition-colors duration-300">
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