import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const phoneNumber = '5548996931732';
  const message = 'Olá! Preciso de suporte.';

  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const closeTooltip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTooltip(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {showTooltip && (
        <div className="relative bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg animate-bounce-subtle">
          <button
            onClick={closeTooltip}
            className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full p-1 hover:bg-gray-700 transition-all"
            aria-label="Fechar mensagem"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="text-sm font-medium pr-4">Falar com suporte</p>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white" />
        </div>
      )}

      <button
        onClick={handleClick}
        className="bg-[#25D366] hover:bg-[#20BD5A] text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 group relative"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
      </button>
    </div>
  );
};

export default WhatsAppButton;
