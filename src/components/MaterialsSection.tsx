import React from 'react';
import { FileText, Download, BookOpen } from 'lucide-react';

const MaterialsSection: React.FC = () => {
  const materials = [
    {
      id: 'material1',
      title: 'Mapa da Prosperidade Silenciosa',
      image: 'https://i.postimg.cc/sgqVb3wz/image.png',
      url: 'https://material1.com',
      icon: BookOpen
    },
    {
      id: 'material2',
      title: 'Manual da Reprogramação Instantânea',
      image: 'https://i.postimg.cc/JzfLPPz4/image.png',
      url: 'https://material2.com',
      icon: FileText
    },
    {
      id: 'material3',
      title: 'Código da Frequência Inquebrável',
      image: 'https://i.postimg.cc/QCdGHz0S/image.png',
      url: 'https://material3.com',
      icon: Download
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Materiais de Apoio</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {materials.map((material) => {
            const IconComponent = material.icon;
            
            return (
              <a
                key={material.id}
                href={material.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group cursor-pointer transform transition-all duration-500 hover:scale-105"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-b from-transparent to-black/80">
                  <img
                    src={material.image}
                    alt={material.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  
                  <div className="absolute top-6 right-6">
                    <div className="w-12 h-12 bg-[#FFD166] rounded-full flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-black" />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <h3 className="text-xl font-bold text-white">{material.title}</h3>
                    <p className="text-gray-300 text-sm mt-2">Clique para baixar</p>
                  </div>
                </div>
                
                <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-[#FFD166]/50 transition-all duration-500" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MaterialsSection;