import React from 'react';

const BonusSection: React.FC = () => {
  const bonuses = [
    {
      id: 'bonus1',
      title: 'Bônus 1: Detox da Escassez',
      image: 'https://i.postimg.cc/2jMLrx1n/image.png',
      url: 'https://bonus1.com'
    },
    {
      id: 'bonus2',
      title: 'Bônus 2: Códigos Secretos de Prosperidade',
      image: 'https://i.postimg.cc/SQMN7bKz/image.png',
      url: 'https://bonus2.com'
    },
    {
      id: 'bonus3',
      title: 'Bônus 3:Escritório Mental da Abundância',
      image: 'https://i.postimg.cc/MKwx7c4h/image.png',
      url: 'https://bonus3.com'
    }
  ];

  return (
    <section className="py-20 px-6 bg-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Bônus Exclusivos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bonuses.map((bonus) => (
            <a
              key={bonus.id}
              href={bonus.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group cursor-pointer transform transition-all duration-500 hover:scale-105"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-b from-transparent to-black/80">
                <img
                  src={bonus.image}
                  alt={bonus.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <h3 className="text-xl font-bold text-white">{bonus.title}</h3>
                  <p className="text-gray-300 text-sm mt-2">Clique para acessar</p>
                </div>
              </div>
              
              <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-[#FFD166]/50 transition-all duration-500" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BonusSection;