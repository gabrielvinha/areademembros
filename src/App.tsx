import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import Login from './components/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HeroSection from './components/HeroSection';
import StartHereSection from './components/StartHereSection';
import ModulesSection from './components/ModulesSection';
import CommunitySection from './components/CommunitySection';
import BonusSection from './components/BonusSection';
import MentorshipSection from './components/MentorshipSection';
import RecommendedSection from './components/RecommendedSection';
import ProsperitySection from './components/ProsperitySection';
import FADSection from './components/FADSection';
import WelcomeModal from './components/WelcomeModal';
import AdminPanel from './components/AdminPanel';
import PromotionModal from './components/PromotionModal';
import WhatsAppButton from './components/WhatsAppButton';
import { AlertCircle } from 'lucide-react';


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
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPromotionModal, setShowPromotionModal] = useState(false);


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
          setShowWelcomeModal(false);
          setUserProfile(null);
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
        setShowWelcomeModal(false);
        setUserProfile(null);
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
          setShowWelcomeModal(false);
          setUserProfile(null);
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

    let moduleIds = modules ? modules.map(m => m.module_id) : [];

    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (authUser?.email) {
      const { data: whitelistEntry } = await supabase
        .from('whitelist_access')
        .select('modules, expires_at')
        .eq('email', authUser.email)
        .maybeSingle();

      if (whitelistEntry) {
        const isExpired = whitelistEntry.expires_at && new Date(whitelistEntry.expires_at) < new Date();

        if (!isExpired && whitelistEntry.modules && Array.isArray(whitelistEntry.modules)) {
          console.log('Whitelist access detected for', authUser.email, '- unlocking modules:', whitelistEntry.modules);

          for (const moduleId of whitelistEntry.modules) {
            if (!moduleIds.includes(moduleId)) {
              await supabase
                .from('user_modules')
                .upsert({
                  user_id: userId,
                  module_id: moduleId,
                }, {
                  onConflict: 'user_id,module_id'
                });
              moduleIds.push(moduleId);
            }
          }
        }
      }
    }


    setUnlockedModules(new Set(['module1', ...moduleIds]));
    setProsperityUnlocked(moduleIds.includes('prosperity'));
    setFadUnlocked(moduleIds.includes('fad'));

    const localStorageKey = `welcome_seen_${userId}`;
    const hasSeenInLocalStorage = localStorage.getItem(localStorageKey) === 'true';

    if (hasSeenInLocalStorage) {
      console.log('User has seen welcome (localStorage) - skipping modal');
      setShowWelcomeModal(false);
    }

    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (profile) {
      setUserProfile(profile);
      console.log('User profile loaded:', { has_seen_welcome: profile.has_seen_welcome });

      const hasSeenWelcome = profile.has_seen_welcome === true;

      if (!hasSeenWelcome && !hasSeenInLocalStorage) {
        console.log('Showing welcome modal - user has not completed it yet');
        setShowWelcomeModal(true);
      } else {
        console.log('User has completed welcome modal');
        setShowWelcomeModal(false);
      }
    } else {
      console.log('No profile found, creating new profile');
      const { data: newProfile } = await supabase
        .from('user_profiles')
        .insert({ id: userId, has_seen_welcome: false })
        .select()
        .maybeSingle();

      if (newProfile) {
        setUserProfile(newProfile);
        if (!hasSeenInLocalStorage) {
          console.log('New user - showing welcome modal');
          setShowWelcomeModal(true);
        }
      }
    }

    const { data: adminCheck } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', userId)
      .maybeSingle();

    setIsAdmin(!!adminCheck);

    const promotionSeenKey = `promotion_seen_${userId}`;
    const hasSeenPromotion = localStorage.getItem(promotionSeenKey) === 'true';

    if (!hasSeenPromotion) {
      setTimeout(() => {
        setShowPromotionModal(true);
      }, 600000);
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

  const handleWelcomeComplete = async () => {
    if (user && userProfile) {
      console.log('Marking welcome as seen for user:', user.id);

      const localStorageKey = `welcome_seen_${user.id}`;
      localStorage.setItem(localStorageKey, 'true');
      console.log('Welcome status saved to localStorage');

      const { error } = await supabase
        .from('user_profiles')
        .update({ has_seen_welcome: true })
        .eq('id', user.id);

      if (!error) {
        console.log('Welcome status updated successfully in database');
        setUserProfile({ ...userProfile, has_seen_welcome: true });
        setShowWelcomeModal(false);
        console.log('Modal closed, user profile state updated');
      } else {
        console.error('Error updating welcome status in database:', error);
        console.log('Using localStorage fallback - modal will not show again');
        setShowWelcomeModal(false);
      }
    }
  };

  const scrollToModules = () => {
    const modulesSection = document.getElementById('modules-section');
    modulesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePromotionClose = () => {
    if (user) {
      const promotionSeenKey = `promotion_seen_${user.id}`;
      localStorage.setItem(promotionSeenKey, 'true');
    }
    setShowPromotionModal(false);
  };

  const handleViewChallenge = () => {
    handlePromotionClose();
    const mentorshipSection = document.getElementById('mentorship-section');
    if (mentorshipSection) {
      mentorshipSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const mentorship3Card = document.querySelector('[data-mentorship="mentorship3"]');
        if (mentorship3Card) {
          (mentorship3Card as HTMLElement).click();
        }
      }, 500);
    }
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-red-900/20 border border-red-500/50 rounded-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Erro de Configuração</h2>
          <p className="text-gray-300 mb-4">
            As credenciais do Supabase não estão configuradas corretamente.
          </p>
          <p className="text-sm text-gray-400">
            Por favor, verifique o arquivo .env e certifique-se de que as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY estão configuradas corretamente.
          </p>
        </div>
      </div>
    );
  }

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
      {showPromotionModal && (
        <PromotionModal
          onClose={handlePromotionClose}
          onViewChallenge={handleViewChallenge}
        />
      )}
      {showAdminPanel && isAdmin && user && (
        <AdminPanel
          onClose={() => setShowAdminPanel(false)}
          userId={user.id}
        />
      )}
      <Header
        user={user}
        onUserUpdate={handleUserUpdate}
        isAdmin={isAdmin}
        onAdminClick={() => setShowAdminPanel(true)}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <HeroSection onStartClick={scrollToModules} />
      <StartHereSection />
      <ModulesSection
  unlockedModules={unlockedModules}
  onUnlock={unlockModule}
/>

      <FADSection
        isUnlocked={fadUnlocked}
        onUnlock={unlockFAD}
      />
      <CommunitySection />
      <BonusSection user={user} />
      <MentorshipSection />
      <div id="recommended-section">
        <RecommendedSection />
      </div>
      <ProsperitySection
        isUnlocked={prosperityUnlocked}
        onUnlock={unlockProsperity}
      />
      <WhatsAppButton />
    </div>
  );
}

export default App;