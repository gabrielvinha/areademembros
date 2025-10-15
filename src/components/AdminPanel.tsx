import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { X, Plus, Trash2, Calendar, Mail } from 'lucide-react';

interface WhitelistEntry {
  id: string;
  email: string;
  modules: string[];
  notes: string | null;
  expires_at: string | null;
  created_at: string;
}

interface AdminPanelProps {
  onClose: () => void;
  userId: string;
}

const AVAILABLE_MODULES = [
  { id: 'module2', name: 'Módulo 2' },
  { id: 'module3', name: 'Módulo 3' },
  { id: 'prosperity', name: 'Prosperidade' },
  { id: 'fad', name: 'FAD' },
];

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, userId }) => {
  const [entries, setEntries] = useState<WhitelistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadWhitelistEntries();
  }, []);

  const loadWhitelistEntries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('whitelist_access')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading whitelist entries:', error);
      setError('Erro ao carregar entradas da whitelist');
    } else {
      setEntries(data || []);
    }
    setLoading(false);
  };

  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || selectedModules.length === 0) {
      setError('Email e pelo menos um módulo são obrigatórios');
      return;
    }

    const { error: insertError } = await supabase
      .from('whitelist_access')
      .insert({
        email: email.toLowerCase().trim(),
        modules: selectedModules,
        notes: notes || null,
        expires_at: expiresAt || null,
        created_by: userId,
      });

    if (insertError) {
      if (insertError.message.includes('duplicate')) {
        setError('Este email já está na whitelist');
      } else {
        setError('Erro ao adicionar entrada: ' + insertError.message);
      }
    } else {
      setSuccess('Email adicionado com sucesso!');
      setEmail('');
      setSelectedModules([]);
      setNotes('');
      setExpiresAt('');
      loadWhitelistEntries();
    }
  };

  const handleDeleteEntry = async (id: string) => {
    if (!confirm('Tem certeza que deseja remover esta entrada?')) return;

    const { error: deleteError } = await supabase
      .from('whitelist_access')
      .delete()
      .eq('id', id);

    if (deleteError) {
      setError('Erro ao remover entrada');
    } else {
      setSuccess('Entrada removida com sucesso');
      loadWhitelistEntries();
    }
  };

  const toggleModule = (moduleId: string) => {
    setSelectedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a2e] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-white/10">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">Painel Administrativo</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="bg-[#0B0B0F] rounded-xl p-6 mb-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#FFD166]" />
              Adicionar Email à Whitelist
            </h3>

            <form onSubmit={handleAddEntry} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@exemplo.com"
                    className="w-full bg-white/10 border border-white/20 rounded-lg pl-11 pr-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD166] focus:ring-1 focus:ring-[#FFD166]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Módulos para Liberar *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {AVAILABLE_MODULES.map(module => (
                    <button
                      key={module.id}
                      type="button"
                      onClick={() => toggleModule(module.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedModules.includes(module.id)
                          ? 'bg-[#FFD166]/20 border-[#FFD166] text-white'
                          : 'bg-white/5 border-white/20 text-gray-400 hover:border-white/40'
                      }`}
                    >
                      {module.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Data de Expiração (Opcional)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="datetime-local"
                    value={expiresAt}
                    onChange={(e) => setExpiresAt(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg pl-11 pr-4 py-2.5 text-white focus:outline-none focus:border-[#FFD166] focus:ring-1 focus:ring-[#FFD166]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Notas (Opcional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Acesso de cortesia para parceiro"
                  rows={3}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD166] focus:ring-1 focus:ring-[#FFD166] resize-none"
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-green-400 text-sm">
                  {success}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#FFD166] hover:bg-[#FFD166]/90 text-black font-semibold py-3 rounded-lg transition-all"
              >
                Adicionar Email
              </button>
            </form>
          </div>

          <div className="bg-[#0B0B0F] rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">
              Emails na Whitelist
            </h3>

            {loading ? (
              <div className="text-center py-8 text-gray-400">Carregando...</div>
            ) : entries.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                Nenhum email cadastrado ainda
              </div>
            ) : (
              <div className="space-y-3">
                {entries.map(entry => (
                  <div
                    key={entry.id}
                    className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Mail className="w-4 h-4 text-[#FFD166]" />
                          <span className="text-white font-medium">{entry.email}</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-2">
                          {entry.modules.map(moduleId => {
                            const module = AVAILABLE_MODULES.find(m => m.id === moduleId);
                            return (
                              <span
                                key={moduleId}
                                className="px-2 py-1 bg-[#FFD166]/20 text-[#FFD166] text-xs rounded-md border border-[#FFD166]/30"
                              >
                                {module?.name || moduleId}
                              </span>
                            );
                          })}
                        </div>

                        {entry.notes && (
                          <p className="text-sm text-gray-400 mb-2">{entry.notes}</p>
                        )}

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>
                            Criado em: {new Date(entry.created_at).toLocaleDateString('pt-BR')}
                          </span>
                          {entry.expires_at && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Expira: {new Date(entry.expires_at).toLocaleDateString('pt-BR')}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group"
                      >
                        <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
