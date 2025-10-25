import React, { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';
import Modal from './Modal';

interface ProsperitySectionProps {
  isUnlocked: boolean;
  onUnlock: () => void;
}

const ProsperitySection: React.FC<ProsperitySectionProps> = ({ isUnlocked, onUnlock }) => {
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const prosperityItems = [
    {
      id: 'prosperity1',
      title: 'Abundância Financeira',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
      url: 'https://abundancia.com'
    },
    {
      id: 'prosperity2',
      title: 'Energia Vital',
      image: 'https://images.pexels.com/photos/3820333/pexels-photo-3820333.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
      url: 'https://energia.com'
    },
    {
      id: 'prosperity3',
      title: 'Harmonia Familiar',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
      url: 'https://harmonia.com'
    },
    {
      id: 'prosperity4',
      title: 'Propósito de Vida',
      image: 'https://images.pexels.com/photos/3747463/pexels-photo-3747463.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
      url: 'https://proposito.com'
    }
  ];

  const handlePasswordSubmit = () => {
    if (password === 'prosperidade') {
      onUnlock();
      setShowUnlockModal(false);
      setPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Código inválido');
    }
  };

  const handleCheckout = () => {
    window.open('https://prosperidadecheckout.com', '_blank');
  };

  const handleItemClick = (url: string) => {
    if (isUnlocked) {
      window.open(url, '_blank');
    } else {
      setShowUnlockModal(true);
    }
  };

  return (
    <section id="prosperity-section" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 sm:mb-12 text-center">Prosperidade e Energia</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          {prosperityItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item.url)}
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
                
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <h3 className="text-sm sm:text-base md:text-xl font-bold text-white leading-tight">{item.title}</h3>
                  <p className="text-gray-300 text-xs sm:text-sm mt-1 sm:mt-2">
                    {isUnlocked ? 'Clique para acessar' : 'Clique para desbloquear'}
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
              <div className="aspect-[3/2] w-full max-w-sm sm:max-w-md md:w-96 rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-[#FFD166] to-orange-400">
                <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
                  <Unlock className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-black mb-4 sm:mb-6" />
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black text-center">Liberar Tudo</h3>
                  <p className="text-black/80 text-center mt-2 sm:mt-4 text-sm sm:text-base px-2">
                    Desbloqueie todas as funcionalidades de prosperidade e energia
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 rounded-xl sm:rounded-2xl ring-2 ring-transparent group-hover:ring-white/50 transition-all duration-500" />
            </div>
          </div>
        )}
      </div>

      {/* Modal de Desbloqueio */}
      {showUnlockModal && (
        <Modal onClose={() => setShowUnlockModal(false)}>
          <div className="p-6 text-center">
            <Unlock className="w-16 h-16 text-[#FFD166] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Desbloqueie agora a prosperidade e energia da sua vida e da sua família
            </h3>
            
            <div className="space-y-4">
              <button
                disabled
                className="w-full bg-gray-600 cursor-not-allowed text-gray-400 font-bold py-3 rounded-lg opacity-50"
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

export default ProsperitySection;