import React from 'react';
import { Lock } from 'lucide-react';

interface ModuleCardProps {
  title: string;
  image: string;
  isLocked?: boolean;
  onClick: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, image, isLocked, onClick }) => {
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
        
        {isLocked && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Lock className="w-12 h-12 sm:w-16 sm:h-16 text-[#FFD166]" />
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