import React, { useState } from 'react';
import { HelpCircle, X, MessageCircle, Mail, Phone } from 'lucide-react';

const HelpButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = '5511999999999';
  const whatsappMessage = 'Olá! Preciso de ajuda com a área de membros Frequência da Alma.';

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
      '_blank'
    );
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 animate-pulse-glow"
        aria-label="Ajuda"
      >
        {isOpen ? (
          <X className="w-8 h-8" />
        ) : (
          <HelpCircle className="w-8 h-8" />
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 max-w-[calc(100vw-3rem)] animate-fade-in">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 shadow-2xl border-2 border-yellow-500/50">
            <h3 className="text-xl font-bold text-white mb-4">
              Como podemos ajudar?
            </h3>

            <p className="text-gray-300 text-base mb-6 leading-relaxed">
              Estamos aqui para te auxiliar em qualquer dúvida sobre a área de membros!
            </p>

            <div className="space-y-3">
              <button
                onClick={handleWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 text-base"
              >
                <MessageCircle className="w-5 h-5" />
                Falar no WhatsApp
              </button>

              <a
                href="mailto:suporte@frequenciadaalma.com"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 text-base block"
              >
                <Mail className="w-5 h-5" />
                Enviar E-mail
              </a>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">
                      Dúvidas Frequentes
                    </p>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• Como desbloquear módulos?</li>
                      <li>• Como acessar bônus?</li>
                      <li>• Problemas com login?</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-500 text-xs text-center mt-4">
              Respondemos em até 24 horas
            </p>
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default HelpButton;
