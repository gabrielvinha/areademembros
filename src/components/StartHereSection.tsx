import React, { useState } from 'react';
import { Play, ExternalLink, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import Modal from './Modal';
import VideoPlayer from './VideoPlayer';

const StartHereSection: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showProducts, setShowProducts] = useState(false);

  const products = [
    {
      id: 'fad',
      title: 'FAD - Frequência da Abundância Dormindo',
      image: 'https://i.ibb.co/cKKs2CtK/Capas-Area-Franklin-2-Prancheta-1-Prancheta-1.png',
      description: 'Reprogramação subconsciente enquanto você dorme',
      videoId: 'gSD0fFnpiGw',
      ctaText: 'Garantir Acesso ao FAD',
      url: 'https://pay.cakto.com.br/38ed933/?utm_source=areademembros/'
    },
    {
      id: 'mentorship1',
      title: 'Mentoria 1 a 1 com Andressa',
      image: 'https://i.ibb.co/S4YkLwbg/Capas-Area-Franklin-2-Prancheta-1-Prancheta-1-copiar-3.png',
      description: 'Acompanhamento individual e personalizado',
      videoId: 'Gr7jAM_z-B0',
      ctaText: 'Quero minha vaga',
      url: 'https://www.ggcheckout.com/checkout/v2/AK8lDX8FfyhKJp3G1uWP'
    },
    {
      id: 'mentorship2',
      title: 'Acompanhamento em Grupo',
      image: 'https://i.ibb.co/Y4WzqFM8/Capas-Area-Franklin-2-Prancheta-1-Prancheta-1-copiar-4.png',
      description: 'Sessões coletivas de mentoria',
      videoId: 's5mi5QHcUxo',
      ctaText: 'Liberar acompanhamento',
      url: 'https://www.ggcheckout.com/checkout/v2/b8csr8IKmkiHMflHEL0D'
    },
    {
      id: 'challenge',
      title: 'Desafio dos 21 Dias',
      image: 'https://i.ibb.co/JF7Sg295/Capas-Area-Franklin-2-Prancheta-1-Prancheta-1-copiar-5.png',
      description: 'Prática guiada diária para manifestação',
      videoId: '_EziY6n19R8',
      ctaText: 'Garantir minha vaga',
      url: 'https://pay.cakto.com.br/3a5hp6s/?utm_source=areademembros',
      badge: 'DE R$ 197 POR R$ 47'
    },
    {
      id: 'anxiety',
      title: 'Liberte-se da Ansiedade',
      image: 'https://i.ibb.co/HDGcXqWG/libertesse-da-ansiedade-logo.png',
      description: '3 técnicas exclusivas de autorregulação',
      ctaText: 'Adquirir com -80% OFF',
      url: 'https://pay.cakto.com.br/3cygfwq',
      badge: 'ACESSO IMEDIATO'
    },
    {
      id: 'affirmations',
      title: 'Afirmações Que Atraem',
      image: 'https://i.ibb.co/Vc9y3Ln9/Chat-GPT-Image-4-de-out-de-2025-17-27-10.png',
      description: 'Protocolo para desbloquear crenças de escassez',
      ctaText: 'Adquirir com -80% OFF',
      url: 'https://pay.cakto.com.br/srm22uf',
      badge: 'ACESSO IMEDIATO'
    },
    {
      id: 'updates',
      title: 'Atualizações Semanais',
      image: 'https://i.ibb.co/rq6R2QC/att-mensail.png',
      description: 'Acesso antecipado a novos conteúdos',
      ctaText: 'Garantir Acesso',
      url: 'https://pay.cakto.com.br/4gmdcs9_620648'
    }
  ];

  const handleProductClick = (product: any) => {
    if (product.videoId) {
      setSelectedProduct(product);
    } else {
      window.open(product.url, '_blank');
    }
  };

  return (
    <section id="start-here-section" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-[#0B0B0F] to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FFD166]/10 border border-[#FFD166]/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFD166]" />
            <span className="text-[#FFD166] font-bold text-sm sm:text-base">COMECE POR AQUI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Sua Jornada <span className="text-[#FFD166]">Começa Aqui</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Assista este vídeo essencial antes de explorar os módulos
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#FFD166]/20">
            <VideoPlayer videoId="iAR6FpnhY-o" />
          </div>
        </div>

        <div className="mb-6 sm:mb-8 text-center">
          <button
            onClick={() => setShowProducts(!showProducts)}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#FFD166] to-yellow-500 hover:from-yellow-500 hover:to-[#FFD166] text-black font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-[#FFD166]/30"
          >
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-sm sm:text-base md:text-lg">
              VER CONTEÚDOS PARA ACELERAÇÃO DE RESULTADOS
            </span>
            {showProducts ? (
              <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300" />
            ) : (
              <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-y-1" />
            )}
          </button>
        </div>

        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            showProducts ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center mb-2">
              Conteúdos para <span className="text-[#FFD166]">Aceleração de Resultados</span>
            </h3>
            <p className="text-gray-400 text-center text-sm sm:text-base">
              Produtos complementares recomendados para potencializar sua transformação
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="group relative bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:border-[#FFD166]/50 hover:shadow-2xl hover:shadow-[#FFD166]/20 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black/50">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />

                {product.badge && (
                  <div className="absolute top-3 right-3">
                    <div className="bg-[#FFD166] text-black text-xs font-bold px-2 py-1 rounded-full">
                      {product.badge}
                    </div>
                  </div>
                )}

                {product.videoId && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FFD166] rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 text-black ml-1" />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h4 className="text-white font-bold text-sm sm:text-base mb-2 line-clamp-2 group-hover:text-[#FFD166] transition-colors duration-300">
                  {product.title}
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-center gap-2 text-[#FFD166] text-xs sm:text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                  <span>{product.videoId ? 'Assistir apresentação' : product.ctaText}</span>
                  {!product.videoId && <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />}
                </div>
              </div>

              <div className="absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-[#FFD166]/50 transition-all duration-500 pointer-events-none" />
            </div>
          ))}
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 sm:p-6 max-w-3xl mx-auto">
              <div className="flex items-start gap-3">
                <span className="text-blue-400 text-xl sm:text-2xl">ℹ️</span>
                <div className="text-left">
                  <h4 className="text-blue-400 font-bold text-sm sm:text-base mb-2">Informação Importante</h4>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    Estes são <strong className="text-white">produtos complementares vendidos separadamente</strong> e não estão incluídos na sua assinatura atual.
                    Cada um foi cuidadosamente selecionado para acelerar seus resultados e potencializar sua transformação.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <Modal onClose={() => setSelectedProduct(null)}>
          <div className="p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              {selectedProduct.title}
            </h3>
            <p className="text-gray-300 mb-6 text-sm sm:text-base">
              {selectedProduct.description}
            </p>
            <div className="mb-6">
              <VideoPlayer videoId={selectedProduct.videoId} />
            </div>

            <div className="flex justify-center">
              <a
                href={selectedProduct.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FFD166] hover:bg-[#FFD166]/90 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
              >
                {selectedProduct.ctaText}
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default StartHereSection;
