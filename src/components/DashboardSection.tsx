import React from 'react';
import { CheckCircle, Circle, TrendingUp, Award, Clock, Sparkles } from 'lucide-react';

interface DashboardSectionProps {
  userName: string;
  unlockedModules: Set<string>;
  prosperityUnlocked: boolean;
  fadUnlocked: boolean;
  daysRemaining: number;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({
  userName,
  unlockedModules,
  prosperityUnlocked,
  fadUnlocked,
  daysRemaining
}) => {
  const totalModules = 3;
  const unlockedCount = unlockedModules.size;
  const progressPercentage = (unlockedCount / totalModules) * 100;

  const checklist = [
    {
      id: 'module1',
      title: 'Assistir Módulo 1',
      completed: unlockedModules.has('module1'),
      icon: CheckCircle
    },
    {
      id: 'module2',
      title: 'Desbloquear Módulo 2',
      completed: unlockedModules.has('module2'),
      icon: unlockedModules.has('module2') ? CheckCircle : Clock,
      daysLeft: daysRemaining
    },
    {
      id: 'community',
      title: 'Entrar na Comunidade',
      completed: false,
      icon: Circle
    },
    {
      id: 'challenge',
      title: 'Participar do Desafio dos 21 Dias',
      completed: false,
      icon: Circle,
      highlight: true
    }
  ];

  const completedTasks = checklist.filter(item => item.completed).length;
  const totalTasks = checklist.length;

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 bg-gradient-to-br from-gray-900/50 to-black/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 sm:p-8 border-2 border-yellow-500/30">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    Olá, {userName}!
                  </h2>
                  <p className="text-gray-400 text-base sm:text-lg">
                    Veja seu progresso na jornada
                  </p>
                </div>
                <div className="bg-yellow-500/20 p-4 rounded-xl">
                  <Award className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500" />
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-semibold text-base sm:text-lg">
                    Progresso Geral
                  </span>
                  <span className="text-yellow-500 font-bold text-lg sm:text-xl">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  {unlockedCount} de {totalModules} módulos principais concluídos
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white mb-4">Seus Próximos Passos</h3>
                {checklist.map((item) => {
                  const Icon = item.icon;
                  const isCompleted = item.completed;

                  return (
                    <div
                      key={item.id}
                      className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ${
                        isCompleted
                          ? 'bg-green-500/10 border-2 border-green-500/50'
                          : item.highlight
                          ? 'bg-yellow-500/10 border-2 border-yellow-500 animate-pulse-glow'
                          : 'bg-white/5 border-2 border-white/10'
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0 ${
                          isCompleted
                            ? 'text-green-500'
                            : item.highlight
                            ? 'text-yellow-500'
                            : 'text-gray-400'
                        }`}
                      />
                      <div className="flex-1">
                        <p
                          className={`font-semibold text-base sm:text-lg ${
                            isCompleted ? 'text-green-400' : 'text-white'
                          }`}
                        >
                          {item.title}
                        </p>
                        {item.daysLeft !== undefined && item.daysLeft > 0 && !isCompleted && (
                          <p className="text-gray-400 text-sm">
                            Disponível em {item.daysLeft} {item.daysLeft === 1 ? 'dia' : 'dias'}
                          </p>
                        )}
                      </div>
                      {item.highlight && !isCompleted && (
                        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                          RECOMENDADO
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-2xl p-6 border-2 border-yellow-500/50">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-yellow-500" />
                <h3 className="text-xl font-bold text-white">Conquiste Mais</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold text-base">FAD</span>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full ${
                        fadUnlocked
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-600 text-gray-300'
                      }`}
                    >
                      {fadUnlocked ? 'ATIVO' : 'BLOQUEADO'}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Reprogramação durante o sono
                  </p>
                </div>

                <div className="bg-black/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold text-base">Prosperidade</span>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full ${
                        prosperityUnlocked
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-600 text-gray-300'
                      }`}
                    >
                      {prosperityUnlocked ? 'ATIVO' : 'BLOQUEADO'}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Energia e abundância
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-4 text-center">
                <TrendingUp className="w-8 h-8 text-black mx-auto mb-2" />
                <p className="text-black font-bold text-sm">
                  Complete sua jornada hoje!
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-6 border-2 border-blue-500/50">
              <h3 className="text-lg font-bold text-white mb-3">Dica do Dia</h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                A consistência é a chave. Dedique pelo menos 15 minutos por dia aos exercícios da Frequência da Alma para resultados mais rápidos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
