import React, { useState } from 'react';
import { Lock, Unlock, Play } from 'lucide-react';
import Modal from './Modal';
import VideoPlayer from './VideoPlayer';

interface FADSectionProps {
  isUnlocked: boolean;
  onUnlock: () => void;
}

const FADSection: React.FC<FADSectionProps> = ({ isUnlocked, onUnlock }) => {
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const fadItems = [
    {
      id: 'fad1',
      title: 'Reprogramação Subconsciente Financeira',
      image: 'https://i.ibb.co/cKKs2CtK/Capas-Area-Franklin-2-Prancheta-1-Prancheta-1.png',
      videoId: 'gSD0fFnpiGw'
    },
    {
      id: 'fad2',
      title: 'Reprogramação Subconsciente Relacionamento',
      image: 'https://i.ibb.co/gMqY8M6J/Capas-Area-Franklin-2-Prancheta-1-Prancheta-1-copiar.png',
      videoId: 'sst2c-IYjS4'
    },
    {
      id: 'fad3',
      title: 'Reprogramação Subconsciente Saúde',
      image: 'https://i.ibb.co/Wp5Z9jFb/Capas-Area-Franklin-2-Prancheta-1-Prancheta-1-copiar-2.png',
      videoId: 'P_eaOu4QpWQ'
    }
  ];

  const handlePasswordSubmit = () => {
    if (password === 'fad02') {
      onUnlock();
      setShowUnlockModal(false);
      setPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Código inválido');
    }
  };

  const handleCheckout = () => {
    window.open('https://www.ggcheckout.com/checkout/v2/J25a3PtsEN7s4EFuNxFx', '_blank');
  };

  const handleItemClick = (videoId: string) => {
    if (isUnlocked) {
      setSelectedVideo(videoId);
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 text-center px-2">FAD - Frequência da Abundância Dormindo</h2>
        <p className="text-sm sm:text-base text-gray-300 text-center mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
          Reprogramação subconsciente enquanto você dorme. Transforme sua mente durante o descanso.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          {fadItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item.videoId)}
              className={`relative group transform transition-all duration-500 hover:scale-105 ${
                isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'
              }`}
            >
              <div className="aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-b from-transparent to-black/80">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    isUnlocked ? 'group-hover:scale-110' : 'grayscale'
                  }`}
                />
                
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Lock className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
                  </div>
                )}

                {isUnlocked && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#FFD166] rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 text-black ml-1" />
                    </div>
                  </div>
                )}
                
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <h3 className="text-sm sm:text-base md:text-xl font-bold text-white leading-tight">{item.title}</h3>
                  <p className="text-gray-300 text-xs sm:text-sm mt-1 sm:mt-2">
                    {isUnlocked ? 'Clique para assistir' : 'Bloqueado'}
                  </p>
                </div>
              </div>
              
              <div className={`absolute inset-0 rounded-xl sm:rounded-2xl ring-2 ring-transparent transition-all duration-500 ${
                isUnlocked ? 'group-hover:ring-[#FFD166]/50' : ''
              }`} />
            </div>
          ))}
        </div>

        {/* Card Especial "Liberar Tudo" */}
        <div className="flex justify-center">
          <div
            onClick={() => setShowUnlockModal(true)}
            className="relative group cursor-pointer transform transition-all duration-500 hover:scale-105"
          >
            <div className="aspect-[3/2] w-full max-w-sm sm:max-w-md md:w-96 rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-purple-600 to-blue-600">
              <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
                <Unlock className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-white mb-4 sm:mb-6" />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center">Liberar Tudo</h3>
                <p className="text-white/80 text-center mt-2 sm:mt-4 text-sm sm:text-base px-2">
                  Desbloqueie todas as reprogramações subconscientes
                </p>
              </div>
            </div>
            
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl ring-2 ring-transparent group-hover:ring-white/50 transition-all duration-500" />
          </div>
        </div>
      </div>

      {/* Modal de Vídeo */}
      {selectedVideo && (
        <Modal onClose={() => setSelectedVideo(null)}>
          <div className="p-8">
            <h3 className="text-xl font-bold text-white mb-4">
              {fadItems.find(item => item.videoId === selectedVideo)?.title}
            </h3>
            <div className="mb-6">
              <VideoPlayer videoId={selectedVideo} />
            </div>
            
            <div className="flex gap-4 mt-6">
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Falar no WhatsApp
              </a>
              <a
                href="https://www.ggcheckout.com/checkout/v2/J25a3PtsEN7s4EFuNxFx"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FFD166] hover:bg-[#FFD166]/90 text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Adquirir mais conteúdos
              </a>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal de Desbloqueio */}
      {showUnlockModal && (
        <Modal onClose={() => setShowUnlockModal(false)}>
          <div className="p-6 text-center">
            <Unlock className="w-16 h-16 text-[#FFD166] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Desbloqueie a Frequência da Abundância Dormindo
            </h3>
            <p className="text-gray-300 mb-6">
              Acesse todas as reprogramações subconscientes e transforme sua vida enquanto dorme
            </p>
            
            <div className="space-y-4">
              <button
                onClick={handleCheckout}
                className="w-full bg-[#FFD166] hover:bg-[#FFD166]/90 text-black font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Desbloquear agora
              </button>
              
              <div className="border-t border-white/20 pt-4">
                <p className="text-gray-400 mb-3">Já adquiriu? Digite o código recebido por e-mail:</p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD166]"
                  placeholder="Digite o código"
                />
                {passwordError && (
                  <p className="text-red-400 text-sm mt-2">{passwordError}</p>
                )}
                <button
                  onClick={handlePasswordSubmit}
                  className="w-full mt-3 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg transition-all duration-300"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default FADSection;