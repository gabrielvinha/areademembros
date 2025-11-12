import React, { useEffect } from 'react';
import VideoPlayer from './VideoPlayer';

interface WelcomeModalProps {
  userName: string;
  onComplete: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ userName, onComplete }) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0B0B0F] rounded-2xl p-6 sm:p-8 max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Olá! {userName}
          </h2>
          <h3 className="text-xl sm:text-2xl text-[#FFD166] font-semibold mb-4">
            Aqui começa a sua mudança de vida!
          </h3>
          <p className="text-gray-300 text-base sm:text-lg mb-2">
            Veja esse vídeo curto para entender como vai funcionar nosso projeto:
          </p>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6 text-left">
            <div className="flex items-start gap-3">
              <span className="text-yellow-500 text-xl">ℹ️</span>
              <div>
                <h4 className="text-yellow-500 font-bold mb-1 text-sm sm:text-base">Importante!</h4>
                <p className="text-gray-300 text-xs sm:text-sm">
                  O FAD (Frequência da Abundância Dormindo) é um <strong className="text-white">produto complementar pago à parte</strong>, não está incluído nesta área de membros. Você pode adquiri-lo separadamente se desejar.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <VideoPlayer videoId="rrMRMJCczbI" />
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={onComplete}
            className="bg-[#FFD166] hover:bg-[#FFD166]/90 text-black font-bold text-lg px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation"
          >
            Entendi e quero começar!
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
