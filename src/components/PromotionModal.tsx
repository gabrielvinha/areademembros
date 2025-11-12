import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface PromotionModalProps {
  onClose: () => void;
  onViewChallenge: () => void;
}

const PromotionModal: React.FC<PromotionModalProps> = ({ onClose, onViewChallenge }) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-black/80 rounded-2xl p-4 sm:p-6 md:p-8 max-w-lg w-full relative my-8">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white/80 hover:text-white transition-all duration-300 z-10 bg-black/50 rounded-full p-2 sm:p-3 touch-manipulation active:scale-95"
          aria-label="Fechar"
        >
          <X className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        <div className="space-y-4 sm:space-y-6">
          <div className="w-full">
            <img
              src="/promocao desafio.png"
              alt="Desafio dos 21 Dias de Manifestação"
              className="w-full h-auto rounded-lg"
            />
          </div>

          <button
            onClick={onViewChallenge}
            className="w-full bg-gradient-to-r from-[#FFD166] to-yellow-500 hover:from-yellow-500 hover:to-[#FFD166] text-black font-bold text-base sm:text-lg md:text-xl px-6 py-3 sm:py-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl touch-manipulation"
          >
            VER MAIS SOBRE O DESAFIO
          </button>

          <button
            onClick={onClose}
            className="w-full text-gray-400 hover:text-white text-sm transition-all duration-300 py-2 touch-manipulation"
          >
            Talvez mais tarde
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionModal;
