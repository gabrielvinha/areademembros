import React, { useState, useEffect } from 'react';
import { User, Lock, Camera, Save, X, Upload } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AccountModalProps {
  user: any;
  onClose: () => void;
  onProfileUpdate: (updatedUser: any) => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ user, onClose, onProfileUpdate }) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
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
    if (!currentPassword || !newPassword || !confirmPassword) {
      showMessage('Preencha todos os campos de senha', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showMessage('As senhas não coincidem', 'error');
      return;
    }

    if (newPassword.length < 6) {
      showMessage('A nova senha deve ter pelo menos 6 caracteres', 'error');
      return;
    }

    setLoading(true);

    // Primeiro, verificar se a senha atual está correta
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword
    });

    if (signInError) {
      showMessage('Senha atual incorreta', 'error');
      setLoading(false);
      return;
    }

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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={handleBackdropClick}>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="min-h-screen flex items-center justify-center p-3 sm:p-4">
        <div className="relative bg-black/90 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/20 max-w-sm sm:max-w-lg md:max-w-2xl w-full my-8 mx-3 sm:mx-4 max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="sticky top-3 right-3 sm:top-4 sm:right-4 float-right z-10 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 touch-manipulation active:scale-95"
          >
            <X className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </button>
          <div className="clear-both">

        <div className="p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
            <User className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            Minha Conta
          </h2>

          {message && (
            <div className={`mb-3 sm:mb-4 p-2 sm:p-3 rounded-lg text-sm ${
              messageType === 'success' 
                ? 'bg-green-500/20 border border-green-500/50 text-green-400' 
                : 'bg-red-500/20 border border-red-500/50 text-red-400'
            }`}>
              {message}
            </div>
          )}

          {/* Informações Básicas */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Informações Pessoais</h3>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Nome</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD166]"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Email</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Upload de Foto de Perfil */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center">
              <Camera className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Foto de Perfil
            </h3>
            
            <div className="flex flex-col items-center space-y-3 sm:space-y-4">
              {/* Preview da imagem atual */}
              <div className="relative">
                {avatarUrl ? (
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 sm:border-4 border-white/20">
                    <img
                      src={avatarUrl}
                      alt="Avatar atual"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={removeAvatar}
                      disabled={uploading}
                      className="absolute top-1 right-1 sm:top-2 sm:right-2 p-0.5 sm:p-1 bg-red-500 hover:bg-red-600 rounded-full text-white transition-all duration-300"
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white/10 border-2 sm:border-4 border-white/20 flex items-center justify-center">
                    <User className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Input de upload */}
              <div className="flex flex-col items-center space-y-1 sm:space-y-2">
                <label className="cursor-pointer bg-[#FFD166] hover:bg-[#FFD166]/90 text-black font-semibold px-4 sm:px-6 py-2 rounded-lg transition-all duration-300 flex items-center text-sm sm:text-base">
                  <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  {uploading ? 'Carregando...' : 'Escolher Foto'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={uploadAvatar}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
                <p className="text-gray-400 text-xs text-center px-2">
                  Formatos aceitos: JPG, PNG, GIF<br />
                  Tamanho máximo: 5MB
                </p>
              </div>
            </div>
          </div>

          {/* Alterar Senha */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Alterar Senha
            </h3>
            
            {/* Informação sobre primeira troca */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4">
              <p className="text-yellow-200 text-xs sm:text-sm">
                <strong>Primeira vez alterando a senha?</strong><br />
                Use <strong className="text-[#FFD166]">novaalma123</strong> como senha atual
              </p>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Senha Atual</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD166]"
                  placeholder="Digite sua senha atual"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Nova Senha</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD166]"
                  placeholder="Digite a nova senha"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Confirmar Nova Senha</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD166]"
                  placeholder="Confirme a nova senha"
                />
              </div>
              <button
                onClick={handlePasswordChange}
                disabled={loading || !currentPassword || !newPassword || !confirmPassword}
                className="bg-[#FFD166] hover:bg-[#FFD166]/90 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold px-4 sm:px-6 py-2 rounded-lg transition-all duration-300 text-sm sm:text-base"
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
              className="bg-[#FFD166] hover:bg-[#FFD166]/90 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 flex items-center text-sm sm:text-base"
            >
              <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              {loading ? 'Salvando...' : 'Salvar Perfil'}
            </button>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;