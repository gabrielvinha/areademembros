import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm -z-10" />
      <div className="relative bg-black/90 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/20 max-w-xs sm:max-w-2xl md:max-w-4xl w-full my-8 mx-3 sm:mx-4">
        <button
          onClick={onClose}
          className="sticky top-3 right-3 sm:top-4 sm:right-4 float-right z-10 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 touch-manipulation active:scale-95"
          aria-label="Fechar modal"
        >
          <X className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </button>
        <div className="clear-both">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;