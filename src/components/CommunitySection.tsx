import React from 'react';
import { Lock } from 'lucide-react';

const CommunitySection: React.FC = () => {
  const isComingSoon = true;

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 sm:mb-12 text-center">Comunidade</h2>

        <div className="flex justify-center">
          <div className="relative group cursor-pointer transform transition-all duration-500 hover:scale-105">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-xl sm:rounded-2xl overflow-hidden">
              <img
                src="https://i.ibb.co/5WLQXsb6/Banners-area-jpeg-Prancheta-1-copiar.png"
                alt="Comunidade"
                className={`w-full h-auto object-cover transition-all duration-500 ${
                  isComingSoon ? 'grayscale opacity-60' : 'group-hover:scale-105'
                }`}
              />

              {isComingSoon && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-xl">
                  <Lock className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-[#FFD166] mb-2 sm:mb-3" />
                  <p className="text-white text-sm sm:text-base md:text-lg font-bold px-4 text-center">
                    EM BREVE
                  </p>
                </div>
              )}
            </div>

            {!isComingSoon && (
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl ring-2 ring-transparent group-hover:ring-[#FFD166]/50 transition-all duration-500" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;