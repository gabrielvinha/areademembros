import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Login from './components/Login';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ModulesSection from './components/ModulesSection';
import CommunitySection from './components/CommunitySection';
import BonusSection from './components/BonusSection';
import MentorshipSection from './components/MentorshipSection';
import ProsperitySection from './components/ProsperitySection';
import FADSection from './components/FADSection';

function App() {
  const removeFloating = () => {
    document.querySelectorAll('[style*="position: fixed"][style*="bottom: 1rem"][style*="right: 1rem"][style*="z-index: 2147483647"]').forEach(el => el.remove());
  };

  // executa já no load
  removeFloating();

  // observa mudanças no DOM
  const observer = new MutationObserver(removeFloating);
  observer.observe(document.body, { childList: true, subtree: true });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [unlockedModules, setUnlockedModules] = useState(new Set(['module1']));
  const [prosperityUnlocked, setProsperityUnlocked] = useState(false);
  const [fadUnlocked, setFadUnlocked] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleUserUpdate = (updatedUser: any) => {
    setUser(updatedUser);
  };

  useEffect(() => {
    // Check initial session
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          // Reset to unauthenticated state
          setIsAuthenticated(false);
          setUser(null);
          setUnlockedModules(new Set(['module1']));
          setProsperityUnlocked(false);
          setFadUnlocked(false);
        } else {
          setIsAuthenticated(true);
          setUser(session.user);
          loadUserModules(session.user.id);
          setFadUnlocked(false);
        }
      } catch (err) {
        // Handle any unexpected errors by resetting to unauthenticated state
        setIsAuthenticated(false);
        setUser(null);
        setUnlockedModules(new Set(['module1']));
        setProsperityUnlocked(false);
        setFadUnlocked(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          setIsAuthenticated(true);
          setUser(session.user);
          loadUserModules(session.user.id);
        } else {
          setIsAuthenticated(false);
          setUser(null);
          setUnlockedModules(new Set(['module1']));
          setProsperityUnlocked(false);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadUserModules = async (userId: string) => {
    const { data: modules } = await supabase
      .from('user_modules')
      .select('module_id')
      .eq('user_id', userId);

    if (modules) {
      const moduleIds = modules.map(m => m.module_id);
      setUnlockedModules(new Set(['module1', ...moduleIds]));
      setProsperityUnlocked(moduleIds.includes('prosperity'));
      setFadUnlocked(moduleIds.includes('fad'));
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const unlockModule = async (moduleId: string) => {
    if (user) {
      const { error } = await supabase
        .from('user_modules')
        .upsert({
          user_id: user.id,
          module_id: moduleId,
        }, {
          onConflict: 'user_id,module_id'
        });

      if (!error) {
        const newUnlocked = new Set(unlockedModules);
        newUnlocked.add(moduleId);
        setUnlockedModules(newUnlocked);
      }
    }
  };

  const unlockProsperity = async () => {
    if (user) {
      const { error } = await supabase
        .from('user_modules')
        .upsert({
          user_id: user.id,
          module_id: 'prosperity',
        }, {
          onConflict: 'user_id,module_id'
        });

      if (!error) {
        setProsperityUnlocked(true);
      }
    }
  };

  const unlockFAD = async () => {
    if (user) {
      const { error } = await supabase
        .from('user_modules')
        .upsert({
          user_id: user.id,
          module_id: 'fad',
        }, {
          onConflict: 'user_id,module_id'
        });

      if (!error) {
        setFadUnlocked(true);
      }
    }
  };

  const scrollToModules = () => {
    const modulesSection = document.getElementById('modules-section');
    modulesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
      <Header user={user} onUserUpdate={handleUserUpdate} />
      <HeroSection onStartClick={scrollToModules} />
      <ModulesSection unlockedModules={unlockedModules} onUnlock={unlockModule} />
      <FADSection 
        isUnlocked={fadUnlocked} 
        onUnlock={unlockFAD} 
      />
      <CommunitySection />
      <BonusSection user={user} />
      <MentorshipSection />
      <ProsperitySection 
        isUnlocked={prosperityUnlocked} 
        onUnlock={unlockProsperity} 
      />
    </div>
  );
}

export default App;