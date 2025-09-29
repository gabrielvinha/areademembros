import React, { useState } from 'react';
import { Lock, Mail, Info } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSignIn();
  };

  const handleSignIn = async () => {
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      onLogin();
    }
    setLoading(false);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-3 sm:p-4 relative"
      style={{
        backgroundImage: 'url(https://i.ibb.co/MypqnLDX/banner-desktop.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="bg-black/40 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-sm sm:max-w-md border border-white/10 mx-3 sm:mx-4">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Frequência da Alma</h1>
          <p className="text-xs sm:text-sm bg-gradient-to-r from-[#FFD166] via-orange-400 to-red-400 bg-clip-text text-transparent font-semibold animate-pulse">
            por Andressa Campos
          </p>
          <p className="text-gray-400 text-sm sm:text-base">
            Área de Membros
          </p>
        </div>

        {/* Informações de Login */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex items-start space-x-2 sm:space-x-3">
            <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-xs sm:text-sm text-blue-100">
              <p className="font-semibold mb-1 sm:mb-2">Como fazer login:</p>
              <p className="mb-1">• Use o <strong>mesmo email</strong> da sua compra</p>
              <p className="mb-1">• Senha padrão: <strong className="text-[#FFD166]">novaalma123</strong></p>
              <p className="text-blue-200">Você pode alterar sua senha depois no perfil</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="email"
              placeholder="E-mail usado na compra"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD166] focus:ring-1 focus:ring-[#FFD166] transition-all duration-300"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="password"
              placeholder="Senha (novaalma123)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD166] focus:ring-1 focus:ring-[#FFD166] transition-all duration-300"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs sm:text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FFD166] hover:bg-[#FFD166]/90 text-black font-semibold py-2.5 sm:py-3 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;