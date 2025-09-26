import React, { useState, useEffect } from 'react';
import { Lock, Clock } from 'lucide-react';

interface BonusSectionProps {
  user?: any;
}

const BonusSection: React.FC<BonusSectionProps> = ({ user }) => {
  const [unlockedBonuses, setUnlockedBonuses] = useState<Set<string>>(new Set());

  const bonuses = [
    {
      id: 'bonus1',
      title: 'Bônus 1: Código Secreto',
      image: 'https://i.postimg.cc/DSq49RPZ/Banner-C-digo-6.png',
      url: 'https://www.miniatura1.com',
      unlockDays: 3
    },
    {
      id: 'bonus2',
      title: 'Bônus 2: Prosperidade Silenciosa',
      image: 'https://i.postimg.cc/67hWJyYF/Banner-Prosperidadee-2.png',
      url: 'https://www.miniatura2.com',
      unlockDays: 6
    },
    {
      id: 'bonus3',
      title: 'Bônus 3: Detox da Escassez',
      image: 'https://i.postimg.cc/KRK8kc8g/Banner-Detox-1.png',
      url: 'https://www.miniatura3.com',
      unlockDays: 9
    },
    {
      id: 'bonus4',
      title: 'Bônus 4: Escritório Mental',
      image: 'https://i.postimg.cc/TKg20kmd/Banner-Escrit-rio-3.png',
      url: 'https://www.miniatura4.com',
      unlockDays: 12
    },
    {
      id: 'bonus5',
      title: 'Bônus 5: Mapa da Prosperidade',
      image: 'https://i.postimg.cc/3dPJgMkf/Banner-Mapa-4.png',
      url: 'https://www.miniatura5.com',
      unlockDays: 15
    },
    {
      id: 'bonus6',
      title: 'Bônus 6: Manual da Reprogramação',
      image: 'https://i.postimg.cc/d7Fsx8m8/Banner-Manual-5.png',
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
      
      bonuses.forEach(bonus => {
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
    <section className="py-20 px-6 bg-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">Bônus Exclusivos</h2>
        <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Conteúdos especiais que são liberados gradualmente conforme sua jornada na Frequência da Alma
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bonuses.map((bonus) => {
            const isUnlocked = unlockedBonuses.has(bonus.id);
            const daysRemaining = getDaysRemaining(bonus);
            
            return (
              <div
                key={bonus.id}
                onClick={() => handleBonusClick(bonus)}
                className={`relative group transform transition-all duration-500 hover:scale-105 ${
                  isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'
                }`}
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-b from-transparent to-black/80">
                  <img
                    src={bonus.image}
                    alt={bonus.title}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      isUnlocked ? 'group-hover:scale-110' : 'grayscale opacity-60'
                    }`}
                  />
                  
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
                      <div className="text-center">
                        {daysRemaining > 0 ? (
                          <>
                            <Clock className="w-16 h-16 text-[#FFD166] mb-4 mx-auto" />
                            <div className="bg-[#FFD166] text-black px-4 py-2 rounded-full font-bold text-sm">
                              {daysRemaining} {daysRemaining === 1 ? 'dia' : 'dias'} restantes
                            </div>
                          </>
                        ) : (
                          <Lock className="w-16 h-16 text-gray-400" />
                        )}
                      </div>
                    </div>
                  )}

                  {isUnlocked && (
                    <div className="absolute top-4 right-4">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <h3 className="text-xl font-bold text-white">{bonus.title}</h3>
                    <p className="text-gray-300 text-sm mt-2">
                      {isUnlocked ? 'Clique para acessar' : 
                       daysRemaining > 0 ? `Libera em ${daysRemaining} ${daysRemaining === 1 ? 'dia' : 'dias'}` : 
                       'Bloqueado'}
                    </p>
                    {isUnlocked && (
                      <div className="mt-2">
                        <span className="inline-block bg-[#FFD166] text-black text-xs px-2 py-1 rounded-full font-semibold">
                          LIBERADO
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className={`absolute inset-0 rounded-2xl ring-2 ring-transparent transition-all duration-500 ${
                  isUnlocked ? 'group-hover:ring-[#FFD166]/50' : ''
                }`} />
              </div>
            );
          })}
        </div>

        {/* Informação sobre o sistema de desbloqueio */}
        <div className="mt-12 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-w-2xl mx-auto border border-white/20">
            <h3 className="text-xl font-bold text-white mb-3">🎁 Sistema de Recompensas</h3>
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