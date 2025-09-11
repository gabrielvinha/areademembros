import React, { useState } from 'react';
import Modal from './Modal';
import VideoPlayer from './VideoPlayer';

const MentorshipSection: React.FC = () => {
  const [selectedMentorship, setSelectedMentorship] = useState<string | null>(null);

  const mentorships = [
    {
      id: 'mentorship1',
      title: 'Ressurreição Pessoal: Mentoria 1 a 1',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
      videoId: 'dQw4w9WgXcQ',
      ctaText: 'Quero minha vaga',
      url: 'https://produto1.com'
    },
    {
      id: 'mentorship2',
      title: 'MENTORIA EM GRUPO',
      image: 'https://i.postimg.cc/TwRYJCt5/image.png',
      videoId: 'dQw4w9WgXcQ',
      ctaText: 'Liberar acompanhamento',
      url: 'https://produto2.com'
    },
    {
      id: 'mentorship3',
      title: 'Desafio 21 Dias de Manifestação',
      image: 'https://i.postimg.cc/gkwcswHs/image.png',
      videoId: 'dQw4w9WgXcQ',
      ctaText: 'Garantir minha vaga',
      url: 'https://produto3.com'
    }
  ];

  const handleMentorshipClick = (mentorshipId: string) => {
    setSelectedMentorship(mentorshipId);
  };

  const selectedMentorshipData = mentorships.find(m => m.id === selectedMentorship);

  return (
    <section className="py-20 px-6 bg-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Mentorias e Ofertas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mentorships.map((mentorship) => (
            <div
              key={mentorship.id}
              onClick={() => handleMentorshipClick(mentorship.id)}
              className="relative group cursor-pointer transform transition-all duration-500 hover:scale-105"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-b from-transparent to-black/80">
                <img
                  src={mentorship.image}
                  alt={mentorship.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <h3 className="text-xl font-bold text-white">{mentorship.title}</h3>
                  <p className="text-gray-300 text-sm mt-2">Clique para mais detalhes</p>
                </div>
              </div>
              
              <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-[#FFD166]/50 transition-all duration-500" />
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
            
            <div className="flex gap-4 mt-6">
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Falar no WhatsApp
              </a>
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