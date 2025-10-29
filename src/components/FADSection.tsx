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
      title: ' ',
      image: 'https://i.ibb.co/cKKs2CtK/Capas-Area-Franklin-2-Prancheta-1-Prancheta-1.png',
      videoId: 'gSD0fFnpiGw'
    },
    {
      id: 'fad2',
      title: ' ',
      image: 'https://i.ibb.co/gMqY8M6J/Capas-Area-Franklin-2-Prancheta-1-Prancheta-1-copiar.png',
      videoId: 'sst2c-IYjS4'
    },
    {
      id: 'fad3',
      title: ' ',
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
    window.open('https://pay.cakto.com.br/38ed933/?utm_source=areademembros/', '_blank');
  };

  const handleItemClick = (videoId: string) => {
    if (isUnlocked) {
      setSelectedVideo(videoId);
    } else {
      setShowUnlockModal(true);
    }
  };

  return (
    <section id="fad-section" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 text-center px-2">FAD - Frequência da Abundância Dormindo</h2>
        <p className="text-sm sm:text-base text-gray-300 text-center mb-4 max-w-3xl mx-auto px-4">
          Reprogramação subconsciente enquanto você dorme. Transforme sua mente durante o descanso.
        </p>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-8 sm:mb-12 max-w-3xl mx-auto">
          <div className="flex items-start gap-3">
            <span className="text-yellow-500 text-xl flex-shrink-0">💳</span>
            <div>
              <h4 className="text-yellow-500 font-bold mb-1 text-sm sm:text-base">Produto Complementar</h4>
              <p className="text-gray-300 text-xs sm:text-sm">
                O FAD é um <strong className="text-white">conteúdo exclusivo vendido separadamente</strong>, não está incluído na sua assinatura atual da área de membros. Para ter acesso, é necessário realizar a compra do produto específico.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          {fadItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item.videoId)}
              className="relative group cursor-pointer transform transition-all duration-500 hover:scale-105"
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
                    {isUnlocked ? 'Clique para assistir' : 'Clique para desbloquear'}
                  </p>
                </div>
              </div>
              
              <div className={`absolute inset-0 rounded-xl sm:rounded-2xl ring-2 ring-transparent transition-all duration-500 ${
                isUnlocked ? 'group-hover:ring-[#FFD166]/50' : ''
              }`} />
            </div>
          ))}
        </div>

        {/* Card Especial "Liberar Tudo" - só aparece quando não está desbloqueado */}
        {!isUnlocked && (
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
        )}
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
            
            <div className="flex justify-center mt-6">
              <a
                href="https://pay.cakto.com.br/38ed933/?utm_source=areademembros/"
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
          <div className="p-6 sm:p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Tutorial de Acesso ao Produto</h2>
              <p className="text-gray-300 text-sm sm:text-base">Guia completo para desbloquear seu acesso na área de membros</p>
            </div>

            <div className="space-y-6">
              {/* Aviso de Produto Pago */}
              <div className="bg-yellow-500/10 border-2 border-yellow-500/50 rounded-lg p-4 sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 text-2xl flex-shrink-0">⚠️</span>
                  <div>
                    <h4 className="text-yellow-500 font-bold text-lg sm:text-xl mb-2">Produto Complementar Pago</h4>
                    <p className="text-white text-sm sm:text-base font-semibold">
                      O FAD - Frequência da Abundância Dormindo é um <strong>conteúdo exclusivo vendido separadamente</strong>. Ele NÃO está incluído na sua assinatura atual da área de membros.
                    </p>
                  </div>
                </div>
              </div>

              {/* Passo 1 */}
              <div className="bg-white/5 rounded-lg p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#FFD166] rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-lg sm:text-xl">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Já Comprou o FAD?</h3>
                    <p className="text-gray-300 text-sm sm:text-base">
                      Se você já efetuou o pagamento do produto FAD, você recebeu um código de acesso no seu e-mail. Localize este código e copie-o.
                    </p>
                  </div>
                </div>
              </div>

              {/* Passo 2 */}
              <div className="bg-white/5 rounded-lg p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#FFD166] rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-lg sm:text-xl">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Desbloqueie na Área de Membros</h3>
                    <p className="text-gray-300 text-sm sm:text-base mb-4">
                      Insira o código recebido por e-mail no campo abaixo:
                    </p>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD166] mb-2"
                      placeholder="Digite o código de acesso"
                    />
                    {passwordError && (
                      <p className="text-red-400 text-sm mb-2">{passwordError}</p>
                    )}
                    <button
                      onClick={handlePasswordSubmit}
                      className="w-full bg-[#FFD166] hover:bg-[#FFD166]/90 text-black font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Desbloquear Acesso
                    </button>
                  </div>
                </div>
              </div>

              {/* Passo 3 */}
              <div className="bg-white/5 rounded-lg p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#FFD166] rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-lg sm:text-xl">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Ainda Não Comprou o FAD?</h3>
                    <p className="text-gray-300 text-sm sm:text-base mb-4">
                      Este é um produto complementar vendido separadamente. Clique no botão abaixo para adquirir seu acesso ao FAD:
                    </p>
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Comprar o FAD Agora
                    </button>
                  </div>
                </div>
              </div>

              {/* Aviso */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 text-xl">ℹ️</span>
                  <div>
                    <h4 className="text-blue-500 font-bold mb-1">Informação Importante</h4>
                    <p className="text-gray-300 text-sm">
                      O código de acesso do FAD é enviado imediatamente após a confirmação do pagamento do produto. Verifique sua caixa de entrada e também a pasta de spam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default FADSection;