import React from 'react';
import { X, Sparkles } from 'lucide-react';

interface PromotionModalProps {
  onClose: () => void;
  onViewChallenge: () => void;
}

const PromotionModal: React.FC<PromotionModalProps> = ({ onClose, onViewChallenge }) => {
  const today = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 rounded-2xl p-6 sm:p-8 max-w-2xl w-full relative animate-pulse-slow">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition-all duration-300"
          aria-label="Fechar"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-yellow-400 rounded-full p-4">
              <Sparkles className="w-12 h-12 text-purple-900" />
            </div>
          </div>

          <div className="mb-4">
            <span className="inline-block bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full animate-bounce">
              APENAS HOJE - {today}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            DESAFIO DOS 21 DIAS DE MANIFESTAÇÃO
          </h2>

          <div className="mb-6">
            <p className="text-gray-300 text-lg mb-4">
              Transforme sua vida em apenas 3 semanas!
            </p>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-center">
                <p className="text-gray-400 line-through text-xl">De R$ 197,00</p>
              </div>
              <div className="text-center">
                <p className="text-yellow-400 text-5xl font-black">R$ 47,00</p>
              </div>
            </div>
            <p className="text-red-400 font-bold text-lg animate-pulse">
              76% DE DESCONTO - Oferta expira à meia-noite!
            </p>
          </div>

          <div className="space-y-3 mb-8 text-left max-w-md mx-auto">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-sm">✓</span>
              </div>
              <p className="text-white text-sm">21 dias de práticas guiadas diariamente</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-sm">✓</span>
              </div>
              <p className="text-white text-sm">Técnicas comprovadas de manifestação</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-sm">✓</span>
              </div>
              <p className="text-white text-sm">Suporte exclusivo durante todo o desafio</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-sm">✓</span>
              </div>
              <p className="text-white text-sm">Bônus exclusivos para participantes</p>
            </div>
          </div>

          <button
            onClick={onViewChallenge}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-purple-900 font-black text-xl px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl mb-4"
          >
            VER MAIS SOBRE O DESAFIO
          </button>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-sm transition-all duration-300"
          >
            Talvez mais tarde
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionModal;
