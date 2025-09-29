import React from 'react';
import { MessageCircle } from 'lucide-react';

const CommunitySection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 sm:mb-12 text-center">Comunidade</h2>
        
        <div className="flex justify-center">
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group cursor-pointer transform transition-all duration-500 hover:scale-105"
          >
            <div className="aspect-[3/4] w-full max-w-xs sm:max-w-sm md:w-80 rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-b from-green-500 to-green-800">
              <div className="w-full h-full flex flex-col items-center justify-center p-4">
                <MessageCircle className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 text-white mb-4 sm:mb-6" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center">Junte-se à Comunidade</h3>
                <p className="text-green-100 text-center mt-2 sm:mt-4 px-4 sm:px-6 text-sm sm:text-base">
                  Conecte-se com outros membros e compartilhe sua jornada
                </p>
              </div>
            </div>
            
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl ring-2 ring-transparent group-hover:ring-green-400/50 transition-all duration-500" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;