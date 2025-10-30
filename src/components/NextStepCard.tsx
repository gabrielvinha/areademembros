import React from 'react';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface NextStepCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  badge?: string;
  gradient?: string;
}

const NextStepCard: React.FC<NextStepCardProps> = ({
  icon: Icon,
  title,
  description,
  ctaText,
  ctaUrl,
  badge,
  gradient = 'from-blue-600 to-purple-600'
}) => {
  const handleClick = () => {
    window.open(ctaUrl, '_blank');
  };

  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-black/90 rounded-2xl p-6 sm:p-8 border-2 border-white/10 hover:border-yellow-500/50 transition-all duration-300 transform hover:scale-[1.02] shadow-xl">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center`}>
          <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        </div>
        {badge && (
          <div className="bg-red-600 text-white px-3 py-1 rounded-full font-bold text-xs sm:text-sm animate-pulse">
            {badge}
          </div>
        )}
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed">{description}</p>

      <button
        onClick={handleClick}
        className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-base sm:text-lg px-6 py-3 sm:py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 btn-large-friendly"
      >
        {ctaText}
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default NextStepCard;
