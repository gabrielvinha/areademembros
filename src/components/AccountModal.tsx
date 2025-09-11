import React, { useState, useEffect } from 'react';
import { User, Lock, Camera, Save, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AccountModalProps {
  user: any;
  onClose: () => void;
  onProfileUpdate: (updatedUser: any) => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ user, onClose, onProfileUpdate }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(user.user_metadata?.avatar || 'avatar1');
  const [name, setName] = useState(user.user_metadata?.name || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const avatarOptions = [
    { id: 'avatar1', url: 'https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { id: 'avatar2', url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { id: 'avatar3', url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { id: 'avatar4', url: 'https://images.pexels.com/photos/3820333/pexels-photo-3820333.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { id: 'avatar5', url: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { id: 'avatar6', url: 'https://images.pexels.com/photos/3747463/pexels-photo-3747463.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { id: 'avatar7', url: 'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { id: 'avatar8', url: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { id: 'avatar9', url: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { id: 'avatar10', url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' }
  ];

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      showMessage('As senhas não coincidem', 'error');
      return;
    }

    if (newPassword.length < 6) {
      showMessage('A nova senha deve ter pelo menos 6 caracteres', 'error');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      showMessage('Erro ao alterar senha: ' + error.message, 'error');
    } else {
      showMessage('Senha alterada com sucesso!', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }

    setLoading(false);
  };

  const handleProfileUpdate = async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.updateUser({
      data: {
        name,
        avatar: selectedAvatar
      }
    });

    if (error) {
      showMessage('Erro ao atualizar perfil: ' + error.message, 'error');
    } else {
      showMessage('Perfil atualizado com sucesso!', 'success');
      onProfileUpdate(data.user);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-black/90 backdrop-blur-lg rounded-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <User className="w-6 h-6 mr-2" />
            Minha Conta
          </h2>

          {message && (
            <div className={`mb-4 p-3 rounded-lg ${
              messageType === 'success' 
                ? 'bg-green-500/20 border border-green-500/50 text-green-400' 
                : 'bg-red-500/20 border border-red-500/50 text-red-400'
            }`}>
              {message}
            </div>
          )}

          {/* Informações Básicas */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Informações Pessoais</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nome</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD166]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Foto de Perfil */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Camera className="w-5 h-5 mr-2" />
              Foto de Perfil
            </h3>
            <div className="grid grid-cols-5 gap-3">
              {avatarOptions.map((avatar) => (
                <button
                  key={avatar.id}
                  onClick={() => setSelectedAvatar(avatar.id)}
                  className={`relative w-16 h-16 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                    selectedAvatar === avatar.id 
                      ? 'border-[#FFD166] ring-2 ring-[#FFD166]/50' 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <img
                    src={avatar.url}
                    alt={`Avatar ${avatar.id}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Alterar Senha */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Lock className="w-5 h-5 mr-2" />
              Alterar Senha
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nova Senha</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD166]"
                  placeholder="Digite a nova senha"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirmar Nova Senha</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD166]"
                  placeholder="Confirme a nova senha"
                />
              </div>
              <button
                onClick={handlePasswordChange}
                disabled={loading || !newPassword || !confirmPassword}
                className="bg-[#FFD166] hover:bg-[#FFD166]/90 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold px-6 py-2 rounded-lg transition-all duration-300"
              >
                {loading ? 'Alterando...' : 'Alterar Senha'}
              </button>
            </div>
          </div>

          {/* Botão Salvar Perfil */}
          <div className="flex justify-end">
            <button
              onClick={handleProfileUpdate}
              disabled={loading}
              className="bg-[#FFD166] hover:bg-[#FFD166]/90 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Salvando...' : 'Salvar Perfil'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;