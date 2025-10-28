import React, { useState } from 'react';
import { Play } from 'lucide-react';
import Modal from './Modal';
import VideoPlayer from './VideoPlayer';

const MentorshipSection: React.FC = () => {
  const [selectedMentorship, setSelectedMentorship] = useState<string | null>(null);

  const mentorships = [
    {
      id: 'mentorship1',
      title: ' ',
      image: 'https://i.ibb.co/S4YkLwbg/Capas-Area-Franklin-2-Prancheta-1-Prancheta-1-copiar-3.png',
      videoId: 'Gr7jAM_z-B0',
      ctaText: 'Quero minha vaga',
      url: 'https://www.ggcheckout.com/checkout/v2/AK8lDX8FfyhKJp3G1uWP'
    },
    {
      id: 'mentorship2',
      title: ' ',
      image: 'https://i.ibb.co/Y4WzqFM8/Capas-Area-Franklin-2-Prancheta-1-Prancheta-1-copiar-4.png',
      videoId: 's5mi5QHcUxo',
      ctaText: 'Liberar acompanhamento',
      url: 'https://www.ggcheckout.com/checkout/v2/b8csr8IKmkiHMflHEL0D'
    },
    {
      id: 'mentorship3',
      title: ' ',
      image: 'https://i.ibb.co/JF7Sg295/Capas-Area-Franklin-2-Prancheta-1-Prancheta-1-copiar-5.png',
      videoId: '_EziY6n19R8',
      ctaText: 'Garantir minha vaga',
      url: 'https://pay.cakto.com.br/3a5hp6s/?utm_source=areademembros'
    }
  ];

  const handleMentorshipClick = (mentorshipId: string) => {
    setSelectedMentorship(mentorshipId);
  };

  const selectedMentorshipData = mentorships.find(m => m.id === selectedMentorship);

  return (
    <section id="mentorship-section" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 sm:mb-12 text-center">Mentorias e Ofertas</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {mentorships.map((mentorship) => (
            <div
              key={mentorship.id}
              data-mentorship={mentorship.id}
              onClick={() => handleMentorshipClick(mentorship.id)}
              className="relative group cursor-pointer transform transition-all duration-500 hover:scale-105"
            >
              <div className="aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-b from-transparent to-black/80">
                <img
                  src={mentorship.image}
                  alt={mentorship.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />

                {/* Play button overlay */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#FFD166] rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 text-black ml-1" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <h3 className="text-sm sm:text-base md:text-xl font-bold text-white leading-tight">{mentorship.title}</h3>
                  <p className="text-gray-300 text-xs sm:text-sm mt-1 sm:mt-2">Clique para assistir</p>
                </div>
              </div>

              <div className="absolute inset-0 rounded-xl sm:rounded-2xl ring-2 ring-transparent group-hover:ring-[#FFD166]/50 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Mentoria */}
      {selectedMentorship && selectedMentorshipData && (
        <Modal onClose={() => setSelectedMentorship(null)}>
          <div className="p-6">
            <h3 className="text-2xl font-bold text-white mb-4">
              {selectedMentorshipData.title}
            </h3>
            <VideoPlayer videoId={selectedMentorshipData.videoId} />
            
            <div className="flex justify-center mt-6">
              <a
                href={selectedMentorshipData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FFD166] hover:bg-[#FFD166]/90 text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                {selectedMentorshipData.ctaText}
              </a>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default MentorshipSection;