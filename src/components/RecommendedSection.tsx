import React from 'react';
import { Star, ArrowRight, Users, TrendingUp } from 'lucide-react';

interface RecommendedSectionProps {
  userName?: string;
}

const RecommendedSection: React.FC<RecommendedSectionProps> = ({ userName }) => {
  const handleClick = () => {
    window.open('https://pay.cakto.com.br/3a5hp6s/?utm_source=areademembros', '_blank');
  };

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 bg-gradient-to-br from-yellow-900/20 via-orange-900/20 to-red-900/20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border-2 border-yellow-500 rounded-full px-4 py-2 mb-4">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <span className="text-yellow-500 font-bold text-sm sm:text-base">RECOMENDADO PARA VOCÊ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            {userName ? `${userName}, esta é a próxima etapa da sua jornada` : 'O Próximo Passo da Sua Transformação'}
          </h2>
          <p className="text-base sm:text-lg text-gray-300">
            Membros que fizeram este desafio tiveram resultados extraordinários
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-900/90 to-black/90 rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-yellow-500/50 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 sm:p-8 md:p-10">
            <div className="space-y-6">
              <div className="relative">
                <img
                  src="https://i.ibb.co/JF7Sg295/Capas-Area-Franklin-2-Prancheta-1-Prancheta-1-copiar-5.png"
                  alt="Desafio dos 21 Dias"
                  className="w-full h-auto rounded-xl shadow-2xl"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm animate-pulse">
                  POPULAR
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg">
                <Users className="w-8 h-8 text-yellow-500 flex-shrink-0" />
                <div>
                  <p className="text-white font-bold text-lg">+ de 500 membros</p>
                  <p className="text-gray-400 text-sm">já transformaram suas vidas</p>
                </div>
              </div>
            </div>

            <div className="space-y-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-4">
                  Desafio dos 21 Dias de Manifestação
                </h3>

                <p className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed">
                  Um programa intensivo e prático que vai te guiar dia após dia na reprogramação da sua mente para atrair prosperidade, abundância e realizações.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">✓</span>
                    </div>
                    <p className="text-white text-base sm:text-lg">21 dias de exercícios práticos diários</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">✓</span>
                    </div>
                    <p className="text-white text-base sm:text-lg">Acompanhamento personalizado</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">✓</span>
                    </div>
                    <p className="text-white text-base sm:text-lg">Grupo exclusivo de apoio</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">✓</span>
                    </div>
                    <p className="text-white text-base sm:text-lg">Resultados visíveis em 3 semanas</p>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border-2 border-yellow-500/50 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                    <div>
                      <p className="text-yellow-500 font-bold text-sm mb-1">POR QUE FUNCIONA?</p>
                      <p className="text-gray-300 text-sm sm:text-base">
                        A ciência comprova: 21 dias é o tempo necessário para criar um novo hábito mental. Este desafio foi desenvolvido especialmente para pessoas como você que querem resultados reais.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleClick}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-lg sm:text-xl px-8 py-4 sm:py-5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3 btn-large-friendly"
              >
                COMEÇAR MINHA TRANSFORMAÇÃO AGORA
                <ArrowRight className="w-6 h-6" />
              </button>

              <p className="text-center text-gray-400 text-sm">
                Garantia de 7 dias - Se não gostar, devolvemos seu dinheiro
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendedSection;
