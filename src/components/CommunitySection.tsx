import React from 'react';

const CommunitySection: React.FC = () => {
  const handleCommunityClick = () => {
    window.open('https://chat.whatsapp.com/G1kN0q6nksO7LOtLUqFtbn', '_blank');
  };

  return (
    <section id="community-section" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 sm:mb-12 text-center">Comunidade</h2>

        <div className="flex justify-center">
          <div
            onClick={handleCommunityClick}
            className="relative group cursor-pointer transform transition-all duration-500 hover:scale-105"
          >
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-xl sm:rounded-2xl overflow-hidden">
              <img
                src="https://i.ibb.co/5WLQXsb6/Banners-area-jpeg-Prancheta-1-copiar.png"
                alt="Comunidade"
                className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105"
              />
            </div>

            <div className="absolute inset-0 rounded-xl sm:rounded-2xl ring-2 ring-transparent group-hover:ring-[#FFD166]/50 transition-all duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;