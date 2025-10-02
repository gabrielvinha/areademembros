import React, { useState } from 'react';
import { Lock, Mail, User } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      handleSignUp();
    } else {
      handleSignIn();
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Email ou senha incorretos');
    } else {
      onLogin();
    }
    setLoading(false);
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        }
      }
    });

    if (error) {
      setError(error.message);
    } else if (data.user) {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: data.user.id,
          name: name,
        });

      if (profileError) {
        console.error('Error creating profile:', profileError);
      }

      setSuccess('Conta criada com sucesso! Você já está logado.');
      setTimeout(() => {
        onLogin();
      }, 1500);
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

        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(false);
              setError('');
              setSuccess('');
            }}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all duration-300 ${
              !isSignUp
                ? 'bg-[#FFD166] text-black'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => {
              setIsSignUp(true);
              setError('');
              setSuccess('');
            }}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all duration-300 ${
              isSignUp
                ? 'bg-[#FFD166] text-black'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Criar Conta
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {isSignUp && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD166] focus:ring-1 focus:ring-[#FFD166] transition-all duration-300"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="email"
              placeholder="Seu e-mail"
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
              placeholder={isSignUp ? "Crie uma senha (mín. 6 caracteres)" : "Sua senha"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD166] focus:ring-1 focus:ring-[#FFD166] transition-all duration-300"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs sm:text-sm text-center">{error}</p>
          )}

          {success && (
            <p className="text-green-400 text-xs sm:text-sm text-center">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FFD166] hover:bg-[#FFD166]/90 text-black font-semibold py-2.5 sm:py-3 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Carregando...' : isSignUp ? 'Criar Conta' : 'Entrar'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;