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
      id: 'module1',
      title: 'Módulo 1 - O CÓDIGO OCULTO DO CORAÇÃO',
      image: 'https://i.postimg.cc/26YC8V4d/image.png',
      isLocked: false,
    },
    {
      id: 'module2',
      title: 'Módulo 2 - QUEBRA DO CICLO DA ESCASSEZ',
      image: 'https://i.postimg.cc/qqjJF46s/image.png',
      isLocked: !unlockedModules.has('module2'),
      password: '2025',
      checkoutUrl: 'https://checkoutmodulo2.com',
    },
    {
      id: 'module3',
      title: 'Módulo 3 - MANIFESTAÇÃO SOB DEMANDA',
      image: 'https://i.postimg.cc/qBZW1Nzm/image.png',
      isLocked: !unlockedModules.has('module3'),
      comingSoon: true,
      password: '2026',
      checkoutUrl: 'https://checkoutmodulo3.com',
    },
  ];

  const lessonsByModule: { [key: string]: any[] } = {
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
        image: 'https://images.pexels.com/photos/1708988/pexels-photo-1708988.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        videoId: 'fdOUhBw0W_E'
      },
      {
        id: 'module2_lesson3',
        title: 'Aula 3',
        image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        videoId: 'M9OnhqaV28Y'
      },
      {
        id: 'module2_lesson4',
        title: 'Aula 4',
        image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        videoId: 'RieZ2Hmfpl4'
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
            
            <div className="flex gap-4 mt-6">
              <a
                href="https://wa.me/554896931732"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Falar no WhatsApp
              </a>
              <a
                href="https://andressacamposultimachance.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FFD166] hover:bg-[#FFD166]/90 text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Liberar meu próximo nível
              </a>
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
              {showUnlockModal === 'module2' ? 'Desbloqueie sua próxima fase' : 'Liberar acesso ao Módulo 3'}
            </h3>
            
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
          </div>
        </Modal>
      )}
    </section>
  );
};

export default ModulesSection;