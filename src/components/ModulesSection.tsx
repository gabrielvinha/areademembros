import React, { useState } from 'react';
import ModuleCard from './ModuleCard';
import Modal from './Modal';
import VideoPlayer from './VideoPlayer';
import { Lock } from 'lucide-react';

interface ModulesSectionProps {
  unlockedModules: Set<string>;
  onUnlock: (moduleId: string) => void;
}

  const ModulesSection: React.FC<ModulesSectionProps> = ({ unlockedModules, onUnlock }) => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [showUnlockModal, setShowUnlockModal] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const modules = [
    {
      id: 'module0',
      title: 'Módulo 0 - Os 5 Estágios do Coração',
      image: 'https://i.ibb.co/yn3PWK6D/modulo2.jpg',
      isLocked: false,
    },
    {
      id: 'module1',
      title: 'Módulo 1 - O CÓDIGO OCULTO DO CORAÇÃO',
      image: 'https://i.postimg.cc/26YC8V4d/image.png',
      isLocked: false,
    },
    {
      id: 'module2',
      title: 'Módulo 2 - QUEBRA DO CICLO DA ESCASSEZ',
      image: 'https://i.postimg.cc/qqjJF46s/image.png',
      isLocked: false,
    },
    {
      id: 'module3',
      title: 'Módulo 3 - O Poder Oculto do Silêncio Estratégico',
      image: 'https://i.ibb.co/VW8TBDw8/modulo-3-1.png',
      isLocked: false,
    },
    {
      id: 'module4',
      title: 'Módulo 4 - O Bloqueio Invisível: quando o coração se desconecta da fonte',
      image: 'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=800&auto=format&fit=crop',
      isLocked: false,
    },
  ];

  const lessonsByModule: { [key: string]: any[] } = {
    module0: [
      {
        id: 'module0_lesson1',
        title: 'Aula 1: Segredo Compartilhado',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop',
        videoId: '6tgAhZ2hWVo'
      },
      {
        id: 'module0_lesson2',
        title: 'Aula 2: O poder da radiância do coração',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop',
        videoId: 'BzN-IRAR6gU'
      },
      {
        id: 'module0_lesson3',
        title: 'Aula 3: As 5 realidades do Coração',
        image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&auto=format&fit=crop',
        videoId: 'petOVoXief8'
      },
      {
        id: 'module0_lesson4',
        title: 'Aula 4: O coração na Escuridão: a incoerência',
        image: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76d7?w=800&auto=format&fit=crop',
        videoId: 'SlmYM9qgJEo'
      },
      {
        id: 'module0_lesson5',
        title: 'Aula 5: Coerência Cardíaca',
        image: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=800&auto=format&fit=crop',
        videoId: 'SEvsTMLV3oo'
      },
      {
        id: 'module0_lesson6',
        title: 'Aula 6: Campos Eletromagnético do Coração',
        image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&auto=format&fit=crop',
        videoId: 'SmIzrUy9lNE'
      }
    ],
    module1: [
      {
        id: 'lesson1',
        title: 'Aula 1: Onde começa a frequência da Alma',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhgQz6fhmkDGyGVMgV-6HlLL3IgjVtLfEWg&s', 
        videoId: 'Pix9tqIw0_k'
      },
      {
        id: 'lesson2',
        title: 'Aula 2: Como o corpo fala antes da mente',
        image: 'https://wp-content.lamenteemeravigliosa.it/2023/07/mente-e-corpo-in-relazione-secondo-la-filosofia-1200x808-1.jpg',
        videoId: 'Eq52OT_ocmY'
      },
      {
        id: 'lesson3',
        title: 'Aula 3: O Coração como Criador da Realidade',
        image: 'https://i.redd.it/abcp6k9aayoc1.jpeg',
        videoId: 'oi1Fk70QCgA'
      },
      {
        id: 'lesson4',
        title: 'Aula 4: A Revelação do Código Oculto do Coração',
        image: 'https://png.pngtree.com/thumb_back/fw800/background/20220203/pngtree-love-heart-embedded-in-black-and-white-binary-computer-code-background-photo-image_15829942.jpg',
        videoId: '8OiJKAoMjJI'
      }
    ],
    module2: [
      {
        id: 'module2_lesson1',
        title: 'Aula 1',
        image: 'https://shawblindfabrics.com/images/ProductImages/500/1MAL300SHA.jpg',
        videoId: 'ucN_Shno-So'
      },
      {
        id: 'module2_lesson2',
        title: 'Aula 2',
        image: 'https://shawblindfabrics.com/images/ProductImages/500/1MAL300SHA.jpg',
        videoId: 'fdOUhBw0W_E'
      },
      {
        id: 'module2_lesson3',
        title: 'Aula 3',
        image: 'https://shawblindfabrics.com/images/ProductImages/500/1MAL300SHA.jpg',
        videoId: 'M9OnhqaV28Y'
      },
      {
        id: 'module2_lesson4',
        title: 'Aula 4',
        image: 'https://shawblindfabrics.com/images/ProductImages/500/1MAL300SHA.jpg',
        videoId: 'RieZ2Hmfpl4'
      }
    ],
    module3: [
      {
        id: 'module3_lesson1',
        title: 'Aula 1',
        image: 'https://i.ibb.co/kggTQNVM/img-a4.png',
        videoId: '_kht_vnZ8fc'
      },
      {
        id: 'module3_lesson2',
        title: 'Aula 2',
        image: 'https://i.ibb.co/BKcphZ53/img-a1.png',
        videoId: 'HjS6XucXNBE'
      },
      {
        id: 'module3_lesson3',
        title: 'Aula 3',
        image: 'https://i.ibb.co/vx1S9Pmc/img-a2.png',
        videoId: 'biX3-2tsnXc'
      },
      {
        id: 'module3_lesson4',
        title: 'Aula 4',
        image: 'https://i.ibb.co/C30NhPPn/img-a3.png',
        videoId: 'JOiPQltaSm4'
      }
    ],
    module4: [
      {
        id: 'module4_lesson1',
        title: 'Aula 1 - Quando o coração se desconecta',
        image: 'https://images.unsplash.com/photo-1502139214982-d0ad755818d8?w=800&auto=format&fit=crop',
        videoId: 'GeN7afER2go'
      },
      {
        id: 'module4_lesson2',
        title: 'Aula 2 - Reconectando com a fonte',
        image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop',
        videoId: 'k1Yx3cPBgsg'
      },
      {
        id: 'module4_lesson3',
        title: 'Aula 3 - A energia do bloqueio invisível',
        image: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=800&auto=format&fit=crop',
        videoId: 'gL1t-CbdEK4'
      },
      {
        id: 'module4_lesson4',
        title: 'Aula 4 - Desbloqueando o fluxo',
        image: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=800&auto=format&fit=crop',
        videoId: '8c5PnkzSbAM'
      },
      {
        id: 'module4_lesson5',
        title: 'Aula 5 - Restaurando a conexão divina',
        image: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=800&auto=format&fit=crop',
        videoId: 'CuXO6ty5D_s'
      }
    ]
  };

  const handleModuleClick = (module: any) => {
    if (module.comingSoon) {
      return;
    }
    if (module.isLocked) {
      setShowUnlockModal(module.id);
    } else {
      setSelectedModule(module.id);
    }
  };

  const handlePasswordSubmit = () => {
    const module = modules.find(m => m.id === showUnlockModal);
    if (module && password === module.password) {
      onUnlock(module.id);
      setShowUnlockModal(null);
      setPassword('');
      setPasswordError('');
      setSelectedModule(module.id);
    } else {
      setPasswordError('Código inválido');
    }
  };

  const handleCheckout = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <section id="modules-section" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 sm:mb-12 text-center">Módulos</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              title={module.title}
              image={module.image}
              isLocked={module.isLocked}
              comingSoon={module.comingSoon}
              onClick={() => handleModuleClick(module)}
            /> 
          ))}
        </div>
      </div>

      {/* Modal de Aulas */}
      {selectedModule && (
        <Modal onClose={() => setSelectedModule(null)}>
          <div className="p-6">
            <h3 className="text-2xl font-bold text-white mb-6">
              {modules.find(m => m.id === selectedModule)?.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(lessonsByModule[selectedModule] || []).map((lesson) => (
                <div
                  key={lesson.id}
                  className="bg-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  onClick={() => setSelectedLesson(lesson.id)}
                >
                  <img
                    src={lesson.image}
                    alt={lesson.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h4 className="text-white font-semibold">{lesson.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {/* Modal de Vídeo */}
      {selectedLesson && selectedModule && (
        <Modal onClose={() => setSelectedLesson(null)}>
          <div className="p-8">
            <h3 className="text-xl font-bold text-white mb-4">
              {lessonsByModule[selectedModule]?.find(l => l.id === selectedLesson)?.title}
            </h3>
            <div className="mb-6">
              <VideoPlayer videoId={lessonsByModule[selectedModule]?.find(l => l.id === selectedLesson)?.videoId || ''} />
            </div>
             
          </div> 
        </Modal>
      )}

      {/* Modal de Desbloqueio */}
      {showUnlockModal && (
        <Modal onClose={() => setShowUnlockModal(null)}>
          <div className="p-6 text-center">
            <Lock className="w-16 h-16 text-[#FFD166] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              {showUnlockModal === 'module2' ? 'Desbloqueie sua próxima fase' :
               showUnlockModal === 'module3' ? 'Liberar acesso ao Módulo 3' :
               'Liberar acesso ao Módulo 4'}
            </h3>

            {showUnlockModal === 'module4' ? (
              <div className="space-y-4">
                <p className="text-gray-300 mb-4">
                  Este módulo será desbloqueado automaticamente em {daysRemainingModule4} {daysRemainingModule4 === 1 ? 'dia' : 'dias'}.
                </p>
                <p className="text-sm text-gray-400">
                  Continue explorando os outros conteúdos enquanto aguarda!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  disabled
                  className="w-full bg-gray-600 cursor-not-allowed text-gray-400 font-bold py-3 rounded-lg opacity-50"
                >
                  {showUnlockModal === 'module2' ? 'Liberar acesso ao Módulo 2' : 'Desbloquear agora'}
                </button>

                <div className="border-t border-white/20 pt-4">
                  <p className="text-gray-400 mb-3">Já adquiriu? Digite o código recebido por e-mail:</p>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD166]"
                    placeholder="Digite o código"
                  />
                  {passwordError && (
                    <p className="text-red-400 text-sm mt-2">{passwordError}</p>
                  )}
                  <button
                    onClick={handlePasswordSubmit}
                    className="w-full mt-3 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg transition-all duration-300"
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </section>
  );
};

export default ModulesSection;