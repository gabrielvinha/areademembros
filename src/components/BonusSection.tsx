import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, Lock } from 'lucide-react';

interface BonusSectionProps {
  user?: any;
}

const BonusSection: React.FC<BonusSectionProps> = ({ user }) => {
  const [unlockedBonuses, setUnlockedBonuses] = useState<Set<string>>(new Set());

  const bannerImages = [
    {
      id: 'bonus1',
      src: 'https://i.postimg.cc/KRK8kc8g/Banner-Detox-1.png',
      alt: 'Bônus 1: Detox da Escassez',
      title: 'Bônus 1: Detox da Escassez',
      url: 'https://www.miniatura1.com',
      unlockDays: 3
    },
    {
      id: 'bonus2',
      src: 'https://i.postimg.cc/67hWJyYF/Banner-Prosperidadee-2.png',
      alt: 'Bônus 2: Prosperidade Silenciosa',
      title: 'Bônus 2: Prosperidade Silenciosa',
      url: 'https://www.miniatura2.com',
      unlockDays: 6
    },
    {
      id: 'bonus3',
      src: 'https://i.postimg.cc/TKg20kmd/Banner-Escrit-rio-3.png',
      alt: 'Bônus 3: Escritório Mental',
      title: 'Bônus 3: Escritório Mental',
      url: 'https://www.miniatura3.com',
      unlockDays: 9
    },
    {
      id: 'bonus4',
      src: 'https://i.postimg.cc/3dPJgMkf/Banner-Mapa-4.png',
      alt: 'Bônus 4: Mapa da Prosperidade',
      title: 'Bônus 4: Mapa da Prosperidade',
      url: 'https://www.miniatura4.com',
      unlockDays: 12
    },
    {
      id: 'bonus5',
      src: 'https://i.postimg.cc/d7Fsx8m8/Banner-Manual-5.png',
      alt: 'Bônus 5: Manual da Reprogramação',
      title: 'Bônus 5: Manual da Reprogramação',
      url: 'https://www.miniatura5.com',
      unlockDays: 15
    },
    {
      id: 'bonus6',
      src: 'https://i.postimg.cc/DSq49RPZ/Banner-C-digo-6.png',
      alt: 'Bônus 6: Código Secreto',
      title: 'Bônus 6: Código Secreto',
      url: 'https://www.miniatura6.com',
      unlockDays: 18
    }
  ];

  useEffect(() => {
    if (user?.created_at) {
      const accountCreationDate = new Date(user.created_at);
      const currentDate = new Date();
      const daysSinceCreation = Math.floor((currentDate.getTime() - accountCreationDate.getTime()) / (1000 * 60 * 60 * 24));
      
      const newUnlockedBonuses = new Set<string>();
      
      bannerImages.forEach(bonus => {
        if (daysSinceCreation >= bonus.unlockDays) {
          newUnlockedBonuses.add(bonus.id);
        }
      });
      
      setUnlockedBonuses(newUnlockedBonuses);
    }
  }, [user]);

  const handleBonusClick = (bonus: any) => {
    if (unlockedBonuses.has(bonus.id)) {
      window.open(bonus.url, '_blank');
    }
  };

  const getDaysRemaining = (bonus: any) => {
    if (!user?.created_at) return bonus.unlockDays;
    
    const accountCreationDate = new Date(user.created_at);
    const currentDate = new Date();
    const daysSinceCreation = Math.floor((currentDate.getTime() - accountCreationDate.getTime()) / (1000 * 60 * 60 * 24));
    
    return Math.max(0, bonus.unlockDays - daysSinceCreation);
  };

  return (
    <section className="w-full bg-black py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6">
      <div className="max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto">
        <h2 className="font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight mb-6 sm:mb-8 md:mb-12 text-center px-2">
          <span className="text-yellow-500">BÔNUS</span>
          <span className="text-white"> EXCLUSIVOS:</span>
        </h2>

        {/* Banner Images */}
        <div className="space-y-3 sm:space-y-4 md:space-y-6 mb-8 sm:mb-12 md:mb-16">
          {bannerImages.map((bonus, index) => {
            const isUnlocked = unlockedBonuses.has(bonus.id);
            const daysRemaining = getDaysRemaining(bonus);
            
            return (
              <div 
                key={`banner-${index}`} 
                className={`w-full relative group ${
                  isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'
                }`}
                onClick={() => handleBonusClick(bonus)}
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    className={`w-full h-auto object-cover rounded-lg transition-all duration-500 ${
                      isUnlocked ? 'group-hover:scale-105' : 'grayscale opacity-60'
                    }`}
                    alt={bonus.alt}
                    src={bonus.src}
                  />
                  
                  {/* Overlay para itens bloqueados */}
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-lg">
                      <div className="text-center">
                        {daysRemaining > 0 ? (
                          <>
                            <Clock className="w-12 h-12 text-[#FFD166] mb-3 mx-auto" />
                            <div className="bg-[#FFD166] text-black px-4 py-2 rounded-full font-bold text-sm">
                              {daysRemaining} {daysRemaining === 1 ? 'dia' : 'dias'} restantes
                            </div>
                            <p className="text-white text-xs mt-2 opacity-80">
                              Libera em {bonus.unlockDays} dias
                            </p>
                          </>
                        ) : (
                          <Lock className="w-12 h-12 text-gray-400" />
                        )}
                      </div>
                    </div>
                  )}

                  {/* Badge de liberado */}
                  {isUnlocked && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        LIBERADO ✓
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            className="w-full max-w-xs sm:max-w-sm h-auto py-3 sm:py-4 px-4 sm:px-6 bg-[linear-gradient(173deg,rgba(17,24,39,0.5)_0%,rgba(55,65,81,0.8)_100%)] border border-gray-800 shadow-[0px_0px_20px_#6b72801a] rounded-xl hover:opacity-90 transition-opacity mx-auto flex items-center justify-center"
            onClick={() => window.open('https://www.checkoutupsell.com', '_blank')}
          >
            <span className="font-bold text-white text-xs sm:text-sm md:text-base tracking-[0.40px] leading-5 sm:leading-6 mr-2">
              QUERO OS BÔNUS
            </span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-white" />
          </button>
        </div>

        {/* Informação sobre o sistema de desbloqueio */}
        <div className="mt-8 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 max-w-2xl mx-auto border border-white/20">
            <h3 className="text-lg font-bold text-white mb-2">🎁 Sistema de Recompensas</h3>
            <p className="text-gray-300 text-sm">
              Os bônus são liberados automaticamente conforme você avança em sua jornada. 
              Cada conteúdo é desbloqueado em momentos estratégicos para maximizar seu desenvolvimento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BonusSection;