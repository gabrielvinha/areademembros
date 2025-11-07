import React from 'react';
import { ExternalLink, AlertCircle } from 'lucide-react';

interface Product {
  title: string;
  image: string;
  link: string;
  description: string;
}

const RecommendedSection: React.FC = () => {
  const products: Product[] = [
    {
      title: 'LIBERTE-SE DA ANSIEDADE EM MINUTOS',
      image: 'https://i.ibb.co/HDGcXqWG/libertesse-da-ansiedade-logo.png',
      link: 'https://pay.cakto.com.br/3cygfwq',
      description: '[ ACESSO IMEDIATO ] Descubra 3 técnicas exclusivas de autorregulação que vão transformar ansiedade e pressão em clareza, calma e foco.'
    },
    {
      title: 'AFIRMAÇÕES QUE ATRAEM',
      image: 'https://i.ibb.co/Vc9y3Ln9/Chat-GPT-Image-4-de-out-de-2025-17-27-10.png',
      link: 'https://pay.cakto.com.br/srm22uf',
      description: '[ ACESSO IMEDIATO ] O mesmo protocolo que ajudou mulheres comuns a desbloquear crenças de escassez e atrair prosperidade para suas vidas.'
    },
    {
      title: 'Atualizações Semanais',
      image: 'https://i.ibb.co/rq6R2QC/att-mensail.png',
      link: 'https://pay.cakto.com.br/4gmdcs9_620648',
      description: 'Tenha acesso antecipado a tudo o que ainda será revelado — conteúdos ocultos, segredos recém-descobertos e métodos que só os membros atualizados recebem.'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#d4250b]/5 to-black" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Indicados pra <span className="text-[#d4250b]">Você</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#d4250b] to-red-500 mx-auto rounded-full mb-6" />
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Produtos exclusivos selecionados especialmente para membros
          </p>
        </div>

        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-2xl p-6 mb-12 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
            <div className="text-amber-100">
              <p className="font-semibold text-lg mb-2">AVISO IMPORTANTE</p>
              <p className="text-sm leading-relaxed">
                O acesso será enviado por email. Aqui você apenas tem acesso a promoções para membros.
                Assim que finalizar a compra, seu acesso será enviado pelo email! Caso já adquiriu mas
                não chegou, fique tranquilo, fale com nosso suporte no WhatsApp e mandaremos pra você manualmente!
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="group bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:border-[#d4250b]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#d4250b]/20 hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 right-4">
                  <div className="bg-[#d4250b] text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                    -80% OFF
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#d4250b] transition-colors duration-300">
                  {product.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {product.description}
                </p>

                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#d4250b] to-red-600 hover:from-red-600 hover:to-[#d4250b] text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#d4250b]/50 group/btn"
                >
                  <span>Adquirir com -80% de Desconto</span>
                  <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedSection;
