import React from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onStartClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartClick }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://i.postimg.cc/t4ght3LT/andressa-backgroud-2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h2 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-fade-in">
          Desperte o <span className="text-[#FFD166]">Poder Interior</span> que Transforma Vidas
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 mb-12 animate-fade-in-delay">
          Descubra os segredos para manifestar abundância e prosperidade
        </p>
        
        <button
          onClick={onStartClick}
          className="bg-[#FFD166] hover:bg-[#FFD166]/90 text-black font-bold px-12 py-4 rounded-full text-lg transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-[#FFD166]/25 animate-bounce-subtle"
        >
          Começar agora
        </button>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <ChevronDown className="w-8 h-8 text-white animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;