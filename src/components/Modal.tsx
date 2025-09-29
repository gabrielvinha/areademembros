import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-black/90 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/20 max-w-xs sm:max-w-2xl md:max-w-4xl w-full max-h-[90vh] overflow-y-auto mx-3 sm:mx-4">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;