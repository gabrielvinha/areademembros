import React, { useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';

interface WelcomeModalProps {
  userName: string;
  onComplete: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ userName, onComplete }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 50000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0B0B0F] rounded-2xl p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Olá! {userName}
          </h2>
          <h3 className="text-xl sm:text-2xl text-[#FFD166] font-semibold mb-4">
            Aqui começa a sua mudança de vida!
          </h3>
          <p className="text-gray-300 text-base sm:text-lg mb-6">
            Veja esse vídeo curto para entender como vai funcionar nosso projeto:
          </p>
        </div>

        <div className="mb-6">
          <VideoPlayer videoId="rrMRMJCczbI" />
        </div>

        {showButton && (
          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="bg-[#FFD166] hover:bg-[#FFD166]/90 text-black font-bold text-lg px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Entendi e quero começar!
            </button>
          </div>
        )}

        {!showButton && (
          <div className="flex justify-center">
            <p className="text-gray-400 text-sm animate-pulse">
              Aguarde para continuar...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeModal;
