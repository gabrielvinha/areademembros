import React from 'react';
import { Lock } from 'lucide-react';

interface ModuleCardProps {
  title: string;
  image: string;
  isLocked?: boolean;
  comingSoon?: boolean;
  onClick: () => void;
  daysRemaining?: number;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, image, isLocked, comingSoon, onClick, daysRemaining }) => {

  return (
    <div
      className="relative group cursor-pointer transform transition-all duration-500 hover:scale-105 w-full" 
      onClick={onClick} 
    >
      <div className="aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-b from-transparent to-black/80">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
        />
        
        {/* Overlay para itens bloqueados e contador de dias */}
{isLocked && !comingSoon && typeof daysRemaining === 'number' && daysRemaining > 0 ? (
  <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-lg">
    <div className="text-center px-4">
      <Lock className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-gray-400 mb-2 sm:mb-3 mx-auto" />
      <p className="text-white text-xs sm:text-sm md:text-base font-semibold">
        Libera em {daysRemaining} {daysRemaining === 1 ? 'dia' : 'dias'}
      </p>
    </div>
  </div>
) : (isLocked || comingSoon) && (
  <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-lg">
    <Lock className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#FFD166] mb-2" />
    {comingSoon && (
      <p className="text-white text-xs sm:text-sm md:text-base font-bold px-4 text-center">
        EM BREVE
      </p>
    )}
  </div>
)}

        
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
          <h3 className="text-sm sm:text-base md:text-xl font-bold text-white leading-tight">{title}</h3>
          {isLocked && (
            <p className="text-gray-300 text-xs sm:text-sm mt-1 sm:mt-2">Clique para desbloquear</p>
          )}
        </div>
      </div>
      
      <div className="absolute inset-0 rounded-xl sm:rounded-2xl ring-2 ring-transparent group-hover:ring-[#FFD166]/50 transition-all duration-500" />
    </div>
  );
};

export default ModuleCard;