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
      src: 'https://i.ibb.co/jZvkpTcY/Banner-Detox-1.png',
      alt: 'Bônus 1: Detox da Escassez',
      title: 'Bônus 1: Detox da Escassez',
      url: 'https://www.miniatura1.com',
      unlockDays: 3
    },
    {
      id: 'bonus2',
      src: 'https://i.ibb.co/6cJGX860/Banner-Prosperidadee-2.png',
      alt: 'Bônus 2: Prosperidade Silenciosa',
      title: 'Bônus 2: Prosperidade Silenciosa',
      url: 'https://www.miniatura2.com',
      unlockDays: 6
    },
    {
      id: 'bonus3',
      src: 'https://i.ibb.co/b5jbV4Fn/Banner-Escrit-rio-3.png',
      alt: 'Bônus 3: Escritório Mental',
      title: 'Bônus 3: Escritório Mental',
      url: 'https://www.miniatura3.com',
      unlockDays: 9
    },
    {
      id: 'bonus4',
      src: 'https://i.ibb.co/dwLYL5Cg/Banner-Mapa-4.png',
      alt: 'Bônus 4: Mapa da Prosperidade',
      title: 'Bônus 4: Mapa da Prosperidade',
      url: 'https://www.miniatura4.com',
      unlockDays: 12
    },
    {
      id: 'bonus5',
      src: 'https://i.ibb.co/v6hs9KD6/Banner-Manual-5.png',
      alt: 'Bônus 5: Manual da Reprogramação',
      title: 'Bônus 5: Manual da Reprogramação',
      url: 'https://www.miniatura5.com',
      unlockDays: 15
    },
    {
      id: 'bonus6',
      src: 'https://i.ibb.co/9H2phsLX/Banner-C-digo-6.png',
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
                        <Lock className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mb-3" />
                        <p className="text-white text-sm sm:text-base font-semibold">
                          Libera em {daysRemaining} {daysRemaining === 1 ? 'dia' : 'dias'}
                        </p>
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

      </div>
    </section>
  );
};

export default BonusSection;