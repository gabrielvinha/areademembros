import React, { useEffect, useState } from 'react';
import { X, Gift, Clock, Star } from 'lucide-react';

interface ExitIntentModalProps {
  onClose: () => void;
}

const ExitIntentModal: React.FC<ExitIntentModalProps> = ({ onClose }) => {
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAccept = () => {
    window.open('https://pay.cakto.com.br/3a5hp6s/?utm_source=areademembros', '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-[70] p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 sm:p-8 md:p-10 max-w-2xl w-full relative border-4 border-yellow-500 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition-all duration-300 z-10 bg-black/50 rounded-full p-2"
          aria-label="Fechar"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full mb-4 animate-bounce">
            <Gift className="w-10 h-10 text-black" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Espere! <span className="text-yellow-500">Não vá embora ainda...</span>
          </h2>

          <p className="text-xl sm:text-2xl text-gray-300 font-semibold">
            Temos uma oferta especial só para você!
          </p>

          <div className="bg-red-600/20 border-2 border-red-500 rounded-xl p-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="w-8 h-8 text-red-500" />
              <span className="text-3xl sm:text-4xl font-bold text-red-500 font-mono">{formatTime(timeLeft)}</span>
            </div>
            <p className="text-white text-lg font-semibold">
              Esta oferta expira em alguns minutos!
            </p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/50 rounded-xl p-6 text-left">
            <h3 className="text-2xl font-bold text-yellow-500 mb-4 text-center">
              Desafio dos 21 Dias de Manifestação
            </h3>

            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-3">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500 flex-shrink-0 mt-1" />
                <p className="text-white text-base sm:text-lg">21 dias de transformação guiada</p>
              </div>
              <div className="flex items-start gap-3">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500 flex-shrink-0 mt-1" />
                <p className="text-white text-base sm:text-lg">Acompanhamento personalizado diário</p>
              </div>
              <div className="flex items-start gap-3">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500 flex-shrink-0 mt-1" />
                <p className="text-white text-base sm:text-lg">Grupo exclusivo de membros</p>
              </div>
              <div className="flex items-start gap-3">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500 flex-shrink-0 mt-1" />
                <p className="text-white text-base sm:text-lg">Resultados comprovados em 3 semanas</p>
              </div>
            </div>

            <div className="bg-green-600/20 border border-green-500 rounded-lg p-4 text-center">
              <p className="text-green-400 font-bold text-lg">
                + BÔNUS EXCLUSIVO: Acesso vitalício ao material
              </p>
            </div>
          </div>

          <button
            onClick={handleAccept}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-xl sm:text-2xl px-8 py-5 sm:py-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl animate-pulse-glow"
          >
            SIM! QUERO GARANTIR MINHA VAGA AGORA
          </button>

          <button
            onClick={onClose}
            className="w-full text-gray-400 hover:text-white text-base transition-all duration-300 underline"
          >
            Não, obrigado. Não quero transformar minha vida agora.
          </button>

          <p className="text-sm text-gray-500">
            Garantia de 7 dias - Devolvemos seu dinheiro se não gostar
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentModal;
