import React, { useState, useEffect } from 'react';
import { User, Lock, Camera, Save, X, Upload } from 'lucide-react';
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
  const [name, setName] = useState(user.user_metadata?.name || '');
  const [avatarUrl, setAvatarUrl] = useState(user.user_metadata?.avatar_url || '');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  };

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Você deve selecionar uma imagem para upload.');
      }

      const file = event.target.files[0];
      
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        throw new Error('Por favor, selecione apenas arquivos de imagem.');
      }

      // Validar tamanho do arquivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('A imagem deve ter no máximo 5MB.');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // Upload do arquivo
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Obter URL pública
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(data.publicUrl);
      showMessage('Imagem carregada com sucesso!', 'success');

    } catch (error: any) {
      showMessage('Erro ao fazer upload: ' + error.message, 'error');
    } finally {
      setUploading(false);
    }
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
        avatar_url: avatarUrl
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

  const removeAvatar = async () => {
    try {
      setUploading(true);
      
      // Se há uma imagem atual, tentar removê-la do storage
      if (avatarUrl && avatarUrl.includes('avatars/')) {
        const fileName = avatarUrl.split('/').pop();
        if (fileName) {
          await supabase.storage
            .from('avatars')
            .remove([`avatars/${fileName}`]);
        }
      }

      setAvatarUrl('');
      showMessage('Foto removida com sucesso!', 'success');
    } catch (error: any) {
      showMessage('Erro ao remover foto: ' + error.message, 'error');
    } finally {
      setUploading(false);
    }
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

          {/* Upload de Foto de Perfil */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Camera className="w-5 h-5 mr-2" />
              Foto de Perfil
            </h3>
            
            <div className="flex flex-col items-center space-y-4">
              {/* Preview da imagem atual */}
              <div className="relative">
                {avatarUrl ? (
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/20">
                    <img
                      src={avatarUrl}
                      alt="Avatar atual"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={removeAvatar}
                      disabled={uploading}
                      className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 rounded-full text-white transition-all duration-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-white/10 border-4 border-white/20 flex items-center justify-center">
                    <User className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Input de upload */}
              <div className="flex flex-col items-center space-y-2">
                <label className="cursor-pointer bg-[#FFD166] hover:bg-[#FFD166]/90 text-black font-semibold px-6 py-2 rounded-lg transition-all duration-300 flex items-center">
                  <Upload className="w-4 h-4 mr-2" />
                  {uploading ? 'Carregando...' : 'Escolher Foto'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={uploadAvatar}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
                <p className="text-gray-400 text-xs text-center">
                  Formatos aceitos: JPG, PNG, GIF<br />
                  Tamanho máximo: 5MB
                </p>
              </div>
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
              disabled={loading || uploading}
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