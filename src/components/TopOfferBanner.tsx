import React, { useState, useEffect } from 'react';
import { X, Sparkles, Clock } from 'lucide-react';

interface TopOfferBannerProps {
  onClose?: () => void;
}

const TopOfferBanner: React.FC<TopOfferBannerProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white py-3 px-4 relative animate-pulse-glow">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Sparkles className="w-6 h-6 flex-shrink-0 animate-bounce" />
          <div className="flex-1 min-w-0">
            <p className="text-sm sm:text-base md:text-lg font-bold leading-tight">
              OFERTA ESPECIAL: Desafio dos 21 Dias de Manifestação
            </p>
            <p className="text-xs sm:text-sm opacity-90 mt-1">
              Transforme sua vida em apenas 3 semanas
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-black/30 px-3 py-2 rounded-lg">
            <Clock className="w-4 h-4" />
            <span className="font-mono font-bold text-sm sm:text-base">{formatTime(timeLeft)}</span>
          </div>

          <a
            href="https://pay.cakto.com.br/3a5hp6s/?utm_source=areademembros"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-red-600 hover:bg-gray-100 font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base whitespace-nowrap"
          >
            QUERO MINHA VAGA
          </a>
        </div>

        <button
          onClick={handleClose}
          className="absolute top-1 right-1 sm:relative sm:top-0 sm:right-0 text-white/80 hover:text-white transition-colors p-1"
          aria-label="Fechar banner"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TopOfferBanner;
